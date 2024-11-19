import { Tag } from '@/features/tag/types/Tag';
import { Participation } from './Participation';

export interface Proposal {
  proposal_id: number;
  img_url: string | null;
  title: string;
  user_name: string;
  content: string;
  status: string;
  location_name: string | null;
  location_id: number;
  tags: Tag[];
  start_date: string;
  end_date: string;
  avg_rating: string;
  people_required: number;
  participation: Participation[];
}
