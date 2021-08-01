import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/ErrorMessage';
import MainScreen from '../../components/MainScreen';
import { deleteNotes, selectNotes, updateNotes } from '../../features/notes/noteListSlice';
import ReactMarkDown from 'react-markdown'
import Loading from '../../components/Loading';
import axios from 'axios';
import { selectuserInfo } from '../../features/user/userLoginSlice';

const UpdateNote = ({match,history}) => {
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [category,setCategory]=useState("");
    const [date,setDate]=useState("");

    const dispatch = useDispatch();
    const noteUpdate=useSelector(selectNotes);
    const {userInfo}=useSelector(selectuserInfo);
    const {updateLoading,updateNoteError,deleteLoading,deleteError}=noteUpdate;

    useEffect(() => {
        const fetching=async ()=>{
            const config={
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                },
            };
            const endpoint=process.env.REACT_APP_UPDATE_GET_NOTE_ENDPOINT || `http://localhost:5001/api/notes/`;
            const {data} = await axios.get(`${endpoint}${match.params.id}`,config);

            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        };
        fetching();
    }, [match.params.id,date,userInfo.token])

    const resetHandler=()=>{
            setTitle("");
            setContent("");
            setCategory("");
    }

    const deleteHandler=(id)=>{
        if(window.confirm("Are you sure")){
            dispatch(deleteNotes({id}));
        }
        history.push("/mynotes")
    }

    const updateHandler=(e)=>{
        e.preventDefault();
        if(!title || !content || !category) return;
        dispatch(updateNotes({id:match.params.id,title,content,category}))
        resetHandler();
        history.push("/mynotes");
    }

    return (
        <MainScreen title="Edit Note">
            <Card>
                <Card.Header>Edit your Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                    {deleteError !=null && <ErrorMessage variant="danger">{deleteError}</ErrorMessage>}
                    {deleteLoading && <Loading/>}
                        {updateNoteError !=null && <ErrorMessage variant="danger">{updateNoteError}</ErrorMessage>}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter the title" value={title} onChange={e=>setTitle(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder="Enter the content" value={content} onChange={e=>setContent(e.target.value)}></Form.Control>
                        </Form.Group>
                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkDown>{content}</ReactMarkDown>
                                </Card.Body>
                            </Card>
                        )}
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter the category" value={category} onChange={e=>setCategory(e.target.value)}></Form.Control>
                        </Form.Group>
                        {updateLoading && <Loading size={50}/>}
                        <Button variant="primary" type="submit">Update Note</Button>
                        <Button className="mx-2" variant="danger" onClick={()=>deleteHandler(match.params.id)}>Delete Note</Button>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                    Updating on - {date.substring(0,10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    )
}

export default UpdateNote
