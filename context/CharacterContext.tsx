"use client";
import { ICharacterData } from "@components/Card/Card";
import { getValidCharacters } from "@utils/helpers";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useReducer,
} from "react";

type InitialState = {
  numberOfCharacters: number;
  characters: ICharacterData[];
  excludedCharacterIds: number[];
};

export type ActionsMap = {
  setNumberOfCharacters: number;
  setExcludedCharacters: number[];
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

const validCharacters = getValidCharacters();

function characterReducer(state: InitialState, action: Actions) {
  switch (action.type) {
    case "setNumberOfCharacters": {
      return {
        ...state,
        numberOfCharacters: action.payload,
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
    case "setExcludedCharacters": {
      return {
        ...state,
        excludedCharacterIds: action.payload,
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
  {
    characters: validCharacters,
    excludedCharacterIds: [],
    numberOfCharacters: 8,
  },
  () => {},
]);

export const CharacterProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [state, _dispatch] = useReducer(characterReducer, {
    characters: validCharacters,
    excludedCharacterIds: [],
    numberOfCharacters: 8,
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
