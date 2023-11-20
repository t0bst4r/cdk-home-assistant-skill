# [cdk-home-assistant-skill](https://t0bst4r.github.io/cdk-home-assistant-skill/)

[![GitHub License](https://img.shields.io/github/license/t0bst4r/cdk-home-assistant-skill)](LICENSE)
[![Build status](https://img.shields.io/github/actions/workflow/status/t0bst4r/cdk-home-assistant-skill/release.yml?logo=github)](https://github.com/t0bst4r/cdk-home-assistant-skill)

[![Github version](https://img.shields.io/github/v/release/t0bst4r/cdk-home-assistant-skill?logo=github)](https://github.com/t0bst4r/cdk-home-assistant-skill)
[![npm](https://img.shields.io/npm/v/cdk-home-assistant-skill?logo=npm)](https://www.npmjs.com/package/cdk-home-assistant-skill)
[![PyPI version](https://img.shields.io/pypi/v/cdk-home-assistant-skill?logo=pypi)](https://pypi.org/project/cdk-home-assistant-skill/)

> Since I am only working with Node.js and TypeScript, the Python package is currently not tested / used.
> Therefore I am looking for someone to use and test it to provide feedback, if the library is actually working and if there are best practices to apply (e.g. namings, module name, etc.).

Your library for creating and managing Alexa Skills via CloudFormation using AWS CDK.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Changelog](https://github.com/t0bst4r/cdk-skill-management/blob/main/CHANGELOG.md)

## Installation

### Node.js / TypeScript

To install the Node.js version of this library, use npm or yarn:

```bash
npm install cdk-home-assistant-skill
# or
yarn add cdk-home-assistant-skill
```

### Python
To install the Python version of this library, use pip:
```bash
pip install cdk-home-assistant-skill
```

## Usage
To use this library in your AWS CDK project, import and instantiate the classes you need.

You can find the API-Documentation [here](API.md).

### Regional restrictions
Skills can be deployed in every AWS regions, but Lambda Endpoints are restricted to
- North America: `arn:aws:lambda:us-east-1:<aws_account_id>:function:<lambda_name>`
- Europe, India: `arn:aws:lambda:eu-west-1:<aws_account_id>:function:<lambda_name>`
- Far East: `arn:aws:lambda:location<aws_account_id>:function:<lambda_name>`



## Contributing
We welcome contributions from the community. To contribute, please follow our [contribution guidelines](CONTRIBUTE.md).

## License
This library is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.
