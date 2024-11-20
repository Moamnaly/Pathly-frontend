export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const clearLocalStorage = () => {
  return localStorage.clear();
};
