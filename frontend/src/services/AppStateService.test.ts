/* eslint-disable jest/valid-expect */
import { expect } from "chai";
import { describe, it } from "mocha";
import { fileURLToPath } from "url";
import {
  clearListFilterAction,
  getInitialViewState,
  setListFilterAction,
  setMemberIdAction,
  clearMemberIdAction,
  setViewAction,
  pushViewAction,
  pushdViewWithMemberIdAction,
  popViewAction,
  clearMemberAndPopViewAction,
  openModalForMemberTaskAction,
  closeModalAction
} from "./AppStateService"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MemberViewStates } from "src/interfaces";


const __filename = fileURLToPath(import.meta.url);

const fn = () => `${__filename.split('/').pop()}`;

describe(`${fn()}: getInitialViewState`, function () {

  it('should return an AppStateView object', function () {
    const result = getInitialViewState();
    expect(typeof result).to.be.equal('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.memberId).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.viewStateStack[0]).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.viewStateStack).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    // expect(result.listViewFilter).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.modalIsOpen).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.modalMessage).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.modalAction).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.modalRoot).to.not.be.undefined;
  });

});

describe(`${fn()}: setListFilterAction`, function () {

  it('should return an UPDATE_LIST_FILTER AppStateAction object with supplied listViewFilter', function () {
    const filterSetting = "x"
    const appState = getInitialViewState();
    const result = setListFilterAction(appState, filterSetting, () => { })
    expect(typeof result).to.be.equal('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.type).to.not.be.undefined;
    expect(result.type).to.equal("UPDATE_LIST_FILTER");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.state).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.setter).to.not.be.undefined;
    expect(result.newFilter).to.equal(filterSetting);
  });

});

describe(`${fn()}: clearListFilterAction`, function () {

  it('should return an CLEAR_LIST_FILTER AppStateAction object with empty listViewFilter', function () {
    const appState = getInitialViewState();
    const result = clearListFilterAction(appState, () => { })
    expect(typeof result).to.be.equal('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.type).to.not.be.undefined;
    expect(result.type).to.equal("CLEAR_LIST_FILTER");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.state).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.setter).to.not.be.undefined;
  });

});

//setMemberIdAction
describe(`${fn()}: setMemberIdAction`, function () {

  it('should return an SET_MEMBER_ID AppStateAction object with supplied memberId', function () {
    const memberId = "xxyyzz";
    const appState = getInitialViewState();
    const result = setMemberIdAction(appState, memberId, () => { })
    expect(typeof result).to.be.equal('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.type).to.not.be.undefined;
    expect(result.type).to.equal("SET_MEMBER_ID");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.state).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.setter).to.not.be.undefined;
    expect(result.member_id).to.equal(memberId);
  });

});

//clearMemberIdAction
describe(`${fn()}: clearMemberIdAction`, function () {

  it('should return an CLEAR_MEMBER_ID AppStateAction object with empty memberId', function () {
    const appState = getInitialViewState();
    const result = clearMemberIdAction(appState, () => { })
    expect(typeof result).to.be.equal('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.type).to.not.be.undefined;
    expect(result.type).to.equal("CLEAR_MEMBER_ID");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.state).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.setter).to.not.be.undefined;
  });
});

//setViewAction
describe(`${fn()}: setViewAction`, function () {

  it('should return an SET_VIEW AppStateAction object with view', function () {
    const appState = getInitialViewState();
    const result = setViewAction(appState, MemberViewStates.list, () => { })
    expect(typeof result).to.be.equal('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.type).to.not.be.undefined;
    expect(result.type).to.equal("SET_VIEW");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.state).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.setter).to.not.be.undefined;
    expect(result.view).to.equal(MemberViewStates.list)
  });
});

//pushViewAction
describe(`${fn()}: pushViewAction`, function () {

  it('should return an PUSH_VIEW AppStateAction object with view', function () {
    const appState = getInitialViewState();
    const result = pushViewAction(appState, MemberViewStates.refresh, () => { })
    expect(typeof result).to.be.equal('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.type).to.not.be.undefined;
    expect(result.type).to.equal("PUSH_VIEW");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.state).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.setter).to.not.be.undefined;
    expect(result.view).to.equal(MemberViewStates.refresh)
  });
});

//pushdViewWithMemberIdAction
describe(`${fn()}: pushViewAction`, function () {

  it('should return an PUSH_VIEW_WITH_MEMBERID AppStateAction object with view', function () {
    const memberId = "cccvvvttt";
    const appState = getInitialViewState();
    const result = pushdViewWithMemberIdAction(appState, MemberViewStates.edit, memberId, () => { })
    expect(typeof result).to.be.equal('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.type).to.not.be.undefined;
    expect(result.type).to.equal("PUSH_VIEW_WITH_MEMBERID");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.state).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.setter).to.not.be.undefined;
    expect(result.view).to.equal(MemberViewStates.edit)
    expect(result.member_id).to.equal(memberId);
  });
});

// popViewAction
describe(`${fn()}: popViewAction`, function () {

  it('should return an POP_VIEW AppStateAction object with view', function () {
    const appState = getInitialViewState();
    const result = popViewAction(appState, () => { })
    expect(typeof result).to.be.equal('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.type).to.not.be.undefined;
    expect(result.type).to.equal("POP_VIEW");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.state).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.setter).to.not.be.undefined;
  });
});

//clearMemberAndPopViewAction
describe(`${fn()}: clearMemberAndPopViewAction`, function () {

  it('should return an CLEAR_MEMBER_POP_VIEW AppStateAction object with view', function () {
    const appState = getInitialViewState();
    const result = clearMemberAndPopViewAction(appState, () => { })
    expect(typeof result).to.be.equal('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.type).to.not.be.undefined;
    expect(result.type).to.equal("CLEAR_MEMBER_POP_VIEW");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.state).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.setter).to.not.be.undefined;
  });
});

// openModalForMemberTaskAction
describe(`${fn()}: openModalForMemberTaskAction`, function () {

  it('should return an OPEN_MODAL_FOR_MEMBER_TASK AppStateAction object with view', function () {
    const member_id = "qwerty";
    const modalMessage = "Be kind";
    const modalAction = (s: string) => { };
    const appState = getInitialViewState();
    const result = openModalForMemberTaskAction(appState, member_id, modalAction, modalMessage, () => { })
    expect(typeof result).to.be.equal('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.type).to.not.be.undefined;
    expect(result.type).to.equal("OPEN_MODAL_FOR_MEMBER_TASK");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.state).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.setter).to.not.be.undefined;
    expect(result.memberId).to.equal(member_id);
    expect(result.modalMessage).to.equal(modalMessage)
    expect(result.modalAction).to.equal(modalAction);
  });
});

//closeModalAction
describe(`${fn()}: openModalForMemberTaskAction`, function () {

  it('should return an CLOSE_MODAL AppStateAction object with view', function () {
    const appState = getInitialViewState();
    const result = closeModalAction(appState, () => { })
    expect(typeof result).to.be.equal('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.type).to.not.be.undefined;
    expect(result.type).to.equal("CLOSE_MODAL");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.state).to.not.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.setter).to.not.be.undefined;
  });
});

