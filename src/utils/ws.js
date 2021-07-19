import OrderNotif from "@/views/Order/Notification";

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
    res.type !== "pong" && OrderNotif(res);
  };
  socket.onerror = function (err) {
    console.log("error", err);
  };
  socket.onclose = function () {
    clearInterval(pingTimer);
  };
};
export const sendSocketMessage = msg => {
  if (1 === socket.readyState) socket.send(JSON.stringify(msg));
};
