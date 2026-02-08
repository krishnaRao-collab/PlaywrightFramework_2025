import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultsPage';


const Products=['macbook','imac','samsung','lenovo'];

for(const product of Products){
test(` @sanity Verify Search Count ${product}`, async({page})=>{

    const lp=new LoginPage(page) ;
    await lp.launchURL();
    const homePage:HomePage=await lp.doLogin('pwtest1@play.com','Nokia5809+');
    let resultspage:ResultsPage= await homePage.doSearch(product);
    const count=await resultspage.getSearchResultCount();
    console.log(`Products Name & count is: ${product}`,count);
    expect(count).toBeGreaterThan(0);
    
});
}