// ProfilePage.js

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { useAuth } from "../hooks/AuthContext";
import { RadioGroup } from "formik-material-ui";

function ProfilePage() {
  // State for profile data
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { auth } = useAuth();
  const handleUpdateProfile = async (values) => {
    // Implement profile update logic with backend
    console.log(values);
    const apiUrl = "http://127.0.0.1:8000/update_profile";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: auth.customer_id, // Assuming you store customer ID in auth context
          current_password: values.currentPassword,
          new_username: values.updatedUsername, // Only send if not empty
          new_password: values.newPassword, // Only send if not empty and validation passed
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
        console.log("Update success:", data);
      } else {
        alert("Failed to update profile: " + data.error);
        console.error("Update failed:", data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile, please try again.");
    }
  };
  const initialValues = {
    updatedUsername: "",
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  const userSchema = yup.object().shape({
    updatedUsername: yup.string(),
    currentPassword: yup.string().required("Current password is required"),
    newPassword: yup
      .string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters long"), // Example of a rule for minimum length
    repeatNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirming new password is required"),
  });

  return (
    <Box m="20px">
      <Header title="Update Profile" subTitle="Update Username and Password" />
      <Formik
        onSubmit={handleUpdateProfile}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "&>div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Update Username (Optional)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.updatedUsername}
                name="updatedUsername"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Current Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.currentPassword}
                error={!!touched.currentPassword && !!errors.currentPassword}
                helperText={touched.currentPassword && errors.currentPassword}
                name="currentPassword"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="New Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.newPassword}
                error={!!touched.newPassword && !!errors.newPassword}
                helperText={touched.newPassword && errors.newPassword}
                name="newPassword"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm New Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.repeatNewPassword}
                name="repeatNewPassword"
                error={
                  !!touched.repeatNewPassword && !!errors.repeatNewPassword
                }
                helperText={
                  touched.repeatNewPassword && errors.repeatNewPassword
                }
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Account
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default ProfilePage;
