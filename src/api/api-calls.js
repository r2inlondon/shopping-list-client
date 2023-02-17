export const checkLogin = async ({ email, password }) => {
  let userFound;
  try {
    const res = await fetch(`http://localhost:5000/user/${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    userFound = await res.json();
  } catch (error) {
    console.log(error);
  }
  return userFound;
};
