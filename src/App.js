import React, { useEffect, useState, useRef, useCallback } from 'react';
import useMessageFetch from "./useMessageFetch";
import './App.css';
import ShowIfPropTrue from "./utils/ShowIfPropTrue";
import moment from 'moment';
import 'animate.css';

function App() {
  const { loading, error, messages, refetch, deleteMessageAtId } = useMessageFetch();

  const [showMainContent, setshowMainContent] = useState(false);
  
  const observer = useRef();
  
  const lastMessageElement = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        refetch()
      }
    }, [loading]);
    if (node) observer.current.observe(node);
  });

  const handleShowMessages = () => {
    setshowMainContent(true);
  }

const [touchStart, setTouchStart] = useState(null)
const [touchEnd, setTouchEnd] = useState(null)

// the required distance between touchStart and touchEnd to be detected as a swipe
const minSwipeDistance = 50 

const onTouchStart = (e) => {
  setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
  setTouchStart(e.targetTouches[0].clientX);
}

const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

function myFunction(e) {
  e.target.className = "data-card data-card-"+e.target.id + " animate__animated animate__slideOutLeft";
  {setTimeout(function () {
    console.log('1s ;later');
    e.target.className = ( e.target.className+ ' visibilityNone'); //pseudo code
  
  }, 1000)}
}

const onTouchEnd = (event) => {
  if (!touchStart || !touchEnd) return
  const distance = touchStart - touchEnd
  const isLeftSwipe = distance > minSwipeDistance
  const isRightSwipe = distance < -minSwipeDistance
  if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? myFunction(event) && deleteMessageAtId(event.target.id) : 'right')
}

const toggleHamburgerMenu = () => {}

  return (
    <>
      <div className="App">
        <header className="App-header sticky">
          <div className='App-Title'>Messages</div>
          <div class="menuContainer" onClick={() => {toggleHamburgerMenu()}}>
            {/* <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div> */}
            <div class="hamburger-menu">
              <input id="menu__toggle" type="checkbox" />
              <label class="menu__btn" for="menu__toggle">
                <span></span>
              </label>

              <ul class="menu__box">
                <li><a class="menu__item" href="#">Infinitely Scrolling List</a></li>
                <li><a class="menu__item" href="#">Saatvik Shukla</a></li>
                <li><a class="menu__item" href="#">Команда</a></li>
                <li><a class="menu__item" href="#">Блог</a></li>
                <li><a class="menu__item" href="#">Контакты</a></li>
              </ul>
            </div>
          </div>
        </header>
        <div id="appContainer">
          <ShowIfPropTrue prop={!showMainContent}>
            <>
            <div className={'message-card'}>
              <button onClick={() => {handleShowMessages()}} > Load UI </button>
              <p>Please note: This app supports touch gesture : Swipe on cards on mobile view, desktop mode does not support touch event.</p>
            </div>
            </>
          </ShowIfPropTrue>

          <ShowIfPropTrue prop={showMainContent}>
            <>

              <ShowIfPropTrue prop={ messages.length > 0 }>
                <>
                  <div>
                  
                    {
                      Object.keys(messages).map(function(key, index) {
                        if(messages.length === index + 1) {
                          return (
                            <>
                              <div className={'data-card data-card data-card-'+messages[key].id} ref={lastMessageElement} id={messages[key].id} key={messages[key].id} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                                <div className='nameContainer'> 
                                  <p><b>{messages[key]['author'].name}</b></p>
                                  <p className='timeElapsed'>{moment(messages[key].updated).fromNow()}</p>
                                </div>
                                <img className='cardImage' src={"http://message-list.appspot.com" + messages[key]['author'].photoUrl} />
                                <p>{messages[key].content}</p>
                              </div>
                            </>)
                        } else {
                          return (
                            <>
                              <div className={'data-card data-card-'+messages[key].id} id={messages[key].id} key={messages[key].id} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                                <div className='card-header'>
                                  <img className='cardImage' src={"http://message-list.appspot.com" + messages[key]['author'].photoUrl} />
                                  <div className='nameContainer'> 
                                    <p><b>{messages[key]['author'].name}</b></p>
                                    <p className='timeElapsed'>{moment(messages[key].updated).fromNow()}</p>
                                  </div>
                                </div>
                                <p>{messages[key].content}</p>
                              </div>
                            </>)
                        }
                      })
                    }
                  </div>
                
                </>
              </ShowIfPropTrue>
              <div className='message-card'>
                {loading && (
                  <div className='loaderWrapper'>
                    <div class="loader4"></div>
                  </div>
                )}
              </div>

              <div className='message-card'>
                {error && "Loading..."}
              </div> 
            </>
          </ShowIfPropTrue>
        </div>
      </div>

      
    </>
  );
}

export default App;
