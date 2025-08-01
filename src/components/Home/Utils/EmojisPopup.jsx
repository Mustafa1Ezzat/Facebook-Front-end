import { useState, useRef, useContext, useEffect } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";
import { GetAllLikes } from "../../contexts/GetMyLikesContext";

import { CButton, CPopover } from '@coreui/react';

// context

import like from '../../../assets/Facebook Emoji/like.svg';
import love from '../../../assets/Facebook Emoji/love.svg';
import care from '../../../assets/Facebook Emoji/care.svg';
import haha from '../../../assets/Facebook Emoji/haha.svg';
import wow from '../../../assets/Facebook Emoji/wow.svg';
import sad from '../../../assets/Facebook Emoji/sad.svg';
import angry from '../../../assets/Facebook Emoji/angry.svg';

//  apis
import { LikeAndDislike , Dislike, GetMyLikes, AddNotifications} from "../../../apis/apis";

const EmojisArray = [
  { src: like,  alt: 'like',  label: 'Liked',  color: '#1877f2' },
  { src: love,  alt: 'love',  label: 'Loved',  color: '#f33e58' },
  { src: care,  alt: 'care',  label: 'Care',   color: '#f7b125' },
  { src: haha,  alt: 'haha',  label: 'Haha',   color: '#f7b125' },
  { src: wow,   alt: 'wow',   label: 'Wow',    color: '#f7b125' },
  { src: sad,   alt: 'sad',   label: 'Sad',    color: '#f7b125' },
  { src: angry, alt: 'angry', label: 'Angry',  color: '#e9710f' },
];

export const EmojisPopup = ({POSTID, Post}) => {
  const { UserData } = useContext(UserDataContext);
  const { AllLikes, setAllLikes } = useContext(GetAllLikes);

  const [selected, setSelected] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef();

  const PostNumber = AllLikes.filter(el => el.PostId === String(POSTID));
  const EmoType = AllLikes.find(el => el.PostId === String(POSTID) && el.UserId === UserData.UserId);

  const emojiImgStyle = { width: 20, height: 20, verticalAlign: 'middle', marginRight: 4 };
  const selectedEmoji = EmojisArray.find(e => e.alt === selected);
  const btnBg = selectedEmoji ? selectedEmoji.color : 'transparent';

  useEffect(() => {
    if(!localStorage.getItem('token')) return;
    
    const fetchLikes = async () => {
      try {
        const res = await GetMyLikes();
        setAllLikes(res);
      } catch (error) {
        console.warn("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [visible, setAllLikes]);

  // Show popover on hover
  const handleMouseEnter = () => {
    clearTimeout(timer.current);
    setVisible(true);
  };

  // Hide popover with a slight delay to allow moving between button and popover
  const handleMouseLeave = () => {
    timer.current = setTimeout(() => setVisible(false), 150);
  };

  // Handle emoji click: always set to the clicked emoji
  const handleEmojiClick = async (alt) => {
    if (selected === alt) {
      // If the same emoji is selected, remove it
      setSelected('');
      let data = {
        PostId: POSTID,
        UserId: UserData.UserId
      };
      await Dislike(data);
    } else {
      // If a different emoji is selected, set it
      setSelected(alt);
      setVisible(false);
      let data = {
        UserId: UserData.UserId,
        PostId: POSTID,
        Username: UserData.FullName,
        EmojiType: alt
      };
      await LikeAndDislike(data);
    }
  };

  // Handle click on the button itself
const handleBtnClick = async () => {
  if (selected) {
    // Remove reaction completely on second click
    setSelected('');
    let data = { PostId: POSTID, UserId: UserData.UserId };
    await Dislike(data);
    setAllLikes(prevLikes => prevLikes.filter(el => el.PostId !== String(POSTID)));
  } else {
    // If no emoji is selected, set to "like"
    setSelected('like');
    let data = {
      UserId: UserData.UserId,
      PostId: POSTID,
      Username: UserData.FullName,
      EmojiType: 'like',
    };
    await LikeAndDislike(data);
    setAllLikes(prevLikes => [...prevLikes, data]);
  }
};

  // Render the selected emoji button or default
  const EmojiBtn = () => {
    if (EmoType) {
      const emoji = EmojisArray.find(e => e.alt === EmoType.EmojiType);
      return (
        <>
          <img src={emoji?.src} alt={emoji?.alt} style={emojiImgStyle} />
          <b style={{color:`${emoji?.color}`}}>{emoji?.label}</b>
          {PostNumber.length === 0 ? '' : `(${PostNumber.length})`}
        </>
      );
    }
    return (
      <>
        <i style={{ fontSize: '15px' }} className="bi bi-hand-thumbs-up-fill"></i>
        Like {PostNumber.length === 0 ? '' : `(${PostNumber.length})`}
      </>
    );
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <CPopover
        content={
          <div
            style={{
              minWidth: 180,
              padding: 6,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="FacebookEmojis" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {EmojisArray.map((e, i) => (
                <img
                  onClick={() => {
                    handleEmojiClick(e.alt);
                        AddNotifications({
                          UserId: UserData.UserId,
                          FullName: UserData.FullName,
                          EmojiType: e.alt ,
                          POST: Post
                        });
                  }}
                  key={i}
                  className="HoverScale"
                  src={e.src}
                  alt={e.alt}
                  style={{
                    ...emojiImgStyle,
                    filter: selected === e.alt ? 'brightness(0.8)' : 'none',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          </div>
        }
        placement="top"
        className="EmojiPopup"
        visible={visible}
        trigger={[]}
      >
        <CButton
          className="EmojisBtn"
          style={{
            color: `${selected ? btnBg : 'var(--TxtColor)'}`,
            border: 'none'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={()=>{
            handleBtnClick();
            AddNotifications({
              UserId: UserData.UserId,
              FullName: UserData.FullName,
              EmojiType: selected || 'like',
              POST: Post
            });
          }}
        >
          <EmojiBtn />
        </CButton>
      </CPopover>
    </div>
  );
};