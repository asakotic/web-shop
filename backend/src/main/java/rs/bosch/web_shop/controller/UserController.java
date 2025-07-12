package rs.bosch.web_shop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.bosch.web_shop.model.User;
import rs.bosch.web_shop.model.dto.AuthResponse;
import rs.bosch.web_shop.model.dto.UserDto;
import rs.bosch.web_shop.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserDto user) {
        User createdUser = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody UserDto userDto) {
        AuthResponse response = userService.authenticate(userDto);
        return ResponseEntity.ok(response);
    }
}
