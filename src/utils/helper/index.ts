import { HttpException } from "@nestjs/common";
import { ResponseCode, ResponseMessage } from "@utils/enum";

export class Exception {
    constructor(responseCode?: ResponseCode, responseMessage?: ResponseMessage) {
      throw new HttpException(
        {
          statusCode: responseCode || ResponseCode.GENERIC_ERROR,
          message: responseMessage || ResponseMessage.GENERIC_ERROR,
        },
        ResponseCode.BAD_REQUEST,
      );
    }
  }