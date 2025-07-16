import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T> {
  @ApiProperty()
  status: 'success' | 'error';

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  data?: T;

  constructor(status: 'success' | 'error', message: string, data?: T) {
    this.status = status;
    this.message = message;
    if (data) {
      this.data = data;
    }
  }
}
