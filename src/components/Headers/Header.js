import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../logos/logo.png'



const Headers = () => {

    return (
        <div className="col-md-12 pb-5">
            <div className="col-md-10 col-sm-10 col-10 m-auto">
                <Navbar expand="lg">
                    <Navbar.Brand href="#home"><img src={logo} width="300px" height="80px" alt="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            
                            <Link to="/">
                                <Nav.Link href="#home" className="mx-4"><strong className="text-dark">Home</strong></Nav.Link>
                            </Link>
                            <Link to="/donetions">
                                <Nav.Link href="#home" className="mx-4"><strong className="text-dark">Donation</strong></Nav.Link>
                            </Link>
                            <Nav.Link href="#home" className="mx-4"><strong className="text-dark">Events</strong></Nav.Link>
                            <Nav.Link href="#home" className="mx-4"><strong className="text-dark">Blog</strong></Nav.Link>
                            <Link to="/register"><Button variant="primary" className="ml-4 px-4">Register</Button></Link>
                            <Button variant="dark" className="ml-2 px-4">Admin</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    );
};

export default Headers;