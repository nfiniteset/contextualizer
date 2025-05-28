/**
 * Retrieves the relevant portion of a comment containing a specific token.
 *
 * @param {string} comment - The comment to search within.
 * @param {string} token - The token to search for within the comment.
 * @returns {string} - The relevant portion of the comment containing the token.
 */
export default function getQuoteAroundToken(comment, token) {
    const maxLength = 150;
    const minLength = 120;
    const tokenIndex = comment.indexOf(token);

    // If the token is not found, return the first part of the comment
    if (tokenIndex === -1) {
        return `${comment.substring(0, maxLength)}…`;
    }

    const tokenLength = token.length;
    let startIndex = Math.max(0, tokenIndex - Math.floor((maxLength - tokenLength) / 2));
    let endIndex = Math.min(comment.length, startIndex + maxLength);

    let quote = comment.substring(startIndex, endIndex);

    // If quote is shorter than the max length, index from the end of the comment
    if (quote.length < maxLength) {
        startIndex = comment.length - maxLength;
        endIndex = comment.length;
        quote = comment.substring(startIndex, endIndex);
    }

    // If the start of the comment is truncated, add an ellipsis
    if (startIndex > 0) {
        const firstSpaceIndex = quote.indexOf(' ');
        if (firstSpaceIndex !== -1) {
            quote = `${quote.substring(firstSpaceIndex).trim().replace(/^./, '…')}`;
        }
    }

    // If the end of the comment is truncated, add an ellipsis
    if (endIndex < comment.length) {
        const lastSpaceIndex = quote.lastIndexOf(' ');
        if (lastSpaceIndex !== -1) {
            quote = `${quote.substring(0, lastSpaceIndex).trim()}…`;
        }
    }

    return quote;
}