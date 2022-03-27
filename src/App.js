import { Login } from "./components/auth/Login";
import { Provider } from "react-redux";

import { store } from "./stores/store";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <Provider store={store}>
      <AppRouter>
        <div className="App">
          <Login />
        </div>
      </AppRouter>
    </Provider>
  );
}

export default App;
