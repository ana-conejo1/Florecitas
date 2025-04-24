package org.perseflora.usuario.exception;

public class ProductoNotFoundException extends RuntimeException {
  public ProductoNotFoundException(String message) {
    super(message);
  }
}
