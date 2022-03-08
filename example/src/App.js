import React from 'react'

import { AutoGapSlider } from 'autogapslider'
import 'autogapslider/dist/index.css'
import {imgArrData} from './sliderCardData'
const App = () => {
  const settings = {
    autoAdjustGap:true,
    minGapBetweenSlides:20,
    autoMoveSlider:false,
    autoMoveSliderInterval:4000,
    sliderToScroll:5,
  }
  return <AutoGapSlider settings={settings} imgArrData = {imgArrData} />;
}

export default App
