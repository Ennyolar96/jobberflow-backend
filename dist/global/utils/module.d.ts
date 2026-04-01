export interface OnModuleDestroy {
    onModuleDestroy(): void;
}
export interface OnModuleInit {
    onModuleInit(): void;
}
export declare function Lifecycle(): (constructor: Function) => void;
export declare function runModuleInit(): Promise<void>;
export declare function runModuleDestroy(): Promise<void>;
