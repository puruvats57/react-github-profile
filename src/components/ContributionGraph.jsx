import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
// Generate mock contribution data for a specific year
const generateMockContributions = (year) => {
    const contributions = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const today = new Date();
    const actualEndDate = endDate > today ? today : endDate;
    
    for (let d = new Date(startDate); d <= actualEndDate; d.setDate(d.getDate() + 1)) {
        // Create more realistic patterns - more activity in certain months
        const month = d.getMonth();
        let count = 0;
        
        // Simulate activity patterns (more in Aug, Nov, Dec based on screenshot)
        if (month === 6) count = Math.floor(Math.random() * 5); // July - light
        else if (month === 7) count = Math.floor(Math.random() * 20); // August - heavy
        else if (month === 9) count = Math.floor(Math.random() * 8); // October - light
        else if (month === 10) count = Math.floor(Math.random() * 15); // November - medium
        else if (month === 11) count = Math.floor(Math.random() * 12); // December - medium
        else count = Math.floor(Math.random() * 3); // Other months - minimal
        
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
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalContributions, setTotalContributions] = useState(0);
    
    const years = Array.from({ length: 7 }, (_, i) => currentYear - i);
    
    useEffect(() => {
        // In a real implementation, you would fetch from GitHub's GraphQL API
        // For now, we'll use mock data
        setLoading(true);
        setTimeout(() => {
            const mockData = generateMockContributions(selectedYear);
            setContributions(mockData);
            setTotalContributions(mockData.reduce((sum, day) => sum + day.count, 0));
            setLoading(false);
        }, 300);
    }, [username, selectedYear]);
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
          {totalContributions} contributions in {selectedYear}
        </h2>
        <div className="flex items-center gap-2">
          <button className="text-sm text-muted-foreground hover:text-foreground">
            Contribution settings
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 border border-border rounded-lg p-4 bg-card overflow-x-auto">
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
        
        {/* Year Selector */}
        <div className="flex flex-col gap-1">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                selectedYear === year
                  ? "bg-blue-600 text-white font-medium"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </section>);
};
