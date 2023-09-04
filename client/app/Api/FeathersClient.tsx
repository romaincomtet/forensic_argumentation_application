import io from "socket.io-client";
import socketio from "@feathersjs/socketio-client";
import { createClient } from "forensic-server";

const connection = socketio(
  io(process.env.NEXT_PUBLIC_URL_BACKEND || "http://localhost:3030"),
);

const FClient = createClient(connection);

export default FClient;
