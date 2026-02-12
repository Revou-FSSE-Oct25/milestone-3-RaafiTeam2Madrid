// src/utils/api.ts
const BASE_URL = 'https://fakestoreapi.com';

export const loginUser = async (username: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error('Login failed');
    }

    const data = await res.json();
    return data.token as string; // Kita pastikan ini string
  } catch (error) {
    console.error(error);
    return null;
  }
};