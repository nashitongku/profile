```
NamedParameterJdbcTemplate namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate);
Map<String, Object> params = new HashMap<>();
params.put("imeis", imeis);
return namedParameterJdbcTemplate.query("select `IMEI`, `STORE_NO`, `PERM_ID` from tfm.shop_devices where `IMEI` not in (:imeis)", params, new BeanPropertyRowMapper<>(TfmShopDevices.class));
```