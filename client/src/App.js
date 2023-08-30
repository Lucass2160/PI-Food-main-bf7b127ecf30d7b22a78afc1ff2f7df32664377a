import { Home, Form, Landing } from "./views";
import Details from "./components/Details/Details";
import NavBar from "./components/NavBar/NavBar";
import { Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function App() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/">
        <Landing />
      </Route>

      <Route exact path="/create">
        <Form />
      </Route>

      <Route exact path={`/recipes/:id`}>
        <Details />
      </Route>

      <Route path="/home">
        <Home />
      </Route>
      {location.pathname == "/home" && <Footer />}
    </div>
  );
}

export default App;
