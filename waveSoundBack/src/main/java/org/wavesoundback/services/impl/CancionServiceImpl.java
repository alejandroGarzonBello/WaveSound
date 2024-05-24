package org.wavesoundback.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.wavesoundback.dto.CancionDto;
import org.wavesoundback.entities.Cancion;
import org.wavesoundback.entities.Usuario;
import org.wavesoundback.mappers.CancionMapper;
import org.wavesoundback.repositories.CancionRepository;
import org.wavesoundback.repositories.UsuarioRepository;
import org.wavesoundback.services.CancionService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CancionServiceImpl implements CancionService {
    @Autowired
    private CancionRepository cancionRepository;

    @Qualifier("cancionMapperImpl")
    @Autowired
    private CancionMapper mapper;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<CancionDto> obtenerCanciones() {
        List<Cancion> canciones =  cancionRepository.findAll();
        return canciones.stream().map(cancion -> mapper.cancionToDto(cancion)).toList();
    }

    @Override
    public CancionDto obtenerCancionPorId(Long id) {
        Cancion cancion = cancionRepository.findById(id).orElse(null);
        if(cancion != null){
            return mapper.cancionToDto(cancion);
        }
        return null;
    }

    @Override
    public String guardarCancion(CancionDto cancionDto) {
    Usuario usuario = usuarioRepository.findById(cancionDto.getUsuario().getId())
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    Cancion cancionEntity = mapper.cancionToEntity(cancionDto);
    cancionEntity.setUsuario(usuario);

    if(!cancionRepository.existsCancionByTituloEquals(cancionDto.getTitulo())){
        cancionRepository.save(cancionEntity);
        return "Cancion guardada";
    }
    return null;
}

    @Override
    public String actualizarCancion(Long id, CancionDto cancion) {
        Cancion cancionEntity = mapper.cancionToEntity(cancion);
        if(cancionRepository.findById(id).isPresent()){
            cancionRepository.save(cancionEntity);
            return "Cancion actualizada";
        }
        return null;
    }

    @Override
    public String eliminarCancion(Long id) {
        if(cancionRepository.findById(id).isPresent()){
            cancionRepository.deleteById(id);
            return "Cancion eliminada";
        }
        return null;
    }

    @Override
    public List<CancionDto> obtenerCancionesPorNombre(String nombre) {
        List<Cancion> canciones = cancionRepository.findByTituloContaining(nombre);
        return canciones.stream().map(cancion -> mapper.cancionToDto(cancion)).toList();
    }

    @Override
    public List<CancionDto> obtenerCancionesPorUsuario(Long id) {
        List<Cancion> canciones = cancionRepository.findByUsuarioId(id);
        return canciones.stream().map(cancion -> mapper.cancionToDto(cancion)).toList();
    }




}

