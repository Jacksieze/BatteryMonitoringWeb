import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./common/theme";
import { Provider } from "react-redux";
import store from "./store/batteryData";
import { AuthProvider } from "./util/AuthContext";
import Routes from "./Routes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
