package org.wavesoundback.entities;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;


@Embeddable
public class OrganizacionKey implements Serializable {

    @Column(name = "cancion_id")
    private Long cancionId;

    @Column(name = "playlist_id")
    private Long playlistId;

    public OrganizacionKey() {}

    public OrganizacionKey(Long cancionId, Long playlistId) {
        this.cancionId = cancionId;
        this.playlistId = playlistId;
    }

    // Getters y Setters
    public Long getCancionId() {
        return cancionId;
    }

    public void setCancionId(Long cancionId) {
        this.cancionId = cancionId;
    }

    public Long getPlaylistId() {
        return playlistId;
    }

    public void setPlaylistId(Long playlistId) {
        this.playlistId = playlistId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrganizacionKey that = (OrganizacionKey) o;
        return Objects.equals(cancionId, that.cancionId) &&
                Objects.equals(playlistId, that.playlistId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cancionId, playlistId);
    }
}
