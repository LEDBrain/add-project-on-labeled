import { Probot } from 'probot';

export = (app: Probot) => {
    app.on('pull_request.labeled', async (context) => {
        // app.log.info(context);
        if (context.payload?.label?.name !== 'dependencies') return;

        const { data: projects } = await context.octokit.projects.listForRepo({
            owner: context.payload.repository.owner.login,
            repo: context.payload.repository.name,
            mediaType: {
                previews: ['inertia'],
            },
        });

        const project = projects.filter((project) =>
            project.name.match(/dependabot|dependencies|deps|dependency/gim)
        )[0];

        const { data: columns } = await context.octokit.projects.listColumns({
            project_id: project.id,
            mediaType: {
                previews: ['inertia'],
            },
        });

        const column = columns.filter((col) => col.name.match(/to\s*do/gim))[0];

        context.octokit.projects.createCard({
            column_id: column.id,
            mediaType: {
                previews: ['inertia'],
            },
            content_id: context.payload.pull_request.id,
            content_type: 'PullRequest',
        });

        context.octokit.issues.createComment({
            headers: {
                accept: 'application/vnd.github.v3+json',
            },
            owner: context.payload.repository.owner.login,
            repo: context.payload.repository.name,
            issue_number: context.payload.pull_request.number,
            body: `I've added this PR to the [${project.name}](${project.html_url}) project.`,
        });
    });
    // For more information on building apps:
    // https://probot.github.io/docs/

    // To get your app running against GitHub, see:
    // https://probot.github.io/docs/development/
};
