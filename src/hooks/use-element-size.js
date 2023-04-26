
import  {
  forwardRef,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState
} from 'react'

function useElementSize({ref,rerenderOnlyOnHeightChange,rerenderOnlyOnWidthChange}){
  const [dimension,setDimension]  = useState({width:0, height:0});
  // const [cacheDimension,setCacheDimension] = useState({width:0,height:0});
  useEffect(()=>{
    if(ref  == null) ref = window;
    // setCacheDimension({width:ref.innerWidth,height:ref.innerHeight})
    const cacheDimension = {width:ref.innerWidth,height:ref.innerHeight}
    const handleResize = debounce(() => {
      const newWidth=ref?.innerWidth ?? 0;
      const newHeight = ref?.innerHeight ?? 0;
      function setDimensionWrapper(dimension){
        setDimension(()=>{
          cacheDimension = dimension;
          return dimension;
        })
      }
      if(rerenderOnlyOnHeightChange){
        if( cacheDimension.width !== newWidth){
          setDimensionWrapper({width:ref.innerWidth,height:ref.innerHeight});
        }
      }else if(rerenderOnlyOnWidthChange){
        if( cacheDimension.height !== newHeight){
          setDimensionWrapper({width:ref.innerWidth,height:ref.innerHeight});
        }
      }else{
        setDimensionWrapper({width:ref.innerWidth,height:ref.innerHeight});
      }
    })
    ref.addEventListener("resize",(e)=>handleResize(e))
    return ()=>{

    }
  },[ref])
  return dimension
}
export default useElementSize;