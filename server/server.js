const WebSocket = require("ws");

// Используем порт из Render, либо 8080 локально
const PORT = process.env.PORT || 10000; // Render назначит свой порт;

const wss = new WebSocket.Server({ port: PORT });
console.log(`Server started on ws://localhost:${PORT}`);

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (msg) => {
        console.log("Received:", msg.toString());

        // отправка сообщения всем подключённым клиентам
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg.toString());
            }
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
