import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import MainScreen from '../../components/MainScreen'
import { resetError } from '../../features/notes/noteListSlice'
import { loggingOut, selectuserInfo, updateProfile } from '../../features/user/userLoginSlice'
import "./ProfileScreen.css"

const ProfileScreen = ({history}) => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [pic,setPic]=useState();
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [picMessage,setPicMessage]=useState();
    const [validateError,setValidateError]=useState(null);

    const dispatch=useDispatch();
    const {loading,error,success,userInfo}=useSelector(selectuserInfo);
    useEffect(() => {
      if(!userInfo){
          history.push("/");
      }else{
          setName(userInfo.name)
          setEmail(userInfo.email)
          setPic(userInfo.pic)
      }
      if(error === "Not authorized,token failed" ){
         console.log("Is it coming")    
        dispatch(loggingOut());
        dispatch(resetError());
        history.push("/login")
    }
    }, [dispatch,history,userInfo,error])

    const submitHandler=(e)=>{
        e.preventDefault();
        if(password === confirmPassword){
            setValidateError(null)
            dispatch(updateProfile({user:{name,email,pic,password}}))
            
        }else{
            setValidateError("Password and Confirm Password not matching")
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
        <MainScreen title="EDIT PROFILE">
           
            <div>
                <Row className='profileContainer'>
                    <Col md={6}>
                    {success && <ErrorMessage >Updated Successful</ErrorMessage>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {validateError && <ErrorMessage variant="danger">{validateError}</ErrorMessage>}
                
                {loading && <Loading/>}
                        <Form onSubmit={submitHandler} className="formContainer-1">
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e=>setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e=>setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Email Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e=>setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
                            </Form.Group>
                            {picMessage && (
                            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                            )}
                            <Form.Group controlId="pic">
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.File id="custom-file" type="img/png" label="Upload Profile Picture" custom onChange={(e)=>postDetails(e.target.files[0])}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col  className="picContainer">
                        <img src={pic} alt={name} className="profilePic"/>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default ProfileScreen
