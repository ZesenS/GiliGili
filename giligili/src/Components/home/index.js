import Video from "../vediosBar";
import './home.css'
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { http } from "../../utils/request";


function Home() {
    const [allVideos, setAllVideos] = useState([]);
    const scrolling = useRef(false);
    const [ready, setReady] = useState(false); 
    const [playingVideos, setPlayingVideos] = useState([]);
    const [fuunyVideos, setFunnyVideos] = useState([]);
    const [musicVideos, setMusicVideos] = useState([]);
    const isInView = (video) => {
      const {top, bottom, left, right} = video.getBoundingClientRect();
      const isHorizonral = 0 < left && right < window.innerWidth;
      const isVerticle = top < window.innerHeight/2 && window.innerHeight/2 < bottom
      return isHorizonral && isVerticle;
    }
    const checkScrolling = debounce(() => {
      let currentPlaying = [];
      scrolling.current = false;
      allVideos.forEach(v => {
        const result = isInView(v);
        if(result){
          currentPlaying.push(v.getAttribute('data-vedio-id').toString());
        }
        setPlayingVideos(currentPlaying);
        playVideos(currentPlaying);
  
  
      })
    }, 500);
  
    function saveVideos(videos) {
      const videoSet = [];
      for (const key in videos) {
        videoSet.push({
          "id": key,
          "src": `http://localhost:8000/video/${videos[key]}`
        });
      }
      return videoSet;
    }
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await http.get('http://127.0.0.1:8000/video/');
          const funny = saveVideos(response.data.funny);
          const music = saveVideos(response.data.music);
          setFunnyVideos(funny);
          setMusicVideos(music);
    
          const firstPlaying = ["1", "2"];
          setPlayingVideos(firstPlaying);
          setReady(true);
          setTimeout(() => {
            playVideos(firstPlaying);
            setAllVideos(document.querySelectorAll("video"));
          }, 1000); // 1秒延迟，你可以调整这个时间
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, []);
    const playVideos = (ids) => {
      ids.forEach(id => {
        const videoElement = document.querySelector('[data-vedio-id="' + id + '"]');
        console.log(videoElement);
        if (videoElement && videoElement.paused) {
          try {
            if(ready){
              videoElement.play();
            }
          } catch (error) {
            console.error("Error while trying to play the video:", error);
          }
        }
      });
    }
  
    const pasueVideos = (ids) => {
      ids.forEach(id => {
        const videoElement = document.querySelector('[data-vedio-id="' + id + '"]');
        if (videoElement && !videoElement.paused) {
          try {
            videoElement.pause();
            videoElement.currentTime = 0;
          } catch (error) {
            console.error("Error while trying to pause the video:", error);
          }
        }
      });
    }
  
    const onScroll = () => {
      let scrollTimeout;
      clearTimeout(scrollTimeout);
      scrolling.current = true;
      pasueVideos(playingVideos);
      checkScrolling();
  
    }
  
  
    return (
      <div>
        <div id="line"></div>
        <div id="main" onScroll={onScroll}>
          <div className="poster"></div>
          <h2>视频1</h2>
          <Video list={fuunyVideos}></Video>
          <h2>视频2</h2>
          <Video list={musicVideos}></Video>
          <h2>视频3</h2>
          <Video list={musicVideos}></Video>
  
        </div>
      </div>
      
    );
  }
  
  export default Home;
  