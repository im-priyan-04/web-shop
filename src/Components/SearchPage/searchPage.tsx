import React, { useState } from "react";
import "./searchPage.scss";
import ItemTabs from "../Shared/ItemTabs/itemTabs";
import { AppDispatch, RootState } from "../../Store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Toast from '@ingka/toast';
import { orderCreatedDetails } from "../../Actions/searchAction";

const SearchPage = () => {
    const { cartItems } = useSelector((state: RootState) => state.cartItemsList);
    const {orderDetails} = useSelector((state: RootState) => state.orderDetailsList);
    console.log("orderDetails", orderDetails);
    const [toastVisible, setToastVisible] = useState<boolean>(false);
    const navigate = useNavigate();
const dispatch = useDispatch<AppDispatch>();
    const onclose = () => {
        dispatch(orderCreatedDetails(null));
    }
    console.log("cartItems", cartItems);
  
    return (
        <div>
            <div>
                <ItemTabs />
            </div>
            {orderDetails?.orderCreated && <Toast
                text={<><strong>{orderDetails.toastMessage}</strong></>}
                isOpen={orderDetails.toastVisible}
                actionButtonText={'Action'} // optional
                actionClick={() => { }} // required if there is an action label supplied
                onCloseRequest={onclose}
                ariaLabelCloseBtn="Dismiss notification"
            />}
        </div>
    );
}

export default SearchPage;