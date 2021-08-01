
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import MainScreen from '../../components/MainScreen'
import "./LoginScreen.css";
import {selectuserInfo,login }from  "../../features/user/userLoginSlice"

const LoginScreen = ({history}) => {
    


    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    // const [error,setError] = useState(false);
    // const [loading,setLoading] = useState(false);
    const dispatch=useDispatch();
    const {loading,error,userInfo} = useSelector(selectuserInfo);
   
    // const history=useHistory();
    useEffect(() => {
      if(userInfo && !loading){
          history.push('/mynotes')
      }
    }, [userInfo,history,loading])

    
    const submitHandler=  (e)=>{
    
        e.preventDefault();
        dispatch(login({email,password}));
    }

    return (
        <MainScreen title='LOGIN'>
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" onChange={e=>setEmail(e.target.value)} value={email}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)} value={password}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Row className="py-3">
                        <Col>
                            New Customer? <Link to="/register">Register Here</Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </MainScreen>
    )
}

export default LoginScreen
