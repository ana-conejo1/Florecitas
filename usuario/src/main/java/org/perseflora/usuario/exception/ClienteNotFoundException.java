package org.perseflora.usuario.exception;

public class ClienteNotFoundException extends RuntimeException {
    public ClienteNotFoundException(Long idCliente) {
        super("User with id: " + idCliente + " not found");
    }
}
