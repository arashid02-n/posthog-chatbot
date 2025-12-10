# Cloudflare Setup Guide (posthog.rashidnazari.com)

1. Add DNS ⇒ A Record
   - Type: A
   - Name: posthog
   - IPv4: 157.180.68.61
   - Proxy: ON (orange cloud)

2. SSL/TLS
   - Mode: Full (strict)
   - Always Use HTTPS: ON

3. Caching
   - Create Page Rule:
       URL pattern: https://posthog.rashidnazari.com/api/*
       Setting: Cache Level → Bypass

4. Security
   - Allow inbound traffic on ports: 80, 443
   - No firewall rule should block NGINX or Docker

