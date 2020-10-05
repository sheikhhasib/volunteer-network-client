import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardGroup, Form, FormControl } from 'react-bootstrap';
import Header from '../Headers/Header';
import './AllTask.css';
import Columns from 'react-columns';
import { useForm } from "react-hook-form";
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const AllVolunteer = (props) => {
    const { handleSubmit, register } = useForm();
    const history = useHistory();
    const location = useLocation();
    const setSingleVolunteer =props.setSingleVolunteer;
    const [volunteers, setVolunteers] = useState([]);

    useEffect(() => {
        fetch('https://floating-hamlet-18259.herokuapp.com/alltask')
        .then(res => res.json())
        .then(data => {
            setVolunteers(data);
        })
    },[])
    
    const onSubmit = data => {
        const findVolunteer = volunteers.find(vt => vt.name === data);
        console.log(findVolunteer);
    };
    var queries = [{
        columns: 3,
        query: 'min-width: 500px'
    }, {
        columns: 4,
        query: 'min-width: 1000px'
    }];
    const handlevolunter = (volunteer) => {
        setSingleVolunteer(volunteer);
        history.replace('/register');
    }
    const colors = ['#ffbd3e', '#FF7044', '#3F90FC', '#421FCF', '#3F90FC', '#421FCF', '#FF7044', '#ffbd3e', '#ffbd3e', '#FF7044', '#ffbd3e', '#FF7044', '#3F90FC', '#421FCF','#3F90FC', '#3F90FC', '#421FCF', '#FF7044', '#ffbd3e','#421FCF', '#3F90FC', '#421FCF', '#3F90FC', '#ffbd3e', '#ffbd3e', '#FF7044', '#3F90FC', '#421FCF', '#FF7044']
    for (let i = 0; i < volunteers.length; i++) {
        const vlColor = volunteers[i];
        vlColor.color = colors[i];
    }
    const volunteer = volunteers.map(vl => {
        const { id, name, image } = vl;
        return (<CardGroup key={id} className="m-2" onClick={() => handlevolunter(vl)}>
            <Card style={{ borderRadius: '13px' }}>
                <Card.Img variant="top" src={image} />
                <Card.Footer style={{ backgroundColor: vl.color, textAlign: 'center' }}>
                    <p><strong className="text-white">{name}</strong></p>
                </Card.Footer>
            </Card>
        </CardGroup>)
    })
    return (
        <div className="Bg-image">
            <Header />
            <div className="col-md-12">
                <div className="m-auto pb-5" style={{ width: '40%', }}>
                    <h1 className="text-center text-uppercase" >I grow by helping people in need.</h1>
                    <div style={{ width: '80%', margin: 'auto' }}>
                        <Form inline className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                            <FormControl type="text" name="search" ref={register} style={{ width: '80%' }} placeholder="Search" />
                            <Button variant="primary" type="submit" className="px-4">Search</Button>
                        </Form>
                    </div>
                </div>
                <div className="col-md-10 m-auto">
                    <div style={{ marginTop: '100px' }}>
                        <Columns queries={queries}>{volunteer}</Columns>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default AllVolunteer;