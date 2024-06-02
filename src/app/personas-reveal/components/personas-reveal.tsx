import Divider from "@/app/components/divider";
import PersonaCard from "@/app/components/persona-card";
import SplashScreen from "@/components/splash/splash";
import {
  initialPayingPersonaPromptFormatter,
  otherPayingPersonaPromptFormatter,
} from "@/utils/prompt";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const PersonasReveal = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [currentPersona, setCurrentPersona] = React.useState(0);
  const [ideaEssencePrompt, setIdeaEssencePrompt] = React.useState<string>("");
  const [payingPersonaPrompt, setPayingPersonaPrompt] = useState<
    {
      name: string;
      age: string;
      jobTitle: string;
      company: string;
      industry: string;
      companySize: string;
      location: string;
      background: string;
      image: string;
    }[]
  >([]);

  useEffect(() => {
    const ideaEssencTemp = localStorage.getItem("ideaEssence");
    if (ideaEssencTemp) {
      setIdeaEssencePrompt(ideaEssencTemp);
      handleInitialPayingPersonaPrompt();
    } else {
      router.push("/");
    }
  }, []);

  const handleInitialPayingPersonaPrompt = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/openai", {
        prompt: initialPayingPersonaPromptFormatter(ideaEssencePrompt),
      });

      const temp = JSON.parse(response.data.choices[0].message.content);
      setPayingPersonaPrompt([
        {
          name: temp.name,
          age: temp.age,
          jobTitle: temp.jobTitle,
          company: temp.company,
          industry: temp.industry,
          companySize: temp.companySize,
          location: temp.location,
          background: temp.background,
          image: temp.image,
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SplashScreen title="Generating Personas" />;
  }

  const handleOtherPayingPersonaPrompt = async (total: number) => {
    //call api multiple times
    try {
      setLoading(true);
      const promises: Promise<any>[] = [];
      Array.from({ length: total }).forEach(async () => {
        promises.push(
          axios.post("/api/openai", {
            prompt: otherPayingPersonaPromptFormatter(ideaEssencePrompt),
          })
        );
      });
      const response = await Promise.all(promises);
      response.forEach((res) => {
        const temp = JSON.parse(res.data.choices[0].message.content);
        setPayingPersonaPrompt((prev) => [
          ...prev,
          {
            name: temp.name,
            age: temp.age,
            jobTitle: temp.jobTitle,
            company: temp.company,
            industry: temp.industry,
            companySize: temp.companySize,
            location: temp.location,
            background: temp.background,
            image: temp.image,
          },
        ]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white  text-black p-4 md:p-8 flex flex-col gap-4 min-h-[100vh]">
      <h2 className="text-2xl font-bold text-purple-700 uppercase">
        Cofactory Trial Project -{" "}
        <span className="text-pink-500">Personas Reveal</span>
      </h2>
      <Divider />
      <div className="flex gap-4 justify-center">
        {payingPersonaPrompt.length > 0 && (
          <button
            className="bg-purple-700 w-fit  p-4 rounded-xl text-white"
            onClick={() => {
              // enqueueSnackbar("Generating personas", { variant: "success" });
              if (payingPersonaPrompt.length > 4) {
                setPayingPersonaPrompt([]);
                handleOtherPayingPersonaPrompt(5);
                return;
              }
              handleOtherPayingPersonaPrompt(4);
            }}
          >
            {payingPersonaPrompt.length > 4
              ? "REGENERATE PERSONAS"
              : "GENERATE MORE PERSONAS"}
          </button>
        )}

        {payingPersonaPrompt.length > 4 && (
          <button
            onClick={() => {
              // enqueueSnackbar("Generating questions", { variant: "success" });
              // handleSurveyGenerationPrompt(ideaEssencePrompt.response);
              // localStorage.setItem("surveyReveal", surveyGenerationPrompt.response);
              localStorage.setItem(
                "payingPersonaReveal",
                JSON.stringify(payingPersonaPrompt)
              );
              router.push("/results");
            }}
            className="bg-purple-700 text-white p-4 rounded-xl "
          >
            NEXT
          </button>
        )}
      </div>

      {payingPersonaPrompt.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-center text-purple-700 uppercase">
            HERE ARE THE DETAILS OF THE PERSONA WHO CAN ANSWER THEM
          </h2>
          <div className="flex gap-4 justify-center items-center">
          
          {payingPersonaPrompt.length > 1 && (
            <button
              onClick={() => {
                if (currentPersona > 0) {
                  setCurrentPersona(currentPersona - 1);
                }
              }}
              className="min-w-12 min-h-12 bg-purple-500 text-white shadow-xl flex justify-center items-center text-xl rounded-xl p-2"
            >
              PREV
            </button>
            )}
            <h4 className="text-xl font-bold text-center text-pink-500">
            Current Persona: {currentPersona + 1}
          </h4>
              {payingPersonaPrompt.length > 1 && (
            <button
              onClick={() => {
                if (currentPersona < payingPersonaPrompt.length - 1) {
                  setCurrentPersona(currentPersona + 1);
                }
              }}
              className="min-w-12 min-h-12 bg-purple-500 text-white shadow-xl flex justify-center items-center text-xl rounded-xl p-2"
            >
              NEXT
            </button>
            )}

          </div>
         
          <div className="flex gap-4 md:gap-8 items-center justify-center">
            

            <PersonaCard index={currentPersona} item={payingPersonaPrompt[currentPersona]} />
          
          </div>
        </>
      )}
    </div>
  );
};

export default PersonasReveal;
