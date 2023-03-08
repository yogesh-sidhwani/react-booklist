import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import BookDisplay from "./BookDisplay";
import Cart from "./Cart";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginForm />
        </Route>
        <Route exact path="/books">
          <BookDisplay cart={cart} setCart={setCart} />
        </Route>
        <Route exact path="/cart">
          <Cart cart={cart} setCart={setCart} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
