import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStyles, BtnUnderline, BtnUndo, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AIChatSession } from '../../../../service/AIModal';


const PROMPT = 'position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false);

    const GenerateSummeryFromAI = async () => {
        if (!resumeInfo?.experience[index]?.title) {
            toast('Please Add Position Title');
            return;
        }

        setLoading(true);
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

        try {
            const result = await AIChatSession.sendMessage(prompt);
            const resp = result.response.text();

            // Remove Markdown formatting (``````)
            const cleanResponse = resp.replace(/^``````$/, '');

            setValue(cleanResponse); // Update content in RichTextEditor
            onRichTextEditorChange({ target: { value: cleanResponse } }); // Trigger immediate update for ExperiencePreview
        } catch (error) {
            console.error('Error generating summary:', error);
            toast('Failed to generate summary');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-sm'>Summary</label>
                <Button variant="outline" size="sm"
                    onClick={GenerateSummeryFromAI}
                    disabled={loading}
                    className="flex gap-2 border-primary text-primary">
                    {loading ?
                        <LoaderCircle className='animate-spin' /> :
                        <>
                            <Brain className='h-4 w-4' /> Generate from AI
                        </>
                    }
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e)
                }}
                >

                    <Toolbar>

                        <BtnUndo />
                        <BtnRedo />

                        <Separator />

                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />

                        <Separator />

                        <BtnNumberedList />
                        <BtnBulletList />

                        <Separator />

                        <BtnLink />

                    </Toolbar>

                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor