/* @flow */

import React from "react";
import mui from "material-ui";

import categories from "../constants/categories";
import CategoryListItem from "./CategoryListItem";

class NavBar extends React.Component {

    // flow:disable not supported yet
    static sampleProps = {default: {}};

    render(): ReactElement {
        return (
            <div className="NavBar">
                <mui.List className="List categories">
                    {
                        categories.map(category => {
                            return (
                                <CategoryListItem
                                    category={category}
                                    key={category.key}
                                />
                            );
                        })
                    }
                    <mui.ListDivider />
                </mui.List>
            </div>
        );
    }

}

export default NavBar;
