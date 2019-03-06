# Backend Routes

## HTML

- `GET /` - returns initial HTML template for frontend to handle

## API Endpoints

### `users`

- `GET /api/users/:id` - returns user info
- `POST /api/users` - sign up

### `session`

- `GET /api/session` - log in
- `DELETE api/session` - log out

### `shares`

- `GET /api/shares/users/:id` - returns all user shares
- `POST /api/shares`
- `PATCH /api/shares/:id`
- `DELETE /api/shares/:id`
