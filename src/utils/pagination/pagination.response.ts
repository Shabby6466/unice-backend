import { ApiProperty } from '@nestjs/swagger';
import { Response } from 'response/response';

export class PageMetaDto {
  @ApiProperty({ description: 'Current page number', example: 1 })
  page: number;

  @ApiProperty({ description: 'Number of items per page', example: 10 })
  limit: number;

  @ApiProperty({ description: 'Total number of items', example: 100 })
  total: number;

  @ApiProperty({ description: 'Total number of pages', example: 10 })
  totalPages: number;

  @ApiProperty({ description: 'Has previous page', example: false })
  hasPreviousPage: boolean;

  @ApiProperty({ description: 'Has next page', example: true })
  hasNextPage: boolean;

  constructor(page: number, limit: number, total: number) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
    this.hasPreviousPage = page > 1;
    this.hasNextPage = page < this.totalPages;
  }
}

export class PaginatedResponse<T> extends Response {
  @ApiProperty({ description: 'Array of items' })
  data: T[];

  @ApiProperty({ description: 'Pagination metadata', type: PageMetaDto })
  meta: PageMetaDto;

  constructor(data: T[], page: number, limit: number, total: number) {
    super();
    this.data = data;
    this.meta = new PageMetaDto(page, limit, total);
  }
}
