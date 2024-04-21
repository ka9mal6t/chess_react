import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/pngwing.com (7).png";

export class King extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target))
            return false;
        if(Math.abs(target.y - this.cell.y) < 2
            && Math.abs(target.x - this.cell.x) < 2
            && !this.cell.board.isWillBeKingUnderCheck(this.cell.y, this.cell.x, target.y, target.x))
            return true;

        if(this.color === Colors.WHITE){
            if(target.y === this.cell.y
            && target.x === this.cell.x - 2
            && !this.cell.board.isWillBeKingUnderCheck(this.cell.y, this.cell.x, target.y, this.cell.x - 2)
            && !this.cell.board.isWillBeKingUnderCheck(this.cell.y, this.cell.x, target.y, this.cell.x - 1)
            && !this.cell.board.isKingUnderCheck(this.color)
            && this.isFirstStep

            && this.cell.board.getCell(0, 7).figure?.name === FigureNames.ROOK

            && this.cell.board.getCell(0, 7).figure?.color === this.color
            && this.cell.board.getCell(0, 7).figure?.isFirstStep){
                for (let col = 1; col < this.cell.x; col++) {
                    if (!this.cell.board.getCell(col, 7).isEmpty()) {
                        return false;
                    }
                }
                return true;
            }

            if(target.y === this.cell.y
            && target.x === this.cell.x + 2
            && !this.cell.board.isWillBeKingUnderCheck(this.cell.y, this.cell.x, target.y, this.cell.x + 2)
            && !this.cell.board.isWillBeKingUnderCheck(this.cell.y, this.cell.x, target.y,  this.cell.x + 1)
            && !this.cell.board.isKingUnderCheck(this.color)
            && this.isFirstStep

            && this.cell.board.getCell(7, 7).figure?.name === FigureNames.ROOK

            && this.cell.board.getCell(7, 7).figure?.color === this.color
            && this.cell.board.getCell(7, 7).figure?.isFirstStep){
                for (let col = this.cell.x + 1; col < 7; col++) {
                    if (!this.cell.board.getCell(col, 7).isEmpty()) {
                        return false;
                    }
                }
                return true;
            }

        }
        else {
            if(target.y === this.cell.y
            && target.x === this.cell.x - 2
            && !this.cell.board.isWillBeKingUnderCheck(this.cell.y, this.cell.x, target.y, this.cell.x - 2)
            && !this.cell.board.isWillBeKingUnderCheck(this.cell.y, this.cell.x, target.y, this.cell.x - 1)
            && !this.cell.board.isKingUnderCheck(this.color)
            && this.isFirstStep

            && this.cell.board.getCell(0, 0).figure?.name === FigureNames.ROOK

            && this.cell.board.getCell(0, 0).figure?.color === this.color
            && this.cell.board.getCell(0, 0).figure?.isFirstStep){
                for (let col = 1; col < this.cell.x; col++) {
                    if (!this.cell.board.getCell(col, 0).isEmpty()) {
                        return false;
                    }
                }
                return true;
            }

            if(target.y === this.cell.y
            && target.x === this.cell.x + 2
            && !this.cell.board.isWillBeKingUnderCheck(this.cell.y, this.cell.x, target.y, this.cell.x + 2)
            && !this.cell.board.isWillBeKingUnderCheck(this.cell.y, this.cell.x, target.y, this.cell.x + 1)
            && !this.cell.board.isKingUnderCheck(this.color)
            && this.isFirstStep

            && this.cell.board.getCell(7, 0).figure?.name === FigureNames.ROOK

            && this.cell.board.getCell(7, 0).figure?.color === this.color
            && this.cell.board.getCell(7, 0).figure?.isFirstStep){
                for (let col = this.cell.x + 1; col < 7; col++) {
                    if (!this.cell.board.getCell(col, 0).isEmpty()) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }
}