import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup
} from "firebase/auth"
import { auth } from "../components/firebase-config"


export const MyContext = createContext({});

export const MyContextProvider = ({ children }) => {
  const [user,setUser] = useState(""); 
  function signUp(email,password){
    return createUserWithEmailAndPassword(auth,email,password)
  }

  function signIn(email,password){
    console.log("Email",email)
    return signInWithEmailAndPassword(auth,email,password)
  }

  // function logOut(){
  //   return signOut(auth)
  // }

  useEffect(() =>{
    const unsubcrise = onAuthStateChanged(auth,(currentUser) => {
      console.log("Auth",currentUser)
      setUser(currentUser);
    });
    return () => {
      unsubcrise();
    }
  }, []);


  return (
    <MyContext.Provider value={{user,signUp,signIn}}>
      {children}
    </MyContext.Provider>
  );
};

export function useUserAuth(){
  return useContext(MyContext);
}

