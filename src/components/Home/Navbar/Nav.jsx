import FacebookLogo from '../../../assets/facebook.svg';
import { useNavigate } from 'react-router'; 
import { useState, useContext } from 'react';
import { AlignmentContext } from '../../contexts/AlignmentContext';

// import components
import { MainIcons } from './MainIcons';



// import MUI Components
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton() {

  let {alignment, setAlignment} = useContext(AlignmentContext)
  let Navigate = useNavigate();


  

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      aria-label="Platform"
      className='NavIcons'
    >
      
      <ToggleButton onClick={(e)=>{setAlignment(e.target.value); Navigate("/")}}       style={{fontSize:'20px', color:`${alignment==='home'? 'var(--LogoColor)' : 'var(--TxtColor)'}`}}  className='TogglesBtn bi bi-house-fill' value="home"></ToggleButton>
      <ToggleButton onClick={(e)=>{setAlignment(e.target.value); Navigate("/Friends")}} style={{fontSize:'20px', color:`${alignment==='add'? 'var(--LogoColor)' : 'var(--TxtColor)'}`}}  className='TogglesBtn bi bi-people-fill' value="add"></ToggleButton>
      <ToggleButton onClick={(e)=>{setAlignment(e.target.value); Navigate("/Videos")}} style={{fontSize:'20px', color:`${alignment==='video'? 'var(--LogoColor)' : 'var(--TxtColor)'}`}}  className='TogglesBtn bi bi-tv-fill' value="video"></ToggleButton>
      <ToggleButton onClick={(e)=>{setAlignment(e.target.value); Navigate("/Saved")}} style={{fontSize:'20px', color:`${alignment==='save'? 'var(--LogoColor)' : 'var(--TxtColor)'}`}}  className='TogglesBtn bi bi-bookmark-fill' value="save"></ToggleButton>
      <ToggleButton onClick={(e)=>{setAlignment(e.target.value); Navigate("/Profile")}} style={{fontSize:'20px', color:`${alignment==='profile'? 'var(--LogoColor)' : 'var(--TxtColor)'}`}}  className='TogglesBtn bi bi-person-circle' value="profile"></ToggleButton>
    </ToggleButtonGroup>
  );
}




export let Nav = ()=>{

  let [ModeValue, setNightValue] = useState('bi bi-moon-stars-fill');
  let {setAlignment} = useContext(AlignmentContext)
  let Navigate = useNavigate();

          let ChangeMode = ()=>{
            return (
              <button className={`${ModeValue} ChangeMode`} onClick={()=>{
                if(ModeValue === 'bi bi-moon-stars-fill'){
                  setNightValue('bi bi-sun-fill')
                }else{
                  setNightValue('bi bi-moon-stars-fill')
                }
              }}>

              </button>
            )
          }

    return (<>
        <section className="Nav">

            <section className='LeftPart'>

                 <img className='FacebookLogo' src={FacebookLogo} alt='Facebook Logo'></img>
                 <h5><b>Facebook</b></h5>

            </section>

                         <section>
                                {ColorToggleButton()}
                         </section>

                                  <section className='RightPart'>
                                    {ChangeMode()}
                                    <MainIcons setAlignment={setAlignment} />
                                  </section>

        </section>    
    </>)
}