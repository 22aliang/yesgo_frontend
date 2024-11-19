import { EntityStatus } from '@/features/shared/api/types/entity/EntityStatus';

export interface Tag {
  id: number;
  name: string;
  status: EntityStatus;
}
