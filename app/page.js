'use client'

import { useState } from 'react';
import getQuoteAroundToken from '../getQuoteAroundToken'
import getQuoteParts from '@/getQuoteParts';
import Image from 'next/image';

const sampleToken = "@CoralMeier";
const samples = {
  start: "@CoralMeier, here's a progress update: Completed the rough cut and initiated color correction, which is now 70% done. We hit a minor snag with audio sync in Interview B but managed to resolve it efficiently. Also, the motion graphics template is in, but we're awaiting final approval. Noticed some discrepancies in the proxy files for the drone shots; re-encoding those to ensure smooth editing. Can you confirm the timeline for the remaining color grading and review the updated drone footage? Your feedback will be crucial for final adjustments.",
  nearStart: "Progress update, FYI leads (especially @CoralMeier!): Completed the rough cut and initiated color correction, which is now 70% done. We hit a minor snag with audio sync in Interview B but managed to resolve it efficiently. Also, the motion graphics template is in, but we're awaiting final approval. Noticed some discrepancies in the proxy files for the drone shots; re-encoding those to ensure smooth editing. Can you confirm the timeline for the remaining color grading and review the updated drone footage? Your feedback will be crucial for final adjustments.",
  middle: "Progress update: Completed the rough cut and initiated color correction, which is now 70% done. We hit a minor snag with audio sync in Interview B but managed to resolve it efficiently. Also, the motion graphics template is in, but we're awaiting final approval (Head's up @CoralMeier!). Noticed some discrepancies in the proxy files for the drone shots; re-encoding those to ensure smooth editing. Can you confirm the timeline for the remaining color grading and review the updated drone footage? Your feedback will be crucial for final adjustments.",
  nearEnd: "Progress update: Completed the rough cut and initiated color correction, which is now 70% done. We hit a minor snag with audio sync in Interview B but managed to resolve it efficiently. Also, the motion graphics template is in, but we're awaiting final approval. Noticed some discrepancies in the proxy files for the drone shots; re-encoding those to ensure smooth editing. Can you confirm the timeline for the remaining color grading and review the updated drone footage? @CoralMeier, your feedback will be crucial for final adjustments.",
  end: "Progress update: Completed the rough cut and initiated color correction, which is now 70% done. We hit a minor snag with audio sync in Interview B but managed to resolve it efficiently. Also, the motion graphics template is in, but we're awaiting final approval. Noticed some discrepancies in the proxy files for the drone shots; re-encoding those to ensure smooth editing. Can you confirm the timeline for the remaining color grading and review the updated drone footage? Your feedback will be crucial for final adjustments. @CoralMeier"
}

function SampleButton({label, ...props}) {
  return <button className="rounded py-2 px-4 mr-3 border-1 border-gray-700 bg-gray-300" {...props}>{label}</button>;
}

export default function Home() {
  const [comment, setComment] = useState(samples.start);
  const [token, setToken] = useState(sampleToken);
  const initialResult = getQuoteAroundToken(comment, token);
  const [result, setResult] = useState(getQuoteParts(initialResult, token));
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
        <p>This reveals a contextual quote around a token of your choosing (E.g. a mention). It tries to keep the token near the middle of the quote, but will try even harder to return between 120–150 characters. It adds elipses when it cuts off text, it cuts off at word breaks and trims whitespace.</p>
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
              style={{fieldSizing: "content"}}
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
