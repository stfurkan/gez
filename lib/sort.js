export default function sort(places, field, order) {
  let sortedPlaces = [...places];

  if (order === 'asc') {
    sortedPlaces = [...sortedPlaces].sort((a, b) =>
      a[field].localeCompare(b[field])
    );
  }

  if (order === 'desc') {
    sortedPlaces = [...sortedPlaces].sort((a, b) =>
      b[field].localeCompare(a[field])
    );
  }

  return sortedPlaces;
}
