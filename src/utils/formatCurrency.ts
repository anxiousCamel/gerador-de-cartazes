export function formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });
}
export function formatCurrencyWithoutSymbol(value: number): string {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
    });
}