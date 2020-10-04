import React, { useContext } from 'react';
import { Card, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../logos/logo.png';
import { useForm } from "react-hook-form";
const Register = (props) => {
    const singleVolunteer = props.singleVolunteer;
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();
    const location = useLocation();
    const onSubmit = data => {
        console.log(data)
        fetch('https://floating-hamlet-18259.herokuapp.com/addDonetions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            alert('data inserted');
            history.replace('/donetions');
        })

    }
    return (
        <div className="col-md-4 m-auto">
            <div style={{ marginTop: '70px' }}>
                <div className="col-md-7 col-sm-10 col-12 m-auto">
                    <Link to="/">
                        <img src={logo} width="100%" height="80px" alt="" />
                    </Link>
                </div>
            </div>
            <Card className="mt-4" style={{ padding: '20px' }}>
                <Card.Body>
                    <Card.Title>Register as a volunteer</Card.Title>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formBasicEmail" className="mt-4">
                            <Form.Control name="name" ref={register({ required: true })} defaultValue={loggedInUser.name} className="rounded-0 border-top-0 border-left-0 border-right-0 border-bottom-1" type="text" placeholder="Full name" />
                            {errors.name && <span style={{ color: 'red' }}>Name is required</span>}
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-4">
                            <Form.Control name="email" ref={register({ required: true })} defaultValue={loggedInUser.email} className="rounded-0 border-top-0 border-left-0 border-right-0 border-bottom-1" type="email" placeholder="Email or Username" />
                            {errors.email && <span style={{ color: 'red' }}>Email is required</span>}
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-4">
                            <Form.Control name="date" ref={register({ required: true })} className="rounded-0 border-top-0 border-left-0 border-right-0 border-bottom-1" type="date" />
                            {errors.date && <span style={{ color: 'red' }}>Date is required</span>}
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-4">
                            <Form.Control name="description" ref={register({ required: true })} className="rounded-0 border-top-0 border-left-0 border-right-0 border-bottom-1" type="text" placeholder="Description" />
                            {errors.description && <span style={{ color: 'red' }}>Email is required</span>}
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-4">
                            <Form.Control name="volunteerName" ref={register({ required: true })} defaultValue={singleVolunteer.name} className="rounded-0 border-top-0 border-left-0 border-right-0 border-bottom-1" type="text" placeholder="add volunteer" />
                            <Form.Control name="image" ref={register({ required: true })} defaultValue={singleVolunteer.image} className="rounded-0 border-top-0 border-left-0 border-right-0 border-bottom-1" type="hidden"/>
                            {errors.volunteerName && <span style={{ color: 'red' }}>Email is required</span>}
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Form.Control type="submit" className="btn btn-primary rounded-0" placeholder="Enter email" />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Register;