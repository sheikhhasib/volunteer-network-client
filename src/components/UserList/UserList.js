import React, { useEffect, useState } from 'react';
import logo from '../logos/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { Button, Card, Table } from 'react-bootstrap';

const VolunteerRegisterList = () => {

    const [users, setUsers] = useState([]);
    const [Id, setId] = useState([]);
    const [tasks,setTasks] = useState([]);

    useEffect(() => {
        fetch('https://floating-hamlet-18259.herokuapp.com/getAllUsers')
            .then(res => res.json())
            .then(data => setUsers(data.users))
    }, [Id])

    useEffect(() => {
        fetch('https://floating-hamlet-18259.herokuapp.com/alltask')
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [])


    
    const handleUserDelete = (id) => {

        fetch(`https://floating-hamlet-18259.herokuapp.com/deleteUser/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                setId(id);
                alert("data deleted successfully");

            })

    }
    for(let i = 0;i<users.length;i++){
        const user = users[i];
        user.task = tasks ? tasks[i].name : '';
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
                    <Card className="mt-3 p-4" style={{ borderRadius: '20px' }}>
                        <Table className="table table-borderless" responsive="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email ID</th>
                                    <th>Registating date</th>
                                    <th>Volunteer list</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(user => <tr>
                                        <td>{user.displayName}</td>
                                        <td>{user.email}</td>
                                        <td>{new Date(user.metadata.creationTime).toDateString('dd/MM/yyyy')}</td>
                                        <td>{user.task}</td>
                                        <td><Button variant="danger" onClick={() => handleUserDelete(user.uid)}><FontAwesomeIcon icon={faTrashAlt} /></Button></td>
                                    </tr>)
                                }

                            </tbody>
                        </Table>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default VolunteerRegisterList;