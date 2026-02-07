import { Page, Locator } from '@playwright/test';
import { ElementUtil } from '../Utils/ElementUtil';

export class ProductInfoPage {

    private readonly page: Page;
    private readonly eleUtil: ElementUtil;
    private readonly header: Locator;
    private readonly imagesCount: Locator;
    private readonly ProductMetaData: Locator;
    private readonly ProductPricing: Locator;
    private readonly ProductMap = new Map<string, string | number | null>();

    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.header = page.locator('h1');
        this.imagesCount = page.locator('div#content img');
        this.ProductMetaData = page.locator(`(//div[@id='content']//div[@class='col-sm-4']//ul[@class='list-unstyled'])[1]/li`);
        this.ProductPricing = page.locator(`(//div[@id='content']//div[@class='col-sm-4']//ul[@class='list-unstyled'])[2]/li`);

    }

    async getProductHeader(): Promise<string> {

        const header = await this.eleUtil.getInnerText(this.header);
        console.log(`Product Header :${header}`);
        return header.trim();
    }

    async getProductimagesCount(): Promise<number> {
        await this.eleUtil.waitForPageLoad('load');
        const NumOfImageCount = await this.imagesCount.count();
        console.log(`Count of images is ${NumOfImageCount}`);
        return NumOfImageCount;
    }

    private async getProductMetaData() {

        let prodmetadata: string[] = await this.ProductMetaData.allInnerTexts();
        for (let meta of prodmetadata) {
            let metadata: string[] = meta.split(':');
            let metakey = metadata[0].trim();
            let metavalue = metadata[1].trim();
            this.ProductMap.set(metakey, metavalue);
        }
    }
    private async getProductPricing() {

        let pricingdata: string[] = await this.ProductPricing.allInnerTexts();
        let productprice = pricingdata[0].trim();
        let productExTax = pricingdata[1].split(':')[1].trim();

        this.ProductMap.set('price', productprice);
        this.ProductMap.set('extaxprice', productExTax);
    }

    async getProductDetails(): Promise<Map<string, string | number | null>> {

        this.ProductMap.clear();
        let ProductHeader = await this.getProductHeader();
        let ProductimagesCount = await this.getProductimagesCount();

        this.ProductMap.set('header', ProductHeader);
        this.ProductMap.set('imagescount', ProductimagesCount);
        
        await this.getProductMetaData();
        await this.getProductPricing();
        console.log(`Full product details for product: ${await this.getProductHeader()}`);

        for (const [key, value] of this.ProductMap) {
            console.log(key,':', value);
        }
        return this.ProductMap;

    }
}