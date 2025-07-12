package rs.bosch.web_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.bosch.web_shop.model.CartItem;
import rs.bosch.web_shop.model.Product;
import rs.bosch.web_shop.model.User;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUserId(User userId);

    Optional<CartItem> findByUserIdAndProductId(User userId, Product productId);

    void deleteByUserIdAndId(User userId, Long itemId);
}

