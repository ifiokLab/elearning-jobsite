
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/job-application.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import JobHeader from '../components/job-header';

const JobApplication = ()=>{
    const [job,setJob] = useState('');
    const [letter,setLetter] = useState('');
    const [loading,setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const [currentStep, setCurrentStep] = useState(1);
    const { Id,title } = useParams();
    const [resume, setResume] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
      };
    
      const renderText = (text) => {
        if (isExpanded || text.length <= 10) {
          return text;
        }
        return text.substring(0, 10) + '...';
      };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        if (file && file.type === 'application/pdf' || file.type === 'application/msword') {
            const reader = new FileReader();
            //reader.readAsDataURL(file);
            setResume(file);
        } else {
            console.error('Invalid file type or no file selected.');
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };
    const renderStep = () => {
        switch(currentStep) {
            case 1:
                return (
                    <>
                        <div className = "input-tab-box">
                            <div className='div-label'>Cover Letter*</div>
                            <textarea
                                name="letter"
                                placeholder="Cover Letter"
                                value={letter}
                                onChange={(e)=>setLetter(e.target.value)}
                             />
                           
                        </div>
                        <div className='input-tab-box'>
                            <div  className='div-label'>Resume*</div>
                            <input
                                type="file"
                                id="thumbnail"
                                name="thumbnail"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <h2>Answer these questions from the employer</h2>
                        <div className = "input-tab-box">
                            <div className='div-label'>Cover Letter*</div>
                            <textarea
                                name="letter"
                                placeholder="Cover Letter"
                                value={letter}
                                onChange={(e)=>setLetter(e.target.value)}
                            />
                        
                        </div>
                        <div className='input-tab-box'>
                            <div  className='div-label'>Resume*</div>
                            <input
                                type="file"
                                id="thumbnail"
                                name="thumbnail"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                     </>
                );
          
            default:
                return null;
        }
    };

    const renderProgressBar = () => {
        const steps = 2;
        const progress = (currentStep / steps) * 100;
        return (
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
        );
    };
    
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`${apiUrl}/job/${Id}/detail/`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                         // Include the user ID in the Authorization header
                    },
                });
                //console.log(response.data.all_courses)
                setJob(response.data.job_data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user courses:', error);
                setLoading(false);
                setJob([]);
            }
        };

        fetchJob();
    }, []);

    return(
       <div class = 'home-wrapper'>
        <JobHeader />
        <div className='jobs-body'>
           <div className='job-box-wrapper' >
                <div className='box-1'>
                    <div className='form-wrapper'>
                    
                        <form onSubmit=''>
                            <h2>Application</h2>
                            {renderProgressBar()}
                            {renderStep()}
                            {currentStep > 1 && <button type="button" onClick={prevStep} className = "prev-btn" >Previous</button>}
                            {currentStep < 2 && <button type="button" onClick={nextStep} className = "next-btn" >Next</button>}
                            {currentStep === 2 && <button type="submit" className = "next-btn">
                                Submit
                                {isLoading ? <div className="loader"></div> : '' }
                            </button>}
                        </form>
                    </div>
                </div>
                <div className='box-2'>
                    <div className = "header-tab" >
                        <h4>{job.title}</h4>
                        <div className='company'>{job.company} - {job.country}</div>
                        <p>
                            <p>{renderText(`${job.description}`)}</p>
                        </p>
                        <div className='toggle-btn'>
                            <button onClick={toggleExpand}>
                                {isExpanded ? 'View Less' : 'View More'}
                            </button>
                        </div>
                    </div>
                </div>
           </div>
           
        </div>
        
       </div>
    )
};

export default  JobApplication;