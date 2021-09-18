
interface Prop {
  id: number;
  content?: string | undefined;
  dataUrl?: string | undefined;
  fileType?: string | undefined;
  username: string | undefined;
  image: string | undefined;
  createTime: number;
  modifyTime?: number;
  isEdit?: boolean;
}
export type {Prop};