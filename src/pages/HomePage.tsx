import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Shield, Zap, Users, FileText, Download, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Cloud className="w-8 h-8 text-cyan-500" />,
      title: "Cloud Storage",
      description: "Store your files securely in the cloud and access them from anywhere"
    },
    {
      icon: <Shield className="w-8 h-8 text-cyan-500" />,
      title: "Secure & Private",
      description: "Your files are protected with enterprise-grade security"
    },
    {
      icon: <Zap className="w-8 h-8 text-cyan-500" />,
      title: "Fast Upload",
      description: "Quick and reliable file uploads with progress tracking"
    },
    {
      icon: <Users className="w-8 h-8 text-cyan-500" />,
      title: "Easy Sharing",
      description: "Share files with classmates or keep them private"
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Create Account",
      description: "Sign up with your email and create a secure password"
    },
    {
      step: "2",
      title: "Upload Files",
      description: "Drag and drop your academic files or browse to select"
    },
    {
      step: "3",
      title: "Access Anywhere",
      description: "View and download your files from any device, anytime"
    }
  ];

  const testimonials = [
    {
      name: "Akholiwe",
      role: "Computer Science Student",
      content: "FileVault has made organizing my coursework so much easier. I can access my files from anywhere!",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Michael Chen",
      role: "Engineering Student",
      content: "The interface is clean and intuitive. Perfect for students who need reliable file storage.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Emma Davis",
      role: "Business Student",
      content: "Love the tagging system! It helps me organize my files by subject and semester.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FileVault</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Login
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="primary" className="bg-cyan-500 hover:bg-cyan-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Store Your Academic Files.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {" "}Access Them Anytime, Anywhere.
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate cloud storage solution designed specifically for students. 
              Upload, organize, and access your academic files from any device with enterprise-grade security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="bg-cyan-500 hover:bg-cyan-600 transform hover:scale-105 transition-all duration-200 px-8 py-4 text-lg"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="text-white border-2 border-white/30 hover:bg-white/10 px-8 py-4 text-lg"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need for Academic Success
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make file management effortless for students
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300">Get started in just three simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Students Say</h2>
            <p className="text-xl text-gray-300">Join thousands of students who trust FileVault</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students who are already using FileVault to manage their academic files.
          </p>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-white">Free to use</span>
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-white">Secure storage</span>
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-white">Easy to use</span>
          </div>
          <Link to="/auth">
            <Button 
              variant="primary" 
              size="lg" 
              className="bg-cyan-500 hover:bg-cyan-600 transform hover:scale-105 transition-all duration-200 px-12 py-4 text-lg"
            >
              Create Your Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FileVault</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-300">
                © 2024 FileVault. All rights reserved.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Secure cloud storage for students
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;