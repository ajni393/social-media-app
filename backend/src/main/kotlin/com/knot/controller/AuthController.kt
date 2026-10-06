package com.knot.controller

import com.knot.dto.AuthResponse
import com.knot.dto.LoginRequest
import com.knot.dto.SignupRequest
import com.knot.dto.UserResponse
import com.knot.service.AuthService
import com.knot.service.JwtService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService,
    private val jwtService: JwtService
) {
    @PostMapping("/signup")
    fun signup(@Valid @RequestBody request: SignupRequest): ResponseEntity<AuthResponse> {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(authService.signup(request))
    }

    @PostMapping("/login")
    fun login(@Valid @RequestBody request: LoginRequest): ResponseEntity<AuthResponse> {
        return ResponseEntity.ok(authService.login(request))
    }

    @GetMapping("/me")
    fun getCurrentUser(@RequestHeader("Authorization") authHeader: String): ResponseEntity<UserResponse> {
        val token = authHeader.replace("Bearer ", "")
        if (!jwtService.isValid(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
        val userId = jwtService.extractUserId(token)
        return ResponseEntity.ok(authService.getUserById(userId))
    }

    @ExceptionHandler(IllegalArgumentException::class)
    fun handleIllegalArgument(e: IllegalArgumentException): ResponseEntity<Map<String, String>> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(mapOf("error" to (e.message ?: "Invalid request")))
    }
}
