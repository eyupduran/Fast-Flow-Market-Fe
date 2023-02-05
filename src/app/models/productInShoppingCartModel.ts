export class ProductInShoppingCartModel{
    productId:number;
    quantity:number;

    constructor(productId: number, quantity: number) {
        this.productId = productId;
        this.quantity = quantity;
    }
}