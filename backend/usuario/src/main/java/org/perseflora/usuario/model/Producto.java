package org.perseflora.usuario.model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Long idProducto;

    @Column(length = 50,nullable = false,unique = true)
    private String nombreProducto;

    @Column(nullable = false )
    private Double precio;

    @Column(length = 70, nullable = false )
    private String categoria;

    //Getters and Setters

    public Long getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }


    //ToString

    @Override
    public String toString() {
        return "Producto{" +
                "idProducto=" + idProducto +
                ", nombreProducto='" + nombreProducto + '\'' +
                ", precio=" + precio +
                ", categoria='" + categoria + '\'' +
                '}';
    }


    //HasCode and Equals


    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Producto producto)) return false;
        return Objects.equals(idProducto, producto.idProducto) && Objects.equals(nombreProducto, producto.nombreProducto) && Objects.equals(precio, producto.precio) && Objects.equals(categoria, producto.categoria);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idProducto, nombreProducto, precio, categoria);
    }
}
