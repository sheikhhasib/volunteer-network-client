import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../logos/logo.png'
import './Donetion.css'
import Columns from 'react-columns';
import { UserContext } from '../../App';


const Donetion = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [volunteers, setVolunteers] = useState([]);
    const [Id, seId] = useState();
    useEffect(() => {
        fetch('https://floating-hamlet-18259.herokuapp.com/allDonetions?email=' +loggedInUser.email, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            setVolunteers(data)
        })
    }, [Id])
    var queries = [{
        columns: 2,
        query: 'min-width: 500px'
    }, {
        columns: 2,
        query: 'min-width: 1000px'
    }];

    const handleDelete = (id) => {
        console.log(id);
        fetch(`https://floating-hamlet-18259.herokuapp.com/donetionDelete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                seId(result);
            })
    }

    const volunteer = volunteers.map(vl => {
        const { _id, volunteerName, image, date } = vl;
        return (<CardGroup key={_id} className="m-2" >
            <Card style={{ borderRadius: '13px' }}>
                <div className="row">
                    <div style={{ width: '35%', padding: '10px', marginLeft: '15px' }}>
                        <img width="100%" height="150px" src={image} />
                    </div>
                    <div style={{ width: '45%', padding: '20px' }}>
                        <h3>{volunteerName}</h3>
                        <p><strong>{new Date(date).toDateString('dd/MM/yyyy')}</strong></p>
                    </div>
                    <div className="d-flex align-items-end flex-column">
                        <div className="mt-auto p-2">
                            <Button variant="light" className="px-4" onClick={() => handleDelete(_id)}>Cancel</Button>
                        </div>

                    </div>
                </div>
            </Card>
        </CardGroup>)
    })
    return (
        <div className="col-md-12 pb-5 donetion">
            <div className="col-md-10 col-sm-10 col-10 m-auto">
                <Navbar expand="lg">
                    <Navbar.Brand href="#home">
                        <Link to="/">
                            <img src={logo} width="300px" height="80px" alt="" />
                        </Link>
                    </Navbar.Brand>
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
                            <NavDropdown title={loggedInUser ? loggedInUser.name : ''} id="nav-dropdown">
                                <NavDropdown.Item eventKey="4.2"><Link to="/userList" className="text-decoration-none text-dark">User list</Link></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>

            <div className="col-md-9 m-auto">
                <div className="mt-5">
                    <Columns queries={queries}>{volunteer}</Columns>
                </div>
            </div>
        </div>
    );
};

export default Donetion;