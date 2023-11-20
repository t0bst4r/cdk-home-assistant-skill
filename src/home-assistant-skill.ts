import * as path from 'path';
import { Duration, Stack } from 'aws-cdk-lib';
import { Architecture, Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import {
  AccountLinking,
  Skill,
  SkillAuthenticationProps,
  SkillEndpointPermission,
  SkillType,
} from 'cdk-skill-management';
import { Construct } from 'constructs';

const accountLinkingClientIds: Record<string, string> = {
  'eu-west-1': 'https://layla.amazon.com/',
  'us-east-1': 'https://pitangui.amazon.com/',
};

/**
 * Properties for creating the Home Assistant Skill.
 */
export interface HomeAssistantSkillProps extends SkillAuthenticationProps {
  /**
   * The public reachable URL of your home assistant instance
   */
  readonly homeAssistantUrl: string;
  /**
   * Your vendor ID
   */
  readonly vendorId: string;

  /**
   * The Name for your skill (not unique)
   */
  readonly skillName: string;
  /**
   * The language of your skill
   */
  readonly skillLocale: 'de-DE' | string;
}

/**
 * Create all necessary resources to create an Alexa Skill for Home Assistant
 * Skills can be deployed in every AWS regions, but Lambda Endpoints are restricted to
 *
 * North America: arn:aws:lambda:us-east-1:<aws_account_id>:function:<lambda_name>
 * Europe, India: arn:aws:lambda:eu-west-1:<aws_account_id>:function:<lambda_name>
 * Far East (not supported): arn:aws:lambda:location<aws_account_id>:function:<lambda_name>
 *
 * Since this constructs creates both - the endpoint and the skill - you need to deploy this construct in eu-west-1 or us-east-1
 */
export class HomeAssistantSkill extends Construct {

  /**
   * Creates an instance of the Home Assistant Skill construct.
   * @param scope - The construct scope.
   * @param id - The construct ID.
   * @param props - The Skill properties.
   */
  constructor(scope: Construct, id: string, props: HomeAssistantSkillProps) {
    super(scope, id);

    const region = Stack.of(this).region;
    const accountLinkingClientId = accountLinkingClientIds[region];

    if (!accountLinkingClientId) {
      throw new Error(`Region ${region} is not supported for Smart Home Skills. Must be one of ${Object.keys(accountLinkingClientIds)}`);
    }

    const resourcesDir = path.join(__dirname, '..', 'resources');

    const endpoint = new Function(this, 'EndpointFunction', {
      runtime: Runtime.PYTHON_3_11,
      code: Code.fromAsset(path.join(resourcesDir, 'endpoint')),
      architecture: Architecture.ARM_64,
      handler: 'index.handler',
      timeout: Duration.seconds(60),
      memorySize: 256,
      environment: {
        BASE_URL: props.homeAssistantUrl,
      },
    });

    const endpointPermission = new SkillEndpointPermission(this, 'EndpointSkillPermission', {
      handler: endpoint,
      skillType: SkillType.SMART_HOME,
    });

    const skillPackageAsset = new Asset(this, 'Package', {
      path: path.join(resourcesDir, 'skill-package'),
    });

    const skill = new Skill(this, 'Default', {
      vendorId: props.vendorId,
      authenticationConfiguration: props.authenticationConfiguration,
      authenticationConfigurationSecret: props.authenticationConfigurationSecret,
      authenticationConfigurationParameter: props.authenticationConfigurationParameter,
      skillStage: 'development',
      skillType: SkillType.SMART_HOME,
      skillPackage: {
        asset: skillPackageAsset,
        overrides: {
          manifest: {
            publishingInformation: {
              locales: {
                [props.skillLocale]: {
                  name: props.skillName,
                  description: 'My Personal Smart Home',
                  summary: 'My Personal Smart Home',
                  keywords: ['Smart Home', 'Smart Devices', 'Home Assistant'],
                  examplePhrases: [],
                },
              },
            },
            apis: {
              smartHome: {
                endpoint: {
                  uri: endpoint.functionArn,
                },
              },
            },
          },
        },
      },
    });

    endpointPermission.configureSkillId(this, 'EndpointSkillPermissionFix', skill);

    new AccountLinking(this, 'AccountLinking', {
      skill,
      authenticationConfiguration: props.authenticationConfiguration,
      authenticationConfigurationSecret: props.authenticationConfigurationSecret,
      authenticationConfigurationParameter: props.authenticationConfigurationParameter,
      request: {
        authenticationFlowType: 'AUTH_CODE',
        authorizationUrl: `${props.homeAssistantUrl}/auth/authorize`,
        accessTokenUrl: `${props.homeAssistantUrl}/auth/token`,
        accessTokenScheme: 'REQUEST_BODY_CREDENTIALS',
        clientId: accountLinkingClientId,
        clientSecret: 'not-used-anyway',
        scopes: ['smart_home'],
      },
    });
  }
}
