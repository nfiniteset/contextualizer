const assert = require('chai').assert;
const sinon = require('sinon');
const getQuoteAroundToken = require('./getQuoteAroundToken');

describe('getQuoteAroundToken', function() {
    it('should return the relevant portion of the comment containing the token', function() {
        const comment = 'This is a long comment that contains a @SpecificToken somewhere in the middle of the text.';
        const token = '@SpecificToken';
        const result = getQuoteAroundToken(comment, token);
        assert.include(result, token);
    });

    it('should return a string of maximum length 150', function() {
        const comment = 'This is a very long comment that contains a specific token somewhere in the middle of the text. It is meant to test the maximum length of the returned.';
        const token = 'specific token';
        const result = getQuoteAroundToken(comment, token);
        assert.isAtMost(result.length, 150);
    });

    it('should return a string of minimum length 120 if possible', function() {
        const comment = 'This is a very long comment that contains a specific token somewhere in the middle of the text. It is meant to test the minimum length of the returned string.';
        const token = 'specific token';
        const result = getQuoteAroundToken(comment, token);
        assert.isAtLeast(result.length, 120);
    });

    it('should return a string starting with ... if the token is not at the start', function() {
        const comment = 'This is a long comment that contains a specific token somewhere in the middle of the text.';
        const token = 'specific token';
        const result = getQuoteAroundToken(comment, token);
        assert.match(result, /^\.\.\./);
    });

    it('should return a string ending with ... if the token is not at the end', function() {
        const comment = 'This is a long comment that contains a specific token somewhere in the middle of the text.';
        const token = 'specific token';
        const result = getQuoteAroundToken(comment, token);
        assert.match(result, /\.\.\.$/);
    });

    it('should return the first 150 characters if the token is not found', function() {
        const comment = 'This is a long comment that does not contain the specific token. It is meant to test the case where the token is not found in the comment.';
        const token = 'nonexistent token';
        const result = getQuoteAroundToken(comment, token);
        assert.equal(result, comment.substring(0, 150));
    });
});