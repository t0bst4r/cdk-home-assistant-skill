import { Component, github as gh } from 'projen';

export interface BetterAutoMergeOptions {
  /**
   * Number of approved code reviews.
   * @default 1
   */
  readonly approvedReviews?: number;

  /**
   * List of labels that will prevent auto-merging.
   * @default ['do-not-merge']
   */
  readonly blockingLabels?: string[];

  /**
   * Name of the Mergify Rule
   * @default 'Automatic merge on approval and successful build'
   */
  readonly ruleName?: string;

  /**
   * Name of the Mergify Queue
   * @default 'default'
   */
  readonly queueName?: string;
}

/**
 * Sets up mergify to merging approved pull requests.
 *
 * If `buildJob` is specified, the specified GitHub workflow job ID is required
 * to succeed in order for the PR to be merged.
 *
 * `approvedReviews` specified the number of code review approvals required for
 * the PR to be merged.
 */
export class BetterAutoMerge extends Component {
  private readonly lazyConditions = new Array<gh.IAddConditionsLater>();

  constructor(github: gh.GitHub, options: BetterAutoMergeOptions = {}) {
    super(github.project);

    const mergify = github.mergify;
    if (!mergify) {
      throw new Error('auto merging requires mergify to be enabled');
    }

    const blockingLabels = options.blockingLabels ?? ['do-not-merge'];
    const blockingCondition = blockingLabels?.length
      ? [`-label~=(${blockingLabels.join('|')})`]
      : [];

    const mergeAction = {
      delete_head_branch: {},

      queue: {
        // squash all commits into a single commit when merging
        // method: "squash",
        method: 'squash',
        name: 'default',
        // use PR title+body as the commit message
        commit_message_template: [
          '{{ title }} (#{{ number }})',
          '',
          '{{ body }}',
        ].join('\n'),
      },
    };

    const approvedReviews = options.approvedReviews ?? 1;

    // add initial conditions (additional conditions can be added later)
    this.addConditions(`#approved-reviews-by>=${approvedReviews}`);
    this.addConditions(...blockingCondition);

    mergify.addRule({
      name: options.ruleName ?? 'Automatic merge on approval and successful build',
      actions: mergeAction,
      conditions: (() => this.renderConditions()) as any,
    });

    mergify.addQueue({
      name: options.queueName ?? 'default',
      updateMethod: 'merge',
      conditions: (() => this.renderConditions()) as any,
    });

    this.project.addPackageIgnore('/.mergify.yml');
  }

  /**
   * Adds conditions to the auto merge rule.
   * @param conditions The conditions to add (mergify syntax)
   */
  public addConditions(...conditions: string[]) {
    this.addConditionsLater({ render: () => conditions });
  }

  /**
   * Adds conditions that will be rendered only during synthesis.
   * @param later The later
   */
  public addConditionsLater(later: gh.IAddConditionsLater) {
    this.lazyConditions.push(later);
  }

  private renderConditions() {
    const output = new Array<string>();

    for (const later of this.lazyConditions) {
      output.push(...later.render());
    }

    return output;
  }
}
