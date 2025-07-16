package rs.bosch.web_shop.model.dto;

import lombok.Data;

@Data
public class CartItemReq {
    private String productId;
    private int quantity;
}
