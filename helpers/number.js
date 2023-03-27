export const toPersianNumber = (number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number.toString().replace(/\d/g, (match) => persianDigits[parseInt(match)]);
}

export const numberFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const toPersianNumberFormat = (number) => {
    return toPersianNumber(numberFormat(number))
}

