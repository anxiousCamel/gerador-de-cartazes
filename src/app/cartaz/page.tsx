// src/app/cartaz/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import PreviewCartaz from "@/components/PreviewCartaz";
import { DadosCartaz } from "@/types/cartaz";
import { PaperFormat } from "@/types/paperFormat";

/**
 * Mapeia os tamanhos em pixels para o CSS
 */
const paperSizes: Record<PaperFormat, { width: string; height: string }> = {
    a3: { width: "420mm", height: "297mm" },
    a4: { width: "210mm", height: "297mm" },
    a5: { width: "148mm", height: "210mm" },
    gradil: { width: "594mm", height: "841mm" }, // equivalente a A1 (4xA4)
};

export default function CartazPage() {
    const params = useSearchParams();

    const formato = params.get("formato") as PaperFormat || "a4";

    const size = paperSizes[formato] ?? paperSizes.a4;

    const data: DadosCartaz = {
        nome: params.get("nome") ?? "",
        precoPromocional: Number(params.get("precoPromocional")) || 0,
        corPapel: ((): "amarelo" | "azul" | "branco" | "vermelho" | "verde" => {
            const value = params.get("corPapel");
            const allowed = ["amarelo", "azul", "branco", "vermelho", "verde"] as const;
            return allowed.includes(value as typeof allowed[number]) ? (value as typeof allowed[number]) : "amarelo";
        })(),
        descritivo: params.get("descritivo") ?? undefined,
        setor: params.get("setor") ?? undefined,
        precoNormal: params.get("precoNormal")
            ? Number(params.get("precoNormal"))
            : undefined,
        unidadePorCpf: params.get("unidadePorCpf")
            ? Number(params.get("unidadePorCpf"))
            : undefined,
        validade: params.get("validade") ?? undefined,
        codigo: params.get("codigo") ?? undefined,
    };

    return (
        <div
            style={{
                width: size.width,
                height: size.height,
            }}
            className="bg-white flex items-center justify-center"
        >
            <PreviewCartaz data={data} />
        </div>
    );
}
