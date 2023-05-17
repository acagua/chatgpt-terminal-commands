"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <main className="flex w-full h-full justify-center items-center flex-col p-10">
      <h1 className="text-2xl mb-5">Terminal command expert</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-2 border-gray-300 p-2 rounded-lg text-black"
          placeholder="Ask me about any command you dont remember how to use"
          value={message}
          name="message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Send
        </button>
      </form>
      <div className="p-5">
        {response && <code className="text-red-500">{response}</code>}
      </div>
    </main>
  );
}
