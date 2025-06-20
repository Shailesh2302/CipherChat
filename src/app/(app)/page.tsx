'use client';

// import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Shield, Sparkles, ArrowRight, Users, Eye, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import { motion , Variants } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: { duration: 0.3 }
    }
  };

  const pulseVariants: Variants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants: Variants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-4 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Main content */}
      <motion.main
        className="relative z-10 flex flex-col items-center justify-center px-4 md:px-24 pt-32 pb-12 min-h-screen"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
      >
        {/* Hero Section */}
        <motion.section className="text-center mb-12 md:mb-16" variants={itemVariants}>
          {/* Logo/Icon */}
          <motion.div
            className="inline-block p-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 mb-8 relative"
            variants={pulseVariants}
            animate="pulse"
          >
            <MessageCircle className="w-12 h-12 text-white" />
            <motion.div
              className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-yellow-800" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6 leading-tight"
            variants={itemVariants}
          >
            Dive into the World of
            <br />
            <motion.span
              className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              CipherChat
            </motion.span>
          </motion.h1>
          
          <motion.p
            className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            CipherChat - Where your identity remains a{" "}
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-semibold">
              secret
            </span>
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            variants={itemVariants}
          >
            {[
              { icon: Shield, text: "100% Anonymous", color: "from-green-400 to-emerald-400" },
              { icon: Lock, text: "Secure & Private", color: "from-blue-400 to-cyan-400" },
              { icon: Users, text: "Real Feedback", color: "from-purple-400 to-pink-400" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                variants={floatingVariants}
                animate="float"
                transition={{ delay: index * 0.2 }}
              >
                <feature.icon className={`w-4 h-4 mr-2 bg-gradient-to-r ${feature.color} text-transparent`} />
                <span className="text-white text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-16"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              className="h-14 px-8 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/sign-up" className="flex items-center">
                Get Started
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              variant="outline"
              className="h-14 px-8 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl font-semibold transition-all duration-300"
            >
              <Link href="/sign-in" className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Sign In
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Messages Carousel */}
        <motion.div
          className="w-full max-w-4xl"
          variants={itemVariants}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center text-white mb-8"
            variants={itemVariants}
          >
            See What Others Are Saying
          </motion.h2>
          
          <motion.div
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <Carousel
              plugins={[Autoplay({ delay: 4000 })]}
              className="w-full"
            >
              <CarouselContent>
                {messages.map((message, index) => (
                  <CarouselItem key={index} className="p-2">
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <Card className="bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <motion.div
                              className="mr-3 p-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Mail className="w-4 h-4 text-white" />
                            </motion.div>
                            {message.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-300">
                          <motion.p
                            className="text-lg leading-relaxed mb-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            &ldquo;{message.content}&rdquo;
                          </motion.p>
                          <motion.p
                            className="text-sm text-purple-300 flex items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            <MessageCircle className="w-3 h-3 mr-1" />
                            {message.received}
                          </motion.p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
              <CarouselNext className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
            </Carousel>
          </motion.div>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <motion.footer
        className="relative z-10 text-center p-6 backdrop-blur-sm bg-black/20 border-t border-white/10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div
          className="flex items-center justify-center mb-2"
          whileHover={{ scale: 1.05 }}
        >
          <Shield className="w-4 h-4 mr-2 text-purple-400" />
          <p className="text-gray-300">
            © 2023 CipherChat. All rights reserved.
          </p>
        </motion.div>
        <motion.p
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Your privacy is our commitment
        </motion.p>
      </motion.footer>
    </div>
  );
}