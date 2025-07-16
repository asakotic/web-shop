package rs.bosch.web_shop.model.dto;

import lombok.Data;

@Data
public class CartItemRes{
    private String productId;
    private int quantity;
    private double price;
    private String productName;

    public CartItemRes(String productId, int quantity, double price, String productName) {
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.productName = productName;
    }
}
