import React,{forwardRef} from 'react';
import styles from './slider-card.module.scss'

const SliderCard = forwardRef(({styleImg,imgArr,onCardClick},childSliderCardRef) =>{
    // let imageSlide = useRef(null);
    return (
        <>
            {imgArr.map((src,index)=>{
                return (
                    <div onClick={($event)=>{ onCardClick($event,src) }}  key={src.id}  ref={childSliderCardRef} style={styleImg}  className={styles.sliderCard+' div div__sliderCard div__sliderCard--slideCalulate '} >
                        <img key={src.id}  style={{}} src={src.src}   className={styles.sliderCardImg + ' imageHolder '}  alt="" />
                    </div>
                )
            })}
        </>
    )
})
export default SliderCard