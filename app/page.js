'use client'

import { useState } from 'react';
import getQuoteAroundToken from '../getQuoteAroundToken'

export default function Home() {
  const [comment, setComment] = useState("@start Our team is excited about the smart thermostat project we're preparing to bring to market. @SeanDurham With its advanced features and intuitive interface, it will revolutionize the way people control their home temperature. @mid We've put in countless hours of research and development to ensure the highest level of energy efficiency and user comfort. Stay tuned for updates as we get closer to the @near-end launch date! #SmartThermostat #Innovation @end");
  const [token, setToken] = useState("@near-end");
  const [result, setResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = getQuoteAroundToken(comment, token);
    setResult(result);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 font-mono text-sm">
      <div>
        <h1 className="text-lg font-bold">Contextualizer</h1>
        <p>This reveals a contextual quote around a token of your choosing. It tries to keep the token near the middle of the quote, but will try even harder to return between 120–150 characters. It adds elipses when it cuts off text, it cuts off at word breaks and trims whitespace.</p>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between lg:flex">
        <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="comment" className="text-lg font-bold">
              Comment
            </label>
            <textarea
              id="comment"
              className="w-full h-32 p-2 border border-gray-300 rounded"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="token" className="text-lg font-bold">
              Token
            </label>
            <input
              type="text"
              id="token"
              className="w-full p-2 border border-gray-300 rounded"
              value={token}
              onChange={(event) => setToken(event.target.value)}
            />
          </div>
          <button type="submit" className="px-4 py-2 text-lg font-bold bg-blue-500 text-white rounded">
            Quote around token
          </button>
        </form>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex-none space-y-4 w-full">
          <label htmlFor="quote" className="text-lg font-bold">
            Quote
          </label>
          <textarea
            value={result}
            readOnly
            id="result"
            className="w-full h-32 p-2 border border-gray-300 rounded"
          />
          <p>Length: {result.length}</p>
        </div>
      </div>
    </main>
  );
}
