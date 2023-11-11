import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const keywords = $('meta[name="keywords"]').attr("content");
    const adsCopy = $(".ad-copy-class").text(); // Replace with the actual CSS selector

    res
      .status(200)
      .json({
        keywords: keywords ? keywords.split(",") : [],
        adsCopy: adsCopy.trim(),
      });
  } catch (error) {
    console.error("Error scraping website:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
