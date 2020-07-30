import React from "react";
import Routes from "./assets/routes";
import store from "./assets/flux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
