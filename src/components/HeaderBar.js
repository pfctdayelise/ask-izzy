/* @flow */

import React from "react";

class HeaderBar extends React.Component {
    // flow:disable not supported yet
    static propTypes = {
        primaryText: React.PropTypes.node.isRequired,
        secondaryText: React.PropTypes.node,

        // FIXME: icon
    };

    // flow:disable not supported yet
    static sampleProps = {default: {
        primaryText: "Primary Text",
        secondaryText: "Secondary Text",
    }};

    render(): ReactElement {
        return (
            <div className="HeaderBar">
                <div className="primary">
                    {this.props.primaryText}
                </div>
                <div className="secondary">
                    {this.props.secondaryText}
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default HeaderBar;
