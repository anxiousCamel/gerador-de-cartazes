// src/components/previewCartaz.tsx

"use client";

import { DadosCartaz } from "@/types/cartaz";

interface Props {
    data: DadosCartaz | null;
}

export default function PreviewCartaz({ data }: Props) {
    if (!data) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
                <span className="text-gray-500">Preencha os dados para ver o preview</span>
            </div>
        );
    }

    return (
        <div
            className={`rounded-lg shadow-md p-6 flex flex-col items-center justify-center w-full h-full ${data.corPapel === "amarelo"
                    ? "bg-yellow-300"
                    : data.corPapel === "azul"
                        ? "bg-blue-300"
                        : data.corPapel === "branco"
                            ? "bg-white"
                            : data.corPapel === "vermelho"
                                ? "bg-red-400"
                                : "bg-green-300"
                }`}
        >
            <h1 className="text-7xl font-extrabold text-black uppercase mb-4">
                {data.nome || "Produto"}
            </h1>

            {data.descritivo && (
                <p className="text-xl text-black mb-2">{data.descritivo}</p>
            )}

            {data.setor && (
                <p className="text-lg text-black mb-2 italic">{data.setor}</p>
            )}

            {data.precoNormal && (
                <p className="text-2xl text-black line-through mb-2">
                    De: R$ {data.precoNormal.toFixed(2).replace(".", ",")}
                </p>
            )}

            <p className="text-6xl font-extrabold text-black mb-2">
                Por: R$ {data.precoPromocional.toFixed(2).replace(".", ",")}
            </p>

            {data.unidadePorCpf && (
                <p className="text-lg text-black mb-2">
                    Limite de {data.unidadePorCpf} unidade(s) por CPF
                </p>
            )}

            {data.validade && (
                <p className="text-base text-black">
                    Válido até: {data.validade.split("-").reverse().join("/")}
                </p>
            )}

            {data.codigo && (
                <p className="text-sm text-black mt-4">Cód.: {data.codigo}</p>
            )}
        </div>
    );
}
