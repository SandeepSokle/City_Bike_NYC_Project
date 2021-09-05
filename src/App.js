import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Station from "./Station";
import Navbar from "./Navbar";
import Feature from "./Feature";
import Search from "./Search";
import Login from "./Login";
import About from "./About";
import Pricing from "./Pricing";
import Payment from "./Payment";
import {useState} from "react"
function App() {
  let [data,setData] = useState([]);
  return (
    <>
      <Router>
        <Navbar />
        <div className = "p-4 row">
        <Switch>
          <Route path="/feature">
            <Feature />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/pricing">
            <Pricing />
          </Route>
          <Route path="/payment">
            <Payment/>
          </Route>
          <Route path="/station/:id">
            <Station />
          </Route>
          <Route path="/">
            <Home setData = {setData} data = {data} />
          </Route>
        </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
