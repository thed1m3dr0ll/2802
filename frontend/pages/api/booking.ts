// frontend/pages/api/booking.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:8000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const r = await fetch(`${BACKEND_URL}/yclients/booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: 'Ошибка соединения с сервером записи' });
  }
}
