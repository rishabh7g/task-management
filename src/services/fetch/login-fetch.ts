export const fetchLogin = async (email: string, password: string) => {
  const response = await fetch("http://localhost:8090/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};
