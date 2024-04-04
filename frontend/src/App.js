import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
// import { Button } from "@chakra-ui/react";
import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";
function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact/>
      <Route path="/chats" component={ChatPage}/>
      {/* <Route path="/" /> */}
    </div>
  );
}

export default App;
