import { $ } from '@wdio/globals'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage {
    /**
     * define selectors using getter methods
     */
    public get btnMenu () {
        return $('~test-Menu');
    }

    public get btnCart () {
        return $('~test-Cart');
    }
}

export default new HomePage();
