import { useContext, createContext, useReducer } from "react";

const AuthContext = createContext();
const INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Auth threw error");
  }
}
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );
  function Login(email, password) {
    if (FAKE_USER.email !== email && FAKE_USER.password !== password)
      throw new Error("incorrect email or password");
    dispatch({ type: "login", payload: FAKE_USER });
  }
  function Logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("This hook was used in an incorrect seeting");
  return context;
}

export { useAuth, AuthProvider };
