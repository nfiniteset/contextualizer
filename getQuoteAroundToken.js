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

    const tokenLength = token.length;
    let startIndex = Math.max(0, tokenIndex - Math.floor((maxLength - tokenLength) / 2));
    let endIndex = Math.min(comment.length, startIndex + maxLength);

    if (tokenIndex === -1) {
        startIndex = 0;
        endIndex = maxLength;
    }

    let relevantComment = comment.substring(startIndex, endIndex);

    if (relevantComment.length < minLength) {
        startIndex = Math.max(0, endIndex - maxLength);
        relevantComment = comment.substring(startIndex, endIndex);
    }

    if (startIndex > 0) {
        const firstSpaceIndex = relevantComment.indexOf(' ');
        if (firstSpaceIndex !== -1) {
            relevantComment = `...${relevantComment.substring(firstSpaceIndex).trim()}`;
        }
    }

    if (endIndex < comment.length) {
        const lastSpaceIndex = relevantComment.lastIndexOf(' ');
        if (lastSpaceIndex !== -1) {
            relevantComment = `${relevantComment.substring(0, lastSpaceIndex).trim()}...`;
        }
    }

    return relevantComment;
}