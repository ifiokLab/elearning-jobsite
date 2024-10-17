
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/organization-dashboard.css';
import '../styles/applicants.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const Applicants = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loading,setLoading] = useState(true);

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [inviteModal,setInviteModal] = useState(false);

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    const toggleInviteModal = ()=>{
        setInviteModal(!inviteModal);
    };
    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
            <div className='job-list-wrapper' id='organization-job-list' >
                <table>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Cover Letter</th>
                        <th>Resume</th>
                        <th>Interested?</th>
                        
                        {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr >
                            <td>#</td>
                            <td>2</td>
                            <td>3</td>
                        
                            <td>4</td>
                            <td>5</td>
                        
    
                            
                            <td>
                                <div onClick={toggleInviteModal}>Message</div>
                            </td>
                           
                            
                        
                        </tr>
                        
                    </tbody>
                </table>
            </div>
           
            
        </div>
        <form className={`organization-form ${inviteModal ? 'show' : ''} `}  >
                <div className='form-wrapper'>
                    <div className='form-header-x'>
                        <div className='title'>Send Email to interview</div>
                        <div className='icon' onClick={toggleInviteModal}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        
                        <div className={`form-group ${title ? 'active' : ''}`}>
                            <input id="title" value={title}  onChange={(e) => setTitle(e.target.value)} required />
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className={`form-group ${content ? 'active' : ''}`}>
                            <textarea id="content" value={content}  onChange={(e) => setContent(e.target.value)} required></textarea>
                        
                            <label htmlFor="content">Description</label>
                        </div>
                    
                     
                        
                       
                        
                        
                        

                        <div className='btn-wrapper'>
                            <button type="submit">
                                send email
                                {isLoading ? <div className="loader"></div> : '' }
                                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        
       </div>
    )
};

export default Applicants;