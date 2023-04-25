import React from 'react';
import {default as AGS} from './slider.component';

// This works like decorator concept in python.
const SliderPropsValidator  = (Slider) => {
  const defaultSettings = {
    autoAdjustGap: true,
    minGapBetweenSlides: 0,
    autoMoveSlider: false,
    autoMoveSliderInterval: 2000,
    sliderCardHeight: '300px',
    stopUponHover: true,
    moveDuration: 500,
  };
  const filteredProps = (obj)=> {
    // Filters null and undefined props from object ex: {a:'hello',b:null} outputs -> {a:'hello'}, filter outs object like this ex.
    const copy = {...obj};
    return Object.fromEntries(Object.entries(copy).filter((([key,val])=>{
      return val != null;
    })))

  }
  const PropsValidator = (props) => {
    const propsCopy = {...props}
    // Merge user-passed settings with default settings. We are filtering the props before merging because if the user passes a prop with a null or undefined value, it will override the default value of the same prop. By filtering the props, we ensure that the default value is used if the user doesn't pass a value or passes an invalid value.
    // Filtering props is necessary here else ,for ex, if use passed prop is like {autoMoveSliderInterval: null} and default value for it is like
    // { autoMoveSliderInterval: 2000} instead of passing 2000 it will pass null ,hence filtering is necessary.
    const settings  = {...defaultSettings,...filteredProps(propsCopy.settings)};
    // const mergedSettings = { ...defaultSettings, ...settings };
    if(settings?.carouselMode){
      settings.autoAdjustGap= false;
      settings.minGapBetweenSlides = 0;
      settings.sliderCardWidth = '100%'; 
    }
    propsCopy.settings = settings;
    // let slidesToScroll = settings?.slidesToScroll 
    // const [sliderCardWidth,setSliderCardWidth] = useState(0);
    // const translateDuration = settings?.moveDuration ?? 500
    console.log(propsCopy);
    return <Slider {...propsCopy}  />;
  };

  return PropsValidator;
};

export default SliderPropsValidator(AGS);