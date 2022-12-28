"use client";
import { ICharacterData } from "@components/Card";
import characterData from "@utils/characterData.json";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useReducer,
} from "react";

const validCharacters = characterData.slice(1);

type InitialState = {
  characters: ICharacterData[];
  excludedCharacterIds: number[];
};

export type ActionsMap = {
  setCharacters: number;
  excludeCharacter: number;
  includeCharacter: number;
  excludeAll: undefined;
  selectAll: undefined;
};

export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key;
    payload: ActionsMap[Key];
  };
}[keyof ActionsMap];

export type Dispatcher = <
  Type extends Actions["type"],
  Payload extends ActionsMap[Type]
>(
  type: Type,
  // This line makes it so if there shouldn't be a payload then
  // you only need to call the function with the type, but if
  // there should be a payload then you need the second argument.
  ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

type ICharacterContext = readonly [InitialState, Dispatcher];

function characterReducer(state: InitialState, action: Actions) {
  switch (action.type) {
    case "setCharacters": {
      const charData = validCharacters.map((char) => {
        if (char.id === action.payload) {
          return {
            ...char,
            selected: true,
          };
        } else return char;
      });

      return {
        ...state,
        characters: charData,
      };
    }
    case "excludeCharacter": {
      const excludedCharacters = [
        ...state.excludedCharacterIds,
        action.payload,
      ];
      return {
        ...state,
        excludedCharacterIds: excludedCharacters,
      };
    }
    case "includeCharacter": {
      const excludedCharacters = state.excludedCharacterIds.filter(
        (id) => action.payload !== id
      );
      return {
        ...state,
        excludedCharacterIds: excludedCharacters,
      };
    }
    case "excludeAll": {
      const allCharacterIds = validCharacters.map((char) => char.id);

      return {
        ...state,
        excludedCharacterIds: allCharacterIds,
      };
    }
    case "selectAll": {
      return {
        ...state,
        excludedCharacterIds: [],
      };
    }
    default: {
      throw Error("Unknown action");
    }
  }
}

export const CharacterContext = createContext<ICharacterContext>([
  { characters: validCharacters, excludedCharacterIds: [] },
  () => {},
]);

export const CharacterProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [state, _dispatch] = useReducer(characterReducer, {
    characters: validCharacters,
    excludedCharacterIds: [],
  });

  const dispatch: Dispatcher = useCallback((type, ...payload) => {
    _dispatch({ type, payload: payload[0] } as Actions);
  }, []);

  return (
    <CharacterContext.Provider value={[state, dispatch]}>
      {children}
    </CharacterContext.Provider>
  );
};
