import { useContext, useEffect } from "react";
import { API } from "./api/apiRequest";
import Resultoutput from "./components/resultoutput/Resultuotput";
import SomeComponent from "./components/someComponents/SomeComponent";
import { GlobalStateProvider } from "./context/GlobalStateProvider";
import { setError, setSuccess, sendMessage } from "./utils";
import ParangaForViewport from "./components/parangaForViewport/ParangaForViewport";
import {
  UserDataContext,
  UserDataContextProvider,
} from "./context/userDataContext";

function App() {
  const config = [
    {
      name: "categories",
      apiUrl:
        "https://tatiwana-lux.com/api/collections/Group?lang=uk&store=5867d1b3163808c33b590c12",
      //"https://tatiana-lux.com/api/collections/Group?lang=uk&store=5867d1b3163808c33b590c12",
    },
  ];

  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    // setError("Error message");
    // setSuccess("Success message");
    // sendMessage("showParange");
    // setTimeout(() => {
    //   setError("");
    //   setSuccess("");
    // }, 5000);
    // setTimeout(() => {
    //   sendMessage("hideParange");
    // }, 2000);
    // console.log(userData);
  }, []);

  return (
    <UserDataContextProvider>
      <GlobalStateProvider initialConfig={config} apiRequest={API}>
        <div className="App">
          <header className="App-header">
            <h1>React State Management Test</h1>
            <SomeComponent />
          </header>
        </div>
        <Resultoutput />
        <ParangaForViewport />
      </GlobalStateProvider>
    </UserDataContextProvider>
  );
}

export default App;
