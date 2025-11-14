import { dataStructures } from '@/lib/ds';
import { DSItemPanel } from '@/components/ds/DSItemPanel';

export default function Page() {
    return (
        <div className="space-y-6 p-10 max-w-5xl mx-auto">
            <header className="space-y-2">
                <h1 className="text-center text-3xl font-semibold">Структуры данных</h1>
                <p className="mx-auto max-w-3xl text-center text-sm opacity-80">
                    Короткие определения, когда применять, асимптотики и примеры кода.
                </p>
            </header>

            <ul className="space-y-3 max-w-3xl mx-auto">
                {dataStructures.map((ds) => (
                    <li key={ds.slug}>
                        <DSItemPanel key={ds.slug} ds={ds} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
