// src/utils/toQueryString.ts
import { DadosCartaz } from "@/types/cartaz";
import { PaperFormat } from "@/types/paperFormat";

/**
 * Serializa o objeto DadosCartaz + formato para uma query string.
 */
export function toQueryString(data: Partial<DadosCartaz> & { formato?: PaperFormat }) {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            params.append(key, String(value));
        }
    });

    return params.toString();
}
