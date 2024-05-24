package org.wavesoundback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.wavesoundback.entities.Cancion;

import java.util.List;

@Repository
public interface CancionRepository extends JpaRepository<Cancion, Long> {
    List<Cancion> findByTituloContaining(String nombre);
    List<Cancion> findByArtistaContaining(String nombre);
    List<Cancion> findByAlbumContaining(String nombre);
    List<Cancion> findByGeneroContaining(String nombre);

    boolean existsCancionByTituloEquals(String titulo);
    List<Cancion> findByUsuarioId(Long id);
}
