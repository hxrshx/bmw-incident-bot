import { AlertCircle, TrendingUp, BarChart3, Package, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";

const departments = [
  {
    name: "Engineering",
    icon: Settings,
    stats: {
      total: 24,
      critical: 3,
      high: 8,
      medium: 10,
      low: 3,
    },
    aiInsight: "Recent trends show increased issues with component durability. AI recommends review of material specifications and testing protocols.",
  },
  {
    name: "Manufacturing",
    icon: Package,
    stats: {
      total: 31,
      critical: 5,
      high: 12,
      medium: 11,
      low: 3,
    },
    aiInsight: "Production line efficiency declining in sector B. AI suggests equipment maintenance and operator retraining on quality standards.",
  },
  {
    name: "Sales",
    icon: TrendingUp,
    stats: {
      total: 12,
      critical: 1,
      high: 3,
      medium: 6,
      low: 2,
    },
    aiInsight: "Customer feedback indicates delivery delays. AI recommends improved coordination with logistics and enhanced communication protocols.",
  },
  {
    name: "Quality",
    icon: BarChart3,
    stats: {
      total: 18,
      critical: 2,
      high: 6,
      medium: 8,
      low: 2,
    },
    aiInsight: "Inspection process bottlenecks identified. AI suggests automated quality checks and parallel inspection workflows to reduce delays.",
  },
  {
    name: "IT",
    icon: AlertCircle,
    stats: {
      total: 9,
      critical: 1,
      high: 2,
      medium: 4,
      low: 2,
    },
    aiInsight: "System integration issues detected. AI recommends API standardization and enhanced monitoring for critical business systems.",
  },
  {
    name: "HR",
    icon: Users,
    stats: {
      total: 6,
      critical: 0,
      high: 1,
      medium: 3,
      low: 2,
    },
    aiInsight: "Training completion rates below target. AI suggests implementing gamified learning modules and flexible training schedules.",
  },
];

const DepartmentSummary = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Department Summary Dashboard
          </h1>
          <p className="text-muted-foreground">
            AI-powered insights and incident analytics across all departments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <Link
                key={dept.name}
                to={`/department/${dept.name.toLowerCase()}`}
                className="bg-card rounded-lg shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow block"
              >
                <div className="bg-primary p-6">
                  <div className="flex items-center gap-3 text-primary-foreground">
                    <Icon className="h-8 w-8" />
                    <h2 className="text-2xl font-bold">{dept.name}</h2>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-bold text-foreground">
                        {dept.stats.total}
                      </span>
                      <span className="text-muted-foreground">total incidents</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className="bg-status-critical/10 border-status-critical text-status-critical"
                        >
                          Critical
                        </Badge>
                        <span className="font-semibold text-foreground">{dept.stats.critical}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className="bg-status-high/10 border-status-high text-status-high"
                        >
                          High
                        </Badge>
                        <span className="font-semibold text-foreground">{dept.stats.high}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className="bg-status-medium/10 border-status-medium text-status-medium"
                        >
                          Medium
                        </Badge>
                        <span className="font-semibold text-foreground">{dept.stats.medium}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className="bg-status-low/10 border-status-low text-status-low"
                        >
                          Low
                        </Badge>
                        <span className="font-semibold text-foreground">{dept.stats.low}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      AI Insights
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {dept.aiInsight}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DepartmentSummary;
