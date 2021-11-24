---
title: 'How to use Vercel for domain redirects'
date: '2021-11-24'
tags:
  - macos
  - vercel
---

Some domain registrars doesn't allow to for you to redirect A/C-NAMES, for some domains this is all you want. You might want some redirects for your organization like aws.organization.com should redirect to your login page on aws and so on. With Vercel you can do that easily with one json file.

### If you want to redirect `example.com` to `other-example.com`

Create a new directory for your redirects which includes the file `vercel.json`.

```json
{
  "redirects": [
    {
      "source": "/",
      "destination": "https://other-example.com",
      "permanent": true
    }
  ]
}
```

This also works for subdomains, just keep in mind that as you're using the same serivce and redirecting the `/` path you need your conditional redirects first in the redirects array.

```json
{
  "redirects": [
    {
      "source": "/",
      "destination": "https://another-example.com",
      "has": [
        {
          "type": "host",
          "value": "cool.exmaple.com"
        }
      ],
      "permanent": true
    },
    {
      "source": "/",
      "destination": "https://other-example.com",
      "permanent": true
    }
  ]
}
```

### Dns setup

In your Vercel project you need to connect your domains and update the dns for a/c-names respectively in your registrars dns settings.

### Deployment

Assuming you have the Vercel CLI installed you just execute the following commands to setup your Vercel project and deploy it.

```sh
$ vercel
$ vercel --prod
```

If you connect this Vercel project to git these changes will automatically propagate when you push to your main branch.

---

See more: [Vercel Redirects](https://vercel.com/docs/cli#project-configuration/redirects)
