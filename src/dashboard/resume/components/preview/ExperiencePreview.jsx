import React from 'react'

function ExperiencePreview({ resumeInfo }) {
    const processHtml = (html) => {
        if (!html) return ''; // Handle empty strings

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Add classes to ol elements
        const olElements = doc.querySelectorAll('ol');
        olElements.forEach((ol) => {
            ol.classList.add('list-decimal', 'list-inside');
        });

        // Add classes to ul elements
        const ulElements = doc.querySelectorAll('ul');
        ulElements.forEach((ul) => {
            ul.classList.add('list-disc', 'list-inside');
        });

        return doc.body.innerHTML;
    };

    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Professional Experience</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            {resumeInfo?.experience?.map((experience, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-sm font-bold'
                        style={{
                            color: resumeInfo?.themeColor
                        }}>{experience?.title}</h2>
                    <h2 className='text-xs flex justify-between'>{experience?.companyName}, {' '}
                        {experience?.city}, {' '}
                        {experience?.state}
                        <span><i>{experience?.startDate}</i> To <i> {experience?.currentlyWorking ? 'Present' : experience.endDate} </i> </span>
                    </h2>
                    <p
                        className="text-xs my-2"
                        dangerouslySetInnerHTML={{ __html: processHtml(experience?.workSummery) }}
                    />
                </div>
            ))}
        </div>
    )
}

export default ExperiencePreview