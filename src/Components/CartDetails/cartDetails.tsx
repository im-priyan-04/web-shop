import React, { useState } from "react";
import Button from "@ingka/button";
import Modal, { Sheets, ModalHeader, ModalFooter, ModalBody, Prompt } from '@ingka/modal';
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import Pill from '@ingka/pill';
import boxCancel from "@ingka/ssr-icon/paths/box-cancel";
import Badge from '@ingka/badge';
import { useDispatch } from "react-redux";
import { orderCreatedDetails, resetCart, setCartItems } from "../../Actions/searchAction";
import { useNavigate } from "react-router-dom";

const CartDetails = (props: any) => {
    const { setModalOpen, setToastVisible } = props;
    const { cartItems } = useSelector((state: RootState) => state.cartItemsList);
    const [promptModalOpen, setPromptModalOpen] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const onClosePopUp = () => {
        setModalOpen(false);
    };
    const removeItem = (product: any) => {
        const updatedCartItems = cartItems.filter((item: any) => item !== product);
        dispatch(setCartItems(updatedCartItems));
    };
    const createModalPopUp = () => {
        setPromptModalOpen(true);
    };
    const createOrder = () => {
        let data = {
            "orderCreated":true,
            "toastMessage":"Order is created",
            "toastVisible":true
        }
        navigate("/");
        setToastVisible(true);
        dispatch(orderCreatedDetails(data));
        setPromptModalOpen(false);
        setModalOpen(false);
        dispatch(resetCart());
    };
    const toCart = () => {
        setModalOpen(false);
        navigate("/");
    };
    let footerBtn: any;
    if (cartItems && cartItems.length > 0) {
        footerBtn = <Button onClick={createModalPopUp}>Create Order</Button>;
    } else {
        footerBtn = <Button onClick={toCart}>Keep Browsing</Button>;
    }

    return (
        <div className="modal-details">
            <Modal visible={true} handleCloseBtn={onClosePopUp}>
                <Sheets
                    header={<ModalHeader title="Cart Details" backBtnClick={onClosePopUp} />}
                    footer={<ModalFooter>{footerBtn}</ModalFooter>}
                >
                    <ModalBody>
                        <ul>
                            {cartItems && cartItems.map((item: any) => (
                                <li key={item.id}>
                                    <h4 style={{ marginTop: "10px" }}>
                                        <Badge
                                            colour="blue"
                                            label="Name"
                                            size="small"
                                        /> {item.title}</h4>
                                    <p><Badge
                                        colour="grey"
                                        label="Price"
                                        size="small"
                                    />  : {item.price}</p>
                                    <p><Badge
                                        colour="green"
                                        label="Quantity"
                                        size="small"
                                    />  : {item.quantity}</p>
                                    <p><Badge
                                        colour="black"
                                        label="Category"
                                        size="small"
                                    /> : {item.category}</p>
                                    <p><Badge
                                        colour="red"
                                        label="Total Price"
                                        size="small"
                                    /> : {item.price * item.quantity}</p>
                                    <Pill style={{ marginTop: "10px" }}

                                        size="small"
                                        onClick={() => removeItem(item)}
                                        color="red"
                                        ssrIcon={boxCancel}
                                    />

                                </li>
                            ))}
                        </ul>
                    </ModalBody>
                </Sheets>

            </Modal>

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
export default CartDetails;