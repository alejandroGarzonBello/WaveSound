package org.wavesoundback.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.wavesoundback.dto.CredentialsDto;
import org.wavesoundback.dto.SignUpDto;
import org.wavesoundback.dto.UsuarioDto;
import org.wavesoundback.entities.Usuario;
import org.wavesoundback.mappers.UsuarioMapper;
import org.wavesoundback.repositories.UsuarioRepository;
import org.wavesoundback.services.UsuarioService;

import java.nio.CharBuffer;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioMapper usuarioMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UsuarioDto findById(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        if (usuario != null) {
            return usuarioMapper.usuarioToDto(usuario);
        }
        return null;
    }

    @Override
    public UsuarioDto findByNombre(String username) {
        Usuario usuario = usuarioRepository.findByNombre(username);
        if (usuario != null) {
            return usuarioMapper.usuarioToDto(usuario);
        }
        return null;
    }

    @Override
    public UsuarioDto findUsuarioByEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        if (usuario != null) {
            return usuarioMapper.usuarioToDto(usuario);
        }
        return null;
    }

    @Override
    public String saveUsuario(UsuarioDto usuario) {
        if(!usuarioRepository.existsByEmail(usuario.getEmail())){
            usuarioRepository.save(usuarioMapper.usuarioToEntity(usuario));
            return "Usuario guardado";
        }
        return null;
    }

    @Override
    public UsuarioDto updateUsuario(UsuarioDto usuario, String email) {
        if(usuarioRepository.existsByEmail(email)){
            return usuarioMapper.usuarioToDto(usuarioRepository.save(usuarioMapper.usuarioToEntity(usuario)));
        }
        return null;
    }

    @Override
    public String deleteUsuario(UsuarioDto usuario,String email) {
        if(usuarioRepository.existsByEmail(email)){
            usuarioRepository.delete(usuarioMapper.usuarioToEntity(usuario));
            return "Usuario eliminado";
        }
        return "Usuario no encontrado";
    }

    @Override
    public boolean isUsuarioExist(UsuarioDto usuario) {
        return usuarioRepository.existsByEmail(usuario.getEmail());
    }

    @Override
    public UsuarioDto login(CredentialsDto credentialsDto) {
        Usuario usuario = usuarioRepository.findByEmail(credentialsDto.email()).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if(passwordEncoder.matches(credentialsDto.password(),usuario.getPswd())){
            return usuarioMapper.usuarioToDto(usuario);
        }
        throw new RuntimeException("Contraseña incorrecta");
    }

    @Override
    public UsuarioDto register(SignUpDto userDto) {
        Optional<Usuario> optionalUser = usuarioRepository.findByEmail(userDto.email());
        if (optionalUser.isPresent()) {
            throw new RuntimeException("Email ya existente");
        }
        Usuario user = usuarioMapper.signUpToUsuario(userDto);
        System.out.println(userDto.password());
        user.setPswd(passwordEncoder.encode(userDto.password()));
        System.out.println(user.getPswd());
        Usuario savedUser = usuarioRepository.save(user);

        return usuarioMapper.usuarioToDto(savedUser);
    }
}

