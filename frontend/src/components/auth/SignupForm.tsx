import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { useRegister } from "@/hooks/user/useAuth";

const signupSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?[\]\\|`~'"€£¥₹]).{8,}$/,
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
    ),
  contactNumber: Yup.string()
    .matches(/^\+?[\d\s-()]{10,}$/, "Invalid contact number")
    .required("Contact number is required"),
});

type SignupFormValues = Yup.InferType<typeof signupSchema>;

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useRegister();

  const initialValues: SignupFormValues = {
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  };

  const handleSubmit = (values: SignupFormValues) => {
    mutate(values);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
      </div>

      <Formik initialValues={initialValues} validationSchema={signupSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                Full Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-white placeholder-slate-400"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                Email Address
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-white placeholder-slate-400"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
                Password
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-white placeholder-slate-400 pr-12"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-slate-200 mb-2">
                Contact Number
              </label>
              <Field
                type="tel"
                id="contactNumber"
                name="contactNumber"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-white placeholder-slate-400"
                placeholder="Enter your contact number"
              />
              <ErrorMessage name="contactNumber" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div className="flex items-center">
              <Field type="checkbox" name="agreeTerms" className="w-4 h-4 text-blue-500 border-slate-600 rounded focus:ring-blue-500 bg-slate-800" />
              <label className="ml-2 text-sm text-slate-300">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-400 hover:text-blue-300">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-medium hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center">
              <p className="text-slate-300">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
