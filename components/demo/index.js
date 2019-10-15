import './template/define.css';
import './template/main.css';
import App from './source/App.jsx';
import {DOM} from 'fmihel-lib';
import React from 'react';
import ReactDOM from 'react-dom';
import SplitterPage from './source/pages/SplitterPage.jsx';
import DragPage from './source/pages/DragPage.jsx';
$(()=>{

    ReactDOM.render(
    <App
        pages = {{
            splitter : { caption: 'Splitter', item: <SplitterPage/> },
            drag: { caption: 'drag', item: <DragPage/> },
            page3: { caption: 'page3', item: <div>qwdweS</div> },
        }}
    />,
    DOM('#page'));
    
});