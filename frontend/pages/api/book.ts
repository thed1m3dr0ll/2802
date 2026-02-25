import type { NextApiRequest, NextApiResponse } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://backend:8000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Method not allowed" });
  }

  try {
    const upstreamRes = await fetch(`${API_URL}/yclients/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const text = await upstreamRes.text();
    let data: unknown;

    try {
      data = JSON.parse(text);
    } catch {
      return res
        .status(502)
        .json({ detail: "Invalid response from booking server" });
    }

    return res.status(upstreamRes.status).json(data);
  } catch (error) {
    console.error("Error proxying /yclients/book:", error);
    return res
      .status(502)
      .json({ detail: "Не удалось создать запись в сервисе" });
  }
}
