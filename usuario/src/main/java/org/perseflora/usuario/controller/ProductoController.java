package org.perseflora.usuario.controller;

import org.perseflora.usuario.exception.ProductoNotFoundException;
import org.perseflora.usuario.model.Producto;
import org.perseflora.usuario.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/perseflora/producto")
public class ProductoController {
    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public List<Producto> getAll(){
        return productoService.getProductos();
    }

    @PostMapping
    public ResponseEntity<Producto> CreateProducto(@RequestBody Producto newProducto){
        if (productoService.findByNombreProducto(newProducto.getNombreProducto()) !=null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(productoService.createProducto(newProducto));
    }

    @GetMapping("{idProducto}")
    public ResponseEntity<Producto> getById(@PathVariable Long idProducto){
        try {
            return ResponseEntity.ok(productoService.findById(idProducto));
        }catch (ProductoNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete-producto/{idProducto}")
    public ResponseEntity<Producto> deleteProducto(@PathVariable Long idProducto){
        try {
            productoService.deleteProducto(idProducto);
            return ResponseEntity.noContent().build();
        }catch (ProductoNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update-producto/{idProducto}")
    public ResponseEntity<Producto> updateProducto(@RequestBody Producto producto, @PathVariable Long idProducto){
        try {
            return ResponseEntity.ok(productoService.updateProducto(producto, idProducto));
        }catch (ProductoNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

}