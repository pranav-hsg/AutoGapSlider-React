// eachSlideWidth: Each slider card width in pixel along with the minimum margin to be added in between, ex:eachCardWidth:200px,minGap:20px, totalWidthAvailable:1600px
  // sliderCardsPerVisibleWidth : Number of cards that can be fit under full slider screen area.ex: Math.trunc(7.27272727273) => 7 whole cards can be fit
  // marginToSetInPx : Total margin that can be spread between the cards, ex: 1600 - (7*220) => 60
  // marginPerSlide (return value): Margin to set per each slide, ex: (60/7)+20 => 8.57142857143 +20 => 28.57142857143,
  // later this can be split and given margin on 2 sides of the card so, 28.57142857143/2 gives 14.2857, so ~14pixel gets applied as left margin and right margin each side of each cards.
  export const calculateMargin = ({totalWidthAvailable,eachCardWidth,minGap})=>{
    const eachSlideWidth = eachCardWidth + minGap 
    const sliderCardsPerVisibleWidth =  Math.trunc(totalWidthAvailable / eachSlideWidth)  
    const marginToSetInPx = totalWidthAvailable -  (sliderCardsPerVisibleWidth * eachSlideWidth) 
    return (marginToSetInPx / sliderCardsPerVisibleWidth) + minGap;
  }