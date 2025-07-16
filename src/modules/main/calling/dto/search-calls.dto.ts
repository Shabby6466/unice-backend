import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class SearchCallsDto {
  @ApiProperty({
    description: 'Username to search for in call logs',
    example: 'johndoe',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;
}
