import React, {FC} from 'react';
import {Cell} from "../models/Cell";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;

interface CellProps{
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}
const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    return (
        <div className={['cell', cell.color, selected ? 'selected': null, cell.isKingUnderCheck() ? 'isKingUnderCheck' : null].join(' ')}
             onClick={() => click(cell)}
             style = {{background: cell.available && cell.figure ? 'green' : ''}}
        >
            {cell.available && !cell.figure && <div className={'available'}/>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
        </div>
    );
};

export default CellComponent;