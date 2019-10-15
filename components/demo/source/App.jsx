import React from 'react';
import { flex, binds } from 'fmihel-lib';
import Tabs from './Tabs.jsx';

export default class App extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onClick');
        let visiblePage = '';
        if (p.pages) {
        // eslint-disable-next-line prefer-destructuring
            visiblePage = Object.keys(p.pages)[0];
        }

        this.state = {
            visiblePage,
        };
    }

    onClick(visiblePage) {
        this.setState({ visiblePage });
    }

    render() {
        const { pages } = this.props;

        const buttons = [];
        const list = {};

        Object.keys(pages).forEach((name) => {
            buttons.push(
                <button
                    key ={name}
                    onClick={() => { this.onClick(name); }}>{pages[name].caption}
                </button>,
            );
            list[name] = pages[name].item;
        });

        return (
            <div id='app' style={{ ...flex('horiz stretch') }}>

                <div style={{ ...flex('fixed vert'), width: 150 }} >{buttons}</div>
                <div style={{ ...flex('stretch vert') }} >
                    <Tabs visiblePage = {this.state.visiblePage} list = {list}/>
                </div>
            </div>
        );
    }
}
