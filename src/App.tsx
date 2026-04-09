/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Bug, 
  Code2, 
  Database, 
  Terminal, 
  Users, 
  ChevronRight,
  Menu,
  X,
  GraduationCap,
  Award,
  Briefcase,
  Quote,
  Loader2
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

const skills = {
  technical: [
    { name: "Manual Testing", level: 95 },
    { name: "Automation Testing", level: 85 },
    { name: "Selenium WebDriver", level: 80 },
    { name: "Core Java", level: 75 },
    { name: "SQL", level: 85 },
    { name: "API Testing", level: 90 },
    { name: "GraphQL Validation", level: 85 },
  ],
  tools: ["Jira", "Postman", "TestNG", "Zoho Sprint", "MantisBT", "GitHub"],
  soft: ["Communication", "Analytical Thinking", "Teamwork", "Problem Solving", "Attention to Detail"],
};

const experience = [
  {
    role: "QA Tester",
    company: "SecurityBoat Cybersecurity Solutions Pvt. Ltd.",
    duration: "Nov 2025 – Present",
    description: [
      "Led manual and automation testing for a web-based Pentest platform and 20+ GraphQL APIs.",
      "Designed and executed 100+ test cases and regression suites improving release stability.",
      "Automated critical regression scenarios using Selenium, reducing manual effort by ~30%.",
      "Validated GraphQL queries, authentication, schema integrity, and edge cases using Postman.",
    ],
  },
  {
    role: "Junior Software Tester",
    company: "Oriontech Softwares",
    duration: "Jul 2024 – Sep 2025",
    description: [
      "Tested 'SevakArmy' NGO web platform ensuring functionality, usability, and cross-browser compatibility.",
      "Executed 80+ functional and regression test cases per release cycle.",
      "Identified and reported 150+ defects, strengthening pre-release quality assurance.",
      "Performed end-to-end testing for volunteer registration and member workflows.",
    ],
  },
  {
    role: "Software Tester Intern",
    company: "Startlazaa Pvt Ltd",
    duration: "Jan 2024 – Mar 2024",
    description: [
      "Created 50+ test scenarios and test cases from SRS documentation.",
      "Performed Functional, System, Regression, and GUI Testing.",
      "Tracked defects and supported retesting cycles for quality delivery.",
    ],
  },
];

const projects = [
  {
    title: "SevakArmy Website Testing",
    role: "Software Tester",
    description: "Comprehensive testing of an NGO website focusing on functionality, usability, and performance across devices. Managed volunteer sign-ups and member workflows.",
    tools: ["Manual Testing", "Test Cases", "Bug Reports", "Cross-browser Testing"],
    link: "#",
  },
  {
    title: "Laboratory Management System (TLIMS)",
    role: "QA Intern",
    description: "Tested a complex laboratory system with 4 modules. Automated lab workflows and tracked data related to samples, instruments, and tests.",
    tools: ["Functional Testing", "System Testing", "Regression Testing", "GUI Testing"],
    link: "#",
  },
  {
    title: "GraphQL API Validation Suite",
    role: "QA Tester",
    description: "Developed a validation suite for 20+ GraphQL APIs, ensuring schema integrity and authentication security for a Pentest platform.",
    tools: ["Postman", "GraphQL", "API Testing", "Security Testing"],
    link: "#",
  },
];

const certifications = [
  {
    name: "ISTQB Certified Tester – Foundation Level (CTFL)",
    issuer: "ISTQB",
    date: "June 2024",
  },
  {
    name: "Software Testing (Manual + Automation with Core Java)",
    issuer: "SevenMentor Institute",
    date: "2024",
  },
];

const testimonials = [
  {
    name: "Saurabh Deshmukh",
    title: "Senior Developer, SecurityBoat",
    quote: "Nikesh has an incredible eye for detail. His testing on our GraphQL APIs was thorough, and he caught several edge cases that we had overlooked during development.",
  },
  {
    name: "Mayur Kardile",
    title: "Test Lead, Oriontech",
    quote: "Working with Nikesh was a pleasure. He is a proactive communicator and always ensures that bug reports are clear and actionable, which significantly sped up our dev cycles.",
  },
  {
    name: "Unmesh Shinde",
    title: "Test Lead, Oriontech",
    quote: "Nikesh showed great potential during his tenure. His ability to quickly understand complex SRS documentation and translate them into effective test cases was impressive.",
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Replace these with your actual EmailJS credentials
      // You can get these from https://www.emailjs.com/
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_default";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_default";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "public_key_placeholder";

      if (publicKey === "public_key_placeholder") {
        // Fallback for demo purposes if keys aren't set
        console.log("Form submitted locally:", formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "nikeshs984@gmail.com",
        },
        publicKey
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    viewport: { once: true, margin: "-100px" },
  };

  const revealText = {
    initial: { clipPath: "inset(0 100% 0 0)" },
    whileInView: { clipPath: "inset(0 0% 0 0)" },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1, ease: [0.45, 0.05, 0.55, 0.95] }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10 selection:text-primary overflow-x-hidden bg-dot">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: y2 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-[40%] right-[5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: y3 }}
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-[70%] left-[10%] w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "bg-transparent py-4 md:py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <motion.a 
            href="#" 
            className="text-2xl font-bold tracking-tighter text-primary hover:opacity-80 transition-opacity"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            NS<span className="text-foreground/50">.</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "sm" }), "rounded-full px-6")}
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={cn(buttonVariants(), "w-full rounded-full")}
                >
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 overflow-hidden bg-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        </div>

        <motion.div 
          className="container mx-auto px-6 text-center"
          variants={staggerContainer}
          initial="initial"
          animate="whileInView"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div variants={scaleIn}>
            <Badge variant="secondary" className="mb-6 px-4 py-1 rounded-full text-sm font-medium">
              Available for new challenges
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-glow"
            variants={fadeInUp}
          >
            Nikesh <span className="text-primary">Shinde</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            variants={fadeInUp}
          >
            Software Tester | QA Engineer
            <br />
            <span className="text-lg md:text-xl font-normal opacity-80">
              Passionate about delivering high-quality software and ensuring bug-free user experiences.
            </span>
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeInUp}
          >
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 h-12 text-base group hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300")}
            >
              View Resume <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8 h-12 text-base")}
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div 
            className="mt-16 flex justify-center gap-6 text-muted-foreground"
            variants={fadeInUp}
          >
            <a href="https://github.com/nikeshshinde7620" target="_blank" className="hover:text-primary transition-colors"><Github size={24} /></a>
            <a href="https://linkedin.com/in/nikesh-shinde-2207r" target="_blank" className="hover:text-primary transition-colors"><Linkedin size={24} /></a>
            <a href="mailto:nikeshs984@gmail.com" className="hover:text-primary transition-colors"><Mail size={24} /></a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-secondary/30 scroll-mt-24 relative overflow-hidden">
        <div className="container mx-auto max-w-5xl py-6">
          <motion.div {...fadeInUp} className="text-center mb-8">
            <motion.h2 variants={revealText} initial="initial" whileInView="whileInView" className="text-3xl md:text-4xl font-bold mb-4">About Me</motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              className="h-1.5 bg-primary mx-auto rounded-full" 
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInLeft} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I am a results-driven QA Tester with over 2 years of experience in Manual and Automation Testing of web applications and GraphQL APIs. 
              </p>
              <p>
                My expertise lies in Selenium (Core Java), API testing using Postman, SQL validation, and defect lifecycle management. I have a proven ability to reduce production defects and improve release quality in Agile product environments.
              </p>
              <p>
                I am passionate about quality assurance, problem-solving, and have a keen attention to detail that helps me identify edge cases and ensure a seamless user experience.
              </p>
            </motion.div>
            <motion.div {...fadeInRight} className="grid grid-cols-2 gap-4">
              <Card className="border-none shadow-sm bg-background/50 backdrop-blur card-glow">
                <CardContent className="p-6 text-center">
                  <Bug className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-2xl">250+</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Defects Found</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-background/50 backdrop-blur card-glow">
                <CardContent className="p-6 text-center">
                  <Terminal className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-2xl">2+</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Years Exp</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-background/50 backdrop-blur card-glow">
                <CardContent className="p-6 text-center">
                  <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-2xl">100+</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Test Cases</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-background/50 backdrop-blur card-glow">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-2xl">Agile</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Methodology</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding scroll-mt-24 relative">
        <div className="container mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <motion.h2 variants={revealText} initial="initial" whileInView="whileInView" className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              className="h-1.5 bg-primary mx-auto rounded-full" 
            />
          </motion.div>

          <Tabs defaultValue="technical" className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-10">
              <TabsList className="grid w-full max-w-md grid-cols-3 rounded-full p-1 h-12">
                <TabsTrigger value="technical" className="rounded-full">Technical</TabsTrigger>
                <TabsTrigger value="tools" className="rounded-full">Tools</TabsTrigger>
                <TabsTrigger value="soft" className="rounded-full">Soft Skills</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="technical">
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-8"
              >
                {skills.technical.map((skill) => (
                  <motion.div key={skill.name} variants={fadeInUp} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="tools">
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-4"
              >
                {skills.tools.map((tool) => (
                  <motion.div
                    key={tool}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 bg-secondary rounded-xl font-medium text-primary border border-border/50"
                  >
                    {tool}
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="soft">
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                {skills.soft.map((skill) => (
                  <motion.div key={skill} variants={fadeInUp}>
                    <Card className="border-none shadow-sm bg-secondary/50 h-full card-glow">
                      <CardContent className="p-6 flex items-center gap-3">
                        <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{skill}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding bg-secondary/30 scroll-mt-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <motion.h2 variants={revealText} initial="initial" whileInView="whileInView" className="text-3xl md:text-4xl font-bold mb-4">Work Experience</motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              className="h-1.5 bg-primary mx-auto rounded-full" 
            />
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent"
          >
            {experience.map((exp, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Briefcase size={18} />
                </div>
                {/* Content */}
                <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] border-none shadow-md hover:shadow-lg transition-shadow card-glow">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <Badge variant="outline" className="w-fit">{exp.duration}</Badge>
                    </div>
                    <CardTitle className="text-xl">{exp.role}</CardTitle>
                    <CardDescription className="text-primary font-medium">{exp.company}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding scroll-mt-24">
        <div className="container mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <motion.h2 variants={revealText} initial="initial" whileInView="whileInView" className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              className="h-1.5 bg-primary mx-auto rounded-full" 
            />
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="h-full flex flex-col border-none shadow-md hover:shadow-2xl transition-all overflow-hidden group card-glow">
                  <div className="h-48 bg-primary/5 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                    <Bug className="w-16 h-16 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-background/80 backdrop-blur text-primary border-primary/20">{project.role}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tools.map((tool) => (
                        <Badge key={tool} variant="secondary" className="text-[10px] uppercase tracking-wider">{tool}</Badge>
                      ))}
                    </div>
                    <a 
                      href={project.link} 
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full rounded-full group")}
                    >
                      View Details <ExternalLink className="ml-2 w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding bg-secondary/30 scroll-mt-24">
        <div className="container mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <motion.h2 variants={revealText} initial="initial" whileInView="whileInView" className="text-3xl md:text-4xl font-bold mb-4">Testimonials</motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              className="h-1.5 bg-primary mx-auto rounded-full" 
            />
            <p className="mt-6 text-muted-foreground max-w-lg mx-auto">
              What colleagues and clients have to say about my work and dedication to quality.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
              >
                <Card className="h-full border-none shadow-md bg-background relative overflow-hidden group hover:shadow-lg transition-shadow card-glow">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote size={64} className="text-primary" />
                  </div>
                  <CardContent className="p-8 pt-10">
                    <Quote className="text-primary mb-4 opacity-50" size={24} />
                    <p className="text-muted-foreground italic mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <Separator className="mb-6 opacity-50" />
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-primary font-medium">{testimonial.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="section-padding bg-secondary/30 scroll-mt-24">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education */}
            <motion.div {...fadeInLeft}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <GraduationCap size={24} />
                </div>
                <h2 className="text-2xl font-bold">Education</h2>
              </div>
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow card-glow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge>2025</Badge>
                  </div>
                  <CardTitle className="text-lg">Master of Computer Applications (MCA)</CardTitle>
                  <CardDescription className="text-primary font-medium">Dr. D Y Patil University, Pune</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Certifications */}
            <motion.div {...fadeInRight}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Award size={24} />
                </div>
                <h2 className="text-2xl font-bold">Certifications</h2>
              </div>
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {certifications.map((cert, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow card-glow">
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-muted-foreground">{cert.date}</span>
                        </div>
                        <CardTitle className="text-base">{cert.name}</CardTitle>
                        <CardDescription className="text-sm">{cert.issuer}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div {...scaleIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to work together?</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg max-w-2xl mx-auto">
              Download my full resume to see a detailed breakdown of my experience, certifications, and technical skills.
            </p>
            <a 
              href="/resume.pdf" 
              download="Nikesh_Shinde_Resume.pdf"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "rounded-full px-10 h-14 text-lg font-bold group hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300")}
            >
              <Download className="mr-2 w-5 h-5 group-hover:translate-y-0.5 transition-transform" /> Download Resume
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding scroll-mt-24">
        <div className="container mx-auto max-w-5xl">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
            <p className="mt-6 text-muted-foreground max-w-lg mx-auto">
              Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new challenges.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div {...fadeInLeft} className="lg:col-span-2 space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p className="text-muted-foreground">nikeshs984@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Phone</h4>
                  <p className="text-muted-foreground">+91 7620129782</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Linkedin size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">LinkedIn</h4>
                  <a href="https://linkedin.com/in/nikesh-shinde-2207r" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">nikesh-shinde-2207r</a>
                </div>
              </div>
              
              <Separator />
              
              <div className="pt-4">
                <h4 className="font-bold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/nikeshshinde7620" 
                    target="_blank"
                    className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full")}
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href="https://linkedin.com/in/nikesh-shinde-2207r" 
                    target="_blank"
                    className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full")}
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInRight} className="lg:col-span-3">
              <Card className="border-none shadow-lg p-2">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe" 
                          className="rounded-xl" 
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input 
                          name="email"
                          type="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com" 
                          className="rounded-xl" 
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Project Inquiry" 
                        className="rounded-xl" 
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="How can I help you?" 
                        className="min-h-[150px] rounded-xl resize-none" 
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full rounded-full h-12 text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>

                    {submitStatus === "success" && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-green-500 font-medium"
                      >
                        Message sent successfully!
                      </motion.p>
                    )}
                    {submitStatus === "error" && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-red-500 font-medium"
                      >
                        Failed to send message. Please try again.
                      </motion.p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 border-t border-border"
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold tracking-tighter text-primary">NS.</div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nikesh Shinde. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
