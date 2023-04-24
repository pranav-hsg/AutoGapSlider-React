import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { SettingsContext } from '../slider/slider.component'
import styles from './slider-card.module.scss'
const SliderCard = ({ data, index }) => {
  // let imageSlide = useRef(null);
  const context = useContext(SettingsContext)
  const [isLoading, setIsLoading] = useState(true)
  const { loadImageUrl, defaultImageLoader } = context?.settings
  const uStyles = context?.settings?.styles
  return (
    <>
      <div
        onClick={($event) => {
          context.onCardClick($event, data)
        }}
        key={data.id}
        ref={context.ref}
        style={sliderStyles.slideCardStyle(context.styles)}
        className={styles.sliderCard + ' div__sliderCard'}
      >
        <img
          key={data.id}
          src={data.src}
          onLoad={() => {
            setIsLoading(false)
          }}
          className={
            isLoading && defaultImageLoader && !loadImageUrl
              ? styles.imageLoading
              : ''
          }
          style={
            isLoading
              ? sliderStyles.imageLoader(loadImageUrl, defaultImageLoader)
              : {}
          }
          alt=''
        />

        {data.caption && (
          <div style={uStyles?.sliderCardCaption} className={styles.caption}>
            {data.caption}
          </div>
        )}
      </div>
    </>
  )
}
const sliderStyles = {
  slideCardStyle: ({ slideCardMargin, sliderCardWidth, sliderCardHeight }) => ({
    width: sliderCardWidth,
    height: sliderCardHeight,
    margin: `0 ${slideCardMargin / 2}px 0 ${slideCardMargin / 2}px`
  }),
  imageLoader: (imageUrl) => ({
    backgroundImage: imageUrl ? `url(${imageUrl})` : null,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  })
}
export default SliderCard
