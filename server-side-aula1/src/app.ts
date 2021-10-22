import "dotenv/config";
import express from 'express';
import http from 'http';
import cors from 'cors';

import { Server } from "socket.io";
import { router } from "./routes";

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
});

io.on("connetion", (socket) => {
    console.log(`Usuário conectado no socket ${socket.id}`);
    
})


app.use(express.json());

app.use(router);


// 1 - autenticação de usuário 

app.get("/github", (req, res) =>{
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );  
});

// 2 - callback de validação  

app.get("/sigin/callback", (req, res) => {
    const { code } = req.query;

    return res.json(code);
});


export { serverHttp, io }; 
