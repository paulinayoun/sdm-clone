<script>
  import authService from './api/auth-api';
  import { isLogin, user, setLoginInfo } from './store';
  import './app.css'; // Tailwind 설정 확인

  let userId='';
  let userPw='';
  let errorMessage = '';
  let isLoading = false;

  async function handleLogin() {
    if (!userId || !userPw) {
      errorMessage = '아이디와 비밀번호를 입력해주세요.';
      return;
    }
    isLoading = true;
    errorMessage = '';  
    try{
      // 1. 로그인 API 호출
      const res = await authService.login(userId, userPw);
      if (res.success){
        // 2. 로그인 성공 시 스토어 및 로컬스토리지 업데이트
        setLoginInfo(res.accessToken, res.user);
        alert(`${res.user.name}님, 환영합니다!`);
      }
    } catch (err) {
      // 3. 에러 처리 (401 등)
      errorMessage = err.message || '로그인에 실패했습니다.';
    } finally {
      isLoading = false;
    }
  }

  function handleLogout() {
    // 로그아웃 로직 (스토어 초기화 및 로컬스토리지 삭제)
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    location.reload(); // 가장 간단한 초기화 방법
  }
</script>

<main
  class="min-h-screen bg-gray-100 flex items-center justify-center p-4"
>
  {#if $isLogin}
    <div class="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
      <h1 class="text-2xl font-bold mb-4">환영합니다, {$user.name}님!</h1>
      <button
        class="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        on:click={handleLogout}
      >
        로그아웃
      </button>
    </div>
  {:else}
  <!-- 로그인 폼 화면 -->
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">SDM-Clone</h1>

      <form on:submit|preventDefault={handleLogin} class="space-y-4">
        <div>
          <label for="id" class="block text-sm font-medium text-gray-700 mb-1">아이디</label>
          <input
            type="text" id="id" bind:value={userId}
            placeholder="admin"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
           />
        </div>
        <div>
          <label for="pw" class="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
          <input
            type="password" id="pw" bind:value={userPw}
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
           />
        </div>

        {#if errorMessage}
        <p class="text-red-500 mb-4 text-center">{errorMessage}</p>
        {/if}
        <button
          type="submit"
          disabled={isLoading}
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200
        disabled:bg-blue-300"
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      
    </div>
  {/if}
</main>

