import React from 'react';
import { flex } from 'fmihel-lib';

export default class DragPage extends React.Component {
    constructor(p) {
        super(p);
    }

    render() {
        return (
            <div style={{ ...flex('stretch') }} >
                drag
            </div>
        );
    }
}
