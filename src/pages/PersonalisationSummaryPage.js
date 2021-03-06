/* @flow */

import React from "react";
import mui from "material-ui";

import BasePersonalisationPage from "./BasePersonalisationPage";
import components from "../components";
import icons from "../icons";

class PersonalisationSummaryPage extends BasePersonalisationPage {

    previousStep(): void {
        if (this.state.subpage == 0) {
            this.goBack();
        } else {
            this.setState({subpage: 0});
        }
    }

    nextStep(): void {
        this.setState({subpage: 0});
    }

    render(): ReactElement {
        var subpage;

        if (this.state.subpage > 0) {
            subpage = this.personalisationComponents[this.state.subpage - 1];
        }

        return (
            <div className="PersonalisationPage">
                <components.AppBar
                    title="Personalise"
                    onBackTouchTap={this.previousStep.bind(this)}
                />
                {subpage ?
                    React.createElement(subpage)
                : <div>
                    <components.HeaderBar
                        primaryText={
                            <div>
                                <icons.LogoLight />
                                This is what I think I know about you.
                                Change your answers here.
                            </div>
                        }
                    />
                    <mui.List className="List">{
                        this.personalisationComponents
                            .map((component, index) =>
                                <mui.ListItem
                                    key={index}
                                    className="ListItem SummaryItem"
                                    onTouchTap={event => {
                                        this.setState({
                                            subpage: index + 1,
                                        });
                                    }}

                                    primaryText={
                                        <span className="primaryText">
                                            {component.summaryLabel}
                                        </span>
                                    }
                                    secondaryText={
                                        <span className="secondaryText">
                                            {component.summaryValue}
                                        </span>
                                    }

                                    disableFocusRipple={true}
                                    disableTouchRipple={true}
                                />
                        )
                    }</mui.List>

                    <div className="padded">
                        All of your answers are private and anonymous.
                    </div>
                    <div className="done-button">
                        <mui.FlatButton
                            label="Okay"
                            onTouchTap={this.previousStep.bind(this)}
                            disableFocusRipple={true}
                            disableTouchRipple={true}
                        />
                    </div>
                </div>}
            </div>
        );
    }

}

export default PersonalisationSummaryPage;
