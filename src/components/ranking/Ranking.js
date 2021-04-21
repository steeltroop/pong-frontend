import React, { useEffect, useState } from "react";
import GameBoy from "../gameBoy/GameBoy";
import styles from "./Ranking.module.css";

const Ranking = () => {
  const [users, setUsers] = useState([]);
  let userList = null;
  let data;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(process.env.REACT_APP_PORT + "/users", {
          credentials: "include",
          method: "GET"
        });

        data = await res.json();
        setUsers(data);
      } catch(err) {
        return err;
      }
    })();
  }, []);

  if (users.length !== 0) {
    userList = users.map((user, index) => {
      let rank;

      if (index + 1 === 1) {
        rank = "1st";
      } else if (index + 1 === 2) {
        rank = "2st"
      } else {
        rank = `${index + 1}th`;
      }

      return (
        <div className={styles.user}>
          <div className={styles.rank}>
            {rank}
          </div>
          <div className={styles.userName}>
            {user.name}
          </div>
          <div className={styles.score}>
            score: {user.winningPoint}
          </div>
        </div>
      );
    });
  }

  return (
    <div className={styles.wrapper}>
      <GameBoy>
        <div className={styles.rankingWrapper}>
          <div className={styles.rankingTitle}>
            RANKING
          </div>
          <div className={styles.usersWrapper}>
            {userList}
          </div>
        </div>
      </GameBoy>
    </div>
  );
};

export default Ranking;
