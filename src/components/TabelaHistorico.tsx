"use client";

import { useEffect, useState } from "react";

interface HistoricoItem {
    id: string;
    nome: string;
    formato: string;
    dataHora: string;
    urlArquivo: string;
}

export default function TabelaHistorico() {
    const [historico, setHistorico] = useState<HistoricoItem[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [preview, setPreview] = useState<string | null>(null);
    const perPage = 5;

    const fetchData = async () => {
        const res = await fetch(`/api/historico?page=${page}&perPage=${perPage}&search=${search}`);
        const json = await res.json();
        setHistorico(json.data);
        setTotal(json.total);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search]);

    const limparHistorico = async () => {
        await fetch("/api/historico", { method: "DELETE" });
        setPage(1);
        fetchData();
    };

    const totalPages = Math.max(1, Math.ceil(total / perPage));

    return (
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-5xl mx-auto border border-gray-300">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-black flex items-center gap-2">
                    Histórico de PDFs Gerados
                </h2>
                <button
                    onClick={limparHistorico}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded shadow"
                >
                    Limpar Histórico
                </button>
            </div>

            <input
                type="text"
                placeholder="🔍 Buscar produto..."
                value={search}
                onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                }}
                className="border border-gray-400 px-3 py-2 rounded-md w-full mb-5 focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
            />

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-500">
                    <thead className="bg-black">
                        <tr>
                            <th className="p-3 text-left text-white font-semibold">Produto</th>
                            <th className="p-3 text-left text-white font-semibold">Formato</th>
                            <th className="p-3 text-left text-white font-semibold">Data/Hora</th>
                            <th className="p-3 text-left text-white font-semibold">Arquivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historico.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-5 text-gray-600">
                                    Nenhum registro encontrado.
                                </td>
                            </tr>
                        ) : (
                            historico.map((item) => (
                                <tr key={item.id} className="border-b border-gray-400 hover:bg-gray-100">
                                    <td className="p-3 text-black">{item.nome}</td>
                                    <td className="p-3 text-black">{item.formato.toUpperCase()}</td>
                                    <td className="p-3 text-black">
                                        {new Date(item.dataHora).toLocaleString("pt-BR")}
                                    </td>
                                    <td className="p-3 flex gap-4">
                                        <button
                                            onClick={() => setPreview(item.urlArquivo)}
                                            className="text-blue-700 hover:underline font-semibold"
                                        >
                                            🔍 Visualizar
                                        </button>
                                        <a
                                            href={item.urlArquivo}
                                            download
                                            className="text-blue-700 hover:underline font-semibold"
                                        >
                                            📥 Baixar
                                        </a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            <div className="flex justify-between items-center mt-6">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 border border-gray-500 rounded disabled:opacity-50 hover:bg-gray-200"
                >
                    Anterior
                </button>
                <span className="text-black font-medium">
                    Página {page} de {totalPages}
                </span>
                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 border border-gray-500 rounded disabled:opacity-50 hover:bg-gray-200"
                >
                    Próxima
                </button>
            </div>

            {/* Preview Inline */}
            {preview && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-5 w-[90%] h-[90%] flex flex-col shadow-2xl">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-lg font-bold text-black">Visualizar PDF</h2>
                            <button
                                onClick={() => setPreview(null)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                            >
                                Fechar
                            </button>
                        </div>
                        <iframe
                            src={preview}
                            className="w-full h-full border border-gray-400"
                            title="Visualizar PDF"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
