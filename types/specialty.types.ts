export interface ISpecialty {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ISpecialtyPayload {
  title: string;
  description?: string;
  icon?: File | null;
}

export interface ISpecialtyQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ISpecialtyResponse {
  data: ISpecialty[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}