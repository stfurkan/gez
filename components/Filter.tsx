'use client';

import { useState, useEffect } from 'react';
import { Search, Building2, Globe, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import sort from '@/lib/sort';

interface Place {
  id: number;
  type: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface FilterProps {
  places: Place[];
  setFilteredPlaces: (places: Place[]) => void;
  lang: {
    search: string;
    searchPlace: string;
    type: string;
    allTypes: string;
    country: string;
    allCountries: string;
    clearFilter: string;
  };
  sorted: string;
}

export default function Filter({ places, setFilteredPlaces, lang, sorted }: FilterProps) {
  const countries: string[] = [];
  places.forEach(place => {
    if (!countries.includes(place.country)) {
      countries.push(place.country);
    }
  });
  countries.sort((a, b) => a.localeCompare(b));

  const types: string[] = [];
  places.forEach(place => {
    if (!types.includes(place.type)) {
      types.push(place.type);
    }
  });
  types.sort((a, b) => a.localeCompare(b));

  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [country, setCountry] = useState('all');

  useEffect(() => {
    setSearch('');
    setType('all');
    setCountry('all');
  }, [places]);

  useEffect(() => {
    let filteredPlaces = [...places];

    filteredPlaces = sort(
      filteredPlaces,
      sorted.split('-')[0],
      sorted.split('-')[1]
    );

    if (search !== '') {
      filteredPlaces = filteredPlaces.filter(place =>
        place.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    if (type !== 'all') {
      filteredPlaces = filteredPlaces.filter(place => place.type === type);
    }

    if (country !== 'all') {
      filteredPlaces = filteredPlaces.filter(
        place => place.country === country
      );
    }

    setFilteredPlaces(filteredPlaces);
  }, [search, type, country, places, sorted, setFilteredPlaces]);

  const hasFilters = search !== '' || type !== 'all' || country !== 'all';

  return (
    <div className="p-3 bg-card">
      <div className={`grid gap-2 ${hasFilters ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'}`}>
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={lang.searchPlace}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-10 w-full"
            aria-label={lang.search}
          />
        </div>

        {/* Type Select - icon inside trigger */}
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="!h-10 w-full cursor-pointer" aria-label={lang.type}>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
              <SelectValue placeholder={lang.allTypes} />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">{lang.allTypes}</SelectItem>
            {types.map(t => (
              <SelectItem key={t} value={t} className="cursor-pointer">
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Country Select - icon inside trigger */}
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="!h-10 w-full cursor-pointer" aria-label={lang.country}>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
              <SelectValue placeholder={lang.allCountries} />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">{lang.allCountries}</SelectItem>
            {countries.map(c => (
              <SelectItem key={c} value={c} className="cursor-pointer">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filter Button - only shown when filters are active */}
        {hasFilters && (
          <Button
            variant="destructive"
            onClick={() => {
              setSearch('');
              setType('all');
              setCountry('all');
            }}
            className="h-10 w-full gap-2 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            {lang.clearFilter}
          </Button>
        )}
      </div>
    </div>
  );
}
