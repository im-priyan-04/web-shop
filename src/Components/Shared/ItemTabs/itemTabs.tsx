import React from 'react';
import "./itemTabs.scss";
import Tabs, { Tab, TabPanel } from '@ingka/tabs';
import Category from '../../Category/category';
import Products from '../../Products/products';

const ItemTabs = () => {

    const tabs = [
        <Tab key="products" id="tab-btn-0" tabPanelId="productsTabPanel" text="Products" />,
        <Tab key="category" id="tab-btn-1" tabPanelId="categoryTabPanel" text="Category" />,

    ];

    const tabPanels = [
        <TabPanel
            key="products"
            tabPanelId="productsTabPanel"
        >
            <Products />
        </TabPanel>,
        <TabPanel
            key="category"
            tabPanelId="categoryTabPanel"
        >
            <Category />
        </TabPanel>
    ];

    return (
        <div>
            <Tabs
                defaultActiveTab="productsTabPanel"
                tabs={tabs}
                tabPanels={tabPanels}

            />
        </div>
    );
}

export default ItemTabs;