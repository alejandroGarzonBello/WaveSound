package org.wavesoundback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wavesoundback.dto.OrganizacionDto;
import org.wavesoundback.services.impl.OrganizacionServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/organizaciones")
public class OrganizacionController {
    @Autowired
    private OrganizacionServiceImpl organizacionService;

    @GetMapping
    public ResponseEntity<List<OrganizacionDto>> findAll() {
        return ResponseEntity.ok(organizacionService.obtenerOrganizaciones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrganizacionDto> findById(@PathVariable Long id) {
        if(organizacionService.obtenerOrganizacionPorId(id) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(organizacionService.obtenerOrganizacionPorId(id));
    }

    @PostMapping("/{idCancion}/{idPlaylist}")
    public ResponseEntity<String> save(@PathVariable Long idCancion, @PathVariable Long idPlaylist) {
        String result = organizacionService.guardarOrganizacion(idCancion, idPlaylist);
        if(result == null){
            return ResponseEntity.badRequest().body("La canción ya existe");
        }else{
            return ResponseEntity.ok(result);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@RequestBody OrganizacionDto organizacion, @PathVariable Long id) {
        if(organizacionService.actualizarOrganizacion(id, organizacion) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(organizacionService.actualizarOrganizacion(id, organizacion));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        if(organizacionService.eliminarOrganizacion(id).equals("Organizacion no encontrada")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(organizacionService.eliminarOrganizacion(id));
    }


}

