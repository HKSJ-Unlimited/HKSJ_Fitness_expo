export const CallAPI = async <T>(
  url: string,
  method: string,
  body?: any
): Promise<T> => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${url}`, {
      method: method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
