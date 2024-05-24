package org.wavesoundback.services;

import org.wavesoundback.dto.CredentialsDto;
import org.wavesoundback.dto.SignUpDto;
import org.wavesoundback.dto.UsuarioDto;

public interface UsuarioService {
    UsuarioDto findById(Long id);

    UsuarioDto findByNombre(String username);
    UsuarioDto findUsuarioByEmail(String email);
    String saveUsuario(UsuarioDto usuario);
    UsuarioDto updateUsuario(UsuarioDto usuario,String email);
    String deleteUsuario(UsuarioDto usuario,String email);
    boolean isUsuarioExist(UsuarioDto usuario);
    UsuarioDto login(CredentialsDto credentialsDto);

    UsuarioDto register(SignUpDto signUpDto);
}
