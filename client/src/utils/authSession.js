const AUTH_TOKEN_KEY = "daakooToken";
const AUTH_USER_KEY = "daakooUser";

const ROLE_DASHBOARD_PATHS = {
  admin: "/admin",
  staff: "/staff",
  user: "/",
};

const parseStoredUser = (rawUser) => {
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

export const readStoredSession = () => {
  if (typeof window === "undefined") {
    return { token: null, user: null, role: null, isAuthenticated: false };
  }

  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const rawUser = localStorage.getItem(AUTH_USER_KEY);
  const user = parseStoredUser(rawUser);

  if (!token || !user) {
    if (token || rawUser) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }

    return { token: null, user: null, role: null, isAuthenticated: false };
  }

  const role = typeof user.role === "string" ? user.role.toLowerCase() : null;

  return {
    token,
    user,
    role,
    isAuthenticated: true,
  };
};

export const getDashboardPathByRole = (role) => {
  if (typeof role !== "string") return "/";
  return ROLE_DASHBOARD_PATHS[role.toLowerCase()] || "/";
};
