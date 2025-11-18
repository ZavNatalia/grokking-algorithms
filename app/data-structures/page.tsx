import { dataStructures } from '@/lib/ds';
import type { DSItemView } from '@/lib/ds/types';
import { DSTabs } from '@/components/ds/DSTabs';

export default function Page() {
    const items: DSItemView[] = dataStructures.map(({buildSource, ...rest}) => ({
        ...rest,
        source: buildSource(),
    }));

    return (
        <div className="h-full mx-auto max-w-7xl p-10">
            <h1 className="text-3xl font-semibold text-center mb-6">Структуры данных</h1>
            <DSTabs items={items}/>
        </div>
    );
}
