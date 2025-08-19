# EmailJS Template Configuration Guide

## Template Variables Being Sent from Contact Form

Your EmailJS template (template_y84zkx6) needs to include these EXACT variable names:

### Basic Contact Information:
- `{{from_name}}` - Full name (First + Last)
- `{{first_name}}` - First name only
- `{{last_name}}` - Last name only
- `{{from_email}}` or `{{email}}` - Email address
- `{{phone}}` - Phone number

### Form Specific Fields:
- `{{assets}}` - Investable assets range
- `{{services}}` - Services interested in (comma-separated)
- `{{consultation_type}}` - Type of consultation (In-Person/Virtual/Phone)
- `{{preferred_time}}` - Preferred meeting time
- `{{preferred_days}}` - Preferred days (comma-separated)
- `{{message}}` - User's message

### Alternative Variable Names (if your template uses these):
- `{{user_name}}` - Same as from_name
- `{{user_email}}` - Same as email
- `{{user_phone}}` - Same as phone
- `{{user_message}}` - Same as message

### Destination:
- `{{to_email}}` - Currently set to: nasar@sporoswealth.com

## Example EmailJS Template Content

```
Subject: New Consultation Request from {{from_name}}

You have received a new consultation request from your website.

CONTACT INFORMATION:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

CONSULTATION PREFERENCES:
Type: {{consultation_type}}
Preferred Time: {{preferred_time}}
Available Days: {{preferred_days}}

FINANCIAL INFORMATION:
Investable Assets: {{assets}}
Services Interested In: {{services}}

MESSAGE:
{{message}}

---
This email was sent to: {{to_email}}
```

## How to Update Your EmailJS Template:

1. Go to https://dashboard.emailjs.com
2. Find your template: `template_y84zkx6`
3. Edit the template
4. Copy the variable names EXACTLY as shown above (including the curly braces)
5. Save the template

## Testing Your Template:

After updating your template, test it by:
1. Open the contact page
2. Open browser console (F12)
3. Type: `testEmailDirect()`
4. Check if you receive the email with all information

## Common Issues:

- **Variable mismatch**: Make sure variable names match EXACTLY (case-sensitive)
- **Missing curly braces**: Variables must be wrapped in double curly braces: {{variable_name}}
- **Spaces in variables**: Don't add spaces: `{{from_name}}` not `{{ from_name }}`