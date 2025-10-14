import SearchContextProvider from "./context/SearchContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <SearchContextProvider>
      <AppRoutes />
    </SearchContextProvider>
  );
};

export default App;
