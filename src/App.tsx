import Layout from "./components/Layout";
import { AppContextProvider } from "./store";

function App() {
  return (
    <AppContextProvider>
      <Layout />
    </AppContextProvider>
  );
}

export default App;
