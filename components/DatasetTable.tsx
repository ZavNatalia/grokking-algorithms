import React from 'react';

type Sample = {
    temp: number;
    humidity: number;
    rain: 0 | 1;
    weekend: 0 | 1;
    sold: number;
};

export function DatasetTable({ data }: { data: Sample[] }) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10">
            <table className="min-w-[600px] w-full">
                <thead className="bg-slate-100 dark:bg-slate-800/60">
                    <tr className="text-left">
                        <Th>#</Th>
                        <Th>Temp, °C</Th>
                        <Th>Humidity, %</Th>
                        <Th>Rain</Th>
                        <Th>Weekend</Th>
                        <Th>Sold</Th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((r, i) => (
                        <tr
                            key={i}
                            className="odd:bg-slate-50 even:bg-white dark:odd:bg-slate-800/30 dark:even:bg-slate-800/10"
                        >
                            <Td className="text-slate-400">{i + 1}</Td>
                            <Td className="font-mono">{r.temp}</Td>
                            <Td className="font-mono">{r.humidity}</Td>
                            <Td>
                                <Badge
                                    on={r.rain === 1}
                                    icon={r.rain === 1 ? '🌧️' : '⛅'}
                                    yes="rain"
                                    no="no rain"
                                />
                            </Td>
                            <Td>
                                <Badge
                                    on={r.weekend === 1}
                                    icon=""
                                    yes="weekend"
                                    no="weekday"
                                />
                            </Td>
                            <Td className="font-semibold">{r.sold}</Td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Th({ children }: { children: React.ReactNode }) {
    return (
        <th className="px-3 py-2 font-semibold text-slate-800 dark:text-slate-200">{children}</th>
    );
}
function Td({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}

function Badge({
    on,
    icon,
    yes,
    no,
}: {
    on: boolean;
    icon: string;
    yes: string;
    no: string;
}) {
    return (
        <span
            className={
                'inline-flex items-center gap-1 rounded-xl px-2 py-0.5 ' +
                (on
                    ? 'bg-violet-600/20 text-violet-700 dark:text-violet-200'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-600/30 dark:text-slate-200')
            }
            aria-label={on ? yes : no}
            title={on ? yes : no}
        >
            <span aria-hidden>{icon}</span>
            <span className="uppercase tracking-wide text-xs">
                {on ? yes : no}
            </span>
        </span>
    );
}
