import axios from "axios";

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
    axios.get<ContactItemResponse[]>(`${process.env.REACT_APP_API_BASE}/contacts`),

  add: (contactItem: ContactItemRequest) =>
    axios.post<ContactItemResponse>(`${process.env.REACT_APP_API_BASE}/contacts`, contactItem),

  remove: (id: number) =>
    axios.delete<boolean>(`${process.env.REACT_APP_API_BASE}/contacts/${id}`),

  modify: (id: number, contactItem: ContactItemRequest) =>
    axios.put<ContactItemResponse>(`${process.env.REACT_APP_API_BASE}/contacts/${id}`, contactItem),
}

export default contactApi;