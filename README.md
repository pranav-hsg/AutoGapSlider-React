# Autogapslider

**A zero-dependency, mobile-responsive React slider which gives gap automatically between slides according to the viewport.**


[![NPM](https://img.shields.io/npm/v/autogapslider.svg)](https://www.npmjs.com/package/autogapslider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Description

AutoGapSlider is a React component that displays a horizontal slider with a fixed width for each card. The component calculates how many cards can fit in a given viewport width and automatically gives gaps between the cards by giving margins. This ensures that no partial cards are displayed in the viewport and that the cards are evenly spaced out.


## Purpose

AutoGapSlider is designed to make it easy for React developers to create a horizontal slider that automatically adjusts the spacing between cards to fit the viewport. This is especially useful when displaying a large number of cards, as it ensures that all the cards are properly fitted to the viewport with no partial displays, eliminating the need to adjust card width.

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
  function onCardClick($event,obj) {
    console.log('Click event',$event,obj);
  }
  return <AutoGapSlider onCardClick={onCardClick} settings={settings} imgArrData = {imgArrData} />;
}

export default App
```
## Card data

The imgArrData array must be defined and passed as a prop to the Autogapslider component. This array contains the path of card image to render, along with an optional caption property for each image. Here's an example of how to create the imgArrData array:

 Example: create file sliderCardData.js 
 ```
const imgArrData = [
   {
       'src':'https://picsum.photos/300/300',
       'id':1,
       'caption': 'Beautiful landscape'
   },
   {
       'src':'https://picsum.photos/300/400',
       'id':2,
       'caption': 'Cute animal'
   },
   {
       'src':'https://picsum.photos/300/500',
       'id':3,
       // No caption provided for this image
   },
   // Add more image objects here
];
```
> Note: Please note that the Autogapslider component is designed to display a horizontal slider with a fixed width for each card. If the number of cards in your imgArrData array is low or insufficient, the slider may not display correctly and the cards may behave erratically. To avoid this, please make sure you have enough cards in the imgArrData array to fill the width of the slider, or increase the card width using the sliderCardWidth prop. This will ensure that the slider displays correctly and the cards are displayed side by side.

## Slider View
![image](https://user-images.githubusercontent.com/65011770/125191551-a8b36900-e260-11eb-96c3-84be84f7dba9.png)

### Also supports captions.
![image](https://user-images.githubusercontent.com/65011770/232329200-b5cfb578-4b8d-43ce-bf48-ec9549c0423f.png)


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
