import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../logos/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { Card, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import fakedata from '../../fakedata/FakeData';

const AddTask = () => {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        console.log(data);
        fetch('https://floating-hamlet-18259.herokuapp.com/addtask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            alert('data inserted')
            history.replace('/')
        })
    }
    return (
        <div className="col-md-12">
            <div className="col-md-12 p-3 RGheader">
                <div className="row">
                    <div className="px-5 pt-3">
                        <Link to="/" >
                            <img src={logo} width="300px" height="80px" alt="" />
                        </Link>
                    </div>
                    <div className="pt-4 pl-5">
                        <h3>Volunteer register list</h3>
                    </div>
                </div>
            </div>
            <div className="row pl-5">
                <div className="col-md-2">
                    <div className="mt-5">
                        <Link to="/userList" className="text-decoration-none"><FontAwesomeIcon icon={faUserFriends} /> <strong>Volunteer register list</strong></Link>
                    </div>
                    <div className="mt-3">
                        <Link to="/addTask" className="text-decoration-none text-dark"><FontAwesomeIcon icon={faPlus} /> <strong>Add event</strong></Link>
                    </div>
                </div>
                <div className="col-md-10" style={{ height: '100vh', backgroundColor: '#f4f7fc' }}>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Card className="mt-3 p-4" style={{ borderRadius: '20px' }}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group controlId="formBasicEmail" className="mt-4">
                                        <Form.Label> <strong>Event Title</strong> </Form.Label>
                                        <Form.Control name="name" ref={register({ required: true })} className="" type="text" placeholder="title" />
                                        {errors.name && <span style={{ color: 'red' }}>Event Title required</span>}
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail" className="mt-4">
                                        <Form.Label> <strong>Description</strong> </Form.Label>
                                        <Form.Control as="textarea" rows="3" name="description" ref={register({ required: true })} placeholder="description" />
                                        {errors.description && <span style={{ color: 'red' }}>Event description required</span>}
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="formBasicEmail" className="mt-4">
                                        <Form.Label> <strong>Event Date</strong> </Form.Label>
                                        <Form.Control name="date" ref={register({ required: true })} className="" type="date" placeholder="title" />
                                        {errors.date && <span style={{ color: 'red' }}>Date is required</span>}
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail" className="mt-4">
                                        <Form.Label> <strong>Banner</strong> </Form.Label>
                                        <Form.Control name="image" ref={register} defaultValue="/static/media/animalShelter.e44d4154.png" className="" type="hidden" />
                                        <div className="" style={{ width: '50%', height: '50px', border: '2px solid #0069D9', borderRadius: '5px' }}>
                                            <div className="row m-3 text-primary">
                                                <FontAwesomeIcon icon={faCloudUploadAlt}  />
                                                <p className="pl-3"> Upload image</p>
                                            </div>
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                        </Card>
                        <input type="submit" className="btn btn-primary mr-2 mt-3 px-5 float-right" />
                    </Form>

                </div>
            </div>
        </div>
    );
};

export default AddTask;