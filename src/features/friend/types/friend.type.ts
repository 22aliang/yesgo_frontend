export enum FriendStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export class Friend {
  id!: number;
  friend_id!: number;
  username!: string;
  avatar?: string;
  isBlocked!: boolean;
  conversation_id?: number;
}

export class FriendRequest {
  id!: number;
  friend_id!: number;
  conversation_id!: number;
  username!: string;
  avatar?: string;
}

export interface FriendData {
  needToConfirmList: NeedToConfirmList[];
  awaitingResponseList: AwaitingResponseList[];
  rejectedList: RejectedList[];
}

export class NeedToConfirmList {
  id!: number;
  conversation_id?: number;
  requester_id!: number;
  username!: string;
  avatar?: string;
  status!: FriendStatus;
}

export class AwaitingResponseList {
  id!: number;
  conversation_id?: number;
  receiver_id!: number;
  username!: string;
  avatar?: string;
  status!: FriendStatus;
}

export class RejectedList {
  id!: number;
  conversation_id?: number;
  requester_id!: number;
  username!: string;
  avatar?: string;
  status!: FriendStatus;
}
