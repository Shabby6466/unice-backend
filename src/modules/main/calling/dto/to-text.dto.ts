import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ToTextDto {
  @ApiProperty({
    description: 'Enable or disable voice-to-text',
    type: 'boolean',
  })
  @IsBoolean()
  @IsNotEmpty()
  enable: boolean;
}