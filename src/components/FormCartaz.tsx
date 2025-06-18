"use client";

import { useState } from "react";
import { DadosCartaz } from "@/types/cartaz";

interface Props {
    onChange: (data: DadosCartaz) => void;
}

export default function FormCartaz({ onChange }: Props) {
    const [formData, setFormData] = useState<DadosCartaz>({
        nome: "",
        precoPromocional: 0,
        corPapel: "vermelho",
    });

    function handleChange<K extends keyof DadosCartaz>(
        key: K,
        value: DadosCartaz[K]
    ) {
        const updated = { ...formData, [key]: value };
        setFormData(updated);
        onChange(updated);
    }

    function parseInputNumber(value: string): number | undefined {
        return value.trim() === "" ? undefined : Number(value);
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                📝 Dados do Cartaz
            </h2>

            <div className="space-y-4">
                {/* Nome */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nome do Produto *
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Ex.: Arroz 5kg"
                        value={formData.nome}
                        onChange={(e) => handleChange("nome", e.target.value)}
                        required
                    />
                </div>

                {/* Descritivo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Descritivo
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Ex.: Tipo 1, Validade até..."
                        value={formData.descritivo ?? ""}
                        onChange={(e) => handleChange("descritivo", e.target.value)}
                    />
                </div>

                {/* Setor */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Setor
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Ex.: Hortifrúti, Açougue..."
                        value={formData.setor ?? ""}
                        onChange={(e) => handleChange("setor", e.target.value)}
                    />
                </div>

                {/* Preço Promocional */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Preço Promocional *
                    </label>
                    <input
                        type="number"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.precoPromocional}
                        onChange={(e) =>
                            handleChange("precoPromocional", Number(e.target.value))
                        }
                        required
                    />
                </div>

                {/* Preço Normal */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Preço Normal
                    </label>
                    <input
                        type="number"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Ex.: 14.90"
                        value={formData.precoNormal ?? ""}
                        onChange={(e) =>
                            handleChange("precoNormal", parseInputNumber(e.target.value))
                        }
                    />
                </div>

                {/* Unidade por CPF */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Unidade por CPF
                    </label>
                    <input
                        type="number"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Ex.: 2"
                        value={formData.unidadePorCpf ?? ""}
                        onChange={(e) =>
                            handleChange("unidadePorCpf", parseInputNumber(e.target.value))
                        }
                    />
                </div>

                {/* Cor do Papel */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Cor do Papel *
                    </label>
                    <select
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.corPapel}
                        onChange={(e) =>
                            handleChange("corPapel", e.target.value as DadosCartaz["corPapel"])
                        }
                    >
                        <option value="amarelo">Amarelo</option>
                        <option value="azul">Azul</option>
                        <option value="branco">Branco</option>
                        <option value="vermelho">Vermelho</option>
                        <option value="verde">Verde</option>
                    </select>
                </div>

                {/* Código do Produto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Código do Produto
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Ex.: 123456"
                        value={formData.codigo ?? ""}
                        onChange={(e) => handleChange("codigo", e.target.value)}
                    />
                </div>

                {/* Validade */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Validade da Promoção
                    </label>
                    <input
                        type="date"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.validade ?? ""}
                        onChange={(e) => handleChange("validade", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
