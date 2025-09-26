
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// This form now takes the drawn box's data and a save function
export default function AnnotationForm({ drawnBox, onSaveAnnotation }) {
  const [formData, setFormData] = useState({
    fieldName: '',
    fieldHeader: '',
    fieldType: 'CharField',
  });

  // When a new box is drawn, clear the form for new input
  useEffect(() => {
    setFormData({ fieldName: '', fieldHeader: '', fieldType: 'CharField' });
  }, [drawnBox]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveAnnotation(formData); // Send the form data up to the App component
  };
  
  // Don't show the form until a box has been drawn
  if (!drawnBox) {
    return <p className="text-muted">Draw a box on the PDF to map a new field.</p>;
  }

  return (
    <Card className="p-4 mb-4 shadow-sm">
      <Card.Title as="h3" className="mb-4">3. Enter Field Details</Card.Title>
      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Field Name</Form.Label>
              <Form.Control
                type="text" name="fieldName" value={formData.fieldName}
                onChange={handleChange} placeholder="e.g., Bar_Code" required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Field Header</Form.Label>
              <Form.Control
                type="text" name="fieldHeader" value={formData.fieldHeader}
                onChange={handleChange} placeholder="e.g., Enter barcode"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Field Type</Form.Label>
              <Form.Select name="fieldType" value={formData.fieldType} onChange={handleChange}>
                <option>CharField</option>
                <option>DateField</option>
                <option>NumberField</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" type="submit" className="w-100 mt-4">
          Add to Staging List
        </Button>
      </Form>
    </Card>
  );
}