import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { useSelector } from "react-redux";
import { getAllProducts, getProductDetails } from "../../Actions/searchAction";
import Card from "@ingka/card";
import "./products.scss";
import { useNavigate } from "react-router-dom";
const Products = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { allProductDetails } = useSelector((state: RootState) => state.productDetailsList);
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    const onSelectProduct = (product: any) => {
        navigate("/productdetails/" + product.id);
        dispatch(getProductDetails(product.id));
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