import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import googleLogo from '../logos/google.png'
import { Card } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../logos/logo.png';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const SignnedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    success: true
                }
                setLoggedInUser(SignnedInUser);
                storeAuthToken()
                history.replace(from);
            }).catch(function (error) {
                console.log(error);
                console.log(error.message);
            });
    }
    const signInBtnStyle = {
        width: '60%',
        border: '1px solid gray',
        borderRadius: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginTop: '10px'
    }
    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
            sessionStorage.setItem('token',idToken);
        }).catch(function (error) {
            // Handle error
        });
    }
    return (
        <div className="col-md-6 m-auto">
            <div style={{ marginTop: '150px' }}>
                <div className="col-md-4 m-auto">
                    <Link to="/">
                        <img src={logo} width="100%" height="80px" alt="" />
                    </Link>
                </div>
            </div>
            <Card className="text-center mt-4" style={{ padding: '120px 0px' }}>
                <Card.Body>
                    <Card.Title>Login With</Card.Title>
                    <button onClick={googleSignIn} style={signInBtnStyle}><img src={googleLogo} className="float-left py-1" alt="" />Continue with Google</button>
                </Card.Body>
                <p>Don't have account?<Link to="" style={{ color: '#F9A51A' }}>Create an Account</Link></p>
            </Card>
        </div>
    );
};

export default Login;