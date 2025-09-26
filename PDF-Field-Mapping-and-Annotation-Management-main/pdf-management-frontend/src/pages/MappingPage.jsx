import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import PdfViewer from '../components/PdfViewer';
import AnnotationForm from '../components/AnnotationForm';
import AnnotationList from '../components/AnnotationList';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

export default function MappingPage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [drawnBox, setDrawnBox] = useState(null);
  const [stagedAnnotations, setStagedAnnotations] = useState([]);
  const [message, setMessage] = useState('');
  
  const [pageNumber, setPageNumber] = useState(1); // State to control the PDF page

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(file);
      setPdfUrl(URL.createObjectURL(file));
      setStagedAnnotations([]);
      setDrawnBox(null);
      setMessage('');
      setPageNumber(1); // Reset to page 1 on new file upload
    }
  };
  
  const handleNewAnnotationDrawn = (newBox) => {
    console.log("New Annotation Drawn:", newBox);
    setDrawnBox(newBox);
  };

  const handleSaveAnnotation = (formData) => {
    const newAnnotation = {
      processId: 49, formId: 20, fieldId: Math.floor(Math.random() * 1000),
      fieldName: formData.fieldName, fieldHeader: formData.fieldHeader, fieldType: formData.fieldType,
      bbox: { x1: drawnBox.x1, y1: drawnBox.y1, x2: drawnBox.x2, y2: drawnBox.y2 },
      page: drawnBox.page, scale: 1.5, metadata: JSON.stringify({ required: true, max_length: 50 })
    };
    setStagedAnnotations(prev => [...prev, newAnnotation]);
    setDrawnBox(null);
  };
  
  const handleSaveAllToDb = () => {
    setMessage('');
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/pdf-annotation-mappings/bulk`, stagedAnnotations)
      .then(response => {
        setMessage('Annotations saved successfully!');
        setStagedAnnotations([]);
      })
      .catch(error => {
        console.error("Error saving annotations:", error);
        setMessage('Error saving annotations. See console for details.');
      });
  };

  return (
    <Container className="mt-4">
      {message && <Alert variant={message.includes('Error') ? 'danger' : 'success'}>{message}</Alert>}
      
      <Card className="p-4 mb-4 shadow-sm">
        <Card.Title as="h2" className="mb-4">1. Upload PDF</Card.Title>
        <Form.Group controlId="formFile">
          <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
        </Form.Group>
      </Card>

      {pdfFile && (
        <>
          <Card className="p-4 mb-4 shadow-sm">
            <Card.Title as="h2" className="mb-4">2. Draw Annotations on PDF</Card.Title>
            
            
            <PdfViewer 
              file={pdfUrl} 
              onNewAnnotation={handleNewAnnotationDrawn}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />

          </Card>
          
          <AnnotationForm drawnBox={drawnBox} onSaveAnnotation={handleSaveAnnotation} />
          <AnnotationList annotations={stagedAnnotations} onSaveAll={handleSaveAllToDb} />
        </>
      )}
    </Container>
  );
}