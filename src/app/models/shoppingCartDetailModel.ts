export interface ShoppingCartDetailModel{
    shoppingCartId: number
    productId:number
    productName?: string
    description?:string
    unitPrice?:number
    categoryId?:number
    imagePath?: string
    userId:number
    firstName?:string
    lastName?: string
    quantity?: number
}