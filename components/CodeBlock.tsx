'use client';

import * as React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

type CodeBlockProps = {
    code: string;
    language?: string;
    filename?: string;
    showLineNumbers?: boolean;
    className?: string;
};

export function CodeBlock({
                              code,
                              language,
                              filename,
                              showLineNumbers = true,
                              className = '',
                          }: CodeBlockProps) {
    const [copied, setCopied] = React.useState(false);

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch {}
    };

    return (
        <div className={`relative my-4 overflow-hidden rounded-2xl border border-slate-700/60 ${className}`}>
            <div className="flex items-center justify-between bg-slate-800/60 px-4 py-2 text-xs">
                <span className="truncate">{filename ?? ''}</span>
                <button
                    type="button"
                    onClick={onCopy}
                    className="rounded-md px-2 py-1 transition hover:bg-slate-700/50"
                    aria-label="Скопировать код"
                >
                    {copied ? 'Скопировано' : 'Копировать'}
                </button>
            </div>

            <Highlight theme={themes.vsDark} code={code} language={language ?? 'js'}>
                {({ className: preClass, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={`${preClass} m-0 overflow-x-auto p-4 text-sm`} style={style}>
            {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="whitespace-pre">
                    {showLineNumbers && (
                        <span className="select-none pr-4 opacity-40">{i + 1}</span>
                    )}
                    {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                    ))}
                </div>
            ))}
          </pre>
                )}
            </Highlight>
        </div>
    );
}
