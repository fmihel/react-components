import React from 'react';
import { flex } from 'fmihel-lib';

export default class Tabs extends React.Component {
    constructor(p) {
        super(p);
    }


    render() {
        const { list, visiblePage } = this.props;


        const keys = Object.keys(list);
        const childs = keys.map((name) => <div key={name} style ={{ ...flex('stretch vert'), display: (name === visiblePage ? 'block' : 'none') }} >{list[name]}</div>);

        return (
            <div style={{ ...flex('stretch vert') }} >
                {childs}
            </div>
        );
    }
}

Tabs.defaultProps = {
    visiblePage: '',
    list: {},
};
