package org.perseflora.usuario.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private long idCliente;

    @Column(length = 50, nullable = false)
    private String nombreCliente;

    @Column(length = 50, nullable = false)
    private String apellido;

    @Column(name = "fecha_nacimiento_cliente", nullable = false, columnDefinition = "DATE")
    private LocalDate fechaNacimiento;

    @Column(length = 30, nullable = false, unique = true)
    private String telefono;

    @Column(length = 70, nullable = false, unique = true)
    private String email;

    @Column(length = 30, nullable = false)
    private String password;

    @Column(length = 120, nullable = false)
    private String domicilio;

    //constructor vacio
    public Cliente() {
    }

    //constructor
    public Cliente(long idCliente, String nombre, String apellido, LocalDate fechaNacimiento, String telefono, String email, String password, String domicilio) {
        this.idCliente = idCliente;
        this.nombreCliente = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.email = email;
        this.password = password;
        this.domicilio = domicilio;
    }

    public long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(long idCliente) {
        this.idCliente = idCliente;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombre) {
        this.nombreCliente = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
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

    public String getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "idCliente=" + idCliente +
                ", nombre='" + nombreCliente + '\'' +
                ", apellido='" + apellido + '\'' +
                ", fechaNacimiento=" + fechaNacimiento +
                ", telefono='" + telefono + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", domicilio='" + domicilio + '\'' +
                '}';
    }


    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Cliente cliente)) return false;
        return idCliente == cliente.idCliente && Objects.equals(nombreCliente, cliente.nombreCliente) && Objects.equals(apellido, cliente.apellido) && Objects.equals(fechaNacimiento, cliente.fechaNacimiento) && Objects.equals(telefono, cliente.telefono) && Objects.equals(email, cliente.email) && Objects.equals(password, cliente.password) && Objects.equals(domicilio, cliente.domicilio);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idCliente, nombreCliente, apellido, fechaNacimiento, telefono, email, password, domicilio);
    }

    //relacion de cliente con pedidos 1:N
    @OneToMany(mappedBy = "cliente")
    private List<Pedidos> pedido;

    //getters y setter de orders

    public List<Pedidos> getPedido() {
        return pedido;
    }

    public void setPedido(List<Pedidos> pedido) {
        this.pedido = pedido;
    }
}