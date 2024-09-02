import React, { useEffect, useState } from "react";
import Search from '@ingka/search';
import Button from "@ingka/button";
import Avatar from '@ingka/avatar';
import "./headerPage.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchSuggetion, getSearchResults } from "../../../Actions/searchAction";
import { AppDispatch, RootState } from "../../../Store/store";
import SearchResults from "../../SearchResults/searchResults";
import home from "@ingka/ssr-icon/paths/home";
const HeaderPage = () => {
    const { suggestionList } = useSelector((state: RootState) => state.searchDetailsList);
    const [inputValue, setInputValue] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const searchParms = useSearchParams()
    console.log("searchParms", searchParms);
    useEffect(() => {
        if (inputValue) {
            dispatch(searchSuggetion(inputValue));
        }

    }, [inputValue]);
    const onSearch = () => {
        dispatch(getSearchResults(inputValue));
        setInputValue("");
    };
    const onClickHome = () => {
        navigate("/");
    };
    const onSearchFieldChange = (_e: any, data: any) => {
        setInputValue(data.value);
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
                <Avatar screenReaderText="Initials of Tamizh Priyan"
                    size="medium"
                    text="TP"
                    variant="secondary"
                />

            </div>
        </header>
    );
}
export default HeaderPage;