export const toPersianNumber = (number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number.toString().replace(/\d/g, (match) => persianDigits[parseInt(match)]);
}

export const toEnglishNumber = (str) => {
    return parseFloat(str
        .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) { return d.charCodeAt(0) - 1776; }) // Convert Persian numbers
    ) * 1;
}

export const numberFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const toPersianNumberFormat = (number) => {
    return toPersianNumber(numberFormat(number))
}

export const toEnglishNumberInString = (string) => {
    const persianDigits = {
        '۰': '0',
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9'
    };

    let result = '';

    for (let i = 0; i < string.length; i++) {
        const char = string[i];
        if (char in persianDigits) {
            result += persianDigits[char];
        } else {
            result += char;
        }
    }

    return result;
}

