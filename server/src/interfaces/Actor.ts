export interface IActor {
  fullname: string;
  image: string;
  description: string;
  shareable: boolean;
}

export interface IActorLikeData {
  liker: number;
  actor: number;
}
