import { combineReducers } from 'redux';
import {
  ACTION,
  setSwapScreenInitialState,
  resetSwapScreenInitialState,
} from '../actions';
import { pairing } from './pairing';

function newUser(state = {}, action) {
  switch (action.type) {
    case ACTION.SET_PASSWORD_PENDING:
    case ACTION.SET_PASSWORD_UPDATE:
      return { ...state, ...action.payload.unapprovedMessages };
  }

  return state;
}

function assets(state = {}, action) {
  switch (action.type) {
    case ACTION.SET_ACTIVE_ACCOUNT:
      return { ...state, account: action.payload };
  }

  return state;
}

function login(state = {}, action) {
  switch (action.type) {
    case ACTION.LOGIN_UPDATE:
    case ACTION.LOGIN_PENDING:
      return { ...state, ...action.payload };
  }

  return state;
}

function newAccount(
  state = { name: '', address: '', type: 'seed', seed: '' },
  action
) {
  switch (action.type) {
    case ACTION.NEW_ACCOUNT_NAME:
      const name = action.payload != null ? action.payload : state.name;
      return { ...state, name };
    case ACTION.NEW_ACCOUNT_SELECT:
      return { ...state, ...action.payload };
  }

  return state;
}

function addNewAccount(
  state = { pending: false, error: false },
  { type, payload }
) {
  switch (type) {
    case ACTION.SAVE_NEW_ACCOUNT_SEND:
    case ACTION.SAVE_NEW_ACCOUNT_RECEIVE:
      return payload;
    case ACTION.NEW_ACCOUNT_CLEAR_ERRORS:
      return { ...state, error: false };
  }

  return state;
}

function menu(state = { logo: false }, { type, payload }) {
  if (type === ACTION.CHANGE_MENU) {
    return { ...state, ...payload };
  }
  return state;
}

function loading(state = true, { type, payload }) {
  if (type === ACTION.LOADING) {
    return payload;
  }

  return state;
}

interface NotificationsState {
  accountCreationSuccess?: boolean;
  accountImportSuccess?: boolean;
  changeName?: boolean;
  deleted?: boolean;
  selected?: boolean;
}

function notifications(
  state: NotificationsState = {},
  { type, payload }: { type: string; payload: boolean }
): NotificationsState {
  switch (type) {
    case ACTION.NOTIFICATION_ACCOUNT_CREATION_SUCCESS:
      return { ...state, accountCreationSuccess: payload };
    case ACTION.NOTIFICATION_ACCOUNT_IMPORT_SUCCESS:
      return { ...state, accountImportSuccess: payload };
    case ACTION.NOTIFICATION_SELECT:
      return { ...state, selected: payload };
    case ACTION.NOTIFICATION_DELETE:
      return { ...state, deleted: payload };
    case ACTION.NOTIFICATION_NAME_CHANGED:
      return { ...state, changeName: payload };
    default:
      return state;
  }
}

function transactionStatus(state = {}, { type, payload }) {
  switch (type) {
    case ACTION.APPROVE_PENDING:
      return { ...state, approvePending: payload };
    case ACTION.APPROVE_OK:
      return { ...state, approveOk: payload };
    case ACTION.APPROVE_ERROR:
      return { ...state, approveError: payload };
    case ACTION.REJECT_OK:
      return { ...state, rejectOk: payload };
    case ACTION.APPROVE_REJECT_CLEAR:
      return {};
  }

  return state;
}

export interface SwapScreenInitialState {
  fromAssetId: string | null;
}

const swapScreenInitialStateDefault = { fromAssetId: null };

function swapScreenInitialState(
  state: SwapScreenInitialState = swapScreenInitialStateDefault,
  action:
    | ReturnType<typeof setSwapScreenInitialState>
    | ReturnType<typeof resetSwapScreenInitialState>
): SwapScreenInitialState {
  switch (action.type) {
    case ACTION.SET_SWAP_SCREEN_INITIAL_STATE:
      return action.payload;
    case ACTION.RESET_SWAP_SCREEN_INITIAL_STATE:
      return swapScreenInitialStateDefault;
    default:
      return state;
  }
}

export const localState = combineReducers({
  loading,
  newUser,
  login,
  newAccount,
  addNewAccount,
  menu,
  assets,
  notifications,
  transactionStatus,
  pairing,
  swapScreenInitialState,
});
