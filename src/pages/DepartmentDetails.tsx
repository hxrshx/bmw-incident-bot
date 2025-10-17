import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, BarChart3, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const departmentData = {
  engineering: {
    name: "Engineering",
    stats: {
      total: 24,
      critical: 3,
      high: 8,
      medium: 10,
      low: 3,
    },
    aiInsight: "Recent trends show increased issues with component durability. AI recommends review of material specifications and testing protocols.",
    incidents: [
      {
        id: "ENG-001",
        commodity: "Engine Components",
        severity: "critical",
        description: "Valve timing mechanism showing premature wear in testing phase.",
        date: "2024-10-15"
      },
      {
        id: "ENG-002",
        commodity: "Suspension System",
        severity: "high",
        description: "Irregular stress patterns detected in suspension mount during durability testing.",
        date: "2024-10-14"
      },
      {
        id: "ENG-003",
        commodity: "Transmission",
        severity: "medium",
        description: "Minor vibration detected in gear mesh at specific RPM ranges.",
        date: "2024-10-13"
      }
    ]
  },
  manufacturing: {
    name: "Manufacturing",
    stats: {
      total: 31,
      critical: 5,
      high: 12,
      medium: 11,
      low: 3,
    },
    aiInsight: "Production line efficiency declining in sector B. AI suggests equipment maintenance and operator retraining on quality standards.",
    incidents: [
      {
        id: "MFG-001",
        commodity: "Assembly Line B",
        severity: "critical",
        description: "Automated welding station showing inconsistent weld quality on chassis components.",
        date: "2024-10-15"
      },
      {
        id: "MFG-002",
        commodity: "Paint Shop",
        severity: "high",
        description: "Paint adhesion issues on 12% of units in recent batch.",
        date: "2024-10-14"
      }
    ]
  },
  sales: {
    name: "Sales",
    stats: {
      total: 12,
      critical: 1,
      high: 3,
      medium: 6,
      low: 2,
    },
    aiInsight: "Customer feedback indicates delivery delays. AI recommends improved coordination with logistics and enhanced communication protocols.",
    incidents: [
      {
        id: "SLS-001",
        commodity: "Delivery Logistics",
        severity: "high",
        description: "Multiple customer complaints about delayed vehicle deliveries in Q4.",
        date: "2024-10-15"
      },
      {
        id: "SLS-002",
        commodity: "Customer Configuration",
        severity: "medium",
        description: "Increased order modification requests causing production scheduling conflicts.",
        date: "2024-10-13"
      }
    ]
  },
  quality: {
    name: "Quality",
    stats: {
      total: 18,
      critical: 2,
      high: 6,
      medium: 8,
      low: 2,
    },
    aiInsight: "Inspection process bottlenecks identified. AI suggests automated quality checks and parallel inspection workflows to reduce delays.",
    incidents: [
      {
        id: "QA-001",
        commodity: "Final Inspection",
        severity: "critical",
        description: "Defect detection rate dropped 15% despite no change in actual quality metrics.",
        date: "2024-10-15"
      },
      {
        id: "QA-002",
        commodity: "Supplier Parts",
        severity: "high",
        description: "Batch variation in plastic component dimensions causing assembly issues.",
        date: "2024-10-14"
      }
    ]
  },
  it: {
    name: "IT",
    stats: {
      total: 9,
      critical: 1,
      high: 2,
      medium: 4,
      low: 2,
    },
    aiInsight: "System integration issues detected. AI recommends API standardization and enhanced monitoring for critical business systems.",
    incidents: [
      {
        id: "IT-001",
        commodity: "ERP System",
        severity: "critical",
        description: "Production planning module experiencing intermittent data sync failures.",
        date: "2024-10-15"
      },
      {
        id: "IT-002",
        commodity: "Network Infrastructure",
        severity: "medium",
        description: "Slow response times in CAD application during collaborative design sessions.",
        date: "2024-10-13"
      }
    ]
  },
  hr: {
    name: "HR",
    stats: {
      total: 6,
      critical: 0,
      high: 1,
      medium: 3,
      low: 2,
    },
    aiInsight: "Training completion rates below target. AI suggests implementing gamified learning modules and flexible training schedules.",
    incidents: [
      {
        id: "HR-001",
        commodity: "Training Program",
        severity: "medium",
        description: "New hire onboarding completion rates below 75% within first 90 days.",
        date: "2024-10-14"
      },
      {
        id: "HR-002",
        commodity: "Workforce Planning",
        severity: "low",
        description: "Skill gap emerging in electric vehicle technology among engineering staff.",
        date: "2024-10-12"
      }
    ]
  },
};

const DepartmentDetails = () => {
  const { department } = useParams<{ department: string }>();
  const navigate = useNavigate();
  
  const deptKey = department?.toLowerCase() as keyof typeof departmentData;
  const dept = departmentData[deptKey];

  if (!dept) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Department not found</p>
        </div>
      </div>
    );
  }

  const severityColors = {
    critical: "bg-status-critical/10 border-status-critical text-status-critical",
    high: "bg-status-high/10 border-status-high text-status-high",
    medium: "bg-status-medium/10 border-status-medium text-status-medium",
    low: "bg-status-low/10 border-status-low text-status-low",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/summary")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Summary
        </Button>

        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {dept.name} Department
          </h1>
          <p className="text-muted-foreground">
            Detailed incident analytics and AI-powered insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Total Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-6xl font-bold text-foreground">
                  {dept.stats.total}
                </span>
                <span className="text-lg text-muted-foreground">incidents reported</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-status-critical/10 border border-status-critical/20">
                  <Badge 
                    variant="outline" 
                    className="bg-status-critical/10 border-status-critical text-status-critical"
                  >
                    Critical
                  </Badge>
                  <span className="text-xl font-bold text-foreground">{dept.stats.critical}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-status-high/10 border border-status-high/20">
                  <Badge 
                    variant="outline" 
                    className="bg-status-high/10 border-status-high text-status-high"
                  >
                    High
                  </Badge>
                  <span className="text-xl font-bold text-foreground">{dept.stats.high}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-status-medium/10 border border-status-medium/20">
                  <Badge 
                    variant="outline" 
                    className="bg-status-medium/10 border-status-medium text-status-medium"
                  >
                    Medium
                  </Badge>
                  <span className="text-xl font-bold text-foreground">{dept.stats.medium}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-status-low/10 border border-status-low/20">
                  <Badge 
                    variant="outline" 
                    className="bg-status-low/10 border-status-low text-status-low"
                  >
                    Low
                  </Badge>
                  <span className="text-xl font-bold text-foreground">{dept.stats.low}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Department-Level AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-relaxed text-base">
                  {dept.aiInsight}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-primary" />
            All Incidents
          </h2>
          <p className="text-muted-foreground mt-1">
            Click on any incident to view detailed AI analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dept.incidents.map((incident, index) => (
            <Link
              key={incident.id}
              to={`/department/${department}/incident/${incident.id}`}
              className="block animate-scale-in hover:scale-105 transition-transform duration-200"
              style={{ animationDelay: `${0.2 + index * 0.05}s` }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{incident.id}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={severityColors[incident.severity as keyof typeof severityColors]}
                    >
                      {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-primary">{incident.commodity}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {incident.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{incident.date}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
