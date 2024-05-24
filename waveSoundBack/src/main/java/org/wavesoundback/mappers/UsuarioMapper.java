package org.wavesoundback.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.wavesoundback.dto.SignUpDto;
import org.wavesoundback.dto.UsuarioDto;
import org.wavesoundback.entities.Usuario;

@Mapper(componentModel="spring")
public interface UsuarioMapper {
    @Mapping(source = "pswd", target = "password")
    UsuarioDto usuarioToDto (Usuario usuario);
    Usuario signUpToUsuario(SignUpDto signUpDto);
    @Mapping(source = "password", target = "pswd")
    Usuario usuarioToEntity (UsuarioDto usuarioDto);
}
