import { Toaster } from "react-hot-toast";
import SearchContextProvider from "./context/SearchContext";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setCheckingAuthFalse, setUser } from "./features/auth/authSlice";
import { api } from "./lib/utils/axiosInstance";
import { useGetUserProfile } from "./hooks/user/useUser";
import Spinner from "./components/ui/Spinner";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const checkingAuth = useSelector((state: RootState) => state.auth.checkingAuth);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      try {
        const user = await useGetUserProfile();
        if (user && user.data) {
          dispatch(setUser(user.data.data));
          if (user.data.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }
      } catch (err: any) {
        try {
          const user = await api.get("/auth/refresh-token");
          dispatch(setUser(user.data.data));
          if (user.data.data.role === "admin") {
            navigate("/admin");
          }
        } catch (err: any) {
          dispatch(setCheckingAuthFalse());
          navigate("/");
        }
      }
    };
    getUser();
  }, []);
  if (checkingAuth) {
    return <Spinner />;
  }

  return (
    <SearchContextProvider>
      <AppRoutes />
      <Toaster />
    </SearchContextProvider>
  );
};

export default App;
