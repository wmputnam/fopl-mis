import { getServerUrl, AppConfig } from "./AppConfig";
import { getInitialViewState, getTestViewState } from "./AppStateService";
// import { Member } from "fe-member";
import { MemberDocumentService } from "./MemberDocumentService";
import { MemberRowData } from "./MemberRowData";
import { MemberService } from "./MemberService";
import { Status } from "./Status";
import { isEmptyObject } from "./ObjectUtils";
import {
  setListFilter,
  clearListFilter,
  setMemberId,
  clearMemberId,
  setView,
  pushView,
  pushdViewWithMemberId,
  popView,
  clearMemberAndPopView,
} from './AppStateService'

export {
  AppConfig,
  getInitialViewState,
  getTestViewState,
  getServerUrl,
  isEmptyObject,
  // Member,
  MemberDocumentService,
  MemberRowData,
  MemberService,
  Status,
  setListFilter,
  clearListFilter,
  setMemberId,
  clearMemberId,
  setView,
  pushView,
  pushdViewWithMemberId,
  popView,
  clearMemberAndPopView,
}