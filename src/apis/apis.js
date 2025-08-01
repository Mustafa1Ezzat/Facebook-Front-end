

// create new user
export let CreateNewAccount = async (data) => {
                    let req = await fetch('http://localhost:4000/Register/SignUp', 
                        {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: { "Content-Type": "application/json" }
                        });

            if(!req.ok){throw new Error}
            
    return await req.text();  
} 


// Check And Generate Token
export let CheckAndGenerateToken = async(data)=>{
    let req = await fetch('http://localhost:4000/Register/CheckAndGenerateToken',
        {
            method:'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }
    )

         if(!req.ok){throw new Error};

    return await req.text()
}



export let LoginValidations = async (token)=>{
    let res = await fetch('http://localhost:4000/Register/LoginValidations', {
        headers : {'authorization' : `bearer ${token}`}
    })

    if(!res.ok){ throw new Error }

    return await res.json()
}





// Create New Reel
export let CreateNewReel = async (data) => {
    let req = await fetch('http://localhost:4000/Reels/CreateReels', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    });

    if (!req.ok) { throw new Error }

    return await req.text();
}


export let GetReels = async (token)=>{
    let res = await fetch('http://localhost:4000/Reels/GetReels', {
        headers : {'authorization' : `bearer ${token}`}
    })

    if(!res.ok){ throw new Error }

    return await res.json()
}













// Create New Post
export let CreateNewPost = async(data)=>{
    let req = await fetch('http://localhost:4000/Post/CreatePost', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    });

    if (!req.ok) { throw new Error }

    return await req.text();
}


// get all users posts

export let GetAllUsersPosts = async ()=>{
    let res = await fetch('http://localhost:4000/Post/GetAllUsersPosts');

        if(!res.ok){ throw new Error }

    return await res.json()
}


// get all users reels

export let GetAllReels = async ()=>{
    try {
        let res = await fetch('http://localhost:4000/Reels/GetAllUserReels');
        if(!res.ok){throw new Error}
        return await res.json()
    } catch (error) {
        console.log(error)
    }
}




//  Delete Old Reels

export let DeleteOldReels = async ()=>{
    try {
        let Del = await fetch('http://localhost:4000/Reels/DeleteOldReels', {
        method:'DELETE',
        headers: { "Content-Type": "application/json" }
         })

         if(!Del.ok){ throw new Error }

         return await Del.text()
    } catch (error) {
        console.log(error)
    }
}











//  let user delete reels

export let DelOneReel = async (data)=>{
    let res = await fetch('http://localhost:4000/Reels/DelOneReel', {
        method:'DELETE',
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify(data)
    })

    if(!res.ok) {throw new Error}

    return await res.text()
}




// let user delete post
export let DelOnePost = async(data)=>{
    let res = await fetch('http://localhost:4000/Post/DelOnePost', {
        method:'DELETE',
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify(data)
    })

    if(!res.ok){throw new Error}

    return await res.text()
}







// savedLikes Api

export let LikeAndDislike = async (data)=>{
    let res = await fetch('http://localhost:4000/Likes/SaveLikes', {
        method:'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })

    if(!res.ok){ throw new Error('Failed to save Like')}

    return await res.text()
}


export let Dislike = async (data)=>{
    let res = await fetch('http://localhost:4000/Likes/Dislike', {
        method:'DELETE',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })

    if(!res.ok){ throw new Error('Failed to save Like')}

    return await res.text()
}

export let GetMyLikes = async ()=>{
    let res = await fetch(`http://localhost:4000/Likes/GetMyLikes`);
        if(!res.ok){throw new Error}

        return await res.json()
}














// comments

export let CreateComment = async (data)=>{
    let res = fetch('http://localhost:4000/Comment/SaveComment', {
        method:'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })

    if (!res.ok){ throw new Error}

        return (await res).json()
}


export let DeleteComment = async (ID)=>{
    let res = fetch('http://localhost:4000/Comment/deleteComment', {
        method:'DELETE',
        body: JSON.stringify(ID),
        headers: { "Content-Type": "application/json" }
    })

        if (!res.ok){ throw new Error}

        return (await res).text()
}


export let deleteAllCommentAfterDeletePost = async (PostId)=>{
    let res = fetch('http://localhost:4000/Comment/deleteAllCommentAfterDeletePost', {
        method:'DELETE',
        body: JSON.stringify(PostId),
        headers: { "Content-Type": "application/json" }
    })

        if (!res.ok){ throw new Error}

        return (await res).text()
}


export let ShowComment = async(POSTID)=>{
    let res = await fetch('http://localhost:4000/Comment/ShowComment', {
        method: 'POST',
        body: JSON.stringify(POSTID),
        headers: { "Content-Type": "application/json" }
    })

            if (!res.ok){ throw new Error}

        return (await res).json()
}





// save post

export let SavedPostsAPIs = async (data)=>{
    let res = await fetch('http://localhost:4000/Saved/SavedPosts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })

            if (!res.ok){ throw new Error}

        return (await res).text()
}



export let DeleteSavedPost = async (data)=>{
    let res = await fetch('http://localhost:4000/Saved/DeleteSavedPost', {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })

            if (!res.ok){ throw new Error}

        return (await res).text()
}


export let GetAllSavedPosts = async(data)=>{
     let res = await fetch('http://localhost:4000/Saved/GetAllSavedPosts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })

            if (!res.ok){ throw new Error}

        return (await res).json()
}


















// profileInfo

export let ProfileData = async(data)=>{
    let req = await fetch('http://localhost:4000/Profile/UpdateProfile', {
        method:'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })

    if(!req.ok){throw new Error}

    return await req.text()
}


export let GetInfo = async(data)=>{
    let req = await fetch('http://localhost:4000/Profile/GetProfileInfo', {
        method:'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })

    if(!req.ok){throw new Error}

    return await req.json()
}






export let FriendsData = async(data)=>{
    let res = await fetch('http://localhost:4000/Friends/getFriends', {
        method:'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    });
    if(!res.ok){ throw new Error('Failed to get friends') } 

    return await res.json();
}



export let AddFollowers = async(data)=>{
    let res = await fetch('http://localhost:4000/Friends/AddFollowers', {
        method:'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    });
    if(!res.ok){ throw new Error('Failed to get friends') } 

    return await res.json();
}


export let AddFollowing = async(data)=>{
    let res = await fetch('http://localhost:4000/Friends/AddFollowing', {
        method:'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    });
    if(!res.ok){ throw new Error('Failed to get friends') } 

    return await res.json();
}



export let YouFollowSearch = async(data)=>{
    let res = await fetch('http://localhost:4000/Friends/YouFollowSearch', {
        method:'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    });
    if(!res.ok){ throw new Error('Failed to get YouFollowSearch') } 

    return await res.json();
}



export let GetFollowers = async(data)=>{
    let res = await fetch('http://localhost:4000/Friends/getFollowing', {
        method:'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    });
    if(!res.ok){ throw new Error('Failed to get followers') } 

    return await res.json();
}















// notification

export let AddNotifications = async (data)=>{
       let res = await fetch('http://localhost:4000/Notifications/addNotifications', {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    
        if(!res.ok){ throw new Error('Failed to add notifications') } 
    
        return await res.text();    
}



export let DeleteNotifications = async (data)=>{
    let res = await fetch('http://localhost:4000/Notifications/deleteNotification', {
        method:'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if(!res.ok){ throw new Error('Failed to delete notifications') } 

    return await res.text();
}