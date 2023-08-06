export default function Login() {
  return (
    <div>
      <a
        href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=6c1553477b07a4c7d1ac19fb245afa3d&redirect_uri=http://localhost:3000/login/oauth
"
      >
        <img src="/kakao.png" height="24px" />
      </a>
    </div>
  );
}
