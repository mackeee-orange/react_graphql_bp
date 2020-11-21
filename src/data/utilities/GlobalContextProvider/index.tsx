import React, { FC, Fragment } from "react";
import { AccountStateProvider } from "../../account/AccountContext";

// Combineできるようにしたけど各地でdispatch使うのだるかったりするのできゃっか
// export const globalContextStore = createContext<>({});
// const { Provider } = globalContextStore;
//
// const combinedReducer = (reducers: DictionaryLike<Reducer<DictionaryLike, Action>>) => {
//   const reducerKeys = Object.keys(reducers);
//
//   return function combination(
//     state: DictionaryLike<DictionaryLike> = {},
//     action: Action
//   ): DictionaryLike<DictionaryLike> {
//     let nextState = state;
//     for (const key in reducerKeys) {
//       const reducer = reducers[key];
//       const previousStateForKey = state[key];
//       const nextStateForKey = reducer(previousStateForKey, action);
//       nextState = { ...nextState, [key]: nextStateForKey };
//     }
//     return nextState;
//   };
// };
//
// const GlobalStateProvider: FC = ({ children }) => {
//   const [state, dispatch] = useReducer(combinedReducer({ account: accountReducer }), {});
//   return <Provider value={{ state, dispatch }}>{children}</Provider>;
// };

// export default GlobalStateProvider;

const GlobalContextProvider: FC = ({ children }) => {
  return (
    <Fragment>
      <AccountStateProvider>{children}</AccountStateProvider>
    </Fragment>
  );
};

export default GlobalContextProvider;
