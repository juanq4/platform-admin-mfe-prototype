export abstract class EntityBase {
  id?: string;

  constructor(entity?: EntityBase) {
    Object.assign(this, entity);
  }
}

export type EntityModel<T extends EntityBase> = new (entity: Partial<T>) => T;
