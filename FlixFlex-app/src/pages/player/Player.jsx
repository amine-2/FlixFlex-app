import React from 'react'
import './Player.css'
import video from '../../assets/video.mp4'
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useStateContext } from '../../contexts/StateContext';
import Youtube from 'react-youtube'




const Player = () => {
  const { trailer } = useStateContext()
  const navigate = useNavigate();

  return (
    <>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <Youtube
          videoId={trailer.key}
          className={"youtube"}
          containerClassName={"youtube-container"}
          opts={
            {
              width: '100%',
              height: '780px',
              playerVars: {
                autoplay: 1,
                controls: 1,
                cc_load_policy: 0,
                fs: 0,
                iv_load_policy: 0,
                modestbranding: 0,
                rel: 0,
                showinfo: 1,
              },
            }
          }
        />
      </div>
    </>
  );
}

export default Player