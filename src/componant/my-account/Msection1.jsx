import React,{useState} from 'react'
import './Msection1.css'

const Msection1=()=> {
    // login 
    const [email,setemail]=useState("")
    const [password,setpassword]=useState('')

    // register 
    const [firstname , setfirstname]=useState=('')
    const [lastname , setlastname]=useState('')

return (
    <div className='msec1'>
        <div className='login'>

        </div>
        <div className='register'></div>
    </div>
)
}

export default Msection1