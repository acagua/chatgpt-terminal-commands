import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export async function POST(request: Request) {
  const userEntry = await request.json();
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Pretend you are a command terminal expert advisor. Answer with command line valid inputs. 
      You: How can I help you today?
      Person: How can I list all the files in a directory?
      You: ls
      Person: ${userEntry.message}?
      You: `,
      max_tokens: 50,
      temperature: 0,
    });
    if (response.data?.choices?.length > 0) {
      return NextResponse.json({ message: response.data.choices[0].text });
    }
    return NextResponse.json({ message: "Sorry no reply from openai :(" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
    return NextResponse.json({ message: "unhandled error", error });
  }
}
