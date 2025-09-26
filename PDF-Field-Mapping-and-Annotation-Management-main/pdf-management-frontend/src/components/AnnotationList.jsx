
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function AnnotationList({ annotations, onSaveAll }) {
  if (annotations.length === 0) {
    return null; // Don't show anything if the list is empty
  }

  return (
    <div className="mt-5">
      <h3 className="mb-3">4. Staged Annotations</h3>
      <ListGroup className="mb-3">
        {annotations.map((ann, index) => (
          <ListGroup.Item key={index}>
            <strong>{ann.fieldName}</strong> ({ann.fieldType}) - Page {ann.page}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="primary" size="lg" className="w-100" onClick={onSaveAll}>
        Save All to Database
      </Button>
    </div>
  );
}