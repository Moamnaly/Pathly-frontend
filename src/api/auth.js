import axios from "axios";
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


export const saveProfileData = async (values) => {
  const token = await localStorage.getItem("token");
  console.log(token, values.firstName);

  // Prepare the profile data in the required format
  const profileData = {
    name: values.firstName + ' ' + values.lastName, // Combine first and last name
    email: values.email, // Assuming values.email is provided
    country: values.country,
    degree: values.degree,
    timezone: values.timezone,
    bio: values.bio,
  };

  console.log('Data to be sent as JSON:', profileData);

  try {
    const response = await axios.post(`${API_BASE_URL}/pathlyhub/profile/create/`, profileData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Ensure it's application/json for JSON payload
      },
    });
    console.log('Profile saved:', response.data);
  } catch (error) {
    console.error('Error saving profile:', error);
  }
};
