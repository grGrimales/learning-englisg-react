import { Login } from "./components/auth/Login";
import { Provider } from "react-redux";

import { store } from "./stores/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Login />
      </div>
    </Provider>
  );
}

export default App;
