import { useRef, useEffect, useState } from 'react'
import * as React from 'react'
import styles from './slider.component.module.scss'
import SliderCard from '../slider-card/slider-card.component'
import {throttle,debounce} from '../../utils/throttle-debounce.service'
export const SettingsContext = React.createContext();
const Slider = ({ settings, imgArrData , onCardClick }) => {

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
  // setInterval(() => {
  // },1000)
  // SliderWidth
  const windowWidth = useRef(window?.innerWidth);
  // Each slider card
  const childSliderCardRef = useRef()
  // Parent of slider cards , div holding all slide cards
  const divCardsContainer = useRef()
  // Slider containing cards container and prev, next buttons.
  const autoGapSliderMainContainer = useRef()
  // Grabbing next button
  const nextButton = useRef()
  // Grabbing prev button
  const prevButton = useRef()
  const [imgArr] = useState(imgArrData)
  // let imageUpdateArr=imgArr;
  // let id = 12;
  // let timerId;
  const [slideCardMargin, updateSlideCardMargin] = useState(20)
  const [translateValue, updateTranslateValue] = useState(0)
  // Initialize default values
  const sliderVisibleWidth = useRef(0);
  // let slidesToScroll = 0;
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
  const displayArrow = (direction = 'prev', toDisplay = true) => {
    if (direction === 'prev') {
      if (!toDisplay) showPrevButton(false)
      else showPrevButton(true)
    } else {
      if (!toDisplay) showNextButton(false)
      else showNextButton(true)
    }
  }
  const updateSliderPositionRef = (updateref) => {
    // translateX(0) -> initial position, starting position
    // translateX(-240px) -> moves slide in -> direction by 240px(each slide width by default)
    if (updateref === 'next') {
      // minus position goes -> direction on translate
      // ex: prevPxValueToScrl.current=240,nextPxValueToScrl.current=-240  and slidesToScrollWidth.current=240
      prevPxValueToScrl.current = prevPxValueToScrl.current - slidesToScrollWidth.current
      // first-time:prevPxValueToScrl.current:0
      // second-time:prevPxValueToScrl.current:-240
      nextPxValueToScrl.current = nextPxValueToScrl.current - slidesToScrollWidth.current
      // first-time:nextPxValueToScrl.current:-480
      // second-time:nextPxValueToScrl.current:-720
    } else {
      // ex: prevPxValueToScrl.current=-240,nextPxValueToScrl.current=-720  and slidesToScrollWidth.current=240
      nextPxValueToScrl.current = nextPxValueToScrl.current + slidesToScrollWidth.current
      // first-time:prevPxValueToScrl.current:480
      // second-time:prevPxValueToScrl.current:620
      prevPxValueToScrl.current = prevPxValueToScrl.current + slidesToScrollWidth.current
      // first-time:nextPxValueToScrl.current:0
      // second-time:nextPxValueToScrl.current:240
    }
  }
  const clickHandler = (direction) => {
    // If next button is clicked
    const divCardsContainerTotalWidth = cardsContainerTotalWidth.current
    if (direction === 'next') {
      displayArrow('prev', true)

      // If reached end of slide return to first slide
      if (endOfSlide.current) {
        // Return to first slide and reset positions of scroll reference
        resetSliderPosition()
        endOfSlide.current = false
        // ex: say divCardsContainerTotalWidth = 2360; and sliderVisibleWidth.current = 1336 and nextPxValueToScrl.current = -1440 then
        // sliderVisibleWidth.current is slider width which is visible to user
        // divCardsContainerTotalWidth is total width of container holding cards =  visible area+hidden area
      } else if (
        divCardsContainerTotalWidth -
          sliderVisibleWidth.current -
          slideCardMargin -
          10 <=
        -nextPxValueToScrl.current
      ) {
        // If slide is about to reach last slide , last but one click of endOfSlide.current
        // divCardsContainer.current.style.cssText = `transform: translateX(${-divCardsContainerTotalWidth+sliderVisibleWidth.current}px)`
        updateTranslateValue(-divCardsContainerTotalWidth + sliderVisibleWidth.current)
        // Update slider position reference, pass 'next' to update refrence with respect to next button click
        updateSliderPositionRef('next')
        endOfSlide.current = true
        // updateSliderArray()
      } else {
        // If everything is right translate to next px value
        // divCardsContainer.current.style.cssText = `transform: translateX(${nextPxValueToScrl.current}px)`
        updateTranslateValue(nextPxValueToScrl.current)
        // Update slider position reference, pass 'next' to update refrence with respect to next button click
        updateSliderPositionRef('next')
        endOfSlide.current = false
      }
    } else if (direction === 'prev') {
      // End of slide cannot be reached by clicking previous button
      endOfSlide.current = false
      if (
        prevPxValueToScrl.current > 0 ||
        prevPxValueToScrl.current + slidesToScrollWidth.current > 0
      ) {
        displayArrow('prev', false)
        // If slider is over left return to first slide and reset positions of scroll reference
        // ex: say by default reference prevPxValueToScrl.current is set to 240px hence this is executed
        resetSliderPosition()
      } else {
        displayArrow('prev', true)
        // If everything is right translate to prev px value
        // divCardsContainer.current.style.cssText = `transform: translateX(${prevPxValueToScrl.current}px)`;
        updateTranslateValue(prevPxValueToScrl.current)
        // Update slider position reference, pass 'prev' to update refrence with respect to next button click
        updateSliderPositionRef('prev')
      }
    }
  }
  const initValues = () => {
    endOfSlide.current = false
    // Slider width is an outer div which shows entire slider if we set slider to be 200px wide-
    // -width is set on this div , we need it to calculate slider visible width in which slider is visible
    // by default slider takes full viewport width.ex : 1600px
    sliderVisibleWidth.current = autoGapSliderMainContainer.current.offsetWidth
    const userSetCardWidth = settings?.sliderCardWidth ?? '200px';
    setSliderCardWidth(['100%'].includes(userSetCardWidth) ? sliderVisibleWidth.current+'px' : userSetCardWidth);
    cardsContainerTotalWidth.current = divCardsContainer.current.offsetWidth;
    // If slider has margin (space between slider cards if sliders are touch to each other then it has no margin)-
    // -it is required to calculate how much does slider scrolls
    let eachSlide = childSliderCardRef.current
    let eachslideCardMargin = window
      .getComputedStyle(eachSlide)
      .marginRight.slice(0, -2)
    // Convert from string to number and multiply it by two because margin is applied on both sides
    eachslideCardMargin = Number(eachslideCardMargin) * 2
    // Each slider card width is calculated by adding its own width with its own margin
    let eachSlideWidth = eachSlide.offsetWidth + eachslideCardMargin
    // eachSlideWidth =Number(eachSlideWidth)
    // Number of slides to scroll
    // slidesToScroll = 1;
    // Number of slides to scroll in pixels ex: if 240px
    slidesToScrollWidth.current = slidesToScroll
      ? eachSlideWidth * slidesToScroll
      : sliderVisibleWidth.current
    // slidesToScrollWidth.current = sliderVisibleWidth.current;
    // to calculate and track progress of left and right scroll positions
    prevPxValueToScrl.current = slidesToScrollWidth.current // ex:240px
    nextPxValueToScrl.current = -slidesToScrollWidth.current // ex:-240px
    // Cards container width generally equal to eachsliderwidth*totalnumberofslides including margin ex: say 2090px
    displayArrow('prev', false)
  }

  // useEffect for number of slides to show per div
  function setSliderCardStyle(margin) {
    updateSlideCardMargin(margin)
  }
  function calculateMargin() {
    if (!autoAdjustGap) {setSliderCardStyle(minGapBetweenSlideCards); return}
    const minGapBetweenSlides = minGapBetweenSlideCards
    const sliderVisibleWidth1 = sliderVisibleWidth.current
    const eachSlideWidth =
      childSliderCardRef.current.offsetWidth + minGapBetweenSlides
    const slidesPerVisibleWidth = sliderVisibleWidth1 / eachSlideWidth
    const marginToSetInPercentage =
      slidesPerVisibleWidth - Math.floor(slidesPerVisibleWidth)
    const marginToSetInPx = marginToSetInPercentage * eachSlideWidth
    const marginPerSlide =
      marginToSetInPx / (Math.ceil(slidesPerVisibleWidth) - 1) +
      minGapBetweenSlides
    setSliderCardStyle(marginPerSlide)
  }
  // Useeffect for slider next and prev button
  useEffect(() => {
    // if (divCardsContainer.current) {
    //   divCardsContainerTotalWidth = divCardsContainer.current.offsetWidth
    // }
    let timerId
    // Execute when mounting
    // Initialize required values in particular function
    // let timerId;
    const autoGapSliderMainCont = autoGapSliderMainContainer.current
    const autoSliderMove = () => {
      if (!autoMoveSlider) return
      if (timerId) return
      if (autoMoveSlider) {
        let cn = throttle(clickHandler, 'next');
        timerId = setInterval(cn, autoMoveSliderInterval)
      }
    }
    const clearAutoSliderMove = (timerId) => {
      if (timerId) {
        clearTimeout(timerId)
        // timerId =null;
      }
    }
    initValues()
    calculateMargin()
    resetSliderPosition()
    // displayContent(initvalues)
    // clearTimeout(timerId)
    autoSliderMove()
    // sliderStyle.transform('400px')
    // Handle click event for both buttons
    function mouseEnterHandler() {
      clearAutoSliderMove(timerId)
      timerId = null
    }
    function mouseLeaveHandler() {
      autoSliderMove()
    }
    if (stopUponHover) {
      autoGapSliderMainCont.addEventListener('mouseenter', mouseEnterHandler)
      autoGapSliderMainCont.addEventListener('mouseleave', mouseLeaveHandler)
    }
    // a function called resizeHandler that will be called after a window resize event has fired after a certain period of time
    const resizeHandler = debounce(() => {
      const newWidth=window?.innerWidth ?? 0;
      // This check ensures that calculateMargin() is only called when the window width changes, and not when the height changes.
      // Doing so has two benefits:
      // 1. It is more optimized, as there is no need to recalculate margins when the height changes.
      // 2. In some mobile browsers, when the user scrolls in Chrome or some other browsers, the height of the window changes on scroll due to the showing/hiding of the address bar in mobile devices.
      if(windowWidth.current !== newWidth){
        windowWidth.current = newWidth;
        initValues()
        calculateMargin()
        resetSliderPosition()
      }
    })
    window.addEventListener('resize', resizeHandler)
    return () => {
      // Execute when re-rendering (cleanup)
      clearTimeout(timerId)
      autoGapSliderMainCont.removeEventListener('mouseenter', mouseEnterHandler)
      autoGapSliderMainCont.removeEventListener('mouseleave', mouseLeaveHandler)
      window.removeEventListener('resize', resizeHandler)
    }
  }, [slideCardMargin, settings, divCardsContainer?.current?.offsetWidth])

  const dragHandler = (e) => {
    e.preventDefault()
  }
  // useEffect for touch capability
  useEffect(() => {
    const autoGapSliderMainCont = autoGapSliderMainContainer.current
    let touchStartPos = 0
    const touchStartHandler = (e) => {
      touchStartPos = e.changedTouches[0].clientX
    }
    const touchEndHandler = (e) => {
      let touchEndPos = e.changedTouches[0].clientX
      if (touchEndPos === touchStartPos) return
      if (touchEndPos - touchStartPos > 40) clickHandler('prev')
      else if (touchStartPos - touchEndPos > 40) clickHandler('next')
    }
    autoGapSliderMainCont.addEventListener(
      'touchstart',
      (e) => touchStartHandler(e),
      { passive: true }
    )
    autoGapSliderMainCont.addEventListener(
      'touchend',
      (e) => touchEndHandler(e),
      { passive: true }
    )
    autoGapSliderMainCont.addEventListener(
      'touchmove',
      (e) => {
      },
      { passive: true }
    )
    
    const nextBtn = nextButton.current
    const prevBtn = prevButton.current
    let cn = throttle(clickHandler, 'next');
    let cp = throttle(clickHandler, 'prev');
    nextBtn.addEventListener('click', cn)
    prevBtn.addEventListener('click', cp)
    // childSliderCardRef.current.removeEventListener('dragstart',(e)=>dragHandler(e) )
    // autoGapSliderMainContainer.current.addEventListener('touchmove',(e)=>touchStartHandler(e) )
    return () => {

      nextBtn.removeEventListener('click', cn)
      prevBtn.removeEventListener('click', cp)
      autoGapSliderMainCont.removeEventListener('touchstart', (e) =>
        touchStartHandler(e)
      )
      autoGapSliderMainCont.removeEventListener(
        'touchend',
        (e) => touchEndHandler(e),
        { passive: true }
      )
    }
  }, [])
  const [prevButtonDisplay, showPrevButton] = useState(true)
  const [nextButtonDisplay, showNextButton] = useState(true)
  
  // const leftStyle = {display:prevButtonDisplay?"inline-block":"none"}
  // const rightStyle = {display:nextButtonDisplay?"inline-btranslateX(translateValue)lock":"none"}
  // const sliderStyle = {transform: `translateX(${translateValue+'px'})` || '0'}
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

// backgroundImage: `url(${'https://picsum.photos/500/100'})`,

  // future upgrade
  // const updateSliderArray = () =>{
  //     const newElement = [
  //         {
  //             'src':'static/per1.jpg',
  //             id:id,
  //         },
  //         {
  //             'src':'static/per2.jpg',
  //             id:id+1
  //         }
  //     ]
  //     // imgArr.push(...newElement)
  //     imageUpdateArr =  imageUpdateArr.concat(newElement)
  //     imgArrUpdt(imageUpdateArr );
  //     id = id+2;
  //     // clickHandler('next')
  // }