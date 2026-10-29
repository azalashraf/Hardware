# Sunrise Enterprises — Hardware Shop Website Prototype

A responsive, frontend-only showcase website built with HTML, CSS, and vanilla JavaScript.

## Files

- `index.html` — page structure and content
- `style.css` — layout, visual design, responsive styling
- `script.js` — mobile navigation, product enquiry actions, WhatsApp form, and demo configuration
- `assets/favicon.svg` — simple site icon

## Preview locally

1. Extract the ZIP file.
2. Open the `sunrise-enterprises` folder.
3. Double-click `index.html` to preview in a browser.

For a more realistic local development workflow, open the folder in VS Code and use the **Live Server** extension.

## Configure real business details

Open `script.js` and update:

```js
const BUSINESS_CONFIG = {
  whatsappNumber: "91XXXXXXXXXX",
  phoneNumber: "+91XXXXXXXXXX",
  businessName: "Sunrise Enterprises"
};
```

Use the client's confirmed WhatsApp number in international format with digits only, for example `91` followed by the Indian mobile number. Set `phoneNumber` to the confirmed phone number. Do not publish until these details are verified.

In `index.html`, replace:
- `[Client phone number]`
- `[Client WhatsApp number]` if you choose to display it
- `[Client business address]`
- `[Client business hours]`

Update the product categories and descriptions to match the actual shop. The current categories are illustrative only.

## Images

This prototype uses image URLs hosted by Unsplash. An internet connection is required to load them. Before production use, verify each image and its licence/usage terms, or replace the URLs with approved local image assets inside `assets/`.
## Important prototype notes

- This is a showcase website, not an e-commerce store.
- No backend, database, admin dashboard, cart, payment, or inventory system is included.
- The enquiry form opens a prepared WhatsApp message after the real number is configured. It does not store form submissions or send messages automatically.
- Replace placeholders and confirm all business details before presenting it as a live business website.
