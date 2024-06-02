export const ideaEssencePromptFormatter = (message: String) => {
  const str = `You are a startup idea consultant, and you have a critical role to play in my success.

    I will share a business idea. Your goal is to help me generate a "product brief" that describes key details about the product. The fields I want are below. I want the response in a JSON format.
    
    ${message}
    
    Please brainstorm the details of this business idea and output the results in the following JSON
    format:
    
    {
      name: string;
      oneLineLiteralDescription: string;
      uniqueSellingPoint: string;
      problemStatement: string;
      solution: string;
      coreFeatures: string[];
    }
    
    For example:
    
    {
      "name": "EcoGreen Delivery",
      "oneLineLiteralDescription": "Zero-emission last-mile delivery service using electric vehicles and cargo bikes.",
      "uniqueSellingPoint": "Eco-friendly, fast, and reliable delivery for businesses and consumers.",
      "problemStatement": "Last-mile delivery contributes significantly to urban air pollution and traffic congestion.",
      "solution": "Provide a sustainable, efficient, and cost-effective last-mile delivery solution using electric vehicles and cargo bikes.",
      "coreFeatures": [
        "Fleet of electric vans and cargo bikes",
        "Mobile app for ordering and tracking deliveries",
        "Integration with existing logistics platforms"
      ]
    }
    
    Do not include any explanations, preamble, or other text before the JSON output
    `;

  return str;
};

export const surveyGenerationPromptFormatter = (message: String) => {
  const str = `You are an expert in evaluating product market fit. Given the ${message}, I want you to generate me a set of questions that will help me assess whether this idea has product market fit. I want it in the form of a survey, where there are different clearly labeled sections, and 3-5 questions per section. We will refer to this as the survey. Ensure there are at least 3 questions assessing willingness to pay.`;

  return str;
};


export const initialPayingPersonaPromptFormatter = (message: String) => {
  const str=`You are a user researcher, skilled in creating user personas. Given the ${message}, generate me a user persona of someone who would want to pay for this product.
   Give me the following details in a JSON format:
   name,
   age,
   jobTitle,
   company,
   industry,
   companySize,
   location,
   background,
   image (image URL of a stock photo that represents this person use https://pixabay.com/ for free stock photos)

  `
  return str;
}

export const otherPayingPersonaPromptFormatter = (message: String) => {
  const str=`Thank you for that last persona! I want you to generate another persona that also would pay for this ${message}, that is a slightly different archetype / sub-persona than the last persona you helped me generate.
   Give me the following details in a JSON format:
   name,
   age,
   jobTitle,
   company,
   industry,
   companySize,
   location,
   background,
   image (image URL of a stock photo that represents this person use https://pixabay.com/ for free stock photos)

  `
  return str;
}

export const surveyResponseGenerationPromptFormatter = (persona: any,survey:string) => {
  const str=`Have persona ${JSON.stringify(persona)} fill out the ${survey}. Additionally, include their thoughts on what they like about the product, the main reason they would want to purchase it, and the main reason they wouldn’t
  `
  return str;
}

export  const overallResultsAggregatorPromptFormatter = (responses:any) => {
  const str=`Based on all of the responses ${JSON.stringify(responses)} from the personas, synthesize the key insights and provide a readout. Then, provide a PMF viability score from a scale of 1-10, with 1 being low likelihood of PMF and 10 being extremely high likelihood of PMF, with your reasoning for why. List three strengths of this idea, and three weaknesses, as well as three potential enhancements`
  return str;
}

export const individualResultsAggregatorPromptFormatter = (responses:any) => {
  const str=`Based on all the responses ${JSON.stringify(responses)} for this individual question, I want to aggregate the responses and distill the insights, for each question. Give me a readout, with 3-5 insights`
  return str;
}