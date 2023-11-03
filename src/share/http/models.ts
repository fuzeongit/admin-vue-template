export class RestfulResult<T> {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public code: number,
    public message?: string,
    public data?: T
  ) {}
}
