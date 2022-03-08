import React,{forwardRef} from 'react';
import styles from './slider-card.module.scss'

const SliderCard = forwardRef(({styleImg,imgArr},childSliderCardRef) =>{
    // let imageSlide = useRef(null);
    return (
        <>
            {imgArr.map((src,index)=>{
                return (
                    <div key={src.id}  ref={childSliderCardRef} style={styleImg}  className={styles.sliderCard+' div div__sliderCard div__sliderCard--slideCalulate '}>
                        <img key={src.id} loading='lazy' style={{}} src={src.src}   className={styles.sliderCardImg + ' imageHolder '}  alt="" />
                    </div>
                )
            })}
        </>
    )
})
export default SliderCard