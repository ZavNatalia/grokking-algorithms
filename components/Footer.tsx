import Link from 'next/link';
import GitHubIcon from '@/components/icons/GitHubIcon';

const SITE_NAME = 'Алгоритмы и структуры данных';
const GITHUB_USER = 'ZavNatalia';
const GITHUB_REPO = 'grokking-algorithms';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800/50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 dark:text-slate-400">
                        &copy; {year} {SITE_NAME}
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href={`https://github.com/${GITHUB_USER}/${GITHUB_REPO}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors group dark:text-slate-400 dark:hover:text-slate-300"
                        >
                            <GitHubIcon />
                            <span className="group-hover:underline">
                                Редактировать на GitHub
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
