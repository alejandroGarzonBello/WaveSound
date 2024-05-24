package org.wavesoundback.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.wavesoundback.dto.UsuarioDto;
import org.wavesoundback.services.UsuarioService;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@Component
public class UserAuthProvider {
    @Value("$security.jwt.token.secret-key:secret-key")
    private String secretKey;

    @Autowired
    private UsuarioService usuarioService;

    @PostConstruct
    protected void init(){
        secretKey= Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(UsuarioDto usuario){
        Date now = new Date();
        Date validity = new Date(now.getTime()+3600000);
        return JWT.create()
                .withIssuer(usuario.getEmail())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withSubject(usuario.getEmail())
                .withClaim("nombre", usuario.getNombre())
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token){
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decoded =  verifier.verify(token);
        new UsuarioDto();
        UsuarioDto usuario = UsuarioDto.builder()
                .nombre(decoded.getClaim("nombre").asString())
                .email(decoded.getSubject())
                .build();
        return new UsernamePasswordAuthenticationToken(usuario,null, Collections.emptyList());
    }

    public Authentication validateTokenStrongly(String token){
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm)
                .build();
        DecodedJWT decoded = verifier.verify(token);
        UsuarioDto user = usuarioService.findUsuarioByEmail(decoded.getSubject());
        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }
}