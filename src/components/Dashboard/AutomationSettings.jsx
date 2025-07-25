import React, { useEffect, useState } from "react";
import { useToast } from "../Toast";

const AutomationSettings = () => {
  const { showToast, ToastComponent } = useToast();
  const [settings, setSettings] = useState({
    invoiceReminders: true,
    autoInvoiceGeneration: false,
    latePaymentNotifications: true,
    monthlyReports: true,
    billingSchedule: "monthly",
    reminderDays: "3",
    autoLateFees: false,
    paymentConfirmations: true,
    reportRecipients: "admin@example.com",
    reportFormat: "pdf",
    smartRecommendations: true,
    predictiveAnalytics: true,
    autoCategorization: true,
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = JSON.parse(
      localStorage.getItem("automationSettings")
    );
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

  const handleToggle = (setting) => {
    const newSettings = {
      ...settings,
      [setting]: !settings[setting],
    };
    setSettings(newSettings);
  };

  const handleSelectChange = (setting, value) => {
    const newSettings = {
      ...settings,
      [setting]: value,
    };
    setSettings(newSettings);
  };

  const handleInputChange = (setting, value) => {
    const newSettings = {
      ...settings,
      [setting]: value,
    };
    setSettings(newSettings);
  };

  const saveSettings = () => {
    localStorage.setItem("automationSettings", JSON.stringify(settings));
    // You could add a toast notification here to confirm save
    showToast("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <ToastComponent />
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Automation Settings
        </h1>
        <p className="text-slate-600">
          Configure automated processes and notifications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Billing Automation */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Billing Automation
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-slate-900">
                  Auto Invoice Generation
                </label>
                <p className="text-xs text-slate-500">
                  Automatically generate invoices monthly
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoInvoiceGeneration}
                  onChange={() => handleToggle("autoInvoiceGeneration")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-slate-900">
                  Auto Late Fees
                </label>
                <p className="text-xs text-slate-500">
                  Apply late fees automatically
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoLateFees}
                  onChange={() => handleToggle("autoLateFees")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Billing Schedule
              </label>
              <select
                value={settings.billingSchedule}
                onChange={(e) =>
                  handleSelectChange("billingSchedule", e.target.value)
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-slate-900">
                  Invoice Reminders
                </label>
                <p className="text-xs text-slate-500">
                  Send payment reminders to tenants
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.invoiceReminders}
                  onChange={() => handleToggle("invoiceReminders")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-slate-900">
                  Late Payment Notifications
                </label>
                <p className="text-xs text-slate-500">
                  Notify about overdue payments
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.latePaymentNotifications}
                  onChange={() => handleToggle("latePaymentNotifications")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-slate-900">
                  Payment Confirmations
                </label>
                <p className="text-xs text-slate-500">
                  Send payment received confirmations
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.paymentConfirmations}
                  onChange={() => handleToggle("paymentConfirmations")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Reminder Days Before Due
              </label>
              <select
                value={settings.reminderDays}
                onChange={(e) =>
                  handleSelectChange("reminderDays", e.target.value)
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              >
                <option value="1">1 day</option>
                <option value="3">3 days</option>
                <option value="5">5 days</option>
                <option value="7">7 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reporting Settings */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Reporting
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-slate-900">
                  Monthly Reports
                </label>
                <p className="text-xs text-slate-500">
                  Generate monthly financial reports
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.monthlyReports}
                  onChange={() => handleToggle("monthlyReports")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Report Recipients
              </label>
              <input
                type="email"
                value={settings.reportRecipients}
                onChange={(e) =>
                  handleInputChange("reportRecipients", e.target.value)
                }
                placeholder="admin@example.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Report Format
              </label>
              <select
                value={settings.reportFormat}
                onChange={(e) =>
                  handleSelectChange("reportFormat", e.target.value)
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            AI Features
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Smart Recommendations
              </label>
              <p className="text-xs text-slate-500 mb-3">
                Get AI-powered insights and recommendations
              </p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.smartRecommendations}
                  onChange={() => handleToggle("smartRecommendations")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Predictive Analytics
              </label>
              <p className="text-xs text-slate-500 mb-3">
                Predict payment patterns and risks
              </p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.predictiveAnalytics}
                  onChange={() => handleToggle("predictiveAnalytics")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Auto-categorization
              </label>
              <p className="text-xs text-slate-500 mb-3">
                Automatically categorize expenses and income
              </p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoCategorization}
                  onChange={() => handleToggle("autoCategorization")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          className="px-6 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AutomationSettings;
