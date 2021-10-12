import axios from "axios";

export interface PhotoPagingReponse {
  content: PhotoItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// 서버로 부터 받아오는 데이터 1건에 대한 타입
export interface PhotoItemResponse {
  id: number;
  title: string;
  description: string;
  photoUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
}

export interface PhotoItemRequest {
  title: string;
  description?: string;
  photoUrl: string;
  fileType: string;
  fileName: string;
}

// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
// process.env.변수명
const photoApi = {
  // axios.get<응답데이터의타입>(요청URL);
  // GET 요청URL HTTP/1.1
  fetch: () =>
    axios.get<PhotoItemResponse[]>(`http://ec2-54-180-117-20.ap-northeast-2.compute.amazonaws.com:8080/photos`),

  fetchPaging: (page: number, size: number) =>
    axios.get<PhotoPagingReponse>(
      `http://ec2-54-180-117-20.ap-northeast-2.compute.amazonaws.com:8080/photos/paging?page=${page}&size=${size}`
    ),

  // axios.post<응답타입>(요청URL, 요청객체(JSON바디));
  // POST 요청URL HTTP/1.1  {...}
  add: (photoItem: PhotoItemRequest) =>
    axios.post<PhotoItemResponse>(
      `http://ec2-54-180-117-20.ap-northeast-2.compute.amazonaws.com:8080/photos`,
      photoItem
    ),
  // axios.delete<응답타입>(요청URL);
  // DELETE 요청URL HTTP/1.1
  remove: (id: number) =>
    axios.delete<boolean>(`http://ec2-54-180-117-20.ap-northeast-2.compute.amazonaws.com:8080/photos/${id}`),

  // axios.PUT<응답타입>(요청URL, 요청객체(JSON바디));
  // PUT 요청URL HTTP/1.1  {...}
  modify: (id: number, photoItem: PhotoItemRequest) =>
    axios.put<PhotoItemResponse>(
      `http://ec2-54-180-117-20.ap-northeast-2.compute.amazonaws.com:8080/photos/${id}`,
      photoItem
    ),
};

export default photoApi;