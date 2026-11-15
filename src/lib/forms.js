import { HASH_MODE } from './router'

// Same Google Apps Script web app as bdbc-v9, same request shape:
// POST, no-cors, text/plain body holding JSON with a formType field.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

// The preview build runs in a sandbox that cannot reach Google, and must never
// create real rows in the Sheet.
export const CAN_SUBMIT = !HASH_MODE && !!ENDPOINT

export async function postForm(payload) {
  if (!CAN_SUBMIT) throw new Error('preview')
  await fetch(ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
  })
}
