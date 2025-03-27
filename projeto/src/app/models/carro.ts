import { Acessorio } from "./acessorio";
import { Marca } from "./marca";

export class Carro {
    id!: number;
    nome!: string;
    modelo!: string;
    marca!: Marca; //N PARA 1
    acessorios!: Acessorio[]; // N PARA N
}
