import { NextRequest, NextResponse } from "next/server";
import { readHistorico, clearHistorico } from "@/utils/fileDatabase";

/**
 * GET - Retorna o histórico com paginação e filtro
 */
export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const page = Number(searchParams.get("page") || "1");
    const perPage = Number(searchParams.get("perPage") || "5");
    const search = (searchParams.get("search") || "").toLowerCase();

    const historico = readHistorico().filter((item) =>
        item.nome.toLowerCase().includes(search)
    );

    const total = historico.length;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginated = historico.slice(start, end);

    return NextResponse.json({
        total,
        page,
        perPage,
        data: paginated,
    });
}

/**
 * DELETE - Limpa o histórico
 */
export async function DELETE() {
    clearHistorico();
    return NextResponse.json({ message: "Histórico limpo com sucesso." });
}
