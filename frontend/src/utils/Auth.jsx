export const saveToken = (token) => {
  const expireAt = Date.now() + 3 * 60 * 60 * 1000;
  localStorage.setItem("token", token);
  localStorage.setItem("expireAt", expireAt);
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  const expireAt = localStorage.getItem("expireAt");

  if (!token) return null;

  if (Date.now() > Number(expireAt)) {
    localStorage.removeItem("token");
    localStorage.removeItem("expireAt");
    return null;
  }

  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expireAt");
  window.location.href = "/";
};
