import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";


import Home from "./views/Home/Home.js";
import HeaderNav from "./components/HeaderNav/HeaderNav.js";

function App() {
  return (
    <div className="App">
      <HeaderNav></HeaderNav>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
