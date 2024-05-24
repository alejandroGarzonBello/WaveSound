package org.wavesoundback.services;

import org.wavesoundback.dto.OrganizacionDto;
import org.wavesoundback.entities.Organizacion;

import java.util.List;

public interface OrganizacionService {

    List<OrganizacionDto> obtenerOrganizaciones();
    OrganizacionDto obtenerOrganizacionPorId(Long id);
    String guardarOrganizacion(Long idCancion, Long idPlaylist);
    String actualizarOrganizacion(Long id, OrganizacionDto organizacion);
    String eliminarOrganizacion(Long id);


}
