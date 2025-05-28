import { assert } from 'chai';
import sinon from 'sinon';
import getQuoteAroundToken from '../getQuoteAroundToken.js';

describe('getQuoteAroundToken', () => {
    describe('with a comment that is longer than 150 characters', () => {
        it('returns the relevant portion of the comment containing the token', () => {
            const comment = `Progress update: Completed the rough cut and initiated color correction, 
            which is now 70% done. We hit a minor snag with audio sync in Interview B 
            but managed to resolve it efficiently. Also, the motion graphics template is in, 
            but we're awaiting final approval (Head's up @SpecificToken!). 
            Noticed some discrepancies in the proxy files for the drone shots; 
            re-encoding those to ensure smooth editing. Can you confirm the timeline 
            for the remaining color grading and review the updated drone footage? 
            Your feedback will be crucial for final adjustments.`;
            const token = '@SpecificToken';
            
            const result = getQuoteAroundToken(comment, token);
            assert.include(result, token);
        });

        it('returns a string of maximum length 150', () => {
            const comment = `@SpecificToken, here's a progress update: Completed the rough cut and initiated color correction, 
            which is now 70% done. We hit a minor snag with audio sync in Interview B 
            but managed to resolve it efficiently. Also, the motion graphics template is in, 
            but we're awaiting final approval. Noticed some discrepancies in the proxy files 
            for the drone shots; re-encoding those to ensure smooth editing. Can you confirm 
            the timeline for the remaining color grading and review the updated drone footage? 
            Your feedback will be crucial for final adjustments.`;
            const token = '@SpecificToken';

            const result = getQuoteAroundToken(comment, token);
            assert.isAtMost(result.length, 150);
        });

        it('prepends … if the token is not at the start', () => {
            const comment = `Here's a progress update: Completed the rough cut and initiated color correction, 
            which is now 70% done. We hit a minor snag with audio sync in Interview B 
            but managed to resolve it efficiently. Also, the motion graphics template is in, 
            but we're awaiting final approval. Noticed some discrepancies in the proxy files 
            for the drone shots; re-encoding those to ensure smooth editing. Can you confirm 
            the timeline for the remaining color grading and review the updated drone footage? 
            Your feedback will be crucial for final adjustments. @SpecificToken`;
            const token = '@SpecificToken';

            const result = getQuoteAroundToken(comment, token);
            assert.match(result, /^…/);
        });

        it('appends … if the token is not at the end', () => {
            const comment = `@SpecificToken, here's a progress update: Completed the rough cut and initiated color correction, 
            which is now 70% done. We hit a minor snag with audio sync in Interview B 
            but managed to resolve it efficiently. Also, the motion graphics template is in, 
            but we're awaiting final approval. Noticed some discrepancies in the proxy files 
            for the drone shots; re-encoding those to ensure smooth editing. Can you confirm 
            the timeline for the remaining color grading and review the updated drone footage? 
            Your feedback will be crucial for final adjustments.`;
            const token = '@SpecificToken';
            
            const result = getQuoteAroundToken(comment, token);
            assert.match(result, /…$/);
        });
    });

    describe('with a comment with the token at the end', () => {
        it('returns a string of minimum length 120 if possible', () => {
            const comment = `Here's a progress update: Completed the rough cut and initiated color correction, 
            which is now 70% done. We hit a minor snag with audio sync in Interview B 
            but managed to resolve it efficiently. Also, the motion graphics template is in, 
            but we're awaiting final approval. Noticed some discrepancies in the proxy files 
            for the drone shots; re-encoding those to ensure smooth editing. Can you confirm 
            the timeline for the remaining color grading and review the updated drone footage? 
            Your feedback will be crucial for final adjustments. @TokenAtTheEnd`;
            const token = '@TokenAtTheEnd';
            const result = getQuoteAroundToken(comment, token);

            assert.isAtLeast(result.length, 120);
            assert.isAtMost(result.length, 150);
        });
    });

    describe('with no matching token', () => {
        it('returns the first 150 characters', () => {
            const comment = `Here's a progress update: Completed the rough cut and initiated color correction, 
            which is now 70% done. We hit a minor snag with audio sync in Interview B 
            but managed to resolve it efficiently. Also, the motion graphics template is in, 
            but we're awaiting final approval. Noticed some discrepancies in the proxy files 
            for the drone shots; re-encoding those to ensure smooth editing. Can you confirm 
            the timeline for the remaining color grading and review the updated drone footage? 
            Your feedback will be crucial for final adjustments.`;
            const token = '@SpecificToken';

            const result = getQuoteAroundToken(comment, token);
            assert.equal(result, `${comment.substring(0, 150)}…`);
        });
    });
    
});