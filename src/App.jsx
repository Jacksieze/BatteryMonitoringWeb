import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from "styled-components";
import theme from "./common/theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/monitor" element={<Layout />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
