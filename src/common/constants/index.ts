/** 自定义Exception Code */
export enum ExceptionCode {
  /** token过期 */
  TOKEN_EXPIRED = 400001,
  /** 需要重新登录 */
  REQUIRED_LOGIN = 400002,
  /** 密码错误 */
  WRONG_PASSWORD = 400003,
  /** 邮箱已被注册 */
  EMAIL_REGISTERED = 400004
}
