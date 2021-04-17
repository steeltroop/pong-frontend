export const postGoogleLogin = async (email, name) => {
  const payload = {
    email,
    name,
  };

  try {
    await fetch(process.env.REACT_APP_PORT + "/auth/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    return err;
  }
};

export const postGoogleLogout = async () => {
  try {
    await fetch(process.env.REACT_APP_PORT + "/auth/logout", {
      credentials: "include",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    });
  } catch (err) {
    return err;
  }
};
