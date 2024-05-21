# Embrave

## Tasks

- [ ] Improve file colocation
- [ ] Use `tailwind-merge` for merging Tailwind CSS classes
- [ ] Use React Aria Components' starter kit
- [ ] Remove unnecessary `useEffect`s
- [ ] Rename "Login" to "Sign In"
- [ ] Implement `createRoom` mutation

## Setup

Before being able to run the app for the first time, you need to follow the steps below:

### Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js v20](https://nodejs.org/en/download/)
  - We recommend using [fnm](https://github.com/Schniz/fnm) to manage Node.js versions. After
    installing it, run `fnm install` in the root directory of the project to install the proper
    Node.js version.
- Join the team on Vercel with your GitHub account.

### Instructions

1. Clone this repository
2. Install [`pnpm`](https://pnpm.io/) with
   [Corepack](https://nodejs.org/docs/latest-v20.x/api/corepack.html) by running
   `corepack enable; corepack prepare`
3. Install dependencies by running `pnpm install`
4. Link local repository to its Vercel project by running `pnpm vercel link`
5. Download environment variables by running `pnpm env:pull`

## Developing

### Running the App

#### Development Mode

To start the app in development mode, run the following command:

```sh
$ pnpm dev
```

This will start a local server that will automatically rebuild the app and refresh the page when you
make changes to the code. The app will be available at
[http://localhost:3000](http://localhost:3000).

This is how you will run the app most of the time.

#### Debug Mode

If you're debugging and want to attach a debugger, you can use the following command to start the
app in debug mode:

```sh
$ pnpm dev:debug
```

To learn how to attach a debugger to the app, see
[this guide](https://nextjs.org/docs/advanced-features/debugging).

#### Production Mode

To run the app in production mode, run the following commands in order:

```sh
# Build the app for production usage
$ pnpm build

# Start the app in production mode
$ pnpm start
```

This can be useful for testing the app in production mode locally.

### Code Linting

Code linting is handled by [ESLint](https://eslint.org/). You can use the following command for
linting all project's files:

```sh
$ pnpm lint
```

We recommend using an
[editor integration for ESLint](https://eslint.org/docs/user-guide/integrations).

### Code Formatting

Code formatting is handled by [Prettier](https://prettier.io/). You can use the following command to
format all project’s files:

```sh
$ pnpm format
```

We recommend using an [editor integration for Prettier](https://prettier.io/docs/en/editors.html).

### Environment Variables

Environment variables are handled by the [Vercel CLI](https://vercel.com/docs/cli/env). Use the
following commands to manage them:

```sh
# Download development environment variables for running the app locally
$ pnpm env:pull

# Add a new environment variable
$ pnpm env:add

# Remove an environment variable
$ pnpm env:rm
```

Check the [Vercel documentation](https://vercel.com/docs/concepts/projects/environment-variables)
for more information.

You should **never commit environment variables** to the repository. If you need to add a new
environment variable, add it with the `pnpm env:add` command and then download it with the
`pnpm env:pull` command.
