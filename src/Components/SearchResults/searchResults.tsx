import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./searchResults.scss";
import { getProductDetails, searchSuggetion } from "../../Actions/searchAction";
import { AppDispatch, RootState } from "../../Store/store";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {

    const { suggestionList } = useSelector((state: RootState) => state.searchDetailsList);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const limit = 5;
    const onSelectProduct = (product: any) => {
        navigate("/productdetails/" + product.id);
        dispatch(getProductDetails(product.id));
        dispatch(searchSuggetion(null))
        // dispatch(getProductsByCategory(category.slug));
    };
    return (
        <ul className="search-suggestions-list">
            {suggestionList.products.slice(0, limit).map((product: any) => (
                <li
                    onClick={() => onSelectProduct(product)}
                    data-test={`autocomplete-suggestions-${product.id}`}
                    className={"autocomplete-suggestions"}
                    key={product.id}>

                    <div>
                        <span>{product.title}</span>

                    </div>

                </li>
            ))}
        </ul>
    )
}

export default SearchResults;