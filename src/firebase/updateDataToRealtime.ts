import { auth, database } from "./firebaseConfig";

const dbRef = database.ref("leaderboard");
export async function updateDataToRealTime(score: number) {
  const displayName = auth.currentUser?.displayName;
  const { uid } = auth.currentUser!;
  if (displayName) {
    const prevVal = (await dbRef.child(uid).get()).val();
    const prevScore = !!prevVal ? prevVal.score : 0;
    // firestore.collection("leaderboard").doc(auth.currentUser?.uid).set({
    //   score,
    //   username: displayName,
    // });
    if (score > prevScore) {
      dbRef.update({
        [uid]: {
          score,
          displayName,
        },
      });
    }
  }
}

export function updateLocationRealTime(x: number, y: number, player: string) {
  dbRef.set({
    [player]: {
      x,
      y,
    },
  });
}
