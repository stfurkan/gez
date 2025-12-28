interface Sortable {
    [key: string]: any;
}

export default function sort<T extends Sortable>(
    array: T[],
    key: string,
    order: string
): T[] {
    return [...array].sort((a, b) => {
        const aValue = String(a[key] || '');
        const bValue = String(b[key] || '');

        if (order === 'asc') {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });
}
