package org.wavesoundback.services.impl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.wavesoundback.dto.OrganizacionDto;
import org.wavesoundback.entities.Cancion;
import org.wavesoundback.entities.Organizacion;
import org.wavesoundback.entities.OrganizacionKey;
import org.wavesoundback.entities.Playlist;
import org.wavesoundback.mappers.OrganizacionMapper;
import org.wavesoundback.repositories.CancionRepository;
import org.wavesoundback.repositories.OrganizacionRepository;
import org.wavesoundback.repositories.PlaylistRepository;
import org.wavesoundback.services.OrganizacionService;

import java.util.List;

@Service
public class OrganizacionServiceImpl implements OrganizacionService {
    @Autowired
    private OrganizacionRepository organizacionRepository;

    @Autowired
    private OrganizacionMapper organizacionMapper;

    @Autowired
    private CancionRepository cancionRepository;

    @Autowired
    private PlaylistRepository playlistRepository;


    @Override
    public List<OrganizacionDto> obtenerOrganizaciones() {
        List<Organizacion> organizaciones =  organizacionRepository.findAll();
        return organizaciones.stream().map(organizacion -> organizacionMapper.crganizacionToDto(organizacion)).toList();
    }

    @Override
    public OrganizacionDto obtenerOrganizacionPorId(Long id) {
        Organizacion organizacion = organizacionRepository.findById(id).orElse(null);
        if(organizacion != null){
            return organizacionMapper.crganizacionToDto(organizacion);
        }
        return null;
    }

    @Override
    public String guardarOrganizacion(Long idCancion, Long idPlaylist) {
       Organizacion organizacion = new Organizacion();
        Cancion cancion = cancionRepository.findById(idCancion).orElse(null);
        Playlist playlist = playlistRepository.findById(idPlaylist).orElse(null);
        OrganizacionKey organizacionKey = new OrganizacionKey();
        organizacionKey.setCancionId(idCancion);
        organizacionKey.setPlaylistId(idPlaylist);
        organizacion.setId(organizacionKey);
        organizacion.setCancion(cancion);
        organizacion.setPlaylist(playlist);
        organizacionRepository.save(organizacion);
        return "Organizacion guardada";
    }

    @Override
    public String actualizarOrganizacion(Long id, OrganizacionDto organizacion) {
        Organizacion organizacionEntity = organizacionMapper.crganizacionToEntity(organizacion);
        if(organizacionRepository.findById(id).isPresent()){
            organizacionRepository.save(organizacionEntity);
            return "Organizacion actualizada";
        }
        return null;
    }

    @Override
    public String eliminarOrganizacion(Long id) {
        if(organizacionRepository.findById(id).isPresent()){
            organizacionRepository.deleteById(id);
            return "Organizacion eliminada";
        }
        return null;
    }

    @Transactional
    public void eliminarOrganizacionPorPlaylist(Long id){
        organizacionRepository.deleteByPlaylist_Id(id);
    }
}

