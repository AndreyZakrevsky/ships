import {Graphics} from "pixi.js";

export class Port {
   private port: Graphics;

    constructor() {
        this.port = new Graphics();
        this.port.lineStyle(3, 0xFF00FF, 1);
        this.port.beginFill(0x1099dd, 1);
        this.port.drawRect(0, 0, 1600, 400);
        this.port.position.set(0, 800);
        this.getPort.bind(this);
    }

   public getPort(): Graphics {
        return this.port;
    }

}
