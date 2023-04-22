

import React,{useState,useEffect} from 'react'
import styles from './dynamic-form-element.component.css'

const DynamicFormElement = ({elementSettings,onValueChange}) =>{
  const [formData, setFormData] = useState({});
  const [copied,setCopied] = useState(false);
  const [clearCache,setClearCache] = useState(false);
  useEffect(()=>{
    const savedSettings = JSON.parse(localStorage.getItem('savedSettings'));
    const form = elementSettings.reduce((prev,curr)=>
       ({...prev, [curr.element]:((curr.defaultValue) ?? (curr.type=='boolean' ? false : ''))})
    ,{})
    if(savedSettings ) {onValueChange?.(savedSettings)}
    else {onValueChange?.(form)}
    setFormData(savedSettings ?? form);
  },[])
  function handleChange(event,elem){
    // const {name,value} = e.target;
    const {type} = elem;
    let { name, value, checked } = event.target;
    if(type === 'boolean') value =  checked;
    if(type === 'number') value = parseInt(value);
    setFormData(prevState => {
      const tempData = {
        ...prevState,
        [name]: value
      }
      onValueChange?.(tempData)
      setCopied(false);
      localStorage.setItem('savedSettings',JSON.stringify(tempData));
      return tempData
    });
   
  }
  function splitUponUpperCase(text) {
    if (!text) return;
    const textArr = text.split(/(?=[A-Z])/);
    let [firstStr, ...rest] = textArr;
    firstStr = firstStr.charAt(0).toUpperCase() + firstStr.slice(1);
    return [firstStr, ...rest].join(" ");
  }
  const elementMap = (fd,e) => ({
    string:  <input className="input" name={e.element} value={fd[e.element]|| ''} onChange={(event)=>{handleChange(event,e)}} type="text" />,
    number: <input className="input" name={e.element}  value={fd[e.element]|| ''} onChange={(event)=>{handleChange(event,e)}} type="number" />,
    boolean:<input  name={e.element}  checked={fd[e.element]|| false} onChange={(event)=>{handleChange(event,e)}} type="checkbox" />,
  })
  function copyCode(){
    navigator.clipboard.writeText(JSON.stringify(formData));
    setCopied(true);
    setTimeout(()=>{
      setCopied(false);
    },1000)
  }
  function flushCache(){
    localStorage.removeItem('savedSettings');
    setClearCache(true);
    setTimeout(()=>{
      setClearCache(false);
    },1000)
  }
  return <>
  <div className={"flex flex-wrap m-4 mt-8 mb-8 "+styles.containerDiv } >

    <div className="mt-2 flex flex-wrap w-2/3 max-md:w-full">
    {elementSettings.map((e,i) =>{
        return <div className="mt-2 flex w-[410px] flex-wrap max-sm:justify-center" key={e.id+i}>
            <label className="label w-[200px] flex  sm:justify-end items-center  mr-2"  htmlFor={e.id}>{splitUponUpperCase(e.element)} :</label>
            <div className="w-[200px] items-center flex" >{elementMap(formData,e)[e.type]}</div>
          </div>
    })}
    </div>
    <div className="w-1/3 mt-5  max-md:w-full">
      <div className="border  border-gray-800 flex flex-col  p-5 mr-8 ">
      
        <div className="flex">      
        {(copied|| clearCache) && <p className=" text-green-800 "> { copied ? 'Copied to clipboard !!! ' : 'Cleared cache settings successfully!' }</p>}
        <button onClick={flushCache} className="ml-auto text-white bg-blue-500 rounded border border-blue-500 p-1">Clear Cache Settings</button>
        <button className="ml-2 text-blue-500">
          <span onClick={copyCode} className="material-icons">
            {copied ? 'done_all' :'content_copy'  }
            </span></button>
        </div>
        <pre className="overflow-auto mt-6"> {JSON.stringify(formData, null, 2) }</pre>
      </div>
    </div>
  </div>
  </>;
}
export default DynamicFormElement;