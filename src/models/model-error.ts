export class ModelError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ModelError";
  }
}
/* tuve que crear esto para que no me llore el el vs code */