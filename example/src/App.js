import React,{useState} from 'react'
import { AutoGapSlider } from 'autogapslider' //importing AutoGapSlider component from autogapslider library
import 'autogapslider/dist/index.css' //importing CSS for AutoGapSlider component
import {imgArrData,settings as agsSettings} from './sliderCardData' //importing image data and settings object from sliderCardData.js file
import DynamicFormElement from './components/dynamic-form-element.component' 
import image1 from './assets/static/per1.jpg'
const App = () => {
  function onCardClick($event,obj) { //function to handle the click event on a card
    console.log('Button clicked',$event,obj); //log the click event and card object to the console
  }
  const dynamicForm = [
    {
      "id": null,
      "element": "autoAdjustGap",
      "type": "boolean",
      "defaultValue": true
    },
    {
      "id": null,
      "element": "defaultImageLoader",
      "type": "boolean",
      "defaultValue": true
    },
    {
      "id": null,
      "element": "stopUponHover",
      "type": "boolean",
      "defaultValue": true
    },
    {
      "id": null,
      "element": "autoMoveSlider",
      "type": "boolean",
      "defaultValue": false
    },
    {
      "id": null,
      "element": "minGapBetweenSlides",
      "type": "number",
      "defaultValue": 20
    },
    {
      "id": null,
      "element": "sliderCardHeight",
      "type": "string",
      "defaultValue": "300px"
    },
    {
      "id": null,
      "element": "autoMoveSliderInterval",
      "type": "number",
      "defaultValue": 1000
    },
    {
      "id": null,
      "element": "sliderCardWidth",
      "type": "string",
      "defaultValue": "200px"
    },
    {
      "id": null,
      "element": "slidesToScroll",
      "type": "number",
      "defaultValue": null
    },
  ]
  const [agsSettings2,updateAgs]=useState({
      autoAdjustGap:true,
      minGapBetweenSlides:20,
  })
  const agsSettings3={
    autoAdjustGap:true,
    minGapBetweenSlides:20,
}
  const [settings,updateSettings] = useState({"autoAdjustGap":true,"stopUponHover":true,"autoMoveSlider":false,"minGapBetweenSlides":20,"sliderCardHeight":"300px","autoMoveSliderInterval":1000,"sliderCardWidth":"200px"});
  const onValueChange = (e) =>{
    const copy = {...e}
    updateSettings(copy)
  }
  return (
    // Render the AutoGapSlider component with necessary props
    <>
    
    <AutoGapSlider 
      onCardClick={onCardClick} //passing the onCardClick function as a prop
     
      settings={settings} //passing the settings object as a prop
      imgArrData={imgArrData} //passing the image data array as a prop
    />
    <DynamicFormElement elementSettings={dynamicForm}  onValueChange={onValueChange}></DynamicFormElement>
    </>
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