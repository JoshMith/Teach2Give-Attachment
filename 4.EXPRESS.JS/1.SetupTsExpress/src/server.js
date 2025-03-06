"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
//configure the dotenv
dotenv_1.default.config();
//instance of express
const app = express_1.default;
//load the variables
const port = process.env.PORT;
console.log(port); //3000
//get the current directory
const _dirname = path_1.default.resolve();
// synchronously reaf the file
const eventDAtaa = (0, fs_1.readFileSync)(path_1.default.join(_dirname, "src", "db", "eventsData.json"), "utf-8");
