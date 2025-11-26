import { useState, useEffect } from "react";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { ProfileTabs } from "@/components/ProfileTabs";
import { Search, Bell, Plus, Menu, Users, GitPullRequest, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Index = () => {
    const username = "puruvats57";
    const [activeTab, setActiveTab] = useState("overview");
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then((res) => res.json())
            .then((data) => {
                setUserData(data);
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
            });
    }, [username]);
    
    return (<div className="min-h-screen bg-github-canvas">
      {/* Header */}
      <header className="bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-muted rounded-md">
                <Menu className="w-5 h-5"/>
              </button>
              <svg className="w-8 h-8" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>
              </svg>
              <span className="font-semibold text-sm text-foreground">{username}</span>
            </div>

            <div className="flex items-center gap-2 flex-1 justify-end">
              <nav className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 px-1.5">
                  <Users className="w-4 h-4"/>
                  <ChevronDown className="w-3 h-3 ml-0.5"/>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-1.5">
                  <Plus className="w-4 h-4"/>
                  <ChevronDown className="w-3 h-3 ml-0.5"/>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <Bell className="w-4 h-4"/>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <GitPullRequest className="w-4 h-4"/>
                </Button>
              </nav>

              <div className="max-w-xl w-full ml-4 mr-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <Input type="search" placeholder="Type / to search" className="pl-10 pr-12 bg-muted border-border w-full"/>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-xs bg-background border border-border rounded px-1.5 py-0.5 text-muted-foreground font-mono">/</span>
                  </div>
                </div>
              </div>

              <div className="relative cursor-pointer">
                {userData ? (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={userData.avatar_url} alt={userData.name}/>
                    <AvatarFallback>{userData.name?.[0] || userData.login[0]}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-muted border border-border"/>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-card"/>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Tabs Navigation - Below Header */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4">
            <TabsList className="h-auto p-0 bg-transparent border-0 gap-0">
              <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium data-[state=active]:text-foreground text-muted-foreground">
                Overview
              </TabsTrigger>
              <TabsTrigger value="repositories" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium data-[state=active]:text-foreground text-muted-foreground">
                Repositories
                <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-muted rounded-full font-normal">42</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium data-[state=active]:text-foreground text-muted-foreground">
                Projects
              </TabsTrigger>
              <TabsTrigger value="packages" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium data-[state=active]:text-foreground text-muted-foreground">
                Packages
              </TabsTrigger>
              <TabsTrigger value="stars" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium data-[state=active]:text-foreground text-muted-foreground">
                Stars
                <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-muted rounded-full font-normal">2</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <ProfileSidebar username={username}/>
            <div className="flex-1 min-w-0">
              <ProfileTabs username={username}/>
            </div>
          </div>
        </main>
      </Tabs>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary hover:underline">
              © 2025 GitHub, Inc.
            </a>
            <a href="#" className="hover:text-primary hover:underline">
              Terms
            </a>
            <a href="#" className="hover:text-primary hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:text-primary hover:underline">
              Security
            </a>
            <a href="#" className="hover:text-primary hover:underline">
              Status
            </a>
            <a href="#" className="hover:text-primary hover:underline">
              Docs
            </a>
            <a href="#" className="hover:text-primary hover:underline">
              Contact GitHub
            </a>
            <a href="#" className="hover:text-primary hover:underline">
              Pricing
            </a>
            <a href="#" className="hover:text-primary hover:underline">
              API
            </a>
            <a href="#" className="hover:text-primary hover:underline">
              Training
            </a>
            <a href="#" className="hover:text-primary hover:underline">
              Blog
            </a>
            <a href="#" className="hover:text-primary hover:underline">
              About
            </a>
          </div>
        </div>
      </footer>
    </div>);
};
export default Index;
