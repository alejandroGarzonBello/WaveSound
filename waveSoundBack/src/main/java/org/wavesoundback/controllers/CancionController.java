package org.wavesoundback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.wavesoundback.dto.CancionDto;
import org.wavesoundback.dto.PlaylistDto;
import org.wavesoundback.entities.Cancion;
import org.wavesoundback.entities.Playlist;
import org.wavesoundback.entities.Usuario;
import org.wavesoundback.services.impl.CancionServiceImpl;
import org.wavesoundback.services.impl.FileUploadServiceImpl;
import org.wavesoundback.services.impl.PlaylistServiceImpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/canciones")
public class CancionController {
    @Autowired
    private CancionServiceImpl cancionService;

    @Autowired
    private PlaylistServiceImpl playlistService;

    @Autowired
    private FileUploadServiceImpl fileUploadService;

    @GetMapping("listar")
    public ResponseEntity<?> getCanciones(){
        return ResponseEntity.ok(cancionService.obtenerCanciones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCancion(@PathVariable Long id){
        if(cancionService.obtenerCancionPorId(id) != null){
            return ResponseEntity.ok(cancionService.obtenerCancionPorId(id));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Canción no encontrada");
    }


    @PostMapping
    public ResponseEntity<?> crearCancion(@RequestBody CancionDto cancion) {
        String result = cancionService.guardarCancion(cancion);
        if(result == null){
            return ResponseEntity.badRequest().body("La canción ya existe");
        }else{
            return ResponseEntity.ok(result);
        }
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<?> getCancionPorUsuario(@PathVariable Long id){
        return ResponseEntity.ok(cancionService.obtenerCancionesPorUsuario(id));
    }

    @GetMapping("/noPlaylist/{id}")
    public ResponseEntity<?> getCancionesNoPlaylist(@PathVariable Long id){
        PlaylistDto playlist = playlistService.findById(id);
        Usuario usuario = playlist.getUsuario();
        ArrayList<CancionDto> canciones = new ArrayList<>(cancionService.obtenerCancionesPorUsuario(usuario.getId()));
        ArrayList<CancionDto> cancionesPlaylist = new ArrayList<>(playlistService.findCancionesByPlaylist(id));
        List<Long> idsCanciones = new ArrayList<>();
        List<Long> idsCancionesPlaylist = new ArrayList<>();
        for (CancionDto cancion : cancionesPlaylist) {
            idsCancionesPlaylist.add(cancion.getId());
        }
        for (CancionDto cancion : canciones) {
            idsCanciones.add(cancion.getId());
        }
        idsCanciones.removeAll(idsCancionesPlaylist);
        // Obtener los objetos CancionDto correspondientes a los IDs restantes
        List<CancionDto> cancionesLista = new ArrayList<>();
        for(Long idCancion : idsCanciones) {
            CancionDto song = cancionService.obtenerCancionPorId(idCancion);
            if(song != null) {
                cancionesLista.add(song);
            }
        }

        return ResponseEntity.ok(cancionesLista);
    }

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,String userId) throws IOException {
        return fileUploadService.uploadCancion(file.getInputStream(),userId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCancion(@PathVariable Long id, @RequestBody CancionDto cancion){
        if(cancionService.actualizarCancion(id, cancion) == null){
            return ResponseEntity.badRequest().body("La canción no existe");
        }else{
            cancionService.actualizarCancion(id, cancion);
            return ResponseEntity.ok("Canción actualizada");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCancion(@PathVariable Long id){
        if(cancionService.eliminarCancion(id) == null){
            return ResponseEntity.badRequest().body("La canción no existe");
        }else{
            cancionService.eliminarCancion(id);
            return ResponseEntity.ok("Canción eliminada");
        }
    }
}

