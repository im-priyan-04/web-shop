export const getQuantityList = (cartItems: any, products: any) => {
    return products.map((product: any) => {
        const cartItem = cartItems?.find((item: any) => item.id === product.id);
        return cartItem ? cartItem.quantity : 0;
    });
}