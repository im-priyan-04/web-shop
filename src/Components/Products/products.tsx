import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../Actions/searchAction";
import Card from "@ingka/card";
import "./products.scss";
const Products = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { allProductDetails } = useSelector((state: RootState) => state.productDetailsList);
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    const onSelectProduct = (product: any) => {
        console.log("product", product);
    }
    return (
        <div className="demo-card-container">
            <div className="demo-card-flex" >
                {allProductDetails && allProductDetails?.products?.map((product: any) => (
                    <Card
                        compact
                        title={product.title}
                        label={product.brand}
                        imageProps={{ src: product.images?.[0], }}
                        emphasised
                        onClick={() => { onSelectProduct(product) }}
                    />))
                }
            </div>
        </div>
    );
}

export default Products;