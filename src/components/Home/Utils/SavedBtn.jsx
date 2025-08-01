import { useState, useContext } from "react";
import{ SavedPostsAPIs, DeleteSavedPost } from "../../../apis/apis"
import { UserDataContext } from "../../contexts/UserDataContext";
import { SavedPostsContext } from "../../contexts/SavedPostsContext";


export let SavedBtn = ({data}) => {
    let [savedValue, setSavedValue] = useState(false)
    let { UserData } = useContext(UserDataContext)
  return (
    <button className="saveBtn btn" 
    
    onClick={ async ()=>{
      setSavedValue(!savedValue)

      if (savedValue === false){
        data.MyId = UserData.UserId
        data.SavedOrUnSaved = true;
        await SavedPostsAPIs(data).then(() => {}).catch(() => {});
      }else{
        data.MyId = UserData.UserId
        await DeleteSavedPost(data).then(() => {}).catch(() => {});
      }

    }}>

        {savedValue? <i className="bi bi-bookmark-fill"></i> : 'Save'}
    </button>
  );
};




export let SavedBtnApis = ({data, SavedOrUnSaved}) => {

    let { setSavedPostsUpdates } = useContext(SavedPostsContext)
    let [savedValue, setSavedValue] = useState(SavedOrUnSaved)
    let { UserData } = useContext(UserDataContext)
  return (
    <button className="saveBtn btn" 
    
    onClick={ async ()=>{
      setSavedValue(!savedValue)


      if (savedValue === false){
        data.MyId = UserData.UserId
        data.SavedOrUnSaved = true;
        await SavedPostsAPIs(data).then(() => {}).catch(() => {});
      }else{
        data.MyId = UserData.UserId
        await DeleteSavedPost(data).then(() => {}).catch(() => {});
      }
      
        setSavedPostsUpdates(prev => prev.filter((el) => el.PostId !== data.PostId))


    }}>

        {savedValue? <i className="bi bi-bookmark-fill"></i> : 'Save'}
    </button>
  );
};