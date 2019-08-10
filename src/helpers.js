export const KEY = '#&$^!~?}*>';

export const cipher = (str, key = KEY) => {
    const strLen = str.length;
    let cipheredText = '';
    for (let i = 0; i < strLen; i++) {
        if (!isNaN(str[i])) {
            cipheredText += key[str[i]];
        } else {
            cipheredText += str[i];
        }
    }
    return cipheredText;
}

export const decipher = (str, key = KEY) => {
    const strLen = str.length;  
    let decipheredText = '';
    for (let i = 0; i< strLen; i++) {
        if (str[i] === '.' || str[i] === '/' || str[i] === '|') {
            decipheredText += str[i];
        } else if (key.indexOf(str[i]) !== -1) {
            decipheredText += key.indexOf(str[i]);
        }
    }
    return decipheredText;
}