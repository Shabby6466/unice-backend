import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class ClearHistoryDto {
  @ApiProperty({
    description: 'Whether to clear all history or just recent history',
    example: false,
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  clearAll?: boolean;
}
