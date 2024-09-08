import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { ListPriceModule } from '@ingka/price-module';
import Table, { TableBody, TableHeader } from '@ingka/table';
import Image from '@ingka/image';
import ListView, { ListViewItem } from '@ingka/list-view';
import "./checkout.scss";
import { checkQuantity, getTotalDiscount, getTotalPrice } from "../../Utils/utils";
import Button from '@ingka/button';
import QuantityStepper from '@ingka/quantity-stepper';
import { useEffect, useState } from "react";
import { orderCreatedDetails, resetCart } from "../../Actions/searchAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal, {  ModalHeader, ModalFooter, Prompt } from '@ingka/modal';
const CheckOut = () => {
    const { cartItems } = useSelector((state: RootState) => state.cartItemsList);
    const [promptModalOpen, setPromptModalOpen] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);


    const createOrder = () => {
        let data = {
            "orderCreated": true,
            "toastMessage": "Order is created",
            "toastVisible": true
        }
        navigate("/");
        dispatch(orderCreatedDetails(data));
        setPromptModalOpen(false);
        dispatch(resetCart());
    };

    let totalPrice = getTotalPrice(cartItems);
    let totalDiscount = getTotalDiscount(cartItems);

    return (
        <div>
            <div className="checkout-container">
                <div className="checkout-list">
                    <span><h4>Articles </h4>   Package : {cartItems?.length}</span>
                    <ListView className="checkout-list-view" id="">
                        {cartItems.map((item: any, index: number) => (
                            <div className="list-item-container" key={item.id}>
                                <ListViewItem
                                    inset
                                    image={item.images?.[0]}
                                    title={item.title}
                                    quantityLabel={`${item?.price}kr`}
                                    size="small"
                                />
                                <QuantityStepper
                                    aria-activedescendant=''
                                    ariaDescribedBy=""
                                    ariaDescribedById="helper"
                                    ariaLabelDecrease="Decrease value"
                                    ariaLabelIncrease="Increase value"
                                    ariaLabelInput="Enter quantity"
                                    defaultValue={item.quantity ? item.quantity : 0}
                                    small={true}
                                    maxVal={item.stock}
                                    minVal={0}
                                    onDecrease={(event) => {
                                        checkQuantity(cartItems, item, "decrease")
                                    }}
                                    onIncrease={(event) => {
                                        checkQuantity(cartItems, item, "increase")
                                    }}
                                />
                            </div>
                        ))}
                    </ListView>
                </div>
                <div className="checkout-info">
                    <ListPriceModule
                        currentPriceProps={{
                            integerValue: totalDiscount.toFixed(2).toString(),
                            currencyLabel: "%",
                            currencyPosition: "trailing",
                        }}
                        productName="Total Discount"
                        productNameHeadingTag="div"
                        size="small" priceAddons={undefined}
                    />
                    <ListPriceModule
                        currentPriceProps={{
                            integerValue: totalPrice.toFixed(2).toString(),
                            currencyLabel: "kr",
                            currencyPosition: "trailing",
                        }}
                        productName="Total Price"
                        productNameHeadingTag="div"
                        size="small" priceAddons={undefined}
                    />

                    <Button
                        type="emphasised"
                        size="small"
                        text="Create Order"
                        onClick={() => setPromptModalOpen(true)}
                    />
                </div>
            </div>
            {promptModalOpen && <Modal visible={promptModalOpen} handleCloseBtn={() => setPromptModalOpen(false)}>
                <Prompt
                    className="prompt"
                    footer={<ModalFooter><Button text="No" type="secondary" /><Button text="Yes" type="primary" onClick={createOrder} /></ModalFooter>}
                    header={<ModalHeader ariaCloseTxt="Close button text" />}
                    title="Order Creation"
                    titleId="id"
                >
                    <p>
                        Do want to create order?
                    </p>
                </Prompt>
            </Modal>}
        </div>
    );

}

export default CheckOut;