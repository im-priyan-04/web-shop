import React, { useEffect, useState } from 'react';
import './itemList.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/store';
import Table, { TableBody, TableHeader } from '@ingka/table';
import Image from '@ingka/image';
import Button from "@ingka/button";
import Badge from '@ingka/badge';
import shoppingBagAdd from "@ingka/ssr-icon/paths/shopping-bag-add";
import { useNavigate } from 'react-router-dom';
import { getProductDetails, setCartItems } from '../../Actions/searchAction';
import Pill from '@ingka/pill';
import Text from '@ingka/text';

const ItemList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { productByCategory } = useSelector((state: RootState) => state.categoryDetailsList);
    const { searchResult } = useSelector((state: RootState) => state.searchDetailsList);
    const { cartItems } = useSelector((state: RootState) => state.cartItemsList);
    const [itemListData, setItemListData] = useState<any>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>();
    const [cartItemList, setCartItemsList] = useState<any>();
    const [quantityList, setQuantityList] = useState<(number | string)[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (searchResult?.products?.length > 0) {
            setItemListData(searchResult);
            const quantity = new Array(searchResult.products.length).fill(0);
            setQuantityList(quantity);
        }
    }, [searchResult]);

    useEffect(() => {
        if (productByCategory?.products?.length > 0) {
            setItemListData(productByCategory)
            const quantity = new Array(productByCategory.products.length).fill(0);
            setQuantityList(quantity);
        }
    }, [productByCategory]);
    useEffect(() => {
        if (cartItems?.length === 0) {
            setCartItemsList([]);
        } else {
            setCartItemsList(cartItems);
        }
    }, [cartItems]);
    const updateCartItemsList = (cartItemList: any[], data: any, index: number) => {
        const cartDetails = cartItemList.find((item: any) => item.id === data.id);
        if (cartDetails) {
            return cartItemList.map((item: any) =>
                item.id === data.id ? { ...item, quantity: quantityList[index] } : item
            );
        } else {
            return [...cartItemList, { ...data, quantity: quantityList[index] }];
        }
    };

    const mergeCartItems = (cartItems: any[], updatedCartItems: any[]) => {
        const finalCartItems = cartItems ? [...cartItems] : [];
        updatedCartItems.forEach((item: any) => {
            const existingItemIndex = finalCartItems.findIndex((cartItem: any) => cartItem.id === item.id);
            if (existingItemIndex !== -1) {
                finalCartItems[existingItemIndex] = {
                    ...finalCartItems[existingItemIndex],
                    quantity: item.quantity,
                };
            } else {
                finalCartItems.push(item);
            }
        });
        return finalCartItems;
    };

    const onClick = (data: any, index: number) => {
        const updatedCartItems = cartItemList ? updateCartItemsList(cartItemList, data, index) : [{ ...data, quantity: quantityList[index] }];
        setCartItemsList(updatedCartItems);

        const finalCartItems = mergeCartItems(cartItems, updatedCartItems);
        console.log("updatedCartItems", finalCartItems);
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
        let filterList = { products: filterData };
        data === "Remove" ? setSelectedFilter("") : setSelectedFilter(data);
        console.log("filterList", filterList);
        setItemListData(filterList);
    }
    const getByLabelText = (id: any) => {
        let cartDetails: any = [];
        if (cartItemList) {
            cartDetails = cartItemList.find((item: any) => item.id === id);
            if (cartDetails) {
                return cartDetails.quantity;
            }
        }
        return 0;
    }
    const onSelectProduct = (product: any) => {
        navigate("/productdetails/" + product.id);
        dispatch(getProductDetails(product.id));
        // dispatch(getProductsByCategory(category.slug));
    }
    const backToHome = () => {
        navigate("/");
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

                {itemListData && itemListData.products?.map((product: any, index: any) => (
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
                                {product.availabilityStatus}
                            </td>
                            <td>
                                {product.stock}
                            </td>
                            <td>
                                <div className='cart-wrapper'>
                                    <input type='number' min={0} max={product.stock}
                                        value={quantityList[index]}
                                        name={`quantity${index}`} onChange={(e) => {
                                            let quantity: number | string = parseInt(e.target.value);
                                            if (isNaN(quantity)) {
                                                quantity = "";
                                            }
                                            quantityList[index] = quantity;
                                            setQuantityList([...quantityList]);
                                        }}
                                    />
                                    <Button onClick={() => onClick(product, index)}
                                        size='small'
                                        ssrIcon={shoppingBagAdd}
                                        type="emphasised"
                                    >
                                    </Button>
                                </div>
                            </td>

                        </tr>
                    </TableBody>
                ))}
            </Table>

        </div>
    </div>
    );
};

export default ItemList;