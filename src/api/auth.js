const API_BASE_URL = 'http://localhost:8000';

export const loginApi = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/pathlyhub/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};

export const signupApi = async (username, email, password) => {
  const response = await fetch(`${API_BASE_URL}/pathlyhub/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Signup failed');
  }

  return response.json();
};
