import { Container } from "typedi";

export interface OnModuleDestroy {
  onModuleDestroy(): void;
}

export interface OnModuleInit {
  onModuleInit(): void;
}

// Simple registry
class LifecycleRegistry {
  private static services: Function[] = [];

  static register(serviceClass: Function) {
    this.services.push(serviceClass);
  }

  static getServices(): Function[] {
    return [...this.services];
  }
}

// Helper decorator (optional)
export function Lifecycle() {
  return function (constructor: Function) {
    LifecycleRegistry.register(constructor);
  };
}

export async function runModuleInit() {
  const services = LifecycleRegistry.getServices();
  console.log(`Initializing ${services.length} services...`);

  for (const ServiceClass of services) {
    try {
      const instance = Container.get(ServiceClass);

      if (typeof (instance as any).onModuleInit === "function") {
        // console.log(`Initializing ${ServiceClass.name}...`);
        await (instance as any).onModuleInit();
        console.log(`✓ ${ServiceClass.name} initialized`);
      }
    } catch (error) {
      console.error(`Failed to initialize ${ServiceClass.name}:`, error);
      throw error;
    }
  }
}

export async function runModuleDestroy() {
  const services = LifecycleRegistry.getServices();
  console.log(`Destroying ${services.length} services...`);

  // Destroy in reverse order
  for (let i = services.length - 1; i >= 0; i--) {
    const ServiceClass = services[i];
    try {
      const instance = Container.get(ServiceClass);

      if (typeof (instance as any).onModuleDestroy === "function") {
        // console.log(`Destroying ${ServiceClass.name}...`);
        await (instance as any).onModuleDestroy();
        console.log(`✓ ${ServiceClass.name} destroyed`);
      }
    } catch (error) {
      console.error(`Failed to destroy ${ServiceClass.name}:`, error);
    }
  }
}
