(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const e of n)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const e={};return n.integrity&&(e.integrity=n.integrity),n.referrerPolicy&&(e.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?e.credentials="include":n.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(n){if(n.ep)return;n.ep=!0;const e=a(n);fetch(n.href,e)}})();const u={get(t){return localStorage.getItem(t)},set(t,r){localStorage.setItem(t,typeof r=="object"?JSON.stringify(r):r)},remove(t){localStorage.removeItem(t)},clear(){localStorage.clear()}},v=(t,r={})=>{let a=r;const o=[],n=()=>a,e=l=>{a=t(a,l),i()},s=l=>(o.push(l),()=>{const d=o.indexOf(l);d>-1&&l.splice(d,1)}),i=()=>{o.forEach(l=>l(a))};return{getState:n,dispatch:e,subscribe:s}},x=(t,r)=>{const{type:a,payload:o}=r;switch(a){case"LOGIN":{const{username:n}=o,e={username:n,email:"",bio:""};return u.set("user",e),{...t,isLoggedIn:!0,userInfo:e}}case"LOGOUT":return u.remove("user"),{...t,isLoggedIn:!1,userInfo:{}};case"UPDATE_PROFILE":{const n={...t.userInfo,...o};return u.set("user",n),{...t,userInfo:n}}default:return t}},y={isLoggedIn:!!u.get("user"),userInfo:JSON.parse(u.get("user"))||{}},c=v(x,y),m=()=>{const{navigate:t}=f(),r=()=>{const n=document.getElementById("logout");n&&n.addEventListener("click",e=>{e.preventDefault(),c.dispatch({type:"LOGOUT"}),t("/login")})};return{init:()=>{r()},render:({isLoggedIn:n})=>{const e=location.pathname;return`
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      ${`
        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="/" class="${e==="/"?"text-blue-600 font-bold":"font-gray-600"}">홈</a></li>
            ${n?`
            <li>
              <a href="/profile" class="${e==="/profile"?"text-blue-600 font-bold":"text-gray-600"}">프로필</a>
            </li>
            <li>
              <a id="logout" href="#" class="text-gray-600">로그아웃</a>
            </li>
          `:`
            <li>
              <a href="/login" class="${e==="/login"?"text-blue-600 font-bold":"text-gray-600"}">로그인</a>
            </li>
          `}
          </ul>
        </nav>
      `}
    `}}},p=()=>`
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `,w=()=>[{id:1,author:"홍길동",createdAt:"5분 전",content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!"},{id:2,author:"김철수",createdAt:"15분 전",content:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!"},{id:3,author:"이영희",createdAt:"30분 전",content:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?"},{id:4,author:"박민수",createdAt:"1시간 전",content:"주말에 등산 가실 분 계신가요? 함께 가요!"},{id:5,author:"정수연",createdAt:"2시간 전",content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?"}].map(r=>`
      <div class="bg-white rounded-lg shadow p-4" data-id=${r.id}>
        <div class="flex items-center mb-2">
          <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
          <div>
            <p class="font-bold">${r.author}</p>
            <p class="text-sm text-gray-500">${r.createdAt}</p>
          </div>
        </div>
        <p>${r.content}</p>
        <div class="mt-2 flex justify-between text-gray-500">
          <button>좋아요</button>
          <button>댓글</button>
          <button>공유</button>
        </div>
      </div>
    `).join(""),I=()=>{const{isLoggedIn:t}=c.getState(),r=m();return{init:()=>{r.init()},render:()=>`
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${r.render({isLoggedIn:t})}

        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
          </div>

          <div class="space-y-4">
            ${w()}
          </div>
        </main>

        ${p()}
      </div>
    </div>
  `}},L=()=>{const{navigate:t}=f(),r=()=>{const n=document.getElementById("login-form");n&&n.addEventListener("submit",e=>{e.preventDefault();const s=document.getElementById("username").value;s&&(c.dispatch({type:"LOGIN",payload:{username:s}}),t("/"))})};return{init:()=>{r()},render:()=>`
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input type="password" id="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6">
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        </div>
      </div>
    </main>
  `}},E=()=>({render:()=>`
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
        <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
        <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
        <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
        <p class="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
          홈으로 돌아가기
        </a>
      </div>
    </main>
  `}),S=()=>{const{isLoggedIn:t,userInfo:r}=c.getState(),a=m(),o=()=>{const s=document.getElementById("profile-form");s&&s.addEventListener("submit",i=>{i.preventDefault();const l=document.getElementById("username").value,d=document.getElementById("email").value,g=document.getElementById("bio").value,h={username:l,email:d,bio:g};c.dispatch({type:"UPDATE_PROFILE",payload:h})})};return{init:()=>{a.init(),o()},render:()=>`
    <div id="root">
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <!-- ${m()} -->
          ${a.render({isLoggedIn:t})}

          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              <form id="profile-form">
                <div class="mb-4">
                  <label
                    for="username"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >사용자 이름</label
                  >
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value='${r.username}'
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="email"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >이메일</label
                  >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value='${r.email}'
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="bio"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >자기소개</label
                  >
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    class="w-full p-2 border rounded"
                  >${r.bio}</textarea>
                </div>
                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                >
                  프로필 업데이트
                </button>
              </form>
            </div>
          </main>

          ${p()}
        </div>
      </div>
    </div>
  `}},f=()=>{const t="/front_5th_chapter1-1",r={"/":{component:I},"/login":{component:L,beforeEnter:()=>{const{isLoggedIn:e}=c.getState();return e?(history.pushState(null,"",t+"/"),!1):!0}},"/profile":{component:S,beforeEnter:()=>{const{isLoggedIn:e}=c.getState();return e?!0:(history.pushState(null,"",t+"/login"),!1)}},404:{component:E}},a=()=>{if(location.hash)return location.hash.replace("#","")||"/";const e=location.pathname;return e.startsWith(t)?e.substring(t.length)||"/":e},o=e=>{const s=r[e]||r[404];if(s.beforeEnter&&!s.beforeEnter()){o(a());return}const{component:i}=s,{init:l,render:d}=i();history.pushState(null,"",t+e),document.getElementById("root").innerHTML=d(),l&&l()};return{init:()=>{window.addEventListener("hashchange",()=>{o(a())}),window.addEventListener("popstate",()=>{o(a())}),document.body.addEventListener("click",e=>{if(e.target.tagName==="A"){if(e.defaultPrevented)return;e.preventDefault();const s=e.target.getAttribute("href");let i;s.startsWith("http")?(i=new URL(s).pathname,i.startsWith(t)&&(i=i.substring(t.length))):i=s,o(i)}}),o(a())},navigate:o}},b=f();c.subscribe(()=>{const t=location.hash.slice(1)||"/";b.navigate(t)});b.init();
