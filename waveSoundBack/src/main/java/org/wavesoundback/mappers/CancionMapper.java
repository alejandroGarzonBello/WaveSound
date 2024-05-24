package org.wavesoundback.mappers;

import org.mapstruct.Mapper;
import org.wavesoundback.dto.CancionDto;
import org.wavesoundback.entities.Cancion;

@Mapper(componentModel="spring")
public interface CancionMapper {
    CancionDto cancionToDto (Cancion cancion);
    Cancion cancionToEntity (CancionDto cancionDto);
}
