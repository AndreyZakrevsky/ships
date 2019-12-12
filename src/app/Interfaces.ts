 export interface IGateOptions {
    close(): void;
    open(): void;
    isCloseGate(): boolean;
 }

 export interface IDockOptions {
    reserveDock(): void;
    isReservedDock(): boolean ;
    unload(): void ;
    load(): void ;
    isEmptyDock(): boolean ;
    changeStatus(isEmpty: boolean): void;
 }

 export interface IShipOptions {
     loadShip(): void;
     isEmptyShip(): boolean;
     unloadShip(): void;
     setRequiredDock(dock: number): void;
     changeStatus(isEmpty: boolean): void;
     moveTo(x: number , y: number, arrrived: () => any): void;
 }

