import { useState, useEffect } from "react";
import Header from "../../components/adminDashboard/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/adminDashboard-ui/card";
import { Button } from "../../components/ui/adminDashboard-ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/adminDashboard-ui/dialog";
import { Input } from "../../components/ui/adminDashboard-ui/input";
import { Label } from "../../components/ui/adminDashboard-ui/label";
import SafariPackagesSection from "../../components/adminDashboard/PackageComponents/SafariPackagesSection";
import HirePackagesSection from "../../components/adminDashboard/PackageComponents/HirePackagesSection";
import ActivityPackagesSection from "../../components/adminDashboard/PackageComponents/ActivityPackagesSection";

const PackageManager = () => {
  const [admin, setAdmin] = useState(null);
  const [safariPackages, setSafariPackages] = useState([
    { id: 1, name: "Morning Safari", image: "/src/assets/image1.jpeg", time: "6 AM - 11 AM", cost: 5000, maxPeople: 10 },
    { id: 2, name: "Full Day Safari", image: "/src/assets/image2.jpg", time: "6 AM - 4 PM", cost: 8000, maxPeople: 10 },
    { id: 3, name: "Evening Safari", image: "/src/assets/image1.jpeg", time: "6 AM - 11 AM", cost: 5000, maxPeople: 10 },
    { id: 4, name: "Full Day Safari", image: "/src/assets/image2.jpg", time: "6 AM - 4 PM", cost: 8000, maxPeople: 10 },
  ]);
  const [hirePackages, setHirePackages] = useState([
    { id: 1, vehicleType: "Jeep", tourName: "Kumana Trail", costPerDay: 12000 },
    { id: 2, vehicleType: "Van", tourName: "Kumana Trail", costPerDay: 12000 },
    { id: 3, vehicleType: "Tuk Tuk", tourName: "Kumana Trail", costPerDay: 12000 },
    { id: 4, vehicleType: "Bike", tourName: "Kumana Trail", costPerDay: 12000 },
  ]);
  const [activityPackages, setActivityPackages] = useState([
    { id: 1, name: "Bird Watching", image: "/src/assets/image3.jpg", cost: 3500, details: "Includes binoculars and guide" },
    { id: 2, name: "Bird Watching", image: "/src/assets/image3.jpg", cost: 3500, details: "Includes binoculars and guide" },
    { id: 3, name: "Bird Watching", image: "/src/assets/image3.jpg", cost: 3500, details: "Includes binoculars and guide" },
    { id: 4, name: "Bird Watching", image: "/src/assets/image3.jpg", cost: 3500, details: "Includes binoculars and guide" },
  ]);
  const [editModal, setEditModal] = useState({ open: false, type: "", package: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, type: "", packageId: null });

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
  }, []);

  const handleEdit = (type, pkg) => {
    setEditModal({ open: true, type, package: { ...pkg } });
  };

  const handleDelete = (type, packageId) => {
    setDeleteModal({ open: true, type, packageId });
  };

  const handleSaveEdit = () => {
    const { type, package: editedPackage } = editModal;
    if (type === "safari") {
      setSafariPackages(safariPackages.map(pkg => 
        pkg.id === editedPackage.id ? editedPackage : pkg
      ));
    } else if (type === "hire") {
      setHirePackages(hirePackages.map(pkg => 
        pkg.id === editedPackage.id ? editedPackage : pkg
      ));
    } else if (type === "activity") {
      setActivityPackages(activityPackages.map(pkg => 
        pkg.id === editedPackage.id ? editedPackage : pkg
      ));
    }
    setEditModal({ open: false, type: "", package: null });
  };

  const handleConfirmDelete = () => {
    const { type, packageId } = deleteModal;
    if (type === "safari") {
      setSafariPackages(safariPackages.filter(pkg => pkg.id !== packageId));
    } else if (type === "hire") {
      setHirePackages(hirePackages.filter(pkg => pkg.id !== packageId));
    } else if (type === "activity") {
      setActivityPackages(activityPackages.filter(pkg => pkg.id !== packageId));
    }
    setDeleteModal({ open: false, type: "", packageId: null });
  };

  const handleAddPackage = (type) => {
    const newId = Math.max(...[...safariPackages, ...hirePackages, ...activityPackages].map(p => p.id), 0) + 1;
    const newPackage = {
      safari: { id: newId, name: "New Safari", image: "/src/assets/placeholder.jpg", time: "TBD", cost: 0, maxPeople: 0 },
      hire: { id: newId, vehicleType: "New Vehicle", tourName: "New Tour", costPerDay: 0 },
      activity: { id: newId, name: "New Activity", image: "/src/assets/placeholder.jpg", cost: 0, details: "TBD" }
    };
    
    if (type === "safari") {
      setSafariPackages([...safariPackages, newPackage.safari]);
      setEditModal({ open: true, type, package: newPackage.safari });
    } else if (type === "hire") {
      setHirePackages([...hirePackages, newPackage.hire]);
      setEditModal({ open: true, type, package: newPackage.hire });
    } else if (type === "activity") {
      setActivityPackages([...activityPackages, newPackage.activity]);
      setEditModal({ open: true, type, package: newPackage.activity });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Package Management"
          breadcrumbs={["Home", "Dashboard", "Packages"]}
          adminName={admin?.name}
        />

        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-safari-cream/30 bg-topography bg-opacity-5">
          <div className="bg-white p-6 rounded-xl shadow-md mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-safari-forest mb-2">
                Welcome, {admin?.name || "Admin"}!
              </h2>
              <p className="text-gray-600">
                Manage safari, hire, and activity packages offered through Kumana TrailMate.
              </p>
            </div>
          </div>

          <div className="space-y-10 pb-8">
            <SafariPackagesSection
              packages={safariPackages}
              onAdd={() => handleAddPackage("safari")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <HirePackagesSection
              packages={hirePackages}
              onAdd={() => handleAddPackage("hire")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <ActivityPackagesSection
              packages={activityPackages}
              onAdd={() => handleAddPackage("activity")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* Edit Modal */}
          <Dialog open={editModal.open} onOpenChange={(open) => setEditModal({ ...editModal, open })}>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle className="text-safari-forest font-playfair">
                  Edit {editModal.type.charAt(0).toUpperCase() + editModal.type.slice(1)} Package
                </DialogTitle>
                <DialogDescription>
                  Make changes to the package details below.
                </DialogDescription>
              </DialogHeader>
              {editModal.package && (
                <div className="grid gap-4 py-4">
                  {editModal.type === "safari" && (
                    <>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right text-safari-forest">Name</Label>
                        <Input
                          id="name"
                          value={editModal.package.name}
                          onChange={(e) => setEditModal({
                            ...editModal,
                            package: { ...editModal.package, name: e.target.value }
                          })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right text-safari-forest">Time</Label>
                        <Input
                          id="time"
                          value={editModal.package.time}
                          onChange={(e) => setEditModal({
                            ...editModal,
                            package: { ...editModal.package, time: e.target.value }
                          })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cost" className="text-right text-safari-forest">Cost</Label>
                        <Input
                          id="cost"
                          type="number"
                          value={editModal.package.cost}
                          onChange={(e) => setEditModal({
                            ...editModal,
                            package: { ...editModal.package, cost: parseInt(e.target.value) }
                          })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="maxPeople" className="text-right text-safari-forest">Max People</Label>
                        <Input
                          id="maxPeople"
                          type="number"
                          value={editModal.package.maxPeople}
                          onChange={(e) => setEditModal({
                            ...editModal,
                            package: { ...editModal.package, maxPeople: parseInt(e.target.value) }
                          })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right text-safari-forest">Image URL</Label>
                        <Input
                          id="image"
                          value={editModal.package.image}
                          onChange={(e) => setEditModal({
                            ...editModal,
                            package: { ...editModal.package, image: e.target.value }
                          })}
                          className="col-span-3"
                        />
                      </div>
                    </>
                  )}
                  {editModal.type === "hire" && (
                    <>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="vehicleType" className="text-right text-safari-forest">Vehicle Type</Label>
                        <Input
                          id="vehicleType"
                          value={editModal.package.vehicleType}
                          onChange={(e) => setEditModal({
                            ...editModal,
                            package: { ...editModal.package, vehicleType: e.target.value }
                          })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tourName" className="text-right text-safari-forest">Tour Name</Label>
                        <Input
                          id="tourName"
                          value={editModal.package.tourName}
                          onChange={(e) => setEditModal({
                            ...editModal,
                            package: { ...editModal.package, tourName: e.target.value }
                          })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="costPerDay" className="text-right text-safari-forest">Cost Per Day</Label>
                        <Input
                          id="costPerDay"
                          type="number"
                          value={editModal.package.costPerDay}
                          onChange={(e) => setEditModal({
                            ...editModal,
                            package: { ...editModal.package, costPerDay: parseInt(e.target.value) }
                          })}
                          className="col-span-3"
                        />
                      </div>
                    </>
                  )}
                  {editModal.type === "activity" && (
                    <>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right text-safari-forest">Name</Label>
                        <Input
                          id="name"
                          value={editModal.package.name}
                          onChange={(e) => setEditModal({
                            ...editModal,
                            package: { ...editModal.package, name: e.target.value }
                          })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="details" className="text-right text-safari-forest">Details</Label>
                        <Input
                          id="details"
                          value={editModal.package.details}
                          onChange={(e) => setEditModal({
                            ...editModal,
                            package: { ...editModal.package, details: e.target.value }
                          })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cost" className="text-right text-safari-forest">Cost</Label>
                        <Input
                          id="cost"
                          type="number"
                          value={editModal.package.cost}
                          onChange={(e) => setEditModal({
                            ...editModal,
                            package: { ...editModal.package, cost: parseInt(e.target.value) }
                          })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right text-safari-forest">Image URL</Label>
                        <Input
                          id="image"
                          value={editModal.package.image}
                          onChange={(e) => setEditModal({
                            ...editModal,
                            package: { ...editModal.package, image: e.target.value }
                          })}
                          className="col-span-3"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setEditModal({ open: false, type: "", package: null })}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-safari-forest hover:bg-safari-leaf"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Modal */}
          <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ ...deleteModal, open })}>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle className="text-safari-forest font-playfair">
                  Delete {deleteModal.type.charAt(0).toUpperCase() + deleteModal.type.slice(1)} Package
                </DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this package? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setDeleteModal({ open: false, type: "", packageId: null })}
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default PackageManager;