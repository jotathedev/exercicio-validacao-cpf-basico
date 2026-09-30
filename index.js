function handleError(error) {
    if (
        error instanceof RangeError ||
        error instanceof TypeError  ||
        error instanceof SyntaxError
    ) {
        throw error;
    }

    throw Error("Ocorreu um erro inesperado!");
}

function unformatCPF(formattedCPF) {
    if (formattedCPF.includes(/^\d+$/)) return formattedCPF;

    const unformattedCPF = formattedCPF.replaceAll('.', '').replace('-', '');
    return unformattedCPF;
}

function isCpfEntryValid(cpf) {
    if (typeof cpf !== 'string') {
        return TypeError("O CPF deve ser uma string válida!");
    };
    if (cpf.trim().length > 14) {
        return RangeError("O CPF deve ter no máximo 14 caracteres incluindo os especiais '.' e '-'!");
    };

    if (cpf.trim().length === 0 || !cpf) {
        return SyntaxError("O CPF é um campo obrigatório!");
    };

    return cpf;
}
function isCPFvalid(cpf) {
    try {
        isCpfEntryValid(cpf);
        const unformattedCPF = unformatCPF(cpf);
        


    } catch (error) {
        handleError(error);
    }
}
