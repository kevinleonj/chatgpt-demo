const { OpenAIApi, Configuration } = require("openai");

// The function entry point
module.exports = async function (context, req) {
  try {
    // Read the user's message from the request body
    const userMessage = req.body?.message || '';

    // Initialize the OpenAI API with your environment variable
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY, // We set this in Azure's settings
    });
    const openai = new OpenAIApi(configuration);

    // Call the ChatCompletion API using gpt-3.5-turbo (or another model)
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
      max_tokens: 100, // Adjust as needed
      temperature: 0.7,
    });

    // Extract the reply from the API response
    const assistantMessage = completion.data.choices[0].message.content;

    // Return the AI's response
    context.res = {
      status: 200,
      body: {
        reply: assistantMessage
      },
    };
  } catch (error) {
    context.log(error);
    context.res = {
      status: 500,
      body: {
        error: "Something went wrong when calling the OpenAI API."
      },
    };
  }
};
