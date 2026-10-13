function handleError(error) {
    if (
        error instanceof RangeError ||
        error instanceof TypeError ||
        error instanceof SyntaxError
    ) {
        throw error;
    }

    throw new Error("Ocorreu um erro inesperado!");
}

function unformatCpf(formattedCPF) {
    if (formattedCPF.match(/^\d+$/)) return formattedCPF;

    const unformattedCPF = formattedCPF.replaceAll('.', '').replace('-', '');
    return unformattedCPF;
}

function isCpfEntryValid(cpf) {
    if (typeof cpf !== 'string') {
        throw new TypeError("O CPF deve ser uma string válida!");
    };
    if (cpf.trim().length > 14) {
        throw new RangeError("O CPF deve ter no máximo 14 caracteres incluindo os especiais '.' e '-'!");
    };

    if (cpf.trim().length === 0 || !cpf) {
        throw new SyntaxError("O CPF é um campo obrigatório!");
    };
}

function cutCpf(cpf, limit) {
    return cpf.slice(0, limit);
}

function sumDigits(initialMultiplier, digitsArray) {
    const totalSum = digitsArray.reduce((acc, v, i) => {
        const multiplicador = initialMultiplier - i;
        return acc + (Number(v) * multiplicador);
    }, 0)
    return totalSum;
}

function calculateDigit(cpfLength, totalSum) {
    return cpfLength - (totalSum % cpfLength);
}

function compareBuildedCpfWithOriginalCpf(buildedCpf, originalCpf) {
    let equalDigits = 0;
    for (let i = 0; i < 11; i++) {
        buildedCpf[i] === originalCpf[i] ? equalDigits++ : console.error(`O digito ${buildedCpf[i]} é diferente do digito ${originalCpf[i]}!`);
    }

    if (equalDigits === 11) {
        return "O CPF inserido é válido!";
    } else {
        return "O CPF inserido é inválido!";
    }
}

function isCpfValid(cpf) {

    const CPF_LENGTH = 11;

    try {
            isCpfEntryValid(cpf);
        
            const unformattedCPF = unformatCpf(cpf);
            const cpfWithFirstNineDigits = cutCpf(unformattedCPF, 9);
            const separatedCpfToArray = cpfWithFirstNineDigits.split("");

            const totalSumOfNineDigits = sumDigits(10, separatedCpfToArray);

            const firstDigit = calculateDigit(CPF_LENGTH, totalSumOfNineDigits);

            if (firstDigit > 9) {
                separatedCpfToArray.push('0');
            } else {
                separatedCpfToArray.push(String(firstDigit));
            }

            const totalSumOfTenDigits = sumDigits(11, separatedCpfToArray);

            const secondDigit = calculateDigit(CPF_LENGTH, totalSumOfTenDigits);

            if (secondDigit > 9) {
                separatedCpfToArray.push('0');
            } else {
                separatedCpfToArray.push(String(secondDigit));
            }

            const buildedCpf = separatedCpfToArray.join("");

            return console.log(compareBuildedCpfWithOriginalCpf(buildedCpf, unformattedCPF));

    } catch (error) {
        handleError(error);
    }
}

isCpfValid("084.548.973-99");