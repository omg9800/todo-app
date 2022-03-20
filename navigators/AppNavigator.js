import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Login from "../screens/LoginScreen";

const AppNavigator = (props) => {
  //   const isAuth = false; //useSelector((state) => !!state.auth.token);

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      {isAuth && <Home user={user} setIsAuth={setIsAuth} />}
      {!isAuth && <Login setIsAuth={setIsAuth} user={user} setUser={setUser} />}
    </NavigationContainer>
  );
};

export default AppNavigator;
