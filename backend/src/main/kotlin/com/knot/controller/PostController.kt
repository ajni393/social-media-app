package com.knot.controller

import com.knot.dto.CreatePostRequest
import com.knot.dto.PostResponse
import com.knot.service.JwtService
import com.knot.service.PostService
import jakarta.validation.Valid
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/posts")
class PostController(
    private val postService: PostService,
    private val jwtService: JwtService
) {
    @PostMapping
    fun createPost(
        @RequestHeader("Authorization") authHeader: String,
        @Valid @RequestBody request: CreatePostRequest
    ): ResponseEntity<PostResponse> {
        val token = authHeader.replace("Bearer ", "")
        if (!jwtService.isValid(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
        val userId = jwtService.extractUserId(token)
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(postService.createPost(userId, request))
    }

    @GetMapping
    fun getFeed(pageable: Pageable): ResponseEntity<Page<PostResponse>> {
        return ResponseEntity.ok(postService.getFeed(pageable))
    }

    @GetMapping("/{postId}")
    fun getPost(@PathVariable postId: Long): ResponseEntity<PostResponse> {
        return ResponseEntity.ok(postService.getPostById(postId))
    }

    @GetMapping("/user/{userId}")
    fun getUserPosts(
        @PathVariable userId: Long,
        pageable: Pageable
    ): ResponseEntity<Page<PostResponse>> {
        return ResponseEntity.ok(postService.getUserPosts(userId, pageable))
    }
}
