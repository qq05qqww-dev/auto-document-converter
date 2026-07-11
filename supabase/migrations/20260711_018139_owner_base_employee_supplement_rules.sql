-- 第 018-139 批：老闆第一層公版規則＋員工第二層個人補充
-- 只新增唯讀 RPC；不清除、不搬移、不覆蓋既有 employee_rules 資料。

create or replace function public.get_owner_rule_for_scope(
  p_city text,
  p_district text,
  p_mode text,
  p_room text
)
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
    and er.city = coalesce(p_city, '')
    and er.district = coalesce(p_district, '')
    and er.mode = coalesce(p_mode, '')
    and er.room = coalesce(p_room, '')
  limit 1;
$$;

revoke all on function public.get_owner_rule_for_scope(text, text, text, text) from public;
grant execute on function public.get_owner_rule_for_scope(text, text, text, text) to authenticated;
