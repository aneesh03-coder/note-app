import React, {useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import {Route} from 'react-router-dom'
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNote from './screens/CreateNote/CreateNote';
import UpdateNote from './screens/UpdateNote/UpdateNote';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

function App() {
  const [search,setSearch]=useState(""); 
  
  return (
    <>
      <Header setSearch={setSearch}/>
        <main >
          <Route path='/' component={LandingPage} exact/>
          <Route path='/login' component={LoginScreen} exact/>
          <Route path='/profile' component={ProfileScreen} exact/>
          <Route path='/register' component={RegisterScreen} exact/>
          <Route path='/createnote' component={CreateNote} exact/>
          <Route path="/note/:id" component={UpdateNote} exact/>
          <Route path='/mynotes' component={()=>(
            <MyNotes search={search}/>
          )}/>
        </main>
        
      <Footer/>
     </>  
  );
}

export default App;
