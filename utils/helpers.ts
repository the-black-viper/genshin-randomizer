export function generateRandomInteger(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export function randChoice<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
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
