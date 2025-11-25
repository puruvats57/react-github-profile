import { GitBranch, GitPullRequest, GitCommit } from "lucide-react";
const mockActivity = [
    {
        type: "pullRequest",
        repo: "typeintandem/tandem",
        action: "Opened 66 commit in 11 repositories",
        color: "#6e5494",
    },
    {
        type: "commit",
        repo: "typeintandem/tandem_website",
        count: 4,
        color: "#6e5494",
    },
    {
        type: "commit",
        repo: "typeintandem/tandem_vit",
        count: 2,
        color: "#f1e05a",
    },
    {
        type: "commit",
        repo: "typeintandem/tandem_plugins",
        count: 7,
        color: "#563d7c",
    },
    {
        type: "commit",
        repo: "typeintandem/tandem_intellij",
        count: 3,
        color: "#b07219",
    },
];
export const ActivityFeed = () => {
    return (<section className="space-y-6">
      <div>
        <h2 className="text-base font-semibold mb-4">Activity overview</h2>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <GitCommit className="w-4 h-4 text-muted-foreground"/>
              <span className="text-sm text-muted-foreground">Contributed to</span>
            </div>
            <a href="#" className="text-sm text-primary hover:underline">
              typeintandem/tandem_website
            </a>
          </div>
          <div className="flex-1 border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <GitBranch className="w-4 h-4 text-muted-foreground"/>
              <span className="text-sm text-muted-foreground">Opened their first</span>
            </div>
            <a href="#" className="text-sm text-primary hover:underline">
              pull request
            </a>
            <span className="text-xs text-muted-foreground ml-1">
              in typeintandem/tandem_vit
            </span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold mb-4">Contribution activity</h2>

        <div className="space-y-4">
          <div className="text-sm font-semibold pb-2 border-b border-border">
            December 2024
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-start gap-3 mb-2">
                <GitPullRequest className="w-4 h-4 mt-0.5 text-muted-foreground"/>
                <div className="flex-1">
                  <div className="text-sm">
                    <span>Opened </span>
                    <span className="font-semibold">66 commit</span>
                    <span> in </span>
                    <span className="font-semibold">11 repositories</span>
                  </div>
                </div>
              </div>

              <div className="ml-7 space-y-2">
                {mockActivity.slice(1).map((activity, idx) => (<div key={idx} className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activity.color }}/>
                      <a href="#" className="text-primary hover:underline">
                        {activity.repo}
                      </a>
                    </div>
                    <span className="text-muted-foreground">{activity.count} commit</span>
                  </div>))}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button className="text-sm text-primary hover:underline">Show more activity</button>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-border text-sm text-muted-foreground">
        <p>
          Seeing something unexpected? Take a look at the{" "}
          <a href="#" className="text-primary hover:underline">
            GitHub profile guide
          </a>
          .
        </p>
      </div>
    </section>);
};
