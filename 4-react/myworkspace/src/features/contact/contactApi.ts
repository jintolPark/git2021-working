import axios from "axios";

export interface ContactPagingResponse {
  content: ContactItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
// 서버로 부터 받아오는 데이터 1건
export interface ContactItemResponse {
  id: number;
  name: string;
  phoneNum: string;
  email: string;
  description: string;
  createdTime: number;
}

export interface ContactItemRequest {
  name: string;
  phoneNum: string;
  email: string;
  description?: string;
}

const contactApi = {
  fetch: () =>
    axios.get<ContactItemResponse[]>(`http://ec2-54-180-117-20.ap-northeast-2.compute.amazonaws.com:8080/contacts`),

    fetchPaging: (page: number, size: number) =>
    axios.get<ContactItemResponse[]>(
      `http://ec2-54-180-117-20.ap-northeast-2.compute.amazonaws.com:8080/contacts=${page}&size=${size}`
      ),

  add: (contactItem: ContactItemRequest) =>
    axios.post<ContactItemResponse>(
      `http://ec2-54-180-117-20.ap-northeast-2.compute.amazonaws.com:8080/contacts`, contactItem),

  remove: (id: number) =>
    axios.delete<boolean>(
      `http://ec2-54-180-117-20.ap-northeast-2.compute.amazonaws.com:8080/contacts/${id}`),

  modify: (id: number, contactItem: ContactItemRequest) =>
    axios.put<ContactItemResponse>(
      `$http://ec2-54-180-117-20.ap-northeast-2.compute.amazonaws.com:8080/contacts/${id}`, contactItem),
}

export default contactApi;