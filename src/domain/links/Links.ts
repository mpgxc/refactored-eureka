import { Entity } from 'commons/Entity';

import { URL } from './URL';

type LinksProps = {
  url: URL;
  token: string;
};

class Links extends Entity<LinksProps> {
  private constructor(props: LinksProps, id?: string) {
    super(props, id);
  }

  get url(): string {
    return this._props.url.value;
  }

  get token(): string {
    return this._props.token;
  }

  public static build(props: LinksProps, id?: string): Links {
    return new this(props, id);
  }
}

export { Links };
