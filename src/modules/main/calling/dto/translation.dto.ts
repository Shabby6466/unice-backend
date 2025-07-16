import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class TranslationDto {
  @ApiProperty({
    description: 'Enable or disable translation',
    type: 'boolean',
  })
  @IsBoolean()
  @IsNotEmpty()
  enable: boolean;
}