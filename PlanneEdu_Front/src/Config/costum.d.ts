declare module '*.svg'; declare module '*.png' {
    const content: string;
    export default content;
} /* Criando um módulo svg para o Ts reconhecer */