import React, { useEffect, useState } from 'react';
import './itemList.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/store';
import Table, { TableBody, TableHeader } from '@ingka/table';
import Image from '@ingka/image';
import Button from "@ingka/button";
import fillBucket from "@ingka/ssr-icon/paths/fill-bucket";
import { useNavigate } from 'react-router-dom';
import { getProductDetails, getProductsByCategory, getSearchResults, setCartItems } from '../../Actions/searchAction';
import Pill from '@ingka/pill';
import Text from '@ingka/text';
import ListBox, {
    MenuItem,
} from '@ingka/list-box';
import chevronDown from "@ingka/ssr-icon/paths/chevron-down";
import { stockAvailability } from '../../Utils/utils';
import QuantityStepper from '@ingka/quantity-stepper';
import Status from '@ingka/status';
import Badge from '@ingka/badge';
const ItemList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { productByCategory } = useSelector((state: RootState) => state.categoryDetailsList);
    const { searchResult, searchInputValue } = useSelector((state: RootState) => state.searchDetailsList);
    const { cartItems } = useSelector((state: RootState) => state.cartItemsList);
    const [itemListData, setItemListData] = useState<any>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>();
    const [cartItemList, setCartItemsList] = useState<any>();
    const [openSortingList, setOpenSortingList] = useState<boolean>(false);
    const [selectedSortValue, setSelectedSortValue] = useState<any>();
    const [orderBy, setOrderBy] = useState<string>("desc");
    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);
    const [sortClick, setSortClick] = useState(false);
    const [loadMoreClick, setLoadMoreClick] = useState(false);

    useEffect(() => {
        if (searchResult?.products?.length > 0) {
            if (loadMoreClick && !sortClick) {
                setItemListData([...itemListData, ...(searchResult?.products || [])]);
            } else if (sortClick && !loadMoreClick) {
                setItemListData(searchResult?.products || []);
            } else {
                setItemListData(searchResult?.products || []);
            }
        }
    }, [searchResult]);

    useEffect(() => {
        if (productByCategory?.products?.length > 0) {
            if (loadMoreClick && !sortClick) {
                setItemListData([...itemListData, ...(productByCategory?.products || [])])
            } else if (sortClick && !loadMoreClick) {
                setItemListData(productByCategory?.products || []);
            } else {
                setItemListData(productByCategory?.products || []);
            }
            setTotal(productByCategory.total);
        }
    }, [productByCategory]);

    useEffect(() => {
        if (cartItems?.length === 0) {
            setCartItemsList([]);
        } else {
            setCartItemsList(cartItems);
        }
    }, [cartItems]);

    const checkQuantity = (cartItem: any, product: any, action: string) => {
        if (action === "decrease") {
            return cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem;
        } else {
            return cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem;
        }
    };

    const updateCartItemsList = (cartItemList: any[], selectedData: any, action: string) => {
        const cartDetails = cartItemList.find((item: any) => item.id === selectedData.id);
        if (cartDetails) {
            return cartItemList.map((item: any) => checkQuantity(item, selectedData, action));
        } else {
            return [...cartItemList, { ...selectedData, quantity: action === "increase" ? 1 : 0 }];
        }
    };

    const mergeCartItems = (cartItems: any[], updatedCartItems: any[]) => {
        const finalCartItems = cartItems ? [...cartItems] : [];

        updatedCartItems.forEach((item) => {
            const existingItemIndex = finalCartItems.findIndex((cartItem) => cartItem.id === item.id);
            if (existingItemIndex !== -1) {
                if (item.quantity === 0) {
                    finalCartItems.splice(existingItemIndex, 1);
                } else {
                    finalCartItems[existingItemIndex] = {
                        ...finalCartItems[existingItemIndex],
                        quantity: item.quantity,
                    };
                }
            } else if (item.quantity !== 0) {
                finalCartItems.push(item);
            }
        });
        return finalCartItems;
    };

    const onCartQuantity = (selectedData: any, index: number, e: any, quantity: string) => {
        const updatedData = { ...selectedData };
        if (cartItemList === null) {
            updatedData.quantity = 1;
        }
        const updatedCartItems = cartItemList ? updateCartItemsList(cartItemList, updatedData, quantity) : [updatedData];
        setCartItemsList(updatedCartItems);
        const finalCartItems = mergeCartItems(cartItems, updatedCartItems);
        dispatch(setCartItems(finalCartItems));
    };

    const filterClick = (e: any, data: any) => {
        let filterData: any = [];
        if (searchResult?.products?.length > 0) {
            if (data === "Remove") {
                filterData = searchResult.products;
            } else {
                filterData = searchResult.products.filter((item: any) => item.availabilityStatus === data);
            }
        } else if (productByCategory?.products?.length > 0) {
            if (data === "Remove") {
                filterData = productByCategory.products;
            } else {
                filterData = productByCategory.products.filter((item: any) => item.availabilityStatus === data);
            }
        }

        data === "Remove" ? setSelectedFilter("") : setSelectedFilter(data);
        setItemListData(filterData);
    }

    const openSorting = () => {
        setOpenSortingList(!openSortingList);
    }

    const selectedSorting = (e: any, data: any) => {
        setSortClick(true);
        setLoadMoreClick(false);
        setSelectedSortValue(data);
        if (orderBy === "asc") {
            setOrderBy("desc")
        } else {
            setOrderBy("asc")
        }
        if (productByCategory?.products?.length > 0) {
            dispatch(getProductsByCategory(itemListData?.[0].category, data, orderBy, null, null));
        }
        else {
            dispatch(getSearchResults(searchInputValue, null, null, data, orderBy));
        }

        setOpenSortingList(!openSortingList);
    }

    const showMore = () => {
        setLoadMoreClick(true);
        setSortClick(false);
        if (searchResult?.products?.length > 0) {
            dispatch(getSearchResults(searchInputValue, limit, (skip + itemListData.length), selectedSortValue, orderBy));
        } else if (productByCategory?.products?.length > 0) {
            dispatch(getProductsByCategory(productByCategory.products[0].category, null, null, limit, (skip + itemListData.length)));
        }
    }

    const onSelectProduct = (product: any) => {
        navigate("/productdetails/" + product.id);
        dispatch(getProductDetails(product.id));
    }

    const status = (products: any) => {
        let stockAvailablity = stockAvailability(products);
        return <Status
            label={stockAvailablity.stockLabel}
            statusColor={(stockAvailablity.color as any)}
            statusDotPosition="leading"
            small
        />
    }

    return (<div className='cart-item-container'>

        <div className="cart-pills">
            <Pill
                label="In Stock"
                size="small"
                onClick={(e) => filterClick(e, "In Stock")}
            />
            <Pill
                label="Low Stock"
                size="small"
                onClick={(e) => filterClick(e, "Low Stock")}
            />
            <Pill
                label="Remove Filter"
                size="small"
                onClick={(e) => filterClick(e, "Remove")}
            />
            <ListBox
                multiple
                position="left"
                trigger={<Pill iconPosition="trailing" label={<>Sort{' '}</>} ssrIcon={chevronDown} onClick={openSorting} size="small" />}
                value={[]}
                open={openSortingList}
            >
                <MenuItem
                    id="option-1"
                    onClick={(e) => selectedSorting(e, "title")}
                    title="Item"
                />
                <MenuItem
                    id="option-2"
                    onClick={(e) => selectedSorting(e, "price")}
                    title="Price"
                />
                <MenuItem

                    id="option-3"
                    onClick={(e) => selectedSorting(e, "stock")}
                    title="Stock"
                />
            </ListBox>

        </div>
        <hr />
        <Text tagName="h3">
            Selected Filter: {selectedFilter}
        </Text>
        <div className="filters" />

        <div style={{ marginTop: "20px" }}>

            <Table
                className="table"
                fullWidth
                inset
            >
                <TableHeader sticky>
                    <tr>
                        <th>
                            Item
                        </th>

                        <th>
                            Price
                        </th>
                        <th>
                            Availabilty
                        </th>
                        <th>
                            Total Stock
                        </th>
                    </tr>
                </TableHeader>

                {itemListData && itemListData?.map((product: any, index: any) => (
                    <TableBody striped key={index}>
                        <tr>
                            <td>
                                <Image
                                    className="sales-item-img-icon"
                                    src={product.images?.[0]}
                                    alt={product.title}
                                    onClick={() => onSelectProduct(product)}

                                />
                                {product.title}
                            </td>

                            <td>
                                {product.price}
                            </td>
                            <td>
                                {status(product)}
                            </td>
                            <td>
                                <Badge
                                    ssrIcon={fillBucket}
                                    label={product.stock}
                                ></Badge>
                            </td>
                            <td>
                                <div className='cart-wrapper'>
                                    {/* <input type='number' min={0} max={product.stock}
                                        value={quantityList[index]}
                                        name={`quantity${index}`} onChange={(e) => {
                                            let quantity: number | string = parseInt(e.target.value);
                                            if (isNaN(quantity)) {
                                                quantity = "";
                                            }
                                            quantityList[index] = quantity;
                                            setQuantityList([...quantityList]);
                                        }}
                                    /> */}
                                    <QuantityStepper
                                        aria-activedescendant=''
                                        ariaDescribedBy=""
                                        ariaDescribedById="helper"
                                        ariaLabelDecrease="Decrease value"
                                        ariaLabelIncrease="Increase value"
                                        ariaLabelInput="Enter quantity"
                                        defaultValue={product.quantity ? product.quantity : 0}
                                        small={true}
                                        maxVal={product.stock}
                                        minVal={0}
                                        onDecrease={(event) => {
                                            onCartQuantity(product, index, event, "decrease")
                                        }}
                                        onIncrease={(event) => {
                                            onCartQuantity(product, index, event, "increase")
                                        }}
                                    />
                                    {/* <Button onClick={(e:any) => onClick(product, index,e)}
                                        size='small'
                                        ssrIcon={shoppingBagAdd}
                                        type="emphasised"
                                    >
                                    </Button> */}
                                </div>
                            </td>
                            <td>

                            </td>
                        </tr>
                    </TableBody>
                ))}
            </Table>



        </div>
        <div className='show-more-btn'>
            <Button onClick={showMore} type="emphasised" size="small" text="Show More"
                disabled={itemListData.length === total} />
        </div>
    </div>
    );
};

export default ItemList;