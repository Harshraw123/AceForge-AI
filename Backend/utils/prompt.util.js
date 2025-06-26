export const questionAnswerPrompt = ({role, experience, topicsToFocus, description, numberOfQuestions}) => (`
  You are an AI trained to generate technical interview questions and answers.
  
  Task:
  - Role: ${role}
  - Candidate Experience: ${experience} years
  - Focus Topics: ${topicsToFocus}
  - Job Description: ${description || 'Not provided'}
  - Generate EXACTLY ${numberOfQuestions} interview questions (no more, no less)
  
  Requirements:
  - Create exactly ${numberOfQuestions} unique, relevant interview questions
  - For each question, provide a detailed, comprehensive answer
  - Include code examples where appropriate
  - Ensure questions are appropriate for ${experience} years of experience
  - Focus specifically on: ${topicsToFocus}
  - Make content in-depth and technically accurate
  - Keep formatting clean and professional
  
  Return format - MUST be a valid JSON array with exactly ${numberOfQuestions} objects:
  [
    {
      "question": "Your question here?",
      "answer": "Detailed answer here with code examples if needed."
    },
    {
      "question": "Second question here?", 
      "answer": "Another detailed answer here."
    }
  ]
  
  CRITICAL INSTRUCTIONS:
  - Return ONLY valid JSON - no extra text, no markdown formatting
  - Generate exactly ${numberOfQuestions} questions - count them carefully
  - Do not include \\n or line breaks in the JSON
  - Each answer should be comprehensive and interview-ready
  - Questions should be progressive in difficulty based on experience level
  `);
  
  export const conceptExplainPrompt = (question) => (`
  You are an AI trained to generate comprehensive explanations for interview questions.
  
  Task:
  - Explain the following interview question and its underlying concepts in depth
  - Question: "${question}"
  - Provide a detailed, technical explanation suitable for interview preparation
  - Include practical examples and code snippets where relevant
  - Create a concise, descriptive title for the concept
  
  Return format - MUST be valid JSON:
  {
    "title": "Concise title summarizing the concept",
    "explanation": "Comprehensive explanation with examples and code snippets if needed"
  }
  
  CRITICAL INSTRUCTIONS:
  - Return ONLY valid JSON - no extra text or markdown formatting
  - Make the explanation thorough and interview-focused
  - Include practical examples that demonstrate understanding
  - Keep title short but descriptive
  `);

  export const GenerateQuizPrompt = ({ role, experience, topicsToFocus }) => {
    return `
  Generate 10 concise, multiple-choice quiz questions in JSON format.
  
  Each question must include:
  - category
  - topic
  - question
  - options (4 choices)
  - answer (must match one option)
  
  Focus on the role: "${role}", experience level: "${experience}", and key topics: ${topicsToFocus}.
  
  Return JSON only. No explanation.
  `;
  };
  