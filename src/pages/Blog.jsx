import React from 'react';
import { Calendar, User, Tag, ChevronRight, Search, ArrowRight } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Blog = () => {
  // Sample blog posts data with long descriptions
  const blogPosts = [
    {
      id: 1,
      title: "Top 5 Trends in Software Development for 2024",
      excerpt: "Discover the latest trends shaping the software development industry in 2024, from AI integration to cloud-native architectures.",
      description: "The software development landscape is constantly evolving, and 2024 brings exciting new trends that are transforming how we build and deploy applications. Artificial Intelligence continues to revolutionize the way we write code, with AI-powered development tools becoming increasingly sophisticated. These tools can now predict code completion, identify bugs before they occur, and even generate entire functions based on natural language descriptions. Cloud-native architectures are becoming the standard, with microservices, containers, and serverless computing enabling unprecedented scalability and flexibility. Edge computing is gaining traction, bringing computation closer to data sources and reducing latency for real-time applications. Low-code and no-code platforms are democratizing software development, allowing non-technical users to create functional applications. Finally, cybersecurity is being integrated into every stage of the development lifecycle, shifting from a reactive approach to a proactive security-first mindset.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
      date: "March 15, 2024",
      author: "John Doe",
      category: "Technology",
      readTime: "8 min read",
      tags: ["Software Development", "Trends", "Technology", "AI", "Cloud"]
    },
    {
      id: 2,
      title: "How Cloud Computing Can Benefit Your Business",
      excerpt: "Learn how cloud computing can transform your business operations, reduce costs, and improve scalability and security.",
      description: "Cloud computing has revolutionized the way businesses operate, offering unprecedented flexibility and cost savings. By migrating to the cloud, companies can eliminate the need for expensive on-premises hardware and reduce IT maintenance costs significantly. Cloud services provide automatic scalability, allowing businesses to easily adjust resources based on demand without overprovisioning. This elasticity is particularly valuable for businesses with seasonal fluctuations or unpredictable growth patterns. Disaster recovery and data backup become seamless with cloud providers offering robust redundancy across multiple geographic locations. Security is enhanced through enterprise-grade encryption, regular security updates, and compliance certifications that many small to medium businesses couldn't afford independently. Collaboration improves dramatically as teams can access files and applications from anywhere, enabling remote work and global teamwork. The pay-as-you-go model transforms capital expenditure into operational expenditure, improving cash flow and financial flexibility. Additionally, cloud platforms provide access to cutting-edge technologies like AI, machine learning, and big data analytics that would be prohibitively expensive to implement on-premises.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
      date: "March 10, 2024",
      author: "Jane Smith",
      category: "Cloud",
      readTime: "10 min read",
      tags: ["Cloud Computing", "Business", "AWS", "Azure", "Scalability"]
    },
    {
      id: 3,
      title: "Announcing Our New Process Management Tool",
      excerpt: "Introducing our latest innovation in process management and automation, designed to streamline your workflows.",
      description: "We're excited to announce the launch of our new Process Management Tool, designed to help businesses automate and optimize their workflows like never before. This powerful solution combines the best of business process management (BPM) with intelligent automation capabilities. The tool features an intuitive drag-and-drop interface that allows users to design complex workflows without writing a single line of code. Advanced analytics provide real-time visibility into process bottlenecks, cycle times, and resource utilization, enabling data-driven decision making. The system integrates seamlessly with existing enterprise software including CRM, ERP, and communication platforms through our extensive API library. Automated task routing ensures work reaches the right people at the right time, reducing delays and improving accountability. Built-in compliance features help organizations meet regulatory requirements by maintaining detailed audit trails and enforcing approval hierarchies. The mobile app allows team members to approve requests, submit information, and track progress from anywhere. Early adopters have reported up to 40% reduction in process completion times and significant improvements in team productivity. The tool also includes AI-powered recommendations for process optimization based on historical data patterns.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      date: "March 5, 2024",
      author: "Mike Johnson",
      category: "AI",
      readTime: "9 min read",
      tags: ["AI", "Automation", "Process Management", "BPM", "Workflow"]
    },
    {
      id: 4,
      title: "The Future of Mobile App Development",
      excerpt: "Explore emerging technologies and frameworks that are shaping the future of mobile application development.",
      description: "Mobile app development continues to evolve rapidly, with new frameworks and technologies emerging every year. Cross-platform development has matured significantly, with Flutter and React Native offering near-native performance while maintaining a single codebase. This approach reduces development time and costs by 30-40% compared to building separate native apps. The rise of 5G technology is enabling richer, more responsive mobile experiences with real-time streaming, AR/VR applications, and cloud-rendered graphics becoming mainstream. Progressive Web Apps (PWAs) are blurring the line between web and mobile, offering app-like experiences without app store friction. Artificial intelligence is being integrated directly into mobile apps, enabling features like real-time language translation, image recognition, and personalized content recommendations. Foldable devices and new form factors are challenging developers to create adaptive layouts that work seamlessly across different screen sizes and orientations. App security is receiving renewed focus with biometric authentication, encrypted storage, and secure API communication becoming standard requirements. Instant apps and app clips allow users to try functionality without full installation, reducing friction in user acquisition. The Internet of Things (IoT) integration means mobile apps are increasingly acting as control centers for smart homes, wearables, and connected devices. Development tools are becoming more sophisticated with hot reload, automated testing, and CI/CD pipelines specifically optimized for mobile workflows.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
      date: "February 28, 2024",
      author: "Sarah Williams",
      category: "Mobile",
      readTime: "12 min read",
      tags: ["Mobile Apps", "iOS", "Android", "Flutter", "React Native"]
    },
    {
      id: 5,
      title: "Cybersecurity Best Practices for 2024",
      excerpt: "Protect your business with these essential cybersecurity practices and strategies for the coming year.",
      description: "As cyber threats become more sophisticated, it's crucial to stay ahead with robust security measures. Zero Trust Architecture has moved from concept to necessity, assuming no user or device should be trusted by default, even inside the network perimeter. Multi-factor authentication (MFA) is now non-negotiable, with biometrics and hardware tokens providing stronger protection than SMS-based methods. Regular security awareness training for employees is critical, as human error remains the leading cause of security breaches. Phishing simulations and security drills help build a security-conscious culture. Automated patch management ensures vulnerabilities are addressed quickly, with critical patches often requiring deployment within 48 hours. Data encryption should be implemented both at rest and in transit, with proper key management practices. Regular backup testing and disaster recovery drills ensure business continuity when incidents occur. Endpoint detection and response (EDR) solutions provide real-time monitoring and automated threat response across all devices. Supply chain security is gaining attention, with organizations needing to vet third-party vendors and monitor their security posture. Incident response plans should be documented, tested, and updated regularly. Cloud security requires shared responsibility understanding and proper configuration of security groups, IAM roles, and encryption settings. Regulatory compliance (GDPR, CCPA, HIPAA) continues to drive security investments, with non-compliance penalties reaching millions of dollars. Security audits and penetration testing should be conducted at least annually, with more frequent testing for critical systems.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
      date: "February 20, 2024",
      author: "David Brown",
      category: "Security",
      readTime: "15 min read",
      tags: ["Cybersecurity", "Security", "Data Protection", "Zero Trust", "MFA"]
    },
    {
      id: 6,
      title: "Why Your Business Needs a Digital Transformation",
      excerpt: "Understanding the importance of digital transformation and how it can drive business growth and innovation.",
      description: "Digital transformation is no longer optional - it's essential for businesses to remain competitive in today's market. This strategic initiative involves integrating digital technology into all areas of business, fundamentally changing how you operate and deliver value to customers. Companies that embrace digital transformation see significant improvements in operational efficiency, often reducing costs by 20-30% through automation and streamlined processes. Customer expectations have evolved, with modern consumers demanding seamless omnichannel experiences, personalized interactions, and instant service. Digital transformation enables businesses to meet these expectations through CRM integration, AI-powered chatbots, and unified customer data platforms. Data-driven decision making becomes possible when analog processes are digitized, providing real-time insights into business performance, customer behavior, and market trends. Employee productivity improves through modern collaboration tools, automated workflows, and self-service portals that reduce time spent on administrative tasks. Digital transformation enables new business models like subscription services, platform-based ecosystems, and data monetization that weren't possible before. Agility improves dramatically, allowing businesses to respond quickly to market changes, customer feedback, and competitive pressures. Innovation accelerates as digital tools enable rapid prototyping, A/B testing, and continuous deployment of new features. The cultural shift towards digital-first thinking encourages experimentation, calculated risk-taking, and continuous learning. However, successful transformation requires strong leadership commitment, change management strategies, and investment in employee training. Organizations should start with a clear vision, prioritize quick wins to build momentum, and scale successful initiatives gradually.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=400&fit=crop",
      date: "February 15, 2024",
      author: "Emily Chen",
      category: "Business",
      readTime: "14 min read",
      tags: ["Digital Transformation", "Business Strategy", "Innovation", "Customer Experience"]
    },
    {
      id: 7,
      title: "The Rise of Artificial Intelligence in Everyday Business",
      excerpt: "How AI is transforming daily business operations and creating new opportunities for growth and efficiency.",
      description: "Artificial Intelligence has moved from science fiction to everyday business reality, transforming operations across every industry sector. Machine learning algorithms now power recommendation engines that drive 35% of Amazon's revenue and 80% of content watched on Netflix. Natural language processing enables chatbots and virtual assistants that handle millions of customer inquiries daily, reducing response times from hours to seconds while cutting support costs by up to 30%. Computer vision is revolutionizing quality control in manufacturing, detecting defects invisible to the human eye with 99% accuracy. Predictive analytics helps businesses forecast demand, optimize inventory, and prevent equipment failures before they occur, saving millions in downtime costs. In marketing, AI analyzes customer behavior to personalize campaigns, optimize ad spend, and predict customer lifetime value with remarkable accuracy. HR departments use AI to screen resumes, schedule interviews, and identify candidates most likely to succeed, reducing time-to-hire by 70%. Finance teams leverage AI for fraud detection, risk assessment, and automated reconciliation, processing millions of transactions in real-time. Sales teams benefit from AI-powered lead scoring, opportunity forecasting, and next-best-action recommendations that increase conversion rates by 20-30%. However, successful AI implementation requires quality data, clear use cases, and change management to help employees trust and adopt AI tools. Ethical considerations around bias, transparency, and data privacy must be addressed proactively. The future will bring even more sophisticated AI applications, from autonomous decision-making systems to creative AI that generates marketing content, designs products, and writes code.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      date: "February 10, 2024",
      author: "Alex Thompson",
      category: "AI",
      readTime: "13 min read",
      tags: ["Artificial Intelligence", "Machine Learning", "Business Automation", "Analytics"]
    },
    {
      id: 8,
      title: "Building a Remote-First Culture That Works",
      excerpt: "Strategies and best practices for creating a thriving remote work environment that drives productivity and engagement.",
      description: "The shift to remote work has fundamentally changed how we think about workplace culture, collaboration, and productivity. Successful remote-first companies have discovered that intentional culture-building is more important than ever when teams are distributed. Communication becomes the lifeblood of remote operations, requiring clear guidelines about response times, communication channels, and documentation practices. Asynchronous communication should be prioritized over real-time interruptions, allowing team members to focus deeply on complex tasks while still staying connected. Video calls maintain human connection, with practices like starting meetings with personal check-ins and using breakout rooms for small group discussions. Digital tools create virtual water coolers through channels dedicated to non-work topics, virtual coffee breaks, and online game sessions. Trust becomes the foundation of remote management, shifting focus from hours worked to outcomes achieved. Managers need training in leading distributed teams, including how to provide feedback, recognize achievements, and support well-being from a distance. Documentation becomes critical, with wikis, knowledge bases, and recorded meetings ensuring information is accessible across time zones. Onboarding processes must be redesigned for remote success, including buddy systems, structured training, and intentional social connections. Regular team retreats and in-person gatherings, even if only quarterly, strengthen relationships and alignment. Mental health support is particularly important for remote workers who may experience isolation or burnout. Companies need to invest in home office stipends, ergonomic equipment, and internet subsidies to set employees up for success. Results from remote-first companies show productivity increases of 15-30%, lower turnover rates, and access to global talent pools. The future of work is hybrid for many, but remote-first principles benefit all organizations regardless of their specific model.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
      date: "February 5, 2024",
      author: "Maria Garcia",
      category: "Business",
      readTime: "11 min read",
      tags: ["Remote Work", "Company Culture", "Leadership", "Productivity"]
    }
  ];

  // Categories with counts
  const categories = [
    { name: "Technology", count: 15 },
    { name: "Cloud", count: 10 },
    { name: "AI", count: 12 },
    { name: "Mobile", count: 8 },
    { name: "Security", count: 9 },
    { name: "Business", count: 11 }
  ];

  // Popular tags
  const popularTags = [
    "Software Development", "Cloud Computing", "Artificial Intelligence", 
    "Machine Learning", "Cybersecurity", "Mobile Apps", "DevOps", 
    "Data Analytics", "Digital Transformation", "React", "Python", "AWS"
  ];

  return (
    <div className="bg-slate-50 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0f3b2c] to-[#1a5d4a] text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Insights, thoughts, and industry trends from our expert team
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Blog Posts Grid */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {blogPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 transition-all duration-300 group">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#0f3b2c] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-700 text-base leading-relaxed mb-4">
                        {post.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                        {post.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-green-100 hover:text-green-700 cursor-pointer transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-3 mt-12">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-[#0f3b2c] hover:text-white transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-[#0f3b2c] text-white rounded-lg">1</button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-[#0f3b2c] hover:text-white transition-colors">
                  2
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-[#0f3b2c] hover:text-white transition-colors">
                  3
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-[#0f3b2c] hover:text-white transition-colors">
                  Next
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Search Bar */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Search Articles</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search blog posts..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0f3b2c] focus:ring-2 focus:ring-green-100"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category, idx) => (
                    <div key={idx} className="flex justify-between items-center hover:text-[#0f3b2c] cursor-pointer transition-colors group">
                      <span className="text-gray-600 group-hover:text-[#0f3b2c]">{category.name}</span>
                      <span className="text-gray-400 text-sm">({category.count})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[#0f3b2c] hover:text-white cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="bg-gradient-to-br from-[#0f3b2c] to-[#1a5d4a] rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Subscribe to Newsletter</h3>
                <p className="text-green-100 text-sm mb-4">
                  Get the latest tech insights and industry trends delivered straight to your inbox.
                </p>
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-lg text-gray-800 mb-3 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <button className="w-full bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  Subscribe <ArrowRight size={16} />
                </button>
                <p className="text-green-200 text-xs mt-3">
                  No spam, unsubscribe anytime.
                </p>
              </div>

              {/* Featured Post */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Featured Post</h3>
                <div className="space-y-4">
                  <div className="relative h-40 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1551434678-e076c2235a32?w=400&h=200&fit=crop" 
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-800 hover:text-[#0f3b2c] cursor-pointer text-lg">
                    The Complete Guide to Digital Transformation in 2024
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Everything you need to know about transforming your business for the digital age, including strategies, tools, and success metrics.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-400">March 1, 2024</span>
                    <span className="text-xs text-green-600 font-semibold">8 min read</span>
                  </div>
                </div>
              </div>

              {/* Recent Comments */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Comments</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-800">John Smith</span> on 
                      <span className="text-[#0f3b2c]"> "Top 5 Trends in Software Development"</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Great insights! Really helpful article.</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-800">Sarah Johnson</span> on 
                      <span className="text-[#0f3b2c]"> "How Cloud Computing Can Benefit Your Business"</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">We're considering cloud migration, this helps a lot!</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-800">Mike Wilson</span> on 
                      <span className="text-[#0f3b2c]"> "The Rise of Artificial Intelligence"</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">AI is truly changing everything. Great read!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Want to Contribute?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Have insights to share with our community? We're always looking for guest contributors and industry experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#0f3b2c] hover:bg-[#1a4d3a] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Become a Contributor
            </button>
            <button className="border-2 border-[#0f3b2c] text-[#0f3b2c] hover:bg-[#0f3b2c] hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;