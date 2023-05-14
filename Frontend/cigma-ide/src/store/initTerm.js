import { FitAddon } from "xterm-addon-fit";

export const fitAddon = new FitAddon();

const { VITE_WS_PORT } = import.meta.env;

const termPort = VITE_WS_PORT || 5000;
export const socket = new WebSocket(
  `ws://${window.location.hostname}:${termPort}/terminal`
);
