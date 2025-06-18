"use client";

import { useState } from "react";
import { DadosCartaz } from "@/types/cartaz";
import FormCartaz from "@/components/FormCartaz";
import PreviewCartaz from "@/components/PreviewCartaz";
import BotaoExportarPDF from "@/components/BotaoExportarPDF";

export default function Home() {
    const [cartazData, setCartazData] = useState<DadosCartaz | null>(null);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100 text-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">
                <FormCartaz onChange={setCartazData} />
                <div id="cartaz-preview">
                    <PreviewCartaz data={cartazData} />
                </div>
                {cartazData && <BotaoExportarPDF data={cartazData} />}
            </div>
        </main>
    );
}
