import NavBar from "./components/NavBar";
//import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "./App.css";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Contacto from "./components/Contacto";
import Page_404 from "./components/Page_404";

function App() {
  const [productos, setProductos] = useState([]);

  const getProducts = () => {
    try {
      fetch("../public/productos.json")
        .then((res) => res.json())
        .then((data) => setProductos(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  /**/
  return (
    <>
      <NavBar />
      <div className={Styles.banner}>
        <img
          src="../public/assets/images/banner.jpeg"
          alt="banner"
          width="100%"
          height="200px"
        />
      </div>
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:id" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/contact" element={<Contacto />} />
        <Route path="/404" element={<Page_404 />} />
        <Route path="*" element={<Page_404 />} />
      </Routes>
    </>
  );
}

export default App;
