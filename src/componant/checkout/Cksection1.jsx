import React from 'react'
import './Cksection1.css'

const Cksection1=()=> {
return (
    <div className='cksec1'>
        <form>
            <h2>Billing details</h2>
            <label>First Name</label>
            <input type='text'></input>
            <label>Last Name</label>
            <input type='text'></input>
            <label>Company Name (Optional)</label>
            <input type='text'></input>
            <label>Country / Region</label>
            <input type='text' placeholder='Egypt'></input>
            <label>Street address</label>
            <input type='text'></input>
            <label>Town / City</label>
            <input type='text'></input>
            <label>Province</label>
            <input type='text' placeholder='Western Province'></input>
            <label>ZIP code</label>
            <input type='text'></input>
            <label>Phone</label>
            <input type='number'></input>
            <label>Email address</label>
            <input type='email'></input>
        </form>
    </div>
)
}

export default Cksection1