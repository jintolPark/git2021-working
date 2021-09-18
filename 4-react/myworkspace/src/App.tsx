
// https://react.vlpt.us/styling/02-css-module.html
// css module
// 파일명.module.css
// css를 사용하는 컴포넌트 범위로 css class 사용범위를 좁힐 수 있음.

import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";  // react 앱에 redux store를 제공해줌
import { store } from "./store";  // redux  store

import Home from "./features/Home";

import Profile from "./features/profile/Profile";

// SPA(Single Page Application)
// : 페이지 파일이 1개, index.html
// : 특정 영역(Switch)에 컴포넌트(js)를 로딩함
// : 애플리케이션이 컴파일될 때 import한 컴포넌트가 같이 컴파일됨
//   -> 컴파일됐을 때 파일크기가 커짐, 초기 로딩할 때 시간 걸림

// Lazy-Loading 처리
// 컴포넌트를 방문하는 시점에 로딩함
const Todo = lazy(() => import("./features/todo/TodoinlineEdit"));
const Feed = lazy(() => import("./features/feed/Feed"));
const Contact = lazy(() => import("./features/contact/Contact"));
const ContactCreate = lazy(() => import("./features/contact/ContactCreate"));
const ContactDetail = lazy(() => import("./features/contact/ContactDetail"));
const ContactEdit = lazy(() => import("./features/contact/ContactEdit"));
const Photo = lazy(() => import("./features/photo/Photo"));
const PhotoCreate = lazy(() => import("./features/photo/PhotoCreate"));
const PhotoDetail = lazy(() => import("./features/photo/PhotoDetail"));
const PhotoEdit = lazy(() => import("./features/photo/PhotoEdit"));

// React == 컴포넌트 개발 라이브러리
function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* main container */}
        <div className="mx-auto">
          <header className="app-bar position-fixed d-flex justify-content-end bg-primary shadow">
            <Profile />
          </header>

          <nav
            className="drawer-menu position-fixed bg-light shadow-sm"
          >
            <h4 className="ms-2">MY WORKSTATION</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/todo">Todo</Link>
              </li>
              <li>
                <Link to="/feeds">Feeds</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/photo">Photo</Link>
              </li>
            </ul>
          </nav>
          <main className="content-container">
            {/* Suspense 컴포넌트로 로딩중에 보여줄 화면을 처리하는 것 */}
            {/* fallback={로딩중에 보여줄 컴포넌트} */}
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {/* Switch 영역에 컴포넌트가 로딩됨 */}

                {/* 해당 경로에 대해서 로딩할 컴포넌트 목록을 작성 */}
                {/* exact: 속성은 true/false, 경로가 정확히 일치 할때만 */}
                <Route path="/" component={Home} exact />
                <Route path="/todo" component={Todo} />
                <Route path="/feeds" component={Feed} />
                <Route path="/contact" component={Contact} exact />
                <Route path="/contact/create" component={ContactCreate} />
                <Route path="/contact/detail/:id" component={ContactDetail} />
                <Route path="/contact/edit/:id" component={ContactEdit} />
                <Route path="/photo" component={Photo} exact />
                <Route path="/photo/create" component={PhotoCreate} />
                <Route path="/photo/detail/:id" component={PhotoDetail} />
                <Route path="/photo/edit/:id" component={PhotoEdit} />
              </Switch>
            </Suspense>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

// App.tsx 모듈의 기본 내보내기를 App 함수로 함
export default App;