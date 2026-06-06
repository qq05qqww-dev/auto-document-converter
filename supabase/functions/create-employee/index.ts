import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8' }
  })
}

function cleanText(value: unknown) {
  return String(value || '').trim().replace(/\s+/g, ' ')
}

function getEnv(name: string) {
  return Deno.env.get(name) || ''
}

async function readJson(response: Response) {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return { raw: text }
  }
}

async function fetchJson(url: string, init: RequestInit) {
  const response = await fetch(url, init)
  const payload = await readJson(response)
  return { response, payload }
}

serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    if (req.method !== 'POST') {
      return jsonResponse({ error: 'Only POST is allowed.' }, 405)
    }

    const supabaseUrl =
      getEnv('CREATE_EMPLOYEE_SUPABASE_URL') ||
      getEnv('SUPABASE_URL')

    const serviceRoleKey =
      getEnv('CREATE_EMPLOYEE_SERVICE_ROLE_KEY') ||
      getEnv('SUPABASE_SERVICE_ROLE_KEY') ||
      getEnv('SUPABASE_SECRET_KEYS')

    const publicKey =
      getEnv('SUPABASE_ANON_KEY') ||
      getEnv('SUPABASE_PUBLISHABLE_KEYS') ||
      serviceRoleKey

    if (!supabaseUrl || !serviceRoleKey) {
      return jsonResponse({ error: 'Missing create employee service key. Set CREATE_EMPLOYEE_SERVICE_ROLE_KEY in Supabase Function Secrets.' }, 500)
    }

    const authHeader = req.headers.get('Authorization') || ''
    const ownerToken = authHeader.replace(/^Bearer\s+/i, '').trim()

    if (!ownerToken) {
      return jsonResponse({ error: 'Missing owner authorization token.' }, 401)
    }

    const { response: ownerUserResponse, payload: ownerUserPayload } = await fetchJson(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: publicKey,
        Authorization: `Bearer ${ownerToken}`
      }
    })

    if (!ownerUserResponse.ok || !ownerUserPayload?.id) {
      return jsonResponse({
        error: 'Owner token verification failed.',
        status: ownerUserResponse.status,
        detail: ownerUserPayload
      }, 401)
    }

    const { response: ownerProfileResponse, payload: ownerProfiles } = await fetchJson(
      `${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(ownerUserPayload.id)}&select=id,email,display_name,role`,
      {
        headers: {
          apikey: publicKey,
          Authorization: `Bearer ${ownerToken}`,
          Accept: 'application/json'
        }
      }
    )

    const ownerProfile = Array.isArray(ownerProfiles) ? ownerProfiles[0] : null

    if (!ownerProfileResponse.ok) {
      return jsonResponse({
        error: 'Failed to read owner profile.',
        status: ownerProfileResponse.status,
        detail: ownerProfiles
      }, 500)
    }

    if (ownerProfile?.role !== 'owner') {
      return jsonResponse({ error: 'Only owner accounts can manage employees.' }, 403)
    }

    const payload = await req.json().catch(() => ({})) as Record<string, unknown>
    const action = cleanText(payload.action || 'create').toLowerCase()
    const email = cleanText(payload.email).toLowerCase()
    const password = String(payload.password || '').trim()
    const displayName = cleanText(payload.displayName) || email.split('@')[0] || 'employee'

    if (action === 'delete') {
      const userId = cleanText(payload.userId)
      if (!userId) {
        return jsonResponse({ error: 'Employee userId is required for delete.' }, 400)
      }
      if (userId === ownerUserPayload.id) {
        return jsonResponse({ error: 'Owner account cannot be deleted from employee manager.' }, 403)
      }

      const { response: employeeProfileResponse, payload: employeeProfiles } = await fetchJson(
        `${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=id,email,display_name,role`,
        {
          headers: {
            apikey: publicKey,
            Authorization: `Bearer ${ownerToken}`,
            Accept: 'application/json'
          }
        }
      )

      if (!employeeProfileResponse.ok) {
        return jsonResponse({
          error: 'Failed to read employee profile before delete.',
          status: employeeProfileResponse.status,
          detail: employeeProfiles
        }, 500)
      }

      const employeeProfile = Array.isArray(employeeProfiles) ? employeeProfiles[0] : null
      if (employeeProfile?.role === 'owner') {
        return jsonResponse({ error: 'Owner profile cannot be deleted from employee manager.' }, 403)
      }

      const { response: deleteUserResponse, payload: deletePayload } = await fetchJson(
        `${supabaseUrl}/auth/v1/admin/users/${encodeURIComponent(userId)}`,
        {
          method: 'DELETE',
          headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (!deleteUserResponse.ok) {
        return jsonResponse({
          error: 'Failed to delete employee auth user.',
          status: deleteUserResponse.status,
          detail: deletePayload
        }, 400)
      }

      const { response: deleteProfileResponse, payload: deleteProfilePayload } = await fetchJson(
        `${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}`,
        {
          method: 'DELETE',
          headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            Accept: 'application/json',
            Prefer: 'return=minimal'
          }
        }
      )

      return jsonResponse({
        ok: true,
        action: 'delete',
        deletedUserId: userId,
        profileDeleted: deleteProfileResponse.ok,
        warning: deleteProfileResponse.ok ? null : 'Employee auth user was deleted. Profile delete failed or was already removed by cascade.',
        profileDeleteStatus: deleteProfileResponse.status,
        profileDeleteDetail: deleteProfileResponse.ok ? null : deleteProfilePayload
      })
    }

    if (action === 'update') {
      const userId = cleanText(payload.userId)
      if (!userId) {
        return jsonResponse({ error: 'Employee userId is required for update.' }, 400)
      }
      if (!email) {
        return jsonResponse({ error: 'Employee email is required.' }, 400)
      }
      if (password && password.length < 6) {
        return jsonResponse({ error: 'Employee password must be at least 6 characters.' }, 400)
      }

      const updateBody: Record<string, unknown> = {
        email,
        email_confirm: true,
        user_metadata: { display_name: displayName }
      }
      if (password) updateBody.password = password

      const { response: updateUserResponse, payload: updatePayload } = await fetchJson(
        `${supabaseUrl}/auth/v1/admin/users/${encodeURIComponent(userId)}`,
        {
          method: 'PUT',
          headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateBody)
        }
      )

      if (!updateUserResponse.ok) {
        return jsonResponse({
          error: 'Failed to update employee auth user.',
          status: updateUserResponse.status,
          detail: updatePayload
        }, 400)
      }

      const { response: profileResponse, payload: profilePayload } = await fetchJson(`${supabaseUrl}/rest/v1/profiles?on_conflict=id`, {
        method: 'POST',
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates,return=representation'
        },
        body: JSON.stringify({
          id: userId,
          email,
          display_name: displayName,
          role: 'employee'
        })
      })

      return jsonResponse({
        ok: true,
        action: 'update',
        passwordUpdated: Boolean(password),
        profileSaved: profileResponse.ok,
        profile: Array.isArray(profilePayload) ? profilePayload[0] : profilePayload,
        employee: { id: userId, email, display_name: displayName, role: 'employee' },
        warning: profileResponse.ok ? null : 'Employee auth user was updated. Profile save failed, but SQL trigger/backfill can repair it.',
        profileSaveStatus: profileResponse.status,
        profileSaveDetail: profileResponse.ok ? null : profilePayload
      })
    }

    if (!email || !password) {
      return jsonResponse({ error: 'Employee email and password are required.' }, 400)
    }

    if (password.length < 6) {
      return jsonResponse({ error: 'Employee password must be at least 6 characters.' }, 400)
    }

    const { response: createUserResponse, payload: createdPayload } = await fetchJson(`${supabaseUrl}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
        user_metadata: { display_name: displayName }
      })
    })

    if (!createUserResponse.ok) {
      return jsonResponse({
        error: 'Failed to create employee auth user.',
        status: createUserResponse.status,
        detail: createdPayload
      }, 400)
    }

    const employee = createdPayload?.user || createdPayload
    const employeeId = employee?.id

    if (!employeeId) {
      return jsonResponse({
        error: 'Employee auth user was created but no user id was returned.',
        detail: createdPayload
      }, 500)
    }

    const { response: profileResponse, payload: profilePayload } = await fetchJson(`${supabaseUrl}/rest/v1/profiles?on_conflict=id`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation'
      },
      body: JSON.stringify({
        id: employeeId,
        email,
        display_name: displayName,
        role: 'employee'
      })
    })

    return jsonResponse({
      ok: true,
      action: 'create',
      profileSaved: profileResponse.ok,
      profile: Array.isArray(profilePayload) ? profilePayload[0] : profilePayload,
      employee: { id: employeeId, email, display_name: displayName, role: 'employee' },
      warning: profileResponse.ok ? null : 'Employee auth user was created. Profile save failed, but SQL trigger/backfill can repair it.',
      profileSaveStatus: profileResponse.status,
      profileSaveDetail: profileResponse.ok ? null : profilePayload
    })
  } catch (error) {
    console.error('create-employee fatal error:', error)
    return jsonResponse({
      error: 'Unexpected create employee function error.',
      detail: error instanceof Error ? error.message : String(error)
    }, 500)
  }
})
