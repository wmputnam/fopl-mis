import { MemberListFilter } from "./MemberListFilter";

export interface MemberListContainerState {
  pageNumber: number;
  maxRows: number;
  listFilter: MemberListFilter;
  numberOfFilteredPages: number;
}


