// src/components/BotaoExportarPDF.tsx
"use client";

import { useState } from "react";
import { DadosCartaz } from "@/types/cartaz";
import { PaperFormat } from "@/types/paperFormat";
import { toQueryString } from "@/utils/toQueryString";

interface Props {
    data: DadosCartaz;
}

export default function BotaoExportarPDF({ data }: Props) {
    const [formato, setFormato] = useState<PaperFormat>("a4");

    const gerarPDF = async () => {
        const query = toQueryString({ ...data, formato });

        const res = await fetch(`/api/gerar-pdf?${query}`, {
            method: "GET",
        });

        if (!res.ok) {
            alert("Erro ao gerar PDF");
            return;
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "cartaz.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="flex gap-4 items-center">
            <select
                value={formato}
                onChange={(e) => setFormato(e.target.value as PaperFormat)}
                className="border px-2 py-1 rounded"
            >
                <option value="a3">A3</option>
                <option value="a4">A4</option>
                <option value="a5">A5</option>
                <option value="gradil">Gradil (4 folhas A4)</option>
            </select>

            <button
                onClick={gerarPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
                📄 Gerar PDF
            </button>
        </div>
    );
}
