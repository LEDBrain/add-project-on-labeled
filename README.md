# add-project-on-labeled

> A GitHub App built with [Probot](https://github.com/probot/probot) that adds PRs with the "dependencies" label to the fitting project.

## Setup

### With Docker

```sh
# 1. Pull the image (you can also build the image yourself, see down below for more information)
docker pull teamcoffee/add-project-on-labeled

# 2. Start the container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> -e WEBHOOK_SECRET=<webhook-secret> teamcoffee/add-project-on-labeled
```
I suggest mounting the `.pem` file (using absolute paths) and then setting the `PRIVATE_KEY_PATH` env to prevent any errors regarding newlines in the private key.

### Without Docker

```sh
# Clone the repository
git clone https://github.com/TeamCoffeeCodes/add-project-on-labeled.git

# cd into the directory
cd add-project-on-labeled

# Install dependencies
npm install

# Run the bot
npm start
```

## Building the Image

```sh
# 1. Build container
docker build -t add-project-on-labeled .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> -e WEBHOOK_SECRET=<webhook-secret> add-project-on-labeled
```
Again I suggest mounting the `.pem` file (using absolute paths) and then setting the `PRIVATE_KEY_PATH` env to prevent any errors regarding newlines in the private key.

## Contributing

If you have suggestions for how this app could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2021 TeamCoffee <contact@teamcoffee.codes>
