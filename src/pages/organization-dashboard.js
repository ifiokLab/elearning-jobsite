
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
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const OrganizationDashboard = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [jobs,setJobs] = useState([]);
    const [loading,setLoading] = useState(false);
    const user = useSelector((state) => state.user.user);

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    useEffect(() => {

    


        const fetchUserJobs = async () => {
        try {
            const response = await axios.get(`${apiUrl}/organization/job-list/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            //console.log(response.data.all_courses)
            setJobs(response.data.all_jobs);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user courses:', error);
            setLoading(false);
            setJobs([]);
        }
        };

        fetchUserJobs();
    }, []);
    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
            <div className='job-list-wrapper' id='organization-job-list' >
                {jobs.map((data)=>(
                    <div key={data.id} className = 'job-container'>
                        <div className='link-wrapper'>
                            <div className='title'>
                                {data.title}
                            </div>
                        
                            <div className='tab-wrapper-x'>
                                <div className='job-type'>
                                <Link to='/'>
                                        applicant(0)
                                </Link>
                                </div>
                                <div className='job-type'>
                                <Link to={`/interview-questions/${data.id}/create/`}>
                                        <span>Add Interview Questions</span>
                                </Link>
                                </div>
                            </div>
                            <div className='job-overview'>
                               {data.description}
                            </div>
                            <div className='elipsis-card' >
                                
                            </div>
                        </div>
                        
                    </div>
                ))}
                
               
            </div>
           
            
        </div>
        
       </div>
    )
};

export default OrganizationDashboard;