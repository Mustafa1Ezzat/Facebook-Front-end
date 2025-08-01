import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";
import { toast } from 'sonner'


// import Components
import { Posts } from "../Utils/Posts"
import { MyPostsInProfile } from "../Utils/PostsBody"
import { SavedPost } from "../Utils/PostsBody"
import { YouFollowSearch } from "../../../apis/apis";

import { FollowingModal, FollowersModal } from "../Utils/PopupModal";

// import APIs
import { ProfileData, GetFollowers } from "../../../apis/apis";

export let Profile = () => {
    let { UserData } = useContext(UserDataContext);
    let [FollowingNumbers, setFollowingNumbers] = useState([]);
    let [FollowingList, setFollowingList] = useState([]);


    useEffect(()=>{
        if(!localStorage.getItem('token')){return}
            (async()=>{
                await YouFollowSearch({ UserId: UserData.UserId }).then(res=> setFollowingNumbers(res))
                await GetFollowers({ UserId: UserData.UserId }).then(res => setFollowingList(res))
            })()
        }, [UserData])


    // States for each profile field, initialized from UserData.ProfileInfo
    let [Categories, setCategories] = useState('');
    let [AddSecondarySchool, setAddSecondarySchool] = useState('');
    let [AddUniversity, setAddUniversity] = useState('');
    let [HomeTown, setHomeTown] = useState('');
    let [CurrentCity, setCurrentCity] = useState('');
    let [Relationship, setRelationship] = useState('');
    let [Phone, setPhone] = useState('');
    let [SocialLink, setSocialLink] = useState('');
    let [BioTxt, setBioTxt] = useState('');

      let [FollowingOpen, setFollowingOpen] = useState(false)
      let [FollowersOpen, setFollowersOpen] = useState(false)


    // For edit mode
    let [AllowEdit, setAllowEdit] = useState(true);
    let [EditBtn, setEditBtn] = useState('Edit Profile');

    // Initialize states from UserData.ProfileInfo
    useEffect(() => {
        const info = UserData.ProfileInfo || {};
        setCategories(info.Categories || '');
        setAddSecondarySchool(info.AddSecondarySchool || '');
        setAddUniversity(info.AddUniversity || '');
        setHomeTown(info.HomeTown || '');
        setCurrentCity(info.CurrentCity || '');
        setRelationship(info.Relationship || '');
        setPhone(info.Phone || '');
        setSocialLink(info.SocialLink || '');
        setBioTxt(info.BioTxt || '');
    }, [UserData]);

    // Save handler
    const handleSave = async () => {
        let ProfileInfo = {
            "ID": UserData.UserId,
            "Categories": Categories,
            "AddSecondarySchool": AddSecondarySchool,
            "AddUniversity": AddUniversity,
            "HomeTown": HomeTown,
            "CurrentCity": CurrentCity,
            "Relationship": Relationship,
            "Phone": Phone,
            "SocialLink": SocialLink,
            "BioTxt": BioTxt
        };
        await ProfileData(ProfileInfo);
        toast.success(() => (
            <p style={{ padding: "0px", margin: "0px" }}>
                <b>Profile updated!</b>
            </p>
        ));
    };

    const handleSetBioTxt = async () => {
        let ProfileInfo = {
            "ID": UserData.UserId,
            "Categories": Categories,
            "AddSecondarySchool": AddSecondarySchool,
            "AddUniversity": AddUniversity,
            "HomeTown": HomeTown,
            "CurrentCity": CurrentCity,
            "Relationship": Relationship,
            "Phone": Phone,
            "SocialLink": SocialLink,
            "BioTxt": BioTxt
        };
        await ProfileData(ProfileInfo);
        toast.success(() => (
            <p style={{ padding: "0px", margin: "0px" }}>
                <b>Bio updated!</b>
            </p>
        ));
    };

    // Style for inputs and textarea based on AllowEdit
    const inputStyle = {
        background: AllowEdit ? "transparent" : "var(--BtnEdit) !important",
        transition: "background 0.2s"
    };








    














    return (
        <section className="ProfileContainer">
            <section className="ProfileRight">
                <section className="profileSection">
                    <section className="profileHeader">
                        <section className="profileCover">
                            <section className="profilePicture"></section>
                        </section>

                        <section className="profileData">
                            <h4>
                                <b>{UserData.FullName}</b>
                                {UserData.OfficialAccount === true ? (
                                    <i className="ms-2 bi bi-patch-check-fill gold-gradient" style={{ fontSize: '20px' }}></i>
                                ) : (
                                    ''
                                )}
                            </h4>
                                <p className="mb-2" style={{ fontSize: '12px', marginTop:'-10px' }}>@{UserData.Username}</p>
                            <textarea
                                value={BioTxt}
                                onBlur={handleSetBioTxt}
                                onChange={e => setBioTxt(e.target.value)}
                                maxLength={101}
                                className="profileBio"
                                placeholder="Your bio!"
                                disabled={AllowEdit}
                                
                            />

                            <section className="profileBtn">

                                <button onClick={()=>{setFollowingOpen(true)}} className="btn btn-primary">Following ({FollowingNumbers.length})</button>
                                    {/*  ********************Following MODAL******************** */}
                                        <FollowingModal open={FollowingOpen} onClose={() => setFollowingOpen(false)}>
                                            <h6 className="text-center">Following List ({FollowingNumbers.length})</h6>
                                            <hr />

                                           
                                            {FollowingNumbers.map((e, i)=>{
                                                return (
                                                    <div key={i} className="FollowingListUsers">
                                                        <div className="FollowingIMG" />
                                                        <div className="FollowingUserInfo">

                                                            <h6 style={{margin:'0', padding:'0'}}>{e.FullName}
                                                                {e.OfficialAccount === true ? (
                                                                    <i className="ms-2 bi bi-patch-check-fill gold-gradient"></i>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </h6>
                                                            
                                                            <p style={{fontSize:'10px', margin:'0', padding:'0'}}>@{e.Username}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                        </FollowingModal>



                                

                                <button className="btn btn-primary" onClick={()=>{setFollowersOpen(true)}}>Followers ({FollowingList.length})</button>
                                    {/*  ********************Followers MODAL******************** */}
                                        <FollowersModal open={FollowersOpen} onClose={() => setFollowersOpen(false)}>
                                            <h6 className="text-center">Followers List ({FollowingList.length})</h6>
                                            <hr />

                                           
                                            {FollowingList.map((e, i)=>{
                                                return (
                                                    <div key={i} className="FollowingListUsers">
                                                        <div className="FollowingIMG" />
                                                        <div className="FollowingUserInfo">

                                                            <h6 style={{margin:'0', padding:'0'}}>{e.FullName}
                                                                {e.OfficialAccount === true ? (
                                                                    <i className="ms-2 bi bi-patch-check-fill gold-gradient"></i>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </h6>
                                                            
                                                            <p style={{fontSize:'10px', margin:'0', padding:'0'}}>@{e.Username}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                        </FollowersModal>


                                <button
                                    onClick={async () => {
                                        setAllowEdit(!AllowEdit);
                                        if (AllowEdit) {
                                            setEditBtn('Save');
                                        } else {
                                            setEditBtn('Edit Profile');
                                            await handleSave();
                                        }
                                    }}
                                    className="btn btn-secondary"
                                >
                                    {EditBtn}
                                </button>


                                <button
                                    onClick={() => {
                                        let path = `http://localhost:3000/${UserData.Username}`;
                                        navigator.clipboard.writeText(path)
                                            .then(() => {
                                                toast.success(() => (
                                                    <p style={{ padding: "0px", margin: "0px" }}>
                                                        <b>User link</b> copied to clipboard!
                                                    </p>
                                                ));
                                            })
                                            .catch(err => {
                                                console.error('Failed to copy: ', err);
                                            });
                                    }}
                                    className="btn btn-secondary"
                                >
                                    <b><i className="bi bi-link"></i></b>
                                </button>
                            </section>

                            <hr />

                            <section className="profileInfo">
                                <div className="profileInfoItem">
                                    <i className="bi bi-info-circle-fill"></i>
                                    <input
                                        value={Categories}
                                        onChange={e => setCategories(e.target.value)}
                                        disabled={AllowEdit}
                                        type="text"
                                        placeholder="Categories"
                                        style={inputStyle}
                                    />
                                </div>

                                <div className="profileInfoItem">
                                    <i className="bi bi-mortarboard-fill"></i>
                                    <input
                                        value={AddSecondarySchool}
                                        onChange={e => setAddSecondarySchool(e.target.value)}
                                        disabled={AllowEdit}
                                        type="text"
                                        placeholder="Add secondary school"
                                        style={inputStyle}
                                    />
                                </div>

                                <div className="profileInfoItem">
                                    <i className="bi bi-mortarboard-fill"></i>
                                    <input
                                        value={AddUniversity}
                                        onChange={e => setAddUniversity(e.target.value)}
                                        disabled={AllowEdit}
                                        type="text"
                                        placeholder="Add university"
                                        style={inputStyle}
                                    />
                                </div>

                                <div className="profileInfoItem">
                                    <i className="bi bi-house-fill"></i>
                                    <input
                                        value={HomeTown}
                                        onChange={e => setHomeTown(e.target.value)}
                                        disabled={AllowEdit}
                                        type="text"
                                        placeholder="Home Town"
                                        style={inputStyle}
                                    />
                                </div>

                                <div className="profileInfoItem">
                                    <i className="bi bi-geo-alt-fill"></i>
                                    <input
                                        value={CurrentCity}
                                        onChange={e => setCurrentCity(e.target.value)}
                                        disabled={AllowEdit}
                                        type="text"
                                        placeholder="Current city"
                                        style={inputStyle}
                                    />
                                </div>

                                <div className="profileInfoItem">
                                    <i className="bi bi-heart-fill"></i>
                                    <input
                                        value={Relationship}
                                        onChange={e => setRelationship(e.target.value)}
                                        disabled={AllowEdit}
                                        type="text"
                                        placeholder="Relationship"
                                        style={inputStyle}
                                    />
                                </div>

                                <div className="profileInfoItem">
                                    <i className="bi bi-telephone-fill"></i>
                                    <input
                                        value={Phone}
                                        onChange={e => setPhone(e.target.value)}
                                        disabled={AllowEdit}
                                        type="text"
                                        placeholder="+20 xxxxxxxxxx"
                                        style={inputStyle}
                                    />
                                </div>

                                <div className="profileInfoItem">
                                    <i className="bi bi-globe2"></i>
                                    <input
                                        value={SocialLink}
                                        onChange={e => setSocialLink(e.target.value)}
                                        disabled={AllowEdit}
                                        type="text"
                                        placeholder="Social link"
                                        style={inputStyle}
                                    />
                                </div>
                            </section>
                        </section>
                    </section>
                </section>
            </section>

            <section className="ProfileCenter">
                <section className="CreatePost">
                    <Posts/>
                </section>
                
                <section className="FeedsInProfile mt-2">
                    <MyPostsInProfile/>
                </section>
            </section>

            <section className="ProfileLeft">
                {/* <SavedPost/> */}
            </section>
        </section>
    );
};