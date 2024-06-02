"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import {
  ideaEssencePromptFormatter,
  initialPayingPersonaPromptFormatter,
  otherPayingPersonaPromptFormatter,
  surveyGenerationPromptFormatter,
} from "@/utils/prompt";
import Divider from ".././components/divider";
import Card from ".././components/card";
import Snackbar from "../../components/snackbar";
import { useSnackbar } from "notistack";
import PersonaCard from ".././components/persona-card";
import { useRouter } from "next/navigation";
export default function IdeaEntry() {
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [ideaEssencePrompt, setIdeaEssencePrompt] = useState<{
    title: string;
    response: string;
  }>({
    title: "Idea Essence Prompt",
    response: "",
  });

  const router = useRouter();

  const fetchDataFromApi = async () => {
    try {
      const response = await axios.post("/api/openai", {
        prompt: "capital of united states",
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleIdeaEssencePrompt = async () => {
    setLoading(true);
    setIdeaEssencePrompt({
      ...ideaEssencePrompt,
      response: "",
    });


    try {
      const response = await axios.post("/api/openai", {
        prompt: ideaEssencePromptFormatter(text),
      });

      setIdeaEssencePrompt({
        ...ideaEssencePrompt,
        response: response.data.choices[0].message.content,
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  return (
    <div className="bg-white  text-black p-4 md:p-8 flex flex-col gap-4 min-h-[100vh]">
      <Snackbar />
      <h2 className="text-2xl font-bold text-purple-700 uppercase">
        Cofactory Trial Project -{" "}
        <span className="text-pink-500">Idea Essence</span>
      </h2>
      <Divider />
      <h4 className="text-xl font-bold ">ENTER YOUR IDEA</h4>
      <textarea
        className="w-full h-1/2  border-2 border-gray-400 rounded-xl p-4 md:-p8 "
        placeholder="Enter your text here"
        onChange={(e) => setText(e.target.value)}
        value={text}
      ></textarea>
      <div className="flex justify-end gap-4">
        {loading ? (
          <Loader />
        ) : (
          <button
            onClick={handleIdeaEssencePrompt}
            className="bg-purple-700 text-white p-4 rounded-xl"
          >
            {ideaEssencePrompt.response
              ? "REGENERATE IDEA ESSENCE"
              : "GENERATE IDEA ESSENCE"}
          </button>
        )}

        {ideaEssencePrompt.response && (
          <button
            onClick={() => {
              enqueueSnackbar("Generating questions", { variant: "success" });
              localStorage.setItem("ideaEssence", ideaEssencePrompt.response);
              router.push("/survey-reveal");
            }}
            className="bg-purple-700 text-white p-4 rounded-xl "
          >
            NEXT
          </button>
        )}
      </div>

      {ideaEssencePrompt.response && <Divider />}

      {ideaEssencePrompt.response && (
        <Card
          title={ideaEssencePrompt.title}
          response={ideaEssencePrompt.response}
        />
      )}
    </div>
  );
}
