/* @flow */

import React from "react";
import Router from "react-router";
import reactMixin from "react-mixin";

/*::`*/@reactMixin.decorate(Router.Navigation)/*::`;*/
class Infobox extends React.Component {
    // flow:disable not supported yet
    static propTypes = {
        href: React.PropTypes.string,
        to: React.PropTypes.string,
        linkText: React.PropTypes.string,
    };

    // flow:disable
    static defaultProps = {
        linkText: "More information",
    };

    constructor(props: Object) {
        super(props);
        this.state = {};
    }

    // flow:disable not supported yet
    static sampleProps = {default: {
        linkText: "Housing information",
        href: "#",
        children: "It's important to act early on housing.",
    }};

    render(): ReactElement {
        var {
            linkText,
            ...other,
        } = this.props;

        return (
            <div className="Infobox">
                <div>
                    {this.props.children}
                </div>
                {
                    this.props.href || this.props.to ?
                        <div>
                            <div className="secondary">
                                Find out more
                            </div>
                            {this.props.href ?
                                    <a
                                        className="Link"
                                        {...other}
                                    >
                                        {linkText}
                                    </a>
                                : <Router.Link
                                    className="Link"
                                    {...other}
                                  >
                                    {linkText}
                                </Router.Link>
                            }
                        </div>
                    : ""
                }
            </div>
        );
    }
}

export default Infobox;
