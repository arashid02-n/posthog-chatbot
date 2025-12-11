import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "PostHog Chatbot",
  description: "Analytics + AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>

        {/* PostHog Snippet */}
        <Script id="posthog-init" strategy="afterInteractive">
          {`
            !function(t,e){var o,n,p,r;
            if(!e.__SV){
              window.posthog = e; e._i = [];
              e.init=function(i,s,a){
                function g(t,e){
                  var o=e.split(".");
                  if(o.length==2){ t=t[o[0]]; e=o[1]; }
                  t[e]=function(){
                    t.push([e].concat(Array.prototype.slice.call(arguments,0)));
                  }
                }
                p=t.createElement("script");
                p.type="text/javascript"; p.async=!0; p.crossOrigin="anonymous";
                p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js";
                r=t.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(p,r);
                
                var u=e;
                if(a){ u=e[a]=[]; } else { a="posthog"; }
                u.people=u.people||[];
                
                var funcs="init capture identify alias ...".split(" ");
                for(o=0;o<funcs.length;o++) g(u,funcs[o]);

                e._i.push([i,s,a]);
              };
              e.__SV=1;
            }
          `}
        </Script>

        <Script id="posthog-config" strategy="afterInteractive">
          {`
            posthog.init('phc_9LhkwALp1yKFMroS5JzNMXe7OvkmO4LdepFj5m6zX1X', {
              api_host: 'https://us.i.posthog.com',
              autocapture: true
            });
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
