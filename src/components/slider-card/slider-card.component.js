import React, { forwardRef, useContext } from 'react'
import { SettingsContext } from '../slider/slider.component'
import styles from './slider-card.module.scss'

const SliderCard = forwardRef(
  ({ styleImg }, childSliderCardRef) => {
    // let imageSlide = useRef(null);
    const context = useContext(SettingsContext)
    const styleSettings = sliderStyles.slideCardStyle({
        slideCardMargin:context.styles.slideCardMargin,
        sliderCardWidth:context.styles.sliderCardWidth,
        sliderCardHeight:context.styles.sliderCardHeight,
      })
    return (
      <>
        {context.imgArr.map((src, index) => {
          return (
            <div
              onClick={($event) => {
                context.onCardClick($event, src)
              }}
              key={src.id}
              ref={context.ref}
              style={styleSettings}
              className={
                styles.sliderCard +
                ' div div__sliderCard div__sliderCard--slideCalulate '
              }
            >
              <img
                key={src.id}
                src={src.src}
                className={styles.sliderCardImg + ' imageHolder '}
                alt=''
              />
              
            { <div  className={styles.helo}>{src.caption}</div>}
            </div>
          )
        })}
      </>
    )
  }
)
const sliderStyles = {
    slideCardStyle: ({ slideCardMargin, sliderCardWidth, sliderCardHeight }) => ({
      width: sliderCardWidth,
      height: sliderCardHeight,
      margin: `0 ${slideCardMargin / 2}px 0 ${slideCardMargin / 2}px` 
    })
  }
export default SliderCard
