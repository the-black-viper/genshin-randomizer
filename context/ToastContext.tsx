"use client";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useReducer,
} from "react";

type ToastTypes = "warning" | "error" | "success";

type InitialState = {
  showToast: boolean;
  toastType: ToastTypes;
};

type ActionsMap = {
  setToastType: ToastTypes;
  showToast: boolean;
};

type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key;
    payload: ActionsMap[Key];
  };
}[keyof ActionsMap];

type Dispatcher = <
  Type extends Actions["type"],
  Payload extends ActionsMap[Type]
>(
  type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

type IToastContext = readonly [InitialState, Dispatcher];

function toastReducer(state: InitialState, action: Actions) {
  switch (action.type) {
    case "setToastType": {
      return {
        ...state,
        toastType: action.payload,
      };
    }
    case "showToast": {
      return {
        ...state,
        showToast: action.payload,
      };
    }
    default: {
      throw Error("Unknown action");
    }
  }
}

export const ToastContext = createContext<IToastContext>([
  { showToast: false, toastType: "success" },
  () => {},
]);

export const ToastProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [state, _dispatch] = useReducer(toastReducer, {
    showToast: false,
    toastType: "success",
  });

  const dispatch: Dispatcher = useCallback((type, ...payload) => {
    _dispatch({ type, payload: payload[0] } as Actions);
  }, []);

  return (
    <ToastContext.Provider value={[state, dispatch]}>
      {children}
    </ToastContext.Provider>
  );
};
