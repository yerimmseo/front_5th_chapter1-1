(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const d={get(o){return localStorage.getItem(o)},set(o,t){localStorage.setItem(o,typeof t=="object"?JSON.stringify(t):t)},remove(o){localStorage.removeItem(o)},clear(){localStorage.clear()}},v=(o,t={})=>{let r=t;const s=[],e=()=>r,n=l=>{r=o(r,l),c()},a=l=>(s.push(l),()=>{const u=s.indexOf(l);u>-1&&l.splice(u,1)}),c=()=>{s.forEach(l=>l(r))};return{getState:e,dispatch:n,subscribe:a}},x=(o,t)=>{const{type:r,payload:s}=t;switch(r){case"LOGIN":{const{username:e}=s,n={username:e,email:"",bio:""};return d.set("user",n),{...o,isLoggedIn:!0,userInfo:n}}case"LOGOUT":return d.remove("user"),{...o,isLoggedIn:!1,userInfo:{}};case"UPDATE_PROFILE":{const e={...o.userInfo,...s};return d.set("user",e),{...o,userInfo:e}}default:return o}},y={isLoggedIn:!!d.get("user"),userInfo:JSON.parse(d.get("user"))||{}},i=v(x,y),m=()=>{const{navigate:o}=f(),t=()=>{const e=document.getElementById("logout");e&&e.addEventListener("click",n=>{n.preventDefault(),i.dispatch({type:"LOGOUT"}),o("/login")})};return{init:()=>{t()},render:({isLoggedIn:e})=>{const n=location.pathname;return`
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      ${`
        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="/" class="${n==="/"?"text-blue-600 font-bold":"font-gray-600"}">홈</a></li>
            ${e?`
            <li>
              <a href="/profile" class="${n==="/profile"?"text-blue-600 font-bold":"text-gray-600"}">프로필</a>
            </li>
            <li>
              <a id="logout" href="#" class="text-gray-600">로그아웃</a>
            </li>
          `:`
            <li>
              <a href="/login" class="${n==="/login"?"text-blue-600 font-bold":"text-gray-600"}">로그인</a>
            </li>
          `}
          </ul>
        </nav>
      `}
    `}}},p=()=>`
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `,w=()=>[{id:1,author:"홍길동",createdAt:"5분 전",content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!"},{id:2,author:"김철수",createdAt:"15분 전",content:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!"},{id:3,author:"이영희",createdAt:"30분 전",content:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?"},{id:4,author:"박민수",createdAt:"1시간 전",content:"주말에 등산 가실 분 계신가요? 함께 가요!"},{id:5,author:"정수연",createdAt:"2시간 전",content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?"}].map(t=>`
      <div class="bg-white rounded-lg shadow p-4" data-id=${t.id}>
        <div class="flex items-center mb-2">
          <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
          <div>
            <p class="font-bold">${t.author}</p>
            <p class="text-sm text-gray-500">${t.createdAt}</p>
          </div>
        </div>
        <p>${t.content}</p>
        <div class="mt-2 flex justify-between text-gray-500">
          <button>좋아요</button>
          <button>댓글</button>
          <button>공유</button>
        </div>
      </div>
    `).join(""),I=()=>{const{isLoggedIn:o}=i.getState(),t=m();return{init:()=>{t.init()},render:()=>`
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${t.render({isLoggedIn:o})}

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
  `}},L=()=>{const{navigate:o}=f(),t=()=>{const e=document.getElementById("login-form");e&&e.addEventListener("submit",n=>{n.preventDefault();const a=document.getElementById("username").value;a&&(i.dispatch({type:"LOGIN",payload:{username:a}}),o("/"))})};return{init:()=>{t()},render:()=>`
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
  `}),$=()=>{const{isLoggedIn:o,userInfo:t}=i.getState(),r=m(),s=()=>{const a=document.getElementById("profile-form");a&&a.addEventListener("submit",c=>{c.preventDefault();const l=document.getElementById("username").value,u=document.getElementById("email").value,g=document.getElementById("bio").value,h={username:l,email:u,bio:g};i.dispatch({type:"UPDATE_PROFILE",payload:h})})};return{init:()=>{r.init(),s()},render:()=>`
    <div id="root">
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <!-- ${m()} -->
          ${r.render({isLoggedIn:o})}

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
                    value='${t.username}'
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
                    value='${t.email}'
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
                  >${t.bio}</textarea>
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
  `}},f=()=>{const o={"/":{component:I},"/login":{component:L,beforeEnter:()=>{const{isLoggedIn:e}=i.getState();return e?(history.pushState(null,"","/"),!1):!0}},"/profile":{component:$,beforeEnter:()=>{const{isLoggedIn:e}=i.getState();return e?!0:(history.pushState(null,"","/login"),!1)}},404:{component:E}},t=()=>location.hash?location.hash.replace("#","")||"/":location.pathname,r=e=>{console.log(e,"??????");const n=o[e]||o[404];if(n.beforeEnter&&!n.beforeEnter()){r(t());return}const{component:a}=n,{init:c,render:l}=a();history.pushState(null,"",e),document.getElementById("root").innerHTML=l(),c&&c()};return{init:()=>{window.addEventListener("hashchange",()=>{r(t())}),window.addEventListener("popstate",()=>{r(t())}),document.body.addEventListener("click",e=>{if(e.target.tagName==="A"){if(e.defaultPrevented)return;e.preventDefault();const n=e.target.href.replace(location.origin,"");r(n)}}),r(t())},navigate:r}},b=f();i.subscribe(()=>{const o=location.hash.slice(1)||"/";b.navigate(o)});b.init();
