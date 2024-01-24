// import { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./layout/Layout";
// import { useAuth } from "./util/AuthContext";
// import LoadingSpinner from "./common/loadingSpinner";

const Routes = () => {
  // const { isLoggedin } = useAuth();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (isLoggedin === null) return;
  //   if (!isLoggedin && location.pathname !== "/") {
  //     alert("로그인이 필요합니다.");
  //     navigate("/");
  //   }
  //   setLoading(false);
  // }, [isLoggedin, navigate, location]);

  const routing = useRoutes([
    { path: "/", element: <LoginPage /> },
    { path: "/monitor", element: <Layout /> },
  ]);

  // if (loading) return <LoadingSpinner />;

  return routing;
};

export default Routes;
