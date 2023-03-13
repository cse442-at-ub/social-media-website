import React from 'react';
import logo from './logo.svg';
import './App.css';
import "./RightColumn.css";
// import {BrowserRouter as Router, Route, Link} from 'react-route-dom';

function App() {
  return (
    <div className="App">
      <div className='UserPage'>
        <p>User Page</p>
        <button type='button' className='MyPage'>
          <p1>My Page</p1>
          <br/></button>
        <button type='button' className='MyFans'>
          <p2>My Fans</p2>
          <br/></button>
        <button type='button' className='MyFollowing'>
          <p3>My Following</p3>
          <br/></button>
        <button type='button' className='MyBlog'>
          <p6>My Blog</p6>
          <br/></button>
        <button type='button' className='MyAlbum'>
          <p7>My Album</p7>
          <br/></button>
      </div>
      <div className='User'>
        <button type='button' className='Back'>
          <p4>Back</p4>
          <br/></button>
        <div className='username'>
          <button type='button' className='Image'>
            <p5>Image</p5>
            <br/></button>
          <p8>Name</p8>
        </div>
      </div>
      <div className="right-column">
        <div className="right-column-content">
        </div>
      </div>
    </div>

  );
}

export default App;
