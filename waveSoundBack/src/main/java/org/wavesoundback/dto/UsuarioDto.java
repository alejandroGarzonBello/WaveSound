package org.wavesoundback.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.wavesoundback.entities.Cancion;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class UsuarioDto {
    private Long id;
    private String nombre;
    private String email;
    private String password;
    private String token;
    private List<Cancion> canciones;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Cancion> getCanciones() {
        return canciones;
    }

    public void setCanciones(List<Cancion> canciones) {
        this.canciones = canciones;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String nombre;
        private String email;
        private String password;
        private String token;
        private List<Cancion> canciones;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder nombre(String nombre) {
            this.nombre = nombre;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder password(String password) {
            this.password = password;
            return this;
        }

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public Builder canciones(List<Cancion> canciones) {
            this.canciones = canciones;
            return this;
        }

        public UsuarioDto build() {
            UsuarioDto usuarioDto = new UsuarioDto();
            usuarioDto.id = this.id;
            usuarioDto.nombre = this.nombre;
            usuarioDto.email = this.email;
            usuarioDto.password = this.password;
            usuarioDto.token = this.token;
            usuarioDto.canciones = this.canciones;
            return usuarioDto;
        }
    }
}
