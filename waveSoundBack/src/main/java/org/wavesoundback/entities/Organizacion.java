package org.wavesoundback.entities;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
public class Organizacion {

    @EmbeddedId
    private OrganizacionKey id;

    @ManyToOne
    @MapsId("cancionId")
    @JoinColumn(name = "cancion_id")
    @JsonIgnoreProperties(value = {"organizacion" , "usuario"})
    private Cancion cancion;

    @ManyToOne
    @MapsId("playlistId")
    @JoinColumn(name = "playlist_id")
    @JsonIgnoreProperties(value = {"organizacion"})
    private Playlist playlist;

    private Long orden;

    // Getters y Setters
    public OrganizacionKey getId() {
        return id;
    }

    public void setId(OrganizacionKey id) {
        this.id = id;
    }

    public Cancion getCancion() {
        return cancion;
    }

    public void setCancion(Cancion cancion) {
        this.cancion = cancion;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }

    public Long getOrden() {
        return orden;
    }

    public void setOrden(Long orden) {
        this.orden = orden;
    }
}

