import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PopularRepos } from "./PopularRepos";
import { ContributionGraph } from "./ContributionGraph";
import { ActivityFeed } from "./ActivityFeed";
export const ProfileTabs = ({ username }) => {
    return (<Tabs defaultValue="overview" className="w-full">
      <div className="border-b border-border mb-6">
        <TabsList className="h-auto p-0 bg-transparent border-0">
          <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3">
            Overview
          </TabsTrigger>
          <TabsTrigger value="repositories" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3">
            Repositories
            <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-muted rounded-full">39</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3">
            Projects
          </TabsTrigger>
          <TabsTrigger value="packages" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3">
            Packages
          </TabsTrigger>
          <TabsTrigger value="stars" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3">
            Stars
            <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-muted rounded-full">6</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="space-y-6 mt-0">
        <PopularRepos />
        <ContributionGraph username={username}/>
        <ActivityFeed />
      </TabsContent>

      <TabsContent value="repositories" className="mt-0">
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">Repository list view</p>
          <p className="text-sm mt-2">This tab is functional but content is not implemented</p>
        </div>
      </TabsContent>

      <TabsContent value="projects" className="mt-0">
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">Projects view</p>
          <p className="text-sm mt-2">This tab is functional but content is not implemented</p>
        </div>
      </TabsContent>

      <TabsContent value="packages" className="mt-0">
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">Packages view</p>
          <p className="text-sm mt-2">This tab is functional but content is not implemented</p>
        </div>
      </TabsContent>

      <TabsContent value="stars" className="mt-0">
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">Starred repositories</p>
          <p className="text-sm mt-2">This tab is functional but content is not implemented</p>
        </div>
      </TabsContent>
    </Tabs>);
};
