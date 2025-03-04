import React from 'react'
import './Bsection1.css'
const Bsection1=()=> {
return (
    <div className="blogmain">
        <div className='blogposts'>
            <div className='blogpost'>
                <img src="/imgs/Rectangle 68 (3).png" alt='...'/>
                <div className='blog1'>
                    <span> <i class="fa-solid fa-user"></i>Admin</span>
                    <span><i class="fa-solid fa-calendar"></i>14 Oct 2022</span>
                    <span><i class="fa-solid fa-tag"></i>Wood</span>
                </div>
                <div className='blogdescription'>
                    <h2>Going all-in with millennial design</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.</p>
                </div>
                <button>Read more</button>
            </div>
            <div className='blogpost'>
                <img src="/imgs/Rectangle 68.png" alt='...'/>
                <div className='blog1'>
                    <span> <i class="fa-solid fa-user"></i>Admin</span>
                    <span><i class="fa-solid fa-calendar"></i>14 Oct 2022</span>
                    <span><i class="fa-solid fa-tag"></i>Wood</span>
                </div>
                <div className='blogdescription'>
                    <h2>Exploring new ways of decorating</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.</p>
                </div>
                <button>Read more</button>
            </div>
            <div className='blogpost'>
                <img src="/imgs/Rectangle 68 (2).png" alt='...'/>
                <div className='blog1'>
                    <span> <i class="fa-solid fa-user"></i>Admin</span>
                    <span><i class="fa-solid fa-calendar"></i>14 Oct 2022</span>
                    <span><i class="fa-solid fa-tag"></i>Wood</span>
                </div>
                <div className='blogdescription'>
                    <h2>Handmade pieces that took time to make</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.</p>
                </div>
                <button>Read more</button>
            </div>
        </div>
        <div className='sidebar'>
        <div className="search-box">
                <input type="text"  />
                <button><i className="fa fa-search"></i></button>
            </div>
            <div className="categories">
                <h3>Categories</h3>
                <ul>
                    <li>Crafts <span>2</span></li>
                    <li>Design <span>8</span></li>
                    <li>Handmade <span>7</span></li>
                    <li>Interior <span>1</span></li>
                    <li>Wood <span>6</span></li>
                </ul>
            </div>
            <div className="recent-posts">
                <h3>Recent Posts</h3>
                <div className='recent-postsdivs'id='blog1'>
                    <img src="/imgs/Rectangle 69.png" alt='...'/>
                    <div>
                    <p>Going all-in with millennial design</p> 
                    <span>03 Aug 2022</span>
                    </div>
                </div>
                <div className='recent-postsdivs'>
                    <img src="/imgs/Rectangle 69 (1).png" alt='...'/>
                    <div>
                    <p>Exploring new ways of decorating </p>
                    <span>03 Aug 2022</span>
                    </div>
                </div>
                <div className='recent-postsdivs'>
                    <img src="/imgs/Rectangle 69 (2).png" alt='...'/>
                    <div>
                    <p>Handmade pieces that took time to make </p>
                    <span>03 Aug 2022</span>
                    </div>
                </div>
                <div className='recent-postsdivs'>
                    <img src="/imgs/Rectangle 69 (3).png" alt='...'/>
                    <div>
                    <p>Modern home in Milan</p>
                    <span>03 Aug 2022</span>
                    </div>
                </div>
                <div className='recent-postsdivs'>
                    <img src="/imgs/Rectangle 69 (4).png" alt='...'/>
                    <div>
                    <p>Colorful office redesign</p>
                    <span>03 Aug 2022</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default Bsection1