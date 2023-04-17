import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { useState } from "react";

const FormContacto = () => {
  const [validated, setValidated] = useState(false);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [send, setSend] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      Swal.fire(
        "Gracias por contactarnos!",
        "Nos comunicaremos a la brevedad.",
        "success"
      );
      setSend(true);
    }
    setValidated(true);
  };

  if (validated && send) {
    setName1("");
    setName2("");
    setEmail("");
    setPhone("");
    setMessage("");
    setValidated(false);
    setSend(false);
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName1">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            required
            value={name1}
            onChange={(e) => {
              setName1(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese su nombre.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridName2">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            required
            value={name2}
            onChange={(e) => {
              setName2(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese su apellido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese su correo electónico.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridPhone">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="tel"
            required
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un teléfono de contacto.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridMessage">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
};

export default FormContacto;
