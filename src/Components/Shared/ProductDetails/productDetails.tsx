import React from "react";
import Accordion, { AccordionItem } from '@ingka/accordion';
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import { useDispatch } from "react-redux";
import Teaser from '@ingka/teaser';
import AspectRatioBox from '@ingka/aspect-ratio-box';
import Image from '@ingka/image';
import Badge from '@ingka/badge';
import "./productDetails.scss";
import discountTag from "@ingka/ssr-icon/paths/discount-tag";
import giftBag from "@ingka/ssr-icon/paths/gift-bag";
import moneyBills from "@ingka/ssr-icon/paths/money-bills";
import Rating from '@ingka/rating';
import shoppingBagAdd from "@ingka/ssr-icon/paths/shopping-bag";
import Button from "@ingka/button";

const ProductDetails = () => {
    const { productDetails } = useSelector((state: RootState) => state.productDetailsList);
    const onClick = (product: any) => {
    }
    return (
        <div className="product-details">
            <Teaser
                description={productDetails?.description}
                position="left"
                stacked
                title={productDetails?.title}
            >
                <Button onClick={() => onClick(productDetails)}
                    size='small'
                    ssrIcon={shoppingBagAdd}
                    type="emphasised"
                >
                    <Badge
                        colour="blue"
                        label={"id"}
                        size="medium"
                    />
                </Button>
                <AspectRatioBox className="aspect-ratio-box">
                    <Image
                        alt="Display Image"
                        src={productDetails?.images?.[0]}
                        srcSet={productDetails?.images?.[0]} />
                </AspectRatioBox>
            </Teaser>
            <div className="product-details__price">
                <Badge
                    colour="blue"
                    label={productDetails?.price + " " + "kr"}
                    size="medium"
                    ssrIcon={moneyBills}
                />
                <Badge
                    colour="green"
                    label={productDetails?.brand}
                    size="medium"
                    ssrIcon={giftBag}
                />
                <Badge
                    colour="grey"
                    label={productDetails?.discountPercentage}
                    size="medium"
                    ssrIcon={discountTag}
                />
            </div>

            {productDetails && <Accordion
                size="medium"
            >
                <AccordionItem
                    id="unique-id_1"
                    onHeadingClicked={function noRefCheck() { }}
                    title="Meta"
                >
                    <h4>
                        BarCode : {productDetails?.meta.barcode}
                    </h4>
                    <h4>
                        QR Code :  <Image
                            alt="Display Image"
                            src={productDetails?.meta?.qrCode}
                            srcSet={productDetails?.meta?.qrCode} />
                    </h4>
                </AccordionItem>
                <AccordionItem
                    id="unique-id_2"
                    onHeadingClicked={function noRefCheck() { }}
                    title="Other Information"
                >
                    <h4>
                        Warranty : {productDetails?.warrantyInformation}

                    </h4>
                    <h4>
                        Shipping Details : {productDetails?.shippingInformation}
                    </h4>
                    <h4>
                        Return Policy : {productDetails?.returnPolicy}
                    </h4>
                </AccordionItem>
                <AccordionItem
                    id="unique-id_3"
                    onHeadingClicked={function noRefCheck() { }}
                    title="Product Information"
                >
                    <ul>
                        {Object.entries(productDetails.dimensions).map(([key, value]) => (
                            <li key={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}: {value as React.ReactNode}
                            </li>
                        ))}
                    </ul>
                    <ul>

                        <li>Price: {productDetails.price}</li>
                        <li>Stock: {productDetails.stock}</li>
                        <li>Availability: {productDetails.availabilityStatus}</li>
                        <li>Discount: {productDetails.discountPercentage}</li>
                        <li>Weight: {productDetails.weight}</li>
                    </ul>
                </AccordionItem>
                <AccordionItem
                    id="unique-id_4"
                    onHeadingClicked={function noRefCheck() { }}
                    title="Reviews"
                >
                    <ul>
                        {productDetails.reviews.map((review: any) => (
                            <li key={review.reviewerName}>
                                <h4>{review.reviewerEmail}</h4>
                                <p>{review.comment}</p>
                                <Rating
                                    ariaLabel="Rated at x out of y stars"
                                    href=""
                                    label=""
                                    maxRating={5}
                                    rating={review.rating}
                                />
                            </li>
                        ))}
                    </ul>
                </AccordionItem>
            </Accordion>}
        </div>
    )
};

export default ProductDetails;