import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const getLevelColor = (level) => {
    const colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
    return colors[level] || colors[0];
};

const getLevelFromCount = (count) => {
    if (count === 0) return 0;
    if (count < 3) return 1;
    if (count < 6) return 2;
    if (count < 10) return 3;
    return 4;
};

export const ContributionGraph = ({ username }) => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalContributions, setTotalContributions] = useState(0);
    
    const years = Array.from({ length: 7 }, (_, i) => currentYear - i);
    
    useEffect(() => {
        setLoading(true);
        // Fetch from GitHub Contributions API
        fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${selectedYear}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                // API returns: { total: {...}, contributions: [...] }
                // Each contribution has: { date: "YYYY-MM-DD", count: number }
                if (data && data.contributions && Array.isArray(data.contributions)) {
                    // Filter contributions for the selected year and sort by date
                    const yearContributions = data.contributions
                        .filter((day) => {
                            const dayYear = new Date(day.date).getFullYear();
                            return dayYear === selectedYear;
                        })
                        .map((day) => ({
                            date: day.date,
                            count: day.count || 0,
                            level: getLevelFromCount(day.count || 0),
                        }))
                        .sort((a, b) => new Date(a.date) - new Date(b.date));
                    
                    setContributions(yearContributions);
                    setTotalContributions(yearContributions.reduce((sum, day) => sum + day.count, 0));
                } else {
                    setContributions([]);
                    setTotalContributions(0);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching contributions:", err);
                setContributions([]);
                setTotalContributions(0);
                setLoading(false);
            });
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
    if (contributions.length > 0) {
        let currentWeek = [];
        const startDate = new Date(contributions[0].date);
        const startDayOfWeek = startDate.getDay();
        
        // Add empty days at the start of the first week
        for (let i = 0; i < startDayOfWeek; i++) {
            currentWeek.push({ date: "", count: 0, level: 0 });
        }
        
        contributions.forEach((day) => {
            currentWeek.push(day);
            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        });
        
        // Fill remaining days in the last week
        if (currentWeek.length > 0) {
            while (currentWeek.length < 7) {
                currentWeek.push({ date: "", count: 0, level: 0 });
            }
            weeks.push(currentWeek);
        }
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
