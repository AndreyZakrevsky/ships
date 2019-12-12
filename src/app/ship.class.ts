import { Graphics } from "pixi.js";
import { IShipOptions } from  "./Interfaces";

export class Ship implements IShipOptions {
    public ship: Graphics;
    public requiredDock: number ;
    private cordX: number ;
    private cordY: number ;
    private isEmpty: boolean;

    constructor( x: number , y: number) {
        this.ship = new Graphics();
        this.cordX = x;
        this.cordY = y;
        this.unloadShip.bind(this);
        this.loadShip.bind(this);
        this.changeStatus.bind(this);
        this.moveTo.bind(this);
        this.isEmptyShip.bind(this);
        this.setRequiredDock.bind(this);
    }

    public unloadShip(): void {
        this.changeStatus(true);
    }

    public loadShip(): void {
        this.changeStatus(false);
    }

    public isEmptyShip(): boolean {
        return this.isEmpty;
    }

    public setRequiredDock(dock: number): void {
        this.requiredDock = dock;
    }

    public moveTo(x: number , y: number, arrrived: () => any): void {

        const goProccess = setInterval(() => {
            if (this.cordY === y && this.cordX === x ) {
                arrrived();
                clearInterval(goProccess);
            }
            if (this.ship.position.x < x ) {
                this.cordX = this.ship.position.x + 1;
                this.ship.position.set(this.cordX, this.cordY );
            } else if (this.ship.position.x > x) {
                this.cordX = this.ship.position.x - 1;
                this.ship.position.set(this.cordX, this.cordY);
            }

            if (this.ship.position.y < y ) {
                this.cordY = this.ship.position.y + 1;
                this.ship.position.set(this.cordX, this.cordY );
            } else if (this.ship.position.y > y) {
                this.cordY = this.ship.position.y - 1;
                this.ship.position.set(this.cordX, this.cordY);
            }

        }, 5);
    }

    public changeStatus(isEmpty: boolean): void {
        this.isEmpty = isEmpty;
        isEmpty ? this.ship.beginFill(0x000DE149, 1) : this.ship.beginFill(0xff0000, 1) ;
        this.ship.drawRect(0, 0, 50, 70);
        this.ship.position.set(this.cordX, this.cordY);
    }

}
