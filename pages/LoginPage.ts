import{Page,Locator} from '@playwright/test';
import{ElementUtil} from '../Utils/ElementUtil';
import{HomePage} from '../pages/HomePage';

export class LoginPage{

    private readonly page:Page;
    private readonly emailId:Locator;
    private readonly password:Locator;
    private readonly loginBtn:Locator;
    private readonly WarningMsg:Locator;
    private readonly eleUtil:ElementUtil;


constructor(page:Page){
    this.page=page;
    this.emailId=page.getByRole('textbox',{name:'E-Mail Address'});
    this.password=page.getByRole('textbox',{name:'Password'});
    this.loginBtn=page.locator(`input[type="submit"][value='Login']`);
    this.WarningMsg=page.locator('.alert.alert-danger.alert-dismissible');
    this.eleUtil=new ElementUtil(page);

}

async launchURL(){
    await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
}

async doLogin(email:string,password:string){
    await this.eleUtil.fill(this.emailId,email);
    await this.eleUtil.fill(this.password,password);
    await this.loginBtn.click();
    return new HomePage(this.page);
}

async getInvalidLoginMsg():Promise<string|null>{
 const errMsg=   await this.eleUtil.getText(this.WarningMsg);
 console.log(errMsg);
 return errMsg;
}

}
