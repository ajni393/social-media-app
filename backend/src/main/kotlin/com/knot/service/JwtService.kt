package com.knot.service

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.Date

@Service
class JwtService {
    @Value("\${jwt.secret:mySecretKeyForKnotSocialMediaAppPleaseChangeThisInProduction123456789}")
    private lateinit var secret: String

    @Value("\${jwt.expiration:86400000}") // 24 hours
    private var expiration: Long = 0

    fun generateToken(userId: Long, username: String): String {
        val key = Keys.hmacShaKeyFor(secret.toByteArray())
        return Jwts.builder()
            .setSubject(userId.toString())
            .claim("username", username)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + expiration))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact()
    }

    fun extractUserId(token: String): Long {
        val key = Keys.hmacShaKeyFor(secret.toByteArray())
        val claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .body
        return claims.subject.toLong()
    }

    fun isValid(token: String): Boolean {
        return try {
            val key = Keys.hmacShaKeyFor(secret.toByteArray())
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
            true
        } catch (e: Exception) {
            false
        }
    }
}
