package org.wavesoundback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.wavesoundback.config.UserAuthProvider;
import org.wavesoundback.dto.CredentialsDto;
import org.wavesoundback.dto.SignUpDto;
import org.wavesoundback.dto.UsuarioDto;
import org.wavesoundback.services.UsuarioService;

import java.net.URI;

@RestController
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UserAuthProvider userAuth;
    @PostMapping("/login")
    public ResponseEntity<UsuarioDto> login(@RequestBody CredentialsDto credentials) {
        UsuarioDto usuario = usuarioService.login(credentials);
        usuario.setToken(userAuth.createToken(usuario));
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/register")
    public ResponseEntity<UsuarioDto> register(@RequestBody SignUpDto user) {
        UsuarioDto createdUser = usuarioService.register(user);

        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }
}
