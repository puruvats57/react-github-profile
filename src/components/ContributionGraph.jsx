import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
// Generate mock contribution data for the last year
const generateMockContributions = () => {
    const contributions = [];
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
        const count = Math.floor(Math.random() * 15);
        const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4;
        contributions.push({
            date: new Date(d).toISOString().split("T")[0],
            count,
            level: level,
        });
    }
    return contributions;
};
const getLevelColor = (level) => {
    const colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
    return colors[level] || colors[0];
};
export const ContributionGraph = ({ username }) => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalContributions, setTotalContributions] = useState(0);
    useEffect(() => {
        // In a real implementation, you would fetch from GitHub's GraphQL API
        // For now, we'll use mock data
        setTimeout(() => {
            const mockData = generateMockContributions();
            setContributions(mockData);
            setTotalContributions(mockData.reduce((sum, day) => sum + day.count, 0));
            setLoading(false);
        }, 500);
    }, [username]);
    if (loading) {
        return (<section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-normal">Loading contributions...</h2>
        </div>
        <Skeleton className="h-32 w-full rounded-lg"/>
      </section>);
    }
    // Group contributions by week
    const weeks = [];
    let currentWeek = [];
    const startDayOfWeek = new Date(contributions[0].date).getDay();
    for (let i = 0; i < startDayOfWeek; i++) {
        currentWeek.push({ date: "", count: 0, level: 0 });
    }
    contributions.forEach((day, index) => {
        currentWeek.push(day);
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });
    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
            currentWeek.push({ date: "", count: 0, level: 0 });
        }
        weeks.push(currentWeek);
    }
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return (<section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-normal">
          {totalContributions} contributions in the last year
        </h2>
        <button className="text-sm text-muted-foreground hover:text-foreground">
          Contribution settings
        </button>
      </div>

      <div className="border border-border rounded-lg p-4 bg-card overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Month labels */}
          <div className="flex mb-2 text-xs text-muted-foreground pl-12">
            {months.map((month, idx) => (<div key={idx} className="flex-1">
                {month}
              </div>))}
          </div>

          {/* Contribution grid */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col justify-around text-xs text-muted-foreground pr-2">
              <div>Mon</div>
              <div>Wed</div>
              <div>Fri</div>
            </div>

            {/* Weeks */}
            <div className="flex gap-1">
              {weeks.map((week, weekIdx) => (<div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((day, dayIdx) => (<div key={dayIdx} className="w-3 h-3 rounded-sm cursor-pointer hover:ring-1 hover:ring-foreground transition-all" style={{
                    backgroundColor: day.date ? getLevelColor(day.level) : "transparent",
                }} title={day.date ? `${day.count} contributions on ${day.date}` : ""}/>))}
                </div>))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <a href="#" className="hover:text-primary hover:underline">
              Learn how we count contributions
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (<div key={level} className="w-3 h-3 rounded-sm" style={{ backgroundColor: getLevelColor(level) }}/>))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>);
};
