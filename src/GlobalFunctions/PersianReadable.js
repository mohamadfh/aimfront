const english_to_persian_digits = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹'
}

export default function numberToPersianText(number) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    const numStr = number.toString();
    let persianText = "";

    for (let i = 0; i < numStr.length; i++) {
        const digit = parseInt(numStr.charAt(i));
        persianText += persianDigits[digit];
    }

    return persianText;
}
