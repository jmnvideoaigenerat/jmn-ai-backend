import { fal } from "@fal-ai/serverless";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, model } = req.body;
    const modelId = model || "fal-ai/flux/schnell";
    
    const result = await fal.subscribe(modelId, {
      input: { prompt },
      logs: true,
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
