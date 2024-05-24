package org.wavesoundback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wavesoundback.dto.CancionDto;
import org.wavesoundback.dto.PlaylistDto;
import org.wavesoundback.services.impl.OrganizacionServiceImpl;
import org.wavesoundback.services.impl.PlaylistServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/playlists")
public class PlaylistController {
    @Autowired
    private PlaylistServiceImpl playlistService;

    @Autowired
    private OrganizacionServiceImpl organizacionService;

    @GetMapping
    public ResponseEntity<List<PlaylistDto>> findAll() {
        return ResponseEntity.ok(playlistService.findAll());
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<PlaylistDto>> findByUsuario(@PathVariable Long id) {
        return ResponseEntity.ok(playlistService.findByUsuario(id));
    }

    @GetMapping("/{id}/canciones")
    public ResponseEntity<List<CancionDto>> findCancionesByPlaylist(@PathVariable Long id) {
        return ResponseEntity.ok(playlistService.findCancionesByPlaylist(id));
    }


    @GetMapping("/{id}")
    public ResponseEntity<PlaylistDto> findById(@PathVariable Long id) {
        if(playlistService.findById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(playlistService.findById(id));
    }

    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<PlaylistDto> findByNombre(@PathVariable String nombre) {
        if(playlistService.findByNombre(nombre) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(playlistService.findByNombre(nombre));
    }

    @PostMapping
    public ResponseEntity<String> save(@RequestBody PlaylistDto playlist) {
        if(playlistService.save(playlist) == null) {
            return ResponseEntity.badRequest().body("Ya hay una playlist existente con ese nombre");
        }
        return ResponseEntity.ok(playlistService.save(playlist));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@RequestBody PlaylistDto playlist, @PathVariable Long id) {
        if(playlistService.update(playlist, id) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(playlistService.update(playlist, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        if(playlistService.delete(id).equals("Playlist no encontrada")) {
            return ResponseEntity.notFound().build();
        }
        organizacionService.eliminarOrganizacionPorPlaylist(id);
        return ResponseEntity.ok(playlistService.delete(id));
    }


}

