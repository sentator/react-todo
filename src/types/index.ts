export interface ITodoItem {
	id: string;
	value: string;
	completed: boolean;
}
export type TFilterCallback = (item: ITodoItem) => boolean;
export enum FILTERS {
	ALL = "All",
	ACTIVE = "Active",
	COMPLETED = "Completed",
}
