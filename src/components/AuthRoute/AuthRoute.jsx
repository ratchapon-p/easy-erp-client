import React from "react";
import LoginPage from "../../pages/LoginPage/LoginPage";

const AuthRoute = ({children}) =>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const isLoggedIn = user?.data?.token ? true : false;

    if(!isLoggedIn) return <LoginPage />
    return<>{children}</>;

}

export default AuthRoute;