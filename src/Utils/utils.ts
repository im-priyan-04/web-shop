import { setCartItems } from "../Actions/searchAction";
import store from "../Store/store";

export const stockAvailability = ( products: any) => {
    let stockLabel = "";
        let color = "";
        if (products.availabilityStatus === "In Stock") {
            stockLabel = "In Stock";
            color = "green";
        } else if (products.availabilityStatus === "Low Stock") {
            stockLabel = "Low in Stock";
            color = "orange";
        } else {
            stockLabel = "Out of Stock";
            color = "red";
        }

        return { stockLabel, color };
}

export const getTotalPrice = (cartItems: any) => {
    let totalPrice = 0;
    cartItems.forEach((item: any) => {
        totalPrice += item.price * item.quantity;
    });
    return totalPrice;
}

export const getTotalDiscount = (cartItems: any) => {
    let totalDiscount = 0;
    cartItems.forEach((item: any) => {
        totalDiscount += item.discountPercentage;
    });
    return totalDiscount;
}

export const checkQuantity = (cartItems: any[], product: any, action: string) => {
    console.log(cartItems, product, action);

    const updatedCartItems = cartItems.map((cartItem: any) => {
        if (cartItem.id === product.id) {
            if (action === "decrease") {
                const updatedQuantity = cartItem.quantity - 1;
                return { ...cartItem, quantity: updatedQuantity };
            } else {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
        }
        return cartItem;
    }).filter(cartItem => cartItem.quantity > 0); // Filter out items with quantity 0

    store.dispatch(setCartItems(updatedCartItems));
};