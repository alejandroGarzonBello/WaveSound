package org.wavesoundback.services;

import org.wavesoundback.dto.CancionDto;

import java.util.List;

public interface CancionService {

    List<CancionDto> obtenerCanciones();
    CancionDto obtenerCancionPorId(Long id);
    String guardarCancion(CancionDto cancion);
    String actualizarCancion(Long id, CancionDto cancion);
    String eliminarCancion(Long id);
    List<CancionDto> obtenerCancionesPorNombre(String nombre);
    List<CancionDto> obtenerCancionesPorUsuario(Long id);
}
