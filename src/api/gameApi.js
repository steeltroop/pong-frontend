export const getUserData = (data, setUsers) => {
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
};

export const updateWinnerScore = (email) => {
  (async () => {
    try {
      await fetch(process.env.REACT_APP_PORT + "/battle", {
        credentials: "include",
        method: "PATCH",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      });
    } catch(err) {
      console.log(err);
      return err;
    }
  })();
};
