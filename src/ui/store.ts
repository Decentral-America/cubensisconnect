import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import * as reducers from './reducers/updateState';
import * as middleware from './midleware';
import * as extension from 'extensionizer';
import { CubensisConnect_DEBUG } from './appConfig';

if (CubensisConnect_DEBUG) {
  middleware['logMW'] = store => next => action => {
    console.log('-->', action.type, action.payload, action.meta);
    return next(action);
  };
}

const reducer = combineReducers(reducers);

export type AppState = ReturnType<typeof reducer>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export function createUiStore() {
  return createStore(
    reducer,
    { version: extension.runtime.getManifest().version },
    applyMiddleware(...Object.values(middleware))
  );
}

export type UiStore = ReturnType<typeof createUiStore>;

export const useAppDispatch = () => useDispatch<UiStore['dispatch']>();
