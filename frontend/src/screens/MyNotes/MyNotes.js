import React, { useEffect } from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import {Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {deleteNotes, notesLists,resetError,selectNotes} from '../../features/notes/noteListSlice'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { loggingOut, selectuserInfo } from '../../features/user/userLoginSlice'
import "./MyNotes.css"

const MyNotes = ({search}) => {

    const dispatch = useDispatch();
    const notesList = useSelector(selectNotes);
    const {userInfo}=useSelector(selectuserInfo)
    const {loading,notes,error,success,updateSuccess,deleteSuccess,deleteLoading,deleteNoteError,createNoteError,updateNoteError}=notesList;
    const history=useHistory();


    useEffect(() =>{
        if(userInfo){
            dispatch(notesLists(null));
        }        
         if(!userInfo){
             history.push("/")
         }  
         if(deleteNoteError === "Not authorized,token failed" || createNoteError === "Not authorized,token failed" || updateNoteError === "Not authorized,token failed" || error === "Not authorized,token failed"){
             
             dispatch(loggingOut());
             dispatch(resetError());
             history.push("/login")
         }
        
    },[dispatch,success,history,userInfo,updateSuccess,deleteSuccess,error,deleteNoteError,createNoteError,updateNoteError] )


    const deleteHandler = (id)=>{
        if(window.confirm(`Are you sure? ${id}`)){
                dispatch(deleteNotes({id}))
        }
     
    }    
    return (       
            <MainScreen title={`Welcome Back ${userInfo?.name}..`}>
                <Link to="/createnote">
                    <Button style={{marginLeft:10,marginBottom:6}} size='lg'>
                        Create New Note
                    </Button>
                </Link>
                {deleteNoteError !=null && <ErrorMessage variant='danger'>{deleteNoteError}</ErrorMessage>}
                {deleteLoading && <Loading />}

                {error !== null && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading && <Loading />}
                    { notes?.filter(note=>{
                        return note.title.toLowerCase().includes(search.toLowerCase())
                    })
                    .map(note=>{
                       return (
                        <Accordion key={note._id}>
                        <Card style={{margin:10}}>
                            <Card.Header style={{display:'flex'}}>
                                <span style={{
                                    color:"black",
                                    textDecoration:"none",
                                    flex:0.98,
                                    cursor:'pointer',
                                    alignSelf:'center',
                                    fontSize:18,
                                }}>
                                    <Accordion.Toggle as={Card.Text} variant='link' eventKey='0'>
                                     {note.title}
                                    </Accordion.Toggle>
                                
                                </span>   
                                <div>
                                <Link to={`/note/${note._id}`}>
                                    <Button className='edit_button'>Edit</Button>
                                </Link>
                                    <Button variant='danger' className='mx-2' onClick={()=>deleteHandler(note._id)}>Delete</Button>
                            </div>                             
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <h4>
                                    <Badge variant="success">Category - {note.category}</Badge>
                                </h4>
                            <blockquote className="blockquote mb-0">
                                <p>
                                   {note.content}
                                </p>
                                <footer className="blockquote-footer">
                                    Created On {" "}
                                    <cite title="Source Title">
                                        {note.createdAt.substring(0,10)}
                                    </cite>
                                </footer>
                            </blockquote>
                            </Card.Body>
                            </Accordion.Collapse>
                            
                            
                        </Card>
                        </Accordion>
                       ) 
                    }).reverse()}

               
                        
                
            </MainScreen>
    )
}

export default MyNotes
