import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("cv");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file && !description) {
      setError("Please upload a file or describe what you need.");
      return;
    }
  
    if (!name || !email) {
      setError("Please fill in your name and email.");
      return;
    }
  
    setError("");
    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("description", description);
    formData.append("option", option);
    formData.append("name", name);
    formData.append("email", email);
  
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch (err) {
      setError("Error uploading. Please check your connection.");
    }
  };

  return (
    <>
      <div className="top-banner px-4 py-2 d-flex flex-column align-items-start">
        <h5 className="m-0 fw-bold">CV Refinement Service</h5>
        <small className="text-muted">cvcover.revamp@gmail.com</small>
      </div>

      <div className="header-section d-flex align-items-center justify-content-center flex-column text-center px-3">
        <h1 className="display-5 fw-bold">Elevate Your Career</h1>
        <p className="lead">
          With over 5 years of recruitment experience, we craft professional, ATS-friendly CVs and cover letters
          that make you stand out.
        </p>
        <p>Choose your package and get noticed today!</p>
      </div>

      <Container className="mt-4 mb-5">
        {submitted && <Alert variant="success">Your request has been received. We’ll be in touch soon!</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  placeholder="e.g. you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Select Package</Form.Label>
            <Form.Select size="sm" value={option} onChange={(e) => setOption(e.target.value)}>
              <option value="cv">CV Revamp (R100)</option>
              <option value="cover_letter">Cover Letter Only (R65)</option>
              <option value="combo">CV + Cover Letter Combo (R150)</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Your Existing CV (optional)</Form.Label>
            <Form.Control size="sm" type="file" onChange={(e) => setFile(e.target.files[0])} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Or Describe What You Need</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              size="sm"
              placeholder="Tell us about your experience, the role you're applying for, or specific help you need..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" size="sm" type="submit">
            Submit Request
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default App;
