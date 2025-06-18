import { NextRequest, NextResponse } from "next/server";
import { readHistorico, writeHistorico } from "@/utils/fileDatabase";
import path from "path";
import fs from "fs";

export async function DELETE(
    _req: NextRequest,
    { params }: { params: { id: string } }
) {
    const historico = readHistorico();
    const novoHistorico = historico.filter((item) => item.id !== params.id);

    // Excluir arquivo do disco
    const item = historico.find((i) => i.id === params.id);
    if (item) {
        const arquivoPath = path.join(process.cwd(), "public", item.urlArquivo.replace("/", ""));
        if (fs.existsSync(arquivoPath)) {
            fs.unlinkSync(arquivoPath);
        }
    }

    writeHistorico(novoHistorico);

    return NextResponse.json({ success: true });
}
