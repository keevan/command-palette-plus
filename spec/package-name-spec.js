'use babel';

import Package from '../lib/main';

// Use the command `window:run-package-specs` (ctrl+shift+y) to run specs.
describe('PackageName', () => {
    describe('Example test', () => {
        it('has to be different', () => {
            expect('apple').toNotEqual('oranges')
        })
    })
});
