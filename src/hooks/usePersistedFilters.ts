import { useState, useEffect } from 'react'

export function usePersistedFilters<T extends Record<string, string>>(
	defaultFilters: T,
	storageKey: string,
): [T, (key: keyof T, value: string) => void, (newFilters: T) => void] {
	const [filters, setFilters] = useState<T>(() => {
		try {
			const saved = localStorage.getItem(storageKey)
			return saved ? { ...defaultFilters, ...JSON.parse(saved) } : defaultFilters
		} catch (err) {
			console.warn('Failed to load saved filters:', err)
			return defaultFilters
		}
	})

	function updateFilter(key: keyof T, value: string) {
		setFilters((prev) => ({ ...prev, [key]: value }))
	}

	function setAllFilters(newFilters: T) {
		setFilters(newFilters)
	}

	useEffect(() => {
		try {
			localStorage.setItem(storageKey, JSON.stringify(filters))
		} catch (err) {
			console.warn('Failed to save filters:', err)
		}
	}, [filters, storageKey])

	return [filters, updateFilter, setAllFilters]
}
