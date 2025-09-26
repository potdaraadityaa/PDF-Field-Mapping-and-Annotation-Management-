// src/App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import MappingPage from './pages/MappingPage';
import ExecutivePage from './pages/ExecutivePage';

function App() {
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            {/* --- NEW: Image tag for the logo --- */}
            <img
              alt="App Logo"
              src="/logo-BEsXc0Kh.jpg" // This path points to the 'public' folder
              width="120"
              height="60"
              className="d-inline-block align-top me-2" // Bootstrap classes for styling
            />
            PDF Annotation Tool
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Mapping Page</Nav.Link>
            <Nav.Link as={Link} to="/executive">Executive Page</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<MappingPage />} />
        <Route path="/executive" element={<ExecutivePage />} />
      </Routes>
    </div>
  );
}

export default App;