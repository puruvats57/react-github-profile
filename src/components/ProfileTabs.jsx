import { Fragment } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { PopularRepos } from "./PopularRepos";
import { ContributionGraph } from "./ContributionGraph";
import { ActivityFeed } from "./ActivityFeed";
export const ProfileTabs = ({ username }) => {
    return (<Fragment>
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
    </Fragment>);
};
