import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';


test('Verify Valid Credentials @login', async({page})=>{

    // annotation:
    // [
    //     {type:'feature',description: 'Login functionality'},
    //     {type:'owner',description: 'Ramakrishna G'},
    // ]

    test.info().annotations.push({ type: 'feature', description: 'Login functionality' });
    test.info().annotations.push({ type: 'owner', description: 'Ramakrishna G' });
    const lp=new LoginPage(page) ;
    await lp.launchURL();
    let homePage:HomePage=await lp.doLogin('pwtest1@play.com','Nokia5809+');
    expect(await homePage.isUserLoggedIn()).toBeTruthy();
})

test.skip('Verify Invalid Credentials', async({page})=>{
    const lp=new LoginPage(page) ;
    await lp.launchURL();
    await lp.doLogin('pwtest1@play8888.com','Nokia5809222');
    const errMsg=await lp.getInvalidLoginMsg();
    expect(errMsg).toContain(' Warning: No match for E-Mail Address and/or Password.');
})
