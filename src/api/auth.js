import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const loginApi = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/pathlyhub/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

export const signupApi = async (username, email, password) => {
  const response = await fetch(`${API_BASE_URL}/pathlyhub/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, email, password })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Signup failed");
  }

  return response.json();
};

export const saveProfileData = async (values) => {
  const token = await localStorage.getItem("token");
  console.log(token, values.firstName);

  // Prepare the profile data in the required format
  const profileData = {
    name: values.firstName + " " + values.lastName, // Combine first and last name
    email: values.email, // Assuming values.email is provided
    country: values.country,
    degree: values.degree,
    timezone: values.timezone,
    bio: values.bio
  };
  try {
    const response = await axios.post(
      `${API_BASE_URL}/pathlyhub/profile/create/`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" // Ensure it's application/json for JSON payload
        }
      }
    );
    console.log("Profile saved:", response.data);
  } catch (error) {
    console.error("Error saving profile:", error);
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  const token = await localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/pathlyhub/change-password/`,
      {
        currentPassword: currentPassword,
        newPassword: newPassword
      },
      {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      }
    );
    return response.data; 
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message); 
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};
