import { personasRevealImages } from "@/utils/images";
import Image from "next/image";
import React from "react";

interface PersonaCardProps {
  item: {
    name: string;
    age: string;
    jobTitle: string;
    company: string;
    industry: string;
    companySize: string;
    location: string;
    background: string;
    image: string;
  },
  index: number
}

const PersonaCard = ({ item,index }: PersonaCardProps) => {
  const imageString: string = personasRevealImages(index);
  return (
    <div className="flex flex-col md:flex-row md:w-[60%] bg-purple-500 p-4 md:p-8 gap-4  rounded-xl ">
      <div>
        <div className="w-40 h-40 rounded-full bg-white overflow-hidden">
          <Image src={imageString} alt={item.name} width={160} height={160} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl  text-white ">Name: {item.name}</p>
        <p className="text-xl  text-white ">Age: {item.age}</p>
        <p className="text-xl  text-white ">Job Title: {item.jobTitle}</p>
        <p className="text-xl  text-white ">Company: {item.company}</p>
        <p className="text-xl  text-white ">Industry: {item.industry}</p>
        <p className="text-xl  text-white ">Company Size: {item.companySize}</p>
        <p className="text-xl  text-white ">Location: {item.location}</p>
        <p className="text-xl  text-white ">Background: {item.background}</p>
      </div>
    </div>
  );
};
export default PersonaCard;
