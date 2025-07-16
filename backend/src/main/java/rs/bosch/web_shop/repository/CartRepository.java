package rs.bosch.web_shop.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import rs.bosch.web_shop.model.CartItem;
import rs.bosch.web_shop.model.Product;
import rs.bosch.web_shop.model.User;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUserId(User userId);

    Optional<CartItem> findByUserIdAndProductId(User userId, Long productId);

    @Transactional
    @Modifying
    int deleteByUserIdAndProduct(User userId, Product product);
}

