export default function getQuoteParts(quote, token) {
    const index = quote.indexOf(token);
    const beforeToken = quote.slice(0, index);
    const afterToken = quote.slice(index + token.length);
    return [beforeToken, token, afterToken];
}