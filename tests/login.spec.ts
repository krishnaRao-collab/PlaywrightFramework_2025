import {LoginPage} from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import{test,expect} from '../fixtures/baseFixtures';

test('Verify Valid Credentials @login', async({homePage})=>{

    // annotation:
    // [
    //     {type:'feature',description: 'Login functionality'},
    //     {type:'owner',description: 'Ramakrishna G'},
    // ]

    test.info().annotations.push({ type: 'feature', description: 'Login functionality' });
    test.info().annotations.push({ type: 'owner', description: 'Ramakrishna G' });
    
    await expect(homePage.page).toHaveTitle('My Account');
})

test.skip('Verify Invalid Credentials', async({page})=>{
    const lp=new LoginPage(page) ;
    await lp.launchURL();
    await lp.doLogin('pwtest1@play8888.com','Nokia5809222');
    const errMsg=await lp.getInvalidLoginMsg();
    expect(errMsg).toContain(' Warning: No match for E-Mail Address and/or Password.');
})
