package org.wavesoundback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.wavesoundback.entities.Cancion;
import org.wavesoundback.entities.Organizacion;
import org.wavesoundback.entities.Playlist;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OrganizacionRepository extends JpaRepository<Organizacion, Long> {
    boolean existsOrganizacionByCancionAndPlaylist(Cancion cancion, Playlist playlist);
    @Transactional
    @Modifying
    @Query("DELETE FROM Organizacion o WHERE o.playlist.id = ?1")
    void deleteByPlaylist_Id(Long id);
}

