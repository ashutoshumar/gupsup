"use client"
import React, { createContext, useReducer ,Reducer,PropsWithChildren} from "react";

type InitialStateType = {
    darkMode: boolean;
  }
  export  enum ActionType {
    LIGHTMODE = 'LIGHTMODE',
    DARKMODE = 'DARKMODE',
    
  }
  export type Action = {
    type: ActionType
 
  }
  export interface IAppContext {
    state: InitialStateType,
    dispatch: React.Dispatch<Action>
  }
const initialState:InitialStateType= { darkMode: true };
export const ThemeContext = createContext<IAppContext>({
    state:initialState,
    dispatch: () => {}
  });


const themeReducer:Reducer<InitialStateType,Action> = (state, action) => {
  switch (action.type) {
    case "LIGHTMODE":
      return { darkMode: false };
    case "DARKMODE":
      return { darkMode: true };
    default:
      return state;
  }
};

export function ThemeProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(themeReducer,initialState as InitialStateType) ;
  const value = { state, dispatch }
  return (
    <ThemeContext.Provider
    value={value}
    >
      {children}
    </ThemeContext.Provider>
  );
}
