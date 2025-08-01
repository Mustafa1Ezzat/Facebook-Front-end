import { useContext, useState } from "react"
import { UserDataContext } from "../../contexts/UserDataContext"
import { PostContext } from "../../contexts/PostContext";
import { PhotoVideoPopupModal, PhotoPopupModal, VideoPopupModal } from "./PopupModal";
import { Toaster, toast } from 'sonner';

// MUI ICONS
import PublicIcon from '@mui/icons-material/Public';
import ShieldIcon from '@mui/icons-material/Shield';
import { useRef } from "react";


// import Apis
import { CreateNewPost, GetAllUsersPosts } from "../../../apis/apis";

export let Posts = ()=>{

    let { setAllUsersPosts } = useContext(PostContext)
    let { UserData } = useContext(UserDataContext)



      let [PhotoVideoOpen, setPhotoVideoOpen] = useState(false)
      let [PhotoOpen, setPhotoOpen] = useState(false)
      let [VideoOpen, setVideoOpen] = useState(false)
      let [ DelFromCloudinary, setDelFromCloudinary ] = useState('')

      let [Privacy, setPrivacy] = useState('Public')



      let [PostContent, setPostContent] = useState('');
       const textAreaRef = useRef(null);
 


        let [showOne, setShowOne] = useState('');
      let [photoLink, setPhotoLink] = useState(null);
      let [VideoLink, setVideoLink] = useState(null);


let showPhotoVideo = () => {
  if (showOne === '') return null;
  if (showOne === 'Photo' && photoLink) {
    return (<img className="w-100" src={photoLink} alt="User upload" />);
  }
  if (showOne === 'Video' && VideoLink) {
    return (
    <video 
    controls 
    muted 
    loop 
    disablePictureInPicture   
    controlsList="nodownload noplaybackrate" 
    className="w-100">
        <source src={VideoLink} type="video/mp4" />
        Your browser does not support the video tag.
    </video>);
  }
  return null;
};



    return(
    <section className="Posts">
            <div className="PostTop">
                <div className="PostInputContainer">
                 <div style={{minWidth:'40px', minHeight:'40px', backgroundColor:'var(--PriColor)', borderRadius:'50%'}}></div>
                 <button className="PostInput" onClick={() => setPhotoVideoOpen(true)}>{`What's on your mind, ${UserData.FullName}?`}</button>
                </div>

                <hr/>


                      {/*  ********************PHOTO/VIDEO MODAL******************** */}
                        <PhotoVideoPopupModal open={PhotoVideoOpen} onClose={() => setPhotoVideoOpen(false)}>
                
                          <div className="PostHeader">
                            <h5 style={{padding:'0 0 10px 0'}}><b>Create Post</b></h5>
                            <hr/>
                          </div>

                
                        <div className="AvaAndShow">
                            <div style={{minWidth:'40px', minHeight:'40px', backgroundColor:'var(--PriColor)', borderRadius:'50%'}}></div>
                            <div>
                                <h6 className="m-0">
                                    <b>{UserData.FullName}</b>
                                    {UserData.UserId == '684c54e08f60821ad6455752' ? (
                                        <i className="ms-2 bi bi-patch-check-fill gold-gradient"></i>
                                    ) : (
                                        ''
                                    )}
                                </h6>
                                    <div className="PostPrivacyOptions">
                                         <p
                                          onClick={()=>{setPrivacy('Public')}} 
                                          style={{color:`${Privacy === 'Public'? 'var(--LoginBtnColor) !important' : ' '}`}} 
                                          className="PrivacyIcons"><PublicIcon style={{fontSize:'14px'}}/> Public</p>

                                         <p 
                                         onClick={()=>{setPrivacy('Private')}} 
                                         style={{color:`${Privacy === 'Private'? 'var(--LoginBtnColor) !important' : ' '}`}}
                                         className="PrivacyIcons"><ShieldIcon style={{fontSize:'14px'}}/> Private</p>
                                    </div>
                            </div>
                        </div>

                        <div className="PostContent">
                            <textarea
                            onChange={(e)=>{setPostContent(e.target.value)}}
                            ref={textAreaRef} 
                            className="PostTextArea" 
                            placeholder="Write something..."/>
                        </div>

                        <div className="photoVideo">
                             {showPhotoVideo()}
                        </div>




                        <div className="BtnPost">
                            <div>  
                            <label htmlFor="upload-photo"><i className="bi bi-image-fill" style={{color:'#45bd62', fontSize:'25px'}}></i> Photo</label>
                            <input
                            onChange={async (e)=>{
                                let file = e.target.files[0];
                                if (!file) return;
                                
                                    let data = new FormData()
                                    data.append('file', file)
                                    data.append('upload_preset', 'facebook-clone')
                                    data.append('cloud_name', 'dq8mbekf7')

                                        const res = await fetch(
                                            'https://api.cloudinary.com/v1_1/dq8mbekf7/image/upload',
                                            {
                                            method: 'POST',
                                            body: data,
                                            }
                                        );

                                        let fileData = await res.json();

                                    
                                            setPhotoLink(fileData.secure_url);
                                            setDelFromCloudinary(fileData.public_id);
                                            setShowOne('Photo');
                                            setPhotoOpen(false);
                                            toast.success('Photo added successfully!');
                                        
                            }}
                            
                            type="file" name="photo" id="upload-photo" /> 
                            </div>

                             <div>  
                            <label htmlFor="upload-video"><i className="bi bi-play-btn-fill" style={{color:'#fc5677', fontSize:'25px'}}></i> Video</label>
                            <input
                            onChange={async(e)=>{
                                let file = e.target.files[0];
                                if (!file) return;

                                let data = new FormData()
                                data.append('file', file)
                                data.append('upload_preset', 'facebook-clone')
                                data.append('cloud_name', 'dq8mbekf7')

                                let res = await fetch(
                                    'https://api.cloudinary.com/v1_1/dq8mbekf7/video/upload',
                                    {
                                    method: 'POST',
                                    body: data,
                                    }
                                );

                                let fileData = await res.json();

                                setVideoLink(fileData.secure_url);
                                setShowOne('Video');
                                setVideoOpen(false);
                                toast.success('Video added successfully!');
                            }}
                             type="file" name="video" id="upload-video" /> 
                            </div>

                        </div>
                        
                                        <button 
                                        onClick={async () => {
                                            if (PostContent === '' && !VideoLink && !photoLink) {
                                            toast.error('Post content cannot be empty!');
                                            return;
                                            }



                                            let postData = [{
                                                username: UserData.FullName,
                                                PostTxt: PostContent,
                                                PhotoLink: photoLink,
                                                VideoLink: VideoLink,
                                                Privacy: Privacy,
                                                SavedOrUnSaved: true,
                                                UserId : UserData.UserId,
                                                PostId: Math.floor(1e8 + Math.random() * 9e10),
                                                CreatedAt: new Date().toISOString(),
                                                OfficialAccount: UserData.OfficialAccount,
                                                DelCloudinary : DelFromCloudinary
                                            }];

                                            let data = {ID: UserData.UserId, Post: postData}
                                            await CreateNewPost(data)
                                                .then(async (res) => {
                                                    toast.success(() => (<p style={{ padding: "0px", margin: "0px" }}>{res}</p>));
                                                    // Fetch all posts again and update global state
                                                    const allPosts = await GetAllUsersPosts();
                                                    setAllUsersPosts(allPosts);
                                                })
                                                .catch(() => {
                                                    toast.error(() => (<p style={{ padding: "0px", margin: "0px" }}>Failed to create reels</p>));
                                                });


                                            setPostContent('');
                                            setPhotoLink(null);
                                            setVideoLink(null);
                                            setShowOne('');
                                            setPhotoVideoOpen(false);
                                        }} 
                                        className="SaveReelsBtn btn btn-primary w-100"
                                        >
                                        Post
                                        </button>
                
                      
                      </PhotoVideoPopupModal>






                      
{/*  ********************Video MODAL******************** */}
                        <VideoPopupModal open={VideoOpen} onClose={() => setVideoOpen(false)}>
                        <div className="PostContent">
                            <textarea
                            onChange={(e)=>{setVideoLink(e.target.value)}}
                            onBlur={()=>{
                                    if(VideoLink === null){
                                        toast.error('Link cannot be empty!');
                                        return;
                                    }
                                    setShowOne('Video')
                                    setVideoOpen(false);
                                    toast.success('Video added successfully!');
                                }} 
                            ref={textAreaRef} 
                            className="PhotoTextArea" 
                            placeholder="Paste video link here"/>
                        </div>
                      </VideoPopupModal>



                <div className="BtnPost">
                    <button><i className="bi bi-camera-video-fill" style={{color:'#f02849', fontSize:'25px'}}></i> Live Video</button>

                    <button
                    onClick={()=>{setPhotoVideoOpen(true)}}
                    ><i className="bi bi-file-earmark-image" style={{color:'#45bd62', fontSize:'25px'}}></i> Photo/Video</button>

                    <button><i className="bi bi-file-play-fill" style={{color:'#fc5677', fontSize:'25px'}}></i> Reel</button>
                </div>

            </div>

            <div className="PostBottom"></div>
    </section>)
}