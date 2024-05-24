package org.wavesoundback.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "cancion")
public class Cancion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    private String titulo;
    private String artista;
    private String album;
    private String genero;
    private String duracion;
    private String ubicacion;
    private String portada;

    private boolean favorito;
    @ManyToOne(targetEntity = Usuario.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnoreProperties("canciones")
    private Usuario usuario;

    @OneToMany(mappedBy = "cancion", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Organizacion> organizacion;

    public Cancion(Long id, String titulo, String artista, String album, String genero, String duracion, String ubicacion, String portada, boolean favorito, Usuario usuario, List<Organizacion> organizacion) {
        this.id = id;
        this.titulo = titulo;
        this.artista = artista;
        this.album = album;
        this.genero = genero;
        this.duracion = duracion;
        this.ubicacion = ubicacion;
        this.portada = portada;
        this.usuario = usuario;
        this.favorito = favorito;
        this.organizacion = organizacion;
    }

    public Cancion() {
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getArtista() {
        return artista;
    }

    public String getAlbum() {
        return album;
    }

    public String getGenero() {
        return genero;
    }

    public String getDuracion() {
        return duracion;
    }

    public String getubicacion() {
        return ubicacion;
    }

    public String getPortada() {
        return portada;
    }

    public boolean isFavorito() {
        return favorito;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setArtista(String artista) {
        this.artista = artista;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public void setDuracion(String duracion) {
        this.duracion = duracion;
    }

    public void setubicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public void setPortada(String portada) {
        this.portada = portada;
    }

    public void setFavorito(boolean favorito) {
        this.favorito = favorito;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<Organizacion> getOrganizacion() {
        return organizacion;
    }

    public void setOrganizacion(List<Organizacion> organizacion) {
        this.organizacion = organizacion;
    }
}
