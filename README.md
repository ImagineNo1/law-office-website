# Law Office Website

Persian RTL law office website built with Next.js App Router, TypeScript, Tailwind CSS v4, MongoDB/Mongoose, and JWT-protected admin CMS.

## Environment Variables

Create `.env.local`:

```env
MONGODB_URI=
JWT_SECRET=
```

Runtime app requirements:

- `MONGODB_URI`
- `JWT_SECRET`

Optional seed-only variables for creating the first admin:

```env
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_NAME=
```

## Default Local Admin

In development, if no admin user exists, opening `/admin/login` automatically creates:

- Email: `admin@gmail.com`
- Password: `admin`

Change this password after first login.

Automatic default admin creation is disabled in production. In production, use `npm run seed:admin` or create an admin user manually.

## Commands

```bash
npm install
npm run seed
npm run dev
npm run lint
npm run build
```

## Seed Content

Run:

```bash
npm run seed
```

This upserts:

- Site settings and contact info
- Homepage hero, trust strip, stats, and contact CTA
- Published services
- Blog posts
- News items
- About, institute, and contact page content

If `ADMIN_EMAIL` and `ADMIN_PASSWORD` are present, `npm run seed` also creates or updates the first admin user.

To create only the first admin:

```bash
npm run seed:admin
```

Then open:

```text
http://localhost:3000/admin/login
```

## Admin CMS

Admin routes are protected by the `admin_token` httpOnly JWT cookie.

CMS areas:

- Dashboard: real counts and recent content/messages
- Blog: create, edit, delete, publish/draft posts
- News: create, edit, delete, publish/draft news
- Services: create, edit, delete, reorder services
- Pages: edit homepage content and static page content
- Messages: read/archive/delete contact submissions
- Users: create users, update role/status, reset password
- Settings: site title, logo text, contact info, social links, SEO defaults
