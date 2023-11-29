import Video from "../vediosBar";
import bodyCss from "./body.module.css";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { http } from "../../utils/request";
import likeImage from "../../data/images/like.png";
import xiaoCVideo from "../../data/videos/xiaoC.mp4";

const Suggestion = () => {
  const [allVideos, setAllVideos] = useState([]);
  const scrolling = useRef(false);
  const likes = useRef(null);
  const [ready, setReady] = useState(false);
  const [playingVideos, setPlayingVideos] = useState([]);
  const [fuunyVideos, setFunnyVideos] = useState([]);
  const [musicVideos, setMusicVideos] = useState([]);
  const [liked, setLiked] = useState(false);
  const isInView = (video) => {
    const { top, bottom, left, right } = video.getBoundingClientRect();
    const isHorizonral = 0 < left && right < window.innerWidth;
    const isVerticle =
      top < window.innerHeight / 2 && window.innerHeight / 2 < bottom;
    return isHorizonral && isVerticle;
  };
  const checkScrolling = debounce(() => {
    let currentPlaying = [];
    scrolling.current = false;
    allVideos.forEach((v) => {
      const result = isInView(v);
      if (result) {
        currentPlaying.push(v.getAttribute("data-vedio-id").toString());
      }
      setPlayingVideos(currentPlaying);
      playVideos(currentPlaying);
    });
  }, 500);

  function saveVideos(videos) {
    const videoSet = [];
    for (const key in videos) {
      videoSet.push({
        id: key,
        src: `http://localhost:8000/video/${videos[key]}`,
      });
    }
    return videoSet;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get("http://127.0.0.1:8000/video/");
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
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const playVideos = (ids) => {
    ids.forEach((id) => {
      const videoElement = document.querySelector(
        '[data-vedio-id="' + id + '"]'
      );
      if (videoElement && videoElement.paused) {
        try {
          if (ready) {
            videoElement.play();
          }
        } catch (error) {
          console.error("Error while trying to play the video:", error);
        }
      }
    });
  };

  const pasueVideos = (ids) => {
    ids.forEach((id) => {
      const videoElement = document.querySelector(
        '[data-vedio-id="' + id + '"]'
      );
      if (videoElement && !videoElement.paused) {
        try {
          videoElement.pause();
          videoElement.currentTime = 0;
        } catch (error) {
          console.error("Error while trying to pause the video:", error);
        }
      }
    });
  };

  const onScroll = () => {
    let scrollTimeout;
    clearTimeout(scrollTimeout);
    scrolling.current = true;
    pasueVideos(playingVideos);
    checkScrolling();
  };

  const likeVideo = () => {
    if (liked) {
      likes.current.innerText = parseInt(likes.current.innerText) + 1;
      setLiked(false);
    } else {
      likes.current.innerText = parseInt(likes.current.innerText) - 1;
      setLiked(true);
    }
  };

  return (
    <div className={bodyCss.main} onScroll={onScroll}>
      <div id={bodyCss.content} className={bodyCss.typeArea}>
        <video src={xiaoCVideo} controls></video>
        <div>
          <div>
            <h4>历史性的一颗！C皇一区终于上1000分！距...</h4>
            <div>
              <span>
                <span>✓</span>已关注
              </span>{" "}
              余小C的分数
            </div>
          </div>
          <div>
            <img src={likeImage} alt="" onClick={likeVideo}></img>
            <span ref={likes}>123</span>
            <div>⋮</div>
          </div>
        </div>
      </div>
      <div id={bodyCss.shortVideos} className={bodyCss.typeArea}>
        <div>
          <div className={bodyCss.channelName}>
            <h3>娱乐</h3>
            <button>更多</button>
          </div>
          <Video list={fuunyVideos}></Video>
        </div>
        <div>
          <div className={bodyCss.channelName}>
            <h3>娱乐</h3>
            <button>更多</button>
          </div>
          <Video list={musicVideos}></Video>
        </div>
        <div>
          <div className={bodyCss.channelName}>
            <h3>娱乐</h3>
            <button>更多</button>
          </div>
          <Video list={fuunyVideos}></Video>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
