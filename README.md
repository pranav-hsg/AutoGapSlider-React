# Autogapslider

**React slider which gives gap automatically between slides according to the viewport.**

[![NPM](https://img.shields.io/npm/v/autogapslider.svg)](https://www.npmjs.com/package/autogapslider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save autogapslider
```

## Usage

```jsx
import React from 'react'

import { AutoGapSlider } from 'autogapslider'
import 'autogapslider/dist/index.css'
import {imgArrData} from './sliderCardData'
const App = () => {
  const settings = {
    autoAdjustGap:true,
    minGapBetweenSlides:20,
    autoMoveSlider:true,
    autoMoveSliderInterval:1000,
    slidesToScroll:5,
    sliderCardWidth:'200px',
    sliderCardHeight:'300px',
    stopUponHover:true,
  }
  return <AutoGapSlider settings={settings} imgArrData = {imgArrData} />;
}

export default App
```
## Card data

imgArrData must be defined and passed as a prop to Autogapslider. 'imgArrData' contains the path of card image to render,
 Example: create file sliderCardData.js 
 ```
 const imgArrData = [
    {
        'src':'https://picsum.photos/300/300',
        id:1,
    },
    {
        'src':' https://picsum.photos/300/400',
         id:2,
    },
    {
      ...
    },
    ...
 ]
```
> Note: Please provide more than 14 images or increase the card width using the ‘sliderCardWidth’ prop so that slider can be scrolled horizontally.

## Slider View
![image](https://user-images.githubusercontent.com/65011770/125191551-a8b36900-e260-11eb-96c3-84be84f7dba9.png)

## Auto adjust gap demo 
![Animation](https://user-images.githubusercontent.com/65011770/143224959-a97af1db-299b-413c-94b2-d84405dfa480.gif)

## Configuration

### Settings
You can provide optional settings to change default behavior of slider.
Name | Type | Default Value | Description
---  | --- | --- | --- 
autoAdjustGap | boolean | true | Feature which centers cards by distributing margin between slider cards.
minGapBetweenSlides | number | 0 | Minimum gap between each slider cards.
autoMoveSlider | boolean | false | Moves slider automatically with time.
autoMoveSliderInterval | number | 2000 | Milli-seconds after which slider moves next.
slidesToScroll | number | entire-viewport | Number of slides to scroll when clicked on next/prev button.
sliderCardWidth | string | '200px' | Each slider card width.
sliderCardHeight | string | '300px' | Each slider card height.
stopUponHover | boolean | true | When autoMoveSlider is true and if user hovers on slider , auto move stops.

## Demo

[Click here](https://pranav-medit.github.io/autogapslider-ex/)


## License

MIT © [Pranav](https://github.com/Pranav)
