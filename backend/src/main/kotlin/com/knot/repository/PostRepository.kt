package com.knot.repository

import com.knot.entity.Post
import com.knot.entity.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PostRepository : JpaRepository<Post, Long> {
    fun findByUserOrderByCreatedAtDesc(user: User, pageable: Pageable): Page<Post>
    fun findAllByOrderByCreatedAtDesc(pageable: Pageable): Page<Post>
}
