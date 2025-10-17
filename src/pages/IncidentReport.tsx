import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, Send } from "lucide-react";
import Navigation from "@/components/Navigation";

const formSchema = z.object({
  commodity: z.string().min(1, "Commodity is required"),
  partNumber: z.string().optional(),
  supplier: z.string().optional(),
  problemDescription: z.string().min(10, "Problem description must be at least 10 characters"),
  missedDetection: z.string().min(1, "Missed detection is required"),
  providedSolution: z.string().min(1, "Provided solution is required"),
  department: z.string().min(1, "Department is required"),
  severity: z.string().min(1, "Severity is required"),
  attachments: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

const departments = [
  "Engineering",
  "Manufacturing",
  "Sales",
  "Quality",
  "IT",
  "HR",
];

const severityLevels = ["Critical", "High", "Medium", "Low"];

const IncidentReport = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const department = watch("department");
  const severity = watch("severity");

  const onSubmit = (data: FormData) => {
    const timestamp = new Date().toISOString();
    const formDataWithTimestamp = {
      ...data,
      timestamp,
      attachments: selectedFiles ? Array.from(selectedFiles).map(f => f.name) : [],
    };
    
    console.log("Form submitted:", formDataWithTimestamp);
    toast.success("Incident report submitted successfully!");
    reset();
    setSelectedFiles(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Incident Report Form
          </h1>
          <p className="text-muted-foreground mb-8">
            Fill out this form to report any incidents or issues
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="commodity" className="text-foreground">
                  Commodity <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="commodity"
                  {...register("commodity")}
                  className="mt-1.5"
                  placeholder="Enter commodity"
                />
                {errors.commodity && (
                  <p className="text-destructive text-sm mt-1">{errors.commodity.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="partNumber" className="text-foreground">
                  Part Number
                </Label>
                <Input
                  id="partNumber"
                  {...register("partNumber")}
                  className="mt-1.5"
                  placeholder="Enter part number (optional)"
                />
              </div>

              <div>
                <Label htmlFor="supplier" className="text-foreground">
                  Supplier
                </Label>
                <Input
                  id="supplier"
                  {...register("supplier")}
                  className="mt-1.5"
                  placeholder="Enter supplier (optional)"
                />
              </div>

              <div>
                <Label htmlFor="department" className="text-foreground">
                  Department <span className="text-destructive">*</span>
                </Label>
                <Select
                  onValueChange={(value) => setValue("department", value)}
                  value={department}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-destructive text-sm mt-1">{errors.department.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="severity" className="text-foreground">
                  Severity <span className="text-destructive">*</span>
                </Label>
                <Select
                  onValueChange={(value) => setValue("severity", value)}
                  value={severity}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {severityLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.severity && (
                  <p className="text-destructive text-sm mt-1">{errors.severity.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="missedDetection" className="text-foreground">
                Missed Detection <span className="text-destructive">*</span>
              </Label>
              <Input
                id="missedDetection"
                {...register("missedDetection")}
                className="mt-1.5"
                placeholder="Describe what was missed"
              />
              {errors.missedDetection && (
                <p className="text-destructive text-sm mt-1">{errors.missedDetection.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="problemDescription" className="text-foreground">
                Problem Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="problemDescription"
                {...register("problemDescription")}
                className="mt-1.5 min-h-[120px]"
                placeholder="Provide a detailed description of the problem"
              />
              {errors.problemDescription && (
                <p className="text-destructive text-sm mt-1">{errors.problemDescription.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="providedSolution" className="text-foreground">
                Provided Solution <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="providedSolution"
                {...register("providedSolution")}
                className="mt-1.5 min-h-[120px]"
                placeholder="Describe the solution or proposed fix"
              />
              {errors.providedSolution && (
                <p className="text-destructive text-sm mt-1">{errors.providedSolution.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="attachments" className="text-foreground">
                Attachments (Images)
              </Label>
              <div className="mt-1.5">
                <label
                  htmlFor="attachments"
                  className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors bg-muted/30"
                >
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload images or drag and drop
                    </p>
                    {selectedFiles && (
                      <p className="text-sm text-primary mt-2">
                        {selectedFiles.length} file(s) selected
                      </p>
                    )}
                  </div>
                  <input
                    id="attachments"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Send className="mr-2 h-5 w-5" />
              Submit Incident Report
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IncidentReport;
