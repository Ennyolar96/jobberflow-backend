"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lifecycle = Lifecycle;
exports.runModuleInit = runModuleInit;
exports.runModuleDestroy = runModuleDestroy;
const typedi_1 = require("typedi");
class LifecycleRegistry {
    static register(serviceClass) {
        this.services.push(serviceClass);
    }
    static getServices() {
        return [...this.services];
    }
}
LifecycleRegistry.services = [];
function Lifecycle() {
    return function (constructor) {
        LifecycleRegistry.register(constructor);
    };
}
async function runModuleInit() {
    const services = LifecycleRegistry.getServices();
    console.log(`Initializing ${services.length} services...`);
    for (const ServiceClass of services) {
        try {
            const instance = typedi_1.Container.get(ServiceClass);
            if (typeof instance.onModuleInit === "function") {
                await instance.onModuleInit();
                console.log(`✓ ${ServiceClass.name} initialized`);
            }
        }
        catch (error) {
            console.error(`Failed to initialize ${ServiceClass.name}:`, error);
            throw error;
        }
    }
}
async function runModuleDestroy() {
    const services = LifecycleRegistry.getServices();
    console.log(`Destroying ${services.length} services...`);
    for (let i = services.length - 1; i >= 0; i--) {
        const ServiceClass = services[i];
        try {
            const instance = typedi_1.Container.get(ServiceClass);
            if (typeof instance.onModuleDestroy === "function") {
                await instance.onModuleDestroy();
                console.log(`✓ ${ServiceClass.name} destroyed`);
            }
        }
        catch (error) {
            console.error(`Failed to destroy ${ServiceClass.name}:`, error);
        }
    }
}
//# sourceMappingURL=module.js.map