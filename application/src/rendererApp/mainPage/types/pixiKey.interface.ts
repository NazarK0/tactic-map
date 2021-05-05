interface Procedure { (): void };
interface Handler { (event: any): void };

export default interface PixiKey {
    value: string;
    isDown: boolean;
    isUp: boolean;
    press: Procedure | null;
    release: Procedure | null;
    downHandler: Handler;
    upHandler: Handler;
    unsubscribe: Procedure;
}