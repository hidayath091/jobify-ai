const OpenAI = require('openai');

const getOpenAIClient = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

// Get feedback on resume
const getResumeFeedback = async (resumeText) => {
  const openai = getOpenAIClient();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a senior recruiter and career coach. Provide professional, actionable feedback on the user\'s resume. Focus on clarity, achievements, and layout suggestions. Keep it concise.',
      },
      {
        role: 'user',
        content: `Here is my resume text: \n\n${resumeText}`,
      },
    ],
  });

  return response.choices[0].message.content;
};

// Get match score and improvement suggestions
const getJobMatchScore = async (resumeText, jobDescription) => {
  const openai = getOpenAIClient();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are an AI assistant that analyzes job descriptions and resumes. Provide a match score (0-100) and specific suggestions on how to improve the resume or application to better fit the job description. Return the response in a JSON format with keys "score" (number) and "suggestions" (string).',
      },
      {
        role: 'user',
        content: `Resume: \n${resumeText}\n\nJob Description: \n${jobDescription}`,
      },
    ],
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content);
};

module.exports = {
  getResumeFeedback,
  getJobMatchScore,
};
