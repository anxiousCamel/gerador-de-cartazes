// src/app/cartaz/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import PreviewCartaz from "@/components/PreviewCartaz";
import { DadosCartaz } from "@/types/cartaz";

export default function CartazPage() {
    const params = useSearchParams();

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
        <div className="bg-white w-[210mm] h-[297mm] flex items-center justify-center">
            <PreviewCartaz data={data} />
        </div>
    );
}
