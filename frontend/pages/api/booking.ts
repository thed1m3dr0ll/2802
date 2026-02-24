import type { NextApiRequest, NextApiResponse } from "next";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const r = await fetch(`${API_URL}/yclients/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    console.error("api/booking upstream error", e);
    return res
      .status(500)
      .json({ message: "Ошибка соединения с сервером записи" });
  }
}
