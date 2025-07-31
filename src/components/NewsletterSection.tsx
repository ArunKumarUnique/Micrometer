import React, { useState } from 'react';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // This would connect to your newsletter service in a real application
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Stay In Touch</h2>
          <p className="text-neutral-300 mb-8">
            Subscribe to our newsletter for exclusive offers, design tips, and new collection announcements.
          </p>

          {isSubmitted ? (
            <div className="bg-green-900/30 border border-green-700 rounded-md p-4 mb-8">
              <p className="text-green-200">Thank you for subscribing to our newsletter!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-grow px-4 py-3 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:border-amber-500 text-white placeholder:text-neutral-400"
              />
              <button 
                type="submit"
                className="bg-amber-700 text-white py-3 px-6 rounded-md font-medium hover:bg-amber-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
          
          <p className="text-sm text-neutral-400">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;