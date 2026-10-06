package com.knot.service

import com.knot.dto.AuthResponse
import com.knot.dto.LoginRequest
import com.knot.dto.SignupRequest
import com.knot.dto.UserResponse
import com.knot.entity.User
import com.knot.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService
) {
    fun signup(request: SignupRequest): AuthResponse {
        if (userRepository.existsByEmail(request.email)) {
            throw IllegalArgumentException("Email already registered")
        }
        if (userRepository.existsByUsername(request.username)) {
            throw IllegalArgumentException("Username already taken")
        }

        val user = User(
            username = request.username,
            email = request.email,
            password = passwordEncoder.encode(request.password),
            displayName = request.displayName,
            createdAt = LocalDateTime.now(),
            updatedAt = LocalDateTime.now()
        )

        val savedUser = userRepository.save(user)
        val token = jwtService.generateToken(savedUser.id, savedUser.username)

        return AuthResponse(
            token = token,
            user = UserResponse(
                id = savedUser.id,
                username = savedUser.username,
                email = savedUser.email,
                displayName = savedUser.displayName,
                bio = savedUser.bio,
                createdAt = savedUser.createdAt.format(DateTimeFormatter.ISO_DATE_TIME)
            )
        )
    }

    fun login(request: LoginRequest): AuthResponse {
        val user = userRepository.findByEmail(request.email)
            .orElseThrow { IllegalArgumentException("User not found") }

        if (!passwordEncoder.matches(request.password, user.password)) {
            throw IllegalArgumentException("Invalid password")
        }

        val token = jwtService.generateToken(user.id, user.username)

        return AuthResponse(
            token = token,
            user = UserResponse(
                id = user.id,
                username = user.username,
                email = user.email,
                displayName = user.displayName,
                bio = user.bio,
                createdAt = user.createdAt.format(DateTimeFormatter.ISO_DATE_TIME)
            )
        )
    }

    fun getUserById(userId: Long): UserResponse {
        val user = userRepository.findById(userId)
            .orElseThrow { IllegalArgumentException("User not found") }

        return UserResponse(
            id = user.id,
            username = user.username,
            email = user.email,
            displayName = user.displayName,
            bio = user.bio,
            createdAt = user.createdAt.format(DateTimeFormatter.ISO_DATE_TIME)
        )
    }
}
