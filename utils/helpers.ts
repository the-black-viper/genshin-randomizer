import { ICharacterData } from "@components/Card/Card";
import characterData from "@data/characterData.json";
import {
  defaultEightTeamIds,
  defaultFourTeamIds,
  defaultSingleId,
  defaultTwoTeamIds,
} from "./constants";
export function generateRandomInteger(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export function randChoice<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getCharacterElement(char: ICharacterData): string {
  const charElement = char.elements[0];
  return charElement;
}

export function getValidCharacters(): ICharacterData[] {
  const validCharacters = characterData.slice(1) as ICharacterData[];
  return validCharacters;
}

export function getDefaultTeamIds(totalChars: number): number[] {
  if (totalChars === 4) return defaultFourTeamIds;
  if (totalChars === 2) return defaultTwoTeamIds;
  if (totalChars === 1) return defaultSingleId;
  return defaultEightTeamIds;
}
// export function getExcludedIds() {
//   const excludedIds = sessionStorage.getItem("excluded");
//   return excludedIds;
// }

// export function setExcludedIds(id:number) {
//   const excluded = getExcludedIds();
//   if (!excluded) {
//     sessionStorage.setItem("")
//   }
// }
