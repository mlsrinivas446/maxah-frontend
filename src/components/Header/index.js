import React, { useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import ReactContext from '../../context/ReactContext';
import "./index.css";

const Header = () => {
  const { searchInput, onSetSearchInput } = useContext(ReactContext); // update search input in context
  const [input, setInput] = useState(searchInput); // hook to manage user search input
  const location = useLocation(); // use to get current route path

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = () => {
    onSetSearchInput(input);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className='d-flex flex-row justify-content-between'>
        <Link to="/" className="header-title fw-bold text-secondary text-decoration-none">
          MAXAH
        </Link>
        {/*conditionally displaying home section based on current route path */}
        {location.pathname.includes('/product-details') && (
          <Link to="/" className="fw-bold text-secondary text-decoration-none">
            Home
          </Link>
        )}
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            value={input}
            onChange={handleInputChange}
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success" onClick={handleSearch}>Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Header;
