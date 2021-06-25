import { Switch, Route, Redirect } from "react-router-dom";
import React, { lazy, Suspense, useContext } from "react";
import AppBar from "./Components/AppBar/";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container } from "@material-ui/core";

import { FirebaseContext } from "./index";
import Loader from "./Components/Loader";
const HomeView = lazy(
  () => import("./views/HomeView" /*webpackChunkName: "HomeView" */)
);
const MoviesView = lazy(
  () => import("./views/MoviesView" /*webpackChunkName: "MoviesView" */)
);
const MovieDetailsPage = lazy(
  () =>
    import("./views/MovieDetailsPage" /*webpackChunkName: "MovieDetailsPage" */)
);
const FavoriteMovieView = lazy(
  () => import("./views/FavoriteMovieView/FavoriteMovieView")
);
const LoginView = lazy(() => import("./views/LoginView/LoginView"));
export const App: React.FC = () => {
  const { auth } = useContext(FirebaseContext);
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<div>Downloading...</div>}>
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>
          <Route exact path="/movies">
            <MoviesView />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route exact path="/favorite">
            {user ? <FavoriteMovieView /> : <Redirect to={"/login"} />}
          </Route>
          <Route path="/login">
            {!user ? <LoginView /> : <Redirect to={"/"} />}
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
};
