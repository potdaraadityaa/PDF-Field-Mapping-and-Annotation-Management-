
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Button from 'react-bootstrap/Button';
import AnnotationLayer from './AnnotationLayer';
import HighlightLayer from './HighlightLayer'; 

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

// The viewer can now handle both drawing (onNewAnnotation) and displaying (annotations)
export default function PdfViewer({ file, onNewAnnotation, annotations, activeAnnotationId, pageNumber, setPageNumber }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    if (!pageNumber) { // Set to first page only if not already set
        setPageNumber(1);
    }
  }

  function goToPrevPage() {
    setPageNumber(prev => Math.max(prev - 1, 1));
  }

  function goToNextPage() {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  }
  
  const handleNewAnnotation = (rect) => {
    onNewAnnotation({ ...rect, page: pageNumber });
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center mb-3">
        <Button onClick={goToPrevPage} disabled={pageNumber <= 1} className="me-3">Prev</Button>
        <p className="mb-0">Page {pageNumber} of {numPages}</p>
        <Button onClick={goToNextPage} disabled={pageNumber >= numPages} className="ms-3">Next</Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', border: '1px solid #ddd' }}>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <div className="pdf-page-container">
            <Page pageNumber={pageNumber} />
            {/* Conditionally render the correct layer based on the props passed */}
            {onNewAnnotation && <AnnotationLayer onNewAnnotation={handleNewAnnotation} />}
            {annotations && <HighlightLayer annotations={annotations.filter(a => a.annotation.page === pageNumber)} activeAnnotationId={activeAnnotationId} />}
          </div>
        </Document>
      </div>
    </div>
  );
}