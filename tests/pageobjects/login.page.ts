import { $ } from '@wdio/globals'
import { ChainablePromiseElement } from 'webdriverio';

class LoginPage {
    
    public get inputUsername () {
        return $('~test-Username');
    }

    public get inputPassword () {
        return $('~test-Password');
    }

    public get btnSubmit () {
        return $('~test-LOGIN');
    }

    public get errorMsg () {
        return $('//android.view.ViewGroup[@content-desc="test-Error message"]//android.widget.TextView');
    }
    
    public async login(username: string, password: string){
        await this.inputUsername.waitForDisplayed({timeout: 10000});
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
}

export default new LoginPage();
