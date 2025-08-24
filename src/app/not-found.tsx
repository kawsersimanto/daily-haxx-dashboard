import { Construction, HardHat } from "lucide-react";

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="relative">
              <Construction className="h-16 w-16 text-orange-500" />
              <HardHat className="h-8 w-8 text-yellow-500 absolute -top-2 -right-2" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Under Construction
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We are building something amazing! This is currently under
            construction, but we&apos;ll be launching soon.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Daily Haxx. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
