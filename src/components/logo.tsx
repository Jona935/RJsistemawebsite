import * as React from 'react';

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width={40}
        height={40}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                <stop offset="50%" style={{ stopColor: 'hsl(var(--accent))' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))' }} />
            </linearGradient>
            <mask id="jr-cutout-mask">
                <rect width="100" height="100" rx="20" fill="white" />
                <text
                    x="50%"
                    y="50%"
                    dy=".1em"
                    fontFamily="Roboto, sans-serif"
                    fontWeight="bold"
                    fontSize="50"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="black"
                >
                    JR
                </text>
            </mask>
        </defs>
        <rect
            width="100"
            height="100"
            fill="url(#logo-gradient)"
            mask="url(#jr-cutout-mask)"
        />
    </svg>
);

export default Logo;
