import React from "react";
import "./App.css";
import Main from "./components/Main";
import Loading from "./components/Loading";

const WithLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <Loading /> : <Component {...rest} />;

const MainWithLoading = WithLoading(Main);

const App = props => {
  return (
    <div className="App">
      <MainWithLoading />
    </div>
  );
};

export default App;
