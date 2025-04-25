package org.perseflora.usuario.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;


@Component //Para inyectar la clase en otras
public class JwtUtil {
    //1.Clave secreta para firmar el token(HS-256)
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    // private final SecretKey key = Jwts.SIG.HS256.key().build();
    //2.Agregar un tiempo de expiracion del token(ms)
    private final long expirarionTime = 60*60*1000; //1 hora
    //3.Metodo para generar el token
    //Contiene el asunto,fecga de emision, tiempo de expiracion,como se firma (secretKey)
    public String generateToken(String nombreCliente){
        return Jwts.builder()
                .setSubject(nombreCliente)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirarionTime))
                .signWith(secretKey)
                .compact();
    }
    //5. Metodo que me permite extraer el username a partir del token parseado
    public String extractUsername(String token){
        return parseToken(token).getBody().getSubject();
    }
    //6.Metodo para validar el token (si esta expirado no funcionara) ->boolean
    public boolean isTokenValid(String token){
        try {
            parseToken(token); //Intenta parsear y verificar la firma asi como la fecha de expiracion
            return true;
        }catch (JwtException e){
            return false;

        }
    }

    //4. Metodo para convertir el token , es decir decodificar y verificar su firma
    private Jws<Claims> parseToken(String token){
        return Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);
    }
}
