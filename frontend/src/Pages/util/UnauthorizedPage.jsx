import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-safari-green-800 to-safari-brown-600 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        <div className="p-8 text-center">
          {/* Animated Lock Icon */}
          <div className="mx-auto mb-6 relative w-20 h-20">
            <div className="absolute inset-0 bg-safari-red rounded-full animate-pulse"></div>
            <svg
              className="relative z-10 w-full h-full text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-white/80 mb-6">
            You don't have permission to view this page
          </p>

          {/* Error Code */}
          <div className="inline-block bg-white/20 px-4 py-2 rounded-full mb-8">
            <span className="font-mono text-white">Error 403</span>
          </div>

          {/* Home Button */}
          <button
            onClick={() => navigate('/')}
            className="group relative overflow-hidden px-6 py-3 bg-safari-cream text-safari-green-800 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Return to Home
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-safari-green-600 to-safari-brown-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>

        {/* Footer */}
        <div className="bg-safari-green-900/30 py-4 text-center">
          <p className="text-xs text-white/50">
            Need help? Contact us
          </p>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-safari-green-400/20 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-safari-brown-400/20 blur-xl"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-safari-gold-400/20 blur-xl"></div>
    </div>
  );
};

export default UnauthorizedPage;