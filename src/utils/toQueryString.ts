// src/utils/toQueryString.ts
"use client";

import { DadosCartaz } from "@/types/cartaz";

export function toQueryString(data: DadosCartaz) {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            params.append(key, String(value));
        }
    });
    return params.toString();
}
