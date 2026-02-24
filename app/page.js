"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!prompt) return;

    setLoading(true);
    setResult("");

    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer ใส่_HF_TOKEN_ตรงนี้",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt
        })
      }
    );

    const data = await response.json();

    if (data[0]?.generated_text) {
      setResult(data[0].generated_text);
    } else {
      setResult(JSON.stringify(data));
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", maxWidth: 800 }}>
      <h1>AI Generator (Free)</h1>

      <textarea
        rows={6}
        style={{ width: "100%", marginBottom: 20 }}
        placeholder="พิมพ์สิ่งที่ต้องการ..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={generate}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <hr style={{ margin: "30px 0" }} />

      <pre style={{ whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </div>
  );
}
