import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function EditModal({ show, handleClose, annotation, handleUpdate }) {
  const [formData, setFormData] = useState({ fieldName: '', annotationType: '', parameters: '' });

  useEffect(() => {
    if (annotation) {
      setFormData({
        fieldName: annotation.fieldName,
        annotationType: annotation.annotationType,
        parameters: annotation.parameters,
      });
    }
  }, [annotation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This check prevents the error
    if (annotation) {
      handleUpdate(annotation.id, formData);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Annotation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Field Name</Form.Label>
            <Form.Control
              type="text"
              name="fieldName"
              value={formData.fieldName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Annotation Type</Form.Label>
            <Form.Control
              type="text"
              name="annotationType"
              value={formData.annotationType}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Parameters</Form.Label>
            <Form.Control
              type="text"
              name="parameters"
              value={formData.parameters}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}