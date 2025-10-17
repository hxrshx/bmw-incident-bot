import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart3 } from "lucide-react";
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

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {dept.name} Department
          </h1>
          <p className="text-muted-foreground">
            Detailed incident analytics and AI-powered insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
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

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-status-critical/10 border border-status-critical/20">
                  <Badge 
                    variant="outline" 
                    className="bg-status-critical/10 border-status-critical text-status-critical"
                  >
                    Critical
                  </Badge>
                  <span className="text-2xl font-bold text-foreground">{dept.stats.critical}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-status-high/10 border border-status-high/20">
                  <Badge 
                    variant="outline" 
                    className="bg-status-high/10 border-status-high text-status-high"
                  >
                    High
                  </Badge>
                  <span className="text-2xl font-bold text-foreground">{dept.stats.high}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-status-medium/10 border border-status-medium/20">
                  <Badge 
                    variant="outline" 
                    className="bg-status-medium/10 border-status-medium text-status-medium"
                  >
                    Medium
                  </Badge>
                  <span className="text-2xl font-bold text-foreground">{dept.stats.medium}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-status-low/10 border border-status-low/20">
                  <Badge 
                    variant="outline" 
                    className="bg-status-low/10 border-status-low text-status-low"
                  >
                    Low
                  </Badge>
                  <span className="text-2xl font-bold text-foreground">{dept.stats.low}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-relaxed text-base">
                  {dept.aiInsight}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
