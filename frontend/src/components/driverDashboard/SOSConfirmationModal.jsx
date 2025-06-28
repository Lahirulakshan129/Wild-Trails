export const SOSConfirmationModal = ({ 
  isOpen, 
  onConfirm, 
  onCancel,
  locationStatus 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-red-600 mb-4">Confirm Emergency SOS</h3>
        
        <div className="mb-4 space-y-3">
          <p>Are you sure you want to send an emergency SOS alert?</p>
          
          {locationStatus.isLoading ? (
            <div className="flex items-center text-gray-600">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-400 mr-2"></div>
              Checking your location...
            </div>
          ) : (
            <div className={`p-3 rounded-md ${
              locationStatus.isValid 
                ? "bg-green-50 text-green-800 border border-green-200" 
                : "bg-red-50 text-red-800 border border-red-200"
            }`}>
              <div className="font-medium">Your Location:</div>
              <div className="text-sm">{locationStatus.coordinates}</div>
              <div className="text-sm mt-1">
                {locationStatus.isValid 
                  ? "✅ Within Kumana National Park" 
                  : "❌ Outside park boundaries - SOS may not reach rangers"}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!locationStatus.isValid || locationStatus.isLoading}
            className={`px-4 py-2 rounded-md text-white ${
              (!locationStatus.isValid || locationStatus.isLoading)
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Confirm SOS
          </button>
        </div>
      </div>
    </div>
  );
};