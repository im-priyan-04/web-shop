import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { useSelector } from "react-redux";
import { getAllProducts, getProductDetails, searchSuggetion } from "../../Actions/searchAction";
import Card from "@ingka/card";
import "./products.scss";
import { useNavigate } from "react-router-dom";
import Button from "@ingka/button";
const Products = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { allProductDetails } = useSelector((state: RootState) => state.productDetailsList);
    const [productList, setProductList] = useState<any>([]);
    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);  
    const [skip, setSkip] = useState(0);
    const [showMoreBtn, setShowMoreBtn] = useState(false);
    useEffect(() => {
        dispatch(getAllProducts(limit,skip));
    }, []);

    useEffect(() => {
        if(showMoreBtn){
            setProductList([...productList, ...(allProductDetails?.products || [])]);
            setShowMoreBtn(false);
        }else{
        setProductList([ ...(allProductDetails?.products || [])]);
    }
    }, [allProductDetails]);

    const showMore = () => {
        setShowMoreBtn(true);
        setSkip(productList.length);
        dispatch(getAllProducts(limit,(skip+allProductDetails.products.length)));
    }

    const onSelectProduct = (product: any) => {
        navigate("/productdetails/" + product.id);
        dispatch(getProductDetails(product.id));
    }
    return (
       <div>
        <div className="card-container">
            <div className="card-flex" >
                {productList && productList?.map((product: any, key:any) => (
                    <Card
                        key={key}
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
       <div className="card-btn">
       <Button type="emphasised" size="small" text="Show More" onClick={showMore} />
      </div> 
       </div>
    );
}

export default Products;