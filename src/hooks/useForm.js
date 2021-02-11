import  { useState } from 'react'

export const useForm = (initialState ={}) => {

    const [Form, setForm] = useState(initialState);

    const reseTxt =(newSateForm = initialState)=>{
        setForm (newSateForm);
    }
    const handleInputChange = ({target}) =>{
        setForm( {
            ...Form,
            [target.name]: target.value
        })
    }

    return [Form,handleInputChange,reseTxt];
    
}
