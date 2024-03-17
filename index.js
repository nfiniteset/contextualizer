/**
 * Retrieves the relevant portion of a comment containing a specific token.
 *
 * @param {string} comment - The comment to search within.
 * @param {string} token - The token to search for within the comment.
 * @returns {string} - The relevant portion of the comment containing the token.
 */
function getRelevantComment(comment, token) {
    const maxLength = 150;
    const tokenIndex = comment.indexOf(token);

    if (tokenIndex === -1) {
        return '';
    }

    const tokenLength = token.length;
    const startIndex = Math.max(0, tokenIndex - Math.floor((maxLength - tokenLength) / 2));
    const endIndex = Math.min(comment.length, startIndex + maxLength);

    let relevantComment = comment.substring(startIndex, endIndex);
    console.log(relevantComment.length)

    if (startIndex > 0) {
        const firstSpaceIndex = relevantComment.indexOf(' ');
        if (firstSpaceIndex !== -1) {
            relevantComment = '...' + relevantComment.substring(firstSpaceIndex).trim();
        }
    }

    if (endIndex < comment.length) {
        const lastSpaceIndex = relevantComment.lastIndexOf(' ');
        if (lastSpaceIndex !== -1) {
            relevantComment = relevantComment.substring(0, lastSpaceIndex).trim() + '...';
        }
    }

    return relevantComment;
}

const comment = `I wanted to share an update on the smart thermostat project we've been working on. It's really coming together nicely! We've made significant progress in implementing the core functionality, including temperature control, scheduling, and energy-saving features. The user interface is intuitive and user-friendly, allowing users to easily set their desired temperature and schedule. One of the key features we've added is the ability to connect the thermostat to a mobile app, enabling users to control their home's temperature remotely. This adds a whole new level of convenience and energy efficiency. We've also been working on integrating the thermostat with other smart home devices, such as voice assistants and home automation systems. This will allow users to control their thermostat using voice commands or automate temperature adjustments based on specific conditions. Overall, I'm really impressed with the progress we've made so far. The team's collaboration and dedication have been outstanding. Keep up the great work!`;

const token = '@SeanDurham';
const relevantComment = getRelevantComment(comment, token);
console.log(relevantComment);