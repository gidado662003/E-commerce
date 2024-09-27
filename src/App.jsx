import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [searchValue, setSearchValue] = useState();
  const [cartLength, setCartLength] = useState(0);

  return (
    <div className="md:mx-28 mx-4">
      <Router>
        <Routes>
          <Route
            element={
              <Header
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                cartLength={cartLength}
              />
            }
          >
            <Route path="/" element={<Home />} />
            <Route
              path="/collection"
              element={<Collection searchValue={searchValue} />}
            />
            <Route
              path="/product/:id"
              element={
                <Product
                  cartLength={cartLength}
                  setCartLength={setCartLength}
                />
              }
            />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="*" element={<>Page Not Found</>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
