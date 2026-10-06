package com.knot.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class SignupRequest(
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 30)
    val username: String,

    @NotBlank(message = "Email is required")
    @Email
    val email: String,

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 100)
    val password: String,

    @NotBlank(message = "Display name is required")
    @Size(min = 2, max = 100)
    val displayName: String
)

data class LoginRequest(
    @NotBlank(message = "Email is required")
    @Email
    val email: String,

    @NotBlank(message = "Password is required")
    val password: String
)

data class AuthResponse(
    val token: String,
    val user: UserResponse
)

data class UserResponse(
    val id: Long,
    val username: String,
    val email: String,
    val displayName: String,
    val bio: String?,
    val createdAt: String
)
