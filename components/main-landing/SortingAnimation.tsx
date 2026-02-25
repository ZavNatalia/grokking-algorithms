'use client';

const bars = [
    { value: 5, sortedIndex: 4 },
    { value: 2, sortedIndex: 1 },
    { value: 8, sortedIndex: 7 },
    { value: 1, sortedIndex: 0 },
    { value: 7, sortedIndex: 6 },
    { value: 3, sortedIndex: 2 },
    { value: 6, sortedIndex: 5 },
    { value: 4, sortedIndex: 3 },
];

const BAR_W = 32;
const GAP = 8;
const STEP = BAR_W + GAP;
const HEIGHT_UNIT = 24;

export default function SortingAnimation() {
    return (
        <div
            className="relative flex items-end"
            style={{ gap: GAP, height: bars.length * HEIGHT_UNIT }}
        >
            {bars.map((bar, i) => (
                <div
                    key={i}
                    className="bg-sky-400 rounded-t-sm"
                    style={
                        {
                            width: BAR_W,
                            height: bar.value * HEIGHT_UNIT,
                            opacity: 0.25 + (bar.value / 8) * 0.75,
                            '--sort-offset': `${(bar.sortedIndex - i) * STEP}px`,
                            animation: 'sort-slide 8s ease-in-out infinite',
                        } as React.CSSProperties
                    }
                />
            ))}
        </div>
    );
}
