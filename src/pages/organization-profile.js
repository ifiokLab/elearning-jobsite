
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/organization-profile.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const OrganizationProfile = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
            <div className='dashboard-container' >
                <div className='profile-wrapper'>
                    <div className = "profile-container">
                        <div className='profile-header'>
                            <i class="fa-solid fa-user"></i>
                            <span>Profile</span>
                        </div>
                        <div className='profile-tab'>
                            <div className='title'>Name</div>
                            <div className='text'>Ifiok Udoh</div>
                        </div>
                        <div className='profile-tab'>
                            <div className='title'>Email</div>
                            <div className='text'>ifiokudoh6@gmail.com</div>
                        </div>
                    </div>
                </div>
            </div>
           
            
        </div>
        
       </div>
    )
};

export default OrganizationProfile;