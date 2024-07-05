//import SomeComponent from "./components/someComponents/SomeComponent";
import { GlobalStateProvider } from "./context/GlobalStateProvider";
import { RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary";

interface IProps {
  router?: any;
  initConfig: any;
}

const App: React.FC<IProps> = ({ router, initConfig }) => {
  return (
    <ErrorBoundary>
      <GlobalStateProvider initialConfig={initConfig}>
        <RouterProvider router={router} />
      </GlobalStateProvider>
    </ErrorBoundary>
  );
};

export default App;
