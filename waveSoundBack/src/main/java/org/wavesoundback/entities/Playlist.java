package org.wavesoundback.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;


@Entity
@Table(name = "playlist")
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;
    private String portada;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties(value = "canciones")
    private Usuario usuario;
    @OneToMany(mappedBy = "playlist", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Organizacion> organizacion;

    public Playlist(Long id, String nombre, String portada, String descripcion, Usuario usuario, Set<Organizacion> organizacion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.portada = portada;
        this.usuario = usuario;
        this.organizacion = organizacion;
    }

    public Playlist() {
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

    public Usuario getUsuario() {
        return usuario;
    }

    public Set<Organizacion> getOrganizacion() {
        return organizacion;
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

    public void setPortada(String portada) {
        this.portada = portada;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setOrganizacion(Set<Organizacion> organizacion) {
        this.organizacion = organizacion;
    }


}
