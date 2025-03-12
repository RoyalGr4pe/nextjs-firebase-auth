"use client";

// Local Imports
import { IUser } from "@/models/user";
import { auth, firestore } from "@/services/firebase/config";

// External Imports
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";


async function updateUserEmail(newEmail: string, currentPassword: string, setNewEmailMessage: (value: string) => void, setEmailSuccessfullyUpdated: (value: boolean) => void): Promise<{ success: boolean, error?: string }> {
    let success = false;
    let error = "";

    if (!auth.currentUser) {
        return { success, error: "No authenticated user found." };
    }

    try {
        // Reauthenticate user before updating email
        const credential = EmailAuthProvider.credential(auth.currentUser.email!, currentPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);

        setNewEmailMessage("Please verify your new email address.");
        // Send verification email before updating
        await verifyBeforeUpdateEmail(auth.currentUser, newEmail);

        // Polling: Wait for email verification
        const interval = setInterval(async () => {
            await auth.currentUser?.reload(); // Refresh the user
            if (auth.currentUser?.emailVerified) {
                clearInterval(interval); // Stop checking

                // Update Firestore document
                const userRef = doc(firestore, "users", auth.currentUser.uid);
                const userDoc = await getDoc(userRef);
                const user = userDoc.data() as IUser;
                const userHasAPreferredEmail = user.preferences.preferredEmail !== user.email;
                await updateDoc(userRef, { 
                    email: newEmail, 
                    "preferences.preferredEmail": userHasAPreferredEmail ? user.preferences.preferredEmail : newEmail
                });
                setNewEmailMessage("");
                setEmailSuccessfullyUpdated(true);
                success = true;
            }
        }, 5000); // Check every 5 seconds
    } catch (err) {
        error = `Error updating email: ${err}`;
    }

    return { success: success, error: error };
};

async function updateUserPassword(newPassword: string, currentPassword: string, setNewPasswordMessage: (value: string) => void, setPasswordSuccessfullyUpdated: (value: boolean) => void): Promise<{ success: boolean, error?: string }> {
    let success = false;
    let error = "";

    if (!auth.currentUser) {
        return { success, error: "No authenticated user found." }
    }

    try {
        // Reauthenticate user before updating password
        const credential = EmailAuthProvider.credential(auth.currentUser.email!, currentPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);

        await updatePassword(auth.currentUser, newPassword);
        setPasswordSuccessfullyUpdated(true);
        success = true;
    } catch (err) {
        error = `Error updating password: ${err}`;
    }

    return { success: success, error: error };
};

const UpdateAccountDetails = () => {
    // Email Changes
    const [newEmail, setNewEmail] = useState("");
    const [emailSuccessfullyUpdated, setEmailSuccessfullyUpdated] = useState(false);

    // Loading
    const [isEmailLoading, setEmailIsLoading] = useState(false);
    const [isPasswordLoading, setPasswordIsLoading] = useState(false);
    
    // Password Changes
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmedPassword, setNewConfirmedPassword] = useState("");
    const [currentPasswordForEmail, setCurrentPasswordForEmail] = useState("");
    const [currentPasswordForPassword, setCurrentPasswordForPassword] = useState("");
    const [passwordSuccessfullyUpdated, setPasswordSuccessfullyUpdated] = useState(false);

    // Info Messages
    const [newEmailMessage, setNewEmailMessage] = useState("");
    const [newPasswordMessage, setNewPasswordMessage] = useState("");

    // Error Messages
    const [errorNewEmailMessage, setNewEmailErrorMessage] = useState("");
    const [errorNewPasswordMessage, setNewPasswordErrorMessage] = useState("");

    const handleEmailUpdate = async () => {
        setEmailIsLoading(true);
        if (!newEmail || !currentPasswordForEmail) {
            setNewEmailErrorMessage("Please provide the new email and current password.");
            setEmailIsLoading(false);
            return;
        }
        const { success, error } = await updateUserEmail(newEmail, currentPasswordForEmail, setNewEmailMessage, setEmailSuccessfullyUpdated);
        if (!success) {
            setNewEmailErrorMessage(error ?? "An unknown error occurred while updating your email.");
        } else {
            setEmailSuccessfullyUpdated(true);
        }

        setEmailIsLoading(false);
    };

    const handlePasswordUpdate = async () => {
        setPasswordIsLoading(true);
        if (!newPassword || !currentPasswordForPassword || (newPassword !== newConfirmedPassword)) {
            setNewPasswordErrorMessage("Please provide the new password and current password.");
            setPasswordIsLoading(false);
            return;
        }
        const { success, error } = await updateUserPassword(newPassword, currentPasswordForPassword, setNewPasswordMessage, setPasswordSuccessfullyUpdated);
        if (!success) {
            setNewPasswordErrorMessage(error ?? "An unknown error occurred while updating your password.");
        } else {
            setPasswordSuccessfullyUpdated(true);        }
        setPasswordIsLoading(false);
    };


    return (
        <div className="flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md text-center">
                <h1 className="text-white text-2xl mb-5">Update Account Details</h1>

                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPasswordForEmail}
                    onChange={(e) => setCurrentPasswordForEmail(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                />

                <input
                    type="email"
                    placeholder="New Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                />
                <span className="text-sm">{newEmailMessage}</span>
                <span className="text-green-500 text-sm">{emailSuccessfullyUpdated ? "Email Successfully Updated": ""}</span>
                <span className="text-red-500 text-sm">{errorNewEmailMessage}</span>
                <button
                    onClick={handleEmailUpdate}
                    disabled={isEmailLoading}
                    className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500 mb-4"
                >
                    <span className="inline-flex items-center gap-2 text-white">
                        {isEmailLoading ? "Processing..." : (
                            <>
                                <Mail className="mr-2 h-4 w-4" />
                                {isEmailLoading ? "Processing...": "Update Email"}
                            </>
                        )}
                    </span>
                </button>

                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPasswordForPassword}
                    onChange={(e) => setCurrentPasswordForPassword(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={newConfirmedPassword}
                    onChange={(e) => setNewConfirmedPassword(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                />
                <span className="text-sm">{newPasswordMessage}</span>
                <span className="text-green-500 text-sm">{passwordSuccessfullyUpdated ? "Password Successfully Updated" : ""}</span>
                <span className="text-red-500 text-sm">{errorNewPasswordMessage}</span>
                <button
                    onClick={handlePasswordUpdate}
                    disabled={isPasswordLoading}
                    className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
                >
                    <span className="inline-flex items-center gap-2 text-white">
                        {isPasswordLoading ? "Processing..." : (
                            <>
                                <Lock className="mr-2 h-4 w-4" />
                                {isPasswordLoading ? "Processing...": "Update Password"}
                            </>
                        )}
                    </span>
                </button>
            </div>
        </div>
    )
}

export default UpdateAccountDetails;
