import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Form, Image, Alert } from "react-bootstrap";

const EmpresaImagemScreen = () => {
  const [empresa, setEmpresa] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get("http://localhost:8000/api/empresas/minha_empresa", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEmpresa(response.data.data.empresa);
        setFormData({ 
          name: response.data.data.empresa.name, 
          email: response.data.data.empresa.email, 
          password: "" 
        });
      } catch (error) {
        setMensagem("Erro ao carregar os dados da empresa.");
      }
    };

    fetchEmpresa();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImagem(file);
    setPreview(URL.createObjectURL(file)); 
  };

  const handleUpload = async () => {
    if (!imagem) {
      setMensagem("Selecione uma imagem antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("imagem", imagem);

    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.put("http://localhost:8000/api/empresas/atualizar_imagem", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMensagem("Imagem atualizada com sucesso!");
      setEmpresa({ ...empresa, imagem: response.data.data.imagem });
    } catch (error) {
      setMensagem("Erro ao enviar a imagem.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("jwt");
      await axios.put("http://localhost:8000/api/empresas/editar_empresa", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMensagem("Dados atualizados com sucesso!");
      setEmpresa({ ...empresa, ...formData });
    } catch (error) {
      setMensagem("Erro ao atualizar os dados.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Imagem da Empresa</h2>
      
      {mensagem && <Alert variant="info">{mensagem}</Alert>}

      {empresa && (
        <>
          <Image
            src={preview || `http://localhost:8000/${empresa.imagem}`}
            alt="Imagem da Empresa"
            roundedCircle
            width={150}
            height={150}
            className="mb-3"
          />
          <Form.Group>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button className="mt-2" variant="primary" onClick={handleUpload}>
            Atualizar Imagem
          </Button>

          <div className="mt-3">
            <Form.Group className="mt-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Password (deixe em branco para não alterar)</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>

            <Button className="mt-3" variant="success" onClick={handleUpdate}>
              Atualizar Dados
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default EmpresaImagemScreen;
