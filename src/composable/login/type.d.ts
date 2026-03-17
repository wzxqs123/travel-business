export interface LoginForm {
  type: string
  access_token: string
  refresh_token: string
  expires_in: number
  expires_at: number
  refresh_expires_in: number
  refresh_expires_at: number
  client_id: string
  scope: string
  idToken: string
}
export interface LoginQuery {
  client_id: string
  client_secret: string
  grant_type?: string
  password: string
  scope: string
  username: string
}
