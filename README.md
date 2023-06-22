# Copy env file and input your own values

```sh
cp .env.local .env.production.local
```

## Project Setup

- Yarn `yarn install` (**recommended**)
- NPM `npm install`

### Compile and Output to `dist/`

```sh
yarn w
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Prettier, Type-Check, Compile and Minify for Production [Prettier](https://prettier.io/)

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
