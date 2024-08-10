export interface taskCreationDto {
  description: string;
  isCompleted: boolean;
}

export interface taskDto {
  id: number;
  description: string;
  isCompleted: boolean;
  createdAt: string;
}
