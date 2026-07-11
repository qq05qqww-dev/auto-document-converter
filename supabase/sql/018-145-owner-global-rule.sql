-- 第 018-145 批：老闆全站公版規則讀取 RPC
-- 只建立／更新 RPC，不刪除任何既有 employee_rules 資料。

create or replace function public.get_owner_global_rule()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select er.rules
  from public.employee_rules er
  join public.profiles p on p.id = er.user_id
  where p.role = 'owner'
    and er.city = '__OWNER_GLOBAL__'
    and er.district = '__OWNER_GLOBAL__'
    and er.mode = '__OWNER_GLOBAL__'
    and er.room = '__OWNER_GLOBAL__'
  limit 1;
$$;

revoke all on function public.get_owner_global_rule() from public;
grant execute on function public.get_owner_global_rule() to authenticated;
