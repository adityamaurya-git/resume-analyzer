const { GoogleGenAI } = require('@google/genai');
const { z, properties } = require('zod');

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});


//  gemini-3.8-flash

// const invoke = async () => {

//     const interaction = await ai.interactions.create({
//         model:"gemini-3.8-flash",
//         input:"Explain how AI in a few words",

//     });


//     console.log(interaction.output_text);


// }

const reportJsonSchema = {
    type: "object",
    properties: {
        matchScore:{
            type:"integer",
            minimum:0,
            maximum:100,
            description:"A score between 0 to 100 indicating how well the candidate's profile matches the job description"
        },
        technicalQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: {
                        type: "string",
                        description: "The technical question asked in the interview"
                    },
                    intention: {
                        type: "string",
                        description: "The intention of interviewer behind asking this question",
                    },
                    answer: {
                        type: "string",
                        description: "A sample answer to the techinal question",
                    }
                },
                required:["question", "intention", "answer"],
                additionalProperties:false
            },
            description:"Techinal  questions that can be asked in the interview along with their intentions and answers"
        },
        behavioralQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: {
                        type: "string",
                        description: "The behavioral question asked in the interview"
                    },
                    intention: {
                        type: "string",
                        description: "The intention of interviewer behind asking this question",
                    },
                    answer: {
                        type: "string",
                        description: "A sample answer to the behavioral question",
                    }
                },
                required:["question", "intention", "answer"],
                additionalProperties:false
            },
            description:"Behavioral questions that can be asked in the interview along with their intentions and answers"
        },
        skillGap: {
            type:"array",
            items:{
                type:"object",
                properties:{
                    skill:{
                        type:"string",
                        description:"The skill which the candidate is lacking",
                    },
                    severity:{
                        type:"string",
                        enum:["low", "medium", "high"],
                        description:"The severity of this skill gap, i.e."
                    }
                },
                required:["skill", "severity"],
                additionalProperties:false
            },
            description:"List of skill gaps in the candidate's profile along with"
        },
        preparationPlan:{
            type:"array",
            items:{
                type:"object",
                properties:{
                    day:{
                        type:"integer",
                        description:"The day number in the preparation plan, starting from 1"
                    },
                    focus:{
                        type:"string",
                        description:"The main focus of this day in the preparation plan e.g. data structure, system design, mock interview etc."
                    },
                    tasks:{
                        type:"array",
                        items:{
                            type:"string",
                            description:"List of tasks to be done on this day to follow the preparation plan e.g. read a specific book or "
                        }
                    }
                },
                required:["day", "focus", "tasks"],
                additionalProperties:false
            },
            description:"A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"
        },
        title:{
            type:"string",
            description:"The title of the job for which the interview report is being generated."
        }        
    },
    required:["matchScore", "technicalQuestions", "behavioralQuestions", "skillGap", "preparationPlan","title"],
    additionalProperties:false
}

const reportSchema = z.fromJSONSchema(reportJsonSchema);


const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {


    const prompt = `Generate an interview report for a candidate with the following details:
    Resume:${resume}
    Self Description:${selfDescription}
    Job Description:${jobDescription}`;

    const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: prompt,
        response_format: {
            type: 'text',
            mime_type: 'application/json',
            schema: reportJsonSchema
        },
    });

    const report = reportSchema.parse(JSON.parse(interaction.output_text));

    return report;
}

module.exports = generateInterviewReport;