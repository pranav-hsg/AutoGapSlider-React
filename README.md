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
import { AutoGapSlider } from 'autogapslider' //importing AutoGapSlider component from autogapslider library
import 'autogapslider/dist/index.css' //importing CSS for AutoGapSlider component
import {imgArrData,settings as agsSettings} from './sliderCardData' //importing image data and settings object from sliderCardData.js file

const App = () => {
  //function to handle the click event on a card
  function onCardClick($event,obj) { 
    //log the click event and card object to the console
    console.log('Button clicked',$event,obj); 
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

export default App

```
## Settings and Card data

Settings is an optional object that can be passed as a prop to the AutoGapSlider component. It contains various options that can be used to customize the behavior of the slider. 

Here's an example of what a simple slider settings looks like.
```jsx
export const settings= {
    minGapBetweenSlides:20
}
```
Example: you can ddd this to a file sliderCardData.js 

The imgArrData array must be defined and passed as a prop to the Autogapslider component. This array contains the path of card image to render, along with an optional caption property for each image. Here's an example of how to create the imgArrData array:
In the same file sliderCardData.js add this:
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

### Slider View with Captions
![image](https://user-images.githubusercontent.com/65011770/232329200-b5cfb578-4b8d-43ce-bf48-ec9549c0423f.png)
> Note : This image shows the AutoGapSlider component with captions enabled, which can be done by passing an extra parameter as explained in the section above.

### Slider View with Default Loading Enabled
![image](https://user-images.githubusercontent.com/65011770/232331593-d8745579-94ff-428f-874a-9428f6cbc111.png)
> Note : To enable loading images, you can set defaultImageLoader to true in the settings. You can also override the default loading image by passing a different image URL to the loadImageUrl property of the settings object.

## Auto-Adjusted Gap Slider
 Demo of the AutoGapSlider demonstrating how it automatically adjusts the spacing between cards to fit the viewport.
![Animation](https://user-images.githubusercontent.com/65011770/143224959-a97af1db-299b-413c-94b2-d84405dfa480.gif)

## Configuration

### Settings
You can provide optional settings to change default behavior of slider.
Name | Type | Default Value | Description
---  | --- | --- | --- 
autoAdjustGap | boolean | true | A boolean value indicating whether the slider should automatically adjust the space between cards to fit the viewport.
minGapBetweenSlides | number | 0 | The minimum amount of gap between each slider card.
autoMoveSlider | boolean | false | A boolean value indicating whether the slider should move automatically with a set interval.
autoMoveSliderInterval | number | 2000 | The interval in milliseconds between each automatic slide movement.
slidesToScroll | number | entire-viewport | The number of slides to scroll when clicked on the next/prev button. By default, it scrolls the entire viewport width.
sliderCardWidth | string | '200px' |  The width of each slider card.
sliderCardHeight | string | '300px' | The height of each slider card.
stopUponHover | boolean | true | A boolean value indicating whether to stop automatic slider movement when the user hovers over the slider. By default, this is set to true.
defaultImageLoader | boolean |false | This option enables the default loading image. When set to true, a loading spinner will be displayed while the actual image is being loaded.
loadImageUrl | imported-image | undefined | This option allows you to specify the image to be displayed while the actual image is loading. This is useful when you want to show a custom loader or a placeholder image while the actual image is being loaded. This will override the settings of defaultImageLoader.
styles | StyleObject | undefined |  The styles option is used to set custom styles for various elements of the slider and can be defined as below

### StyleObject
  The StyleObject option in the settings object is used to provide custom styles for certain slider elements. It is an object where the keys are the names of the elements and the values are CSS style objects. 

  Type | Key | description |Example value
  ---  | --- | --- | --- 
  Caption  | sliderCardCaption | caption is an optional text that can be added to the slider card | { backgroundColor: 'green'}


## Customizing Slider Styles

You can provide custom styles for certain slider elements by passing them as an object to the styles property in the settings object. For example, to set a green background and large font size for the slider card captions, you can do:
```
const settings = {
  // Other settings...
  styles: {
    sliderCardCaption: {
      backgroundColor: 'green',
      fontSize: '2rem'
    }
  }
}
```
## Demo

[Click here](https://pranav-medit.github.io/autogapslider-ex/)


## License

MIT © [Pranav](https://github.com/Pranav)
