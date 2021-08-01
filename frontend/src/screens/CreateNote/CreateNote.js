import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MainScreen from '../../components/MainScreen';
import { notesCreate, selectNotes } from '../../features/notes/noteListSlice';
import ReactMarkdown from 'react-markdown'
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';

const CreateNote = ({history}) => {
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [category,setCategory]=useState("");
    const [message,setMessage]=useState(null);

    const dispatch=useDispatch();
    const noteCreate=useSelector(selectNotes);
    const {loading,error}=noteCreate;

    const resetHandler=()=>{
        setTitle("");
        setContent("");
        setCategory("");
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        if(!title || !content || !category) {
            setMessage("Please enter all the fields to Proceed")
            return
        };
        setMessage(null);
        dispatch(notesCreate({title,content,category}))
        resetHandler();
        history.push("/mynotes")
    }

    return (
       <MainScreen title="Create a Note">
           <Card>
               <Card.Header>Create a new Note</Card.Header>
               {message != null && <ErrorMessage variant="danger">{message}</ErrorMessage>}
               <Card.Body>
                   <Form onSubmit={submitHandler}>
                       {error != null && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                       <Form.Group controlId="title">
                           <Form.Label>Title</Form.Label>
                           <Form.Control type="text" value={title} placeholder="Enter the title" onChange={e=>setTitle(e.target.value)} />
                       </Form.Group>
                       <Form.Group controlId="content">
                           <Form.Label>Content</Form.Label>
                           <Form.Control as="textarea" value={content} placeholder="Enter the content" rows={4} onChange={e=>setContent(e.target.value)} />
                       </Form.Group>
                       {content && (
                           <Card>
                               <Card.Header>Note Preview</Card.Header>
                               <Card.Body>
                                   <ReactMarkdown>{content}</ReactMarkdown>
                               </Card.Body>
                           </Card>
                       )}
                       <Form.Group controlId="category">
                           <Form.Label>Category</Form.Label>
                           <Form.Control type="text" value={category} placeholder="Enter the Category" onChange={e=>setCategory(e.target.value)} />
                       </Form.Group>
                       {loading && <Loading size={50}/>}
                       <Button type='submit' variant='primary'>Create Note</Button>
                       <Button className="mx-2" onClick={resetHandler} variant="danger">Reset Fields</Button>
                   </Form>
               </Card.Body>
               <Card.Footer className="text-muted">
                   Creaing on - {new Date().toLocaleDateString()}
               </Card.Footer>
           </Card>
       </MainScreen>
    )
}

export default CreateNote
