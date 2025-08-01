
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Key,
  Monitor,
  Moon,
  Sun,
  Globe,
  Mail,
  Smartphone,
  Save,
  RefreshCw,
  Trash2,
  Download,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, icon, children }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-white/10 rounded-lg">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-white/60 text-sm">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

interface ToggleProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, description, enabled, onChange }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl">
      <div>
        <h3 className="text-white font-medium">{label}</h3>
        <p className="text-white/60 text-sm">{description}</p>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-white' : 'bg-white/20'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

const Settings = () => {
  const { toast } = useToast();
  
  // Profile Settings
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'AI automation enthusiast passionate about streamlining workflows.',
    avatar: null as File | null
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    workflowCompletion: true,
    errorAlerts: true,
    weeklyReports: false,
    productUpdates: true,
    emailNotifications: true,
    pushNotifications: false
  });

  // Appearance Settings
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    language: 'en',
    timezone: 'UTC'
  });

  // Security Settings
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be ready for download shortly.",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Data Import",
      description: "Please select a file to import your data.",
    });
  };

  const handleResetSettings = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
      variant: "destructive"
    });
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/70 text-lg">Manage your account preferences and configuration</p>
        </div>

        {/* Profile Settings */}
        <SettingsSection
          title="Profile"
          description="Update your personal information and avatar"
          icon={<User className="w-6 h-6 text-white" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Bio</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSaveProfile} className="bg-white text-black hover:bg-white/90">
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </Button>
            </div>
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection
          title="Notifications"
          description="Configure how you receive notifications"
          icon={<Bell className="w-6 h-6 text-white" />}
        >
          <div className="space-y-4">
            <Toggle
              label="Workflow Completion"
              description="Get notified when workflows complete successfully"
              enabled={notifications.workflowCompletion}
              onChange={(enabled) => setNotifications({ ...notifications, workflowCompletion: enabled })}
            />
            <Toggle
              label="Error Alerts"
              description="Receive immediate alerts when workflows fail"
              enabled={notifications.errorAlerts}
              onChange={(enabled) => setNotifications({ ...notifications, errorAlerts: enabled })}
            />
            <Toggle
              label="Weekly Reports"
              description="Weekly summary of your automation activity"
              enabled={notifications.weeklyReports}
              onChange={(enabled) => setNotifications({ ...notifications, weeklyReports: enabled })}
            />
            <Toggle
              label="Product Updates"
              description="Stay updated with new features and improvements"
              enabled={notifications.productUpdates}
              onChange={(enabled) => setNotifications({ ...notifications, productUpdates: enabled })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Toggle
                label="Email Notifications"
                description="Receive notifications via email"
                enabled={notifications.emailNotifications}
                onChange={(enabled) => setNotifications({ ...notifications, emailNotifications: enabled })}
              />
              <Toggle
                label="Push Notifications"
                description="Receive browser push notifications"
                enabled={notifications.pushNotifications}
                onChange={(enabled) => setNotifications({ ...notifications, pushNotifications: enabled })}
              />
            </div>
          </div>
        </SettingsSection>

        {/* Appearance */}
        <SettingsSection
          title="Appearance"
          description="Customize the look and feel of your workspace"
          icon={<Palette className="w-6 h-6 text-white" />}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Theme</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
                  { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
                  { value: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> }
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => setAppearance({ ...appearance, theme: theme.value })}
                    className={`p-4 rounded-xl border transition-colors flex items-center space-x-2 ${
                      appearance.theme === theme.value
                        ? 'border-white bg-white/10 text-white'
                        : 'border-white/20 bg-black/20 text-white/70 hover:bg-white/5'
                    }`}
                  >
                    {theme.icon}
                    <span>{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Language</label>
                <select
                  value={appearance.language}
                  onChange={(e) => setAppearance({ ...appearance, language: e.target.value })}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Timezone</label>
                <select
                  value={appearance.timezone}
                  onChange={(e) => setAppearance({ ...appearance, timezone: e.target.value })}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="CET">Central European Time</option>
                </select>
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* Security */}
        <SettingsSection
          title="Security"
          description="Manage your account security settings"
          icon={<Shield className="w-6 h-6 text-white" />}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-white/70" />
                <div>
                  <h3 className="text-white font-medium">Password</h3>
                  <p className="text-white/60 text-sm">Last updated 30 days ago</p>
                </div>
              </div>
              <Button variant="ghost" className="text-white border-white/20 hover:bg-white/10">
                Change Password
              </Button>
            </div>
            <Toggle
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              enabled={security.twoFactorAuth}
              onChange={(enabled) => setSecurity({ ...security, twoFactorAuth: enabled })}
            />
            <Toggle
              label="Login Alerts"
              description="Get notified of new login attempts"
              enabled={security.loginAlerts}
              onChange={(enabled) => setSecurity({ ...security, loginAlerts: enabled })}
            />
            <div>
              <label className="block text-white/70 text-sm mb-2">Session Timeout (minutes)</label>
              <input
                type="number"
                value={security.sessionTimeout}
                onChange={(e) => setSecurity({ ...security, sessionTimeout: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors"
                min="5"
                max="480"
              />
            </div>
          </div>
        </SettingsSection>

        {/* Data Management */}
        <SettingsSection
          title="Data Management"
          description="Import, export, and manage your data"
          icon={<Database className="w-6 h-6 text-white" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleExportData}
              variant="ghost"
              className="text-white border-white/20 hover:bg-white/10 flex items-center justify-center py-6"
            >
              <Download className="w-5 h-5 mr-2" />
              Export Data
            </Button>
            <Button
              onClick={handleImportData}
              variant="ghost"
              className="text-white border-white/20 hover:bg-white/10 flex items-center justify-center py-6"
            >
              <Upload className="w-5 h-5 mr-2" />
              Import Data
            </Button>
            <Button
              onClick={handleResetSettings}
              variant="ghost"
              className="text-red-400 border-red-400/20 hover:bg-red-500/10 flex items-center justify-center py-6"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Reset Settings
            </Button>
          </div>
        </SettingsSection>

        {/* Danger Zone */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>
              <p className="text-red-400/70 text-sm">Irreversible actions that affect your account</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-red-400 border-red-400/20 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
