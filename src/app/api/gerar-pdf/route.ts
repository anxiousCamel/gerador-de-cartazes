// src/app/api/gerar-pdf/route.ts

import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const params = query.toString();

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    const url = `http://localhost:3000/cartaz?${params}`;
    await page.goto(url, {
        waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
    });

    await browser.close();

    return new NextResponse(pdf, {
        status: 200,
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=cartaz.pdf",
        },
    });
}
