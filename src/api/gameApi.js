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

export const updateScore = () => {

};
