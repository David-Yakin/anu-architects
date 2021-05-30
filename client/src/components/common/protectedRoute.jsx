import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/userService";

const ProtectedRoute = ({ title, path, component: Component, render, ...rest }) => {
  const currentUser = getCurrentUser();
  return (
    <Route
      {...rest}
      render={props => {
        if (!currentUser || (currentUser[title] === false))
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props =>{});
      }}
    />
  );
};

export default ProtectedRoute;

/*
import ProtectedRoute from '../common/protectedRoute'

 <ProtectedRoute path='' 
                component={} 
                title={"כותרת"} 
                 />
   הוא יחפש את הנתון "כותרת" שבסוגריים המסולסלות של הכותרת בפרופס ואם הוא שקר יעביר את המשתמש לדף הבית 
*/