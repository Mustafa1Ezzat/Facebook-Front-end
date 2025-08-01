import { useContext,useMemo,useRef,useState, useEffect } from "react"
import { UserDataContext } from "../../contexts/UserDataContext"
import { SavedPostsContext } from "../../contexts/SavedPostsContext";
import { PostContext } from "../../contexts/PostContext"
import { AlignmentContext } from '../../contexts/AlignmentContext';
import { useNavigate } from "react-router";

import { CButton, CPopover } from '@coreui/react'

 import { EmojisPopup } from "./EmojisPopup"; 
 import { SavedBtn, SavedBtnApis } from "./SavedBtn";
 import { CommentPopup } from "./ComentPopup";

// MUI ICONS
import PublicIcon from '@mui/icons-material/Public';
import ShieldIcon from '@mui/icons-material/Shield';


// import apis
import { DelOnePost, GetAllUsersPosts, deleteAllCommentAfterDeletePost, GetAllSavedPosts, DeleteSavedPost } from "../../../apis/apis";




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





export let PostsBody = () => {
    let Navigate = useNavigate()
    let { setAlignment } = useContext(AlignmentContext)
    let { UserData } = useContext(UserDataContext)
    let { setAllUsersPosts, AllUsersPosts } = useContext(PostContext)

    let allPosts = AllUsersPosts.flatMap(user => user.Posts || []);

    let PostBody = [...allPosts].sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)).map((e, i) => {

        let PostTxt = () => {
            if (e.PostTxt.length > 30) {
                return <p> {e.PostTxt} </p>
            } else {
                return <h6> {e.PostTxt} </h6>
            }
        }

        let PhotoPost = () => {
            return (<img style={{ borderRadius: '10px' }} className="w-100" src={e.PhotoLink} alt="User upload" />)
        }

        let DelBtn = () => (
            <section className={`PostDel ${String(e.UserId) === String(UserData.UserId) ? '' : 'd-none'}`}>
                <CPopover
                    content={
                        <section className='PostDeleteBtn'>
                            <button className={`yesDel`}
                                onClick={async () => {
                                    let data = { PostId: e.PostId, UserId: UserData.UserId, publicId: e.DelCloudinary };
                                    let PostId = { PostId: e.PostId };
                                    await deleteAllCommentAfterDeletePost(PostId).then(() => { }).catch(() => { });
                                    await DelOnePost(data);
                                    (async () => {
                                        await GetAllUsersPosts().then((res) => {
                                            setAllUsersPosts(res)
                                        }).catch((error) => {
                                            console.log(error)
                                        })
                                    })();
                                }}
                            >
                                Yes
                            </button>
                            <button className={`noDel`} >
                                No
                            </button>
                        </section>
                    }
                    placement="bottom"
                    className='DelPopup'
                    trigger="focus"
                >
                    <CButton className='DelBtn' style={{ color: 'var(--TxtColor)' }}>
                        <i style={{ fontSize: '15px' }} className="bi bi-x-circle-fill"></i>
                    </CButton>
                </CPopover>
            </section>
        )

        return (
            <section key={i} className="PostsBody PostSettings">
                <section className="PostHead">
                    <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--PriColor)', borderRadius: '50%' }}></div>
                    <div>
                        <h6 className="m-0"
                            onClick={e => {
                                e.stopPropagation();
                                setAlignment('profile');
                                Navigate("/Profile");
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <b>{e.username}</b>
                            {e.OfficialAccount == true ? (
                                <i className="ms-2 bi bi-patch-check-fill gold-gradient"></i>
                            ) : (
                                ''
                            )}
                        </h6>
                        <div className="PrivacyAndDate">
                            <p> {e.Privacy === 'Public' ? <PublicIcon style={{ fontSize: '15px' }} /> : <ShieldIcon style={{ fontSize: '15px' }} />}  </p>
                            <p style={{ fontSize: '12px' }}>
                                {new Date(e.CreatedAt).toLocaleString([], {
                                    weekday: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </p>
                        </div>
                        {DelBtn()}
                    </div>
                </section>
                <section className="PostContainer">
                    <section style={{maxHeight:'30vh', overflowY:'scroll'}}>{PostTxt()}</section>
                    <VideoPost videoLink={e.VideoLink} />
                    {e.PhotoLink ? PhotoPost() : ''}
                </section>
                <hr />
                <section className="PostFooter">
                    <EmojisPopup POSTID={e.PostId} Post={e} />
                    <CommentPopup POSTID={e.PostId} />
                    <SavedBtn data={e} />
                </section>
            </section>
        )
    })

    return (
        <section>
            {PostBody}
        </section>
    )
}


































export let MyPostsInProfile = () => {
    let Navigate = useNavigate();
    let { setAlignment } = useContext(AlignmentContext);
    let { UserData } = useContext(UserDataContext);

    // Use local state for posts to update UI on delete
    const [posts, setPosts] = useState(Array.isArray(UserData.Posts) ? UserData.Posts : []);

    // Sync local posts state if UserData.Posts changes (e.g. on profile switch)
    useEffect(() => {
        setPosts(Array.isArray(UserData.Posts) ? UserData.Posts : []);
    }, [UserData.Posts]);

    let PostBody = posts
        .slice()
        .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt))
        .map((e, i) => {

        let PostTxt = () => {
            if (e.PostTxt && e.PostTxt.length > 30) {
                return <p>{e.PostTxt}</p>;
            } else {
                return <h6>{e.PostTxt}</h6>;
            }
        };

        let VideoPost = () => {
            if (!e.VideoLink) return null;
            return (
                <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <video
                        controls
                        loop
                        disablePictureInPicture
                        controlsList="nodownload noplaybackrate"
                        style={{
                            width: '100%',
                            maxHeight: '600px',
                            borderRadius: '5px',
                        }}
                    >
                        <source src={e.VideoLink} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </section>
            );
        };

        let PhotoPost = () => {
            if (!e.PhotoLink) return null;
            return (<img style={{ borderRadius: '10px' }} className="w-100" src={e.PhotoLink} alt="User upload" />);
        };

        let DelBtn = () => (
            <section className={`PostDel ${String(e.UserId) === String(UserData.UserId) ? '' : 'd-none'}`}>
                <CPopover
                    content={
                        <section className='PostDeleteBtn'>
                            <button className={`yesDel`}
                                onClick={async () => {
                                    let data = { PostId: e.PostId, UserId: UserData.UserId };
                                    let PostId = { PostId: e.PostId };
                                    await deleteAllCommentAfterDeletePost(PostId).catch(() => {});
                                    await DelOnePost(data);
                                    // Remove post from local state
                                    setPosts(prev => prev.filter(post => post.PostId !== e.PostId));
                                }}
                            >
                                Yes
                            </button>
                            <button className={`noDel`}>No</button>
                        </section>
                    }
                    placement="bottom"
                    className='DelPopup'
                    trigger="focus"
                >
                    <CButton className='DelBtn' style={{ color: 'var(--TxtColor)' }}>
                        <i style={{ fontSize: '15px' }} className="bi bi-x-circle-fill"></i>
                    </CButton>
                </CPopover>
            </section>
        );

        return (
            <section key={e.PostId || i} className="PostsBody PostSettings">
                <section className="PostHead">
                    <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--PriColor)', borderRadius: '50%' }}></div>
                    <div>
                        <h6 className="m-0"
                            onClick={e => {
                                e.stopPropagation();
                                setAlignment('profile');
                                Navigate("/Profile");
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <b>{e.username}</b>
                            {e.OfficialAccount === true ? (
                                <i className="ms-2 bi bi-patch-check-fill gold-gradient"></i>
                            ) : (
                                ''
                            )}
                        </h6>
                        <div className="PrivacyAndDate">
                            <p>
                                {e.Privacy === 'Public'
                                    ? <PublicIcon style={{ fontSize: '15px' }} />
                                    : <ShieldIcon style={{ fontSize: '15px' }} />}
                            </p>
                            <p style={{ fontSize: '12px' }}>
                                {e.CreatedAt && new Date(e.CreatedAt).toLocaleString([], {
                                    weekday: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </p>
                        </div>
                        {DelBtn()}
                    </div>
                </section>
                <section className="PostContainer">
                    <section style={{maxHeight:'30vh', overflowY:'scroll'}}>{PostTxt()}</section>
                    {VideoPost()}
                    {PhotoPost()}
                </section>
                <hr />
                <section className="PostFooter">
                    <EmojisPopup POSTID={e.PostId} />
                    <CommentPopup POSTID={e.PostId} />
                    <SavedBtn data={e} />
                </section>
            </section>
        );
    });

    return (
        <section>
            {PostBody.length > 0 ? PostBody : (
                <section className="emptySaved">
                    <h1><b>No Posts Yet!</b></h1>
                    <p>This page currently contains no posts. <br /> You can start by adding new posts or check back later for updates.</p>
                </section>
            )}
        </section>
    );
};





























// ********************************* Saved Posts

export let SavedPost = () => {

    
    
    
    let Navigate = useNavigate()
    let {setAlignment} = useContext(AlignmentContext)
    let { UserData } = useContext(UserDataContext)
    let { setAllUsersPosts } = useContext(PostContext)
    let {savedPostsUpdates, setSavedPostsUpdates} = useContext(SavedPostsContext)



      useMemo(()=>{
               (async()=>{
               let data = {MyId : UserData.UserId}
                 await GetAllSavedPosts(data).then((res) => {
                  setSavedPostsUpdates(res)
                }).catch(()=>{}) })();
      }, [UserData.UserId, setSavedPostsUpdates])



      let SavedPostContainer = ()=>{

        if(savedPostsUpdates.length !== 0){
            let SavedPost = [...savedPostsUpdates].sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)).map((e,i)=>{


            let PostTxt = ()=>{
                if(e.PostTxt.length > 30){
                    return <p> {e.PostTxt} </p>
                }else{
                    return <h6> {e.PostTxt} </h6>
                }
            }


                    let VideoPost = () => {
                        return (
                            <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <video
                                    controls
                                    muted
                                    loop
                                    disablePictureInPicture
                                    controlsList="nodownload noplaybackrate"
                                    style={{
                                        width: '100%',
                                        maxHeight: '600px',
                                        borderRadius: '5px',
                                    }}
                                >
                                    <source src={e.VideoLink} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </section>
                        );
                    }


                    let PhotoPost = ()=>{
                        return (<img style={{borderRadius:'10px'}} className="w-100" src={e.PhotoLink} alt="User upload" />)
                    }


                    let DelBtn = () => {
                    return (
                        <section className={`PostDel ${String(e.UserId) === String(UserData.UserId) ? '' : 'd-none'}`}>
                                <CPopover
                                    content={
                                    <section className='PostDeleteBtn'>

                                            <button className={`yesDel`} 
                                                onClick={async () => {
                                                    let data = { PostId: e.PostId, UserId: UserData.UserId };
                                                    
                                                        let PostId = { PostId: e.PostId };
                                                        await deleteAllCommentAfterDeletePost(PostId).then(() => {}).catch(() => {});



                                                        setSavedPostsUpdates(prev => prev.filter((el)=>{ el.PostId !== e.PostId }))
                                                        await DeleteSavedPost({MyId:UserData.UserId}).then(() => {}).catch(() => {});


                                                    await DelOnePost(data);

                                                    // Remove the post from AllUsersPosts
                                                        (async ()=>{
                                                        await GetAllUsersPosts().then((res)=>{
                                                            setAllUsersPosts(res)
                                                        }).catch((error)=>{
                                                            console.log(error)
                                                        })
                                                        })();


                                                                
                                                }}
                                                >
                                                Yes
                                            </button>

                                            <button className={`noDel`} >
                                                No
                                            </button>

                                            
                                        </section>
                                
                                }
                                placement="bottom"
                                className='DelPopup'
                                //   title="Delete This Post"
                                trigger="focus"
                                >
                                    <CButton className='DelBtn' style={{color:'var(--TxtColor)'}}>
                                        <i style={{fontSize:'15px'}} className="bi bi-x-circle-fill"></i>
                                    </CButton>
                                </CPopover>
                        </section>
                    )
                    }


        return(
            <section key={i} className="PostsBody PostSettings">
                <section className="PostHead">
                    <div style={{width:'40px', height:'40px', backgroundColor:'var(--PriColor)', borderRadius:'50%'}}></div>

                    <div>

                        <h6 className="m-0"                   
                            onClick={e => {
                                e.stopPropagation();
                                setAlignment('profile');
                                Navigate("/Profile");
                            }}
                            style={{cursor:'pointer'}}
                            
                            >


                            <b>{e.username}</b>
                            {e.OfficialAccount == true ? (
                                <i className="ms-2 bi bi-patch-check-fill gold-gradient"></i>
                            ) : (
                                ''
                            )}
                        </h6>

                            <div className="PrivacyAndDate">
                              <p> {  e.Privacy === 'Public' ? <PublicIcon style={{fontSize:'15px'}}/>:<ShieldIcon style={{fontSize:'15px'}}/>  }  </p>
                              <p style={{fontSize:'12px'}}>
                                {new Date(e.CreatedAt).toLocaleString([], {
                                    weekday: 'short', // e.g., Mon, Tue
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                                </p>
                            </div>

                                    {DelBtn()}

                    </div>
                </section>
                
                <section className="PostContainer">
                        
                        <section style={{maxHeight:'30vh', overflowY:'scroll'}}>{PostTxt()}</section>
                        {e.VideoLink? VideoPost() : ''}
                        {e.PhotoLink? PhotoPost() : ''}
                </section>

                  <hr/>
                <section className="PostFooter">
                    <EmojisPopup POSTID = {e.PostId}/>
                    <CommentPopup POSTID = {e.PostId}/>
                    <SavedBtnApis data={e}  SavedOrUnSaved={e.SavedOrUnSaved}/>                  
                </section>

            </section>
        )
       })


             return SavedPost;
        }
        
        
        
        
        
        
        
        
        
        
        
        
        else{
            return(
            <section className="emptySaved">
                <h1><b>No Data Yet!</b></h1>
                <p>This page currently contains no content. <br /> You can start by adding new information or check back later for updates.</p>
            </section>)
        }
      }




    

    return(
        <section className="SavedPostContainer">
            <section className="SavedPost">
            <section>
                    {SavedPostContainer()}
            </section>
            </section>
        </section>
    )
}






















// ********************************* PostVideos

export let PostVideos = () => {
    let Navigate = useNavigate()
    let {setAlignment} = useContext(AlignmentContext)
    let { UserData } = useContext(UserDataContext)
    let { setAllUsersPosts, AllUsersPosts } = useContext(PostContext)
    



    
let allPosts = AllUsersPosts.flatMap(user => user.Posts || []);
        let filteredArray = allPosts.filter((index)=>{
            return index.Privacy === 'Public' && index.VideoLink !== null })


        let videoContainer = ()=>{
            if(filteredArray.length !== 0 ){
                let videoBody = [...filteredArray].sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)).map((e,i)=>{


                let PostTxt = ()=>{
                    if(e.PostTxt.length > 30){
                        return <p> {e.PostTxt} </p>
                    }else{
                        return <h6> {e.PostTxt} </h6>
                    }
                }


                let VideoPost = () => {
                    return (
                        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <video
                                controls
                                muted
                                loop
                                disablePictureInPicture
                                controlsList="nodownload noplaybackrate"
                                style={{
                                    width: '100%',
                                    maxHeight: '600px',
                                    borderRadius: '5px',
                                }}
                            >
                                <source src={e.VideoLink} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </section>
                    );
                }


                let PhotoPost = ()=>{
                    return (<img style={{borderRadius:'10px'}} className="w-100" src={e.PhotoLink} alt="User upload" />)
                }


                let DelBtn = () => {
                return (
                    <section className={`PostDel ${String(e.UserId) === String(UserData.UserId) ? '' : 'd-none'}`}>
                            <CPopover
                                content={
                                <section className='PostDeleteBtn'>

                                        <button className={`yesDel`} 
                                            onClick={async () => {
                                                let data = { PostId: e.PostId, UserId: UserData.UserId };

                                                    let PostId = { PostId: e.PostId };
                                                    await deleteAllCommentAfterDeletePost(PostId).then(() => {}).catch(() => {});


                                                await DelOnePost(data);

                                                // Remove the post from AllUsersPosts
                                                    (async ()=>{
                                                    await GetAllUsersPosts().then((res)=>{
                                                        setAllUsersPosts(res)
                                                    }).catch((error)=>{
                                                        console.log(error)
                                                    })
                                                    })();


                                                            
                                            }}
                                            >
                                            Yes
                                        </button>

                                        <button className={`noDel`} >
                                            No
                                        </button>

                                        
                                    </section>
                            
                            }
                            placement="bottom"
                            className='DelPopup'
                            //   title="Delete This Post"
                            trigger="focus"
                            >
                                <CButton className='DelBtn' style={{color:'var(--TxtColor)'}}>
                                    <i style={{fontSize:'15px'}} className="bi bi-x-circle-fill"></i>
                                </CButton>
                            </CPopover>
                    </section>
                )
                }


                        return(
                            <section key={i} className="PostsBody PostSettings">
                                <section className="PostHead">
                                    <div style={{width:'40px', height:'40px', backgroundColor:'var(--PriColor)', borderRadius:'50%'}}></div>

                                    <div>

                                        <h6 className="m-0"                   
                                            onClick={e => {
                                                e.stopPropagation();
                                                setAlignment('profile');
                                                Navigate("/Profile");
                                            }}
                                            style={{cursor:'pointer'}}
                                            
                                            >


                                            <b>{e.username}</b>
                                            {e.OfficialAccount == true ? (
                                                <i className="ms-2 bi bi-patch-check-fill gold-gradient"></i>
                                            ) : (
                                                ''
                                            )}
                                        </h6>

                                            <div className="PrivacyAndDate">
                                            <p> {  e.Privacy === 'Public' ? <PublicIcon style={{fontSize:'15px'}}/>:<ShieldIcon style={{fontSize:'15px'}}/>  }  </p>
                                            <p style={{fontSize:'12px'}}>
                                                {new Date(e.CreatedAt).toLocaleString([], {
                                                    weekday: 'short', // e.g., Mon, Tue
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })}
                                                </p>
                                            </div>

                                                    {DelBtn()}

                                    </div>
                                </section>
                                
                                <section className="PostContainer">
                                        <section style={{maxHeight:'30vh', overflowY:'scroll'}}>{PostTxt()}</section>
                                        {e.VideoLink? VideoPost() : ''}
                                        {e.PhotoLink? PhotoPost() : ''}
                                </section>

                                <hr/>
                                <section className="PostFooter">
                                    <EmojisPopup POSTID = {e.PostId}/>
                                    <CommentPopup POSTID = {e.PostId}/>
                                    <SavedBtn data={e}/>                  
                                </section>

                            </section>
                        )
                    })

                return videoBody;
            }



        else{
            return(
            <section className="emptySaved">
                <h1><b>No Data Yet!</b></h1>
                <p>This page currently contains no content. <br /> You can start by adding new information or check back later for updates.</p>
            </section>)
        }
        }



    

    return(
        <section className="SavedPostContainer">
            <section className="SavedPost">
                <section>
                        {videoContainer()}
                </section>
            </section>
        </section>
    )
}