import { awscdk } from 'projen';
import { BetterAutoMerge } from './projenrc/better-auto-merge';

const projectOwner = 't0bst4r';

const project = new awscdk.AwsCdkConstructLibrary({
  author: projectOwner,
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

const buildIds = project.buildWorkflow?.buildJobIds;
if (buildIds) {
  const autoMerge = new BetterAutoMerge(project.github!, {
    approvedReviews: 0,
    ruleName: 'Automatic merge on successful build (account owner)',
    queueName: 'Automatic merge on successful build (account owner)',
  });
  autoMerge.addConditions(...buildIds.map(buildId => `status-success=${buildId}`));
  autoMerge.addConditions(`author=${projectOwner}`);
}

project.synth();
