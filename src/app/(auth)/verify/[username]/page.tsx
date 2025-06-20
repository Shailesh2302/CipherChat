"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { verifySchema } from "@/schemas/verifySchema";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import {
  Shield,
  Mail,
  CheckCircle,
  Loader2,
  ArrowLeft,
  Sparkles,
  Key,
} from "lucide-react";
import Link from "next/link";

export default function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });
      console.log("Username from params:", params.username);
      toast.success("Success", {
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Verification Failed", {
        description:
          axiosError.response?.data.message ??
          "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const inputVariants: Variants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } },
  };

  const pulseVariants: Variants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back button */}
        <motion.div className="mb-6" variants={itemVariants}>
          <Link
            href="/sign-up"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors group"
          >
            <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:text-purple-400 transition-colors" />
            </motion.div>
            Back to Sign Up
          </Link>
        </motion.div>

        {/* Glassmorphism card */}
        <motion.div
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.div
              className="inline-block p-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 mb-4 relative"
              variants={pulseVariants}
              animate="pulse"
            >
              <Shield className="w-8 h-8 text-white" />
              <motion.div
                className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3 text-yellow-800" />
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2"
              variants={itemVariants}
            >
              Verify Your Account
            </motion.h1>

            <motion.div
              className="flex items-center justify-center mb-4"
              variants={itemVariants}
            >
              <Mail className="w-5 h-5 text-purple-400 mr-2" />
              <p className="text-gray-300 text-lg">Code sent to your email</p>
            </motion.div>

            {/* Username display */}
            <motion.div
              className="bg-white/5 border border-white/10 rounded-xl p-3 inline-block"
              variants={itemVariants}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <p className="text-purple-300 font-medium">
                Welcome,{" "}
                <span className="text-cyan-300">{params.username}</span>
              </p>
            </motion.div>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Verification Code Field */}
              <motion.div variants={itemVariants}>
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200 font-medium">
                        Verification Code
                      </FormLabel>
                      <motion.div
                        variants={inputVariants}
                        whileFocus="focus"
                        whileTap="focus"
                        className="relative"
                      >
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          placeholder="Enter 6-digit code"
                          {...field}
                          className="pl-10 h-14 bg-white/5 border-white/10 rounded-xl text-white text-center text-xl font-mono tracking-widest placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                          maxLength={6}
                        />

                        {/* Visual separator lines for code input */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="flex space-x-2">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="w-px h-6 bg-gray-600 opacity-30"
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                      <motion.p
                        className="text-gray-400 text-sm mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        Check your email for the 6-digit verification code
                      </motion.p>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Verifying...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="text"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Verify Account
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </Form>

          {/* Footer Actions */}
          <motion.div
            className="text-center mt-6 pt-6 border-t border-white/10 space-y-3"
            variants={itemVariants}
          >
            <motion.p className="text-gray-300 text-sm">
              Didn&rsquo;t receive the code?{" "}
              <motion.button
                className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-semibold hover:from-purple-300 hover:to-cyan-300 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Add resend logic here if needed
                  toast.info("Resend functionality coming soon");
                }}
              >
                Resend Code
              </motion.button>
            </motion.p>

            <motion.p className="text-gray-400 text-xs">
              Need help?{" "}
              <Link
                href="/support"
                className="text-purple-300 hover:text-purple-200 transition-colors"
              >
                Contact Support
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Security notice */}
        <motion.div className="mt-6 text-center" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center text-gray-400 text-sm bg-white/5 rounded-full px-4 py-2 border border-white/10"
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <Shield className="w-4 h-4 mr-2 text-green-400" />
            Your account security is our priority
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
