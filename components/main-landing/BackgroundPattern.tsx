import React from 'react';

export default function BackgroundPattern() {
    return (
        <>
            <div className="pointer-events-none absolute inset-0 opacity-5">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <circle cx="30" cy="30" r="1.5" fill="currentColor"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)"/>
                </svg>
            </div>
            <div
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[70%] opacity-[0.03] ">
                <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Binary Tree */}
                    <circle cx="200" cy="50" r="20" stroke="currentColor" strokeWidth="3"/>
                    <line x1="200" y1="70" x2="140" y2="130" stroke="currentColor" strokeWidth="3"/>
                    <line x1="200" y1="70" x2="260" y2="130" stroke="currentColor" strokeWidth="3"/>
                    <circle cx="140" cy="150" r="18" stroke="currentColor" strokeWidth="3"/>
                    <circle cx="260" cy="150" r="18" stroke="currentColor" strokeWidth="3"/>
                    <line x1="140" y1="168" x2="100" y2="220" stroke="currentColor" strokeWidth="2"/>
                    <line x1="140" y1="168" x2="180" y2="220" stroke="currentColor" strokeWidth="2"/>
                    <line x1="260" y1="168" x2="220" y2="220" stroke="currentColor" strokeWidth="2"/>
                    <line x1="260" y1="168" x2="300" y2="220" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="100" cy="240" r="15" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="180" cy="240" r="15" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="220" cy="240" r="15" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="300" cy="240" r="15" stroke="currentColor" strokeWidth="2"/>

                    {/* Graph */}
                    <circle cx="80" cy="350" r="15" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="160" cy="320" r="15" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="240" cy="350" r="15" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="160" cy="410" r="15" stroke="currentColor" strokeWidth="2"/>
                    <line x1="80" y1="350" x2="160" y2="320" stroke="currentColor" strokeWidth="2"/>
                    <line x1="160" y1="320" x2="240" y2="350" stroke="currentColor" strokeWidth="2"/>
                    <line x1="240" y1="350" x2="160" y2="410" stroke="currentColor" strokeWidth="2"/>
                    <line x1="160" y1="410" x2="80" y2="350" stroke="currentColor" strokeWidth="2"/>
                    <line x1="80" y1="350" x2="240" y2="350" stroke="currentColor" strokeWidth="2"/>
                </svg>
            </div>
        </>
    )
}