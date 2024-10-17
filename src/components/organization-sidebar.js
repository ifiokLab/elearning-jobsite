import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import 'swiper/swiper-bundle.css';

import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/organization-sidebar.css';

const OrganizationSidebar = ({ className,toggleSidebar })=>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen,setsidebarOpen] = useState(false);
    
    const [subCategory,setsubCategory] = useState('');
    const navigate = useNavigate()
    
    
    return(
        <div  className={`organization-sidebar ${className}`}>
            <div className = "box-a">
                <div className='header-tab'>
                    <div className='text'>
                        Logo
                    </div>
                    <div className='icon' onClick ={toggleSidebar}>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <Link to = "" className = "tabs" >
                    <div className='icon'>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <div className='text'>Create jobs</div>
                </Link>
                <Link to = "" className = "tabs" >
                    <div className='icon'>
                        <i class="fa-solid fa-briefcase"></i>
                    </div>
                    <div className='text'>Jobs</div>
                </Link>
                <Link to = "" className = "tabs" >
                    <div className='icon'>
                        <i class="fa-solid fa-user-group"></i>
                    </div>
                    <div className='text'>Employees</div>
                </Link>
                <Link to = "" className = "tabs" >
                    <div className='icon'>
                        <i class="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div className='text'>Courses</div>
                </Link>
            </div>
            <div className='box-b'>
                <Link to = "" className = "tabs" >
                    <div className='icon'>
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </div>
                    <div className='text'>Logout</div>
                </Link>
            </div>

        </div>
    );
};

export default OrganizationSidebar;