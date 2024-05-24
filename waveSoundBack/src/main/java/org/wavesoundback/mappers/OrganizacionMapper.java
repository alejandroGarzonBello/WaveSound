package org.wavesoundback.mappers;

import org.mapstruct.Mapper;
import org.wavesoundback.dto.OrganizacionDto;
import org.wavesoundback.entities.Organizacion;

@Mapper(componentModel="spring")
public interface OrganizacionMapper {
    OrganizacionDto crganizacionToDto (Organizacion crganizacion);
    Organizacion crganizacionToEntity (OrganizacionDto crganizacionDto);
}
