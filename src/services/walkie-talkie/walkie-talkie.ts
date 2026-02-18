import { Noliteo } from "../noliteo/noliteo";

type WalkieTalkieArgs = {
  token: string;
};

export class WalkieTalkie extends Noliteo {
  private ws: WebSocket;
  constructor({ token }: WalkieTalkieArgs) {
    super();
    const base = new URL(this.baseUrl);
    this.ws = new WebSocket(`ws://${base.host}/api/walkie-talkie?token=${token}`);
  }

  registerOnOpen(cb: () => void) {
    this.ws.onopen = cb;
  }

  registerOnError(cb: () => void) {
    this.ws.onerror = cb;
  }

  registerOnClose(cb: (_: { reason: string; code: number }) => void) {
    this.ws.onclose = (e) => cb({ reason: e.reason, code: e.code });
  }
}
