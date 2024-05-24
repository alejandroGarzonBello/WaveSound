package org.wavesoundback.dto;

import org.wavesoundback.entities.Cancion;
import org.wavesoundback.entities.OrganizacionKey;
import org.wavesoundback.entities.Playlist;

public class OrganizacionDto {
    private OrganizacionKey id;
    private Cancion cancion;
    private Playlist playlist;
    private Long orden;

    public OrganizacionDto(OrganizacionKey id, Cancion cancion, Playlist playlist, Long orden) {
        this.id = id;
        this.cancion = cancion;
        this.playlist = playlist;
        this.orden = orden;
    }

    public OrganizacionDto() {
    }

    public OrganizacionKey getId() {
        return id;
    }

    public Cancion getCancion() {
        return cancion;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public Long getOrden() {
        return orden;
    }

    public void setId(OrganizacionKey id) {
        this.id = id;
    }

    public void setCancion(Cancion cancion) {
        this.cancion = cancion;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }

    public void setOrden(Long orden) {
        this.orden = orden;
    }
}
