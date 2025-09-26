"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, PenTool } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1,
          }}
          className="text-8xl md:text-9xl font-bold text-slate-600 dark:text-slate-300"
        >
          404
        </motion.div>

        {/* Animated Pen Icon */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <PenTool className="w-16 h-16 text-slate-500 dark:text-slate-400" />
          </motion.div>
        </motion.div>

        {/* Animated Text */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-slate-200">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Looks like this drawing got lost in the canvas. Let's get you back
            to creating something amazing!
          </p>
        </motion.div>

        {/* Animated Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Link href="/">
            <Button
              size="lg"
              className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:hover:bg-slate-100 dark:text-slate-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full"
              initial={{
                x: `${Math.random() * 100}vw`,
                y: "100vh",
                opacity: 0,
              }}
              animate={{
                y: "-10vh",
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
