import { auth, database } from "../firebase/firebaseConfig";
// import EventDispatcher from "../mouseRunner/event/EventDispatcher";
import { usernames } from "./usernames";

const randomIndex = Math.floor(Math.random() * usernames.length);
const customUserName = usernames[randomIndex];

// const emitter = EventDispatcher.getInstance();

auth.onAuthStateChanged((user) => {
  const displayName = auth.currentUser?.displayName;
  if (user) {
    if (!displayName) {
      console.log("setting username", customUserName);
      auth.currentUser?.updateProfile({
        displayName: customUserName,
      });
      //   emitter.emit("username_event", customUserName);
    } else {
      console.log(user.displayName);
    }
  }
});

const leaderboard = document.getElementById("leaderboard_table")!;

const databaseRef = database.ref("leaderboard");

const query = databaseRef.orderByKey().limitToFirst(10);

query.on("value", (data) => {
  leaderboard.innerHTML = "";
  const html = `
    <th>Rank</th>
    <th>User</th>
    <th>Score</th>
    `;
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = html;
  leaderboard.appendChild(tableRow);
  const value = data.val();
  let rank = 1;
  // @ts-ignore
  for (const [key, val] of Object.entries(value)) {
    appendToLeaderBoard(rank, val.displayName, val.score);
    rank++;
  }
});

function appendToLeaderBoard(rank: number, user: string, score: number) {
  const html = `
    <td>${rank}</td>
    <td>${user}</td>
    <td>${score}</td>
    `;
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = html;
  leaderboard.appendChild(tableRow);
}
