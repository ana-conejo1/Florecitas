package org.perseflora.usuario.repository;

import org.perseflora.usuario.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto,Long> {
    Producto findByNombreProducto(String nombreProducto);

}
