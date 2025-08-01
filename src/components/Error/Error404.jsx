export let Error404 = ()=>{
    return (
    
        <section className="text-center" 

                 style={{height:'100vh', 
                 display:'flex', 
                 justifyContent:'center', 
                 alignItems:'center', 
                 flexDirection:'column', 
                 backgroundColor: 'var(--PriColor)',
                 cursor:'default',
                 marginTop:'-50px'
                 
        }}>


                <h1 style={{fontSize:'200px', color:'var(--BorderColor) !important'}}><b>404</b></h1>
                <h1 style={{fontSize:'30px',  color:'var(--BorderColor) !important'}}><b>Oops! Page not found</b></h1>
                <h1 style={{fontSize:'15px',  color:'var(--BorderColor) !important'}}><b>The page you're looking for doesn't exist or has been moved.</b></h1>
        </section>
       
    )
}