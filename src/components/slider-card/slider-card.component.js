import React, { forwardRef, useContext, useEffect } from 'react'
import { SettingsContext } from '../slider/slider.component'
import styles from './slider-card.module.scss'

const SliderCard = forwardRef(({ styleImg }, childSliderCardRef) => {
  // let imageSlide = useRef(null);
  const context = useContext(SettingsContext);
  const settings = context.settings;
  const styleSettings = sliderStyles.slideCardStyle({
    slideCardMargin: context.styles.slideCardMargin,
    sliderCardWidth: context.styles.sliderCardWidth,
    sliderCardHeight: context.styles.sliderCardHeight
  })
  let originalBackgroundImage;
  useEffect(() => {
    let images = Array.from(document.getElementsByClassName('imageHolder'))
    images.forEach((image) => {
      onImageLoad(image, false)
      image.addEventListener('dragstart', (e) => dragHandler(e))
      image.addEventListener('load', (e) => onImageLoad(image, true))
    })
    return () => {
      images.forEach((image) => {
        image.removeEventListener('dragstart', (e) => dragHandler(e))
        image.removeEventListener('load', (e) => onImageLoad(e))
      })
    }
  }, [])
  
  const onImageLoad = (image, isImgReady) => {
    if (isImgReady) {
      image.classList.remove('loading')
      // image.style.backgroundImage = null;
    }
    else {
      if(!context?.settings?.defaultImageLoader && !context?.settings?.loadImageUrl) return;
      if(context?.settings?.loadImageUrl) {image.style.backgroundImage = `url(${settings?.loadImageUrl})`;}
      image.classList.add('loading')
      
    }
  }
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

            {src.caption && <div style={settings?.styles?.sliderCardCaption} className={styles.caption}>{src.caption}</div>}
          </div>
        )
      })}
    </>
  )
})
const sliderStyles = {
  slideCardStyle: ({ slideCardMargin, sliderCardWidth, sliderCardHeight }) => ({
    width: sliderCardWidth,
    height: sliderCardHeight,
    margin: `0 ${slideCardMargin / 2}px 0 ${slideCardMargin / 2}px`
  })
}
export default SliderCard
