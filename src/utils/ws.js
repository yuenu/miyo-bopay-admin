import Notification from "@/components/factory/NotifFactory";
import { wsType } from "@/utils/enum";
const wsUrl = process.env.REACT_APP_WS_URL;
export var socket = null;
const handlePinPerSecond = () => {
  socket.send(JSON.stringify({ type: "ping" }));
};
export const connectSocket = () => {
  socket = new WebSocket(wsUrl);
  socket.onopen = function () {
    setInterval(handlePinPerSecond, 10 * 1000);
  };
  socket.onmessage = function (msg) {
    const res = JSON.parse(msg.data);
    res.type !== "pong" &&
      Notification({
        title: wsType[res.type] || "ws",
        message: "",
      });
  };
  socket.onerror = function (err) {
    console.log("error", err);
  };
  socket.onclose = function () {
    // connectSocket();
    clearInterval(handlePinPerSecond);
  };
};
export const sendSocketMessage = msg => {
  if (1 === socket.readyState) socket.send(JSON.stringify(msg));
};
