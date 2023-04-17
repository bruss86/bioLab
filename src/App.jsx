import { Routes, Route } from "react-router-dom";
import Styles from "./App.css";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Contacto from "./components/Contacto";
import Page_404 from "./components/Page_404";
import CartProvider from "./context/CartContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <>
      <CartProvider>
        <NavBar />
        <div className={Styles.banner}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/biolab-bd5dc.appspot.com/o/products%2Fbanner.jpeg?alt=media&token=ac741af0-e98f-4222-b53f-82c963c0a279"
            alt="banner"
            width="100%"
            height="200px"
          />
        </div>

        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:idCategory" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/contact" element={<Contacto />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/404" element={<Page_404 />} />
          <Route path="*" element={<Page_404 />} />
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
