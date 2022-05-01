import React, { useState } from 'react';
import ShowIfPropTrue from "./utils/ShowIfPropTrue";
import HamburgerMenu from './components/HambergerMenu';
import  MessageLoaderService  from "./MessageLoaderService";
import './App.css';
import 'animate.css';

function App() {

  // Controller
  const [showMainContent, setshowMainContent] = useState(false);
  const handleShowMessages = () => {
    setshowMainContent(true);
  }
  

  return (
    <>
      <div className="App">
        <header className="App-header sticky">
          <span className='App-Title'>Messages</span>
          <HamburgerMenu />
        </header>
        <div id="appContainer">
          <ShowIfPropTrue prop={!showMainContent}>
            <div className={'message-card'}>
              <button onClick={() => {handleShowMessages()}} > Load UI </button>
              <p>Please note: This app supports touch gesture : Swipe on cards on mobile view, desktop mode does not support touch event.</p>
            </div>
          </ShowIfPropTrue>

          <ShowIfPropTrue prop={showMainContent}>
            <MessageLoaderService />
          </ShowIfPropTrue>
        </div>
      </div>

      
    </>
  );
}

export default App;
