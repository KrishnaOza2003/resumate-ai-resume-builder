import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import ResumeCardItem from './components/ResumeCardItem';
import GlobalApi from '../../service/GlobalApi';

function Dashboard() {
  const { user, isLoaded } = useUser();
  const [resumeList, setResumeList] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    user && GetResumesList();
    console.log("User loaded?", isLoaded);
    console.log("User object:", user);

  }, [user])


  const GetResumesList = () => {
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    if (!userEmail) {
      console.log("No user email found, skipping API call.");
      setLoading(false);
      return;
    }

    setLoading(true);

    GlobalApi.GetUserResumes(userEmail)
      .then(res => {
        // console.log("API Response:", res?.data);
        setResumeList(res?.data?.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.log("Error fetching resumes:", error);
        setLoading(false);
      });
  };



  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start crafting your AI - powered Resume & land your Next Dream Job!</p>
      <div className='grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-5 gap-5
      mt-10
      '>
        <AddResume />
        {loading ?
          [1, 2, 3].map((item, index) => (
            <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>
            </div>
          )) : resumeList.length > 0 && resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
          ))
        }

      </div>
    </div>
  )
}

export default Dashboard

