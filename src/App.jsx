import NavBar from "./components/NavBar";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ItemListContainer from "./components/ItemListContainer";

function App() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="container-propio">
        <ItemListContainer greeting="Bienvenido a la tienda de los Laboratorios" />
      </div>
    </>
  );
}

export default App;
