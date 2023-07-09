import { database } from "./firebaseConfig";

const dbRef = database.ref("gameData");
export function updateDataToRealTime(score: number) {
  dbRef.set({
    score,
  });
}

export function updateLocationRealTime(x: number, y: number, player: string) {
  dbRef.set({
    [player]: {
      x,
      y,
    },
  });
}
