```
登录
this.logout();
String token = this.createToken((String)null, String.valueOf(sessionUser.getId()));
Claims claims = this.parseToken(token);
String sessionKey = this.getSessionKey(claims.getSubject());
Date expireAt = DateUtils.addSeconds(new Date(), (int)this.jbSessionProperties.getExpire().get(ChronoUnit.SECONDS));
this.redisTemplate.opsForHash().put(sessionKey, "subject", sessionUser);
this.redisTemplate.opsForHash().put(sessionKey, "source", source);
this.redisTemplate.expireAt(sessionKey, expireAt);
SecurityUtils.getSubject().login(new SessionToken(token));
RequestThreadLocal.setLoginToken(token);
this.response.setHeader(this.jbSessionProperties.getHeader(), token);
this.response.addHeader("Access-Control-Expose-Headers", this.jbSessionProperties.getHeader());
```

```
public Claims parseToken(String token) {
    if (StringUtils.isEmpty(token)) {
        throw new UnLoginException();
    } else if (this.jbSessionProperties.isJwtEnable()) {
        try {
            return (Claims)Jwts.parser().setSigningKey(this.jbSessionProperties.getJwtSecret()).parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException var3) {
            throw new ServiceException(ApiCode.login_expired);
        }
    } else {
        return Jwts.claims().setSubject(token);
    }
}
```