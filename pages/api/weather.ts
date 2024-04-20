import { NextApiRequest, NextApiResponse } from "next";
import { HTTP_INTERNAL_SERVER_ERROR, HTTP_OK } from "./constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lat, lon } = req.query;

  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(HTTP_OK).json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch data" });
  }
}
