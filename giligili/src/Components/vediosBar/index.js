import { useRef } from "react";
import './index.css'
function Video(props) {
  const vedioScroll = useRef(null);


  const handleScroll =  (e) => {
    // e.preventDefault();
    let scrollContainer = vedioScroll.current;
    let left = -e.wheelDelta || e.deltaY / 2;
    scrollContainer.scrollLeft = scrollContainer.scrollLeft + left;
    
  }
  return (
    <>
      <div className="vedioList" ref={vedioScroll} onWheel={handleScroll}>
        <ul>
          {props.list.map((video) => (
            <li key={video.id}>
              <video data-vedio-id={video.id} loop muted controls width="320" height="240">
                <source src={video.src} type="video/mp4" />
              </video>
            </li>
          ))}
        </ul>
      </div>
    
    
    
    </>

  );
}


export default Video