import Notification from "@/components/factory/NotifFactory";
import { wsType } from "@/utils/enum";
const wsUrl = process.env.REACT_APP_WS_URL;
export var socket = null;

export const connectSocket = () => {
  socket = new WebSocket(wsUrl);
  socket.onopen = function () {
    console.log("websocket connected!!", socket.readyState);
  };
  socket.onmessage = function (msg) {
    const res = JSON.parse(msg.data);
    console.log(res);
    Notification({
      title: wsType[res.type],
      message: "",
    });
  };
  socket.onerror = function (err) {
    console.log("error", err);
  };
  socket.onclose = function () {
    // connectSocket();
  };
};
export const sendSocketMessage = msg => {
  if (1 === socket.readyState) socket.send(JSON.stringify(msg));
};
