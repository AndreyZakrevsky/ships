import {Graphics} from "pixi.js";
import {IDockOptions} from "./Interfaces";

export class Dock implements IDockOptions {
    public dock: Graphics;
    private isEmpty: boolean;
    private isRreserved: boolean;
    private cordX: number;
    private cordY: number;

    constructor(x: number, y: number) {
        this.dock = new Graphics();
        this.cordX = x;
        this.cordY = y;
        this.isRreserved = false;
        this.unload.bind(this);
        this.load.bind(this);
        this.changeStatus.bind(this);
    }

    public reserveDock(): void {
        this.isRreserved = true;
    }

    public isReservedDock(): boolean {
        return this.isRreserved;
    }

    public unload(): void {
        this.isRreserved = false;
        this.changeStatus(true);
    }

    public load(): void {
        this.isRreserved = false;
        this.changeStatus(false);
    }

    public isEmptyDock(): boolean {
        return this.isEmpty;
    }

    public changeStatus(isEmpty: boolean): void {
        this.isEmpty = isEmpty;
        this.dock.lineStyle(2, 0xFF00FF, 1);
        isEmpty ? this.dock.beginFill( 0x1099bb, 1)  : this.dock.beginFill( 0x000DE149, 1);
        this.dock.drawRect(0, 0, 150, 70);
        this.dock.position.set(this.cordX, this.cordY);
    }

}
