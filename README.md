
## Project setup


```http
POST /condominium/create
```
```json
{
  "name": "Sunset Condominium",
  "andress": "Rua das Flores, 123",
  "postalCode": "12345-678",
  "street": "Rua das Flores",
  "num": 123,
  "neighborhood": "Jardim das Flores",
  "state": "São Paulo",
  "uf": "SP"
}
```

```http
GET /condominium/{id}/readings
```

```http
GET /condominium/{id}/gas-consumption?dateStart=YYYY-MM-DD&dateEnd=YYYY-MM-DD
```

```http
POST /tower
```
```json
{
  "condominiumId": 1
}
```

```http
GET /tower/{id}/readings
```

```http
GET /tower/{id}/gas-consumption?dateStart=YYYY-MM-DD&dateEnd=YYYY-MM-DD
```

```http
POST /apartment
```
```json
{
  "towerId": 1
}
```

```http
GET /apartment/{id}/readings
```

```http
GET /apartment/{id}/gas-consumption?dateStart=YYYY-MM-DD&dateEnd=YYYY-MM-DD
```

```http
POST /person
```
```json
{
  "name": "João Silva",
  "address": "Rua Central, 123",
  "email": "joao@example.com",
  "phone": "11999999999",
  "type": "morador",
  "apartmentId": 1
}
```

```http
POST /hydrometer
```
```json
{
  "apartmentId": 1
}
```

```http
POST /reading
```
```json
{
  "hydrometerId": 1,
  "readingDate": "2025-09-16",
  "consumption": 12.34,
  "periodicity": "mensal"
}
```

### run project
```bash
docker compose up
```
