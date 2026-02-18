import { RTCPeerConnection } from "react-native-webrtc";
import { Noliteo } from "../noliteo/noliteo";

type WalkieTalkieArgs = {
  token: string;
};

export class WalkieTalkie extends Noliteo {
  private ws: WebSocket;
  private pc: RTCPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
      },
    ],
    iceCandidatePoolSize: 10,
  });

  constructor({ token }: WalkieTalkieArgs) {
    super();
    const base = new URL(this.baseUrl);
    this.ws = new WebSocket(
      `${base.protocol.endsWith("s:") ? "wss" : "ws"}://${base.host}/api/walkie-talkie?token=${token}`
    );
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
