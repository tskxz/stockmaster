import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Form, Image, Alert } from "react-bootstrap";

const EmpresaImagemScreen = () => {
  const [empresa, setEmpresa] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get("http://localhost:8000/api/empresas/minha_empresa", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmpresa(response.data.data);
      } catch (error) {
        setMensagem("Erro ao carregar os dados da empresa.");
      }
    };

    fetchEmpresa();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImagem(file);
    setPreview(URL.createObjectURL(file)); // Gerar uma pré-visualização da imagem
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
        </>
      )}
    </Container>
  );
};

export default EmpresaImagemScreen;
