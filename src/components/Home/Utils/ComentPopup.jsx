// import { useState } from "react";
import { CButton, CPopover } from '@coreui/react';
import { useContext, useRef, useState, useEffect } from 'react';
import { UserDataContext } from '../../contexts/UserDataContext';
import { CommentsContext } from '../../contexts/CommentsContext';

// import apis
import { CreateComment, ShowComment, DeleteComment } from '../../../apis/apis';
// {_id: '6851e844837cb71a2b5802f1', CommentText: 'Hi', PostId: '53094074590', UserId: '684f63db65eb2f68714c4e20', FullName: '1', …}

export let CommentPopup = ({POSTID}) => {

    let { UserData } = useContext(UserDataContext)
    let { Comments, setComments } = useContext(CommentsContext)
    let [InputValue, setInputValue] = useState('')
    let userRef = useRef ()

        let CommentFilter = Comments.filter((el)=> {return el.PostId === String(POSTID)})

    useEffect(()=>{
        (async()=>{
            let ID = { ID : POSTID}
            await ShowComment(ID).then(res=> setComments(res))
        })()

    }, [])

  return (
      <section >
            <CPopover 
              content={
                <section>
                    <section className='commentScroll'>
                        {
                            CommentFilter.map((e,i)=>{
                                return(
                                    <section key={i} className='CommentSection'>
                                     <div  className="AvaAndShow">
                                       <div style={{minWidth:'40px', minHeight:'40px', backgroundColor:'var(--PriColor)', borderRadius:'50%'}}></div>
                                         <h6 className="m-0">  <b>{e.FullName}</b>  </h6>


                                        <div className="vr"></div>


                                     <q className='w-50'>
                                        {e.CommentText}
                                     </q>

                                     {e.UserId === UserData.UserId ?
                                     <div className='DelCommentBtn'>
                                            <i className="bi bi-archive-fill" onClick={ async () => {
                                                let CommentId = { CommentId: e._id };
                                                setComments(prev => prev.filter(comment => comment._id !== e._id));
                                                await DeleteComment(CommentId).then(() => {}).catch(() => {});
                                            }}></i>
                                     </div>
                                     : UserData.UserId === '684c54e08f60821ad6455752'? <div className='DelCommentBtn'>
                                            <i className="bi bi-archive-fill" 
                                                onClick={ async () => {
                                                    let CommentId = { CommentId: e._id };
                                                    setComments(prev => prev.filter(comment => comment._id !== e._id));
                                                    await DeleteComment(CommentId).then(() => {}).catch(() => {});
                                                }}
                                            ></i>
                                     </div>
                                     : 
                                
                                     <div></div>
                                     }

                                     </div>
                                    </section>
                                )
                            })
                        }
                    </section>
                </section>
              }
              placement="bottom"
              className='CommentPopup'

              title={
                     <div className='commentHeader'>
                            <input maxLength={100} ref={userRef}
                                onChange={(e)=>{setInputValue(e.target.value)}}
                            className='commentInput' placeholder='Add a new comment' type="text" />

                            <button  
                            
                            onClick={async()=>{
                               if(InputValue !== ''){
                                 let data = {
                                    UserId: UserData.UserId, 
                                    FullName: UserData.FullName,
                                    PostId: POSTID,
                                    CommentText : InputValue
                                }
                                await CreateComment(data).then(()=> {}).catch(()=> {})
                                userRef.current.value = ''

                                setInputValue('')
                               }

                                       let ID = { ID : POSTID}
                                       await ShowComment(ID).then(res=> setComments(res))
                            }}
                            
                            > <i className="bi bi-node-plus-fill"></i> </button>
                    </div>
                 }
            >




                <CButton  className='CommentsBtn' style={{color:'var(--TxtColor)'}}>
                 <div 
                    onClick={ async ()=>{
                            let ID = { ID : POSTID}
                            await ShowComment(ID).then(res=> setComments(res))
                    }}>

                        Comments {CommentFilter.length===0? '' : `(${CommentFilter.length})` }
                 </div>
                </CButton>

            </CPopover>
      </section>
  )
}