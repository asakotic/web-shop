package rs.bosch.web_shop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.bosch.web_shop.model.dto.CartItemReq;
import rs.bosch.web_shop.model.dto.UpdateQuantityReq;
import rs.bosch.web_shop.service.CartService;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addItemToCart(@RequestBody CartItemReq request, @RequestHeader("Authorization") String authHeader) {
        cartService.addItem(authHeader, request);
        return ResponseEntity.ok("Item added to cart.");
    }

    @GetMapping
    public ResponseEntity<?> getCartContents(@RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(cartService.getCart(authHeader));
    }

    @PutMapping("/item/{id}")
    public ResponseEntity<?> updateItemQuantity(@PathVariable Long id, @RequestBody UpdateQuantityReq request, @RequestHeader("Authorization") String authHeader) {
        cartService.updateItemQuantity(authHeader, id, request);
        return ResponseEntity.ok("Quantity updated.");
    }

    @DeleteMapping("/item/{id}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) {
        cartService.removeItem(authHeader, id);
        return ResponseEntity.ok("Item removed from cart.");
    }
}

