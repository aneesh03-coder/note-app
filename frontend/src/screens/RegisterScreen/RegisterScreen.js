import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { useDispatch,useSelector } from 'react-redux';
import { registerUser } from '../../features/user/userRegistrationSlice';
import { selectuserInfo } from '../../features/user/userLoginSlice';

const RegisterScreen = () => {
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password,setPassword] = useState("");
    const [confirmedPassword,setConfirmedPassword] = useState("");
    const [pic,setPic]=useState("https://www.indiewire.com/wp-content/uploads/2020/06/shutterstock_editorial_5885988aj.jpg");
    const [message,setMessage]=useState(null);
    const [picMessage,setPicMessage]=useState(null);
    // const [error,setError]=useState(false);
    // const [loading,setLoading]=useState(false);
    const {error,loading,userInfo}=useSelector(selectuserInfo);
    const dispatch=useDispatch();
    const history=useHistory()

    useEffect(() => {
       if(userInfo){
           history.push("/mynotes")
       }
    }, [history,userInfo])

    const submitHandler= async (e)=>{
        e.preventDefault();
        if(password !== confirmedPassword){
            setMessage('Passwords do not match')
        }else{
            setMessage(null)
            dispatch(registerUser({email,password,name,pic}));
        }
       
        

    }

    const postDetails=(pics)=>{
        if(!pics){
            return setPicMessage("Please Select an Image");
        }
        setPicMessage(null)
        if(pics.type === 'image/jpeg' ||pics.type === 'image/png' ){

            const data= new FormData();
            data.append('file',pics);
            data.append('upload_preset','leavemanagement')
            data.append('cloud_name','aneeshkalra')
            fetch('https://api.cloudinary.com/v1_1/aneeshkalra/image/upload',{
                method:"post",
                body:data,
            }).then((res)=>{
                return res.json();
            }).then((data)=>{
                setPic(data.url.toString())
            }).catch((err)=>{
                console.log(err)
            })

        }else{
            return setPicMessage("Please Select a valid image type. JPEG/PNG");
        }
    }


    return (
        <MainScreen title="REGISTER">
            <div className="registerContainer">
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                
                {loading && <Loading/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter Name" onChange={e=>setName(e.target.value)} value={name}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" onChange={e=>setEmail(e.target.value)} value={email}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)} value={password}/>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" onChange={e=>setConfirmedPassword(e.target.value)} value={confirmedPassword}/>
                    </Form.Group>
                    {picMessage && (
                        <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                    )}
                    <Form.Group controlId="pic">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.File id="custom-file" type="img/png" label="Upload Profile Picture" custom
                                    onChange={(e)=>postDetails(e.target.files[0])}
                                     />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Row className="py-3">
                        <Col>
                            Have an Account? <Link to="/register">Login</Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </MainScreen>
    )
}

export default RegisterScreen
