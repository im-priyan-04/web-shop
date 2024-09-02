import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { useSelector } from "react-redux";
import { getCategory, } from "../../Actions/searchAction";
import "./category.scss";
const Category = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categoryDetails } = useSelector((state: RootState) => state.categoryDetailsList);

    useEffect(() => {
        dispatch(getCategory())
    }, [])

    const onClick = (category: any) => {
        console.log("category", category);
    };

    return (
        <div className="category-list">
            {categoryDetails && categoryDetails.map((category: any) => (
                <li
                    onClick={() => onClick(category)}
                    data-test={`autocomplete-suggestions-${category.slug}`}
                    className={"autocomplete-suggestions"}
                    key={category.slug}>
                    <div>
                        <span>{category.name}</span>
                    </div>
                </li>
            ))
            }
        </div>
    );
}

export default Category;
