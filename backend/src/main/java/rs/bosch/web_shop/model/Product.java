package rs.bosch.web_shop.model;

import jakarta.persistence.*;
import lombok.Data;
import rs.bosch.web_shop.configuration.MapConverter;

import java.util.List;
import java.util.Map;

@Entity
@Data
@Table(name = "products")
public class Product {
    @Id
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private double price;

    @Column(length = 500)
    private String shortDescription;

    @Column(length = 2000)
    private String fullDescription;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> images;

    @Convert(converter = MapConverter.class)
    private Map<String, String> technicalSpecifications;
}
