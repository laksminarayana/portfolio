# Software Engineer Portfolio

Premium multi-page React portfolio for Venkata Lakshmi Narayana Misala.

## Run locally

```powershell
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

## Production build

```powershell
npm run build
npm run preview
```

## Contact configuration

Create a `.env.local` file for secure integrations:

```text
VITE_CONTACT_ENDPOINT=https://your-api.example/contact
VITE_CONTACT_EMAIL=your-real-email@example.com
VITE_WHATSAPP_NUMBER=919876543210
```

`VITE_CONTACT_ENDPOINT` should point to a server-side email service such as Resend or EmailJS configured with environment variables on the server. Never put API keys or email secrets in `VITE_*` values.

Replace the sample email and WhatsApp number with your own values. Configure either `VITE_CONTACT_ENDPOINT` or `VITE_CONTACT_EMAIL` for email contact. When no endpoint or email is configured, the form reports that setup is needed instead of claiming a message was sent. The WhatsApp action is enabled by setting `VITE_WHATSAPP_NUMBER` to your country code and number with digits only.

## Assets

- Profile photo: `src/assets/profile.jpeg`
- Certificate PDFs: `public/certificates/`
