import * as React from "react";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import "./Main.css";

import Announcement from "./Announcements.js";
import AnnouncementAdmin from "./AnnouncementAdmin";
import Login from "./Login.js";
import MainLayout from "./MainLayout.js";
import MyProfile from "./MyProfile.js";
import Register from "./Register.js";
import RequestAdmin from "./RequestAdmin.js";

// React private route:
// Redirects user to login page when a user is not logged in and tries to access other url that requires login
const PrivateRoute = ({ children, user, ...rest }) => {
  const location = useLocation();
  if (user !== null) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }
};

// Redirects non-admin user to announcement page when user tries to admin-only page
const PrivateAdminRoute = ({ children, user, ...rest }) => {
  const location = useLocation();
  if (user !== null && user.role === "admin") {
    return <Route {...rest}>{children}</Route>;
  } else {
    return <Redirect to={{ pathname: "/", state: { from: location } }} />;
  }
};

// Redirects admin user to announcement page when admin tries to access user-only page
const PrivateUserRoute = ({ children, user, ...rest }) => {
  const location = useLocation();
  if (user !== null && user.role !== "admin") {
    return <Route {...rest}>{children}</Route>;
  } else {
    return <Redirect to={{ pathname: "/", state: { from: location } }} />;
  }
};

function Main() {
  const history = useHistory();
  const [user, setUser] = React.useState(null);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/announcements" />
        </Route>

        <Route path="/login">
          <Login
            onLogin={(user) => {
              setUser(user);
              history.push("/announcements");
            }}
          />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <PrivateRoute path="/announcements" user={user} exact>
          <MainLayout user={user}>
            <Announcement />
          </MainLayout>
        </PrivateRoute>

        <PrivateAdminRoute path="/announcement-management" user={user} exact>
          <MainLayout user={user}>
            <AnnouncementAdmin />
          </MainLayout>
        </PrivateAdminRoute>

        <PrivateAdminRoute path="/request-management" user={user} exact>
          <MainLayout user={user}>
            <RequestAdmin />
          </MainLayout>
        </PrivateAdminRoute>

        <PrivateUserRoute path="/profile" user={user} exact>
          <MainLayout user={user}>
            <MyProfile />
          </MainLayout>
        </PrivateUserRoute>
      </Switch>
    </div>
  );
}

export default Main;
