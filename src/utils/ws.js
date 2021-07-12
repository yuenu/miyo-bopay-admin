import Notification from "@/components/factory/NotifFactory";
import { wsType } from "@/utils/enum";
const wsUrl = process.env.REACT_APP_WS_URL;
export var socket = null;
const handlePinPerSecond = () => {
  if (socket.readyState === 1) socket.send(JSON.stringify({ type: "ping" }));
};
export let pingTimer;
export const connectSocket = () => {
  socket = new WebSocket(wsUrl);
  socket.onopen = function () {
    pingTimer = setInterval(handlePinPerSecond, 10000);
  };
  socket.onmessage = function (msg) {
    const res = JSON.parse(msg.data);
    res.type !== "pong" &&
      Notification({
        type: "info",
        title: wsType[res.type] || res.type || "ws",
        message: "",
      });
  };
  socket.onerror = function (err) {
    console.log("error", err);
  };
  socket.onclose = function () {
    // connectSocket();
    clearInterval(pingTimer);
  };
};
export const sendSocketMessage = msg => {
  if (1 === socket.readyState) socket.send(JSON.stringify(msg));
};
