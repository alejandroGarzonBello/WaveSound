import { Usuario } from "./Usuario";

export interface Cancion{
    id?: number;
  titulo: string;
  artista: string;
  album: string;
  genero: string;
  duracion: string;
  ubicacion: string;
  portada: string;
  favorito: boolean;
  usuario: Usuario;
}