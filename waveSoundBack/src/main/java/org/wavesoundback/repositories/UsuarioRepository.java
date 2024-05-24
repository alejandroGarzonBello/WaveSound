package org.wavesoundback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wavesoundback.entities.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByNombre(String username);
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
}

