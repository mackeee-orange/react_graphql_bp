/***
 * @ATTENTION: 別のルートで同じパスを使っているかどうかはチェックできないので注意
 * ***/

const routes = {
  /***
   * ログイン前
   * ***/
  top: (): string => "/",
  signIn: (): string => "/sign_in",
  signUp: (): string => "/sign_up",

  /***
   * ログイン後
   * ***/
  home: (): string => "/home",
} as const;

export default routes;
