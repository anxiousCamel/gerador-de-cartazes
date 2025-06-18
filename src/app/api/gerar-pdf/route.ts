import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { PaperFormat } from "@/types/paperFormat";
import { addHistorico } from "@/utils/fileDatabase";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

/**
 * Verifica se o valor recebido é um formato permitido.
 */
function isPaperFormat(value: string | null): value is PaperFormat {
    const validFormats: PaperFormat[] = ["a3", "a4", "a5", "gradil"];
    return validFormats.includes(value as PaperFormat);
}

/**
 * Faz o parse de formato, se for inválido retorna "a4" como padrão.
 */
function parseFormato(value: string | null): PaperFormat {
    return isPaperFormat(value) ? value : "a4";
}

/**
 * Mapeia tamanhos dos formatos personalizados.
 */
const tamanhos: Record<Exclude<PaperFormat, "gradil">, string> & {
    gradil: { width: number; height: number };
} = {
    a3: "a3",
    a4: "a4",
    a5: "a5",
    gradil: { width: 420, height: 594 }, // Equivalente a A2 (4 folhas A4)
};

/**
 * Salva o PDF no diretório /public e adiciona no histórico.
 */
function savePdfLocally(
    pdf: Uint8Array,
    query: URLSearchParams,
    formato: PaperFormat
) {
    const nomeArquivo = `cartaz-${uuidv4()}.pdf`;
    const outputPath = path.join(process.cwd(), "public", nomeArquivo);
    fs.writeFileSync(outputPath, Buffer.from(pdf));

    addHistorico({
        id: uuidv4(),
        nome: query.get("nome") || "Cartaz",
        formato,
        dataHora: new Date().toISOString(),
        urlArquivo: `/${nomeArquivo}`,
    });

    return nomeArquivo;
}

/**
 * Endpoint para gerar PDF e salvar histórico.
 */
export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const params = query.toString();
    const formato = parseFormato(query.get("formato"));

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    const url = `http://localhost:3000/cartaz?${params}`;

    await page.goto(url, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
        format: formato !== "gradil" ? formato : undefined,
        width: formato === "gradil" ? `${tamanhos.gradil.width}mm` : undefined,
        height: formato === "gradil" ? `${tamanhos.gradil.height}mm` : undefined,
        printBackground: true,
        margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
    });

    await browser.close();

    const nomeArquivo = savePdfLocally(pdf, query, formato);

    return new NextResponse(pdf, {
        status: 200,
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=${nomeArquivo}`,
        },
    });
}
