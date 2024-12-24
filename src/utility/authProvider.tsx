"use client"
import React,{createContext,useContext,useState,ReactNode} from "react";

export interface User{
    name:string | null | undefined,
    email:string | null | undefined,
    about:string | null | undefined,
    id:any | undefined,
    image:string | null | undefined
}
export interface AuthContextType {
    session: any;
    login: (user:any) => void;
    logout: () => void;
  }
// Create the AuthContext with a default value of undefined
const AuthContext = createContext<AuthContextType| undefined>(undefined);

// Create a custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

// Create the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<any| null>(null);
  
    const login = (user: any) => {
      setSession(user);
    };
  
    const logout = () => {
      setSession(null);
    };
  
    const value = {
      session,
      login,
      logout,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
