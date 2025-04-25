package org.perseflora.usuario.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "Pedidos")
public class Pedidos {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id_pedidos")
        private Long idPedidos;

        @Column(name = "cantidad_productos", nullable = false)
        private Integer cantidadProductos;

        @Column(name = "fecha_pedido", nullable = false, columnDefinition = "DATETIME")
        private LocalDateTime fechaPedido;

        @Column(name = "total_pedido", nullable = false, columnDefinition = "Decimal(7,2)")
        private Double totalPedido;

        @Column(name = "descuento", nullable = false, columnDefinition = "Decimal(7,2)")
        private Double descuento;

    public Long getIdPedidos() {
        return idPedidos;
    }

    public void setIdPedidos(Long idPedidos) {
        this.idPedidos = idPedidos;
    }

    public Integer getCantidadProductos() {
        return cantidadProductos;
    }

    public void setCantidadProductos(Integer cantidadProductos) {
        this.cantidadProductos = cantidadProductos;
    }

    public LocalDateTime getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(LocalDateTime fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public Double getTotalPedido() {
        return totalPedido;
    }

    public void setTotalPedido(Double totalPedido) {
        this.totalPedido = totalPedido;
    }

    public Double getDescuento() {
        return descuento;
    }

    public void setDescuento(Double descuento) {
        this.descuento = descuento;
    }

    @Override
    public String toString() {
        return "Pedidos{" +
                "idPedidos=" + idPedidos +
                ", cantidadProductos=" + cantidadProductos +
                ", fechaPedido=" + fechaPedido +
                ", totalPedido=" + totalPedido +
                ", descuento=" + descuento +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Pedidos pedidos)) return false;
        return Objects.equals(idPedidos, pedidos.idPedidos) && Objects.equals(cantidadProductos, pedidos.cantidadProductos) && Objects.equals(fechaPedido, pedidos.fechaPedido) && Objects.equals(totalPedido, pedidos.totalPedido) && Objects.equals(descuento, pedidos.descuento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idPedidos, cantidadProductos, fechaPedido, totalPedido, descuento);
    }

    //Relacion de order conUser N:1
    @ManyToOne
    @JoinColumn(name = "cliente_id_cliente")
    private Cliente cliente;

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
