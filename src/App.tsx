import { API } from "./api/apiRequest";
//import SomeComponent from "./components/someComponents/SomeComponent";
import { GlobalStateProvider } from "./context/GlobalStateProvider";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/error-boundary";

interface IProps {
  router?: any;
  initConfig: any;
}

const App: React.FC<IProps> = ({ router, initConfig }) => {
  return (
    <ErrorBoundary>
      <GlobalStateProvider initialConfig={initConfig} apiRequest={API}>
        <div className="mainCootainer">
          <RouterProvider router={router} />
        </div>
      </GlobalStateProvider>
    </ErrorBoundary>
  );
};

export default App;
