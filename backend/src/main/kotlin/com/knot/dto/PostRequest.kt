package com.knot.dto

import jakarta.validation.constraints.NotBlank

data class CreatePostRequest(
    @NotBlank(message = "Caption is required")
    val caption: String,

    val mediaUrl: String? = null,

    val mediaType: String? = null
)

data class PostResponse(
    val id: Long,
    val user: UserResponse,
    val caption: String,
    val mediaUrl: String?,
    val mediaType: String?,
    val likes: Long,
    val comments: Long,
    val createdAt: String
)
