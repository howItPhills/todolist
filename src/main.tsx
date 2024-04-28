import ReactDOM from "react-dom/client";
import { App } from "./App";
// import { AppContextPropvider } from "./context/AppContext";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
