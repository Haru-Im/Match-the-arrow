'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import { addUser, checkUser } from '../..';
import { $userData } from '../../state';
import { useSetRecoilState } from 'recoil';

interface TokenResponse {
  token_type: string;
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  refresh_token_expires_in: string;
  scope: string;
}

interface UserInfo {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string; // 640x640
    thumbnail_image?: string; // 110x110
  };
}

export const AuthScreen = () => {
  const searchParams = useSearchParams();
  const navigation = useRouter();
  const code = searchParams.get('code');
  const setUser = useSetRecoilState($userData);

  const getUserFromKakao = async ({ access_token }: TokenResponse) => {
    const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';
    const response: UserInfo = await fetch(userInfoUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    }).then((res) => res.json());
    return response;
  };

  const getUserData = async (code: string) => {
    const response = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=1454f3a76adb188b94f050e8b7748b6d&redirect_uri=http://localhost:3000/login/oauth&code=${code}`,
      {},
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    //@ts-ignore
    const userData = await getUserFromKakao({
      access_token: response.data.access_token,
    });

    const hasUser = await checkUser(userData.properties.nickname);

    console.log(123, hasUser);

    if (!hasUser) {
      await addUser(
        userData.properties.nickname,
        userData.properties.profile_image ||
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAACYCAMAAAAvHNATAAAATlBMVEX///+AgID5+fmZmZl9fX14eHj8/PyDg4N1dXVycnLv7++NjY3d3d3r6+v29vbJycm8vLyysrKkpKRtbW3j4+PV1dWrq6vCwsLPz8+Tk5M25T8LAAAGdklEQVR4nO2ciZLbKhBFtTSLdlm7//9HHyA5Fghk2WOaqXpzk0rVjJyak4ZeaFqJoj/96U9/+r+Lit+Ual//IiXVMC5Ns5R5EhrloSQfbymLIQalOC66+RfgVXPKMyJwngIgGbm3VVCsKZZQLD5I0KVlqN1W3wgRUBYs9T3I0jKAJ9CoZMSCpJttovhkDYcXXEKkGDCZqPi1vDLXZjSWR3geKpZnuWIvpaJGJIuqq1hiNVs8rKguroPFHNE1p2sbbFWGFWppNPRvcMVkRAPr3lhIYbESC2x4iyuGGWctaTRz288XBYaoMGIm/9AfEIaSmmhkc0kmKgpWFAwIwCF5AsGxWXbkIn23lENVDeUyZdkBnNwwuKqDTwJr90s1M5OMZRhgCzfWityNTD3czTjXY6zlDXSDkI5qe1tWOqlBRhoEsEnnApGlFc/+MznTfJOJTebfL43wCqU0EY3yZkrTW5OvkIt2DmDQ+Qejd50rVWsndrw4k4hjiKgM5cpSwz1S/warNTDWrxu/ebgqkFoZx8jzd/81Wa7FV2Bqh1XPM4movyTYqAeVIvcOplsMOrVGDTcZqgwfbG+xLaZrC6cWN9eWEjDAUg1MFc50DwvjEQzDYrpXkll9T/tWILDIZrE9A1uXkgcG6xTYzjxbJjDK7y09eFWnmYe0eZK3O/Ns2ac14hgCmJEreZ+JGnH3da0CiFFNpon/0D+dlfwyXcscVRklSIqQxG9nh8o1YFE6gZnE/aslto7Ypu2sVhmVP0y+Lab6KW57yZ0viyCjUIQtgfrUONlPb9tWWovZxviIAJ48F9c5IydcoEqxaDycoxgRdZtXle4NBjFZ5Edobh551VPPsd9cpL22DVYXtocM/LYw5hOX7Nf9bQ8nAH6bPo07iPH1iFZaDuoSLPZrsdEJtm2iJLU2/sVa+nXL3LqBFNiavEfXJvTslXrRsxdZe02u5957xM7+Pk+US7oM1nuue2ht77+KIKaej87+v18uIdcPZuqp2XH5t5KTZywqTmpWr4NCbbGbg5sv3sHsbscgVjfjt2Ojc30+eC4vRG166BeuYFx1Jzo7GKS1/wrWERCgaJfG9QwwmrDOeoxw4vIMlFZn8taFzSqGwCVNBu9ccjFCAOmet5xsRzhJa/WL9oZ0/yb9ixu+CYxPeZS0lmuROw7VpgOArOmpzTMIxpHyKfM+ifFSnUMi83YC9+r50FMXFqtkwU8jM2ExjnH38FRrLpls18myxyysV1Piqcl0y0BcqO8fkzgfUKdVjkcOKMZh6I5ZwXOtb2o4hlgAZpn2AYyW3U51ekCQl8/HKIaSvvdqr2UllqFOHQkl18AIbtyXau0nbhMMa+jiIVFGXxkLQWjYHZWfdDw3YVxTWvTaZMjp6A/sUzn7K0+wOQjY/TUYbi320Ot5QJyZnoOuhIsQXNTRptiDFSHA8ivZMgTYyV3EQ4wg3DgfdHo9+FhL3ECmXhEpre2owyar9BdKvKtuHT1Nk4w1aJPW4t9ftXByp6QrYw3WcWSYXr5ioIkzjK5KNd97Yu3qnC1ony5+/bPsCg7210TORUih7niph4o2KVvCyQdQD7NlbB7W2cpvKm/vICPqx1zyr/I4bb7EpYIQrZoiczZ+3zMb6dMx/84LcnTp2OU3RC6xFdPPT8H5eM8E1Q8W0Kqe38rkB3YbpuI40f0dEZK29WeeUM3ALTPwXxNAlg7vgclPJy27nHU+FoF0iN5Y0SRKmuytrPOxgKf5Gwuap/6t9RBhF894An+8VtJ8SUC65NpqltzjlreJX+u92G9KPQrYtduTDmfb78X48toDhkudwu9K7OnXve3XrRIPYnx+tf/LEFzPN0/cunJa9EL2YrysDoP1ujFU4oV8Q+z8/OkagfHP1Z8Xj++8nPtdnd8EX+jde9NJk0+m73BgzB0waDQHChYKzL3JaDShFjy6zt4oTILkoweYu2CkdUCu02nBPEBl8U/b22pWHefdMcFO3LIJCRYTN9jpCzTe1bt7eyGdMo5PBg6cE944YO5ZWezzkS737WYSFsw91BKytpByni6HsGDuacYysMWct5tjWC73GO8SdO+LnORKlnNgMGefIGT9quTKSReH1bzJOc54+87tx+dyJcu3/mclD3K9t0cDgzlfKKQBeokaWOzo+Fwa7vMpcNQ9SRp284NrSiOZ7mlYuSrFpE7CypWSftf/S/pb9R8lC1MWqcUREwAAAABJRU5ErkJggg==',
      );
    }

    setUser({
      userName: userData.properties.nickname,
      profileImageUrl: userData.properties.profile_image,
    });

    navigation.replace('/game');
  };

  useEffect(() => {
    if (code) {
      getUserData(code);
    }
  }, [code]);

  return <></>;
};
