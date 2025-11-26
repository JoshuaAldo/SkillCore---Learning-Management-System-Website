import React, { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import {
  updateProfile,
  updatePassword,
  updatePhoto,
} from "@/services/userService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Camera } from "lucide-react";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "@/utils/const";

export default function ProfilePage() {
  const profile = useLoaderData();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  const [photoPreview, setPhotoPreview] = useState(profile.photo);

  const { revalidate } = useRevalidator();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);

    try {
      await updateProfile({ name, email });
      toast.success("Profile updated successfully!", {
        position: "top-center",
        theme: "dark",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        theme: "dark",
      });
    }

    setLoadingProfile(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoadingPassword(true);

    try {
      await updatePassword({
        oldPassword,
        newPassword,
      });
      toast.success("Password updated successfully!", {
        position: "top-center",
        theme: "dark",
      });
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        theme: "dark",
      });
    }

    setLoadingPassword(false);
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingPhoto(true);

    setPhotoPreview(URL.createObjectURL(file));

    try {
      const response = await updatePhoto(file);
      const session = secureLocalStorage.getItem(STORAGE_KEY);
      secureLocalStorage.setItem(STORAGE_KEY, {
        ...session,
        profileImg: response.data.photo,
      });
      toast.success("Photo updated successfully!", {
        position: "top-center",
        theme: "dark",
      });
      revalidate();
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        theme: "dark",
      });
    }

    setLoadingPhoto(false);
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text">
          Account Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your profile and account settings
        </p>
      </div>

      <Card className="stat-card border-none bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Profile Photo
          </CardTitle>
          <CardDescription>Update your profile picture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <img
              src={photoPreview}
              className="w-24 h-24 rounded-full object-cover border"
              alt="profile"
            />

            <div>
              <Label htmlFor="photo-upload">
                <Button
                  type="button"
                  variant="outline"
                  disabled={loadingPhoto}
                  onClick={() =>
                    document.getElementById("photo-upload").click()
                  }
                >
                  {loadingPhoto ? "Uploading..." : "Change Photo"}
                </Button>
              </Label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <p className="text-sm text-muted-foreground mt-2">
                JPEG, JPG, PNG or WEBP. Max 5MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="stat-card border-none bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Profile Information
          </CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-lg">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/5 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10"
              />
            </div>

            <Button
              type="submit"
              variant="outline"
              disabled={loadingProfile}
              className="w-full sm:w-auto"
            >
              {loadingProfile ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="stat-card border-none bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Change Password
          </CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-lg">
            <div className="space-y-2">
              <Label htmlFor="old-password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Old Password
              </Label>
              <Input
                id="old-password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10"
              />
            </div>

            <Button
              type="submit"
              variant="outline"
              disabled={loadingPassword}
              className="w-full sm:w-auto"
            >
              {loadingPassword ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
