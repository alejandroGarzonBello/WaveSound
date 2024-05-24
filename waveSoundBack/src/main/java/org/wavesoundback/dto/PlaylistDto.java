package org.wavesoundback.dto;

import org.wavesoundback.entities.Organizacion;
import org.wavesoundback.entities.Usuario;

import java.util.Set;

public class PlaylistDto {

    private Long id;
    private String nombre;
    private String descripcion;
    private String portada;
    private Set<Organizacion> organizacion;
    private Usuario usuario;

    public PlaylistDto(Long id, String nombre, String descripcion, String portada, Set<Organizacion> organizacion,Usuario usuario) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.portada = portada;
        this.organizacion = organizacion;
        this.usuario = usuario;
    }

    public PlaylistDto() {
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getPortada() {
        return portada;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setPortada(String portada) {
        this.portada = portada;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Set<Organizacion> getOrganizacion() {
        return organizacion;
    }

    public void setOrganizacion(Set<Organizacion> organizacion) {
        this.organizacion = organizacion;
    }
}
