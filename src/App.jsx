import React, { useEffect, useState } from "react";
import Builder from "./components/Builder";
import Preview from "./components/Preview";
import Form from "./components/Form";
import { Container, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  const [tab, setTab] = useState(0);
  const [templates, setTemplates] = useState(() => {
    return JSON.parse(localStorage.getItem("templates")) || [];
  });
  const [activeTemplateId, setActiveTemplateId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    localStorage.setItem("templates", JSON.stringify(templates));
  }, [templates]);

  const currentTemplate = templates.find((t) => t.id === activeTemplateId);

  return (
    <Box
      sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", overflowX: "auto" }}
    >
      <Toaster position="top-right" />

      <Navbar tab={tab} setTab={setTab} />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {tab === 0 && (
          <Builder
            templates={templates}
            setTemplates={setTemplates}
            activeTemplateId={activeTemplateId}
            setActiveTemplateId={setActiveTemplateId}
          />
        )}
        {tab === 1 && <Preview template={currentTemplate} />}
        {tab === 2 && (
          <Form
            template={currentTemplate}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
