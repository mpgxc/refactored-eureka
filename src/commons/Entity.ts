import { EntityId } from './EntityId';

abstract class Entity<Props = unknown> {
  protected readonly _id: string;
  protected readonly _props: Props;

  constructor(props: Props, id?: string) {
    this._props = props;
    this._id = id || EntityId.build();
  }

  get id() {
    return this._id;
  }
}

export { Entity };
