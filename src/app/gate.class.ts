import { Graphics } from "pixi.js";
import {IGateOptions} from "./Interfaces";

export class Gate implements  IGateOptions{
    public gate: Graphics;
    private isClose: boolean ;
    private cordX: number ;
    private cordY: number ;

    constructor( x: number , y: number) {
        this.gate = new Graphics();
        this.gate.beginFill(0x000DE149, 1);
        this.gate.drawRect(0, 0, 90, 3);
        this.gate.position.set(x, y);
        this.cordX = x;
        this.cordY = y;
        this.isClose = false;
        this.close.bind(this);
        this.open.bind(this);
    }

    public close(): void {
        this.isClose = true;
        this.gate.beginFill(0xff0000, 1);
        this.gate.drawRect(0, 0, 90, 3);
        this.gate.position.set(this.cordX, this.cordY);
    }

    public open(): void {
        this.isClose = false;
        this.gate.beginFill(0x000DE149, 1);
        this.gate.drawRect(0, 0, 90, 3);
        this.gate.position.set(this.cordX, this.cordY);
    }

    public isCloseGate(): boolean {
        return this.isClose;
    }

}
