登录

```
Subject subject = SecurityUtils.getSubject();
if (subject.isAuthenticated()) {
    subject.logout();
    sessionHelper.logout();
}
```