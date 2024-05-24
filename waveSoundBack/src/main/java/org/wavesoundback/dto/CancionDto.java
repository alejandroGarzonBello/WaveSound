package org.wavesoundback.dto;

import org.wavesoundback.entities.Usuario;

public class CancionDto {
    private Long id;
    private String titulo;
    private String artista;
    private String album;
    private String genero;
    private String duracion;
    private String ubicacion;
    private String portada;
    private boolean favorito;
    private Usuario usuario;

    public CancionDto(Long id, String titulo, String artista, String album, String genero, String duracion, String ubicacion, String portada, boolean favorito, Usuario usuario) {
        this.id = id;
        this.titulo = titulo;
        this.artista = artista;
        this.album = album;
        this.genero = genero;
        this.duracion = duracion;
        this.ubicacion = ubicacion;
        this.portada = portada;
        this.favorito = favorito;
        this.usuario = usuario;
    }

    public CancionDto() {
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

    public String getUbicacion() {
        return ubicacion;
    }

    public String getPortada() {
        return portada;
    }
    public boolean getFavorito() {return favorito;}

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

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public void setPortada(String portada) {
        this.portada = portada;
    }

    public void setFavorito(boolean favorito) {this.favorito = favorito;}
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }



}
