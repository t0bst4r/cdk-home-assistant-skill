# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### HomeAssistantSkill <a name="HomeAssistantSkill" id="cdk-home-assistant-skill.HomeAssistantSkill"></a>

Create all necessary resources to create an Alexa Skill for Home Assistant Skills can be deployed in every AWS regions, but Lambda Endpoints are restricted to.

North America: arn:aws:lambda:us-east-1:<aws_account_id>:function:<lambda_name>
Europe, India: arn:aws:lambda:eu-west-1:<aws_account_id>:function:<lambda_name>
Far East (not supported): arn:aws:lambda:location<aws_account_id>:function:<lambda_name>

Since this constructs creates both - the endpoint and the skill - you need to deploy this construct in eu-west-1 or us-east-1

#### Initializers <a name="Initializers" id="cdk-home-assistant-skill.HomeAssistantSkill.Initializer"></a>

```typescript
import { HomeAssistantSkill } from 'cdk-home-assistant-skill'

new HomeAssistantSkill(scope: Construct, id: string, props: HomeAssistantSkillProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-home-assistant-skill.HomeAssistantSkill.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | - The construct scope. |
| <code><a href="#cdk-home-assistant-skill.HomeAssistantSkill.Initializer.parameter.id">id</a></code> | <code>string</code> | - The construct ID. |
| <code><a href="#cdk-home-assistant-skill.HomeAssistantSkill.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-home-assistant-skill.HomeAssistantSkillProps">HomeAssistantSkillProps</a></code> | - The Skill properties. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-home-assistant-skill.HomeAssistantSkill.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The construct scope.

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-home-assistant-skill.HomeAssistantSkill.Initializer.parameter.id"></a>

- *Type:* string

The construct ID.

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-home-assistant-skill.HomeAssistantSkill.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-home-assistant-skill.HomeAssistantSkillProps">HomeAssistantSkillProps</a>

The Skill properties.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-home-assistant-skill.HomeAssistantSkill.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-home-assistant-skill.HomeAssistantSkill.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-home-assistant-skill.HomeAssistantSkill.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-home-assistant-skill.HomeAssistantSkill.isConstruct"></a>

```typescript
import { HomeAssistantSkill } from 'cdk-home-assistant-skill'

HomeAssistantSkill.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-home-assistant-skill.HomeAssistantSkill.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-home-assistant-skill.HomeAssistantSkill.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-home-assistant-skill.HomeAssistantSkill.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### HomeAssistantSkillProps <a name="HomeAssistantSkillProps" id="cdk-home-assistant-skill.HomeAssistantSkillProps"></a>

Properties for creating the Home Assistant Skill.

#### Initializer <a name="Initializer" id="cdk-home-assistant-skill.HomeAssistantSkillProps.Initializer"></a>

```typescript
import { HomeAssistantSkillProps } from 'cdk-home-assistant-skill'

const homeAssistantSkillProps: HomeAssistantSkillProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-home-assistant-skill.HomeAssistantSkillProps.property.authenticationConfiguration">authenticationConfiguration</a></code> | <code>aws-cdk-lib.alexa_ask.CfnSkill.AuthenticationConfigurationProperty</code> | Authentication configuration for the Alexa Skill. |
| <code><a href="#cdk-home-assistant-skill.HomeAssistantSkillProps.property.authenticationConfigurationParameter">authenticationConfigurationParameter</a></code> | <code>aws-cdk-lib.aws_ssm.IStringParameter</code> | StringParameter holding the authentication configuration for the Alexa Skill. |
| <code><a href="#cdk-home-assistant-skill.HomeAssistantSkillProps.property.authenticationConfigurationSecret">authenticationConfigurationSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | Secret holding the authentication configuration for the Alexa Skill. |
| <code><a href="#cdk-home-assistant-skill.HomeAssistantSkillProps.property.homeAssistantUrl">homeAssistantUrl</a></code> | <code>string</code> | The public reachable URL of your home assistant instance. |
| <code><a href="#cdk-home-assistant-skill.HomeAssistantSkillProps.property.skillLocale">skillLocale</a></code> | <code>string</code> | The language of your skill. |
| <code><a href="#cdk-home-assistant-skill.HomeAssistantSkillProps.property.skillName">skillName</a></code> | <code>string</code> | The Name for your skill (not unique). |
| <code><a href="#cdk-home-assistant-skill.HomeAssistantSkillProps.property.vendorId">vendorId</a></code> | <code>string</code> | Your vendor ID. |

---

##### `authenticationConfiguration`<sup>Optional</sup> <a name="authenticationConfiguration" id="cdk-home-assistant-skill.HomeAssistantSkillProps.property.authenticationConfiguration"></a>

```typescript
public readonly authenticationConfiguration: AuthenticationConfigurationProperty;
```

- *Type:* aws-cdk-lib.alexa_ask.CfnSkill.AuthenticationConfigurationProperty

Authentication configuration for the Alexa Skill.

---

##### `authenticationConfigurationParameter`<sup>Optional</sup> <a name="authenticationConfigurationParameter" id="cdk-home-assistant-skill.HomeAssistantSkillProps.property.authenticationConfigurationParameter"></a>

```typescript
public readonly authenticationConfigurationParameter: IStringParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IStringParameter

StringParameter holding the authentication configuration for the Alexa Skill.

---

##### `authenticationConfigurationSecret`<sup>Optional</sup> <a name="authenticationConfigurationSecret" id="cdk-home-assistant-skill.HomeAssistantSkillProps.property.authenticationConfigurationSecret"></a>

```typescript
public readonly authenticationConfigurationSecret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

Secret holding the authentication configuration for the Alexa Skill.

---

##### `homeAssistantUrl`<sup>Required</sup> <a name="homeAssistantUrl" id="cdk-home-assistant-skill.HomeAssistantSkillProps.property.homeAssistantUrl"></a>

```typescript
public readonly homeAssistantUrl: string;
```

- *Type:* string

The public reachable URL of your home assistant instance.

---

##### `skillLocale`<sup>Required</sup> <a name="skillLocale" id="cdk-home-assistant-skill.HomeAssistantSkillProps.property.skillLocale"></a>

```typescript
public readonly skillLocale: string;
```

- *Type:* string

The language of your skill.

---

##### `skillName`<sup>Required</sup> <a name="skillName" id="cdk-home-assistant-skill.HomeAssistantSkillProps.property.skillName"></a>

```typescript
public readonly skillName: string;
```

- *Type:* string

The Name for your skill (not unique).

---

##### `vendorId`<sup>Required</sup> <a name="vendorId" id="cdk-home-assistant-skill.HomeAssistantSkillProps.property.vendorId"></a>

```typescript
public readonly vendorId: string;
```

- *Type:* string

Your vendor ID.

---



