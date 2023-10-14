# Micro Frontend - Seed Project

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=q4mobile_platform-mfe-seed&metric=coverage&token=22fed6da247eff069184c7a89c2260705a14ced0)](https://sonarcloud.io/summary/new_code?id=q4mobile_platform-mfe-seed)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=q4mobile_platform-mfe-seed&metric=security_rating&token=22fed6da247eff069184c7a89c2260705a14ced0)](https://sonarcloud.io/summary/new_code?id=q4mobile_platform-mfe-seed)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=q4mobile_platform-mfe-seed&metric=sqale_rating&token=22fed6da247eff069184c7a89c2260705a14ced0)](https://sonarcloud.io/summary/new_code?id=q4mobile_platform-mfe-seed)

## Using this Template

This repository is a template for building [Micro Frontends](https://q4websystems.atlassian.net/wiki/spaces/QP/pages/2848325706/Micro+Front+Ends). To create a new repository from this template, follow the steps below:

1. Click 'Use this template' from the top of this page
2. Type a name for your repository, and an optional description.
   - Follow the `platform-{domain}-mfe` [naming convention](https://q4websystems.atlassian.net/wiki/spaces/QP/pages/3122528448/GitHub+Repository+Convention)
3. Create repository from template
4. Clone new repository
5. Replace all references of 'seed' with the MFE name within the following files: `.github\*\*.yml`, `.deploy\*.tf`
6. Add `feature`, `dev`, `staging` and `prod` environments to the repository via Github settings, and add following microservice secrets for each environment:
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
7. Set up TestRail
   - Update the TestRail `project_id` and `suite_id` values in `deploy.yml` to match your previously created TestRail Project and Suite

---

## Getting Started

To run the application locally, following the instructions below:

1. Setup your environment to run [tokana-cli](https://github.com/q4mobile/tokana-cli)

   - Install [AWS-CLI](https://aws.amazon.com/cli/)
   - Request AWS-CLI access (microservice account)
   - Log into AWS-CLI
   - Install [tokana-cli](https://github.com/q4mobile/tokana-cli)

2. Install [Node 16.16.0 and NPM 8.11.0](https://nodejs.org/en/blog/release/v16.16.0/)
   - Run `npm run freshInstall`
   - Run `npm start`

## Standards

Please refer to the documentation below for standardized rules, conventions and patterns to follow when updating this project.

- [`MFE Design`](https://q4websystems.atlassian.net/wiki/spaces/QP/pages/2848325706/Micro+Front+Ends)
- [`Naming Conventions`](https://q4websystems.atlassian.net/wiki/spaces/QP/pages/3122528448/GitHub+Repository+Convention)

## Documentation

All technical documentation and architecture diagrams for this service should be committed to this repository in the [docs](./docs/) folder. Any changes to the design of this service should also be reflected in the documentation and/or architecture diagrams.

Documentation for all services within the Platform are available through [Backstage](https://backstage.platform.q4inc.com)

## Webpack Module Federation

Module federation allows a JavaScript application to dynamically run code from another bundle/build, in local and deployed environments. Using these capabilities available in Webpack 5, a central shell app has been built, [platform-shell](https://github.com/q4mobile/platform-shell) (_aka local module_), and acts as a container for any number of remote modules.

## Tests

Unit tests are required for all services and utilities. Tests should reside in `*.spec.ts(x)` files, located in the directory of their corresponding component. To run unit tests, run the following:

```
$ npm test
```

## Formatting

Rules for code formatting are defined in <em>.eslintrc.js</em> file. For more information about ESLint rules and configuration visit https://eslint.org/. To perform a lint on the project's source files, use:

```
$ npm run lint
```

## Templates

Module and component generation is available via [plop](https://plopjs.com/) templates. To generate the desired boilerplate code, use:

```
$ npm run plop
```

## Additional Information

- The eslint rules are not set in stone; teams can configure them how they wish

- The common component library we use is [NimbusUI](https://github.com/q4mobile/nimbus-ui). This repo is pre-configured for access to all NimbusUI components

- The recommended styling library is [emotion](https://emotion.sh/), whichs provides access to the [styled-components](https://styled-components.com/) api via `@emotion/styled`, and more

- Git hook `pre-commit` is configured on the repo via npm package [Husky](https://www.npmjs.com/package/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged)

  - `Husky` automagically creates a git hook based on files contained in the .husky folder, with names that match the git hook of choice:\
    ![image](https://user-images.githubusercontent.com/90337173/154570124-4340da74-3693-4f55-9bde-8417d7589022.png)\
    Every time the developer attempts to commit to their local repository, `npx lint-staged` will execute

  - `lint-staged` is configured to kick off `jest`, `eslint:fix`, and `prettier`:

    ![image](https://user-images.githubusercontent.com/90337173/154570542-29d8c8dd-c9ae-4f81-a4ea-4cf46ee32606.png)\
    Feel free to modify this as you see fit

- We use [Pendo](https://www.pendo.io/) for product analytics and qualitative feedback. For custom tracking you can use the following snippet. Note that optional chaining is required because Pendo will be loaded and initialized in [Platform Shell](https://github.com/q4mobile/platform-shell).

  ```
  pendo?.track?.("My event", {
    metadata1: "foo",
    metadata2: "bar",
  })
  ```