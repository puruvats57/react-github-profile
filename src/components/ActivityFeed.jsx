import { GitBranch, GitPullRequest, GitCommit, Lock } from "lucide-react";

// Mock data matching the screenshot
const mockCommits = [
    { repo: "puruvats57/react-github-profile", count: 7, color: "#f1e05a" }, // JavaScript
    { repo: "puruvats57/craftmyplate", count: 5, color: "#3178c6" }, // TypeScript
    { repo: "puruvats57/insyd", count: 3, color: "#3178c6" }, // TypeScript
    { repo: "puruvats57/nestjsTaskApp", count: 2, color: "#3178c6" }, // TypeScript
    { repo: "puruvats57/profile-page1", count: 1, color: "#3178c6" }, // TypeScript
];

const mockCreatedRepos = [
    { repo: "puruvats57/profile-page1", isPrivate: true, language: "TypeScript", color: "#3178c6", date: "Nov 26" },
    { repo: "puruvats57/react-github-profile", isPrivate: false, language: "JavaScript", color: "#f1e05a", date: "Nov 25" },
    { repo: "puruvats57/nestjsTaskApp", isPrivate: false, language: "TypeScript", color: "#3178c6", date: "Nov 21" },
    { repo: "puruvats57/craftmyplate", isPrivate: false, language: "TypeScript", color: "#3178c6", date: "Nov 17" },
    { repo: "puruvats57/insyd", isPrivate: false, language: "TypeScript", color: "#3178c6", date: "Nov 3" },
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

        <div className="space-y-6">
          {/* November 2025 */}
          <div>
            <div className="text-sm font-semibold pb-2 border-b border-border mb-4">
              November 2025
            </div>

            {/* Commits Section */}
            <div className="mb-6">
              <div className="flex items-start gap-3 mb-3">
                <GitCommit className="w-4 h-4 mt-0.5 text-muted-foreground"/>
                <div className="flex-1">
                  <div className="text-sm">
                    <span>Created </span>
                    <span className="font-semibold">18 commits</span>
                    <span> in </span>
                    <span className="font-semibold">5 repositories</span>
                  </div>
                </div>
              </div>

              <div className="ml-7 space-y-2">
                {mockCommits.map((commit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: commit.color }}/>
                    <a href="#" className="text-primary hover:underline">
                      {commit.repo}
                    </a>
                    <span className="text-muted-foreground">{commit.count} commits</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Created Repositories Section */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <GitBranch className="w-4 h-4 mt-0.5 text-muted-foreground"/>
                <div className="flex-1">
                  <div className="text-sm">
                    <span>Created </span>
                    <span className="font-semibold">5 repositories</span>
                  </div>
                </div>
              </div>

              <div className="ml-7 space-y-2">
                {mockCreatedRepos.map((repo, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    {repo.isPrivate && <Lock className="w-3 h-3 text-muted-foreground"/>}
                    <a href="#" className="text-primary hover:underline">
                      {repo.repo}
                    </a>
                    <span className="text-xs px-1.5 py-0.5 border border-border rounded text-muted-foreground">
                      {repo.isPrivate ? "Private" : "Public"}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.color }}/>
                      <span className="text-xs text-muted-foreground">{repo.language}</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-auto">{repo.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2">
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
