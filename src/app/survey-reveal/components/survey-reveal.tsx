import React, { useEffect } from 'react'
import {useState} from 'react'
import axios from 'axios';
import { surveyGenerationPromptFormatter } from '@/utils/prompt';
import Divider from '@/app/components/divider';
import Card from '@/app/components/card';
import SplashScreen from '@/components/splash/splash';
import { useRouter } from 'next/navigation';

const SurveyReval = () => {
  const router=useRouter();
  const [loading, setLoading] = React.useState(false);
  const [ideaEssencePrompt, setIdeaEssencePrompt] = useState<string>("");
  const [surveyGenerationPrompt, setSurveyGenerationPrompt] = useState<{
    title: string;
    response: string;
  }>({
    title: "Survey Generation Prompt",
    response: "",
  });

  const handleSurveyGenerationPrompt = async (text: string) => {
    if (!text) {
      window.alert("Please enter a valid text");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/openai", {
        prompt: surveyGenerationPromptFormatter(text),
      });

      setSurveyGenerationPrompt({
        ...surveyGenerationPrompt,
        response: response.data.choices[0].message.content,
      });

    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
    
    
  };

  useEffect(() => {
    const ideaEssence=localStorage.getItem('ideaEssence')
    if(ideaEssence){
      setIdeaEssencePrompt(ideaEssence)
      handleSurveyGenerationPrompt(ideaEssence)
    }
    else{
      router.push('/');
    }
  }
  ,[])

  if(loading){
    return <SplashScreen
    title='Generating Survey Questions'
    />
  }

  return (
   
    <div className="bg-white  text-black p-4 md:p-8 flex flex-col gap-4 min-h-[100vh]">
       <h2 className="text-2xl font-bold text-purple-700 uppercase">
        Cofactory Trial Project - <span className="text-pink-500">Survey Reveal</span>
      </h2>
      <Divider />

      <div className="flex justify-end gap-4">

        {surveyGenerationPrompt.response && (
          <button
            onClick={()=>handleSurveyGenerationPrompt(ideaEssencePrompt)}
            className="bg-purple-700 text-white p-4 rounded-xl"
          >
            REGENERATE SURVEY
          </button>
        )}

        {surveyGenerationPrompt.response && (
          <button
            onClick={() => {
              localStorage.setItem("surveyReveal", surveyGenerationPrompt.response);
              router.push("/personas-reveal");
            }}
            className="bg-purple-700 text-white p-4 rounded-xl "
          >
            NEXT
          </button>
        )}
      </div>
    {surveyGenerationPrompt.response && (
        <Card
          title={surveyGenerationPrompt.title}
          response={surveyGenerationPrompt.response}
        />
      )}
   </div>
  )
}

export default SurveyReval