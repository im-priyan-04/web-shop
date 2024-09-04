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