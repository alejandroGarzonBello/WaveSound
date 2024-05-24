package org.wavesoundback.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wavesoundback.dto.CancionDto;
import org.springframework.transaction.annotation.Transactional;
import org.wavesoundback.dto.PlaylistDto;
import org.wavesoundback.dto.UsuarioDto;
import org.wavesoundback.entities.Playlist;
import org.wavesoundback.entities.Usuario;
import org.wavesoundback.mappers.CancionMapper;
import org.wavesoundback.entities.Usuario;
import org.wavesoundback.mappers.PlaylistMapper;
import org.wavesoundback.mappers.UsuarioMapper;
import org.wavesoundback.repositories.PlaylistRepository;
import org.wavesoundback.services.PlaylistService;
import org.wavesoundback.services.UsuarioService;

import java.util.List;

@Service
public class PlaylistServiceImpl implements PlaylistService {
    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PlaylistMapper playlistMapper;
    @Autowired
    private UsuarioMapper usuarioMapper;
    @Autowired
    private CancionMapper cancionMapper;
    @Autowired
    private OrganizacionServiceImpl organizacionService;


    @Override
    public List<PlaylistDto> findByUsuario(Long id) {
        UsuarioDto usuario = usuarioService.findById(id);
        List<Playlist> playlists = playlistRepository.findByUsuario(usuarioMapper.usuarioToEntity(usuario));
        return playlists.stream().map(playlist -> playlistMapper.playlistToDto(playlist)).toList();
    }

    @Override
    public List<PlaylistDto> findAll() {
        List<Playlist> playlists =  playlistRepository.findAll();
        return playlists.stream().map(playlist -> playlistMapper.playlistToDto(playlist)).toList();
    }

    @Override
    public PlaylistDto findById(Long id) {
        Playlist playlist = playlistRepository.findById(id).orElse(null);
        if(playlist != null){
            return playlistMapper.playlistToDto(playlist);
        }
        return null;
    }

    @Override
    public PlaylistDto findByNombre(String nombre) {
        Playlist playlist = playlistRepository.findByNombre(nombre);
        if (playlist != null) {
            return playlistMapper.playlistToDto(playlist);
        }
        return null;
    }

    @Override
    public String save(PlaylistDto playlist) {
        UsuarioDto usuarioDto = usuarioService.findById(playlist.getUsuario().getId());
        if (usuarioDto == null) {
            throw new RuntimeException("Usuario not found");
        }
        Usuario usuario = usuarioMapper.usuarioToEntity(usuarioDto);
        Playlist playlistEntity = playlistMapper.playlistToEntity(playlist);
        playlistEntity.setUsuario(usuario);

        // Check for duplicate playlist names for the same user
        boolean exists = playlistRepository.existsByNombreAndUsuario(playlist.getNombre(), usuario);
        if (!exists) {
            playlistRepository.save(playlistEntity);
            return "Playlist guardada";
        }else{
            return null;
        }
    }

    @Override
    public String update(PlaylistDto playlist, Long id) {
        Playlist playlistEntity = playlistMapper.playlistToEntity(playlist);
        if(playlistRepository.findById(id).isPresent()){
            playlistRepository.save(playlistEntity);
            return "Playlist actualizada";
        }
        return null;
    }

    @Override
    public String delete(Long id) {
        if(playlistRepository.findById(id).isPresent()){
            System.out.println("ID Delete:"+playlistRepository.findById(id).get().getNombre());
            Playlist p = playlistRepository.findById(id).get();
            organizacionService.eliminarOrganizacionPorPlaylist(id);
            playlistRepository.delete(p);
            return "Playlist eliminada";
        }else {
            return null;
        }
    }

    @Override
    public List<CancionDto> findCancionesByPlaylist(Long id) {
        Playlist playlist = playlistRepository.findById(id).orElse(null);
        if(playlist != null){
            return playlist.getOrganizacion().stream().map(organizacion -> organizacion.getCancion()).map(cancion -> cancionMapper.cancionToDto(cancion)).toList();
        }
        return null;
    }
}

