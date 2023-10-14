# {{Domain}} MFE

This is the front-end for {{Application Name}} and exports modules (micro front-ends) for integration into the Issuer UX (Shell). {{Application Name}} helps clients ....

Owner: `{{team}}`

AWS Account: {{`Q4 Platform` || `Q4 Microservices` || `Q4 Web` || `Q4 Events`}}

## 🤝 Contributing

---

External teams may contribute to this repository in collaboration with the repository owner. Any code committed to this repo must be approved by at least one team member from Loki.

## 🚧 Architecture

---

- [High Level Design](./architecture/overview.md)
- [Detailed System Design](./architecture/system.md)

## 🎫 Entitlements

---

This application requires one of the following organization entitlements:

| Entitlement                | Description                                                          |
| -------------------------- | -------------------------------------------------------------------- |
| `{{application}}::starter` | Free tier for {{Application Name}}, provides a sub-set functionality |
| `{{application}}::base`    | Base tier for {{Application Name}}                                   |

## 🔑 Roles & Permissions

---

This application requires at least one of the following roles:

| Role                    | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| `{{application}}::user` | Default CRM user role, provides access to the CRM application |

---

Access to this application is restricted to users with the following permission(s):

| Permission               | Description                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| `{{domain}}::access:app` | Minimum access required to view {{Application Name}} application |

Please see [Platform Roles & Permissions](https://q4websystems.atlassian.net/wiki/spaces/QP/pages/3292627049/Platform+Roles+Permissions) for a list of all roles and permissions within the Platform.

## 🌐 Environments

---

| Environment | URL                                              | Proxy URL                                      |
| ----------- | ------------------------------------------------ | ---------------------------------------------- |
| develop     | https://{{domain}}.mfe.dev.platform.q4inc.com/   | https://connect.dev.q4inc.com/mfe/{{domain}}   |
| staging     | https://{{domain}}.mfe.stage.platform.q4inc.com/ | https://connect.stage.q4inc.com/mfe/{{domain}} |
| production  | https://{{domain}}.mfe.platform.q4inc.com/       | https://connect.q4inc.com/mfe/{{domain}}       |
