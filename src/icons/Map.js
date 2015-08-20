/* @flow */
/* jscs: disable */
import React from "react";
import mui from "material-ui";

export default class SvgIconMap extends React.Component {

    render(): React.Component {
        return (
            <mui.SvgIcon
                {...this.props}
                viewBox="0 0 64 64"
            >
            <path d='M31.796,50.092c-0.869,0-1.69-0.376-2.252-1.033c-0.416-0.486-10.192-12.012-10.192-20.649     c0-6.752,5.582-12.244,12.444-12.244S44.24,21.658,44.24,28.41c0,8.64-9.775,20.163-10.191,20.649     C33.485,49.716,32.664,50.092,31.796,50.092z M31.796,18.365c-5.649,0-10.245,4.507-10.245,10.045     c0,7.835,9.271,18.758,9.665,19.22c0.287,0.334,0.873,0.335,1.162-0.001c3.342-3.905,9.663-12.949,9.663-19.219     C42.041,22.872,37.445,18.365,31.796,18.365z M31.796,33.427c-2.805,0-5.087-2.251-5.087-5.018s2.282-5.017,5.087-5.017     s5.087,2.25,5.087,5.017S34.6,33.427,31.796,33.427z M31.796,25.592c-1.592,0-2.888,1.264-2.888,2.817s1.296,2.818,2.888,2.818     s2.888-1.265,2.888-2.818S33.387,25.592,31.796,25.592z' />
            </mui.SvgIcon>
        );
    }

}