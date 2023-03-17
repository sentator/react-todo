export interface TodoItem {
	id: string;
	value: string;
	completed: boolean;
}
export type FilterCallback = (item: TodoItem) => boolean;
export enum FILTERS {
	ALL = "All",
	ACTIVE = "Active",
	COMPLETED = "Completed",
}
export interface FilterItem {
	name: string;
	value: FILTERS;
	id: string;
}
