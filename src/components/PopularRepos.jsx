import { Card } from "@/components/ui/card";
import { Star, GitFork, Code } from "lucide-react";
const mockRepos = [
    {
        name: "Compiler-Python-3-Interpreter",
        description: "Created file: https://github.com/Python-3/Python-3-Interpreter",
        language: "Python",
        stars: 4,
        forks: 2,
        languageColor: "#3572A5",
    },
    {
        name: "polygons",
        description: "a website project: prepare a program to generate",
        language: "JavaScript",
        stars: 0,
        forks: 0,
        languageColor: "#f1e05a",
    },
    {
        name: "buffoon",
        description: "a maven library to facilitate",
        language: "Java",
        stars: 3,
        forks: 1,
        languageColor: "#b07219",
    },
    {
        name: "multi-import-logger",
        description: "Protecta: logger-rest-api-01 multi-project logger: see PR request at",
        language: "Python",
        stars: 0,
        forks: 0,
        languageColor: "#3572A5",
    },
    {
        name: "multi-import-1",
        description: "Fork from: may-multi-import-8",
        language: "JavaScript",
        stars: 0,
        forks: 0,
        languageColor: "#f1e05a",
    },
    {
        name: "multi-1",
        description: "Fork from: april-multi-import-1",
        language: "TypeScript",
        stars: 1,
        forks: 0,
        languageColor: "#2b7489",
    },
];
export const PopularRepos = () => {
    return (<section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-normal">Popular repositories</h2>
        <button className="text-sm text-primary hover:underline">Customize your pins</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockRepos.map((repo) => (<Card key={repo.name} className="p-4 hover:bg-accent transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-muted-foreground"/>
                <a href="#" className="font-semibold text-primary hover:underline">
                  {repo.name}
                </a>
                <span className="text-xs px-2 py-0.5 border border-border rounded-full text-muted-foreground">
                  Public
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{repo.description}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.languageColor }}/>
                <span>{repo.language}</span>
              </div>
              {repo.stars > 0 && (<div className="flex items-center gap-1">
                  <Star className="w-3 h-3"/>
                  <span>{repo.stars}</span>
                </div>)}
              {repo.forks > 0 && (<div className="flex items-center gap-1">
                  <GitFork className="w-3 h-3"/>
                  <span>{repo.forks}</span>
                </div>)}
            </div>
          </Card>))}
      </div>
    </section>);
};
