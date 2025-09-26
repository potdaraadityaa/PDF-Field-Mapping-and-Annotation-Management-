
import { useState, useRef } from 'react';

export default function AnnotationLayer({ onNewAnnotation }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentRect, setCurrentRect] = useState(null);
  const layerRef = useRef(null);

  const getCoords = (e) => {
    const rect = layerRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = getCoords(e);
    setStartPos(pos);
    setCurrentRect({ x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const pos = getCoords(e);
    setCurrentRect({ ...currentRect, x2: pos.x, y2: pos.y });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    // Normalize coordinates to ensure x1 < x2 and y1 < y2
    const finalRect = {
      x1: Math.min(startPos.x, currentRect.x2),
      y1: Math.min(startPos.y, currentRect.y2),
      x2: Math.max(startPos.x, currentRect.x2),
      y2: Math.max(startPos.y, currentRect.y2),
    };
    
    onNewAnnotation(finalRect); // Send the final rectangle to the parent
    setCurrentRect(null); // Reset for the next drawing
  };

  return (
    <div
      ref={layerRef}
      className="annotation-layer"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // End drawing if mouse leaves the area
    >
      {currentRect && (
        <div
          className="drawn-box"
          style={{
            left: Math.min(currentRect.x1, currentRect.x2),
            top: Math.min(currentRect.y1, currentRect.y2),
            width: Math.abs(currentRect.x1 - currentRect.x2),
            height: Math.abs(currentRect.y1 - currentRect.y2),
          }}
        />
      )}
    </div>
  );
}