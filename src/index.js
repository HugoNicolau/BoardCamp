import { connectionDB } from "./database/database.js";
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
