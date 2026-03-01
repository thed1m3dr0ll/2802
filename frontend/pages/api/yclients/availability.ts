import type { NextApiRequest, NextApiResponse } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://backend:8000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ detail: "Method not allowed" });
  }

  const { date, staff_id, service_id } = req.query;

  if (!date || !staff_id || !service_id) {
    return res
      .status(400)
      .json({ detail: "date, staff_id и service_id обязательны" });
  }

  const searchParams = new URLSearchParams();
  searchParams.set("date", String(date));
  searchParams.set("staff_id", String(staff_id));
  searchParams.set("service_id", String(service_id));

  try {
    const upstreamRes = await fetch(
      `${API_URL}/yclients/availability?${searchParams.toString()}`,
      { headers: { Accept: "application/json" } },
    );

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
    console.error("Error proxying /yclients/availability:", error);
    return res
      .status(502)
      .json({ detail: "Не удалось получить свободные слоты" });
  }
}
