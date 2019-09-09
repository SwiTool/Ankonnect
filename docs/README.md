## Creating the instance

The simple way is just :

```javascript
const options = {};
const ank = new Ankonnect(options);
```

You can give options to `Ankonnect` constructor, which is an object containing :

| Key name  | Required |       Type        |                   Default                   |
| --------- | :------: | :---------------: | :-----------------------------------------: |
| userAgent |    ❌    |     `string`      |                  (random)                   |
| proxy     |    ❌    | `string` \| `URL` |                                             |
| lang      |    ❌    |     `string`      |                   `"fr"`                    |
| baseUrl   |    ❌    |     `string`      | `"https://haapi.ankama.com/json/Ankama/v2"` |

## Using the SDK

Once you have your constructed `Ankonnect`, you have acces to :

- `Api`:
- - [`createApiKey`](#createapikey)
- `Account`:
- - [`createToken`](#createToken)
- - [`createGuest`](#createGuest)

⚠ All async methods can throw errors, be aware to catch :

- GenericError
- GuestError
- LoginError

## Methods

### Api

#### createApiKey

Create an Api key, which is the equivalent to an access token, that will be needed later to create a token to access the game.

🏳 Parameters: (CreateApiKeyRequest `options`)

- options: CreateApiKeyRequest:

```typescript
{
  login: string;
  password: string;
  long_life_token: boolean;
}
```

⏪ Returns: CreateApiKeyResponse:

```typescript
{
  access: unknown[];
  account_id: number;
  added_date: string;
  data: {
    country: string;
    currency: string;
  };
  expiration_date: string;
  ip: string;
  key: string;
  meta: unknown[];
  refresh_token: string;
}
```

Example:

```javascript
const res = await ank.Api.createApiKey({
  login: "myLogin";
  password: "myPassword";
  long_life_token: false;
});
console.log(res.key, res.account_id);
```

### Account

#### createToken

Create a token to access the game

🏳 Parameters: (CreateTokenRequest `options`, string `haapiKey`)

- options: CreateTokenRequest:

```typescript
{
  game: number;
}
```

- haapiKey: string. The key you got from createApiKey

⏪ Returns: CreateTokenResponse:

```typescript
{
  token: string;
}
```

Example:

```javascript
const res = await ank.Account.createToken({
  game: 18;
}, "haapiKeyFromCreateApiKey");
console.log(res.token);
```

#### createGuest

Create a guest account for the game

🏳 Parameters: (CreateGuestRequest `options`)

- options: CreateGuestRequest:

```typescript
{
  game: number;
  lang: string;
  captcha_token: string;
}
```

⏪ Returns: CreateGuestResponse:

```typescript
{
  added_date: string;
  added_ip: string;
  avatar_url: string;
  birth_date: string | null;
  community: string;
  email: string | null;
  gsm: string | null;
  id: number;
  lang: string;
  locked: boolean;
  login: string;
  login_date: string | null;
  login_ip: string;
  nickname: string | null;
  parent_email_status: string | null;
  password: string;
  secure: unknown;
  secure_info: unknown;
  security: unknown[];
  type: "GUEST";
}
```

Example:

```javascript
const res = await ank.Account.createGuest({
  game: 18;
  lang: "fr",
  captcha_token: "getItFromACaptchaSolver"
});
console.log(res.login, res.password);
```
