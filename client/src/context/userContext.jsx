import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export default function UserContextProvider({ children }) {

    const [users, SetUsers] = useState([])
    const [stores, SetStores] = useState([])

    const LoadStores = async () => {
        try {
            let res = await fetch('http://localhost:5000/api/stores')//fetches stores.json file
            let data = await res.json()//JSON obj that holds the stores array
            let storesArray = data.storesArr  //takes the storesArr directly from stores.json file
            // console.table(storesArray)
            SetStores(storesArray)
        } catch (error) {
            console.log(error);
        }
    }

    const LoadUsers = async () => {
        try {
            let res = await fetch('http://localhost:5000/api/users')
            let data = await res.json()
            // console.table(data)
            SetUsers(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        LoadUsers()
    }, [])

    useEffect(() => {
        LoadStores()
    }, [])

    const value = {
        users,
        stores,

    }



    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}