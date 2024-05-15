import { Cancion } from "./Cancion";

export interface Usuario{
    id: number;
  nombre: string;
  email: string;
  password: string;
  token: string;
  canciones: Cancion[]|null;
}