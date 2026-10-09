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
    if (formattedCPF.match(/^\d+$/)) return formattedCPF;

    const unformattedCPF = formattedCPF.replaceAll('.', '').replace('-', '');
    return unformattedCPF;
}

function isCpfEntryValid(cpf) {
    if (typeof cpf !== 'string') {
        throw TypeError("O CPF deve ser uma string válida!");
    };
    if (cpf.trim().length > 14) {
        throw RangeError("O CPF deve ter no máximo 14 caracteres incluindo os especiais '.' e '-'!");
    };

    if (cpf.trim().length === 0 || !cpf) {
        throw SyntaxError("O CPF é um campo obrigatório!");
    };
}



function isCPFvalid(cpf) {
    try {
        const cpfEntryValid = isCpfEntryValid(cpf);
        if (!cpfEntryValid) {
            const unformattedCPF = unformatCPF(cpf);
            console.log(unformattedCPF);
        }
        


    } catch (error) {
        handleError(error);
    }
}

isCPFvalid("084.548.973-99");