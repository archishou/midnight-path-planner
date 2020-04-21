import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

// Layouts & Route
import routes from "./routes";
import PublicLayout from "./shared/layout/PublicLayout";
import AuthLayout from "./shared/layout/AuthLayout/AuthLayout";

// Public pages
import LoginPage from "./pages/LoginPage";

// Authenticated pages
import FieldPage from "./pages/PathPlanning/FieldPage";
// Uncomment below to use a custom 404 page
// import NotFoundPage from "./pages/NotFoundPage";

const pages = [
  // Public pages
  {
    exact: true,
    path: routes.login,
    component: LoginPage,
    layout: PublicLayout
  },
  // Authenticated pages
  {
    exact: false,
    path: routes.field,
    component: FieldPage,
    layout: AuthLayout
  }
];

const App = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Switch>
        {pages.map(
          ({ exact, path, component: Component, layout: Layout }, index) => (
            <Route
              key={index}
              exact={exact}
              path={path}
              render={props => (
                <Layout history={props.history}>
                  <Component {...props} />
                </Layout>
              )}
            />
          )
        )}
        <Redirect to={routes.login} />
        {/* Or Uncomment below to use a custom 404 page */}
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </Router>
  );
};

export default App;
