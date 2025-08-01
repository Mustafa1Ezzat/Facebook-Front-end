import { useEffect, useState } from "react";
import { ReelPopupModal } from "./PopupModal";
import { useContext } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";
import { Toaster, toast } from 'sonner'


// import Apis
import { CreateNewReel } from "../../../apis/apis";
import { GetAllReels } from "../../../apis/apis";

// import context
import { ReelsContext } from "../../contexts/ReelsContext";



export let AddNewReels = () => {
  let {UserData} = useContext(UserDataContext)
  let {UserReels, setUserReels} = useContext(ReelsContext)

  
  const [popupOpen, setPopupOpen] = useState(false);
  
  let [reelsData, setReelsData] = useState({
    ReelsText: '',
    createdAt: new Date().toISOString().slice(0, 10) 
  });
  
  useEffect(()=>{
            (async()=>{
            await GetAllReels().then((res)=>{
                 setUserReels(res)
              }).catch(err=> console.log(err + 'Failed to get all reels from database'))
            })();
  }, [reelsData])

  let [reelsColor, setReelsColor] = useState('var(--PriColor)');

  return (
    <>
      <button 
        onClick={() => setPopupOpen(true)}
        className="AddNewReels">
        <div className="AddNewReelsIcon bi bi-plus-circle-fill" style={{fontSize:'25px'}}> </div>
      </button>

      <ReelPopupModal open={popupOpen} onClose={() => setPopupOpen(false)}>

          <div className="ReelsHeader">
            <h4 className="m-0">Add New Reels</h4>
            <p className="m-0">Create your own reels and share them with your friends.</p>
          </div>

          <div className="TopPartReels">

                <div className="ShowTextReels" style={{ backgroundColor: `${reelsColor} !important` }}>
                    <section className="UserHeaderReels">
                        <div className="UserImgReelsPopup" style={{ width: 35, height: 35 }}></div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
                            <p style={{textTransform:'capitalize', margin:'0px', fontSize:'13px'}} ><b>{UserData.FullName}</b></p>
                            {reelsData.createdAt === new Date().toISOString().slice(0, 10) ? (
                                <p style={{fontSize:'10px'}} className="ReelsTime m-0">Today</p>
                                ) : (
                                <p style={{fontSize:'10px'}} className="ReelsTime m-0">{reelsData.createdAt}</p>
                                )}
                        </div>
                    </section>

                        {reelsData.ReelsText === '' ? null : reelsData.ReelsText}
                </div>

                <div className="ChangeBgReels">
                    <div>
                     <button className="BtnColor bi bi-palette-fill"
                     onClick={() => setReelsColor('var(--BorderColor)')}
                     style={{color:'var(--BorderColor)', backgroundColor:'var(--BorderColor)'}}/>

                     <button className="BtnColor bi bi-palette-fill"
                     onClick={() => setReelsColor('var(--LogoColor)')}
                     style={{color:'var(--LogoColor)', backgroundColor:'var(--LogoColor)'}}/>
                    </div>

                     <div>
                     <button className="BtnColor bi bi-palette-fill"
                     onClick={() => setReelsColor('var(--LoginBtnColor)')}
                     style={{color:'var(--LoginBtnColor)', backgroundColor:'var(--LoginBtnColor)'}}/>

                     <button className="BtnColor bi bi-palette-fill"
                     onClick={() => setReelsColor('var(--PriColor)')}
                     style={{color:'var(--PriColor)', backgroundColor:'var(--PriColor)'}}/>
                    </div>
                    
                </div>
          </div>

          <div className="mt-3 w-100">

            <textarea 
            onChange={(e) => setReelsData({ ...reelsData, ReelsText: e.target.value })}
            rows={15} 
            maxLength={100} 
            className="TxtArea" 
            placeholder="Write your reels description here..."/>

            <button
            
            onClick={async () => {
                if (reelsData.ReelsText !== '') {
                  let Reels = [...UserReels, { RTxt: reelsData.ReelsText, RDate: Date.now(), Username: UserData.FullName }]
                  setUserReels(Reels);
                  setReelsData({ ReelsText: '', createdAt: new Date().toISOString().slice(0, 10) });
                  setReelsColor('var(--PriColor)');
                  setPopupOpen(false);

                    let data = {ID: UserData.UserId, 
                      NewReels: [{ 
                        RTxt: reelsData.ReelsText, 
                        RDate: Date.now(), 
                        Username: UserData.FullName, 
                        UserID: UserData.UserId,
                        ReelsColor: reelsColor,
                        ReelsID: Math.floor(1e8 + Math.random() * 9e10) 
                      }]}

                      

                    await CreateNewReel(data).then((res) => {
                      toast.success(() => (  <p style={{ padding: "0px", margin: "0px" }}> {res} </p> ));
                    }).catch(()=>{
                      toast.error(() => (  <p style={{ padding: "0px", margin: "0px" }}> Failed to create reels </p> ));
                    })
                }
              }}
            
            className="SaveReelsBtn btn btn-primary">Save Reels</button>
          </div>

      
      </ReelPopupModal>
    </>
  );
}