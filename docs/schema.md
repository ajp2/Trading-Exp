# Database Schema

## `users`

| column name       | data type | details                   |
| ----------------- | --------- | ------------------------- |
| `id`              | integer   | not null, primary key     |
| `first_name`      | string    | not null                  |
| `last_name`       | string    | not null                  |
| `username`        | string    | not null, indexed, unique |
| `email`           | string    | not null, indexed, unique |
| `total_cash`      | integer   | not null                  |
| `password_digest` | string    | not null                  |
| `created_at`      | datetime  | not null                  |
| `updated_at`      | datetime  | not null                  |

- index on `username, unique: true`
- index on `email, unique: true`

## `shares`

| column name    | data type | details                        |
| -------------- | --------- | ------------------------------ |
| `id`           | integer   | not null, primary key          |
| `ticker`       | string    | not null, indexed              |
| `shares_owned` | integer   | not null                       |
| `user_id`      | integer   | not null, foreign key, indexed |
| `watchlist`    | boolean   | not null, default              |
| `created_at`   | datetime  | not null                       |
| `updated_at`   | datetime  | not null                       |

- index on `ticker`
- index on `user_id`
- `watchlist, default: false`
