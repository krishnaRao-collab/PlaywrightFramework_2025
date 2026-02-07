import{Page,Locator} from '@playwright/test';
import{ElementUtil} from '../Utils/ElementUtil';
import { ProductInfoPage } from './ProductInfoPage';


export class ResultsPage{

    private readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly result:Locator;
       

    constructor(page:Page){
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.result=page.locator('div.product-thumb');
        
        
    }
    async getSearchResultCount():Promise<number>{
        return await this.result.count();
    }

    async selectProduct(ProductName:string){
        console.log('======ProductName'+ProductName);
        await this.eleUtil.waitForPageLoad('load');
        await this.eleUtil.click(this.page.getByRole('link',{name: `${ProductName}`}).first());
        return new ProductInfoPage(this.page);
        
    }
}