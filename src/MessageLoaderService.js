import React, { useState, useRef, useCallback } from 'react';
import ShowIfPropTrue from "./utils/ShowIfPropTrue";
import moment from 'moment';
import useMessageFetch from "./useMessageFetch";

function MessageLoaderService() {
  // custom hook
  const { loading, error, messages, refetch, deleteMessageAtId } = useMessageFetch();

  // Last element reference handler
  // 
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

  // 
  // Touch Event Handling - Start 
  // 

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

  return(
    <>
        <ShowIfPropTrue prop={ messages.length > 0 }>
            <div>
                {
                    Object.keys(messages).map(function(key, index) {
                    if(messages.length === index + 1) {
                        // its the last element of the array mark it by the ref
                        return (
                        <>
                            <div className={'data-card data-card data-card-'+messages[key].id} ref={lastMessageElement} id={messages[key].id} key={messages[key].id} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                            <div className='card-header'>
                                <div className='nameContainer'> 
                                <p><b>{messages[key]['author'].name}</b></p>
                                <p className='timeElapsed'>{moment(messages[key].updated).fromNow()}</p>
                                </div>
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
  );
}

export default MessageLoaderService;