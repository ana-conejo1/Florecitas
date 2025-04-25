package org.perseflora.usuario.service;

import org.perseflora.usuario.exception.ProductoNotFoundException;
import org.perseflora.usuario.model.Producto;
import org.perseflora.usuario.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {
    private final ProductoRepository productoRepository;

    @Autowired
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }
    public List<Producto> getProductos() {
        return productoRepository.findAll();
    }

    // Método para crear un nuevo producto
    public Producto createProducto(Producto newProducto) {
        return productoRepository.save(newProducto);
    }

    public Producto findByNombreProducto(String nombreProducto){
        return productoRepository.findByNombreProducto(nombreProducto);
    }

    // Método para recuperar un producto por su ID
    public Producto findById(Long idProducto) {
        return productoRepository.findById(idProducto)
                .orElseThrow(()-> new ProductoNotFoundException(idProducto));
    }

    public void deleteProducto(Long idProducto) {
        if (productoRepository.existsById(idProducto)) {
            productoRepository.deleteById(idProducto);
        } else {
            throw new ProductoNotFoundException(idProducto);
        }
    }

    public Producto updateProducto (Producto producto, Long idProducto){
        return productoRepository.findById(idProducto)
                .map(productoMap ->{
                    productoMap.setNombreProducto(producto.getNombreProducto());
                    productoMap.setNombreCientifico(producto.getNombreCientifico());
                    productoMap.setPrecio(producto.getPrecio());
                    productoMap.setUnidadesInventario(producto.getUnidadesInventario());
                    productoMap.setCategoria(producto.getCategoria());
                    return productoRepository.save(productoMap);
                })
                .orElseThrow(()->new ProductoNotFoundException (idProducto));
    }

}
