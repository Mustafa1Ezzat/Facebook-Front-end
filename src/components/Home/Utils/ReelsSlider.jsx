import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import { useContext } from "react";

import { ReelsContext } from "../../contexts/ReelsContext";
import { UserDataContext } from "../../contexts/UserDataContext";
import { AlignmentContext } from '../../contexts/AlignmentContext';


import { useNavigate } from "react-router";


//  import apis
import { DelOneReel } from "../../../apis/apis";

export let ReelsSlider = () => {

  let {setAlignment} = useContext(AlignmentContext)
  let Navigate = useNavigate()

let { UserReels, setUserReels } = useContext(ReelsContext);
let { UserData } = useContext(UserDataContext)


  const sliderRef = useRef();
  const [selected, setSelected] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

const settings = {
  className: "center",
  infinite: false,
  dots: false,
  centerMode: false,
  slidesToShow: 4, // Show 3 slides by default (above 750px)
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  arrows: false,
  centerPadding: "60px",
  speed: 500,
  swipeToSlide: true,
  swipe: false,         // <--- disable swipe on touch devices
  draggable: false,     // <--- disable drag with mouse
  responsive: [
    {
      breakpoint: 750, // Below 750px
      settings: {
        slidesToShow: 2, // Show 2 slides
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 400, // Example: below 400px, show 1 slide
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
};

  return (
    <div className="slider-container">


      <Slider ref={sliderRef} {...settings}>
        {UserReels.map((e, i) => (
            <section
              key={i}
              className={`
                ReelsSlider ${selected === i ? " selected" : ""} 
                ${e.ReelsColor === "var(--LoginBtnColor)"? 'Color1' : 
                  e.ReelsColor === "var(--LogoColor)" ?    'Color2' :
                  e.ReelsColor === "var(--PriColor)"? 'Color3' : 'Color4' }
              `}
              onClick={() => {
                setSelected(i);
                setPopupOpen(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="UserImgReels"></div>
                <h6
                  onClick={e => {
                    e.stopPropagation();
                    setAlignment('profile');
                    Navigate("/Profile");
                  }}
                  className="UserNameReels m-0"
                  style={{ fontSize: '12px', cursor:'pointer' }}
                >
                  {e.Username}
                </h6>              
                <p style={{ fontSize: '10px' }}>{e.RTxt}</p>
            </section>
        ))}
      </Slider>


      <div className="custom-arrows-wrapper">
        <button className="custom-arrow prev" onClick={() => sliderRef.current.slickPrev()}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="custom-arrow next" onClick={() => sliderRef.current.slickNext()}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* Popup Modal */}
      {popupOpen && (
        <div className="reel-popup-overlay" onClick={() => setPopupOpen(false)}>
          <div className="reel-popup ReelsBody" onClick={e => e.stopPropagation()}>

              <section>
                <h4>{UserReels[selected]?.RTxt}</h4>
              </section>

              <button className={`DelReels ${String(UserReels[selected]?.UserID) === String(UserData.UserId) ? '' : 'd-none'}`} 
              
              
              onClick={ async ()=>{
                let data = { ReelsID : UserReels[selected]?.ReelsID, UserID:UserReels[selected]?.UserID}
                await DelOneReel(data)

                    // Remove the deleted reel from UserReels
                      setUserReels(prev => prev.filter((_, idx) => idx !== selected));
                      setPopupOpen(false); // Close the popup
              }}>
                <i className="bi bi-archive-fill"></i>
              </button>

              <section className="UserHeaderReels">
                <div className="UserImgReelsPopup" style={{ width: 40, height: 40 }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
                  <h6 
                  onClick={e => {
                    e.stopPropagation();
                    setAlignment('profile');
                    Navigate("/Profile");
                  }}
                  style={{textTransform:'capitalize', margin:'0px', cursor:'pointer'}} >
                    <b>{UserReels[selected]?.Username}</b>
                  </h6>
                  {UserReels[selected]?.RDate &&
                    (new Date(UserReels[selected].RDate).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10) ? (
                      <p className="ReelsTime m-0">Today</p>
                    ) : (
                      <p className="ReelsTime m-0">{new Date(UserReels[selected].RDate).toLocaleDateString()}</p>
                    ))
                  }
                </div>
              </section>

          </div>
        </div>
      )}
    </div>
  );
}