import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Users, Mail, Phone, User, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageName: string;
  price: string;
}

export const BookingDialog = ({ open, onOpenChange, packageName, price }: BookingDialogProps) => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelers: "1",
    specialRequests: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast.error("Please select a travel date");
      return;
    }

    toast.success("Booking request submitted successfully! We'll contact you soon.", {
      description: `Package: ${packageName} | Date: ${format(date, "PPP")}`
    });
    
    onOpenChange(false);
    
    // Reset form
    setDate(undefined);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      travelers: "1",
      specialRequests: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
            Book Your Adventure
          </DialogTitle>
          <DialogDescription className="text-base">
            You're booking: <span className="font-semibold text-foreground">{packageName}</span> • {price}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Travel Date */}
          <div className="space-y-2 animate-fade-in">
            <Label htmlFor="date" className="text-base font-semibold flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-primary" />
              Select Travel Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-12",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick your travel date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Personal Information */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="h-12"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12"
                  required
                />
              </div>
            </div>
          </div>

          {/* Travel Details */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h3 className="text-lg font-semibold text-foreground">Travel Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="travelers" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Number of Travelers
              </Label>
              <Select
                value={formData.travelers}
                onValueChange={(value) => setFormData({ ...formData, travelers: value })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Traveler" : "Travelers"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requests" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Special Requests (Optional)
              </Label>
              <Textarea
                id="requests"
                placeholder="Any dietary restrictions, accessibility needs, or special preferences..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="min-h-[100px]"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-gradient-ocean hover:shadow-glow transition-all duration-300"
            >
              Confirm Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
