export const fetchRegisteration = async (email: string, password: string) => {
  const response = await fetch("http://localhost:8090/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Registeration failed");
  }

  return response.json();
};
