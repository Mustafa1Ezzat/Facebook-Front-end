// import Components
import { ReelsSlider } from "./Utils/ReelsSlider"
import { AddNewReels } from "./Utils/AddNewReels"
import { Posts } from "./Utils/Posts"
import { PostsBody } from "./Utils/PostsBody"
import { UserDataContext } from "../contexts/UserDataContext"
import { useContext } from "react"
import { useNavigate } from "react-router"

import { AlignmentContext } from "../contexts/AlignmentContext"


// import icons
import Friends from '../../../src/assets/Icons/Friends.svg'
import Groups from '../../../src/assets/Icons/Groups.svg'
import Watch from '../../../src/assets/Icons/Watch.svg'
import Saved from '../../../src/assets/Icons/Saved.svg'
import Pages from '../../../src/assets/Icons/Pages.svg'
import Events from '../../../src/assets/Icons/Events.svg'
import Games from '../../../src/assets/Icons/Games.svg'
import Live from '../../../src/assets/Icons/Live.svg'
import Meta from '../../../src/assets/Icons/Meta.svg'

let Icons = [
    {name: "Friends", icon: Friends, Goto: '/Friends', Label:'add'},
    {name: "Groups",  icon: Groups,  Goto: '*',        Label:''},
    {name: "Watch",   icon: Watch,   Goto: '/Videos',  Label:'video'},
    {name: "Saved",   icon: Saved,   Goto: '/Saved',   Label:'save'},
    {name: "Pages",   icon: Pages,   Goto: '*',        Label:''},
    {name: "Events",  icon: Events,  Goto: '*',        Label:''},
    {name: "Games",   icon: Games,   Goto: '*',        Label:''},
    {name: "Live",    icon: Live,    Goto: '*',        Label:''},
    {name: "Meta",    icon: Meta,    Goto: '*',        Label:''},

]

export let MainHomePage = ()=>{

        let { UserData } = useContext(UserDataContext)
        let {setAlignment } = useContext(AlignmentContext)
        let navigate = useNavigate()
    
    return (<>
            <section className="HomePage">













                <section className="LEFT">


                    <div className="UserProfile" onClick={(()=>{navigate('/Profile'); setAlignment('profile')})}>
                        <div className="UserProfileCircle" style={{width:'40px', height:'40px', backgroundColor:'var(--PriColor)', borderRadius:'50%'}}></div>
                        <h6 className="m-0" style={{cursor:'pointer'}} >
                            <b>{UserData.FullName} 

                            {UserData.OfficialAccount == true ? (
                                <i className="ms-2 bi bi-patch-check-fill gold-gradient"></i>
                            ) : (
                                ''
                            )}

                            <br /> <p style={{fontSize:'12px', margin:'0px'}}>{UserData.Username}</p></b>
                            
                        </h6>
                    </div>

                    <h6>Your shortcuts</h6>
                    <hr />
                         {Icons.map((e, i)=>{return (
                            <span key={i} className="Shortcuts" onClick={(()=>{navigate(e.Goto); setAlignment(e.Label)}) }>
                                <img style={{width: '30px'}} src={e.icon} alt={e.name} />
                                <p>{e.name}</p>
                            </span>
                         )})}
                </section>


























                <section className="CENTER">
                    <section className="CreatePost">
                        <Posts/>
                    </section>

                    <section className="Reels">
                        <AddNewReels/>
                        <ReelsSlider/>
                    </section>
























                    <section className="Feeds">
                        <PostsBody/>
                    </section>
                </section>

                <section className="RIGHT">
                   
                </section>
            </section>
    </>)
}