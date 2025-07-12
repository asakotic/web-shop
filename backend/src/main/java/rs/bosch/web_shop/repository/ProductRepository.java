package rs.bosch.web_shop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.bosch.web_shop.model.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

}
