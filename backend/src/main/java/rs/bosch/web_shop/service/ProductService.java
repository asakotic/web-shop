package rs.bosch.web_shop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import rs.bosch.web_shop.model.Product;
import rs.bosch.web_shop.repository.ProductRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Page<Product> getProducts(String search, int page, int size, String[] sort) {
        Sort.Direction direction = sort[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(new Sort.Order(direction, sort[0])));

        if (search != null && !search.isBlank()) {
            return productRepository.findByNameContainingIgnoreCase(search, pageable);
        } else {
            return productRepository.findAll(pageable);
        }
    }
}
