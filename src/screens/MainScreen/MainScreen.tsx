import { FC, useEffect, useState } from 'react';
import { getUserData } from '../../firebase';
type IMainScreenProps = {};

export const MainScreen: FC<IMainScreenProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userRanking, setUserRanking] = useState<any>();

  console.log(userRanking);

  const getUserRanking = async () => {
    const userData = await getUserData();
    setIsLoading(false);
    setUserRanking(userData);
  };

  useEffect(() => {
    getUserRanking();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div
      style={{ display: 'flex', paddingLeft: 36, paddingRight: 36, gap: 24 }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ paddingBottom: 24 }}>Ranking</div>
        {userRanking && (
          <div style={{ overflow: 'scroll', height: 500 }}>
            {userRanking.map((e, i) => {
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 24,
                    alignItems: 'center',
                    width: 500,
                    aspectRatio: 3 / 1,
                    borderRadius: 24,
                    border: '1px solid gray',
                    boxSizing: 'border-box',
                    paddingTop: 24,
                    paddingBottom: 24,
                    paddingLeft: 16,
                    paddingRight: 16,
                  }}
                >
                  <div>{e.name}</div>
                  <div>
                    <img
                      src={e.profileImageUrl}
                      style={{ borderRadius: 999, width: 100, aspectRatio: 1 }}
                    />
                  </div>
                  <div>최고 점수 : {e.score}</div>
                  <div>최고 연속 정답 : {e.maxCombo}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
        <div>
          <a
            href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1454f3a76adb188b94f050e8b7748b6d&redirect_uri=http://localhost:3000/login/oauth
"
          >
            <img src="/kakao.png" height="24px" />
          </a>
        </div>
      </div>
    </div>
  );
};
