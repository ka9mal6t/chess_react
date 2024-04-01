import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure{
    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target))
            return false;
        if (Math.abs(target.y - this.cell.y) < 2
            && Math.abs(target.x - this.cell.x) < 2)
            return true;
        return false;
    }
    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}