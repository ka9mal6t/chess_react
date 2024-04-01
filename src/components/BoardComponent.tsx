import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import {Cell} from "../models/Cell";
import CellComponent from "./CellComponent";
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import {FigureNames} from "../models/figures/Figure";
import ModalComponent from "../modal/ModalComponent";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}
const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const [showModal, setShowModal] = useState(false);
    const[lastCell, setLastCell] = useState<Cell | null>(null)

    const handleSelectFigure = (figureName: FigureNames) => {
        if (lastCell) {
            lastCell.pawnUp(lastCell, figureName);
            setShowModal(false);
        }
    };
    function click(cell: Cell){
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell);
            setLastCell(cell);
            if (selectedCell.checkPawnUp(cell)){
                setShowModal(true);
            }
            swapPlayer();
            setSelectedCell(null);
        }
        else {
            if(cell.figure?.color === currentPlayer?.color){
                setSelectedCell(cell);
            }
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function highlightCells(){
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard(){
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }
    return (
        <div className="board">
            {currentPlayer?.color === Colors.WHITE
                ?
                board.cells
                    .map((row, index) =>

                        <React.Fragment key={index}>
                            {row
                                .map(cell =>
                                <CellComponent
                                    click={click}
                                    cell={cell}
                                    key={cell.id}
                                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                />
                            )}
                        </React.Fragment>
                    ):
                board.cells.slice().reverse().map((row, index) =>

                        <React.Fragment key={index}>
                            {row.slice().reverse().map(cell =>
                                <CellComponent
                                    click={click}
                                    cell={cell}
                                    key={cell.id}
                                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                />
                            )}
                        </React.Fragment>
                    )
            }
            {showModal && (
        <ModalComponent
          isOpen={showModal}
          handleClose={() => setShowModal(false)}
          handleSelectFigure={handleSelectFigure}
        />
      )}
      {/* Блокировка интерактивных элементов при открытом модальном окне */}
      {showModal && <div className="overlay" />}


        </div>
    );

};

export default BoardComponent;