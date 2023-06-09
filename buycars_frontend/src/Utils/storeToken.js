export const storeToken = (key ,token) => {
  localStorage.setItem(key, token);
};

export const getToken = (key) => {
  const token = localStorage.getItem(key);
  return token;
};

export const removeToken = (key) => {
  const token = localStorage.removeItem(key);
  return token;
};





