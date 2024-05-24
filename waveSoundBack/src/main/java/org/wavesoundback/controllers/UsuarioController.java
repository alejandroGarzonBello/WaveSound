package org.wavesoundback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wavesoundback.dto.UsuarioDto;
import org.wavesoundback.entities.Usuario;
import org.wavesoundback.services.impl.UsuarioServiceImpl;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioServiceImpl usuarioService;

    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<UsuarioDto> findByNombre(@PathVariable String nombre) {
        if(usuarioService.findByNombre(nombre) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuarioService.findByNombre(nombre));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UsuarioDto> findByEmail(@PathVariable String email) {
        if(usuarioService.findUsuarioByEmail(email) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuarioService.findUsuarioByEmail(email));
    }

    @PostMapping
    public ResponseEntity<String> saveUsuario(@RequestBody UsuarioDto usuario) {
        if(usuarioService.isUsuarioExist(usuario)) {
            return ResponseEntity.badRequest().body("Ya hay un usuario existente con ese email");
        }
        return ResponseEntity.ok(usuarioService.saveUsuario(usuario));
    }

    @PutMapping("/{email}")
    public ResponseEntity<UsuarioDto> updateUsuario(@RequestBody UsuarioDto usuario, @PathVariable String email) {
        if(usuarioService.updateUsuario(usuario, email) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuarioService.updateUsuario(usuario, email));
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<String> deleteUsuario(@RequestBody UsuarioDto usuario, @PathVariable String email) {
        if(usuarioService.deleteUsuario(usuario, email).equals("Usuario no encontrado")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuarioService.deleteUsuario(usuario, email));
    }

}

