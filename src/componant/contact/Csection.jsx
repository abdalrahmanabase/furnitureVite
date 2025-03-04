import React from 'react'
import './Csection.css'

const Csection=()=> {
return (
    <div className='csec'>
        <h2>Get In Touch With Us</h2>
        <p>For More Information About Our Product & Services. Please Feel Free To Drop Us<br/> An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>

        <div className='ccont'>
            <div className='infocont'>
                <div className='infoincont'>
                <i class="fa-solid fa-location-dot"></i>
                    <div className='cinfo'>
                        <h6>Address</h6>
                        <p>236 5th SE Avenue,<br/> New York NY10000, <br/> United States</p>
                    </div>
                </div>
                <div className='infoincont'>
                <i class="fa-solid fa-phone"></i>
                    <div className='cinfo'>
                        <h6>Phone</h6>
                        <p>Mobile: +(84) 546-6789 <br/>  Hotline: +(84) 456-6789</p>
                    </div>
                </div>
                <div className='infoincont'>
                <i class="fa-solid fa-clock"></i>
                    <div className='cinfo'> 
                        <h6>Working Time</h6>
                        <p>Monday-Friday: 9:00 - 22:00 <br/> Saturday-Sunday: 9:00 - 21:00</p>
                    </div>
                </div>
            </div>
            <div className='cformcont'>
                <form>
                    <label>Your name</label>
                        <input type="text" placeholder='ABC'/>
                    <label>Email Address</label>
                        <input type="email" placeholder='Abc@def.com'/>
                    <label>Message</label>
                        <input type="text" placeholder='This is an optional'/>
                    <label>Message</label>
                        <input type="textarea" style={{padding:'10% 3%'}} placeholder='Hi! i’d like to ask about'/>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    </div>
)
}

export default Csection