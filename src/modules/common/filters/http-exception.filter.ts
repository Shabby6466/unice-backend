import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, LoggerService } from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';
import { ValidationErrorResponseDto } from '../dto/validation-error-response.dto';
import { ResponseCode, ResponseMessage } from '@utils/enum';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status: HttpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const res: any = exception instanceof HttpException ? exception.getResponse() : { message: 'Internal server error' };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {this.loggerService.error(exception);}

    if (typeof res === 'object') {
      if (res.statusCode === ResponseCode.BAD_REQUEST) {
        res.statusCode = ResponseCode.INVALID_INPUT;
        res.errors = res.message;
        res.message = ResponseMessage.INVALID_INPUT;
      }

      return response.status(status).send(res);
    } else {
      return response.status(status).send({
        statusCode: status,
        message: res,
      });
    }
  }

  private formatValidationErrors(errors: ValidationError[]): Record<string, string> {
    const formattedErrors: Record<string, string> = {};

    errors.forEach((error) => {
      if (error.constraints) {
        formattedErrors[error.property] = Object.values(error.constraints)[0];
      }
      if (error.children && error.children.length > 0) {
        const childErrors = this.formatValidationErrors(error.children);
        Object.assign(formattedErrors, childErrors);
      }
    });

    return formattedErrors;
  }
}
