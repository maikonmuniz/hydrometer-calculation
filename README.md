
## Project setup


## 📖 Documentação da API (Swagger)

Toda a API está documentada no Swagger, permitindo explorar os **endpoints**, **parâmetros** e **respostas** de forma interativa.

### 🔹 Acessando o Swagger

Abra o navegador e acesse:

```text
http://localhost:3000/api
```
## Routes
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
PUT /condominium/{id}
```
```json
{
  "name": "Sunset Condominium2",
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
DELETE /condominium/{id}
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
PUT /tower/{id}
```
```json
{
  "condominiumId": 1
}
```

```http
DELETE /tower/{id}
```

```http
GET /apartment/{id}/readings
```

```http
GET /apartment/{id}/gas-consumption?dateStart=YYYY-MM-DD&dateEnd=YYYY-MM-DD
```

```http
PUT /apartment/{id}
```
```json
{
  "towerId": 2
}
```

```http
DELETE /apartment/{id}
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
PUT /person/{id}
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
DELETE /person/{id}
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
PUT /hydrometer/{id}
```
```json
{
  "apartmentId": 1
}
```

```http
DELETE /hydrometer/{id}
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

```http
PUT /reading/{id}
```
```json
{
  "readingDate": "2025-09-16",
  "consumption": 12.67,
  "periodicity": "mensal"
}
```

```http
DELETE /reading/{id}
```

### Run project
```bash
docker compose up
```
