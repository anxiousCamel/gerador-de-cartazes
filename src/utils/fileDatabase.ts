import fs from "fs";
import path from "path";
import { HistoricoItem } from "@/types/historico";

const filePath = path.join(process.cwd(), "src/app/api/historico/historico.json");

export function readHistorico(): HistoricoItem[] {
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : "[]";
    return JSON.parse(data);
}

export function writeHistorico(data: HistoricoItem[]) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function addHistorico(item: HistoricoItem) {
    const historico = readHistorico();
    historico.unshift(item); // adiciona no topo
    writeHistorico(historico);
}

export function clearHistorico() {
    writeHistorico([]);
}
