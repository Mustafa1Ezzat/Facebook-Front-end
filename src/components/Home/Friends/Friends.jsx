import { useState, useEffect, useContext } from "react"
import { FriendsData } from "../../../apis/apis"
import { UserDataContext } from "../../contexts/UserDataContext";
import { AddFollowers, YouFollowSearch, AddFollowing } from "../../../apis/apis";
import { toast } from "sonner";

export let Friends = () => {
    const [FriendsCard, setFriendsCard] = useState([]);
    const [YouFollowSearchValue, setYouFollowSearch] = useState([]);
    let { UserData } = useContext(UserDataContext);

    // randomly arrange the friends data
    function shuffle(array) {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) { return }
        (async () => {
            await FriendsData({ UserId: await UserData.UserId }).then(res => setFriendsCard(shuffle(res)));
            await YouFollowSearch({ UserId: await UserData.UserId }).then(res => setYouFollowSearch(shuffle(res)))
        })()
    }, [UserData])

    let [searchBoxValue, setSearchBoxValue] = useState('')

    // Helper for follow/unfollow logic to avoid duplicate toasts
    const handleFollow = async (e, updateList) => {
        setFriendsCard(FriendsCard.map(item => {
            if (item._id === e._id) {
                return { ...item, Following: !item.Following };
            }
            return item;
        }));
        e.Following = !e.Following;
        let Mydata = {
            _id: UserData.UserId,
            FullName: UserData.FullName,
            Username: UserData.Username,
            OfficialAccount: UserData.OfficialAccount,
        };
        await AddFollowing({ User: e, FollowingData: Mydata, MyId: UserData.UserId });
        await AddFollowers({ User: e, FollowingData: Mydata, MyId: UserData.UserId });
        toast.success(e.Following ? `You Followed ${e.FullName}` : `You Unfollowed ${e.FullName}`);
        if (updateList) updateList();
    };

    return (
        <section className="FriendsPage">
            <section className="LeftFriends">
                <input
                    onChange={(e) => { setSearchBoxValue(e.target.value) }}
                    type="text"
                    className="searchBox"
                    placeholder="Search"
                />
                <hr />

                <section className="searchResult">
                    {FriendsCard
                        .filter(element =>
                            searchBoxValue &&
                            (
                                element.FullName.toLowerCase().includes(searchBoxValue.toLowerCase()) ||
                                element.Username.toLowerCase().includes(searchBoxValue.toLowerCase())
                            )
                        )
                        .map((e, i) => (
                            <div className="FriendsCardSearch" key={i}>
                                <div className="SearchInfo">
                                    <div className="ProfileImgSearch2"></div>
                                    <div>
                                        <h6 style={{ margin: '0px', padding: '0px' }}>{e.FullName}
                                            {e.OfficialAccount === true ? (
                                                <i className="ms-2 bi bi-patch-check-fill gold-gradient"></i>
                                            ) : ''}
                                        </h6>
                                        <p style={{ margin: '0px', padding: '0px', fontSize: '10px' }}>@{e.Username}</p>
                                    </div>
                                </div>
                                <button
                                    className="BtnFollowSearch"
                                    onClick={async () => handleFollow(e)}
                                >
                                    {e.Following
                                        ? <i style={{ fontSize: '25px' }} className="bi bi-check-circle-fill"></i>
                                        : <i style={{ fontSize: '25px' }} className="bi bi-person-fill-add"></i>
                                    }
                                </button>
                            </div>
                        ))
                    }

                    {YouFollowSearchValue
                        .filter(element =>
                            searchBoxValue &&
                            (
                                element.FullName.toLowerCase().includes(searchBoxValue.toLowerCase()) ||
                                element.Username.toLowerCase().includes(searchBoxValue.toLowerCase())
                            )
                        )
                        .map((e, i) => (
                            <div className="FriendsCardSearch" key={i}>
                                <div className="SearchInfo">
                                    <div className="ProfileImgSearch2"></div>
                                    <div>
                                        <h6 style={{ margin: '0px', padding: '0px' }}>{e.FullName}
                                            {e.OfficialAccount === true ? (
                                                <i className="ms-2 bi bi-patch-check-fill gold-gradient"></i>
                                            ) : ''}
                                        </h6>
                                        <p style={{ margin: '0px', padding: '0px', fontSize: '10px' }}>@{e.Username}</p>
                                    </div>
                                </div>
                                <button
                                    className="BtnFollowSearch"
                                    onClick={async () => handleFollow(e)}
                                >
                                    {e.Following
                                        ? <i style={{ fontSize: '25px' }} className="bi bi-check-circle-fill"></i>
                                        : <i style={{ fontSize: '25px' }} className="bi bi-person-fill-add"></i>
                                    }
                                </button>
                            </div>
                        ))
                    }
                </section>
            </section>

            <section className="RightFriends">
                <h5><b>People you may know</b></h5>
                <hr />
                <section className="FriendsCardContainer">
                    {FriendsCard.map((e, i) => (
                        <div className="FriendsCard" key={i}>
                            <div className="FriendsCardImage"></div>
                            <div className="FriendsCardInfo">
                                <div className="FriendsCardImageProfile"></div>
                                <div className="text-center">
                                    <h6 style={{ margin: '0px', padding: '0px' }}>{e.FullName}
                                        {e.OfficialAccount === true ? (
                                            <i className="ms-2 bi bi-patch-check-fill gold-gradient"></i>
                                        ) : ''}
                                    </h6>
                                    <p style={{ margin: '0px', padding: '0px', fontSize: '10px' }}>@{e.Username}</p>
                                </div>
                            </div>
                            <div className="FriendsCardButtons">
                                <button
                                    onClick={async () => handleFollow(e)}
                                    className="BtnFollow"
                                >
                                    {e.Following ? 'Unfollow' : 'Follow'}
                                </button>
                                <button
                                    onClick={() => {
                                        setFriendsCard(FriendsCard.filter((item) => item._id !== e._id))
                                    }}
                                    className="BtnRemove"
                                >Remove</button>
                            </div>
                        </div>
                    ))}
                </section>
            </section>
        </section>
    )
}