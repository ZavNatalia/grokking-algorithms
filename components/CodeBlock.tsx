'use client';

import * as React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

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
    const timerRef = React.useRef<ReturnType<typeof setTimeout>>(null);
    const { resolvedTheme } = useTheme();

    // resolvedTheme undefined на сервере — используем vsDark как SSR-дефолт.
    // next-themes синхронизирует тему до гидрации через скрипт в <head>,
    // поэтому визуально мигание минимально.
    const codeTheme = resolvedTheme === 'light' ? themes.github : themes.vsDark;

    const onCopy = async () => {
        let success = false;
        try {
            await navigator.clipboard.writeText(code);
            success = true;
        } catch {
            const textarea = document.createElement('textarea');
            textarea.value = code;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                success = document.execCommand('copy');
            } finally {
                document.body.removeChild(textarea);
            }
        }
        if (!success) return;
        setCopied(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), 1200);
    };

    React.useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <div
            className={`relative my-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/60 ${className}`}
        >
            <div className="flex items-center justify-between bg-slate-100 px-4 py-2 text-lg dark:bg-slate-800/60">
                <span className="truncate">{filename ?? ''}</span>
                <button
                    type="button"
                    onClick={onCopy}
                    className={clsx(
                        'rounded-md px-2 py-1 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:hover:bg-slate-700/50',
                        copied ? 'cursor-default' : 'cursor-pointer'
                    )}
                    aria-live="polite"
                >
                    {copied ? 'Скопировано' : 'Копировать'}
                </button>
            </div>

            <Highlight
                theme={codeTheme}
                code={code}
                language={language ?? 'js'}
            >
                {({
                    className: preClass,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                }) => (
                    <pre
                        className={`${preClass} m-0 overflow-x-auto p-4 text-lg`}
                        style={style}
                        suppressHydrationWarning
                    >
                        {tokens.map((line, i) => (
                            <div
                                key={i}
                                {...getLineProps({ line })}
                                className="whitespace-pre"
                                suppressHydrationWarning
                            >
                                {showLineNumbers && (
                                    <span className="select-none pr-4 opacity-40">
                                        {i + 1}
                                    </span>
                                )}
                                {line.map((token, key) => (
                                    <span
                                        key={key}
                                        {...getTokenProps({ token })}
                                        suppressHydrationWarning
                                    />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    );
}
