import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_KEY'),

      },
    });
  }

  /**
   * Filter for image files
   * @param req - The request object
   * @param file - The uploaded file
   * @param callback - The callback function
   */
  static imageFilter(_req: unknown, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void): void {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  }

  /**
   * Filter for audio files
   * @param req - The request object
   * @param file - The uploaded file
   * @param callback - The callback function
   */
  static audioFilter(_req: unknown, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void): void {
    if (!file.originalname.match(/\.(mp3|wav|ogg|m4a|aac)$/)) {
      return callback(new Error('Only audio files are allowed!'), false);
    }
    callback(null, true);
  }

  /**
   * Filter for file uploads
   * @param req - The request object
   * @param file - The uploaded file
   * @param callback - The callback function
   */
  fileFilter(_req: unknown, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void): void {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx|txt|csv)$/)) {
      return callback(new Error('Only specific file types are allowed!'), false);
    }
    callback(null, true);
  }

  /**
   * Get the S3 instance
   * @returns The S3 instance
   */
  getS3(): S3 {
    return this.s3;
  }

  /**
   * Upload a file to S3
   * @param file - The file to upload
   * @param folder - The folder to upload to
   * @returns The upload result
   */
  async upload(file: Express.Multer.File, folder: string): Promise<ManagedUpload.SendData> {
    const { originalname } = file;
    const key = `${folder}/${uuidv4()}${extname(originalname)}`;

    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    return await this.s3.upload(params).promise();
  }

  /**
   * Upload multiple files to S3
   * @param files - The files to upload
   * @param folder - The folder to upload to
   * @returns Array of upload results
   */
  async uploadMultiple(files: Express.Multer.File[], folder: string): Promise<ManagedUpload.SendData[]> {
    const uploadPromises = files.map((file) => this.upload(file, folder));
    return await Promise.all(uploadPromises);
  }

  /**
   * Upload a file to S3 with a specific key
   * @param file - The file to upload
   * @param key - The key to use for the file
   * @returns The upload result
   */
  async uploadS3(file: Express.Multer.File, key: string): Promise<ManagedUpload.SendData> {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    return await this.s3.upload(params).promise();
  }

  async uploadBase64(base64: string, key: string): Promise<ManagedUpload.SendData> {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: key,
      Body: Buffer.from(base64, 'base64'),
      ContentType: 'image/png',
    };

    return await this.s3.upload(params).promise();
  }

  /**
   * Upload CSV text to S3
   * @param text - The CSV text to upload
   * @param key - The key to use for the file
   * @returns The upload result
   */
  async uploadS3CSVText(text: string, key: string): Promise<ManagedUpload.SendData> {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: key,
      Body: text,
      ContentType: 'text/csv',
    };

    return await this.s3.upload(params).promise();
  }

  /**
   * Get the public URL for a file
   * @param key - The key of the file
   * @returns The public URL
   */
  getPublicURL(key: string): string {
    return `https://${this.configService.get('AWS_BUCKET_NAME')}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${key}`;
  }

  /**
   * Get a signed URL for a file
   * @param key - The key of the file
   * @returns The signed URL
   */
  async getSignedURL(key: string): Promise<string> {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: key,
      Expires: 3600, // URL expires in 1 hour
    };

    return await this.s3.getSignedUrlPromise('getObject', params);
  }

  /**
   * Get all keys in a bucket
   * @returns Array of keys
   */
  async getKeys(): Promise<string[]> {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
    };

    const data = await this.s3.listObjectsV2(params).promise();
    return data.Contents?.map((item) => item.Key ?? '') ?? [];
  }

  /**
   * Delete an object from S3
   * @param key - The key of the object to delete
   */
  async deleteObject(key: string): Promise<void> {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: key,
    };

    await this.s3.deleteObject(params).promise();
  }

  /**
   * Get an object from S3
   * @param key - The key of the object to get
   * @returns The object data
   */
  async getObject(key: string): Promise<Buffer> {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: key,
    };

    const data = await this.s3.getObject(params).promise();
    return data.Body as Buffer;
  }

  /**
   * Get the key from a URL
   * @param url - The URL to get the key from
   * @returns The key
   */
  getKeyFromUrl(url: string): string {
    const bucketName = this.configService.get('AWS_BUCKET_NAME');
    const region = this.configService.get('AWS_REGION');
    const baseUrl = `https://${bucketName}.s3.${region}.amazonaws.com/`;
    return url.replace(baseUrl, '');
  }
}
