import { useEffect, useState } from "react";
import { GitBranch, GitPullRequest, GitCommit, Lock } from "lucide-react";

// Language colors mapping
const getLanguageColor = (language) => {
    const colors = {
        JavaScript: "#f1e05a",
        TypeScript: "#3178c6",
        Python: "#3572A5",
        Java: "#b07219",
        "C++": "#f34b7d",
        C: "#555555",
        Go: "#00ADD8",
        Rust: "#dea584",
        PHP: "#4F5D95",
        Ruby: "#701516",
    };
    return colors[language] || "#586e75";
};

export const ActivityFeed = ({ username, selectedYear }) => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Fetch user's repositories
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setRepos(data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching repositories:", err);
                setLoading(false);
            });
    }, [username]);
    
    // Filter repos by selected year
    const reposInYear = repos.filter(repo => {
        const created = new Date(repo.created_at);
        const updated = new Date(repo.updated_at);
        const repoYear = created.getFullYear();
        const updatedYear = updated.getFullYear();
        // Include repos created or updated in the selected year
        return repoYear === selectedYear || updatedYear === selectedYear;
    });
    
    // Group repos by month for the selected year
    const reposByMonth = reposInYear.reduce((acc, repo) => {
        const created = new Date(repo.created_at);
        const month = created.toLocaleString('default', { month: 'long' });
        const monthYear = created.getFullYear();
        
        if (monthYear === selectedYear) {
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push(repo);
        }
        return acc;
    }, {});
    
    // Get months in reverse order (most recent first)
    const months = Object.keys(reposByMonth).sort((a, b) => {
        const monthA = new Date(`${a} 1, ${selectedYear}`);
        const monthB = new Date(`${b} 1, ${selectedYear}`);
        return monthB - monthA;
    });
    
    // Mock commit data filtered by year (in real app, would fetch from events API)
    const mockCommits = reposInYear.slice(0, 5).map((repo, idx) => ({
        repo: repo.full_name,
        count: [7, 5, 3, 2, 1][idx] || 1,
        color: getLanguageColor(repo.language),
    }));
    
    // Mock created repos filtered by selected year
    const mockCreatedRepos = reposInYear
        .filter(repo => {
            const created = new Date(repo.created_at);
            return created.getFullYear() === selectedYear;
        })
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5)
        .map((repo) => ({
            repo: repo.full_name,
            isPrivate: repo.private,
            language: repo.language || "Unknown",
            color: getLanguageColor(repo.language),
            date: new Date(repo.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        }));
    
    // Mock pull requests data filtered by year (in real app, would fetch from API)
    const mockPullRequests = reposInYear.slice(0, 5).map((repo, idx) => ({
        repo: repo.full_name,
        merged: [16, 6, 4, 1, 1][idx] || 0,
        open: idx === 0 ? 1 : 0, // Only first repo has open PRs
    }));
    const totalPRs = mockPullRequests.reduce((sum, pr) => sum + pr.merged + pr.open, 0);
    // Calculate contributed repos count
    const contributedRepos = repos.length;
    const displayedRepos = repos.slice(0, 3).map(r => r.full_name).join(", ");
    const otherReposCount = Math.max(0, contributedRepos - 3);
    
    return (<section className="space-y-6">
      <div>
        <h2 className="text-base font-semibold mb-4">Activity overview</h2>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <GitCommit className="w-4 h-4 text-muted-foreground"/>
              <span className="text-sm text-muted-foreground">Contributed to</span>
            </div>
            <div className="text-sm">
              {loading ? (
                <span className="text-muted-foreground">Loading...</span>
              ) : repos.length > 0 ? (
                <>
                  {repos.slice(0, 3).map((repo, idx) => (
                    <span key={repo.id}>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {repo.full_name}
                      </a>
                      {idx < Math.min(3, repos.length) - 1 && <span className="text-muted-foreground">, </span>}
                    </span>
                  ))}
                  {otherReposCount > 0 && (
                    <span className="text-muted-foreground"> and {otherReposCount} other {otherReposCount === 1 ? 'repository' : 'repositories'}</span>
                  )}
                </>
              ) : (
                <span className="text-muted-foreground">No repositories found</span>
              )}
            </div>
          </div>
          <div className="flex-1 border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <GitBranch className="w-4 h-4 text-muted-foreground"/>
              <span className="text-sm text-muted-foreground">Code review</span>
            </div>
            {/* Radar/Spider chart for contribution types */}
            <div className="relative w-24 h-24 mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Axes */}
                <line x1="50" y1="10" x2="50" y2="90" stroke="#e1e4e8" strokeWidth="1"/>
                <line x1="10" y1="50" x2="90" y2="50" stroke="#e1e4e8" strokeWidth="1"/>
                <line x1="20" y1="20" x2="80" y2="80" stroke="#e1e4e8" strokeWidth="1"/>
                <line x1="80" y1="20" x2="20" y2="80" stroke="#e1e4e8" strokeWidth="1"/>
                {/* Contribution area (83% Commits, 17% Pull requests) */}
                <polygon
                  points="50,10 50,20 75,50 50,80 25,50 50,20"
                  fill="#40c463"
                  fillOpacity="0.3"
                  stroke="#40c463"
                  strokeWidth="1"
                />
                {/* Labels */}
                <text x="50" y="8" textAnchor="middle" fontSize="8" fill="#586069">Code review</text>
                <text x="92" y="54" textAnchor="start" fontSize="8" fill="#586069">Issues</text>
                <text x="50" y="95" textAnchor="middle" fontSize="8" fill="#586069">Pull requests</text>
                <text x="8" y="54" textAnchor="end" fontSize="8" fill="#586069">Commits</text>
                {/* Percentages */}
                <text x="8" y="48" textAnchor="end" fontSize="9" fill="#24292e" fontWeight="600">83%</text>
                <text x="50" y="88" textAnchor="middle" fontSize="9" fill="#24292e" fontWeight="600">17%</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold mb-4">Contribution activity</h2>

        <div className="space-y-6">
          {/* Show activity for each month in the selected year */}
          {months.length > 0 ? (
            months.map((month) => {
              const monthRepos = reposByMonth[month] || [];
              if (monthRepos.length === 0) return null;
              
              const monthCommits = monthRepos.slice(0, 5).map((repo, idx) => ({
                repo: repo.full_name,
                count: [7, 5, 3, 2, 1][idx] || 1,
                color: getLanguageColor(repo.language),
              }));
              
              const monthCreatedRepos = monthRepos
                .filter(repo => {
                  const created = new Date(repo.created_at);
                  return created.toLocaleString('default', { month: 'long' }) === month;
                })
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 5)
                .map((repo) => ({
                  repo: repo.full_name,
                  isPrivate: repo.private,
                  language: repo.language || "Unknown",
                  color: getLanguageColor(repo.language),
                  date: new Date(repo.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                }));
              
              const monthPRs = monthRepos.slice(0, 5).map((repo, idx) => ({
                repo: repo.full_name,
                merged: [16, 6, 4, 1, 1][idx] || 0,
                open: idx === 0 ? 1 : 0,
              }));
              const monthTotalPRs = monthPRs.reduce((sum, pr) => sum + pr.merged + pr.open, 0);
              
              return (
                <div key={month}>
                  <div className="text-sm font-semibold pb-2 border-b border-border mb-4">
                    {month} {selectedYear}
                  </div>

                  {/* Commits Section */}
                  {monthCommits.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-start gap-3 mb-3">
                        <GitCommit className="w-4 h-4 mt-0.5 text-muted-foreground"/>
                        <div className="flex-1">
                          <div className="text-sm">
                            <span>Created </span>
                            <span className="font-semibold">{monthCommits.reduce((sum, c) => sum + c.count, 0)} {monthCommits.reduce((sum, c) => sum + c.count, 0) === 1 ? 'commit' : 'commits'}</span>
                            <span> in </span>
                            <span className="font-semibold">{monthCommits.length} {monthCommits.length === 1 ? 'repository' : 'repositories'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="ml-7 space-y-2">
                        {monthCommits.map((commit, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: commit.color }}/>
                            <a href={`https://github.com/${commit.repo}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {commit.repo}
                            </a>
                            <span className="text-muted-foreground">{commit.count} {commit.count === 1 ? 'commit' : 'commits'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pull Requests Section */}
                  {monthTotalPRs > 0 && (
                    <div className="mb-6">
                      <div className="flex items-start gap-3 mb-3">
                        <GitPullRequest className="w-4 h-4 mt-0.5 text-muted-foreground"/>
                        <div className="flex-1">
                          <div className="text-sm">
                            <span>Opened </span>
                            <span className="font-semibold">{monthTotalPRs} {monthTotalPRs === 1 ? 'pull request' : 'pull requests'}</span>
                            <span> in </span>
                            <span className="font-semibold">{monthPRs.length} {monthPRs.length === 1 ? 'repository' : 'repositories'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="ml-7 space-y-2">
                        {monthPRs.map((pr, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <a href={`https://github.com/${pr.repo}/pulls`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {pr.repo}
                            </a>
                            <span className="text-muted-foreground">
                              {pr.merged > 0 && <span>{pr.merged} merged</span>}
                              {pr.merged > 0 && pr.open > 0 && <span>, </span>}
                              {pr.open > 0 && <span>{pr.open} open</span>}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Created Repositories Section */}
                  {monthCreatedRepos.length > 0 && (
                    <div>
                      <div className="flex items-start gap-3 mb-3">
                        <GitBranch className="w-4 h-4 mt-0.5 text-muted-foreground"/>
                        <div className="flex-1">
                          <div className="text-sm">
                            <span>Created </span>
                            <span className="font-semibold">{monthCreatedRepos.length} {monthCreatedRepos.length === 1 ? 'repository' : 'repositories'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="ml-7 space-y-2">
                        {monthCreatedRepos.map((repo, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            {repo.isPrivate && <Lock className="w-3 h-3 text-muted-foreground"/>}
                            <a href={`https://github.com/${repo.repo}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {repo.repo}
                            </a>
                            <span className="text-xs px-1.5 py-0.5 border border-border rounded text-muted-foreground">
                              {repo.isPrivate ? "Private" : "Public"}
                            </span>
                            {repo.language && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.color }}/>
                                <span className="text-xs text-muted-foreground">{repo.language}</span>
                              </div>
                            )}
                            <span className="text-xs text-muted-foreground ml-auto">{repo.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-sm text-muted-foreground py-4">
              No activity found for {selectedYear}
            </div>
          )}

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
