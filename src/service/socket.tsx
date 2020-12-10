export interface IUser {
  id: number,
  type: number
  email: string,
  name: string,
  avatar: string,
  key: string // TODO tmp
}

export interface IContact {
  user: IUser,
  history?: IMessage[] | null
}

export interface IEvent {
  ts?: string,
  type: string,
  payload: any
}

export interface IMessage {
  id: number | null,
  type: string,
  from: number,
  to: number,
  ts: number,
  tag: string,
  text: string | null,
  extra: string | null
}

export interface IMessageRequest {
  type: string,
  to: number,
  text: string,
  tag: string
}

export class TObject {
  constructor(data?: Partial<TObject>) {
    if (data) {
      Object.assign(this, data)
    }
  }

  static array<T>(this: { new(): T }, array: Partial<T>[]): T[] {
    const result = []
    for (const item of array) {
      result.push(new this.prototype.constructor(item))
    }
    return result
  }
}

export class TContact extends TObject implements IContact {
  constructor(data?: Partial<TContact>) {
    super(data)
  }

  user: IUser
  history: IMessage[] | null = []
}