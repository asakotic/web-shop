package rs.bosch.web_shop.configuration;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import rs.bosch.web_shop.model.Product;
import rs.bosch.web_shop.repository.ProductRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ReadInitData implements CommandLineRunner {
    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper;

    @Override
    public void run(String... args) {
        try {
            if (productRepository.count() == 0) {
                List<Product> products = objectMapper.readValue(
                        new ClassPathResource("products.json").getFile(),
                        new TypeReference<>() {}
                );
                productRepository.saveAll(products);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
