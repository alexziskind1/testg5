import * as React from 'react';
import styled from 'styled-components';
import './flexboxgrid.min.css';


interface GridRowProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const GridRow = (props: GridRowProps) => {

    // This combines the incoming style with the debug border
    const style = { ...(props.style ? props.style : {})};

    return (
        <div className='row' style={style}>
            {props.children}
        </div>
    );
};
