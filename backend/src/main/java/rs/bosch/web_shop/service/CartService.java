package rs.bosch.web_shop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.bosch.web_shop.configuration.JwtUtil;
import rs.bosch.web_shop.model.CartItem;
import rs.bosch.web_shop.model.Product;
import rs.bosch.web_shop.model.User;
import rs.bosch.web_shop.model.dto.CartItemReq;
import rs.bosch.web_shop.model.dto.UpdateQuantityReq;
import rs.bosch.web_shop.repository.CartRepository;
import rs.bosch.web_shop.repository.ProductRepository;
import rs.bosch.web_shop.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public void addItem(String auth, CartItemReq request) {
        Long userId = jwtUtil.extractUserId(auth);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        CartItem item = cartItemRepository.findByUserIdAndProductId(user, product)
                .map(existing -> {
                    existing.setQuantity(existing.getQuantity() + request.getQuantity());
                    return existing;
                })
                .orElse(new CartItem(null, user, product, request.getQuantity()));

        cartItemRepository.save(item);
    }

    public List<CartItem> getCart(String auth) {
        Long userId = jwtUtil.extractUserId(auth);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return cartItemRepository.findByUserId(user);
    }

    public void updateItemQuantity(String auth, Long itemId, UpdateQuantityReq request) {
        Long userId = jwtUtil.extractUserId(auth);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        CartItem item = cartItemRepository.findById(itemId)
                .filter(ci -> ci.getUserId().getId().equals(userId))
                .orElseThrow(() -> new RuntimeException("Cart item not found or not yours"));

        item.setQuantity(request.getQuantity());
        cartItemRepository.save(item);
    }

    public void removeItem(String auth, Long itemId) {
        Long userId = jwtUtil.extractUserId(auth);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        cartItemRepository.deleteByUserIdAndId(user, itemId);
    }
}

