import { SearchFieldEnum } from '../dto/pagination.query.dto';

export interface QueryParameterInterface {
  pageNo?: number;
  limit?: number;
  searchField?: SearchFieldEnum;
  email?: string;
  name?: string;
  searchText?: string;
}
