export type Algorithm = {
    slug: string;
    title: string;
    description: string;
    complexity: string;
    filename: string;
    language?: string;
    buildSource: () => string; // готовый код для CodeBlock
};

export const defineAlgorithm = <T extends Algorithm>(a: T) => a;
