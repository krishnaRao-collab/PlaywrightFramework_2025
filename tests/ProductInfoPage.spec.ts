import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';

const search = [
    { searchkey: 'MacBook', productname: 'MacBook Pro' },
    { searchkey: 'imac', productname: 'iMac' },
    { searchkey: 'MacBook', productname: 'MacBook Air' },
    { searchkey: 'samsung', productname: 'Samsung Galaxy Tab 10.1' },

]

for (const product of search) {
    test(`Verify Product Header ${product.productname}` ,{ tag: ['@product', '@smoke'] }, async ({ page }) => {

        const lp = new LoginPage(page);
        await lp.launchURL();
        const homePage: HomePage = await lp.doLogin('seltest4@play.com', 'Nokia5809');
        let resultspage: ResultsPage = await homePage.doSearch(product.searchkey);
        let productInfoPage: ProductInfoPage = await resultspage.selectProduct(product.productname);
        expect(await productInfoPage.getProductHeader()).toBe(product.productname);

    });
}


test('Verify Product MetaData', { tag: ['@product', '@sanity'] },async ({ page }) => {

    const lp = new LoginPage(page);
    await lp.launchURL();

    const homePage: HomePage = await lp.doLogin('seltest4@play.com', 'Nokia5809');

    const resultspage: ResultsPage = await homePage.doSearch('macbook');
    const productInfoPage: ProductInfoPage = await resultspage.selectProduct('MacBook Pro');

    let actualFullProductDetails = await productInfoPage.getProductDetails();
    expect.soft(actualFullProductDetails.get('header')).toBe('MacBook Pro');
    expect.soft(actualFullProductDetails.get('Brand')).toBe('Apple');
    expect.soft(actualFullProductDetails.get('Product Code')).toBe('Product 18');
    expect.soft(actualFullProductDetails.get('Reward Points')).toBe('800');
    expect.soft(actualFullProductDetails.get('Availability')).toBe('Out Of Stock');

});

test('Verify Product PricingData', async ({ page }) => {

    const lp = new LoginPage(page);
    await lp.launchURL();

    const homePage: HomePage = await lp.doLogin('seltest4@play.com', 'Nokia5809');

    const resultspage: ResultsPage = await homePage.doSearch('macbook');
    const productInfoPage: ProductInfoPage = await resultspage.selectProduct('MacBook Pro');

    let actualFullProductDetails = await productInfoPage.getProductDetails();

    expect.soft(actualFullProductDetails.get('header')).toBe('MacBook Pro');
    expect.soft(actualFullProductDetails.get('price')).toBe('$2,000.00');
    expect.soft(actualFullProductDetails.get('extaxprice')).toBe('$2,000.00');



});




