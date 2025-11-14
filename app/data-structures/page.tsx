import { dataStructures } from '@/lib/ds';
import type { DSItemView } from '@/lib/ds/types';
import { DSTabsVertical } from '@/components/ds/DSTabsVertical';

export default function Page() {
    const items: DSItemView[] = dataStructures.map(({ buildSource, ...rest }) => ({
        ...rest,
        source: buildSource(), // вызываем на сервере
    }));

    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Структуры данных</h1>
            <DSTabsVertical items={items} />
        </div>
    );
}
