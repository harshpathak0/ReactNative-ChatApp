import { createContext , useState} from "react";

const UserType = createContext();

const UserContext = ({children}) => {
    const [userId, setUserID] = useState("");
    return(
        <UserType.Provider value={{userId, setUserID}}>
            {children}
        </UserType.Provider>
    )
}

export {UserType, UserContext}
