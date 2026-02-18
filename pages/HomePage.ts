import { Page, Locator } from '@playwright/test';
import { ElementUtil } from '../Utils/ElementUtil';
import { LoginPage } from '../pages/LoginPage';
import { ResultsPage } from '../pages/ResultsPage';


export class HomePage {

     readonly page: Page;
    private readonly eleUtil: ElementUtil;
    private readonly Logoutlink: Locator;
    private readonly Loginlink: Locator;
    private readonly searchbox: Locator;
    private readonly searchicon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.Loginlink = page.getByRole('link', { name: 'Login' });
        this.Logoutlink = page.getByRole('link', { name: 'Logout' });
        this.searchbox = page.getByPlaceholder('Search');
        this.searchicon = page.locator('button.btn.btn-default.btn-lg');

    }
    async isUserLoggedIn(): Promise<boolean> {
        return await this.eleUtil.isVisible(this.Logoutlink, 0);

    }

    async doLogout() {

        await this.eleUtil.click(this.Logoutlink, { timeout: 5000 }, 0);
        await this.eleUtil.click(this.Loginlink, { timeout: 5000 }, 0);
        return new LoginPage(this.page);

    }

    async doSearch(searchkey: string) {
        console.log(`Enter Search key: ${searchkey}`);
        await this.eleUtil.fill(this.searchbox, searchkey);
        await this.eleUtil.click(this.searchicon);
        return new ResultsPage(this.page);
    }

}