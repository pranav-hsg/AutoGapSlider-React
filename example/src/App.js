import React from 'react'
import { AutoGapSlider } from 'autogapslider' //importing AutoGapSlider component from autogapslider library
import 'autogapslider/dist/index.css' //importing CSS for AutoGapSlider component
import {imgArrData,settings as agsSettings} from './sliderCardData' //importing image data and settings object from sliderCardData.js file

const App = () => {
  function onCardClick($event,obj) { //function to handle the click event on a card
    console.log('Button clicked',$event,obj); //log the click event and card object to the console
  }
  
  return (
    //Render the AutoGapSlider component with necessary props
    <AutoGapSlider 
      onCardClick={onCardClick} //passing the onCardClick function as a prop
      settings={agsSettings} //passing the settings object as a prop
      imgArrData={imgArrData} //passing the image data array as a prop
    />
  );
}

export default App //exporting the App component





  // const [agsSettings,setAGSSettings] = useState(settings);
  // useEffect(()=>{
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
  // },[])