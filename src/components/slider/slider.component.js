import { useRef, useEffect, useState } from 'react'
import * as React from 'react'
import styles from './slider.component.module.scss'
import SliderCard from '../slider-card/slider-card.component'
import {throttle,debounce} from '../../utils/throttle-debounce.service';
import useElementSize from '../../hooks/use-element-size';
import {calculateMargin} from "../../utils/calculate-margin.service"
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
  const [imgArr,setImgArr] = useState(imgArrData)
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
  const updateSliderPositionRef = (updateRef,value) => {
    if(value){
      prevPxValueToScrl.current =   -divCardsContainer.current.offsetWidth +(slidesToScrollWidth.current*2)
      nextPxValueToScrl.current =  nextPxValueToScrl.current -slidesToScrollWidth.current
    }else if (updateRef === 'next') {
      prevPxValueToScrl.current =  prevPxValueToScrl.current - slidesToScrollWidth.current
      nextPxValueToScrl.current =  nextPxValueToScrl.current -slidesToScrollWidth.current
    } else {
      nextPxValueToScrl.current = nextPxValueToScrl.current + slidesToScrollWidth.current
      prevPxValueToScrl.current = prevPxValueToScrl.current + slidesToScrollWidth.current
    }
  }
  const displayArrow = (direction = 'prev', toDisplay = true) => {
    if (direction === 'prev') showPrevButton(toDisplay)
    else showNextButton(toDisplay)
  }
  const infiniteMode = false;
  // ex: say divCardsContainerTotalWidth = 2360; and sliderVisibleWidth.current = 1336 and nextPxValueToScrl.current = -1440 then
  const moveSlider = (direction) => {
    const divCardsContainerTotalWidth =divCardsContainer.current.offsetWidth; // visible area+hidden area of slider
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
       
        const temp = -divCardsContainerTotalWidth + sliderVisibleWidth.current;
        updateTranslateValue(temp)
        if(infiniteMode){ updateSliderArray();updateSliderPositionRef('next',temp)}
        else {updateSliderPositionRef('next');endOfSlide.current = true}
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
        prevPxValueToScrl.current >= 0 
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
  let id=useRef(30).current;
    // future upgrade
  const updateSliderArray = () =>{
      const newElement =  () =>   [
          {
              'src':'https://picsum.photos/600/600',
              caption:id+"",
              id:id,
          },
          {
              'src':'https://picsum.photos/400/600',
              id:id+1
          }
      ]
      // imgArr.push(...newElement)
      // let imageUpdateArr =  [...imgArr,...newElement()]
      console.log(imgArr)
      setImgArr((prevValue) =>{
        id = id+2;
        console.log(newElement())
        cardsContainerTotalWidth.current = divCardsContainer.current.offsetWidth;
        return [...prevValue,...newElement()]
      });

      
      // clickHandler('next')
  }
  
  
  useEffect(() => {
    let timerId
    const autoGapSliderMainCont = autoGapSliderMainContainer.current
    const autoSliderMove = () => {
      // if (timerId) return
      let cn = throttle(moveSlider, 'next');
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
  }, [slideCardMargin, settings,windowWidth,sliderCardWidth])

  // useEffect for touch capability
  useEffect(() => {
    const autoGapSliderMainCont = autoGapSliderMainContainer.current
    const nextBtn = nextButton.current
    const prevBtn = prevButton.current
    let touchStartPos = 0
    const handleTouchStart = (e) => { touchStartPos = e.changedTouches[0].clientX;};
    const handleTouchEnd = (e) => {
      const touchEndPos = e.changedTouches[0].clientX;
      if (touchEndPos === touchStartPos) return;
      touchEndPos - touchStartPos > 40 ? moveSlider('prev') : moveSlider('next');
    };
    const handleNextClick = throttle(() => moveSlider('next'));
    const handlePrevClick = throttle(() => moveSlider('prev'));
    autoGapSliderMainCont.addEventListener('touchstart', handleTouchStart, { passive: true });
    autoGapSliderMainCont.addEventListener('touchend', handleTouchEnd, { passive: true });
    nextBtn.addEventListener('click', handleNextClick);
    prevBtn.addEventListener('click', handlePrevClick);
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