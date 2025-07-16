package rs.bosch.web_shop.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.bosch.web_shop.configuration.JwtUtil;
import rs.bosch.web_shop.model.CartItem;
import rs.bosch.web_shop.model.Product;
import rs.bosch.web_shop.model.User;
import rs.bosch.web_shop.model.dto.CartItemReq;
import rs.bosch.web_shop.model.dto.CartItemRes;
import rs.bosch.web_shop.model.dto.UpdateQuantityReq;
import rs.bosch.web_shop.repository.CartRepository;
import rs.bosch.web_shop.repository.ProductRepository;
import rs.bosch.web_shop.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

        CartItem item = cartItemRepository.findByUserIdAndProductId(user, product.getId())
                .map(existing -> {
                    existing.setQuantity(existing.getQuantity() + request.getQuantity());
                    return existing;
                })
                .orElse(new CartItem(null, user, product, request.getQuantity()));

        cartItemRepository.save(item);
    }

    public List<CartItemRes> getCart(String auth) {
        Long userId = jwtUtil.extractUserId(auth);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<CartItem> cartItemList =  cartItemRepository.findByUserId(user);
        List<CartItemRes> cartItemReqList = new ArrayList<>();
        for (CartItem cartItem : cartItemList) {
            CartItemRes cartItemRes = new CartItemRes(
                            String.valueOf(cartItem.getProduct().getId()),
                            cartItem.getQuantity(),
                            cartItem.getProduct().getPrice(),
                            cartItem.getProduct().getName()
                            );
            cartItemReqList.add(cartItemRes);
        }
        return cartItemReqList;
    }

    public void updateItemQuantity(String auth, Long itemId, UpdateQuantityReq request) {
        Long userId = jwtUtil.extractUserId(auth);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Optional<CartItem> item = cartItemRepository.findByUserIdAndProductId(user, itemId);
        if (item.isEmpty()) {
            throw new RuntimeException("Item not found");
        }
        CartItem cartItem = item.get();
        cartItem.setQuantity(request.getQuantity());
        cartItemRepository.save(cartItem);
        if (cartItem.getQuantity() <  0)
            cartItemRepository.delete(cartItem);
    }

    @Transactional
    public void removeItem(String auth, Long itemId) {
        Long userId = jwtUtil.extractUserId(auth);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(String.valueOf(itemId)).orElseThrow(() -> new RuntimeException("Product not found"));

        int deletedCount = cartItemRepository.deleteByUserIdAndProduct(user, product);

        if (deletedCount == 0) {
            throw new RuntimeException("Item not found in user's cart");
        }
    }
}

