export default function getQuoteParts(quote, token) {
    const index = quote.indexOf(token);

    if (index === -1) {
        return [quote, "", ""];
    }

    const beforeToken = quote.slice(0, index);
    const afterToken = quote.slice(index + token.length);
    return [beforeToken, token, afterToken];
}