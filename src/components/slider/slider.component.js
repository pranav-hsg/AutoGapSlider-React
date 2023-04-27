import { useRef, useEffect, useState } from 'react'
import * as React from 'react'
import styles from './slider.component.module.scss'
import SliderCard from '../slider-card/slider-card.component'
import {throttle,debounce} from '../../utils/throttle-debounce.service';
import useElementSize from '../../hooks/use-element-size';
export const SettingsContext = React.createContext();
const Slider = ({ settings, imgArrData , onCardClick }) => {
  // Rerenders on window width resize. 
  const { width:windowWidth }= useElementSize({rerenderOnlyOnWidthChange: true });
  const {
    autoAdjustGap,
    // Renames lhs to rhs , can't use 'as' inside destructuring.
    minGapBetweenSlides:minGapBetweenSlideCards,
    autoMoveSlider,
    autoMoveSliderInterval,
    slidesToScroll,
    sliderCardHeight,
    stopUponHover,
    // Renames lhs to rhs , can't use 'as' inside destructuring.
    moveDuration:translateDuration,
  } = settings || {};
  // const translateDuration = settings?.moveDuration;
  
  const [sliderCardWidth,setSliderCardWidth] = useState(0);
  const [prevButtonDisplay, showPrevButton] = useState(true)
  const [nextButtonDisplay, showNextButton] = useState(true)
  const [imgArr] = useState(imgArrData)
  const [slideCardMargin, updateSlideCardMargin] = useState(20)
  const [translateValue, updateTranslateValue] = useState(0)

  // Parent of slider cards , div holding all slide cards
  const divCardsContainer = useRef()
  // Each slider card
  const childSliderCardRef = useRef()
  // Slider containing cards container and prev, next buttons.
  const autoGapSliderMainContainer = useRef()
  // Grabbing next button
  const nextButton = useRef()
  // Grabbing prev button
  const prevButton = useRef()

  // For calculation purpose, variables.
  const sliderVisibleWidth = useRef(0);;
  const slidesToScrollWidth = useRef(0);
  const nextPxValueToScrl = useRef(0);
  const prevPxValueToScrl = useRef(0);
  const cardsContainerTotalWidth = useRef(0);
  // Detect if we reached end of the slides
  const endOfSlide = useRef(false);
  // Loadash throttler to throttle resize and if user clicks button many times
  
  const resetSliderPosition = () => {
    // default slidesToScrollWidth.current:240px
    nextPxValueToScrl.current = -slidesToScrollWidth.current
    prevPxValueToScrl.current = slidesToScrollWidth.current
    updateTranslateValue(0)
    displayArrow('prev', false)
  }
  const updateSliderPositionRef = (updateRef) => {
    if (updateRef === 'next') {
      prevPxValueToScrl.current = prevPxValueToScrl.current - slidesToScrollWidth.current
      nextPxValueToScrl.current = nextPxValueToScrl.current - slidesToScrollWidth.current
    } else {
      nextPxValueToScrl.current = nextPxValueToScrl.current + slidesToScrollWidth.current
      prevPxValueToScrl.current = prevPxValueToScrl.current + slidesToScrollWidth.current
    }
  }
  const displayArrow = (direction = 'prev', toDisplay = true) => {
    if (direction === 'prev') showPrevButton(toDisplay)
    else showNextButton(toDisplay)
  }

  // ex: say divCardsContainerTotalWidth = 2360; and sliderVisibleWidth.current = 1336 and nextPxValueToScrl.current = -1440 then
  const clickHandler = (direction) => {
    const divCardsContainerTotalWidth = cardsContainerTotalWidth.current // visible area+hidden area of slider
    if (direction === 'next') {
      displayArrow('prev', true)
      if (endOfSlide.current) {
        resetSliderPosition()
        endOfSlide.current = false
      } else if (
          divCardsContainerTotalWidth -
          sliderVisibleWidth.current - 10// (10 for inaccuracies)
          <=
        -nextPxValueToScrl.current
      ) { // last but one slide condition
        updateTranslateValue(-divCardsContainerTotalWidth + sliderVisibleWidth.current)
        updateSliderPositionRef('next')
        endOfSlide.current = true
      } else {
        updateTranslateValue(nextPxValueToScrl.current)
        updateSliderPositionRef('next')
        endOfSlide.current = false
      }
    } else if (direction === 'prev') {
      // End of slide cannot be reached by clicking previous button
      endOfSlide.current = false
      // Last but one slide condition upon left moving
      if (
        prevPxValueToScrl.current > 0 ||
        prevPxValueToScrl.current + slidesToScrollWidth.current > 0
      ) {
        displayArrow('prev', false)
        resetSliderPosition()
      } else {
        displayArrow('prev', true)
        updateTranslateValue(prevPxValueToScrl.current)
        updateSliderPositionRef('prev')
      }
    }
  }
  const initValues = () => {
    endOfSlide.current = false
    sliderVisibleWidth.current = autoGapSliderMainContainer.current.offsetWidth
    const userSetCardWidth = settings?.sliderCardWidth ?? '200px';
    setSliderCardWidth(['100%'].includes(userSetCardWidth) ? sliderVisibleWidth.current+'px' : userSetCardWidth);
    cardsContainerTotalWidth.current = divCardsContainer.current.offsetWidth;
    // If slider has margin (space between slider cards if sliders are touch to each other then it has no margin)-
    // -it is required to calculate how much does slider scrolls
    const eachSlide = childSliderCardRef.current
    let eachSlideCardMargin = window
      .getComputedStyle(eachSlide)
      .marginRight.slice(0, -2)
    // Convert from string to number and multiply it by two because margin is applied on both sides
    eachSlideCardMargin = Number(eachSlideCardMargin) * 2
    // Each slider card width is calculated by adding its own width with its own margin
    let eachSlideWidth = eachSlide.offsetWidth + eachSlideCardMargin
    // slidesToScroll = 1; Number of slides to scroll in pixels ex: if 240px
    slidesToScrollWidth.current = slidesToScroll ? eachSlideWidth * slidesToScroll : sliderVisibleWidth.current
    resetSliderPosition()
  }

  function setAutoMargin() {
    const marginSettings = {
      totalWidthAvailable:sliderVisibleWidth.current,
      eachCardWidth:childSliderCardRef.current.offsetWidth,
      minGap:minGapBetweenSlideCards
    }
    const marginPerSlide = autoAdjustGap ? calculateMargin(marginSettings) : marginSettings.minGap;
    updateSlideCardMargin(marginPerSlide)
  }
  // eachSlideWidth: Each slider card width in pixel along with the minimum margin to be added in between, ex:eachCardWidth:200px,minGap:20px, totalWidthAvailable:1600px
  // sliderCardsPerVisibleWidth : Number of cards that can be fit under full slider screen area.ex: Math.trunc(7.27272727273) => 7 whole cards can be fit
  // marginToSetInPx : Total margin that can be spread between the cards, ex: 1600 - (7*220) => 60
  // marginPerSlide (return value): Margin to set per each slide, ex: (60/7)+20 => 8.57142857143 +20 => 28.57142857143,
  // later this can be split and given margin on 2 sides of the card so, 28.57142857143/2 gives 14.2857, so ~14pixel gets applied as left margin and right margin each side of each cards.
  function calculateMargin({totalWidthAvailable,eachCardWidth,minGap}) {
    const eachSlideWidth = eachCardWidth + minGap 
    const sliderCardsPerVisibleWidth =  Math.trunc(totalWidthAvailable / eachSlideWidth)  
    const marginToSetInPx = totalWidthAvailable -  (sliderCardsPerVisibleWidth * eachSlideWidth) 
    return (marginToSetInPx / sliderCardsPerVisibleWidth) + minGap;
  }
  useEffect(() => {
    let timerId
    const autoGapSliderMainCont = autoGapSliderMainContainer.current
    const autoSliderMove = () => {
      // if (timerId) return
      let cn = throttle(clickHandler, 'next');
      timerId = setInterval(cn,autoMoveSliderInterval)
    }
    function mouseEnterHandler() {
      clearTimeout(timerId)
      timerId = null
    }
    if (autoMoveSlider) {
      autoSliderMove()
      if(stopUponHover){
        autoGapSliderMainCont.addEventListener('mouseenter', mouseEnterHandler)
        autoGapSliderMainCont.addEventListener('mouseleave', autoSliderMove)
      }
    }
    return ()=>{
      // Execute when re-rendering (cleanup)
      clearTimeout(timerId)
      autoGapSliderMainCont.removeEventListener('mouseenter', mouseEnterHandler)
      autoGapSliderMainCont.removeEventListener('mouseleave', autoSliderMove)
    }
  },[settings])

  useEffect(() => {
    initValues()
    setAutoMargin()
  }, [slideCardMargin, settings, divCardsContainer?.current?.offsetWidth,windowWidth])

  // useEffect for touch capability
  useEffect(() => {
    const autoGapSliderMainCont = autoGapSliderMainContainer.current
    const nextBtn = nextButton.current
    const prevBtn = prevButton.current
    let touchStartPos = 0
    const handleTouchStart = (e) => {
      touchStartPos = e.changedTouches[0].clientX;
    };
    const handleTouchEnd = (e) => {
      const touchEndPos = e.changedTouches[0].clientX;
      if (touchEndPos === touchStartPos) return;
      touchEndPos - touchStartPos > 40 ? clickHandler('prev') : clickHandler('next');
    };
    const handleNextClick = throttle(() => clickHandler('next'));
    const handlePrevClick = throttle(() => clickHandler('prev'));
    autoGapSliderMainCont.addEventListener('touchstart', handleTouchStart, { passive: true });
    autoGapSliderMainCont.addEventListener('touchend', handleTouchEnd, { passive: true });
    nextBtn.addEventListener('click', handleNextClick);
    prevBtn.addEventListener('click', handlePrevClick);
    // childSliderCardRef.current.removeEventListener('dragstart',(e)=>dragHandler(e) )
    // autoGapSliderMainContainer.current.addEventListener('touchmove',(e)=>touchStartHandler(e) )
    return () => {
      autoGapSliderMainCont.removeEventListener('touchstart', handleTouchStart, { passive: true });
      autoGapSliderMainCont.removeEventListener('touchend', handleTouchEnd, { passive: true });
      nextBtn.removeEventListener('click', handleNextClick);
      prevBtn.removeEventListener('click', handlePrevClick);
    }
  }, [])
  return (
    <>
      <div
        id='visibleDiv'
        ref={autoGapSliderMainContainer}
        className={
          styles.autoGapSliderMainContainer + ' autoGapMainContainerDiv '
        }
      >
        <i
          ref={prevButton}
          style={sliderStyles.prevButton({ prevButtonDisplay })}
          className={styles.button + ' prev '}
        >
          Prev
        </i>

        <div
          style={sliderStyles.divCardsContainer({ translateValue,translateDuration })}
          ref={divCardsContainer}
          className={styles.divCardsContainer + ' imgComp '}
        >
          
          <SettingsContext.Provider value={{onCardClick,styles:{
              slideCardMargin,
              sliderCardWidth:sliderCardWidth,
              sliderCardHeight,
            },ref:childSliderCardRef,settings }} >

            {imgArr.map((data, index) => 
                <SliderCard key={data.id} data={data} index={index} />
              )}
          </SettingsContext.Provider>
        </div>
        <i
          ref={nextButton}
          style={sliderStyles.nextButton({ nextButtonDisplay })}
          className={styles.button + ' next '}
        >
          Next
        </i>
      </div>
      {/* <p id={styles["idea"]}>Namaste world</p> */}
    </>
  )
}
// Styles for slider
const sliderStyles = {
  divCardsContainer: ({ translateValue,translateDuration }) => ({
    transform: `translateX(${translateValue + 'px'})` || '0',
    transition: `transform ease-in-out ${translateDuration/1000}s`
  }),
  nextButton: ({ nextButtonDisplay }) => ({
    display: nextButtonDisplay ? 'inline-block' : 'none'
  }),
  prevButton: ({ prevButtonDisplay }) => ({
    display: prevButtonDisplay ? 'inline-block' : 'none'
  })
}
export default Slider