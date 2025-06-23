import { useState } from "react";
import { AlertCircleIcon, CheckCircleIcon, ClockIcon, UserIcon, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Textarea } from "@/components/ui/Textarea";

// Mapping badge by status (JS only, removed BookingStatus type)
const getStatusBadge = (status) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Pending</Badge>;
    case "assigned":
      return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Driver Assigned</Badge>;
    case "driver_accepted":
      return <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200">Driver Accepted</Badge>;
    case "confirmed":
      return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Confirmed</Badge>;
    case "cancelled":
      return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Cancelled</Badge>;
    case "no_driver":
      return <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">No Driver Available</Badge>;
    case "external_driver":
      return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">External Driver</Badge>;
    default:
      return null;
  }
};

const getStatusProgress = (status) => {
  switch (status) {
    case "pending": return 25;
    case "assigned": return 50;
    case "driver_accepted": return 75;
    case "no_driver": return 50;
    case "external_driver": return 75;
    case "confirmed": return 100;
    case "cancelled": return 100;
    default: return 0;
  }
};

const BookingItem = ({
  id,
  customerName,
  date,
  time,
  persons,
  status,
  package: packageName,
}) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [expanded, setExpanded] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [driverResponseDialog, setDriverResponseDialog] = useState(false);

  const assignDriver = () => {
    console.log("Assigning driver to booking", id);
    setCurrentStatus("assigned");
    setTimeout(() => {
      setDriverResponseDialog(true);
    }, 3000);
  };

  const handleDriverResponse = (accepted) => {
    if (accepted) {
      console.log("Driver accepted booking", id);
      setCurrentStatus("driver_accepted");
    } else {
      console.log("Driver rejected booking", id);
      setDriverResponseDialog(false);
    }
  };

  const useExternalDriver = () => {
    console.log("Using external driver for booking", id);
    setCurrentStatus("external_driver");
  };

  const noDriverAvailable = () => {
    console.log("No driver available for booking", id);
    setCurrentStatus("no_driver");
  };

  const confirmBooking = () => {
    console.log("Confirming booking", id);
    setCurrentStatus("confirmed");
  };

  const cancelBooking = () => {
    if (cancelReason.trim() === "") return;
    console.log("Cancelling booking", id, "Reason:", cancelReason);
    setCurrentStatus("cancelled");
    setCancelDialogOpen(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-3">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 sm:gap-0">
          <div>
            <div className="flex items-center">
              <h3 className="font-semibold text-safari-forest">{customerName}</h3>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-500">Booking #{id}</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <ClockIcon className="h-3.5 w-3.5 mr-1" />
              {date}, {time} • {persons} {persons === 1 ? "Person" : "Persons"} • {packageName}
            </div>
          </div>
          <div className="flex items-center">
            {getStatusBadge(currentStatus)}
            <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
              {expanded ? "Hide" : "Details"}
            </Button>
          </div>
        </div>

        {currentStatus !== "cancelled" && currentStatus !== "confirmed" && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Pending</span>
              <span className="text-center">Driver</span>
              <span className="text-right">Confirmed</span>
            </div>
            <Progress value={getStatusProgress(currentStatus)} className="h-1.5" />
          </div>
        )}

        {expanded && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Customer Details</h4>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="text-gray-500">Name:</span> {customerName}</p>
                  <p><span className="text-gray-500">Phone:</span> +94 75 123 4567</p>
                  <p><span className="text-gray-500">Email:</span> customer@example.com</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Safari Details</h4>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="text-gray-500">Date:</span> {date}</p>
                  <p><span className="text-gray-500">Time:</span> {time}</p>
                  <p><span className="text-gray-500">Duration:</span> 3 hours</p>
                  <p><span className="text-gray-500">Type:</span> {packageName}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {currentStatus === "pending" && (
                <Button size="sm" className="bg-safari-teal hover:bg-safari-teal/80" onClick={assignDriver}>
                  Assign Driver
                </Button>
              )}
              {currentStatus === "assigned" && (
                <Button size="sm" variant="outline" className="border-amber-200 text-amber-600" onClick={() => setDriverResponseDialog(true)}>
                  Check Driver Response
                </Button>
              )}
              {currentStatus === "no_driver" && (
                <div className="space-x-2 w-full">
                  <Button size="sm" className="bg-safari-teal hover:bg-safari-teal/80" onClick={useExternalDriver}>
                    <UserIcon className="h-4 w-4 mr-1" />
                    Use External Driver
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => setCancelDialogOpen(true)}>
                    <XCircleIcon className="h-4 w-4 mr-1" />
                    Cancel Safari
                  </Button>
                </div>
              )}
              {(currentStatus === "driver_accepted" || currentStatus === "external_driver") && (
                <Button size="sm" className="bg-safari-teal hover:bg-safari-teal/80" onClick={confirmBooking}>
                  Confirm Booking
                </Button>
              )}
              {currentStatus !== "cancelled" && currentStatus !== "confirmed" && (
                <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => setCancelDialogOpen(true)}>
                  <XCircleIcon className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Driver Response Dialog */}
      <Dialog open={driverResponseDialog} onOpenChange={setDriverResponseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Driver Response</DialogTitle>
            <DialogDescription>The assigned driver has responded to the booking request.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3 text-sm text-gray-500">
            <p><strong>Driver:</strong> John Doe</p>
            <p><strong>Vehicle:</strong> Safari Jeep #128</p>
            <p><strong>Status:</strong> <span className="text-red-500">Unavailable for this booking</span></p>
            <p><strong>Reason:</strong> Vehicle under maintenance</p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button type="button" variant="outline" onClick={() => { setDriverResponseDialog(false); useExternalDriver(); }}>
              Use External Driver
            </Button>
            <Button type="button" variant="destructive" onClick={() => { setDriverResponseDialog(false); noDriverAvailable(); }}>
              No Driver Available
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Safari Booking</DialogTitle>
            <DialogDescription>Please provide a reason for cancellation.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Reason for cancellation..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Go Back
            </Button>
            <Button type="button" variant="destructive" onClick={cancelBooking} disabled={cancelReason.trim() === ""}>
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingItem;
