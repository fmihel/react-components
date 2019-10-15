import React from 'react';
import { JX, childDOM, binds } from 'fmihel-lib';


export default class Drag extends React.Component {
    constructor(p) {
        super(p);
        this.ref = React.createRef();
        this.refChild = null;
        this.int = null;
        this.stateMouse = 'up';

        this.state = {
            width: null,
            height: null,
            left: null,
            top: null,
        };
        binds(this, 'onMouseDown', 'winMouseUp', 'winMouseMove');
    }

    onMouseDown() {
        this.setMouseState('down');
    }

    winMouseMove() {
        if (this.stateMouse === 'down') {
            this.setState((state, props) => {
                const current = JX.mouse();
                const deltaX = current.x - this.current.x;
                const deltaY = current.y - this.current.y;
                this.current = current;

                return {
                    left: state.left + deltaX,
                    top: state.top + deltaY,
                };
            });
        }
    }

    winMouseUp() {
        this.setMouseState('up');
    }

    setMouseState(stateMouse) {
        if (stateMouse === 'up') {
            this.stateMouse = 'up';
            JX.window.off('mouseup', this.winMouseUp);
            JX.window.off('mousemove', this.winMouseMove);
        } else {
            this.stateMouse = 'down';
            JX.window.on('mousemove', this.winMouseMove);
            JX.window.on('mouseup', this.winMouseUp);
            this.current = JX.mouse();
        }
    }


    initChildRef() {
        if ((this.refChild === null) && (this.int === null)) {
            // this.int = setInterval(() => {
            if (this.refChild === null) {
                try {
                    // eslint-disable-next-line prefer-destructuring
                    this.refChild = childDOM(this.ref.current)[0];
                } catch (e) {
                    this.refChild = null;
                }
            }

            if (this.refChild !== null) {
                // clearInterval(this.int);
                const pos = JX.abs(this.refChild);
                this.setState({
                    width: pos.w, height: pos.h, left: pos.x, top: pos.y,
                });

                $(this.refChild).css({
                    position: 'relative',
                    left: '0px',
                    top: '0px',
                });
            }
            // }, 1);
        }
    }

    componentDidMount() {
        this.initChildRef();
    }

    render() {
        console.info('render');
        const size = {};
        if (this.state.width !== null) { size.width = this.state.width; }
        if (this.state.height !== null) { size.height = this.state.height; }
        if (this.state.left !== null) { size.left = this.state.left; }
        if (this.state.left !== null) { size.top = this.state.top; }
        return (
            <div
                onMouseDown = {this.onMouseDown}
                style={{
                    position: 'absolute',
                    border: '1px dashed gray',
                    ...size,
                }}
                ref={this.ref}
            >
                {this.props.children}
            </div>
        );
    }
}
