import React,{useState,useEffect} from 'react'
import { AutoGapSlider } from 'autogapslider'
import 'autogapslider/dist/index.css'
import {imgArrData} from './sliderCardData'
const App = () => {
  
  const settings = {
    autoAdjustGap:true,
    minGapBetweenSlides:20,
    autoMoveSlider:false,
    autoMoveSliderInterval:1000,
    sliderCardWidth:'200px',
    // slidesToScroll:1,
    sliderCardHeight:'300px',
    stopUponHover:true,
  }
  const [agsSettings,setAGSSettings] = useState(settings);
  useEffect(()=>{
    // setTimeout(()=>{
    //   console.log("4 timer")
    //   setAGSSettings((prevState)=>
    //   ({
    //     ...agsSettings,
    //     autoMoveSlider:true,
    //     stopUponHover:false,
    //     autoMoveSliderInterval:2000,
    //     sliderCardWidth:'90vw',
    //     minGapBetweenSlides:0,
    //     slidesToScroll:1,
    //     autoAdjustGap:false,
    //   }))
    // },4000)
    // setTimeout(()=>{
    //   console.log("14 timer")
    //   console.log(agsSettings)
    //   setAGSSettings((prevState)=>
    //     ({
    //       ...prevState,
    //       stopUponHover:true,
    //       autoMoveSliderInterval:500,
    //       sliderCardWidth:'400px',
    //       sliderToScroll:1,
    //     }))
    // },7000)
  },[])
  function onCardClick($event,obj) {
    console.log('Button clicked',$event,obj);
  }
  return <AutoGapSlider onCardClick={onCardClick} settings={agsSettings} imgArrData = {imgArrData} />;
}

export default App
