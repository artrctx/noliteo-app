class Noliteo {
  private baseUrl: string;
  constructor() {
    this.baseUrl = process.env.SERVER_API_URL;
    if (!this.baseUrl) throw new Error("'SERVER_API_URL' env is missing");
  }

  //#region TOKEN
  //#endregion
}

export const noliteo = new Noliteo();
