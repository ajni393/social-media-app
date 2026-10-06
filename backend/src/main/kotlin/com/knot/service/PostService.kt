package com.knot.service

import com.knot.dto.CreatePostRequest
import com.knot.dto.PostResponse
import com.knot.dto.UserResponse
import com.knot.entity.Post
import com.knot.repository.PostRepository
import com.knot.repository.UserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Service
class PostService(
    private val postRepository: PostRepository,
    private val userRepository: UserRepository
) {
    fun createPost(userId: Long, request: CreatePostRequest): PostResponse {
        val user = userRepository.findById(userId)
            .orElseThrow { IllegalArgumentException("User not found") }

        val post = Post(
            user = user,
            caption = request.caption,
            mediaUrl = request.mediaUrl,
            mediaType = request.mediaType,
            createdAt = LocalDateTime.now(),
            updatedAt = LocalDateTime.now()
        )

        val savedPost = postRepository.save(post)
        return mapToResponse(savedPost)
    }

    fun getFeed(pageable: Pageable): Page<PostResponse> {
        return postRepository.findAllByOrderByCreatedAtDesc(pageable)
            .map { mapToResponse(it) }
    }

    fun getUserPosts(userId: Long, pageable: Pageable): Page<PostResponse> {
        val user = userRepository.findById(userId)
            .orElseThrow { IllegalArgumentException("User not found") }

        return postRepository.findByUserOrderByCreatedAtDesc(user, pageable)
            .map { mapToResponse(it) }
    }

    fun getPostById(postId: Long): PostResponse {
        val post = postRepository.findById(postId)
            .orElseThrow { IllegalArgumentException("Post not found") }
        return mapToResponse(post)
    }

    private fun mapToResponse(post: Post): PostResponse {
        return PostResponse(
            id = post.id,
            user = UserResponse(
                id = post.user.id,
                username = post.user.username,
                email = post.user.email,
                displayName = post.user.displayName,
                bio = post.user.bio,
                createdAt = post.user.createdAt.format(DateTimeFormatter.ISO_DATE_TIME)
            ),
            caption = post.caption,
            mediaUrl = post.mediaUrl,
            mediaType = post.mediaType,
            likes = post.likes,
            comments = post.comments,
            createdAt = post.createdAt.format(DateTimeFormatter.ISO_DATE_TIME)
        )
    }
}
