import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import PdfViewer from '../components/PdfViewer'; // Import the viewer
import Form from 'react-bootstrap/Form';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/pdf-annotation-mappings/fetch-create-table`;

export default function ExecutivePage() {
  const [mappings, setMappings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for the PDF viewer
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [activeAnnotationId, setActiveAnnotationId] = useState(null);

  useEffect(() => {
    axios.post(API_URL)
      .then(response => setMappings(response.data))
      .catch(err => setError('Failed to fetch data.'))
      .finally(() => setLoading(false));
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(file);
      setPdfUrl(URL.createObjectURL(file));
    }
  };
  
  // When a user clicks a field in the list
  const handleFieldClick = (mapping) => {
    // Set the active highlight
    setActiveAnnotationId(mapping.id);
    // Jump to the correct page in the PDF
    setPageNumber(mapping.annotation.page);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Executive Review Page</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {/* Column for the list of fields */}
        <Col md={4}>
          <h4>Mapped Fields</h4>
          {loading ? <p>Loading...</p> : (
            <ListGroup>
              {mappings.length > 0 ? mappings.map(mapping => (
                <ListGroup.Item 
                  key={mapping.id} 
                  action 
                  active={activeAnnotationId === mapping.id} // Highlight the active item in the list
                  onClick={() => handleFieldClick(mapping)} 
                  style={{ cursor: 'pointer' }}
                >
                  <div className="fw-bold">{mapping.field_name}</div>
                  <div>Type: {mapping.field_type} | Page: {mapping.annotation.page}</div>
                </ListGroup.Item>
              )) : <ListGroup.Item>No saved mappings found.</ListGroup.Item>}
            </ListGroup>
          )}
        </Col>

        {/* Column for the PDF viewer */}
        <Col md={8}>
          <h4>PDF Preview</h4>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload PDF to see highlights</Form.Label>
            <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
          </Form.Group>

          {pdfFile && (
            <PdfViewer 
              file={pdfUrl} 
              annotations={mappings}
              activeAnnotationId={activeAnnotationId}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}