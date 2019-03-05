```
{
  entities: {
    user: {
      first_name: "New",
      last_name: "User",
      username: "current_user",
      total_cash: 100
    },
    shares: {
      1: {
        id: 1,
        ticker: "TSLA",
        shares_owned: 4,
        user_id: 1,
        watchlist: false
      },
      2: {
        id: 2,
        ticker: "FB",
        shared_owned: 0,
        user_id: 1,
        watchlist: true
      }
    }
  },
  ui: {
    loading: true/false
  },
  errors: {
    authentication: ["password can't be blank"]
  },
  session: {
    loggedIn: true/false
  }
}
```