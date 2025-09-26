

export default function HighlightLayer({ annotations, activeAnnotationId }) {
  if (!annotations || annotations.length === 0) {
    return null;
  }

  return (
    <div className="highlight-layer">
      {annotations.map(ann => {
        // Use the ID from the database as the key
        const key = ann.id || ann.field_id; 
        const isActive = activeAnnotationId === key;

        return (
          <div
            key={key}
            className="highlight-box"
            style={{
              left: `${ann.annotation.bbox.x1}px`,
              top: `${ann.annotation.bbox.y1}px`,
              width: `${ann.annotation.bbox.x2 - ann.annotation.bbox.x1}px`,
              height: `${ann.annotation.bbox.y2 - ann.annotation.bbox.y1}px`,
              // Apply a different style if this annotation is the active one
              backgroundColor: isActive ? 'rgba(255, 193, 7, 0.4)' : 'transparent',
              border: isActive ? '2px solid #ffc107' : '2px solid rgba(255, 0, 0, 0.5)',
            }}
          />
        );
      })}
    </div>
  );
}