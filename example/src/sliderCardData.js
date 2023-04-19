import image1 from './assets/static/per1.jpg'
export const imgArrData = [
    {
        'src':'https://picsum.photos/300/300',
        caption:'Breathtaking Beauty',
        id:1,
    },
    {
        'src':'https://picsum.photos/300/400',
        caption:'Natural Wonder',
        id:2,
    },
    {
        'src':'https://picsum.photos/300/500',
        caption:'Serene Scenery',
        id:3,
    },
    {
        'src':'https://picsum.photos/700/300',
        caption:'Majestic Mountains',
        id:4,
    },
    {
        'src':'https://picsum.photos/500/200',
        caption:'Tranquil Treasures',
        id:5,
    },{
        'src':'https://picsum.photos/500/400',
        caption:'Heavenly Horizons',
        id:6,
    },
    {
        'src':'https://picsum.photos/500/500',
        caption: 'Stunning Landscapes',
        id:7,
    },
    {
        'src':'https://picsum.photos/100/500',
        caption: 'Wilderness Wonders',
        id:8,
    },
    {
        'src':'https://picsum.photos/200/500',
        id:9,
    },
    {
        'src':'https://picsum.photos/300/500',
        id:10,
    },
    {
        'src':'https://picsum.photos/200/300',
        id:11,
    },
    {
        'src':'https://picsum.photos/1200/2300',
        id:12,
    },
    {
        'src':'https://picsum.photos/400/500',
        id:13,
    },
    {
        'src':'https://picsum.photos/600/100',
        id:14,
    },
    {
        'src':'https://picsum.photos/600/200',
        id:15,
    },
    {
        'src':'https://picsum.photos/600/300',
        id:16,
    },
    {
        'src':'https://picsum.photos/600/400',
        id:17,
    },{
        'src':'https://picsum.photos/600/500',
        id:18,
    },
    {
        'src':'https://picsum.photos/600/600',
        id:19,
    },
    {
        'src':'https://picsum.photos/200/600',
        id:20,
    },
    {
        'src':'https://picsum.photos/300/600',
        id:21,
    },
    {
        'src':'https://picsum.photos/400/600',
        id:22,
    },
    {
        'src':'https://picsum.photos/200/300',
        id:23,
    },
    {
        'src':'https://picsum.photos/1200/2300',
        id:24,
    },
    {
        'src':'https://picsum.photos/1200/2300',
        id:25,
        caption:"The dead end"
    },
];
export const settings= {
    autoAdjustGap:true,
    minGapBetweenSlides:20,
//     autoMoveSlider:true,
//     autoMoveSliderInterval:1000,
//     sliderCardWidth:'200px',
//     slidesToScroll:1,
//     loadImageUrl:image1,
//     defaultImageLoader:true,
//     sliderCardHeight:'300px',
//     stopUponHover:true
//     styles:{sliderCardCaption:{
      
//         backgroundColor: 'red',
//         fontSize: '200px'
      
//     }}
  }


// carousel settings
//   {
//     "autoAdjustGap": false,
//     "minGapBetweenSlides": 0,
//     "autoMoveSlider": false,
//     "autoMoveSliderInterval": 1000,
//     "sliderCardWidth": "100vw",
//     "slidesToScroll": 4,
//     "loadImageUrl": "image1",
//     "defaultImageLoader": true,
//     "sliderCardHeight": "300px",
//     "stopUponHover": true
//   }






//
// const settings = {
//     autoAdjustGap: true,
//     minGapBetweenSlides: 20,
//     autoMoveSlider: true,
//     autoMoveSliderInterval: 1000,
//     sliderCardWidth: '200px',
//     slidesToScroll: 1,
//     loadImageUrl: 'image1',
//     defaultImageLoader: true,
//     sliderCardHeight: '300px',
//     stopUponHover: true,
//     styles: {
//       sliderCardCaption: {
//         backgroundColor: 'red',
//         fontSize: '200px',
//       },
//     },
//   };
  
//   const dynamicObjectArray = Object.keys(settings).map((key) => {
//     let type = typeof settings[key];
//     if (type === 'object') {
//       // Nested object is not supported in dynamicObject, so ignoring it
//       return null;
//     }
//     return { id: (Math.floor(Math.random*100)),
//       element: key,
//       type: type, defaultValue: settings[key]
//     };
//   }).filter((item) => item !== null);
  
//   console.log(dynamicObjectArray);