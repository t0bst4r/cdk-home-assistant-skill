import { awscdk } from 'projen';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 't0bst4r',
  authorAddress: '82281152+t0bst4r@users.noreply.github.com',
  cdkVersion: '2.88.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: 'cdk-home-assistant-skill',
  keywords: ['home', 'assistant', 'smarthome', 'smart home', 'homeassistant', 'home assistant', 'hass', 'skill'],
  projenrcTs: true,
  repositoryUrl: 'https://github.com/t0bst4r/cdk-home-assistant-skill.git',
  publishToPypi: {
    distName: 'cdk-home-assistant-skill',
    module: 'cdk_home_assistant_skill',
  },
  deps: ['cdk-skill-management'], /* Runtime dependencies of this module. */
  // description: undefined,      /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                 /* Build dependencies for this module. */
  // packageName: undefined,      /* The 'name' in package.json. */
  gitignore: ['.idea/'],
});
project.synth();
