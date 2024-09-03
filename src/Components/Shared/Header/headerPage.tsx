import React, { useEffect, useState } from "react";
import Search from '@ingka/search';
import Button from "@ingka/button";
import Avatar from '@ingka/avatar';
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Store/store";
import "./headerPage.scss";
import shoppingBagAdd from "@ingka/ssr-icon/paths/shopping-bag-add";
import SearchResults from "../../SearchResults/searchResults";
import { useNavigate } from "react-router-dom";
import { getSearchResults, resetProductsByCategory, searchSuggetion, setSearchInputValue } from "../../../Actions/searchAction";
import { useDispatch } from "react-redux";

import home from "@ingka/ssr-icon/paths/home";
import CartDetails from "../../CartDetails/cartDetails";
const HeaderPage = () => {
    const { suggestionList } = useSelector((state: RootState) => state.searchDetailsList);
    const { cartItems } = useSelector((state: RootState) => state.cartItemsList);
    const [inputValue, setInputValue] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [toastVisible, setToastVisible] = useState<boolean>(false);
    useEffect(() => {
        dispatch(resetProductsByCategory());
    }, [dispatch]);

    useEffect(() => {
        let searchDebounce: any;
        if (inputValue) {
            searchDebounce = setTimeout(() => {
                dispatch(searchSuggetion(inputValue));
            }, 300);
        } 
        return () => {
            clearTimeout(searchDebounce);
        };
    }, [inputValue]);
    const onSearch = () => {
        if (window.location.pathname !== "/itemList") {
            navigate("/itemList");
        }
        dispatch(getSearchResults(inputValue, 5, 0,null,null));
        dispatch(resetProductsByCategory());
        dispatch(setSearchInputValue(inputValue));
        setInputValue("");
    };
    const onClickHome = () => {
        navigate("/");
    };
    const onSearchFieldChange = (_e: any, data: any) => {
        setInputValue(data.value);
    };
    const onCartResultClick = () => {
        setModalOpen(true);
    };
    return (
        <header className="header">
            <Button type="emphasised" size="small" ssrIcon={home} onClick={onClickHome} />
            <div className="search-box-container">
                <Search
                    id="search"
                    onSearch={onSearch}
                    value={inputValue}
                    onChange={onSearchFieldChange}
                />
                {inputValue && suggestionList && suggestionList.products?.length > 0 && <SearchResults />}
            </div>
            <div className="header-right">
                <Button
                    href=""
                    iconPosition="trailing"
                    size="xsmall"
                    ssrIcon={shoppingBagAdd}
                    text={cartItems?.length ? cartItems.length : ""}
                    type="emphasised"
                    onClick={onCartResultClick}
                />
                <Avatar screenReaderText="Initials of Tamizh Priyan"
                    size="medium"
                    text="TP"
                    variant="secondary"
                />
            </div>
            {modalOpen && <div>
                <CartDetails setModalOpen={setModalOpen}
                    setToastVisible={setToastVisible}
                />
            </div>}
        </header>
    );
}
export default HeaderPage;