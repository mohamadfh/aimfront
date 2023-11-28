function roundAndConvertToArabic(number) {
    const roundedNumber = parseFloat(number).toFixed(1);

    const arabicDigits = [...roundedNumber].map(char => {
        if (char >= '0' && char <= '9') {
            return String.fromCharCode(char.charCodeAt(0) + 1728);
        } else {
            return char;
        }
    });

    return arabicDigits.join('');
}

export default roundAndConvertToArabic()