
import  {
  forwardRef,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState
} from 'react'
import {throttle,debounce} from '../utils/throttle-debounce.service';
const useElementSize = ({ref,rerenderOnlyOnHeightChange,rerenderOnlyOnWidthChange}={})=>{
  const [dimension,setDimension]  = useState({width:null, height:null});
  useEffect(()=>{
    let passedRef = null;
    let cacheDimension = {width:window.innerWidth,height:window.innerHeight}
    const handleResize = debounce(() => {
      const resizedWidth=window?.innerWidth ?? 0;
      const resizedHeight = window?.innerHeight ?? 0;
      function setDimensionWrapper(dimension){
        cacheDimension = {width:window.innerWidth,height:window.innerHeight};
        setDimension(cacheDimension)
      }
      if(rerenderOnlyOnWidthChange){
        if( cacheDimension.width !== resizedWidth){
          setDimensionWrapper();
        }
      }else if(rerenderOnlyOnHeightChange){
        if( cacheDimension.height !== resizedHeight){
          setDimensionWrapper();
        }
      }else{
        setDimensionWrapper();
      }
    })
    window.addEventListener("resize",(e)=>handleResize(e))
    return ()=>{

    }
  },[ref])
  return dimension
}
export default useElementSize;