export interface DadosCartaz {
    codigo?: string;
    nome: string;
    descritivo?: string;
    setor?: string;
    precoNormal?: number;
    precoPromocional: number;
    unidadePorCpf?: number;
    validade?: string;
    corPapel: 'amarelo' | 'azul' | 'branco' | 'vermelho' | 'verde';
    imagemCartaz?: string;
    imagemProduto?: string;
    logoLoja?: string;

    [key: string]: string | number | undefined;
}
