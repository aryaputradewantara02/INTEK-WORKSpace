import { Search, MessageCircle, FileText, ExternalLink, Phone, Mail, ChevronRight, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

const FAQS = [
  {
    question: "How do I create a new project?",
    answer: "You can create a new project by clicking the '+' button in the sidebar or using the global floating action button at the bottom right."
  },
  {
    question: "How can I invite team members?",
    answer: "Navigate to the 'Team' view and click on the 'Invite Member' button. You'll need their email address to send an invitation."
  },
  {
    question: "Where can I find my reports?",
    answer: "All generated reports are available in the 'Reports' section of the sidebar. You can filter them by date or category."
  },
  {
    question: "How do I change my notification settings?",
    answer: "Go to 'Account' > 'Notifications' to manage your email and push notification preferences."
  }
];

export function SupportView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-5xl mx-auto"
    >
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black text-on-surface font-headline mb-4">How can we help?</h1>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search for articles, guides, and more..."
            className="w-full bg-white border border-surface-container-high rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-primary/20 transition-all text-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-surface-container-high shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-on-surface mb-2">Live Chat</h3>
          <p className="text-sm text-on-surface-variant mb-4">Average response time: 5 minutes</p>
          <button className="w-full bg-primary text-white py-2 rounded-xl text-sm font-bold hover:scale-105 active:scale-95 transition-all">
            Start Chat
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-surface-container-high shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-on-surface mb-2">Email Support</h3>
          <p className="text-sm text-on-surface-variant mb-4">We'll get back to you within 24 hours</p>
          <button className="w-full bg-secondary text-white py-2 rounded-xl text-sm font-bold hover:scale-105 active:scale-95 transition-all">
            Send Email
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-surface-container-high shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-2xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-on-surface mb-2">Documentation</h3>
          <p className="text-sm text-on-surface-variant mb-4">Browse our detailed guides and API docs</p>
          <button className="w-full bg-tertiary text-white py-2 rounded-xl text-sm font-bold hover:scale-105 active:scale-95 transition-all">
            View Docs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border border-surface-container-high overflow-hidden">
                <button className="w-full p-5 text-left flex justify-between items-center hover:bg-surface-container-low transition-colors group">
                  <span className="font-bold text-on-surface group-hover:text-primary transition-colors">{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="px-5 pb-5 text-sm text-on-surface-variant leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface-container-low rounded-3xl p-6 border border-surface-container-high">
            <h3 className="font-bold text-on-surface mb-4">Still need help?</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@intek.com</span>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
            <h3 className="font-bold text-primary mb-2">Community Forum</h3>
            <p className="text-xs text-on-surface-variant mb-4">Join 10k+ users in our community forum to share tips and tricks.</p>
            <button className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
              Visit Forum
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
