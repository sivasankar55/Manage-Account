import React, {createContext,useState,useMemo,useContext} from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const initialUsers = [
    {id:"1", username:"sifa", email:"sifa@gmaile.com", password:"sifa1234567"}
];

export const AuthProvider = ({children}) => {
    const [users, setUsers] = useState(initialUsers);
    const  [currentUser, setCurrentUser] = useState(null);


    const register = (userData) => {
        if(users.find(u => u.username === userData.username )) {
            return {success:false, error:'Username already taken.'};
        }
        if (users.find(u => u.email === userData.email)) {
            return{success:false, error:'Email already registered.'};
        }

        const newUser = {
            ...userData,
            id:Date.now().toString() // unique id generation
        };

        setUsers(prevUsers => [...prevUsers, newUser]);
        setCurrentUser(newUser) // login the new user immediately
        return {success:true};
    };


    //log in user 
 
    const login = (loginIdentifier, password) => {
         const user = users.find(u =>( u.username === loginIdentifier || u.email === loginIdentifier) && u.password === password);
          
         if(user) {
             setCurrentUser(user);
             return {success:true};
         }else {
            return {success:false, error:'Invalid credentials. please try again.'}
         }
    };

    // logout current user

    const logout = () => {
        setCurrentUser(null);
    };

    // update existing user

    const updateAccount = (id,newFields) => {
        setUsers(prevUsers => prevUsers.map(user => {
            if(user.id === id) {
                const updateUser = {...user,...newFields};
                setCurrentUser(updateAccount); // update the user
                return updateUser;
            }
            return user;
        }));
        return {success:true};
    };

    //memoize the context value to prevent unnecessary re-renders

    const value = useMemo(() => ({
        currentUser,
        login,
        logout,
        register,
        updateAccount,
        isAuthenticated: !!currentUser // auth check
    }),[currentUser,users])

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}