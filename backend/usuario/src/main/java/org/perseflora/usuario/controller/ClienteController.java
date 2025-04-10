package org.perseflora.usuario.controller;


import org.perseflora.usuario.exception.ClienteNotFoundException;
import org.perseflora.usuario.model.Cliente;
import org.perseflora.usuario.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/perseflora/cliente")
public class ClienteController {
    private final ClienteService clienteService;

    @Autowired
    public ClienteController(ClienteService clienteService) {

        this.clienteService = clienteService;
    }

    // Mapear el metodo de ClienteService getClientes()
    @GetMapping
    public List<Cliente> getAll() {
        return clienteService.getClientes();
    }

    // Mapear el metodo createUser()
    // -- Postman
    /*
    @PostMapping
    public User createUser(@RequestBody User newUser) { // requesbody jala los valores del input
        return userService.createUser(newUser);
    }
     */
    @PostMapping
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente newCliente)
    {
        if(clienteService.findByEmail(newCliente.getEmail()) != null){
            return new ResponseEntity<>(HttpStatus.CONFLICT); //409
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.createCliente(newCliente));
    }

    // Metodo para obtener usuario por Id (404 NotFound y 200 OK)
    @GetMapping("{idCliente}") // Anotacion getmapping con El path es variable
    public ResponseEntity<Cliente> getById(@PathVariable Long idCliente) { //firma del metodo
        try { // bloque try- catch
            return ResponseEntity.ok(clienteService.findById(idCliente));
        } catch (ClienteNotFoundException e) { // e por excepción
            return ResponseEntity.notFound().build();  // patrones de diseño
        }
    }

    //Metodo para elminar usuario por Id. Status 204 y 484
    @DeleteMapping("/delete-cliente/{idCliente}")
    public  ResponseEntity<Cliente> deleteCliente (@PathVariable Long idCliente) {
        try {
            clienteService.deleteCliente(idCliente);
            return ResponseEntity.noContent().build();
        }catch (ClienteNotFoundException e){
            return  ResponseEntity.notFound().build();
        }
    }

    @PutMapping("update-cliente/{idCliente}")
    //Metodo para updateCliente
    public ResponseEntity<Cliente> updateCliente(@RequestBody Cliente cliente, @PathVariable Long idCliente){
        try{
            return ResponseEntity.ok(clienteService.updateCliente(cliente, idCliente));
        }catch (ClienteNotFoundException e){
            return ResponseEntity.notFound().build();
        }

    }



}