

import React,{useState,useEffect} from 'react'


const DynamicFormElement = ({elementSettings,onValueChange}) =>{
  const [formData, setFormData] = useState({});
  useEffect(()=>{
    const form = elementSettings.reduce((prev,curr)=>
       ({...prev,[curr.element]:curr.defaultValue ?? ''})
    ,{})
    console.log(form);
    setFormData(form);
  },[])
  function handleChange(event,elem){
    // const {name,value} = e.target;
    // console.log(event);
    const {type} = elem;
    let { name, value, checked } = event.target;
    if(type === 'boolean') value =  checked;
    if(type === 'number') value = parseInt(value);
    // console.log(e)
    // console.log(name,value)
    setFormData(prevState => {
      const tempData = {
        ...prevState,
        [name]: value
      }
      onValueChange?.(tempData)
      return tempData
    });
   
  }
  const elementMap = (fd,e) => ({
    string:  <input name={e.element} value={fd[e.element]} onChange={(event)=>{handleChange(event,e)}} type="text" />,
    number: <input name={e.element}  value={fd[e.element]} onChange={(event)=>{handleChange(event,e)}} type="number" />,
    boolean:<input name={e.element}  checked={fd[e.element]} onChange={(event)=>{handleChange(event,e)}} type="checkbox" /> 
  })
  return <>
    {elementSettings.map((e,i) =>{
        return <>
          <div key={e.id}>
            <label htmlFor={e.id}>{e.element}</label>
            {elementMap(formData,e)[e.type]}
          </div>
      </>
    })}
  </>;
}
export default DynamicFormElement;