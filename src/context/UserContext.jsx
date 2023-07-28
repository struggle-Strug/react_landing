import { createContext, useState, useMemo, useContext } from "react";

const UserContext = createContext();

export function UseUserDetails () {
  const context = useContext(UserContext)
  return context
}
// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
  const userFromStrage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : undefined;

  const [user, setUser] = useState({ ...userFromStrage });

  const value = useMemo(() => {
    function updateuserDetails() {
      setUser(userFromStrage);
    }
    return [{ ...user }, updateuserDetails];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
