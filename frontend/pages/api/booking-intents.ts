import type { NextApiRequest, NextApiResponse } from "next";

const INTERNAL_API = process.env.INTERNAL_API_URL || "http://backend:8000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Method not allowed" });
  }
  try {
    const upstream = await fetch(`${INTERNAL_API}/api/booking-intents/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const text = await upstream.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { detail: "Invalid response" };
    }

    return res.status(upstream.status).json(data);
  } catch (err) {
    console.error("Error proxying /booking-intents:", err);
    return res
      .status(502)
      .json({ detail: "Не удалось сохранить заявку на запись" });
  }
}
