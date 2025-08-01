import { useRef, useState } from "react"
import { Toaster, toast } from 'sonner'

// Apis
import { CreateNewAccount, CheckAndGenerateToken } from "../../apis/apis.js"



export let LogInPage = ({setHideLoginPage})=>{

    // sign up states
    let [FullName, setFullName] =    useState('');
    let [UserName, setUserName] =    useState('');

    let [Email, setEmail] =          useState('');
    let [Password,   setPassword] =  useState('');




    // log in states
    let [LoginEmail, setLoginEmail] =  useState('');
    let [LoginPassword,   setLoginPassword] =  useState('');


    // useRef
    let nameRef = useRef('');
    let usernameRef = useRef('');
    let emailRef = useRef('');
    let PassRef = useRef('');

    


    let [PageValue, setPageValue] = useState(true)

    let SignUp = ()=>{
        return(
            <>
                <form 
                 onClick={(e)=>{e.preventDefault()}}
                 className="Form">
                <div className="FormHeader">
                    <h4>Create a new account</h4>
                    <p>It's quick and easy.</p>
                </div>

            <div className="input-group mb-3">
              <span className="input-group-text">/</span>
              <input ref={nameRef} onChange={(e)=>{setFullName(e.target.value)}} type="text" className="form-control UserName" placeholder="Full name"/>

                  <span className="input-group-text">@</span>
                  <input ref={usernameRef} onChange={(e)=>{setUserName(e.target.value)}}type="text" className="form-control UserName" placeholder="Username"/>
            </div>

            <div className="input-group mb-3">
                <input ref={emailRef} onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control UserName" placeholder="Email address"/>
                <span className="input-group-text">@Email</span>
            </div>

            <div className="input-group mb-3">
                <input ref={PassRef} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control UserName" placeholder="New password"/>
                <span className="input-group-text"><b>***...</b></span>
            </div>

            <button onClick={async ()=>{
                            if(FullName != '' && UserName != '' && Email != '' && Password != ''){
                                
                                    await CreateNewAccount({
                                        "FullName": FullName,
                                        "Username": UserName,
                                        "Email":    Email,
                                        "Password": Password,
                                        "Reels": [],
                                        "Posts": [],
                                        "Following": [],
                                        "Followers": [],
                                        "OfficialAccount": false
                                    })
                                    
                                    .then(()=>{

                                            toast.success(() => (  <p style={{ padding: "0px", margin: "0px" }}>  
                                                        <b>Account</b> created successfully.   </p> ));
                                            // clear input
                                            nameRef.current.value='';
                                            usernameRef.current.value='';
                                            emailRef.current.value='';
                                            PassRef.current.value=''

                                            setTimeout(()=>{
                                                window.location.reload()
                                            }, 1500)

                                    })
                                
                                    .catch(()=>{
                                            toast.error(() => ( <p style={{padding:'0px', margin:'0px'}}>  
                                            <b>Failed</b>  The email you have provided is already associated with an account. </p>)); 
                                    })
                                
                            } else {
                                toast.error(() => (
                                    <p style={{padding:'0px', margin:'0px'}}>
                                        <b>Please</b> do not leave any field empty.
                                    </p>
                                ));
                            }
                        }}
            
            className="btn w-75"> Create account </button>
            <button onClick={()=>{setPageValue(!PageValue)}}  className="ToLogIn">Already have an account?</button>

        </form>
            </>
        )
    }



    
    let LogIn = ()=>{
        return(
            <>
                <form onClick={(e)=>{ e.preventDefault()} } className="Form">
                <div className="FormHeader">
                    <h4>Log in to Facebook
                    </h4>
                    <p>it's free and always will be.</p>
                </div>

                    <div className="input-group mb-3">
                        <input required onChange={(e)=>{
                            setLoginEmail(e.target.value)
                            

                        }}   type="email" className="form-control UserName" placeholder="Email address"/>
                        <span className="input-group-text">@Email</span>
                    </div>

                    <div className="input-group mb-3">
                        <input required onChange={(e)=>{
                                setLoginPassword(e.target.value)
                                

                        }}   type="password" className="form-control UserName" placeholder="Password"/>
                        <span className="input-group-text"><b>***...</b></span>
                    </div>
                         <button className="btn w-100" onClick={async ()=>{


                                if(LoginEmail !== ''&& LoginPassword !== ''){
                                    let data = {
                                        Email: LoginEmail,
                                        Password: LoginPassword
                                    };

                                    await CheckAndGenerateToken(data).then((res)=>{
                                        localStorage.setItem('token', res)
                                        toast.success(<p style={{padding:'0px', margin:'0px'}}><b>Congrats!</b> Login successfully.</p>)
                                        setTimeout(()=>{
                                            window.location.reload()
                                            setHideLoginPage("false")
                                        }, 1500)

                                    }).catch(()=>{
                                        toast.error(<p style={{padding:'0px', margin:'0px'}}><b>Failed!</b> invalid Password or Email.</p>)
                                    })
                                }


                                
                            


                         }} > Log in </button>

                    <button onClick={()=>{setPageValue(!PageValue)}} className="ToLogIn">Create a new account </button>            
                
                </form> 
            </>
        )
    }


    let LoginAndSingup = ()=>{
        return PageValue? LogIn() : SignUp();
    }


    return(
        <>
            <section className="HomeLogIn">
                <section className="LogoAndBrandName">
                    <div className="BrandAndSlong">
                        <h1>Facebook</h1>
                        <p>Facebook helps you connect and share with the people in your life.</p>
                    </div>
                </section>

                <section className="FormLogIn">
                    {LoginAndSingup()}
                </section>
            </section>
        </>
    )
}