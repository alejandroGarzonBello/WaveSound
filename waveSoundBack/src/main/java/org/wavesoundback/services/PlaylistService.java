package org.wavesoundback.services;

import org.wavesoundback.dto.CancionDto;
import org.wavesoundback.dto.PlaylistDto;
import org.wavesoundback.entities.Playlist;
import org.wavesoundback.entities.Usuario;

import java.util.List;

public interface PlaylistService {

    List<PlaylistDto> findByUsuario(Long id);

    List<PlaylistDto> findAll();
    PlaylistDto findById(Long id);
    PlaylistDto findByNombre(String nombre);
    String save(PlaylistDto playlist);
    String update(PlaylistDto playlist, Long id);
    String delete(Long id);

    List<CancionDto> findCancionesByPlaylist(Long id);
}
