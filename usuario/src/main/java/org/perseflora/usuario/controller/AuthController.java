package org.perseflora.usuario.controller;

import org.perseflora.usuario.security.JwtUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }
    @PostMapping("/login")
    public String login(@RequestParam String nombreCliente){
        return jwtUtil.generateToken(nombreCliente);
    }

}
