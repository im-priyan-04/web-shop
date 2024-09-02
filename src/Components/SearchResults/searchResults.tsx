import React from "react";
import { useSelector } from "react-redux";
import "./searchResults.scss";
import {  RootState } from "../../Store/store";

const SearchResults = () => {

    const { suggestionList } = useSelector((state:RootState) => state.searchDetailsList);
;
    const limit = 5;
    const onSelectProduct = (product: any) => {
        console.log("product", product);
    }
    return (   
        <ul className="search-suggestions-list">
            {suggestionList.products.slice(0, limit).map((product:any) => (
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