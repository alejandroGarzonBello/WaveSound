import { Organizacion } from "./Organizacion";
import { Usuario } from "./Usuario";

export interface Playlist{
  id: number;
  nombre: string;
  portada: string;
  usuario: Usuario;
}