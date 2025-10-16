// src/context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type UserContextType = {
  fullname: string;
  setFullname: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  number: string;
  setNumber: Dispatch<SetStateAction<string>>;
  level: string;
  setLevel: Dispatch<SetStateAction<string>>;
};

const UserContext = createContext<UserContextType>({
  fullname: "",
  setFullname: () => {},
  email: "",
  setEmail: () => {},
  mode: "",
  setMode: () => {},
  number: "",
  setNumber: () => {},
  level: "",
  setLevel: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState("");
  const [number, setNumber] = useState("");
  const [level, setLevel] = useState("");

  return (
    <UserContext.Provider
      value={{
        fullname,
        setFullname,
        email,
        setEmail,
        mode,
        setMode,
        number,
        setNumber,
        level,
        setLevel,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
