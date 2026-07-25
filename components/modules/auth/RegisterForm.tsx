"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { IRegisterForm, registerZodSchema } from "@/zod/auth.validation";

import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { registrationAction } from "@/app/(commonLayout)/(authRouteGroup)/register/_action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RegisterForm = () => {
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
// console.count("RegisterForm Render");
const router = useRouter()
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },

    onSubmit: async ({ value }) => {
      try {
        setServerError("");
        setIsPending(true);

        console.log(value);

        const {confirmPassword, acceptTerms, ...payload} = value
        const result = await registrationAction(payload)

        if(!result.success){
          setServerError(result.message)
          return
        }

           // Success
        toast.success("Account created successfully");
        router.push("/");
        // router.refresh();
      } catch (error) {
        setServerError("Registration failed. Please try again.");
      } finally {
        setIsPending(false);
      }
    },
  });

  // console.log("showConfirmPassword:", showConfirmPassword);
// console.log("showPassword:", showPassword);

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Create Account</CardTitle>

        <CardDescription>
          Create your account to continue.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          noValidate
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* Name */}

          <form.Field
            name="name"
            validators={{
              onChange: registerZodSchema.shape.name,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Full Name"
                placeholder="Enter your full name"
              />
            )}
          </form.Field>

          {/* Email */}

          <form.Field
            name="email"
            validators={{
              onChange: registerZodSchema.shape.email,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                type="email"
                label="Email"
                placeholder="Enter your email"
              />
            )}
          </form.Field>

          {/* Phone */}
{/* 
          <form.Field
            name="phone"
            validators={{
              onChange: registerZodSchema.shape.phone,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Phone"
                placeholder="01XXXXXXXXX"
              />
            )}
          </form.Field> */}

          {/* Password */}

          <form.Field
            name="password"
            validators={{
              onChange: registerZodSchema.shape.password,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="********"
                append={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                }
              />
            )}
          </form.Field>

          {/* Confirm Password */}

          <form.Field
            name="confirmPassword"
            validators={{
              onChange:
                registerZodSchema.shape.confirmPassword,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                label="Confirm Password"
                placeholder="********"
                append={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        setShowConfirmPassword((prev) => !prev);
                    }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4 cursor-pointer" />
                    ) : (
                      <Eye className="size-4 cursor-pointer" />
                    )}
                  </Button>
                }
              />
            )}
          </form.Field>

          {/* Accept Terms */}

          <form.Field name="acceptTerms">
            {(field) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={field.state.value}
                  onCheckedChange={(checked) =>
                    field.handleChange(Boolean(checked))
                  }
                />

                <label className="text-sm">
                  I agree to the Terms &
                  Conditions
                </label>
              </div>
            )}
          </form.Field>

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription className="border border-red-500 bg-red-100 text-center py-1">
                {serverError}
              </AlertDescription>
            </Alert>
          )}

          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
            ]}
          >
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                disabled={!canSubmit}
                isPending={
                  isSubmitting || isPending
                }
                pendingLabel="Creating Account..."
              >
                Create Account
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>

          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              OR
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => {
            const baseUrl =
              process.env.NEXT_PUBLIC_API_BASE_URL;

            window.location.href =
              `${baseUrl}/auth/login/google`;
          }}
        >
          Continue with Google
        </Button>
      </CardContent>

      <CardFooter className="justify-center border-t">
        <p className="text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;