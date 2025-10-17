import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle, Calendar, User, FileText, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock incident data
const incidentData: Record<string, any[]> = {
  engineering: [
    {
      id: "ENG-001",
      commodity: "Engine Components",
      partNumber: "EC-2847-B",
      severity: "critical",
      description: "Valve timing mechanism showing premature wear in testing phase. Multiple units affected.",
      department: "Engineering",
      date: "2024-10-15",
      reporter: "John Smith",
      aiInsight: "Analysis indicates material fatigue due to thermal stress cycles exceeding design parameters. Recommend immediate review of heat treatment process and consideration of upgraded alloy specification. Historical data shows similar patterns in components exposed to sustained high-temperature operations. Suggest implementing enhanced cooling protocols and revised maintenance intervals to prevent field failures."
    },
    {
      id: "ENG-002",
      commodity: "Suspension System",
      partNumber: "SS-9821-A",
      severity: "high",
      description: "Irregular stress patterns detected in suspension mount during durability testing.",
      department: "Engineering",
      date: "2024-10-14",
      reporter: "Sarah Johnson",
      aiInsight: "Finite element analysis reveals stress concentration at weld joints. The current design shows 15% higher stress than optimal safety margins. Recommend geometric optimization of mounting bracket and reinforcement of critical load paths. Consider implementing progressive damping strategy to distribute loads more evenly across the assembly."
    },
    {
      id: "ENG-003",
      commodity: "Transmission",
      partNumber: "TR-4451-C",
      severity: "medium",
      description: "Minor vibration detected in gear mesh at specific RPM ranges.",
      department: "Engineering",
      date: "2024-10-13",
      reporter: "Michael Chen",
      aiInsight: "Resonance frequency analysis suggests harmonic interference between gear mesh frequency and housing natural frequency. Recommend slight modification to gear tooth profile or housing stiffness to shift resonance band outside operational range. This is a common NVH issue with straightforward mitigation strategies."
    }
  ],
  manufacturing: [
    {
      id: "MFG-001",
      commodity: "Assembly Line B",
      partNumber: "N/A",
      severity: "critical",
      description: "Automated welding station showing inconsistent weld quality on chassis components.",
      department: "Manufacturing",
      date: "2024-10-15",
      reporter: "David Miller",
      aiInsight: "Root cause analysis points to electrode wear exceeding replacement schedule combined with inadequate gas shielding. Quality metrics show 8% defect rate, well above acceptable thresholds. Immediate actions: implement predictive maintenance for welding equipment, increase frequency of gas flow verification, and retrain operators on defect identification protocols."
    },
    {
      id: "MFG-002",
      commodity: "Paint Shop",
      partNumber: "N/A",
      severity: "high",
      description: "Paint adhesion issues on 12% of units in recent batch.",
      department: "Manufacturing",
      date: "2024-10-14",
      reporter: "Lisa Anderson",
      aiInsight: "Environmental monitoring data reveals humidity levels outside specification during affected production window. Pre-treatment chemistry also shows dilution beyond acceptable limits. Recommend enhanced environmental controls, automated mixing systems for chemical baths, and implementation of real-time surface energy testing before paint application."
    }
  ],
  sales: [
    {
      id: "SLS-001",
      commodity: "Delivery Logistics",
      partNumber: "N/A",
      severity: "high",
      description: "Multiple customer complaints about delayed vehicle deliveries in Q4.",
      department: "Sales",
      date: "2024-10-15",
      reporter: "Robert Taylor",
      aiInsight: "Pattern analysis shows delays correlating with specific shipping routes and carrier performance. Customer satisfaction scores dropped 22% due to communication gaps during transit. Recommend implementing real-time tracking system with automated customer notifications, diversifying carrier portfolio, and establishing penalty clauses for missed delivery windows."
    },
    {
      id: "SLS-002",
      commodity: "Customer Configuration",
      partNumber: "N/A",
      severity: "medium",
      description: "Increased order modification requests causing production scheduling conflicts.",
      department: "Sales",
      date: "2024-10-13",
      reporter: "Emily White",
      aiInsight: "Data shows 34% of modifications occur within 48 hours of production start. Recommend implementing configuration lock periods with clear customer communication, enhanced visualization tools during ordering process, and flexible manufacturing cells that can accommodate late-stage customization without disrupting overall schedule."
    }
  ],
  quality: [
    {
      id: "QA-001",
      commodity: "Final Inspection",
      partNumber: "N/A",
      severity: "critical",
      description: "Defect detection rate dropped 15% despite no change in actual quality metrics.",
      department: "Quality",
      date: "2024-10-15",
      reporter: "James Wilson",
      aiInsight: "Statistical analysis reveals inspector fatigue during extended shifts and inadequate lighting in inspection zones 3-5. Human factors study recommends rotating inspection assignments every 90 minutes, implementing AI-assisted visual inspection systems to supplement human judgment, and upgrading lighting to 800+ lux with color temperature matching paint shop conditions."
    },
    {
      id: "QA-002",
      commodity: "Supplier Parts",
      partNumber: "SP-7734-M",
      severity: "high",
      description: "Batch variation in plastic component dimensions causing assembly issues.",
      department: "Quality",
      date: "2024-10-14",
      reporter: "Patricia Brown",
      aiInsight: "Supplier process capability study shows Cpk of 1.1, below industry standard of 1.33. Variation traces to inconsistent cooling times and mold temperature control. Recommend working with supplier to implement closed-loop temperature control, establish statistical process control with automated alarming, and consider dual-sourcing strategy for risk mitigation."
    }
  ],
  it: [
    {
      id: "IT-001",
      commodity: "ERP System",
      partNumber: "N/A",
      severity: "critical",
      description: "Production planning module experiencing intermittent data sync failures.",
      department: "IT",
      date: "2024-10-15",
      reporter: "Kevin Martinez",
      aiInsight: "Log analysis reveals database deadlock conditions during peak transaction periods, occurring 12-15 times daily. Network latency spikes correlate with backup operations. Recommend implementing transaction queue with priority handling, optimizing database indexes, shifting backup windows to low-usage periods, and establishing redundant sync pathways for critical data."
    },
    {
      id: "IT-002",
      commodity: "Network Infrastructure",
      partNumber: "N/A",
      severity: "medium",
      description: "Slow response times in CAD application during collaborative design sessions.",
      department: "IT",
      date: "2024-10-13",
      reporter: "Jennifer Garcia",
      aiInsight: "Bandwidth analysis shows network saturation during multi-user CAD operations, particularly when handling large assemblies. Current 1Gbps connection insufficient for concurrent high-resolution 3D workflows. Recommend upgrade to 10Gbps backbone, implementation of QoS policies prioritizing design traffic, and deployment of edge caching servers for frequently accessed design libraries."
    }
  ],
  hr: [
    {
      id: "HR-001",
      commodity: "Training Program",
      partNumber: "N/A",
      severity: "medium",
      description: "New hire onboarding completion rates below 75% within first 90 days.",
      department: "HR",
      date: "2024-10-14",
      reporter: "Amanda Rodriguez",
      aiInsight: "Survey data indicates information overload and lack of hands-on practice opportunities as primary barriers. Recommend restructuring onboarding into phased micro-learning modules with practical checkpoints, implementing buddy system for first 30 days, and developing interactive simulation environments for complex procedures before floor exposure."
    },
    {
      id: "HR-002",
      commodity: "Workforce Planning",
      partNumber: "N/A",
      severity: "low",
      description: "Skill gap emerging in electric vehicle technology among engineering staff.",
      department: "HR",
      date: "2024-10-12",
      reporter: "Christopher Lee",
      aiInsight: "Competency assessment reveals 60% of current engineering staff lack EV-specific training as product portfolio shifts. Recommend establishing partnership with technical universities for advanced EV courses, implementing internal knowledge transfer program pairing EV-experienced engineers with traditional powertrain engineers, and creating certification pathways for battery technology and power electronics."
    }
  ]
};

const IncidentDetail = () => {
  const { department, incidentId } = useParams<{ department: string; incidentId: string }>();
  const navigate = useNavigate();
  
  const deptKey = department?.toLowerCase() as keyof typeof incidentData;
  const incidents = incidentData[deptKey] || [];
  const incident = incidents.find(inc => inc.id === incidentId);

  if (!incident) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Incident not found</p>
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
          onClick={() => navigate(`/department/${department}`)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {department?.charAt(0).toUpperCase()}{department?.slice(1)} Department
        </Button>

        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-foreground">
              {incident.id}
            </h1>
            <Badge 
              variant="outline" 
              className={severityColors[incident.severity as keyof typeof severityColors]}
            >
              {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground">{incident.commodity}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-scale-in hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Incident Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Problem Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {incident.description}
                  </p>
                </div>
                
                {incident.partNumber && incident.partNumber !== "N/A" && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Part Number</h3>
                    <p className="text-muted-foreground font-mono">{incident.partNumber}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="animate-scale-in hover:shadow-lg transition-shadow" style={{ animationDelay: "0.1s" }}>
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI-Powered Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed text-base">
                    {incident.aiInsight}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Metadata
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Reported Date</p>
                    <p className="font-semibold text-foreground">{incident.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Reporter</p>
                    <p className="font-semibold text-foreground">{incident.reporter}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="font-semibold text-foreground">{incident.department}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
