import Divider from "@/app/components/divider";
import SplashScreen from "@/components/splash/splash";
import { personasRevealImages } from "@/utils/images";
import {
  individualResultsAggregatorPromptFormatter,
  overallResultsAggregatorPromptFormatter,
  surveyResponseGenerationPromptFormatter,
} from "@/utils/prompt";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Results = () => {
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const [result, setResult] = React.useState<string>("");
  const [overallResultsAggregatePrompt, setOverallResultsAggregatePrompt] =
    useState<string>("");
  const [
    individualQuestionResultsAggregatePrompt,
    setIndividualQuestionResultsAggregatePrompt,
  ] = useState<string>("");
  const [individualResults, setIndividualResults] = React.useState<string[]>(
    []
  );
  const [surveyGenerationPrompt, setSurveyGenerationPrompt] =
    React.useState<string>(""); // [1]
  const [payingPersonaPrompt, setPayingPersonaPrompt] = React.useState<
    {
      name: string;
      age: string;
      jobTitle: string;
      company: string;
      industry: string;
      companySize: string;
      location: string;
      background: string;
    }[]
  >([]);

  useEffect(() => {
    const surveyGenerationTemp = localStorage.getItem("surveyReveal"); // [2]
    if (surveyGenerationTemp) {
      setSurveyGenerationPrompt(surveyGenerationTemp);
    } else {
      router.push("/");
    }
    const payingPersonaTemp = localStorage.getItem("payingPersonaReveal"); // [3]
    if (payingPersonaTemp) {
      setPayingPersonaPrompt(JSON.parse(payingPersonaTemp));
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (surveyGenerationPrompt && payingPersonaPrompt) {
      generateIndvidualResutls();
    }
  }, [surveyGenerationPrompt, payingPersonaPrompt]);

  const overallResultsAggregatorHandler = async (temp: any) => {
    try {
      const response = await axios.post("/api/openai", {
        prompt: overallResultsAggregatorPromptFormatter(temp),
      });
      setOverallResultsAggregatePrompt(
        response.data.choices[0].message.content
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const individualQuestionResultsAggregatorHandler = async (temp: any) => {
    try {
      const response = await axios.post("/api/openai", {
        prompt: individualResultsAggregatorPromptFormatter(temp),
      });
      setIndividualQuestionResultsAggregatePrompt(
        response.data.choices[0].message.content
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateIndvidualResutls = async () => {
    try {
      const promises: Promise<any>[] = [];
      payingPersonaPrompt.forEach(async (persona, index) => {
        promises.push(
          axios.post("/api/openai", {
            prompt: surveyResponseGenerationPromptFormatter(
              persona,
              surveyGenerationPrompt
            ),
          })
        );
      });
      const responses = await Promise.all(promises);
      const temp = responses.map(
        (response) => response.data.choices[0].message.content
      );
      setIndividualResults(temp);

      overallResultsAggregatorHandler(temp);
      individualQuestionResultsAggregatorHandler(temp);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  if (loading) {
    return <SplashScreen title="Generating Results" />;
  }

  return (
    <div className="bg-white  text-black p-4 md:p-8 flex flex-col gap-4 min-h-[100vh]">
      <h2 className="text-2xl font-bold text-purple-700 uppercase">
        Cofactory Trial Project - <span className="text-pink-500">Results</span>
      </h2>
      <Divider />
      <h2 className="text-xl font-bold text-purple-700 uppercase">
        Overall Results
      </h2>
      <textarea
        className="w-full h-96 p-4 border border-gray-300 rounded-lg"
        value={overallResultsAggregatePrompt}
        readOnly
      />
      <Divider />

      <h2 className="text-xl font-bold text-purple-700 uppercase">
        Aggregated Individual Results
      </h2>
      <textarea
        className="w-full h-96 p-4 border border-gray-300 rounded-lg"
        value={individualQuestionResultsAggregatePrompt}
        readOnly
      />
      <Divider />

      <h2 className="text-xl font-bold text-purple-700 uppercase">
        Individual Results
      </h2>

      {individualResults.map((result, index) => (
        <>
          <div className="flex  gap-4 my-4">
            <div className="h-40 w-40 bg-purple bg-purple-700 rounded-full overflow-hidden">
              <Image
                src={personasRevealImages(index)}
                alt={payingPersonaPrompt[index].name}
                width={160}
                height={160}
              />
            </div>
            <div>
              <h4 className="text-lg font-bold text-pink-500">
                NAME : {payingPersonaPrompt[index].name}
              </h4>
              <h4 className="text-lg font-bold text-pink-500">
                JOB TITLE : {payingPersonaPrompt[index].jobTitle}
              </h4>
            </div>
          </div>
          <textarea
            className="w-full h-96 p-4 border border-gray-300 rounded-lg"
            value={result}
            readOnly
          />
        </>
      ))}

      <div className="flex justify-center mt-10 ">
        <button className="bg-purple-500 p-4 text-white" onClick={()=>{
          localStorage.removeItem('surveyReveal');
          localStorage.removeItem('payingPersonaReveal');
          localStorage.removeItem('ideaEssence');
          router.push('/');
        
        }} >RESTART</button>
      </div>
    </div>
  );
};

export default Results;
