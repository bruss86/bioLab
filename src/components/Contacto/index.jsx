import Styles from "./Contacto.module.css";
import FormContacto from "../formContacto";

const Contacto = () => {
  return (
    <div className={Styles.container}>
      <h1>CONTACTO</h1>
      <FormContacto />
    </div>
  );
};

export default Contacto;
