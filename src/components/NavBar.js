/* @flow */

import React from "react";
import { Link } from "react-router";

import categories from "../constants/categories";
import CategoryListItem from "./CategoryListItem";

class NavBar extends React.Component {

    render(): React.Component {
        return (
            <div className="NavBar">
                <div className="NavBar-title">
                    <Link to="home"></Link>
                </div>
                <div className="NavBar-links">
                    {
                        Object.keys(categories).map(category => {
                            return (
                                <CategoryListItem
                                    categoryKey={categories[category]}
                                    key={category}
                                    description={category}
                                />
                            );
                        })
                    }
                </div>
                <div className="NavBar-locales">
                </div>
            </div>
        );
    }

}

export default NavBar;
