import { Router } from "express";
import puppeteer from 'puppeteer';
import { sendEmailC } from "../controllers/email.controller";
import { uploadFile } from "../handlers/email/email.service";

const router = Router();

router.post("/scrape", async (req, res) => {
    const query = req.body.query || 'doctors near me';
  
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(query)}`);
  
    await page.waitForSelector('.Nv2PK');
  
    const results = await page.evaluate(() => {
      const data: Array<Record<string, string>> = [];
      const elements = document.querySelectorAll('.Nv2PK');
  
      elements.forEach(el => {
        const name = (el.querySelector('.qBF1Pd') as HTMLElement)?.innerText || 'N/A';
        const rating = (el.querySelector('.MW4etd') as HTMLElement)?.innerText || 'N/A';
        const reviews = (el.querySelector('.UY7F9') as HTMLElement)?.innerText || 'N/A';
        const specialization = (el.querySelectorAll('.W4Efsd')[0] as HTMLElement)?.innerText || 'N/A';
        const address = (el.querySelectorAll('.W4Efsd')[1] as HTMLElement)?.innerText || 'N/A';
        const profileLink = (el.querySelector('a') as HTMLAnchorElement)?.href || 'N/A';
  
        data.push({
          name,
          rating,
          reviews,
          specialization,
          address,
          profileLink
        });
      });
  
      return data;
    });
  
    await browser.close();
  
    res.json(results);
  });
router.post("/email",uploadFile.single("file"), sendEmailC);

export default router;
