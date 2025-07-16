import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorResponseDto {
  @ApiProperty()
  status: 'error';

  @ApiProperty()
  message: string;

  @ApiProperty({ type: 'object' })
  errors: Record<string, string>;

  constructor(message: string, errors: Record<string, string>) {
    this.status = 'error';
    this.message = message;
    this.errors = errors;
  }
}
