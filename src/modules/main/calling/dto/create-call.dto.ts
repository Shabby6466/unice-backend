import { ApiProperty } from '@nestjs/swagger';
import { CallType } from '@utils/enum';
import { IsEnum, IsArray, IsString, IsNotEmpty } from 'class-validator';

export class CreateCallDto {
  @ApiProperty({
    enum: CallType,
    description: 'Type of call to create',
  })
  @IsEnum(CallType)
  @IsNotEmpty()
  callType: CallType;

  @ApiProperty({
    type: [String],
    description: 'List of participant user IDs',
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  participantIds: string[];
}