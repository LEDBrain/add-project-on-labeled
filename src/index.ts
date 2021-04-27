import { Probot } from 'probot';

export = (app: Probot): void => {
    app.on('pull_request.labeled', async context => {
        if (context.payload?.label?.name !== 'dependencies') return;

        const { data: projects } = await context.octokit.projects.listForRepo({
            owner: context.payload.repository.owner.login,
            repo: context.payload.repository.name,
            mediaType: {
                previews: ['inertia'],
            },
        });

        const project = projects?.filter(project =>
            project.name.match(/dependabot|dependencies|deps|dependency/gim)
        )[0];
        if (!project || !project?.id)
            return app.log.warn(
                `I couldn't find a matching project.${
                    !projects || !projects.map(pro => pro.name)
                        ? ''
                        : ` I found these projects: ${[
                              ...projects.map(pro => pro.name),
                          ].join(', ')}`
                }`
            );

        const { data: columns } = await context.octokit.projects.listColumns({
            project_id: project.id,
            mediaType: {
                previews: ['inertia'],
            },
        });

        const column = columns?.filter(col =>
            col.name.match(/to\s*do|open/gim)
        )[0];
        if (!column || !column?.id)
            return app.log.warn(
                `I couldn't find a matching column in the project (id: ${
                    project.id
                }). ${
                    !columns || !columns.map(col => col.name)
                        ? ''
                        : ` I found these columns: ${[
                              ...columns.map(col => col.name),
                          ].join(', ')}`
                }`
            );

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
};
