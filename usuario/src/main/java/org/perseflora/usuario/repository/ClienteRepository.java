package org.perseflora.usuario.repository;

import org.perseflora.usuario.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// -- Metodos abstractos de JpaRepository
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Metodos para manipular cierta informacion (JPQL)
    Cliente findByEmail(String email); //metodo que expone
}
