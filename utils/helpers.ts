import { ICharacterData } from "@components/Card";
import characterData from "@utils/characterData.json";
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
