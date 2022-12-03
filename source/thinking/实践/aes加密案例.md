#### —送出電文必須進行加密處理：AES256 演算法加密，採 base64 編碼並加密後字串執行 URLEncode 處理;接收端需進行 URLDecode。

(1) 採用 AES 256Bit 加密

(2) 加密模式使用 CBC（Cipher-block chaining）

(3) 加密 Key 32Bit

(4) 初始向量 IV 為加密 key 取 MD5 之後的值，16Bit

```java
private static String push2(String sourceKey, String memberId, String pushMsg, String targetPath){
    FamiPortPushForm pushForm = new FamiPortPushForm();
    pushForm.setAppId("P0088");
    pushForm.setMemberId(memberId);
    pushForm.setPushMsg(pushMsg);
    pushForm.setActionId(targetPath);
    pushForm.setActionParam("");
    pushForm.setPushUrl("");
    pushForm.setStatus("0");

    byte[] sourceKeyBytes = sourceKey.getBytes(StandardCharsets.UTF_8);
    byte[] aesKeyBytes = SecureUtil.sha256().digest(sourceKeyBytes); // 32位
    byte[] aesIvBytes = SecureUtil.md5().digest(sourceKeyBytes);

    AES aes = new AES(Mode.CBC, Padding.PKCS5Padding, aesKeyBytes);
    byte[] encryptData = aes.setIv(aesIvBytes).encrypt(JBsonUtils.toJson(pushForm));
    return URLEncodeUtil.encode(Base64.getEncoder().encodeToString(encryptData));
}
```