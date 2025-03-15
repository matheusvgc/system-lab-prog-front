import useAuth, { UserProps } from "@/hooks/useAuth";
import { createContext, type ReactNode } from "react";

export interface SignInCredentials {
    username: string
    password: string
}
interface AuthContextProps {
    authenticated: boolean,
    handleLogin(credentials: SignInCredentials): void,
    handleLogOut(): void,
    loading: boolean,
    userType: string,
    user: UserProps
}


const Context = createContext<AuthContextProps>({} as AuthContextProps)
function AuthProvider({ children }: { children: ReactNode }) {
    const { authenticated,
        userType,
        handleLogin,
        handleLogOut,
        loading,
        user, } = useAuth()

    return (
        <Context.Provider value={{
            authenticated,
            userType,
            handleLogin,
            handleLogOut,
            loading,
            user,
        }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }