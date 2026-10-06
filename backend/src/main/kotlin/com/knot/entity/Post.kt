package com.knot.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "posts")
data class Post(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    val user: User,

    @Column(nullable = false, columnDefinition = "TEXT")
    val caption: String,

    @Column(nullable = false)
    val mediaUrl: String? = null,

    @Column(nullable = false)
    val mediaType: String? = null,

    @Column(nullable = false)
    val likes: Long = 0,

    @Column(nullable = false)
    val comments: Long = 0,

    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(nullable = false)
    val updatedAt: LocalDateTime = LocalDateTime.now()
)
