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

    @Column(length = 50,nullable = false,unique = true)
    private String nombreCientifico;

    @Column(length = 20, nullable = false)
    private String tamano;

    @Column(nullable = false)
    private int peso;

    @Column(name = "unidades_inventario", nullable = false)
    private int unidadesInventario;

    @Column(nullable = false)
    private double precio;

    @Column(length = 20, nullable = false)
    private String luz;

    @Column(length = 20, nullable = false)
    private String temperatura;

    @Column(length = 20, nullable = false)
    private String riego;

    @Column(name = "detalles_riego", length = 200)
    private String detallesRiego;

    @Column(length = 255)
    private String imagen;

    @Column(length = 10)
    private String toxicidad;

    @Column(length = 500)
    private String info;

    @Column(length = 50, nullable = false)
    private String categoria;

    // Constructor vacío
    public Producto() {
    }

    public Producto(Long idProducto, String nombreProducto, String nombreCientifico, String tamano, int peso, int unidadesInventario, double precio, String luz, String temperatura, String riego, String detallesRiego, String imagen, String toxicidad, String info, String categoria) {
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.nombreCientifico = nombreCientifico;
        this.tamano = tamano;
        this.peso = peso;
        this.unidadesInventario = unidadesInventario;
        this.precio = precio;
        this.luz = luz;
        this.temperatura = temperatura;
        this.riego = riego;
        this.detallesRiego = detallesRiego;
        this.imagen = imagen;
        this.toxicidad = toxicidad;
        this.info = info;
        this.categoria = categoria;
    }

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

    public String getNombreCientifico() {
        return nombreCientifico;
    }

    public void setNombreCientifico(String nombreCientifico) {
        this.nombreCientifico = nombreCientifico;
    }

    public String getTamano() {
        return tamano;
    }

    public void setTamano(String tamano) {
        this.tamano = tamano;
    }

    public int getPeso() {
        return peso;
    }

    public void setPeso(int peso) {
        this.peso = peso;
    }

    public int getUnidadesInventario() {
        return unidadesInventario;
    }

    public void setUnidadesInventario(int unidadesInventario) {
        this.unidadesInventario = unidadesInventario;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getLuz() {
        return luz;
    }

    public void setLuz(String luz) {
        this.luz = luz;
    }

    public String getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(String temperatura) {
        this.temperatura = temperatura;
    }

    public String getRiego() {
        return riego;
    }

    public void setRiego(String riego) {
        this.riego = riego;
    }

    public String getDetallesRiego() {
        return detallesRiego;
    }

    public void setDetallesRiego(String detallesRiego) {
        this.detallesRiego = detallesRiego;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getToxicidad() {
        return toxicidad;
    }

    public void setToxicidad(String toxicidad) {
        this.toxicidad = toxicidad;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    @Override
    public String toString() {
        return "Producto{" +
                "id='" + idProducto + '\'' +
                ", nombreComun='" + nombreProducto + '\'' +
                ", nombreCientifico='" + nombreCientifico + '\'' +
                ", tamano='" + tamano + '\'' +
                ", peso=" + peso +
                ", unidadesInventario=" + unidadesInventario +
                ", precio=" + precio +
                ", luz='" + luz + '\'' +
                ", temperatura='" + temperatura + '\'' +
                ", riego='" + riego + '\'' +
                ", detallesRiego='" + detallesRiego + '\'' +
                ", imagen='" + imagen + '\'' +
                ", toxicidad='" + toxicidad + '\'' +
                ", info='" + info + '\'' +
                ", category='" + categoria + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Producto producto)) return false;
        return unidadesInventario == producto.unidadesInventario && Objects.equals(idProducto, producto.idProducto) && Objects.equals(nombreProducto, producto.nombreProducto) && Objects.equals(nombreCientifico, producto.nombreCientifico) && Objects.equals(precio, producto.precio) && Objects.equals(categoria, producto.categoria);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idProducto, nombreProducto, nombreCientifico,unidadesInventario, precio, categoria);
    }
}
