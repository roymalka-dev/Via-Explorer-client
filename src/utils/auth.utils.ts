export const verifyAuthority = (userAuth: string, pageAuth: string) => {
  if (userAuth === "ADMIN") {
    return true;
  }

  if (pageAuth === "PUBLIC") {
    return true;
  }

  if (userAuth === "USER" && pageAuth === "USER") {
    return true;
  }

  return false;
};
