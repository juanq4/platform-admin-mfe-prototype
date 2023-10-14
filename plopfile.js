/* eslint-disable @typescript-eslint/no-use-before-define */

module.exports = (plop) => {
  plop.setGenerator("module", getPlopGeneratorComponentConfig("src/modules"));
  plop.setGenerator("component", getPlopGeneratorComponentConfig("src/common/components", false));
};

const getPlopGeneratorComponentConfig = (path, includeIndexFile = true) => {
  const plopConfig = {
    description: "Create a module",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: "input",
        // Variable name for this input
        name: "name",
        // Prompt to display on command line
        message: "What is the name of component?",
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "name is required";
        },
      },
    ],
    actions: [
      {
        type: "add",
        force: false,
        data: null,
        abortOnFail: true,
        path: path + "/{{camelCase name}}/{{camelCase name}}.component.tsx",
        templateFile: "plop_templates/functional.component.tsx.hbs",
      },
      {
        type: "add",
        force: false,
        data: null,
        abortOnFail: true,
        path: path + "/{{camelCase name}}/{{camelCase name}}.definition.ts",
        templateFile: "plop_templates/functional.definition.ts.hbs",
      },
      {
        type: "add",
        force: false,
        data: null,
        abortOnFail: true,
        path: path + "/{{camelCase name}}/{{camelCase name}}.stories.tsx",
        templateFile: "plop_templates/functional.stories.tsx.hbs",
      },
      {
        type: "add",
        force: false,
        data: null,
        abortOnFail: true,
        path: path + "/{{camelCase name}}/{{camelCase name}}.component.spec.tsx",
        templateFile: "plop_templates/functional.component.spec.tsx.hbs",
      },
    ],
  };

  if (includeIndexFile) {
    plopConfig.actions.push({
      type: "append",
      data: null,
      abortOnFail: true,
      path: path + "/index.ts",
      pattern: /^/gi,
      template: 'export * from "./{{camelCase name}}/{{camelCase name}}.component";\n',
    });
  }

  return plopConfig;
};
