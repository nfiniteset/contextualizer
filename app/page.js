'use client'

import { useState } from 'react';
import getQuoteAroundToken from '../getQuoteAroundToken'
import getQuoteParts from '@/getQuoteParts';
import Image from 'next/image';

const sampleToken = "@CoralMeier";
const samples = {
  start: "@CoralMeier, our team is excited about the smart thermostat project we're preparing to bring to market. With its advanced features and intuitive interface, it will revolutionize the way people control their home temperature. We've put in countless hours of research and development to ensure the highest level of energy efficiency and user comfort. Stay tuned for updates as we get closer to the launch date! #SmartThermostat #Innovation",
  nearStart: "Our team is excited about the smart thermostat project @CoralMeier we're preparing to bring to market. With its advanced features and intuitive interface, it will revolutionize the way people control their home temperature. We've put in countless hours of research and development to ensure the highest level of energy efficiency and user comfort. Stay tuned for updates as we get closer to the launch date! #SmartThermostat #Innovation",
  middle: "Our team is excited about the smart thermostat project we're preparing to bring to market. With its advanced features and intuitive interface, it will revolutionize the way people control their home temperature. @CoralMeier, ee've put in countless hours of research and development to ensure the highest level of energy efficiency and user comfort. Stay tuned for updates as we get closer to the launch date! #SmartThermostat #Innovation",
  nearEnd: "Our team is excited about the smart thermostat project we're preparing to bring to market. With its advanced features and intuitive interface, it will revolutionize the way people control their home temperature. We've put in countless hours of research and development to ensure the highest level of energy efficiency and user comfort. Stay tuned for updates @CoralMeier as we get closer to the launch date! #SmartThermostat #Innovation",
  end: "Our team is excited about the smart thermostat project we're preparing to bring to market. With its advanced features and intuitive interface, it will revolutionize the way people control their home temperature. We've put in countless hours of research and development to ensure the highest level of energy efficiency and user comfort. Stay tuned for updates as we get closer to the launch date! #SmartThermostat #Innovation cc: @CoralMeier"
}

function SampleButton({label, ...props}) {
  return <button className="rounded py-2 px-4 mr-3 border-1 border-gray-700 bg-gray-300" {...props}>{label}</button>;
}

export default function Home() {
  const [comment, setComment] = useState("@start Our team is excited about the smart thermostat project we're preparing to bring to market. @SeanDurham With its advanced features and intuitive interface, it will revolutionize the way people control their home temperature. @mid We've put in countless hours of research and development to ensure the highest level of energy efficiency and user comfort. Stay tuned for updates as we get closer to the @near-end launch date! #SmartThermostat #Innovation @end");
  const [token, setToken] = useState("@near-end");
  const [result, setResult] = useState(["", "", ""]);
  const charCount = result.reduce((sum, member) => sum + member.length, 0);

  function handleSampleClick(event) {
    event.preventDefault();
    setComment(samples[event.target.value]);
    setToken(sampleToken);
    const result = getQuoteAroundToken(samples[event.target.value], sampleToken);
    setResult(getQuoteParts(result, sampleToken));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = getQuoteAroundToken(comment, token);
    setResult(getQuoteParts(result, token));
  };

  return (
    <main className="flex min-h-screen flex-col items-stretch p-24 font-mono text-sm">
      <div className="mb-6">
        <h1 className="text-lg font-bold">Contextualizer</h1>
        <p>This reveals a contextual quote around a token of your choosing. It tries to keep the token near the middle of the quote, but will try even harder to return between 120–150 characters. It adds elipses when it cuts off text, it cuts off at word breaks and trims whitespace.</p>
      </div>
      <div className="flex">
        <form className="flex flex-1 flex-col space-y-4 w-full pr-6" onSubmit={handleSubmit}>
          <label htmlFor="comment" className="text-lg font-bold">
            Samples
          </label>
          <div className="flex">
            <SampleButton label="Start" value="start" onClick={handleSampleClick} />
            <SampleButton label="Near start" value="nearStart" onClick={handleSampleClick} />
            <SampleButton label="Middle" value="middle" onClick={handleSampleClick} />
            <SampleButton label="Near end" value="nearEnd" onClick={handleSampleClick} />
            <SampleButton label="End" value="end" onClick={handleSampleClick} />
          </div>
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
        <div className="flex-col flex-none">
          <div className="relative flex flex-col items-center" width="600" height="724">
            <Image src="/Mention.png" alt="Mention" width="600" height="724" />
            <div style={{top: "352px", left: "69px", width: "492px", color: "#6D6E6F", fontSize: "14px", lineHeight: "22px", border: "none"}} className="p-0 font-sans font-normal absolute w-full h-32 p-2 border border-gray-300 rounded">
              {result[0] && <span>{result[0]}</span>}
              {result[1] && <span style={{color: "#3F6AC4"}}>{result[1]}</span>}
              {result[2] && <span>{result[2]}</span>}
            </div>
            <p className="mt-3">Length: {charCount}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
