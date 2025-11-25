import { useEffect, useState } from "react";
import { MapPin, Link as LinkIcon, Mail, Users, Building2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
export const ProfileSidebar = ({ username = "puruvats57" }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then((res) => res.json())
            .then((data) => {
            setUserData(data);
            setLoading(false);
        })
            .catch((err) => {
            console.error("Error fetching user data:", err);
            setLoading(false);
        });
    }, [username]);
    if (loading) {
        return (<aside className="w-full lg:w-80 space-y-4">
        <div className="animate-pulse">
          <div className="w-64 h-64 bg-muted rounded-full mx-auto mb-4"/>
          <div className="h-8 bg-muted rounded mb-2"/>
          <div className="h-6 bg-muted rounded mb-4"/>
        </div>
      </aside>);
    }
    if (!userData) {
        return <div className="text-muted-foreground">Failed to load user data</div>;
    }
    return (<aside className="w-full lg:w-80 space-y-4">
      <div className="flex flex-col items-start">
        <Avatar className="w-64 h-64 mb-4 border-2 border-border">
          <AvatarImage src={userData.avatar_url} alt={userData.name}/>
          <AvatarFallback>{userData.name?.[0] || userData.login[0]}</AvatarFallback>
        </Avatar>

        <div className="w-full">
          <h1 className="text-2xl font-semibold mb-1">{userData.name}</h1>
          <p className="text-xl text-muted-foreground mb-3">{userData.login}</p>

          <Button variant="secondary" className="w-full mb-4">
            Edit profile
          </Button>

          {userData.bio && <p className="text-base mb-4">{userData.bio}</p>}

          <div className="flex items-center gap-1 text-sm mb-3">
            <Users className="w-4 h-4"/>
            <button className="hover:text-primary">
              <span className="font-semibold">{userData.followers}</span> followers
            </button>
            <span className="mx-1">·</span>
            <button className="hover:text-primary">
              <span className="font-semibold">{userData.following}</span> following
            </button>
          </div>

          <div className="space-y-2 text-sm">
            {userData.company && (<div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground"/>
                <span>{userData.company}</span>
              </div>)}
            {userData.location && (<div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground"/>
                <span>{userData.location}</span>
              </div>)}
            {userData.email && (<div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground"/>
                <a href={`mailto:${userData.email}`} className="hover:text-primary hover:underline">
                  {userData.email}
                </a>
              </div>)}
            {userData.blog && (<div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-muted-foreground"/>
                <a href={userData.blog.startsWith("http") ? userData.blog : `https://${userData.blog}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline truncate">
                  {userData.blog}
                </a>
              </div>)}
            {userData.twitter_username && (<div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <a href={`https://twitter.com/${userData.twitter_username}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
                  @{userData.twitter_username}
                </a>
              </div>)}
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="text-base font-semibold mb-3">Organizations</h3>
        <div className="flex gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" alt="Org"/>
            <AvatarFallback>O1</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" alt="Org"/>
            <AvatarFallback>O2</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" alt="Org"/>
            <AvatarFallback>O3</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </aside>);
};
