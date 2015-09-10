/* @flow */

import React from 'react';
import Router from 'react-router';
import components from '../components';
import _ from 'underscore.string';

export default class StyleGuideItem extends React.Component {
    constructor(props: Object) {
        super(props);
    }

    getComponentName(): string {
        return this.props.params.componentName;
    }

    getComponent(): React.Component {
        return components[this.getComponentName()];
    }

    render(): React.Element {
        var Component = this.getComponent();
        if (!Component) {
            return (
                <div>No such component {this.getComponentName()}</div>
            );
        }

        var variantNames = Object.keys(Component.sampleProps);
        var variants = variantNames.map(function(k) {
            var heading;
            if (variantNames.length > 1) {
                heading = <h1>{_.titleize(k)}</h1>;
            }

            return (
                <div key={k}>
                    { heading }
                    <Component {...Component.sampleProps[k]} />
                </div>
            );
        });

        return (
            <div>
                {variants}
            </div>
        );
    }

}
