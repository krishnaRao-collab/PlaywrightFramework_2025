import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { test as base, expect } from '@playwright/test';


type myFixture={
    homePage:HomePage;
}


export const test=base.extend<myFixture>({

    homePage:async({page,baseURL},use,testInfo)=>{
        const loginPage=new LoginPage(page);
        await loginPage.launchURL(baseURL);

        const username=testInfo.project.metadata.appUsername;
        const password=testInfo.project.metadata.appPassword;

        const homePage=await loginPage.doLogin(username,password);
        expect(await homePage.isUserLoggedIn()).toBeTruthy();

        await use(homePage); //giver


    }
})

export{expect}