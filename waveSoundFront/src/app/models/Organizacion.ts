import { Playlist } from './Playlist';
import { Cancion } from './Cancion';

export interface Organizacion{
    cancion: Cancion;
    playlist: Playlist;
    orden: number;
}