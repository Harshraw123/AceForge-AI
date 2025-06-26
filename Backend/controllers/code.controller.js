import axios from 'axios'

const languageMap = {
  cpp: 54,
  python: 71,
  javascript: 63,
};

export const  runCode = async (req, res) => {
  const { sourceCode, language } = req.body;

  const language_id = languageMap[language];

  try {
    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: sourceCode,
        language_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
         'x-rapidapi-key': process.env.JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    const { stdout, stderr, compile_output } = response.data;

    res.json({ output: stdout || stderr || compile_output });
  } catch (error) {
    res.status(500).json({ error: "Execution failed", details: error.message });
  }
};
