import { ApplicationError } from './utility/Application-error';

export type RecordWithId = {
    id: number;
};

export type Entity<T> = T & RecordWithId;

export type CreateRecord<T extends object> = Omit<
    T,
    'id' | 'users' | 'expenses'
>;

export type UpdateRecord<T extends object> = RecordWithId & Partial<T>;

export interface GroupOption {
    relations: boolean;
}

export interface DbRepo<T extends object> {
    findOneById(id: number, options?: object): Entity<T> | undefined;
    findOne(properties: Partial<T>, options?: object): T | undefined;
    find(properties: Partial<T>, options?: object): T[];
    save(properties: CreateRecord<T> | UpdateRecord<T>): T;
    insert(entities: CreateRecord<T>[]): number;
    destroyAll(): void;
}

export abstract class InMemoryDb<T extends object> implements DbRepo<T> {
    private records: Entity<T>[];
    private lastId: number;

    constructor() {
        this.records = [];
        this.lastId = 1;
    }

    destroyAll(): void {
        this.records = [];
        this.lastId = 1;
    }

    private generateId() {
        return this.lastId++;
    }

    find(properties: Partial<T>, options?: object): T[] {
        const wantedKeys = Object.keys(
            properties
        ) as unknown as (keyof typeof properties)[];

        const resultList = this.records.filter((record) =>
            wantedKeys.every(
                (k) => properties[k] && record[k] === properties[k]
            )
        );

        return resultList;
    }

    findOneById(id: number, options?: object): Entity<T> | undefined {
        return this.records.find((record) => record.id === id);
    }

    findOne(properties: Partial<T>, options?: object): T | undefined {
        const wantedKeys = Object.keys(
            properties
        ) as unknown as (keyof typeof properties)[];

        const resultList = this.records.find((record) =>
            wantedKeys.every(
                (k) => properties[k] && record[k] === properties[k]
            )
        );

        return resultList;
    }

    insert(entities: CreateRecord<T>[]): number {
        const createdEntities: Entity<T>[] = entities.map(
            (e) =>
                ({
                    id: this.generateId(),
                    ...e,
                } as Entity<T>)
        );
        this.records.push(...createdEntities);
        return entities.length;
    }

    save(properties: CreateRecord<T> | UpdateRecord<T>): Entity<T> {
        if ('id' in properties) return this.updateRow(properties);

        const createdEntity: Entity<T> = {
            id: this.generateId(),
            ...properties,
        } as Entity<T>;
        this.records.push(createdEntity);
        return createdEntity;
    }

    private updateRow(entity: UpdateRecord<T>) {
        const wantedKeys = Object.keys(
            entity
        ) as unknown as (keyof UpdateRecord<T>)[];

        const targetedExpense = this.findOneById(entity.id);

        if (!targetedExpense)
            throw new ApplicationError(
                500,
                'entity updated failed. no entity with this id exists'
            );

        for (const key of wantedKeys) {
            // any idea for this line?
            if (key in entity && key in targetedExpense)
                targetedExpense[key] = entity[key] as never;
        }

        return targetedExpense;
    }
}
