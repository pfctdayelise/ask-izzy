/* @flow */

import React from "react";
import mui from "material-ui";

import icons from "../icons";

class AppBar extends React.Component {
    // flow:disable not supported yet
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        onBackTouchTap: React.PropTypes.func.isRequired,
    };

    // flow:disable not supported yet
    static sampleProps = {default: {
        title: "App bar",
        onBackTouchTap: function() {},
    }};

    render(): ReactElement {
        return (
            <mui.AppBar
                className="AppBar"
                title={this.props.title}
                iconElementLeft={
                    <mui.IconButton
                        className="BackButton"
                        onTouchTap={this.props.onBackTouchTap}

                        disableFocusRipple={true}
                        disableTouchRipple={true}
                    >
                        <icons.ChevronBack />
                    </mui.IconButton>
                }
            />
        );
    }
}

export default AppBar;
