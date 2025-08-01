import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Toaster } from 'sonner'
import { Routes, Route } from 'react-router'

// import components
import { LogInPage } from './components/Login/LoginPage'
import { MainHomePage } from './components/Home/MainHomePage'
import { Nav } from '../src/components/Home/Navbar/Nav'
import { Error404 } from './components/Error/Error404'


// react hooks
import { useState, useEffect } from 'react'

// import contexts
import { LogoutContext } from './components/contexts/LogoutContext'
import { UserDataContext } from './components/contexts/UserDataContext'
import { ReelsContext } from './components/contexts/ReelsContext'
import { PostContext } from './components/contexts/PostContext'
import { AlignmentContext } from './components/contexts/AlignmentContext'
import { GetAllLikes } from './components/contexts/GetMyLikesContext'
import { CommentsContext } from './components/contexts/CommentsContext'
import { SavedPostsContext } from './components/contexts/SavedPostsContext'

// import api
import { LoginValidations, GetAllUsersPosts, GetAllReels, DeleteOldReels, GetMyLikes } from './apis/apis'




// import Components
import { SavedPost } from './components/Home/Utils/PostsBody'
import { PostVideos } from './components/Home/Utils/PostsBody'
import { Profile } from './components/Home/Profile/Profile'
import { Friends } from './components/Home/Friends/Friends'





























function App() {  

  // state remove Login and Sign up page
  let [HideLoginPage, setHideLoginPage] = useState(()=>{
    let saved = localStorage.getItem('LoginPage');
    return saved? saved : "true";
   })

   const [alignment, setAlignment] = useState(()=>{
    let savedLabel = localStorage.getItem('PageLabel');
        return savedLabel? savedLabel : 'home'
   });


   let [UserData, setUserData] = useState('')
   let [UserReels, setUserReels] = useState([])
   let [UserPosts, setUserPosts] = useState([])
   let [AllUsersPosts, setAllUsersPosts] = useState([]);
   let [AllLikes, setAllLikes] = useState([])
   let [Comments, setComments] = useState([])
  let  [savedPostsUpdates, setSavedPostsUpdates] = useState([])
  



  // setAlignment in local storage
      useEffect(()=>{
        localStorage.setItem('PageLabel', alignment)
      }, [alignment])


   useEffect(()=>{
    if(!localStorage.getItem('token')){return}

    (async ()=>{
      await DeleteOldReels()
      return;
    })();


    (async ()=>{
      await GetAllUsersPosts().then((res)=>{
        setAllUsersPosts(res)
      }).catch((error)=>{
        console.log(error)
      })
    })();


    (async()=>{
        let token = localStorage.getItem('token')
        await LoginValidations(token)
        .then((res)=>{
                setUserData(res)
            }).catch((error)=>{
                console.log(error)
            })
        })();



        (async()=>{
        await GetAllReels().then((res)=>{
             setUserReels(res)
          }).catch(err=> alert(err + 'Failed to get all reels from database'))
        })();

        
        
        (async ()=>{
          await GetMyLikes().then((res)=>{
                setAllLikes(res)
              })
            })();

}, [])





  useEffect(()=>{
    localStorage.setItem('LoginPage', HideLoginPage)
  }, [HideLoginPage])


  let AppPages = ()=>{
       if(HideLoginPage==="true"){
          return (
            <Routes>
              <Route path='*' element={<Error404/>}/>
              <Route path='/' element={<LogInPage setHideLoginPage={setHideLoginPage} />}/>
            </Routes>
          )
        }else{
          return (
              <section className='PageBody'>

                    <Nav/>

                  <Routes>
                    <Route path='*' element={<Error404/>}/>

                    <Route path='/' element={<MainHomePage/>}/>
                    <Route path="/Friends" element={<Friends/>}/>
                    <Route path="/Videos" element={<PostVideos/>}/>
                    <Route path="/Saved" element={<SavedPost/>}/>
                    <Route path="/Profile" element={<Profile/>}/>
                  </Routes>
              </section>
          )
        }
  }

  return (
    <>
    <UserDataContext.Provider value={{setUserData, UserData}}>
     <LogoutContext.Provider value={setHideLoginPage}>
      <ReelsContext.Provider value={{UserReels, setUserReels}}>
       <PostContext.Provider value={{UserPosts, setUserPosts, AllUsersPosts, setAllUsersPosts}}>
        <AlignmentContext.Provider value={{alignment, setAlignment}}>
         <GetAllLikes.Provider value={{AllLikes, setAllLikes}}>
          <CommentsContext.Provider value={{Comments, setComments}}>
           <SavedPostsContext.Provider value={{savedPostsUpdates, setSavedPostsUpdates}}>





        <Toaster 
        richColors 
        expand={false}  
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--SecColor)',
            border: '1px solid var(--BorderColor)',
            color: 'var(--TxtColor)'
          },
        }}/>

          {AppPages()}
          
           </SavedPostsContext.Provider>
          </CommentsContext.Provider>
         </GetAllLikes.Provider>
        </AlignmentContext.Provider>
       </PostContext.Provider>
      </ReelsContext.Provider>
     </LogoutContext.Provider>
    </UserDataContext.Provider>

    </>
  )
}

export default App