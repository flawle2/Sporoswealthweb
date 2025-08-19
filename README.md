# Sporos Wealth Management Website

A premium wealth management website for Sporos Wealth Management, featuring elegant design and comprehensive client consultation forms.

## 🏦 About Sporos Wealth Management

Elite private wealth advisory services for discerning clients in Orange County and beyond. Specializing in:

- Investment Management
- Business Growth Consulting  
- Estate Planning
- Tax Strategy
- Philanthropic Planning

## 🌟 Website Features

### Design
- **Premium, professional design** with gold and navy color scheme
- **Responsive layout** that works on all devices
- **Smooth animations** using AOS (Animate On Scroll) library
- **Clean typography** with Playfair Display and Inter fonts

### Pages
- **Homepage** - Hero section with company overview and services
- **About** - Company philosophy and team information
- **Services** - Detailed service offerings and process explanations
- **Insights** - Links to financial research and market commentary
- **Contact** - Comprehensive consultation request form

### Key Functionality
- **EmailJS Integration** - Contact form sends emails directly
- **Phone Number Formatting** - Automatic formatting to (xxx) xxx-xxxx
- **Form Validation** - Ensures required fields are completed
- **Professional Contact Form** with fields for:
  - Personal information
  - Investment assets range
  - Services of interest
  - Consultation preferences
  - Meeting time and day preferences

## 🛠 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - Form handling and interactions
- **EmailJS** - Email service integration
- **AOS Library** - Scroll animations
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 📁 File Structure

```
sporos-wealth/
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services page  
├── insights.html           # Insights page
├── contact.html            # Contact page
├── css/
│   ├── style.css          # Main stylesheet
│   ├── about.css          # About page styles
│   ├── services.css       # Services page styles
│   ├── contact.css        # Contact page styles
│   └── insights.css       # Insights page styles
├── js/
│   ├── main.js            # Main JavaScript functionality
│   ├── services.js        # Services page interactions
│   └── new-contact.js     # Contact form handling
├── images/
│   ├── sporos-logo.png    # Company logo
│   └── team-photos/       # Team member photos
└── README.md              # This file
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd sporos-wealth
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required

3. **For development**
   - Use a local web server for best experience
   - Live Server extension in VS Code works great

## 📧 EmailJS Configuration

The contact form uses EmailJS for sending emails. To configure:

1. **Service ID**: `service_2zugw66`
2. **Template ID**: `template_v4ovcy9`
3. **Public Key**: Set in contact.html

### Template Variables
The EmailJS template should include these variables:
- `{{client_name}}` - Full name
- `{{client_email}}` - Email address
- `{{client_phone}}` - Phone number
- `{{client_assets}}` - Investment assets range
- `{{client_services}}` - Services of interest
- `{{client_consultation_type}}` - Consultation type preference
- `{{client_preferred_time}}` - Preferred meeting time
- `{{client_preferred_days}}` - Preferred meeting days
- `{{client_message}}` - Additional message
- `{{to_email}}` - Destination email

## 🎨 Customization

### Colors
Primary colors are defined in CSS custom properties:
- `--primary-navy`: #1B365D
- `--primary-gold`: #D4A574
- `--accent-gold`: #B8935A

### Fonts
- **Headers**: Playfair Display
- **Body**: Inter

### Images
Replace images in the `/images` folder with your own:
- Company logo: `sporos-logo.png`
- Team photos: Add to `/images` folder and update HTML

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)  
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📄 License

© 2024 Sporos Wealth Management. All rights reserved.

## 📞 Contact

**Sporos Wealth Management**
- **Address**: 17011 Beach Blvd, Suite 565, Huntington Beach, CA 92647
- **Phone**: (949) 729-9994
- **Email**: nasar@sporoswealth.com
- **Website**: [sporoswealth.com]

---

*Built with attention to detail for premium wealth management services.*