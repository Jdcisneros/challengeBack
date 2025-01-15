"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_1 = __importDefault(require("./models/Todo"));
const testTodoModel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTodo = yield Todo_1.default.create({
            title: 'Comprar leche',
            description: 'Comprar leche descremada en el supermercado',
            completed: false,
            userId: 1, // Asegúrate de que exista un usuario con este ID
        });
        console.log('Todo creado:', newTodo.toJSON());
    }
    catch (error) {
        console.error('Error al crear el Todo:', error);
    }
});
testTodoModel();
