package org.perseflora.usuario.exception;

public class ProductoNotFoundException extends RuntimeException {
    public ProductoNotFoundException(Long idProducto) {
        super("Producto with id: " + idProducto + " not found");
    }
}
