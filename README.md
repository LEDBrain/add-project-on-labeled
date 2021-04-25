# add-project-on-labeled

> A GitHub App built with [Probot](https://github.com/probot/probot) that adds PRs with the "dependencies" label to the fitting project.

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t add-project-on-labeled .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> -e WEBHOOK_SECRET=<webhook-secret> add-project-on-labeled
```

I suggest mounting the `.pem` file (using absolute paths) and then setting the `PRIVATE_KEY_PATH` env to prevent any errors regarding newlines in the private key.

## Contributing

If you have suggestions for how this app could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2021 Konstantin <kcvw@icloud.com>
