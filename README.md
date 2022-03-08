# Autogapslider

> React slider which gives gap automatically between slides according to viewport.

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
    autoMoveSlider:false,
    autoMoveSliderInterval:4000,
    sliderToScroll:5,
  }
  return <AutoGapSlider settings={settings} imgArrData = {imgArrData} />;
}

export default App
```
```sliderCardData.js
export const imgArrData = [
    {
        'src':'https://url-to-image',
        id:1,
    },
   ...
];
```

## Slider View
![image](https://user-images.githubusercontent.com/65011770/125191551-a8b36900-e260-11eb-96c3-84be84f7dba9.png)

## Auto adjust gap demo 
![Animation](https://user-images.githubusercontent.com/65011770/143224959-a97af1db-299b-413c-94b2-d84405dfa480.gif)

## Card data
 imgArrData must be defined and passed as prop to Autogapslider. 'imgArrData' contains path of card image to render,
 Example: 
 ```
 const imgArrData = [
    {
        'src':'https://picsum.photos/300/300',
        id:1,
    },
    {
        'src':' https://picsum.photos/300/400',

        id:2,
    }
 ]
 ```
## Configuration

### Settings
You can provide optional settings to change default behavior of slider.
Name | Type | Default Value | Description
---  | --- | --- | --- 
autoAdjustGap | boolean | true | Feature which centers cards by distributing margin between slider cards
minGapBetweenSlides | number | 20 | Minimum gap between each slider cards.
autoMoveSlider | boolean | false | Moves slider automatically with time.
autoMoveSliderInterval | number | 4000 | Milli-seconds after which slider moves next.

## Demo

[Click here](https://pranav-medit.github.io/AutoGapSlider-React/)


## License

MIT © [Pranav](https://github.com/Pranav)
