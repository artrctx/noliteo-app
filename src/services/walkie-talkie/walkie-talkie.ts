import { Noliteo } from "../noliteo/noliteo";

export class WalkieTalkie extends Noliteo {
  ws: WebSocket;
  constructor(token: string) {
    super();
    this.ws = new WebSocket(`ws://192.168.4.33:8080/api/walkie-talkie?token=${token}`);
  }
}
