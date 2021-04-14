export const postGoogleLogin = async (email, name) => {
  const payload = {
    email,
    name,
  };

  try {
    await fetch(process.env.REACT_APP_PORT + "/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    return err;
  }
};
