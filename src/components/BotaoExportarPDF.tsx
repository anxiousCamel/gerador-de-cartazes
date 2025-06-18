// src/components/BotaoExportarPDF.tsx

"use client";

import { DadosCartaz } from "@/types/cartaz";
import { toQueryString } from "@/utils/toQueryString";


interface Props {
    data: DadosCartaz;
}

export default function BotaoExportarPDF({ data }: Props) {
    const gerarPDF = async () => {
        const query = toQueryString(data);


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
        <button
            onClick={gerarPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
            📄 Gerar PDF
        </button>
    );
}
