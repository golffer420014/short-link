const isValidUrl = (string) => {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

const isValidCustomCode = (code) => {
    return /^[a-zA-Z0-9_-]{3,32}$/.test(code);
}

const generateUniqueCode = (existingUrls, length = 6) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code;
    do {
        code = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    } while (existingUrls[code]);
    return code;
}

module.exports = {
    isValidUrl,
    isValidCustomCode,
    generateUniqueCode,
};
