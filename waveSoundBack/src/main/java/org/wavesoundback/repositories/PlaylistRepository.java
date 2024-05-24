package org.wavesoundback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wavesoundback.entities.Playlist;
import org.wavesoundback.entities.Usuario;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    Playlist findByNombre(String nombre);
    boolean existsByNombre(String nombre);

    List<Playlist> findByUsuario(Usuario usuario);

    boolean existsByNombreAndUsuario(String nombre, Usuario usuario);


}
