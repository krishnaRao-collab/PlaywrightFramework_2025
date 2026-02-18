
import { ResultsPage } from '../pages/ResultsPage';
import { test, expect } from '../fixtures/baseFixtures';


const Products=['macbook','imac','samsung','lenovo'];

for(const product of Products){
test(` @sanity Verify Search Count ${product}`, async({homePage})=>{

    let resultspage:ResultsPage= await homePage.doSearch(product);
    const count=await resultspage.getSearchResultCount();
    console.log(`Products Name & count is: ${product}`,count);
    expect(count).toBeGreaterThan(0);
    
});
}