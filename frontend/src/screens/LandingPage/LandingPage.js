import React, { useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { selectuserInfo } from '../../features/user/userRegistrationSlice';
import "./LandingPage.css"

function LandingPage({history}) {
    const userInfo=localStorage.getItem("userInfo")
    useEffect(() => {
       if(userInfo){
           history.push('/mynotes')
       }
    }, [history,userInfo])
    return (
        <div className='main'>
            <Container>
                <Row>
                    <div className="intro-text">
                        <div>
                            <h1 className='title'>Welcome to LMS Tool</h1>
                            <p className='subtitle'>Lets get your Leaves Approved</p>
                        </div>
                        <div className="buttonContainer">
                            <a href='/login'>
                                <Button size='lg' className='landingButton'>Login</Button>
                            </a>
                            <a href='/register'  >
                                <Button size='lg' className='landingButton' variant='outline-primary'>Register</Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage
