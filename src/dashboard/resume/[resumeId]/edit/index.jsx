import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalApi from '../../../../../service/GlobalApi';

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then(resp => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    })
  }

  useEffect(() => {
    GetResumeInfo();
  }, []);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className=' grid grid-cols-1 md:grid-cols-2 p-10 gap-10 '>
        {/* Form Section  */}
        <FormSection />

        {/* PreView Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume