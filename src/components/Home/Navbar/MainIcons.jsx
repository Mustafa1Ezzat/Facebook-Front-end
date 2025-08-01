import { CButton, CPopover } from '@coreui/react'
import { useState, useRef, useEffect, useContext } from 'react';
import { LogoutContext } from '../../contexts/LogoutContext';
import { UserDataContext } from '../../contexts/UserDataContext';
import { useNavigate } from 'react-router';
import { DeleteNotifications } from '../../../apis/apis';

import like from '../../../assets/Facebook Emoji/like.svg';
import love from '../../../assets/Facebook Emoji/love.svg';
import care from '../../../assets/Facebook Emoji/care.svg';
import haha from '../../../assets/Facebook Emoji/haha.svg';
import wow from '../../../assets/Facebook Emoji/wow.svg';
import sad from '../../../assets/Facebook Emoji/sad.svg';
import angry from '../../../assets/Facebook Emoji/angry.svg';

import PublicIcon from '@mui/icons-material/Public';
import ShieldIcon from '@mui/icons-material/Shield';

const emojiMap = { like, love, care, haha, wow, sad, angry };

// --- Parent wrapper to control which popover is open ---
export let MainIcons = ({ setAlignment }) => {
  const [openPopover, setOpenPopover] = useState(null); // 'message' | 'notification' | 'profile' | null

  return (
    <section style={{ display: 'flex', gap: 10 }}>
      <Message openPopover={openPopover} setOpenPopover={setOpenPopover} />
      <Notifications openPopover={openPopover} setOpenPopover={setOpenPopover} />
      <Profile openPopover={openPopover} setOpenPopover={setOpenPopover} setAlignment={setAlignment} />
    </section>
  );
};

// --- Message Popover ---
export let Message = ({ openPopover, setOpenPopover }) => {
  let [UserMessages, setUserMessages] = useState(['Hi', 'How are you?', 'What are you doing?']);
  let [inputValue, setInputValue] = useState('');
  let InputClear = useRef('');
  let lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [UserMessages]);

  let ar = [
    { id: 1, title: 'Chat with Alice', name: 'Alice' },
    { id: 2, title: 'Chat with Bob', name: 'Bob' },
    { id: 3, title: 'Chat with Charlie', name: 'Charlie' },
    { id: 4, title: 'Chat with Diana', name: 'Diana' },
    { id: 5, title: 'Chat with Eve', name: 'Eve' },
    { id: 6, title: 'Chat with Frank', name: 'Frank' },
    { id: 7, title: 'Chat with Grace', name: 'Grace' },
    { id: 8, title: 'Chat with Henry', name: 'Henry' },
    { id: 9, title: 'Chat with Irene', name: 'Irene' },
    { id: 10, title: 'Chat with Jack', name: 'Jack' },
  ];

  let result = ar.map((element, index) => {
    let TextBody = () => (
      <section className='contentMessages'>
        <div className='textData'>
          {UserMessages.map((e, i) => (
            <section
              key={i}
              ref={i === UserMessages.length - 1 ? lastMessageRef : null}
            >
              <p className='textDataBody'>{e}</p>
            </section>
          ))}
        </div>
        <div className='sendData'>
          <hr />
          <div style={{ marginTop: '10px' }} className="input-group">
            <input
              ref={InputClear}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter' && inputValue !== '') {
                  setUserMessages([...UserMessages, inputValue]);
                  InputClear.current.value = '';
                  setInputValue('');
                }
              }}
              type="text"
              className="form-control SendBTN"
              placeholder="Aa"
            />
            <button
              onClick={() => {
                if (inputValue !== '') {
                  setUserMessages([...UserMessages, inputValue]);
                  InputClear.current.value = '';
                  setInputValue('');
                }
              }}
              className="bi bi-send-fill"
            />
          </div>
        </div>
      </section>
    );

    return (
      <section key={index} className='messagePopupSection text-light'>
        <CPopover
          content={<section className='TextPopover'>{TextBody()}</section>}
          placement="left"
          className='messagePopup2'
          title={element.name}
          fallbackPlacements={['left']}
          trigger="click"
        >
          <section className='MessagesAvatar'>
            <div
              style={{
                clipPath: 'circle()',
                backgroundColor: 'var(--PriColor)',
                width: '40px',
                height: '40px',
              }}
            ></div>
            <div>
              <h6 style={{ fontSize: '13px', margin: '0 0 0 10px' }}>
                <b>{element.name}</b>
              </h6>
              <h6 style={{ fontSize: '10px', margin: '0 0 0 10px' }}>{element.title}</h6>
            </div>
          </section>
        </CPopover>
      </section>
    );
  });

  return (
    <section>
      <CPopover
        content={<section className='contentPopover'>{result}</section>}
        placement="bottom"
        className='messagePopup'
        title="Chats"
        trigger="manual"
        visible={openPopover === 'message'}
      >
        <CButton
          className='MessageBtn'
          style={{ color: 'var(--TxtColor)' }}
          onClick={() => setOpenPopover(openPopover === 'message' ? null : 'message')}
        >
          <i style={{ fontSize: '15px' }} className="bi bi-messenger"></i>
        </CButton>
      </CPopover>
    </section>
  );
};

// --- Notifications Popover ---
export let Notifications = ({ openPopover, setOpenPopover }) => {
  let { UserData } = useContext(UserDataContext);
  const emojiImgStyle = { width: 20, height: 20, verticalAlign: 'middle', marginRight: 4 };
  let [NotificationsData, setNotificationsData] = useState([]);

  useEffect(() => {
    setNotificationsData(UserData.Notifications || []);
  }, [UserData.Notifications]);

  let result = NotificationsData.map((element, index) => {
    let NotificationPost = () => {
      let PostTxt = () => {
        if (element.POST.PostTxt.length > 30) {
          return <p> {element.POST.PostTxt} </p>
        } else {
          return <h6> {element.POST.PostTxt} </h6>
        }
      }
      let PhotoPost = () => (
        <img style={{ borderRadius: '10px' }} className="w-100" src={element.POST.PhotoLink} alt="User upload" />
      );
      return (
        <section key={index} className="NotificationBody PostSettings">
          <section className="PostHead" style={{ padding: '5px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--PriColor)', borderRadius: '50%' }}></div>
            <div>
              <h6 className="m-0"
                onClick={e => { e.stopPropagation(); }}
                style={{ cursor: 'pointer' }}
              >
                <b>{element.POST.username}</b>
                {UserData.OfficialAccount === true ? (
                  <i className="ms-2 bi bi-patch-check-fill gold-gradient"></i>
                ) : (
                  ''
                )}
              </h6>
              <div className="PrivacyAndDate">
                <p> {element.POST.Privacy === 'Public' ? <PublicIcon style={{ fontSize: '15px' }} /> : <ShieldIcon style={{ fontSize: '15px' }} />}  </p>
                <p style={{ fontSize: '12px' }}>
                  {new Date(element.POST.CreatedAt).toLocaleString([], {
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </p>
              </div>
            </div>
          </section>
          <section className="PostContainer">
            <section style={{ maxHeight: '30vh', overflowY: 'scroll' }}>{PostTxt()}</section>
            <VideoPost videoLink={element.POST.VideoLink} />
            {element.POST.PhotoLink ? PhotoPost() : ''}
          </section>
        </section>
      );
    };

    return (
      <section key={index} className='messagePopupSection text-light'>
        <CPopover
          content={NotificationPost()}
          placement="left"
          className='messagePopup2'
          title={element.FullName}
          trigger={'click'}
          fallbackPlacements={['bottom']}
        >
          <section className='MessagesAvatar'>
            <div style={{
              clipPath: 'circle()',
              backgroundColor: 'var(--PriColor)',
              width: '40px',
              height: '40px',
            }}></div>
            <img
              src={emojiMap[element.EmojiType] || like}
              alt={element.EmojiType}
              style={{
                ...emojiImgStyle,
                marginLeft: '-10px',
                marginTop: '10px',
                zIndex: 1,
              }}
            />
            <div>
              <h6 style={{ fontSize: '13px', margin: '0 0 0 5px' }}><b>{element.FullName}</b></h6>
              <h6 style={{ fontSize: '10px', margin: '0 0 0 5px' }}> reacted to your post <q><b>{element.EmojiType}</b></q></h6>
            </div>
            <i
              onClick={async () => {
                await DeleteNotifications({
                  UserId: element.UserId,
                  OwnerId: element.POST.UserId,
                  PostId: element.POST.PostId,
                });
                setNotificationsData((prev) =>
                  prev.filter(
                    (n) =>
                      !(
                        n.UserId === element.UserId &&
                        n.POST.UserId === element.POST.UserId &&
                        n.POST.PostId === element.POST.PostId
                      )
                  )
                );
              }}
              style={{ position: 'absolute', right: '15px' }}
              className="bi bi-trash-fill DelNotificationBTN"
            />
          </section>
        </CPopover>
      </section>
    )
  });

  return (
    <section>
      <CPopover
        content={<section className='contentPopover'>{result}</section>}
        placement="bottom"
        fallbackPlacements={['bottom']}
        className='messagePopup'
        title="Notifications"
        trigger="manual"
        visible={openPopover === 'notification'}
      >
        <CButton
          onClick={() => setOpenPopover(openPopover === 'notification' ? null : 'notification')}
          className='MessageBtn'
          style={{ color: 'var(--TxtColor)' }}
        >
          <i style={{ fontSize: '15px' }} className="bi bi-bell-fill"></i>
        </CButton>
      </CPopover>
    </section>
  )
}

// --- Profile Popover ---
export let Profile = ({ openPopover, setOpenPopover, setAlignment }) => {
  let setHideLoginPage = useContext(LogoutContext)
  let { UserData } = useContext(UserDataContext)
  let Navigate = useNavigate()
  return (
    <section>
      <CPopover
        content={
          <section>
            <section className='Profile' onClick={() => { Navigate('/profile'); setAlignment('profile'); setOpenPopover(null); }}>
              <div style={{ clipPath: 'circle()', backgroundColor: 'var(--PriColor)', width: '40px', height: '40px' }}></div>
              <div>
                <h6 style={{ padding: '0', textTransform: 'capitalize', fontSize: '13px', margin: '0 0 0 10px' }}>
                  <b>
                    {UserData.FullName}
                  </b>
                  {UserData.OfficialAccount === true ? (
                    <i className="ms-2 bi bi-patch-check-fill gold-gradient"></i>
                  ) : (
                    ''
                  )}
                </h6>
              </div>
            </section>
            <hr />
            <section className='ProfileIcons'>
              <section className='Settings'>
                <div className='SettingsIcons'>
                  <i className="bi bi-gear-fill"></i>
                </div>
                <span className='ms-2'>Settings & Privacy</span>
              </section>
              <section className='Settings'>
                <div className='SettingsIcons'>
                  <i className="bi bi-question-circle-fill"></i>
                </div>
                <a target='_blank' href={'https://wa.me/+201113027315'} className='ms-2' style={{ textDecoration: 'none' }}>Help & Support</a>
              </section>
              <button className='Settings BtnLogOut'
                onClick={() => {
                  setHideLoginPage("true")
                  Navigate('/')
                  localStorage.removeItem('token');
                  setOpenPopover(null);
                }}>
                <div className='SettingsIcons'>
                  <i className="bi bi-arrow-left-circle-fill"></i>
                </div>
                <span onClick={() => { localStorage.clear(); localStorage.setItem('PageLabel', 'home') }} className='ms-2'>Log out</span>
              </button>
            </section>
          </section>
        }
        placement="bottom"
        className='messagePopup'
        title="Profile"
        trigger="manual"
        visible={openPopover === 'profile'}
      >
        <CButton
          className='MessageBtn'
          style={{ color: 'var(--TxtColor)' }}
          onClick={() => setOpenPopover(openPopover === 'profile' ? null : 'profile')}
        >
          <i style={{ fontSize: '15px' }} className="bi bi-person-circle"></i>
        </CButton>
      </CPopover>
    </section>
  )
}

// --- VideoPost helper ---
function VideoPost({ videoLink }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (!videoLink) return null;

  return (
    <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <video
        ref={videoRef}
        controls
        disablePictureInPicture
        controlsList="nodownload noplaybackrate"
        style={{
          width: '100%',
          maxHeight: '600px',
          borderRadius: '5px',
        }}
      >
        <source src={videoLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}