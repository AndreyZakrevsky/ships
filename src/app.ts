import {Application, loader} from "pixi.js";
import {Ship} from "@app/ship.class";
import {Port} from "@app/port.class";
import {Dock} from "@app/dock.class";
import {Gate} from "@app/gate.class";

class Game {
    private app: Application;
    private clearQueuesManager: any;
    private docks: Dock[] = [];
    private queueEmptyShips: any[];
    private queueFullShips: any[];
    private gate: Gate;

    constructor() {
        this.queueFullShips = [];
        this.queueEmptyShips = [];
        this.app = new Application({
            backgroundColor: 0x1099bb,
            height: 1200,
            width: 1600
        });
        document.body.appendChild(this.app.view);
        this.gate = new Gate(800, 799);
        loader.load(this.setup.bind(this));
    }

    private setup(): void {
        const port = new Port();
        this.app.stage.addChild(port.getPort());
        this.app.stage.addChild(this.gate.gate);
        for (let i = 0; i < 4; i++) {
            const newDock = new Dock(75 + (i * 430), 1120);
            newDock.unload();
            this.docks.push(newDock);
            this.app.stage.addChild(newDock.dock);
        }

        this.generateShips();
    }

    private generateShips(): void {
        this.queueClear();
        const generate: any =  setInterval(() => {

            let queuePositionX: number;
            const queuePositionY: number = this.gate.gate.position.y - 150;
            const initX: number = Math.floor(1 + Math.random() * (1000 + 1 - 1));
            const initY: number = 0;
            const ship: object = new Ship(initX, initY);
            let requiredQueue: any;

            if (initX % 2) {
                requiredQueue = this.queueFullShips;
                ship.loadShip();
                queuePositionX =  700;
            } else {
                requiredQueue = this.queueEmptyShips;
                ship.unloadShip();
                queuePositionX = 940;
            }

            if (requiredQueue.length < 5 && ship) {
                this.app.stage.addChild(ship.ship);
                const agree: any = this.findRequiredDock(ship);
                if (agree && requiredQueue.length === 0) {
                    ship.setRequiredDock(agree - 1);
                    ship.moveTo(this.gate.gate.position.x + 21, this.gate.gate.position.y - 100, () => {
                        this.goThroughGate(ship, "in", this.docks[ship.requiredDock].cordX + 55, this.docks[ship.requiredDock].cordY - 100);
                    });
                } else {
                    requiredQueue.push(ship);
                    ship.moveTo(queuePositionX, queuePositionY, () => {});
                }
            } else {
                this.gate.open();
                this.queueClear();
            }

        }, 8000);
    }

    private queueClear(): void {
        const clear = (): any => {
            this.clearQueuesManager =  setTimeout(() => {
                const rand: any = Math.floor(1 + Math.random() * (1000 + 1 - 1 );
                if (rand % 2 === 0) {
                    if (this.queueFullShips.length > 0 && !this.gate.isCloseGate()) {
                        const agree: any = this.findRequiredDock(this.queueFullShips[0]);
                        if (agree) {
                            this.queueFullShips[0].setRequiredDock(agree - 1);
                            this.queueFullShips[0].moveTo(this.gate.gate.position.x + 21, this.gate.gate.position.y - 100, () => {
                                if (this.docks[this.queueFullShips[0].requiredDock].cordX + 55 && this.docks[this.queueFullShips[0].requiredDock].cordY - 100 ) {
                                    this.goThroughGate(this.queueFullShips[0], "in", this.docks[this.queueFullShips[0].requiredDock].cordX + 55, this.docks[this.queueFullShips[0].requiredDock].cordY - 100);
                                } else {
                                    this.queueFullShips[0].moveTo( 5 , -100 , (): void => {});
                                }
                                this.queueFullShips.shift();
                            });
                        }
                    }
                } else {
                    if (this.queueEmptyShips.length > 0 && !this.gate.isCloseGate()) {
                        const agree: any = this.findRequiredDock(this.queueEmptyShips[0]);
                        if (agree) {
                            this.queueEmptyShips[0].setRequiredDock(agree - 1);
                            this.queueEmptyShips[0].moveTo(this.gate.gate.position.x + 21, this.gate.gate.position.y - 100, () => {
                                this.goThroughGate(this.queueEmptyShips[0], "in", this.docks[this.queueEmptyShips[0].requiredDock].cordX + 55, this.docks[this.queueEmptyShips[0].requiredDock].cordY - 100);
                                this.queueEmptyShips.shift();
                            });
                        }
                    }
                }

                clearTimeout(this.clearQueuesManager);
                clear();
            }, 500 );
        };

        clear();
   }

    private findRequiredDock(ship: object): any {
        let indexDock: any = null;

        if (!ship.isEmptyShip()) {
            this.docks.map((dock: object, i: number) => {
                if (dock.isEmptyDock() && !dock.isReservedDock() && indexDock === null) {
                    indexDock = i + 1;
                    this.docks[i].reserveDock();
                }
            });
        } else {
            this.docks.map((dock: object, i: number) => {
                if (!dock.isEmptyDock() && !dock.isReservedDock() && indexDock === null) {
                    indexDock = i + 1;
                    this.docks[i].reserveDock();
                }
            });
        }

        return indexDock;
    }

    private goThroughGate(ship: object, dir: string, x: number, y: number): any {

        if (this.gate.isCloseGate()) {
            return  setTimeout(() => {
                this.goThroughGate(ship, dir, x, y);
            }, 1000);
        } else {
            if (dir === "in") {
                this.gate.close();
                ship.moveTo(this.gate.gate.position.x + 21, this.gate.gate.position.y + 60, () => {
                    this.gate.open();
                    ship.moveTo(x, y, () => {

                        setTimeout( () => {
                            if (ship.isEmptyShip()) {
                                ship.loadShip();
                                this.docks[ship.requiredDock].unload();
                            } else {
                                ship.unloadShip();
                                this.docks[ship.requiredDock].load();
                            }

                            ship.moveTo(this.gate.gate.position.x + 21, this.gate.gate.position.y + 60, () => {
                                this.goThroughGate(ship, "out", Math.floor(1 + Math.random() * (1000 + 1 - 1)), -105);
                            });

                        } , 5000 );

                    });

                });
            } else {
                this.gate.close();
                ship.moveTo(this.gate.gate.position.x + 21, this.gate.gate.position.y - 100, () => {
                    this.gate.open();
                    ship.moveTo(x, y, () => {});
                });
            }
        }
    }

}

new Game();
