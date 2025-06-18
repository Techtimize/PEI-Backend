import { QueryParameterDto } from '../dto/pagination.query.dto';

export function getPagination(query: QueryParameterDto) {
  const parsedPageNo = parseInt(query.pageNo, 10) || 1;
  const parsedLimit = parseInt(query.limit, 10) || 10;
  return {
    ...query,
    pageNo: parsedPageNo,
    limit: parsedLimit,
  };
}
