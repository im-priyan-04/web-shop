import React from "react";
import "./searchPage.scss";
import ItemTabs from "../Shared/ItemTabs/itemTabs";
import { AppDispatch, RootState } from "../../Store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Toast from '@ingka/toast';
import { orderCreatedDetails } from "../../Actions/searchAction";

const SearchPage = () => {
    const {orderDetails} = useSelector((state: RootState) => state.orderDetailsList);
const dispatch = useDispatch<AppDispatch>();
    const onclose = () => {
        dispatch(orderCreatedDetails(null));
    }
  
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