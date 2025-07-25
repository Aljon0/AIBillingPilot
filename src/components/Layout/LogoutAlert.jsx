import { LogOut, X } from "lucide-react";
import React from "react";

const LogoutAlert = ({ isOpen, onConfirm, onCancel, userEmail }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 z-50 transition-opacity duration-200" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-6 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            {/* Close button */}
            <button
              onClick={onCancel}
              className="absolute right-4 top-4 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors duration-150"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Icon */}
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <LogOut className="h-6 w-6 text-red-600" />
            </div>

            {/* Content */}
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-lg font-semibold leading-6 text-slate-900">
                Sign out of your account
              </h3>
              <div className="mt-2">
                <p className="text-sm text-slate-500">
                  Are you sure you want to sign out of your account
                  {userEmail ? ` (${userEmail})` : ""}? You will need to sign in
                  again to access your dashboard.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 sm:mt-4 sm:ml-10 sm:flex sm:pl-4">
              <button
                type="button"
                onClick={onConfirm}
                className="inline-flex w-full justify-center cursor-pointer rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors duration-200 sm:w-auto"
              >
                Sign out
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="mt-3 inline-flex w-full cursor-pointer justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 transition-colors duration-200 sm:ml-3 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutAlert;
