package org.perseflora.usuario.service;


import org.perseflora.usuario.exception.ClienteNotFoundException;
import org.perseflora.usuario.model.Cliente;
import org.perseflora.usuario.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {
    // -- Crear variable ClienteRepository
    private final ClienteRepository clienteRepository;

    // -- Inyectar la variable en el constructor
    // Para facilitar la inyección de dependencias agrego @autowired7
    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {

        this.clienteRepository = clienteRepository;
    }

    // Metodo para obtener todas las instancias de User
    public List<Cliente> getClientes() {

        return clienteRepository.findAll();
    }

    // Metodo para crear un nuevo usuario  http://localhost:8080/api/perseflora/cliente
    public Cliente createCliente(Cliente newCliente) {
        return clienteRepository.save(newCliente);
    }

    // Metodo para recuperar un usuario por email http://localhost:8080/api/perseflora/users/email/{email}
    public Cliente findByEmail(String email) {
        return clienteRepository.findByEmail(email);
    }

    // Manejar el metodo con la clase Entity y una excepcion
    public Cliente findById(Long idCliente) {
        return clienteRepository.findById(idCliente)
                .orElseThrow(() -> new ClienteNotFoundException(idCliente));
    }

    //Metodo para eliminar un Usuario
    public void deleteCliente (Long idCliente){
        if(clienteRepository.existsById(idCliente)){
            clienteRepository.deleteById(idCliente);
        }else{
            throw new ClienteNotFoundException(idCliente);
        }
    }

    //Metodo para actualizar nuestro User (findById, save)
    //PUT -> Actualizar todos los atributos   http://localhost:8080/api/perseflora/users/update-cliente/2

    public  Cliente updateCliente(Cliente cliente, Long idCliente){
        return clienteRepository.findById(idCliente)
                .map(clienteMap -> {
                    clienteMap.setNombreCliente(cliente.getNombreCliente());
                    clienteMap.setApellido(cliente.getApellido());
                    clienteMap.setEmail(cliente.getEmail());
                    clienteMap.setPassword(cliente.getPassword());
                    clienteMap.setFechaNacimiento(cliente.getFechaNacimiento());
                    clienteMap.setDomicilio(cliente.getDomicilio());
                    clienteMap.setTelefono(cliente.getTelefono());
                    return clienteRepository.save(clienteMap);
                })
                .orElseThrow(()-> new ClienteNotFoundException(idCliente));


    }



}