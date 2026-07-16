<!-- 第 018-175 批：年齡在罩杯前＋罩杯字母白名單修正版 -->
<!-- 第 018-174 批：點號連寫身材＋34D胸圍罩杯辨識修正版 -->
<!-- 第 018-173 批：全半形統一＋分隔金額＋胸圍罩杯身材辨識修正版 -->
<!-- batch018-172-thai-wash-header-bottom-price-incomplete-record-fix -->
<!-- 第 018-170 批：金額在前空格方案辨識修正版 -->
<!-- batch018-170-amount-first-space-price-plan -->
<!-- 第 018-169 批：姓名＋馬來西亞標題強制辨識與文件1切筆回歸修正版 -->
<!-- batch018-169-strict-name-country-header-fallback -->
<!-- 第 018-168 批：員工服務同義詞最後輸入優先＋優惠組合避免重複漏抓版 -->
<!-- 第 018-167 批：攝影原意保留＋入珠客加價完整保留版 -->
<!-- 第 018-166 批：雙飛搭配小姐名稱保留與格式統一版 -->
<!-- 第 018-165 批：獨立國籍行切筆＋空格分鐘價格加價修正版 -->
<!-- 第 018-163 批：入珠明確加價保留並輸出文件2修正版 -->
<!-- 第 018-162 批：文件1貼上自動留兩行＋情趣用品明確加價保留版 -->
<!-- 第 018-171 批：機房本日文件3與媒體更新狀態同步顯示版 -->
<!-- batch018-171-room-daily-document-media-status -->
<!-- 第 018-161 批：媒體上傳下拉本次已上傳排序＋名稱固定寬度對齊圖片影片數量版 -->
<!-- 第 018-157 批：服務同義詞逐行最長優先避免短規則重複套用版 -->
<!-- 第 018-156 批：同義詞來源內嵌金額保留＋分鐘加價不重複累加修正版 -->
<!-- 第 018-155 批：不完整資料文件2預覽＋缺少欄位提示＋禁止加入文件3版 -->
<!-- 第 018-153 批：攝影加值金額空格保留修正版 -->
<!-- 第 018-152 批：服務同義詞原文完整儲存不自動刪字修正版 -->
<!-- 第 018-151 批：加值金額跨行黏連誤判修正版 -->
<!-- 第 018-150 批：機房清單可選修改刪除＋加值服務明確金額不放大修正版 -->
<!-- 第 018-149 批：小姐名「小妹妹」完整保留＋空格身材第三碼年齡補抓修正版 -->
<!-- 第 018-147 批：老闆全站公版改用獨立資料表，徹底避開 employee_rules mode 約束 -->
<!-- 第 018-146 批：老闆全站公版 mode 約束相容修正版 -->
<!-- 第 018-145 批：老闆全站公版＋員工地區補充規則正式分層版 -->
<!-- 第 018-144 批：優惠組合縮寫轉中文、中文原文保留版 -->
<!-- 第 018-137 批：疑似重複小姐整理與媒體缺失快速處理工具版 -->
<!-- 第 018-133 批：媒體重複誤判修正，改由伺服器 URL 權威判斷 -->
<!-- 第 018-130 批：上傳彈窗顯示已上傳媒體與燈箱資訊精簡版（依第 018-129 批延續） -->
<!-- 第 018-129 批：前台預覽卡片方案服務對齊與媒體燈箱關閉鈕加大版（依第 018-128 批延續） -->
<!-- 第 018-126 批：中央媒體來源統一與前後台數量同步修正版（依第 018-125 批延續） -->
<template>
  <!-- 第 018-109 批：待上傳縮圖區禁止拖放版 -->
  <!-- batch018-167-keep-generic-photography-and-paid-bead-customer -->
  <!-- batch018-163-keep-explicit-paid-bead-service -->
  <!-- batch018-162-source-paste-two-blank-lines-and-keep-paid-toy -->
  <!-- batch018-161-media-upload-session-status-align-counts -->
  <!-- batch018-157-alias-line-longest-match-once -->
  <!-- batch018-156-alias-embedded-amount-minute-add-no-double-stack -->
  <!-- batch018-155-incomplete-record-preview-missing-fields-guard -->
  <!-- batch018-152-alias-rules-exact-save-preserve -->
  <!-- batch018-154-photography-regex-escape-fix -->
  <!-- batch018-151-addon-amount-line-boundary-fix -->
  <!-- batch018-150-room-list-manage-explicit-addon-amount-fix -->
  <!-- batch018-149-lady-name-and-spaced-age-fix -->
  <!-- batch018-148-explicit-addon-amount-cleanup-alias-fix -->
  <!-- batch018-147-owner-global-dedicated-table-fix -->
  <!-- batch018-146-owner-global-mode-constraint-fix -->
  <!-- batch018-144-promotion-shorthand-to-chinese-source-preserve -->
  <!-- batch018-142-alias-delete-persist-fix -->
  <main v-if="!authReady" class="login-page-shell">
    <section class="login-card">
      <div class="login-brand">正式線上登入</div>
      <h1>正在檢查登入狀態...</h1>
      <p>請稍候，系統正在連線 Supabase。</p>
    </section>
  </main>

  <main v-else-if="!authUser" class="login-page-shell">
    <section class="login-card">
      <div class="login-brand">auto-document-converter</div>
      <h1>員工帳號登入</h1>
      <p>請使用 Supabase 建立的員工 Email / 密碼登入。登入後，每個員工會讀取自己的工作區與規則。</p>

      <div v-if="!supabaseConfigured" class="login-warning">
        尚未設定 Supabase 環境變數，請先設定 VITE_SUPABASE_URL 與 VITE_SUPABASE_ANON_KEY。
      </div>

      <form class="login-form" @submit.prevent="loginWithSupabase">
        <label>
          Email 帳號
          <input v-model="loginEmail" type="email" autocomplete="username" placeholder="員工 Email" />
        </label>
        <label>
          密碼
          <input v-model="loginPassword" type="password" autocomplete="current-password" placeholder="登入密碼" />
        </label>
        <button class="primary-btn login-submit" type="submit" :disabled="isAuthBusy || !supabaseConfigured">
          {{ isAuthBusy ? '登入中...' : '登入系統' }}
        </button>
      </form>

      <p class="login-status" :class="{ error: loginStatusType === 'error', ok: loginStatusType === 'ok' }">{{ loginStatus }}</p>
    </section>
  </main>

  <main v-else class="page-shell">

    <transition name="action-toast">
      <div
        v-if="actionToastVisible"
        class="action-toast"
        :class="`is-${actionToastType}`"
        role="status"
        aria-live="polite"
      >
        <strong>{{ actionToastType === 'error' ? '操作失敗' : actionToastType === 'warning' ? '請注意' : '操作成功' }}</strong>
        <span>{{ actionToastText }}</span>
      </div>
    </transition>

    <section class="hero-card compact-control-card">
      <div class="top-control-header">
        <section class="staff-profile-card top-staff-profile-card">
          <div class="staff-profile-copy">
            <h3>線上員工工作區</h3>
            <p>目前登入：<strong>{{ currentStaffName }}</strong>｜身份：<strong>{{ currentRoleLabel }}</strong></p>
            <p>帳號：{{ authUserEmail }}</p>
          </div>
          <div class="staff-profile-actions compact-staff-actions">
            <button class="ghost-btn" type="button" @click="reloadCurrentProfile">重新讀取身份</button>
            <button class="danger-btn" type="button" @click="logoutFromSupabase">登出</button>
          </div>
        </section>

        <div class="top-setting-buttons compact-main-buttons">
          <button class="summary-pill" :class="{ active: activeTopPanel === 'price' }" type="button" @click="toggleTopPanel('price')">
            金額設定
          </button>
          <button class="summary-pill" :class="{ active: activeTopPanel === 'format' }" type="button" @click="toggleTopPanel('format')">
            輸出格式
          </button>
          <button class="summary-pill" :class="{ active: activeTopPanel === 'quick' }" type="button" @click="toggleTopPanel('quick')">
            常用規則
          </button>
          <button class="summary-pill" :class="{ active: activeTopPanel === 'advanced' }" type="button" @click="toggleTopPanel('advanced')">
            進階設定
          </button>
          <button class="summary-pill api-toggle-pill" :class="{ active: activeTopPanel === 'api' }" type="button" @click="toggleTopPanel('api')">
            {{ showApiPanel ? '收合API' : 'API串接' }}
          </button>
          <button class="summary-pill manager-toggle-pill" :class="{ active: showScopeManager }" type="button" @click="toggleScopeManager">
            地區機房管理
          </button>
          <button v-if="isOwner" class="summary-pill account-manager-toggle-pill" :class="{ active: showEmployeeManager }" type="button" @click="toggleEmployeeManager">
            帳號管理
          </button>
        </div>
      </div>

      <div
        v-if="activeTopPanel"
        class="top-settings-modal-backdrop"
        @click.self="closeTopSettingModal"
      ></div>

      <section v-if="isOwner && showEmployeeManager" class="owner-employee-card">
        <div class="owner-employee-header">
          <div>
            <h3>老闆員工帳號管理</h3>
            <p>在這裡建立員工 Email / 密碼。建立後員工可直接登入本系統；不會取得公版刪除權限。</p>
          </div>
          <button class="ghost-btn" type="button" @click="loadEmployeeProfiles" :disabled="isEmployeeBusy">重新整理員工</button>
        </div>

        <form class="owner-employee-form" @submit.prevent="createEmployeeAccount">
          <label>
            員工名稱
            <input v-model="employeeDisplayName" type="text" placeholder="例如：小陳" autocomplete="off" />
          </label>
          <label>
            員工 Email
            <input v-model="employeeEmail" type="email" placeholder="例如：staff01@gmail.com" autocomplete="off" />
          </label>
          <label>
            登入密碼
            <input v-model="employeePassword" type="text" placeholder="至少 6 碼，建立後交給員工" autocomplete="off" />
          </label>
          <button class="primary-btn" type="submit" :disabled="isEmployeeBusy">
            {{ isEmployeeBusy ? '建立中...' : '建立員工帳號' }}
          </button>
        </form>

        <p class="employee-manage-status" :class="{ error: employeeManageStatusType === 'error', ok: employeeManageStatusType === 'ok' }">{{ employeeManageStatus }}</p>

        <div class="employee-list-card">
          <div class="employee-list-title">目前員工 / 帳號</div>
          <div v-if="employeeProfiles.length === 0" class="employee-empty-row">尚未讀取到員工資料，請按「重新整理員工」。</div>
          <div v-for="profile in employeeProfiles" :key="profile.id" class="employee-row">
            <template v-if="editingEmployeeId === profile.id">
              <div class="employee-edit-panel">
                <label>
                  員工名稱
                  <input v-model="editingEmployeeDisplayName" type="text" placeholder="員工名稱" autocomplete="off" />
                </label>
                <label>
                  員工 Email
                  <input v-model="editingEmployeeEmail" type="email" placeholder="員工 Email" autocomplete="off" />
                </label>
                <label>
                  新密碼
                  <input v-model="editingEmployeePassword" type="text" placeholder="不修改請留空，至少 6 碼" autocomplete="off" />
                </label>
                <div class="employee-row-actions edit-actions">
                  <button class="primary-btn small-action-btn" type="button" @click="updateEmployeeAccount(profile)" :disabled="isEmployeeBusy">
                    儲存修改
                  </button>
                  <button class="ghost-btn small-action-btn" type="button" @click="cancelEditEmployee" :disabled="isEmployeeBusy">
                    取消
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <div>
                <strong>{{ profile.display_name || profile.email }}</strong>
                <span>{{ profile.email }}</span>
              </div>
              <div class="employee-row-side">
                <em :class="{ owner: profile.role === 'owner' }">{{ profile.role === 'owner' ? '老闆' : '員工' }}</em>
                <button
                  v-if="profile.role !== 'owner'"
                  class="ghost-btn small-action-btn"
                  type="button"
                  @click="startEditEmployee(profile)"
                  :disabled="isEmployeeBusy"
                >
                  編輯 / 改密碼
                </button>
                <button
                  v-if="profile.role !== 'owner'"
                  class="danger-btn small-action-btn"
                  type="button"
                  @click="deleteEmployeeAccount(profile)"
                  :disabled="isEmployeeBusy"
                >
                  刪除
                </button>
              </div>
            </template>
          </div>
        </div>
      </section>

      <section class="scope-manager-card top-settings-modal-card top-settings-scope-modal" v-if="showScopeManager">
        <div class="scope-rule-header top-settings-modal-head">
          <div>
            <h3>我的地區 / 定點外送 / 機房管理</h3>
            <p>{{ currentStaffName }} 的個人管理清單；新增、修改、刪除只影響目前登入的員工。</p>
          </div>
          <div class="selected-scope-preview scope-manager-preview-bar scope-manager-preview-head">
            目前選擇：
            <strong>{{ managerSelectedCity || '未選縣市' }}</strong>
            <span>→</span>
            <strong>{{ managerSelectedDistrict || '未選地區' }}</strong>
            <span>→</span>
            <strong>{{ managerSelectedType || '未選定點/外送' }}</strong>
            <span>→</span>
            <strong>{{ ruleScopeRoom || '未選機房' }}</strong>
          </div>
          <div class="top-settings-modal-head-actions">
            <div class="scope-status-pill">{{ currentStaffName }} 已建立：{{ locationCities.length }} 縣市 / {{ totalDistrictCount }} 地區 / {{ totalRoomCount }} 機房</div>
            <span class="scope-fixed-pill">固定顯示</span>
          </div>
        </div>

        <div class="scope-manager-selection-shell">
          <div class="location-select-line scope-manager-select-grid">
            <label>
              縣市 / 國籍
              <select v-model="managerSelectedCity">
                <option value="">請選縣市</option>
                <option v-for="city in locationCities" :key="city" :value="city">{{ city }}</option>
              </select>
            </label>

            <label>
              地區
              <select v-model="managerSelectedDistrict" :disabled="!managerSelectedCity">
                <option value="">請選地區</option>
                <option v-for="district in managerDistricts" :key="district" :value="district">{{ district }}</option>
              </select>
            </label>

            <label>
              定點 / 外送
              <select v-model="managerSelectedType">
                <option value="">請選定點 / 外送</option>
                <option v-for="type in locationTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </label>

            <label class="room-daily-status-select">
              <span class="room-daily-status-heading">
                <span>機房</span>
                <em>{{ managerRoomDailyUpdatedSummary }}</em>
              </span>
              <select v-model="ruleScopeRoom" :disabled="!managerSelectedCity || !managerSelectedDistrict || !managerSelectedType">
                <option value="">請選機房</option>
                <option v-for="room in managerRooms" :key="room" :value="room">{{ getRoomOptionDisplayLabel(room) }}</option>
              </select>
            </label>

            <button class="primary-btn manager-crud-toggle" type="button" @click="showScopeCrudPanel = !showScopeCrudPanel">
              管理清單
            </button>
          </div>

          <small v-if="ruleScopeRoom" class="room-daily-current-status" :class="`is-${currentRoomDailyStatus.state}`">
            {{ currentRoomDailyStatus.detail }}
          </small>
        </div>

        <div class="room-rule-action-row scope-manager-action-shell">
          <div class="room-rule-topline">
            <div class="room-rule-current">
              <div>目前規則範圍：<strong>{{ currentRuleScopeLabel }}</strong></div>
              <span>有效來源：{{ effectiveRuleSourceLabel }}</span>
            </div>
            <div class="room-rule-buttons">
              <button
                class="primary-btn"
                type="button"
                :disabled="isSavingScopeRules || isLoadingScopeRules"
                @click="saveCurrentScopeRules"
              >
                {{ isSavingScopeRules ? '儲存中...' : (isOwner ? '儲存老闆全站公版' : '儲存目前地區補充') }}
              </button>
              <button
                class="ghost-btn"
                type="button"
                :disabled="isSavingScopeRules || isLoadingScopeRules"
                @click="loadCurrentScopeRules"
              >
                {{ isLoadingScopeRules ? '讀取中...' : (isOwner ? '讀取老闆全站公版' : '讀取老闆公版＋我的補充') }}
              </button>
            </div>
            <p class="room-rule-feedback" :class="`is-${roomRuleStatusType}`">
              <span></span>
              {{ roomRuleStatusText }}
            </p>
          </div>
        </div>

        <Teleport to="body">
        <div v-if="showScopeCrudPanel" class="option-modal-mask location-manager-overlay" @click.self="showScopeCrudPanel = false">
          <section class="option-modal-card location-manager-modal-card">
            <button class="option-modal-close" type="button" @click="showScopeCrudPanel = false">×</button>

            <div class="option-modal-head">
              <h2>{{ currentStaffName }} 的地區機房管理設定</h2>
              <p>公版縣市 / 地區會預設顯示；員工可自己新增、修改或刪除不想管理的區域，資料只影響目前員工個人工作區。</p>
              <span class="option-sync-pill">
                <i></i>
                已讀取 {{ currentStaffName }} 個人清單
              </span>
            </div>

            <div class="location-modal-grid location-modal-grid-room-first">
<div class="option-manager-panel">
                <h3>機房管理</h3>
                <label class="modal-inline-label modal-select-label">
                  選擇縣市
                  <select v-model="roomManagerSelectedCity">
                    <option value="">請先選縣市</option>
                    <option v-for="city in locationCities" :key="city" :value="city">{{ city }}</option>
                  </select>
                </label>
                <select v-model="roomManagerSelectedDistrict" :disabled="!roomManagerSelectedCity">
                  <option value="">請先選地區</option>
                  <option v-for="district in roomManagerDistricts" :key="district" :value="district">{{ district }}</option>
                </select>
                <select v-model="roomManagerSelectedType">
                  <option value="">請選定點 / 外送</option>
                  <option v-for="type in locationTypes" :key="type" :value="type">{{ type }}</option>
                </select>
                <div class="option-inline-input">
                  <input
                    v-model="newRoomName"
                    :disabled="!roomManagerSelectedCity || !roomManagerSelectedDistrict || !roomManagerSelectedType"
                    placeholder="新增機房，例如：A機房"
                  />
                  <button
                    type="button"
                    :disabled="!roomManagerSelectedCity || !roomManagerSelectedDistrict || !roomManagerSelectedType"
                    @click="addLocationRoom"
                  >新增</button>
                </div>
                <div class="managed-room-list-shell">
                  <div class="managed-room-list-title">
                    <span>目前範圍已建立機房</span>
                    <strong>{{ roomManagerRooms.length }} 間</strong>
                  </div>
                  <div v-if="roomManagerRooms.length" class="managed-room-chip-list">
                    <button
                      v-for="room in roomManagerRooms"
                      :key="`managed-room-${room}`"
                      type="button"
                      class="managed-room-chip"
                      :class="{ active: currentManagedRoom === room }"
                      @click="selectRoomForManagement(room)"
                    >
                      <span>{{ room }}</span>
                      <em>{{ currentManagedRoom === room ? '已選' : '選取' }}</em>
                    </button>
                  </div>
                  <div v-else class="managed-room-empty">此縣市／地區／類型目前尚未建立機房。</div>
                </div>
                <div class="option-current-text">目前：{{ currentManagedRoom || '請從上方清單選擇機房' }}</div>
                <div class="option-action-row">
                  <button type="button" :disabled="!currentManagedRoom" @click="renameLocationRoom(currentManagedRoom)">修改目前機房</button>
                  <button type="button" class="danger-mini" :disabled="!currentManagedRoom" @click="removeLocationRoom(currentManagedRoom)">刪除目前機房</button>
                </div>
              </div>
            
<div class="option-manager-panel">
                <h3>縣市管理</h3>
                <div class="modal-inline-label">
                  選擇縣市
                  <div class="modal-button-list city-button-list">
                    <button
                      v-for="city in locationCities"
                      :key="city"
                      type="button"
                      class="modal-select-button drag-sort-button"
                      :class="{ active: managerSelectedCity === city, dragging: dragCityName === city }"
                      draggable="true"
                      @click="managerSelectedCity = city"
                      @dragstart="handleCityDragStart(city)"
                      @dragover.prevent
                      @drop.prevent="handleCityDrop(city)"
                      @dragend="clearDragState"
                    >
                      <span class="drag-handle">⋮⋮</span>
                      {{ city }}
                    </button>
                  </div>
                </div>
                <div class="option-inline-input">
                  <input v-model="newCityName" placeholder="新增縣市，例如：竹北" />
                  <button type="button" @click="addLocationCity">新增</button>
                </div>
                <div class="option-current-text">目前：{{ managerSelectedCity || '未選縣市' }}</div>
                <div class="option-action-row">
                  <button type="button" :disabled="!managerSelectedCity" @click="renameLocationCity(managerSelectedCity)">修改目前縣市</button>
                  <button type="button" class="danger-mini" :disabled="!managerSelectedCity" @click="removeLocationCity(managerSelectedCity)">刪除目前縣市</button>
                </div>
              </div>

              
<div class="option-manager-panel">
                <h3>地區管理</h3>
                <div class="district-selected-city-note">
                  目前縣市：<strong>{{ managerSelectedCity || '請先在縣市管理選縣市' }}</strong>
                </div>
                <div class="modal-button-list district-button-list" v-if="managerSelectedCity && managerDistricts.length">
                  <button
                    v-for="district in managerDistricts"
                    :key="district"
                    type="button"
                    class="modal-select-button drag-sort-button"
                    :class="{ active: managerSelectedDistrict === district, dragging: dragDistrictName === district }"
                    draggable="true"
                    @click="managerSelectedDistrict = district"
                    @dragstart="handleDistrictDragStart(district)"
                    @dragover.prevent
                    @drop.prevent="handleDistrictDrop(district)"
                    @dragend="clearDragState"
                  >
                    <span class="drag-handle">⋮⋮</span>
                    {{ district }}
                    <span class="delete-chip" @click.stop="removeLocationDistrict(district)">×</span>
                  </button>
                </div>
                <div class="district-empty-note" v-else>
                  {{ managerSelectedCity ? '這個縣市目前還沒有地區，可以在下方新增。' : '請先選縣市。' }}
                </div>
                <div class="option-inline-input">
                  <input v-model="newDistrictName" :disabled="!managerSelectedCity" placeholder="新增地區，例如：中壢" />
                  <button type="button" :disabled="!managerSelectedCity" @click="addLocationDistrict">新增</button>
                </div>
                <div class="option-current-text">目前：{{ managerSelectedDistrict || '未選地區' }}</div>
                <div class="option-action-row">
                  <button type="button" :disabled="!managerSelectedCity || !managerSelectedDistrict" @click="renameLocationDistrict(managerSelectedDistrict)">修改目前地區</button>
                  <button type="button" class="danger-mini" :disabled="!managerSelectedCity || !managerSelectedDistrict" @click="removeLocationDistrict(managerSelectedDistrict)">刪除目前地區</button>
                </div>
              </div>

              


            </div>

            <div class="location-modal-bottom">
              <button class="restore-btn" type="button" @click="showScopeCrudPanel = false">完成，關閉管理</button>
            </div>
          </section>
        </div>
        </Teleport>

      </section>

        <div v-if="showPriceSettings" class="hero-actions setting-content-block top-settings-modal-card top-settings-price-modal">
        <div class="top-settings-modal-head">
          <div>
            <h3>金額設定</h3>
            <p>{{ ruleLayerHelpText }}</p>
          </div>
          <button class="top-settings-modal-close" type="button" @click="closeTopSettingModal">關閉</button>
        </div>
        <div class="setting-save-item">
          <label>
            加價模式
            <select v-model="priceMode">
              <option value="country">依國籍自動加價</option>
              <option value="global">全部固定加價</option>
              <option value="custom">全部自訂加價</option>
            </select>
          </label>
        </div>

        <div class="setting-save-item">
          <label>
            固定加價
            <select v-model.number="globalIncrease">
              <option :value="0">+0</option>
              <option :value="500">+500</option>
              <option :value="600">+600</option>
              <option :value="1000">+1000</option>
            </select>
          </label>
        </div>

        <div class="setting-save-item">
          <label>
            自訂加價
            <input v-model.number="customIncrease" type="number" min="0" step="100" />
          </label>
        </div>

        <div class="setting-save-item">
          <label>
            金額計算優先
            <select v-model="amountPriorityMode">
              <option value="higher-price">自動取較高金額</option>
              <option value="country-first">國籍加價優先</option>
              <option value="transform-first">金額轉換優先</option>
            </select>
          </label>
        </div>
        <div class="setting-save-item wide-price-rule">
          <label>
            分鐘方案加價規則，一行一個，格式：分鐘=加價
            <textarea
              v-model="minutePriceAddRulesText"
              class="rule-textarea small"
              placeholder="例如：90=1000"
            ></textarea>
            <small>例：90=1000 代表 90 分鐘方案使用 +1000；不會再和國籍／固定加價重複累加，會取較高加價。</small>
            <small>另外會自動補差：3.1K→3.2K、3.4K→3.5K、4.9K→5K。</small>
          </label>
        </div>

        <div class="modal-bottom-save-row">
          <button class="ghost-btn" type="button" :disabled="isSavingScopeRules" @click="saveRuleFields('金額設定', ['priceMode', 'globalIncrease', 'customIncrease', 'amountPriorityMode', 'minutePriceAddRulesText'])">
            {{ isSavingScopeRules ? '儲存中...' : '儲存' }}
          </button>
        </div>
        </div>
      <div v-if="showFormatSettings" class="rule-grid top-rules setting-content-block compact-control-content top-settings-modal-card top-settings-format-modal recognition-format-modal">
        <div class="top-settings-modal-head">
          <div>
            <h3>欄位辨識與文件2輸出格式</h3>
            <p>{{ ruleLayerHelpText }}</p>
          </div>
          <div class="top-settings-modal-head-actions single-save-head-actions">
            <button
              class="ghost-btn"
              type="button"
              :disabled="isSavingScopeRules"
              @click="saveRuleFields('欄位辨識與輸出格式', ['headerRecognitionRules', 'bodyRecognitionRules', 'advancedRegexRules', 'bodyOutputOrder', 'formatHint', 'titleMode'])"
            >
              {{ isSavingScopeRules ? '儲存中...' : '儲存' }}
            </button>
            <button class="top-settings-modal-close" type="button" @click="closeTopSettingModal">關閉</button>
          </div>
        </div>

        <div class="format-settings-tabs" role="tablist" aria-label="欄位辨識設定">
          <button type="button" :class="{ active: formatSettingsTab === 'header' }" @click="formatSettingsTab = 'header'">小姐標題規則</button>
          <button type="button" :class="{ active: formatSettingsTab === 'body' }" @click="formatSettingsTab = 'body'">身材欄位規則</button>
          <button type="button" :class="{ active: formatSettingsTab === 'output' }" @click="formatSettingsTab = 'output'">文件2輸出格式</button>
          <button v-if="isOwner" type="button" :class="{ active: formatSettingsTab === 'regex' }" @click="formatSettingsTab = 'regex'">老闆特殊格式</button>
        </div>

        <section v-if="formatSettingsTab === 'header'" class="recognition-settings-panel">
          <div class="recognition-panel-intro">
            <strong>來源可有多種標題順序，文件2仍統一輸出。</strong>
            <span>一般員工只新增結構化規則；老闆全站公版會先套用，員工機房補充會優先嘗試。</span>
          </div>

          <div class="recognition-builder-grid header-builder-grid">
            <label>
              規則名稱
              <input v-model="newHeaderRuleName" placeholder="例如：姓名在國籍前" />
            </label>
            <label>
              來源順序
              <select v-model="newHeaderRuleMode">
                <option v-for="option in headerRuleModeOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
              </select>
            </label>
            <label class="recognition-builder-wide">
              範例
              <input v-model="newHeaderRuleExample" placeholder="例如：小淫娃 馬來西亞" />
            </label>
            <button class="primary-btn recognition-add-btn" type="button" @click="addHeaderRecognitionRule">新增標題規則</button>
          </div>

          <div v-if="headerRecognitionRules.length" class="recognition-rule-list">
            <article v-for="(rule, index) in headerRecognitionRules" :key="rule.id || `header-rule-${index}`" class="recognition-rule-card">
              <label class="recognition-enable-toggle">
                <input v-model="rule.enabled" type="checkbox" />
                啟用
              </label>
              <div class="recognition-rule-main">
                <input v-model="rule.name" class="recognition-rule-name" aria-label="標題規則名稱" />
                <select v-model="rule.mode" aria-label="標題來源順序">
                  <option v-for="option in headerRuleModeOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                </select>
                <input v-model="rule.example" placeholder="來源範例" aria-label="標題規則範例" />
              </div>
              <div class="recognition-rule-actions">
                <button type="button" :disabled="index === 0" @click="moveRecognitionRule(headerRecognitionRules, index, -1)">上移</button>
                <button type="button" :disabled="index === headerRecognitionRules.length - 1" @click="moveRecognitionRule(headerRecognitionRules, index, 1)">下移</button>
                <button type="button" class="danger-text-btn" @click="removeRecognitionRule(headerRecognitionRules, index)">刪除</button>
              </div>
            </article>
          </div>
          <p v-else class="recognition-empty-hint">目前這一層沒有新增標題規則；轉換時仍會套用老闆公版與系統內建辨識。</p>

          <div class="recognition-test-card">
            <label>
              即時測試來源
              <textarea v-model="headerRecognitionTestText" rows="3" placeholder="例如：小淫娃 馬來西亞"></textarea>
            </label>
            <div class="recognition-test-result" :class="headerRecognitionPreview.ok ? 'success' : 'warning'">
              <strong>{{ headerRecognitionPreview.ok ? '辨識成功' : '尚未辨識' }}</strong>
              <span>{{ headerRecognitionPreview.message }}</span>
              <code v-if="headerRecognitionPreview.preview">{{ headerRecognitionPreview.preview }}</code>
            </div>
          </div>
        </section>

        <section v-else-if="formatSettingsTab === 'body'" class="recognition-settings-panel">
          <div class="recognition-panel-intro">
            <strong>欄位順序可變，系統會先統一全形／半形與常見分隔符號。</strong>
            <span>來源可寫年齡在罩杯前、罩杯在年齡前或 34D；文件2依固定順序輸出。</span>
          </div>

          <div class="recognition-builder-grid body-builder-grid">
            <label>
              規則名稱
              <input v-model="newBodyRuleName" placeholder="例如：年齡在罩杯前" />
            </label>
            <label v-for="position in 4" :key="`body-field-${position}`">
              第 {{ position }} 欄
              <select v-model="newBodyRuleFields[position - 1]">
                <option value="">不使用</option>
                <option v-for="option in bodyFieldOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
              </select>
            </label>
            <label class="recognition-builder-wide">
              範例
              <input v-model="newBodyRuleExample" placeholder="例如：150 40 20y 天然D" />
            </label>
            <button class="primary-btn recognition-add-btn" type="button" @click="addBodyRecognitionRule">新增身材規則</button>
          </div>

          <div v-if="bodyRecognitionRules.length" class="recognition-rule-list">
            <article v-for="(rule, index) in bodyRecognitionRules" :key="rule.id || `body-rule-${index}`" class="recognition-rule-card body-rule-card">
              <label class="recognition-enable-toggle">
                <input v-model="rule.enabled" type="checkbox" />
                啟用
              </label>
              <div class="recognition-rule-main body-rule-main">
                <input v-model="rule.name" class="recognition-rule-name" aria-label="身材規則名稱" />
                <div class="body-rule-field-row">
                  <template v-for="(field, fieldIndex) in rule.fields" :key="`${rule.id}-${fieldIndex}`">
                    <select v-model="rule.fields[fieldIndex]" aria-label="身材欄位順序">
                      <option v-for="option in bodyFieldOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                    </select>
                    <span v-if="fieldIndex < rule.fields.length - 1">→</span>
                  </template>
                </div>
                <input v-model="rule.example" placeholder="來源範例" aria-label="身材規則範例" />
              </div>
              <div class="recognition-rule-actions">
                <button type="button" :disabled="index === 0" @click="moveRecognitionRule(bodyRecognitionRules, index, -1)">上移</button>
                <button type="button" :disabled="index === bodyRecognitionRules.length - 1" @click="moveRecognitionRule(bodyRecognitionRules, index, 1)">下移</button>
                <button type="button" class="danger-text-btn" @click="removeRecognitionRule(bodyRecognitionRules, index)">刪除</button>
              </div>
            </article>
          </div>
          <p v-else class="recognition-empty-hint">目前這一層沒有新增身材規則；轉換時仍會套用老闆公版與系統內建辨識。</p>

          <div class="recognition-test-card">
            <label>
              即時測試來源
              <textarea v-model="bodyRecognitionTestText" rows="3" placeholder="例如：150 40 20y 天然D"></textarea>
            </label>
            <div class="recognition-test-result" :class="bodyRecognitionPreview.ok ? 'success' : 'warning'">
              <strong>{{ bodyRecognitionPreview.ok ? '辨識成功' : '尚未辨識' }}</strong>
              <span>{{ bodyRecognitionPreview.message }}</span>
              <code v-if="bodyRecognitionPreview.preview">{{ bodyRecognitionPreview.preview }}</code>
            </div>
          </div>
        </section>

        <section v-else-if="formatSettingsTab === 'output'" class="recognition-settings-panel output-format-panel">
          <div class="recognition-panel-intro">
            <strong>來源順序可以不同，但文件2只使用一種固定輸出順序。</strong>
            <span>建議維持「身高 → 體重 → 罩杯 → 年齡」，讓文件3、JSON 與中央網站資料一致。</span>
          </div>

          <div class="setting-save-item">
            <label>
              輸出格式說明
              <input v-model="formatHint" />
            </label>
          </div>

          <div class="setting-save-item">
            <label>
              標題格式
              <select v-model="titleMode">
                <option value="country-name">【國籍 名稱】</option>
                <option value="name-country">【名稱 國籍】</option>
                <option value="name-only">【名稱】</option>
              </select>
            </label>
          </div>

          <div class="setting-save-item">
            <label>
              身材固定輸出順序
              <select v-model="bodyOutputOrder" :disabled="!isOwner">
                <option value="height-weight-cup-age">身高 → 體重 → 罩杯 → 年齡（推薦）</option>
                <option value="height-weight-age-cup">身高 → 體重 → 年齡 → 罩杯</option>
              </select>
              <small v-if="!isOwner">由老闆全站公版統一管理；員工轉換時會自動套用。</small>
            </label>
          </div>

          <div class="output-format-preview-card">
            <span>文件2固定預覽</span>
            <code>{{ outputFormatPreview }}</code>
          </div>
        </section>

        <section v-else-if="formatSettingsTab === 'regex' && isOwner" class="recognition-settings-panel owner-regex-panel">
          <div class="recognition-panel-intro owner-only-intro">
            <strong>老闆專用特殊格式</strong>
            <span>不用輸入英文公式。直接用中文欄位標記來源格式，員工轉換時會自動套用，但看不到也不能修改。</span>
          </div>

          <div class="special-format-help-card">
            <strong>使用方式</strong>
            <span>例如輸入「身高{身高} 體重{體重} 年齡{年齡} 罩杯{罩杯}」，再放入測試範例「身高150 體重40 年齡20y 罩杯天然D」。</span>
            <span>大括號內是系統欄位，外面的中文是店家固定寫法；全形、半形與常見分隔符號會自動統一。</span>
          </div>

          <div class="special-format-builder-grid">
            <label>
              規則名稱
              <input v-model="newRegexRuleName" placeholder="例如：特殊店家身材格式" />
            </label>
            <label>
              資料類型
              <select v-model="newRegexRuleTarget">
                <option value="header">小姐標題</option>
                <option value="body">身材資料</option>
              </select>
            </label>
            <label class="special-template-field">
              來源格式範本
              <textarea v-model="newSpecialRuleTemplate" rows="3" :placeholder="specialRuleTemplatePlaceholder"></textarea>
            </label>
            <div class="special-placeholder-panel">
              <span>點一下加入欄位：</span>
              <button
                v-for="item in specialRulePlaceholderOptions"
                :key="item.value"
                type="button"
                @click="appendSpecialRulePlaceholder(item.value)"
              >{{ item.label }}</button>
            </div>
            <label class="special-example-field">
              測試範例
              <input v-model="newRegexRuleExample" :placeholder="specialRuleExamplePlaceholder" />
            </label>
            <div class="recognition-test-result special-rule-preview" :class="specialRulePreview.ok ? 'success' : 'warning'">
              <strong>{{ specialRulePreview.ok ? '測試成功' : '尚未辨識' }}</strong>
              <span>{{ specialRulePreview.message }}</span>
              <code v-if="specialRulePreview.preview">{{ specialRulePreview.preview }}</code>
            </div>
            <button class="primary-btn recognition-add-btn special-add-btn" type="button" @click="addAdvancedRegexRule">新增特殊格式</button>
          </div>

          <div v-if="advancedRegexRules.length" class="recognition-rule-list regex-rule-list">
            <article v-for="(rule, index) in advancedRegexRules" :key="rule.id || `regex-rule-${index}`" class="recognition-rule-card regex-rule-card special-rule-card">
              <label class="recognition-enable-toggle">
                <input v-model="rule.enabled" type="checkbox" />
                啟用
              </label>
              <div class="recognition-rule-main regex-rule-main special-rule-main">
                <input v-model="rule.name" class="recognition-rule-name" aria-label="特殊格式規則名稱" />
                <div class="special-rule-summary">
                  <strong>{{ rule.target === 'header' ? '小姐標題' : '身材資料' }}</strong>
                  <span>{{ rule.template || '舊版特殊規則（已保留，仍會自動套用）' }}</span>
                </div>
                <input v-model="rule.example" placeholder="測試範例" aria-label="特殊格式測試範例" />
                <small v-if="getAdvancedRegexRuleError(rule)" class="regex-rule-error">這條規則目前無法使用，請刪除後用上方中文格式重新建立。</small>
                <small v-else class="regex-rule-ok">規則可正常套用</small>
              </div>
              <div class="recognition-rule-actions">
                <button type="button" :disabled="index === 0" @click="moveRecognitionRule(advancedRegexRules, index, -1)">上移</button>
                <button type="button" :disabled="index === advancedRegexRules.length - 1" @click="moveRecognitionRule(advancedRegexRules, index, 1)">下移</button>
                <button type="button" class="danger-text-btn" @click="removeRecognitionRule(advancedRegexRules, index)">刪除</button>
              </div>
            </article>
          </div>
          <p v-else class="recognition-empty-hint">尚未建立老闆特殊格式；一般來源會由標題規則、身材規則與系統內建辨識處理。</p>
        </section>
      </div>

      <section v-if="showQuickRules" class="quick-rule-section setting-content-block compact-control-content top-settings-modal-card top-settings-quick-modal">
        <div class="quick-rule-header top-settings-modal-head">
          <div>
            <h3>簡單模式｜常用規則</h3>
            <p>{{ ruleLayerHelpText }}</p>
          </div>
          <div class="top-settings-modal-head-actions single-save-head-actions">
            <button class="ghost-btn" type="button" :disabled="isSavingScopeRules" @click="saveRuleFields('常用規則', ['aliasRulesText', 'removeWordsText'])">{{ isSavingScopeRules ? '儲存中...' : '儲存' }}</button>
            <button class="top-settings-modal-close" type="button" @click="closeTopSettingModal">關閉</button>
          </div>
        </div>

        <div class="manager-grid">
          <div class="manager-card">
            <div class="manager-title manager-title-row">
              <div>
                <h4>服務同義詞</h4>
                <p>店家寫法轉成你的固定顯示。</p>
              </div>
              <div class="manager-title-actions">
                <button class="mini-toggle-btn" type="button" @click="showAliasList = !showAliasList">
                  {{ showAliasList ? '收合列表' : `展開列表（${aliasRuleItems.length}）` }}
                </button>
              </div>
            </div>

            <div class="manager-inputs two-cols">
              <input v-model="newAliasFrom" placeholder="店家寫法，例如 溫馨調情" />
              <input v-model="newAliasTo" placeholder="固定顯示，例如 調情" />
              <button class="primary-btn" type="button" @click="addAliasRule">新增</button>
            </div>
            <p v-if="!showAliasList" class="collapsed-hint">已收合 {{ aliasRuleItems.length }} 筆服務同義詞，按「展開列表」查看或刪除。</p>

            <div v-if="showAliasList" class="rule-chip-list">
              <span
                v-for="(rule, index) in aliasRuleItems"
                :key="`alias-${rule.from}-${rule.to}-${index}`"
                class="rule-chip"
              >
                {{ rule.from }} → {{ rule.to }}
                <button type="button" @click="removeAliasRule(index)">×</button>
              </span>
            </div>
          </div>

          <div class="manager-card">
            <div class="manager-title manager-title-row">
              <div>
                <h4>不想出現文字</h4>
                <p>套用時會從文件1清掉。</p>
              </div>
              <div class="manager-title-actions">
                <button class="mini-toggle-btn" type="button" @click="showRemoveWordList = !showRemoveWordList">
                  {{ showRemoveWordList ? '收合列表' : `展開列表（${removeWordItems.length}）` }}
                </button>
              </div>
            </div>

            <div class="manager-inputs one-col">
              <input v-model="newRemoveWord" placeholder="例如 真實本人照" />
              <button class="primary-btn" type="button" @click="addRemoveWord">新增</button>
            </div>
            <p v-if="!showRemoveWordList" class="collapsed-hint">已收合 {{ removeWordItems.length }} 筆不想出現文字，按「展開列表」查看或刪除。</p>

            <div v-if="showRemoveWordList" class="rule-chip-list">
              <span
                v-for="(word, index) in removeWordItems"
                :key="`remove-${word}-${index}`"
                class="rule-chip"
              >
                {{ word }}
                <button type="button" @click="removeRemoveWord(index)">×</button>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section v-if="showAdvancedSettings" class="advanced-section compact-control-content top-settings-modal-card top-settings-advanced-modal">
        <div class="advanced-title top-settings-modal-head">
          <div>
            <h3>進階設定</h3>
            <p>{{ ruleLayerHelpText }}</p>
          </div>
          <div class="top-settings-modal-head-actions single-save-head-actions">
            <button class="ghost-btn" type="button" :disabled="isSavingScopeRules" @click="saveRuleFields('進階設定', ['countryFieldRulesText', 'bodyCupPrefixText', 'notNameWordsText', 'countryPriceRulesText', 'countryAliasText', 'serviceOrderText', 'aliasRulesText', 'removeWordsText', 'extraKeepText'])">{{ isSavingScopeRules ? '儲存中...' : '儲存' }}</button>
            <button class="top-settings-modal-close" type="button" @click="closeTopSettingModal">關閉</button>
          </div>
        </div>

                <div class="advanced-inner-tabs">
          <button
            type="button"
            class="summary-pill"
            :class="{ active: activeAdvancedPanel === 'country-map' }"
            @click="toggleAdvancedPanel('country-map')"
          >
            國籍欄位
          </button>
          <button
            type="button"
            class="summary-pill"
            :class="{ active: activeAdvancedPanel === 'country-price' }"
            @click="toggleAdvancedPanel('country-price')"
          >
            國籍加價
          </button>
          <button
            type="button"
            class="summary-pill"
            :class="{ active: activeAdvancedPanel === 'country-alias' }"
            @click="toggleAdvancedPanel('country-alias')"
          >
            國籍同義詞
          </button>
          <button
            type="button"
            class="summary-pill"
            :class="{ active: activeAdvancedPanel === 'service-order' }"
            @click="toggleAdvancedPanel('service-order')"
          >
            服務排序
          </button>
          <button
            type="button"
            class="summary-pill"
            :class="{ active: activeAdvancedPanel === 'service-alias' }"
            @click="toggleAdvancedPanel('service-alias')"
          >
            服務同義詞
          </button>
          <button
            type="button"
            class="summary-pill"
            :class="{ active: activeAdvancedPanel === 'remove-text' }"
            @click="toggleAdvancedPanel('remove-text')"
          >
            不想出現文字
          </button>
          <button
            type="button"
            class="summary-pill"
            :class="{ active: activeAdvancedPanel === 'keep-keyword' }"
            @click="toggleAdvancedPanel('keep-keyword')"
          >
            額外保留關鍵字
          </button>
        </div>
        <div v-if="!activeAdvancedPanel" class="advanced-empty-panel">
          請點上方按鈕展開要修改的進階規則。
        </div>

        <div v-if="activeAdvancedPanel === 'country-map'" class="advanced-panel-clean">
          <div class="rule-card full-width-rule-card">
            <div class="advanced-card-title-row">
              <div>
                <h4>國籍欄位規則</h4>
                <p>把店家的國籍寫法轉成固定國籍。</p>
              </div>
            </div>
            <div class="rule-inline-row">
              <input v-model="newCountryRuleFrom" type="text" placeholder="店家寫法，例如 國家:馬來" />
              <select v-model="newCountryRuleTo">
                <option value="">請選擇固定國籍</option>
                <option value="台灣">台灣</option>
                <option value="越南">越南</option>
                <option value="泰妹">泰妹</option>
                <option value="馬來">馬來</option>
                <option value="香港">香港</option>
              </select>
              <button type="button" class="primary-btn small-btn" @click="addCountryFieldRule">新增</button>
            </div>

            <div class="rule-chip-list">
              <span
                v-for="(rule, index) in countryFieldRuleItems"
                :key="index"
                class="rule-chip"
              >
                {{ rule.source || rule.from || rule.pattern || rule.key || rule.left || rule }}
                <template v-if="rule.target || rule.to || rule.value || rule.right">
                  →
                  {{ rule.target || rule.to || rule.value || rule.right }}
                </template>
                <button type="button" @click="removeCountryFieldRule(index)">×</button>
              </span>
            </div>
          </div>

          <div class="advanced-two-col-grid">
            <div class="setting-save-item advanced-save-item">
              <label>
                國籍欄位規則，一行一組，格式：店家寫法=固定國籍
                <textarea v-model="countryFieldRulesText"></textarea>
              </label>
            </div>
            <div class="setting-save-item advanced-save-item">
              <label>
                身材補字規則，一行一個，例如：真、大、小、巨、自然
                <textarea v-model="bodyCupPrefixText"></textarea>
              </label>
            </div>
            <div class="setting-save-item advanced-save-item">
              <label>
                不要誤判成小姐名，一行一個
                <textarea v-model="notNameWordsText"></textarea>
              </label>
            </div>
            <div class="readonly-note-box">
              <strong>說明區（不用輸入）</strong>
              <p>這裡只放國籍欄位相關規則，不混入其他分頁內容。</p>
            </div>
          </div>
        </div>

        <div v-if="activeAdvancedPanel === 'country-price'" class="advanced-panel-clean">
          <div class="setting-save-item advanced-save-item">
            <label>
              國籍加價規則，一行一個，格式：國籍=加價
              <textarea v-model="countryPriceRulesText"></textarea>
            </label>
          </div>
        </div>

        <div v-if="activeAdvancedPanel === 'country-alias'" class="advanced-panel-clean">
          <div class="setting-save-item advanced-save-item">
            <label>
              國籍同義詞，一行一組，格式：來源=固定國籍
              <textarea v-model="countryAliasText"></textarea>
            </label>
          </div>
        </div>

        <div v-if="activeAdvancedPanel === 'service-order'" class="advanced-panel-clean">
          <div class="setting-save-item advanced-save-item">
            <label>
              服務固定排序，一行一個或空格分隔
              <textarea v-model="serviceOrderText"></textarea>
            </label>
          </div>
        </div>

        <div v-if="activeAdvancedPanel === 'service-alias'" class="advanced-panel-clean">
          <div class="setting-save-item advanced-save-item">
            <label>
              服務同義詞規則，一行一組，格式：店家寫法=固定寫法
              <textarea v-model="aliasRulesText"></textarea>
            </label>
          </div>
        </div>

        <div v-if="activeAdvancedPanel === 'remove-text'" class="advanced-panel-clean">
          <div class="setting-save-item advanced-save-item">
            <label>
              不想出現的文字，一行一個（套用時會清理文件1）
              <textarea v-model="removeWordsText"></textarea>
            </label>
          </div>
        </div>

        <div v-if="activeAdvancedPanel === 'keep-keyword'" class="advanced-panel-clean">
          <div class="setting-save-item advanced-save-item">
            <label>
              額外保留關鍵字，一行一個
              <textarea v-model="extraKeepText"></textarea>
            </label>
          </div>
        </div>

      
    </section>


    <section v-if="showApiPanel" class="api-panel api-panel-top setting-content-block compact-control-content api-clean-panel top-settings-modal-card top-settings-api-modal">
      <div class="api-clean-header top-settings-modal-head">
        <div>
          <h2>API 串接測試</h2>
          <p>這裡預設連線到 Render 線上 API，也可以手動切換其他 API 位置。</p>
          <p class="online-ready-hint">{{ ONLINE_READY_VERSION_LABEL }}｜線上版測試更清楚。</p>
        </div>
        <div class="top-settings-modal-head-actions">
          <div class="api-status-box">
            <p class="hint api-status-text">{{ apiStatusText }}</p>
          </div>
          <button class="top-settings-modal-close" type="button" @click="closeTopSettingModal">關閉</button>
        </div>
      </div>

      <label class="api-url-wide-row api-clean-url-row">
        <span>API 位置</span>
        <input v-model="apiBaseUrl" type="text" placeholder="https://auto-document-converter-api.onrender.com" />
      </label>

      <div class="api-clean-action-grid">
        <section class="api-action-card">
          <h3>API 基本操作</h3>
          <div class="api-action-buttons">
            <button class="ghost-btn" type="button" @click="saveApiBaseUrl">儲存API位置</button>
            <button class="ghost-btn" type="button" @click="useOnlineApiBaseUrl">套用線上API</button>
            <button class="ghost-btn" type="button" @click="testApiConnection">測試API</button>
            <button class="ghost-btn" type="button" @click="testDatabaseConnection">測試資料庫</button>
          </div>
        </section>

        <section class="api-action-card">
          <h3>資料送出 / 讀取</h3>
          <div class="api-action-buttons">
            <button class="primary-btn" type="button" @click="submitDocument4ToApi">送出到本機JSON</button>
            <button
              class="primary-btn db-btn"
              type="button"
              :disabled="isDatabaseSubmitting"
              @click="submitDocument4ToDatabase"
            >
              {{ isDatabaseSubmitting ? '送出中...' : '送出到資料庫' }}
            </button>
            <button class="ghost-btn frontend-load-btn" type="button" @click="loadFrontendLadies({ refresh: true })">讀取前台資料</button>
          </div>
        </section>
      </div>

      <section class="backup-settings-card api-clean-backup-card">
        <div>
          <h3>規則設定備份</h3>
          <p>線上版正式串資料庫前，先把本機規則匯出成 JSON 備份。換電腦或清快取後，可以再匯入還原。</p>
        </div>

        <div class="backup-actions">
          <button class="primary-btn" type="button" @click="exportLocalSettingsBackup">匯出規則備份 JSON</button>
          <button class="ghost-btn" type="button" @click="openBackupImportPicker">匯入規則備份 JSON</button>
          <input
            ref="backupImportInput"
            data-backup-import-input="true"
            type="file"
            accept="application/json,.json"
            class="visually-hidden-file-input"
            @change="importLocalSettingsBackup"
          />
        </div>

        <div class="backup-key-list">
          <span>包含：規則設定</span>
          <span>縣市 / 地區 / 機房</span>
          <span>拖拉排序</span>
          <span>刪除隱藏清單</span>
          <span>文件3 / 文件4</span>
        </div>
      </section>
    </section>



    <section class="work-grid">
      <article class="panel">
        <div class="panel-header">
          <h2>文件1：店家最新資訊</h2>
          <button class="ghost-btn" type="button" @click="sourceText = sampleText">放入測試資料</button>
        </div>

        <textarea
          v-model="sourceText"
          class="work-textarea"
          placeholder="請貼上店家最新資訊。系統會先清掉符號，再抓國籍+小姐名或小姐名+國籍。"
          @input="normalizeSourceSlashSpaces"
          @paste="handleSourceTextPaste"
        ></textarea>

        <div class="button-row">
          <button
            class="primary-btn"
            :class="{ 'scope-required-action': !isManagerScopeReadyForConvert }"
            type="button"
            :title="isManagerScopeReadyForConvert ? '套用目前機房範圍產生文件2' : '請先選完整縣市 / 地區 / 定點外送 / 機房'"
            @click="convertTextWithScopeGuard"
          >套用模式，產生文件2</button>
          <button class="ghost-btn" type="button" @click="clearSourceAndResult">清空文件1/2</button>
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <h2>文件2：本批固定格式結果</h2>
          <button class="ghost-btn" type="button" @click="copyText(resultText, '文件2')">複製文件2</button>
        </div>

        <textarea
          v-model="resultText"
          class="work-textarea"
          readonly
          placeholder="產生後會顯示在這裡，確認可以後按下方加入文件3..."
        ></textarea>

        <div class="button-row">
          <button
            class="primary-btn"
            type="button"
            :disabled="!canAppendResultToConfirmed"
            :title="resultHasIncompleteRecords ? '文件2仍有缺少欄位的資料，補齊後才能加入文件3' : '確認文件2內容並加入文件3'"
            @click="appendResultToConfirmed"
          >{{ resultHasIncompleteRecords ? '資料不完整，暫不能加入文件3' : '確認可以，加入文件3' }}</button>
          <button class="ghost-btn" type="button" @click="clearResultText">清空文件2</button>
        </div>

        <p class="hint">{{ statusMessage }}</p>
      </article>

      <article class="panel">
        <div class="panel-header">
          <h2>文件3：已確認累積結果</h2>
          <button class="ghost-btn" type="button" @click="copyText(confirmedText, '文件3')">複製文件3</button>
        </div>

        <textarea
          v-model="confirmedText"
          class="work-textarea"
          placeholder="文件2確認後加入這裡，可手動微調。"
          @blur="normalizeDocument3Text(); updateJsonPreview()"
        ></textarea>

        <div class="button-row">
          <button class="ghost-btn" type="button" @click="saveConfirmedText">儲存文件3</button>
          <button class="danger-btn" type="button" @click="clearConfirmedText">清空文件3</button>
        </div>

        <p class="hint">文件3會自動讀取上次儲存內容。</p>
      </article>

      <article class="panel json-panel">
        <div class="panel-header">
          <h2>文件4：資料庫 JSON 預覽</h2>
          <button class="ghost-btn" type="button" @click="copyText(jsonResultText, '文件4 JSON')">複製JSON</button>
        </div>

        <textarea
          v-model="jsonResultText"
          class="work-textarea json-textarea"
          readonly
          placeholder="文件3有已確認內容後，這裡會同步顯示未來可送 API / 資料庫的 JSON 格式。"
        ></textarea>

        <p class="hint">這裡由文件3已確認累積結果轉成 JSON；下一階段才會真正送到 API / 資料庫。</p>
      </article>

    </section>

<section class="frontend-preview-panel">
      <div class="preview-header preview-header-with-actions">
        <div class="preview-title-block">
          <h2>前台網站預覽</h2>
          <p>這裡只預覽目前文件3 / 文件4 的最新小姐；資料庫與網站後台仍然累加保存。</p>
        </div>

        <div class="preview-tools preview-top-right-tools">
          <span class="database-submit-feedback preview-sync-summary" :class="`is-${databaseSubmitStatusType}`">
            {{ databaseSubmitStatusText }}
          </span>
          <button
            type="button"
            class="primary-btn preview-consistency-open-btn"
            :disabled="!currentDocumentPreviewLadies.length"
            @click="openConsistencyCheckModal"
          >
            資料一致性檢查
          </button>

          <!-- 第 018-135 批：同步比對摘要移到前台預覽右上角；一致性檢查改成彈窗顯示。 -->
        </div>
      </div>


      <div class="frontend-media-preview-layout media-modal-card-only-layout">
        <div class="frontend-preview-side-panel is-full-width-preview">
          <div class="preview-side-topbar">
            <p class="hint frontend-inline-status">{{ previewStatusText }}</p>
          </div>

          <div v-if="filteredFrontendLadies.length" class="lady-card-grid compact-right-lady-grid">
            <article
              v-for="lady in filteredFrontendLadies"
              :key="lady.id"
              class="lady-card compact-right-lady-card"
              :class="{ 'is-selected-upload-lady': isSelectedUploadLady(lady) }"
              :data-preview-lady-id="String(lady.id || '')"
              role="button"
              tabindex="0"
              :aria-label="`開啟【${lady.country || ''} ${lady.name || ''}】媒體上傳視窗`"
              @click="openMediaUploadModalForLady(lady)"
              @keydown.enter.prevent="openMediaUploadModalForLady(lady)"
              @keydown.space.prevent="openMediaUploadModalForLady(lady)"
            >
              <span v-if="isSelectedUploadLady(lady)" class="selected-upload-lady-badge">目前選擇</span>
              <span class="lady-card-upload-hint-badge">點卡片上傳媒體</span>
              <div class="lady-cover-box">
                <template v-if="getLadyCoverMedia(lady)">
                  <button
                    type="button"
                    class="lady-media-open-btn lady-cover-trigger"
                    @click.stop="openMediaViewer(getLadyCoverMedia(lady), lady)"
                  >
                    <img
                      v-if="getLadyCoverMedia(lady).mediaType === 'image'"
                      :src="getLadyCoverMedia(lady).url"
                      :alt="getMediaDisplayName(getLadyCoverMedia(lady), lady)"
                      class="lady-cover-media"
                    />
                    <video
                      v-else
                      :src="getLadyCoverMedia(lady).url"
                      class="lady-cover-media"
                      muted
                      playsinline
                    ></video>
                  </button>

                  <button
                    type="button"
                    class="lady-media-delete-btn"
                    @click.stop="deleteLadyMedia(getLadyCoverMedia(lady), lady)"
                  >
                    刪除
                  </button>
                </template>
                <div v-else class="lady-cover-empty">
                  尚未上傳照片
                </div>

                <span v-if="getLadyMediaCount(lady)" class="media-count-badge">
                  {{ getLadyMediaCount(lady) }} 個媒體
                </span>
              </div>

              <div class="lady-card-title compact-right-title">
                <strong>【{{ lady.country }} {{ lady.name }}】</strong>
                <span v-if="lady.age">{{ lady.age }}y</span>
              </div>

              <div class="lady-sync-status-row" :title="lady.syncStateMessage">
                <span class="lady-sync-status-badge" :class="`is-${lady.syncState}`">
                  {{ lady.syncStateLabel }}
                </span>
              </div>

              <div class="lady-body-line compact-right-body-line">
                <span>{{ lady.height || '-' }}</span>
                <span>{{ lady.weight || '-' }}</span>
                <span>{{ lady.cup || '-' }}</span>
              </div>

              <div class="lady-media-thumbs-slot compact-right-thumbs-slot">
                <div v-if="lady.media && lady.media.length > 1" class="lady-media-thumbs compact-right-thumbs">
                  <div v-for="media in lady.media.slice(1)" :key="media.id || media.url" class="lady-media-thumb-wrap">
                    <button
                      type="button"
                      class="lady-media-open-btn"
                      @click.stop="openMediaViewer(media, lady)"
                    >
                      <img
                        v-if="media.mediaType === 'image'"
                        :src="media.url"
                        :alt="getMediaDisplayName(media, lady)"
                        class="lady-media-thumb"
                      />
                      <video
                        v-else-if="media.mediaType === 'video'"
                        :src="media.url"
                        class="lady-media-thumb"
                        muted
                        playsinline
                      ></video>
                    </button>
                    <button type="button" class="lady-media-delete-btn mini" @click.stop="deleteLadyMedia(media, lady)">×</button>
                  </div>
                </div>
              </div>

              <div class="card-section-title">方案價格</div>
              <div class="lady-price-list compact-right-price-list">
                <span v-for="plan in lady.pricePlans" :key="plan.id || plan.priceText" class="price-pill">
                  {{ plan.priceText }}
                </span>
              </div>

              <div class="card-section-title service-title">服務項目</div>
              <div class="lady-service-list compact-right-service-list">
                <span v-for="service in lady.services" :key="service.id || service.serviceName" class="service-pill">
                  {{ service.serviceName }}
                </span>
              </div>
            </article>
          </div>

          <div v-else class="empty-preview side-empty-preview">
            尚未讀取到資料。請先確認 Supabase 有資料，再按「讀取前台資料」。
          </div>
        </div>
      </div>

      <teleport to="body">
        <div v-if="isConsistencyCheckModalOpen" class="consistency-check-modal-mask" @click.self="closeConsistencyCheckModal">
          <section class="consistency-check-modal-dialog" role="dialog" aria-modal="true" aria-label="資料一致性檢查">
            <div class="consistency-check-modal-header">
              <div>
                <span class="consistency-check-modal-kicker">資料一致性檢查</span>
                <h3>本次小姐同步狀態</h3>
                <p>檢查本次文件小姐在 01 中央網站是否重複、是否缺圖，以及媒體數量是否一致；疑似重複時可手動指定正式主檔，其他筆只會標記待整理，不會刪除資料。</p>
              </div>
              <button type="button" class="consistency-check-modal-close" @click="closeConsistencyCheckModal">關閉</button>
            </div>

            <div class="consistency-check-modal-body">
              <div class="consistency-check-head">
                <div>
                  <h3>檢查結果</h3>
                  <p>需要時可重新檢查，目前只會讀取 01 中央網站狀態。</p>
                </div>
                <button
                  type="button"
                  class="primary-btn consistency-check-btn"
                  :disabled="isConsistencyChecking || !currentDocumentPreviewLadies.length"
                  @click="runConsistencyCheck"
                >
                  {{ isConsistencyChecking ? '檢查中...' : '重新檢查本次小姐' }}
                </button>
              </div>

              <div class="consistency-check-summary" :class="`is-${consistencyStatusType}`">
                <span>{{ consistencyStatusText }}</span>
                <small v-if="consistencyReport?.summary">
                  正常 {{ consistencyReport.summary.okCount || 0 }}｜缺媒體 {{ consistencyReport.summary.mediaMissingCount || 0 }}｜疑似重複 {{ consistencyReport.summary.duplicateCount || 0 }}｜未建立 {{ consistencyReport.summary.missingCount || 0 }}
                </small>
              </div>

              <div v-if="duplicateResolveStatusText" class="duplicate-resolve-status" :class="`is-${duplicateResolveStatusType}`">
                {{ duplicateResolveStatusText }}
              </div>

              <div v-if="consistencyReportRows.length" class="consistency-result-table-wrap">
                <table class="consistency-result-table">
                  <thead>
                    <tr>
                      <th>小姐</th>
                      <th>狀態</th>
                      <th>01 主檔</th>
                      <th>媒體</th>
                      <th>建議處理</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in consistencyReportRows" :key="duplicateRowKey(row)">
                      <td>【{{ row.nationality || row.country || '-' }} {{ row.name || '-' }}】</td>
                      <td><span class="consistency-status-pill" :class="`is-${row.status}`">{{ row.statusLabel || row.status }}</span></td>
                      <td>{{ row.centralListingId ? `已建立 ${shortId(row.centralListingId)}` : '尚未建立' }}</td>
                      <td>{{ row.mediaCount || 0 }} 張 / 段</td>
                      <td>
                        <p class="consistency-suggestion-text">{{ row.suggestion || row.message || '-' }}</p>

                        <div v-if="row.status === 'duplicate' && getDuplicateCandidates(row).length" class="duplicate-organize-box">
                          <div class="duplicate-organize-title">
                            <strong>選擇要保留的正式主檔</strong>
                            <span>其他重複筆會標記待整理並下架，不會刪除資料。</span>
                          </div>
                          <label
                            v-for="candidate in getDuplicateCandidates(row)"
                            :key="candidate.id"
                            class="duplicate-candidate-option"
                            :class="{ active: selectedDuplicateOfficialMap[duplicateRowKey(row)] === candidate.id }"
                          >
                            <input
                              v-model="selectedDuplicateOfficialMap[duplicateRowKey(row)]"
                              type="radio"
                              :name="`duplicate-official-${duplicateRowKey(row)}`"
                              :value="candidate.id"
                            />
                            <span>
                              <b>{{ candidate.name || row.name }}</b>
                              <small>ID {{ shortId(candidate.id) }}｜媒體 {{ candidate.mediaCount || 0 }}｜{{ candidate.city || '-' }} / {{ candidate.district || '-' }} / {{ candidate.room || '未設定機房' }}｜{{ candidate.statusLabel || candidate.status || '-' }}</small>
                            </span>
                          </label>

                          <label class="duplicate-merge-media-toggle">
                            <input v-model="duplicateResolveMergeMedia" type="checkbox" />
                            同時把其他重複筆的圖片 / 影片補到正式主檔（不刪原媒體）
                          </label>

                          <button
                            type="button"
                            class="primary-btn duplicate-resolve-btn"
                            :disabled="isDuplicateResolveBusy || getDuplicateCandidates(row).length < 2"
                            @click="resolveDuplicateRow(row)"
                          >
                            {{ isDuplicateResolveBusy ? '處理中...' : '保留選取主檔，其他標記待整理' }}
                          </button>
                        </div>

                        <div v-if="row.status === 'media-missing'" class="media-missing-action-box">
                          <button type="button" class="ghost-btn" @click="openMediaUploadModalFromConsistency(row)">開啟媒體上傳</button>
                          <span>重新上傳後再按「重新檢查本次小姐」。</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </teleport>

      <teleport to="body">
        <div v-if="isMediaUploadModalOpen" class="media-upload-modal-mask" @click.self="closeMediaUploadModal">
          <section class="media-upload-modal-dialog" role="dialog" aria-modal="true" aria-label="媒體上傳測試">
            <div class="media-upload-modal-header">
              <div>
                <span class="media-upload-modal-kicker">目前選擇</span>
                <h3>{{ mediaUploadSelectedLadyLabel }}</h3>
                <p>這裡就是原本左側「媒體上傳測試」區塊；點任一位小姐後會在正中央開啟。</p>
              </div>
              <button type="button" class="media-upload-modal-close" @click="closeMediaUploadModal">關閉</button>
            </div>

            <div class="media-upload-current-panel">
              <div class="current-media-panel-title">
                <div>
                  <strong>目前已上傳圖片 / 影片</strong>
                  <span>這裡會顯示這位小姐已經綁定到中央網站的媒體。</span>
                </div>
                <b>{{ selectedUploadLadyMedia.length }} 個媒體</b>
              </div>

              <div v-if="selectedUploadLadyMedia.length" class="current-media-thumb-grid">
                <div
                  v-for="media in selectedUploadLadyMedia"
                  :key="media.id || media.url"
                  class="current-media-thumb-card"
                >
                  <button
                    type="button"
                    class="current-media-open-btn"
                    @click="openMediaViewer(media, mediaUploadSelectedLady)"
                  >
                    <img
                      v-if="media.mediaType === 'image'"
                      :src="media.url"
                      :alt="mediaUploadSelectedLadyLabel"
                    />
                    <video
                      v-else-if="media.mediaType === 'video'"
                      :src="media.url"
                      muted
                      playsinline
                    ></video>
                    <div v-else class="selected-file-fallback">FILE</div>
                  </button>

                  <button
                    type="button"
                    class="current-media-delete-btn"
                    @click="deleteLadyMedia(media, mediaUploadSelectedLady)"
                    title="刪除這張 / 這段媒體"
                  >×</button>

                  <span class="current-media-type-badge">{{ media.mediaType === 'video' ? '影片' : '圖片' }}</span>
                </div>
              </div>

              <div v-else class="current-media-empty">
                這位小姐目前尚未上傳圖片 / 影片；可直接在下方新增。
              </div>
            </div>

          <div class="media-upload-box compact-media-upload-box modal-media-upload-box">
          <div class="media-upload-title-row">
            <h3>媒體上傳測試</h3>
            <p>先把圖片 / 影片上傳到 R2，並綁定到 Supabase 的小姐資料。</p>
          </div>

          <div class="media-upload-main-stack">
            <label class="media-lady-select">
              選擇小姐
              <select v-model="mediaUploadLadyId">
                <option value="">請選擇小姐</option>
                <option
                  v-for="lady in mediaUploadLadyOptions"
                  :key="lady.id"
                  :value="lady.id"
                >
                  {{ formatMediaUploadLadyOptionLabel(lady) }}
                </option>
              </select>
              <div class="media-lady-select-legend">
                <span class="is-current">● 本次已上傳</span>
                <span class="is-existing">● 已有媒體</span>
                <span class="is-empty">● 未上傳</span>
              </div>
            </label>

            <div
              class="media-drop-zone"
              :class="{ 'is-dragging': isMediaDragging }"
              @dragover.prevent="isMediaDragging = true"
              @dragleave.prevent="isMediaDragging = false"
              @drop.prevent="handleMediaDrop"
            >
              <strong>拖拉圖片 / 影片到這裡</strong>
              <span>也可以點下面按鈕一次選多個檔案，會疊加到同一位小姐。</span>
              <input
                id="lady-media-file-input"
                type="file"
                accept="image/*,video/*"
                multiple
                @change="handleMediaFileChange"
              />
            </div>

            <div class="media-upload-actions">
              <button class="ghost-btn" type="button" :disabled="isMediaUploading" @click="clearMediaUploadFiles">清空待上傳</button>
              <button class="primary-btn media-upload-btn" type="button" :disabled="isMediaUploading" @click="uploadLadyMedia">
                {{ isMediaUploading ? '上傳中...' : `上傳 ${mediaUploadFiles.length || ''} 個圖片/影片` }}
              </button>
            </div>

            <button
              class="ghost-btn central-lady-sync-btn"
              type="button"
              :disabled="isSingleLadyCentralSyncing || !mediaUploadLadyId || isCurrentDocumentPreviewLadyId(mediaUploadLadyId)"
              @click="syncSelectedLadyToCentralWebsite"
            >
              {{ isSingleLadyCentralSyncing ? '同步中央網站中...' : '重新同步目前小姐到中央網站' }}
            </button>

            <div
              class="media-upload-selected-panel"
              :class="{ 'is-drop-blocked': isPendingMediaDropBlocked }"
              @dragenter.stop.prevent="handlePendingMediaDropBlock"
              @dragover.stop.prevent="handlePendingMediaDropBlock"
              @dragleave.stop.prevent="clearPendingMediaDropBlock"
              @drop.stop.prevent="handlePendingMediaDropBlockedDrop"
            >
              <div class="selected-panel-title">
                <strong>待上傳縮圖</strong>
                <span>{{ mediaUploadFiles.length }} 個檔案</span>
              </div>

              <div v-if="mediaUploadProgressVisible" class="media-upload-progress-box" :class="{ 'is-uploading': isMediaUploading }">
                <div class="media-upload-progress-head">
                  <span>總上傳進度</span>
                  <strong>{{ mediaUploadOverallPercent }}%</strong>
                </div>
                <div class="media-upload-progress-track">
                  <i :style="{ width: `${mediaUploadOverallPercent}%` }"></i>
                </div>
                <p>{{ mediaUploadProgressSummary }}</p>
              </div>

              <div v-if="mediaUploadFiles.length" class="selected-media-thumb-grid">
                <div
                  v-for="(file, index) in mediaUploadFiles"
                  :key="`${file.name}-${file.size}-${file.lastModified}`"
                  class="selected-media-thumb-card"
                >
                  <button type="button" class="selected-media-open-btn" @click="openUploadFileViewer(file)">
                    <img
                      v-if="isUploadFileImage(file)"
                      :src="getUploadFilePreviewUrl(file)"
                      :alt="file.name"
                    />
                    <video
                      v-else-if="isUploadFileVideo(file)"
                      :src="getUploadFilePreviewUrl(file)"
                      muted
                      playsinline
                    ></video>
                    <div v-else class="selected-file-fallback">FILE</div>
                  </button>

                  <button type="button" class="thumb-remove-btn" @click="removeMediaUploadFile(index)">×</button>

                  <div class="thumb-file-info">
                    <strong>{{ file.name }}</strong>
                    <span>{{ formatUploadFileSize(file) }}</span>
                  </div>

                  <div
                    v-if="isMediaUploading || getMediaUploadFileState(file).status !== 'waiting'"
                    class="thumb-upload-state"
                    :class="`is-${getMediaUploadFileState(file).status}`"
                  >
                    <span>{{ getMediaUploadFileState(file).label }}</span>
                    <div class="thumb-upload-bar">
                      <i :style="{ width: `${getMediaUploadFileState(file).percent}%` }"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="selected-media-empty">
                此區僅顯示待上傳縮圖，不能拖放檔案；請拖到上方「拖拉圖片 / 影片到這裡」。
              </div>
            </div>
          </div>

          <p class="hint media-upload-status">{{ mediaUploadStatusText }}</p>
        </div>
          </section>
        </div>
      </teleport>

      <teleport to="body">
        <div v-if="mediaViewerItem" class="media-viewer-mask" @click.self="closeMediaViewer">
          <div class="media-viewer-dialog">
          <div
            class="media-viewer-body"
            @touchstart.passive="handleMediaViewerTouchStart"
            @touchend.passive="handleMediaViewerTouchEnd"
          >
            <span v-if="mediaViewerTotal > 1" class="media-viewer-counter">
              {{ mediaViewerPositionText }}
            </span>

            <button
              v-if="mediaViewerTotal > 1"
              type="button"
              class="media-viewer-nav media-viewer-prev"
              aria-label="上一個媒體"
              title="上一個（鍵盤 ←）"
              @click.stop="showPreviousMedia"
            >‹</button>

            <img
              v-if="mediaViewerItem.mediaType === 'image'"
              :key="mediaViewerItem.id || mediaViewerItem.url"
              :src="mediaViewerItem.url"
              :alt="getMediaDisplayName(mediaViewerItem, { name: mediaViewerLadyName, country: mediaViewerLadyCountry })"
              class="media-viewer-content"
            />
            <video
              v-else
              :key="mediaViewerItem.id || mediaViewerItem.url"
              :src="mediaViewerItem.url"
              class="media-viewer-content"
              controls
              autoplay
              playsinline
            ></video>

            <button
              v-if="mediaViewerTotal > 1"
              type="button"
              class="media-viewer-nav media-viewer-next"
              aria-label="下一個媒體"
              title="下一個（鍵盤 →）"
              @click.stop="showNextMedia"
            >›</button>
          </div>
          <div class="media-viewer-footer">
            <div>
              <span v-if="mediaViewerLadyName || mediaViewerLadyCountry" class="media-viewer-lady-label">【{{ mediaViewerLadyCountry }} {{ mediaViewerLadyName }}】</span>
              <small v-if="mediaViewerTotal > 1" class="media-viewer-hint">可按左右箭頭、鍵盤 ← →，手機可左右滑動</small>
            </div>
            <div class="media-viewer-actions">
              <button
                v-if="!mediaViewerItem.isLocalUpload"
                type="button"
                class="danger-btn"
                @click="deleteLadyMedia(mediaViewerItem, { name: mediaViewerLadyName, country: mediaViewerLadyCountry })"
              >刪除這張/這段媒體</button>
              <button type="button" class="ghost-btn" @click="closeMediaViewer">關閉</button>
            </div>
          </div>
          </div>
        </div>
      </teleport>
    </section>


    
    </section>
  </main>
</template>

<!-- 第 018-131 批：媒體上傳彈窗內縮圖放大層級修正 -->
<!-- batch018-137-duplicate-organize-tool -->
<!-- batch018-136-sync-result-classification-fix -->
<!-- batch018-135-consistency-check-modal-preview-header -->
<!-- batch018-133-media-duplicate-false-skip-fix -->
<!-- batch018-132-duplicate-upsert-guard -->
<!-- batch018-120-sync-id-backfill-media-upload-fix -->
<!-- batch018-138-central-direct-media-upload-bind-fix -->
<script setup>
// batch018-175-age-before-cup-body-and-cup-whitelist-fix
// batch018-176-structured-source-recognition-owner-regex-output-unification
// batch018-177-wide-recognition-modal-owner-chinese-special-format
// batch018-178-separated-digit-body-name-only-boundary-fix
// batch018-174-dot-delimited-bra-size-body-age-fix
// batch018-173-full-half-width-spaced-amount-bra-size-body-fix
// batch018-171-room-daily-document-media-status
// batch018-148-explicit-addon-amount-cleanup-alias-fix
// batch018-140-individual-setting-save-buttons
// 第 018-107 批：登入後預設展開地區機房管理，並記住最後使用的縣市 / 地區 / 定點外送 / 機房。
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { isSupabaseConfigured, supabase } from './supabaseClient'

// 第 009-7 批開始固定使用這兩個正式儲存位置。
// 之後新版不要再改這兩個 Key，避免每次更新檔案後規則消失。
// 第 018-120 批：同步後回傳資料庫 ID，並在媒體上傳前自動補抓真實 ID。
const RULE_STORAGE_KEY = 'auto-document-converter-rules-current'
const CONFIRMED_STORAGE_KEY = 'auto-document-converter-confirmed-current'
const SOURCE_STORAGE_KEY = 'auto-document-converter-source-current'
const RESULT_STORAGE_KEY = 'auto-document-converter-result-current'
const RULE_SCOPE_STORAGE_KEY = 'auto-document-converter-scope-rules-current'
const LOCATION_SCOPE_STORAGE_KEY = 'auto-document-converter-location-room-options-current'
const LAST_SCOPE_SELECTION_STORAGE_KEY = 'auto-document-converter-last-scope-selection-current'
const ROOM_DAILY_STATUS_STORAGE_KEY = 'auto-document-converter-room-daily-status-current'
const ROOM_DAILY_BUSINESS_DAY_START_HOUR = 6
const DEFAULT_MANAGER_SCOPE_TYPE = '定點'
const CLEAN_START_PANEL_STORAGE_KEY = 'auto-document-converter-clean-start-panel-always-clean-home'
const ONLINE_READY_VERSION_LABEL = '第 018-126 批：中央媒體來源統一與前後台數量同步修正版'
const PROTECTED_GLOBAL_RULE_NOTICE = '公版規則已固定保護，不會被清除；若遺失會自動補回預設公版。'
const SOURCE_SLASH_SPACE_NOTICE = '文件1已啟用斜線自動轉空格，貼上後 / 與 ／ 會自動變成空格。'
const SOURCE_PASTE_TWO_BLANK_LINES_NOTICE = '文件1貼上後已自動在底部保留兩行空白，方便直接接著貼下一筆資料。'
const STAFF_PROFILE_STORAGE_KEY = 'auto-document-converter-current-staff-profile'
const STAFF_DEFAULT_NAME = '未登入使用者'
const ONLINE_OPTIONS_SCOPE = { city: '__OPTIONS__', district: '__OPTIONS__', mode: '定點', room: '__OPTIONS__' }
const ONLINE_OPTIONS_KIND = 'employee_location_options_v1'


function normalizeSourceTextSlashes(text = '') {
  return String(text || '').replace(/[\/／]+/g, ' ')
}

function normalizeSourceSlashSpaces() {
  const normalized = normalizeSourceTextSlashes(sourceText.value)
  if (normalized !== sourceText.value) {
    sourceText.value = normalized
    statusMessage.value = SOURCE_SLASH_SPACE_NOTICE
  }
}

function normalizeSourceTextAfterPaste(text = '') {
  const normalized = normalizeSourceTextSlashes(text)
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+$/gm, '')
  return ensureSourceTextBottomBlankLines(normalized)
}

function handleSourceTextPaste() {
  window.setTimeout(() => {
    const normalized = normalizeSourceTextAfterPaste(sourceText.value)
    if (normalized !== sourceText.value) {
      sourceText.value = normalized
      statusMessage.value = SOURCE_PASTE_TWO_BLANK_LINES_NOTICE
    }
  }, 0)
}

const LEGACY_RULE_STORAGE_KEYS = [
  'auto-document-converter-rules-batch009-6',
  'auto-document-converter-rules-batch009-5',
  'auto-document-converter-rules-batch009-4',
  'auto-document-converter-rules-batch009-3',
  'auto-document-converter-rules-batch009-2',
  'auto-document-converter-rules-batch009-1',
  'auto-document-converter-rules-v15',
  'auto-document-converter-rules-current'
]

const LEGACY_CONFIRMED_STORAGE_KEYS = [
  'auto-document-converter-confirmed-batch009-6',
  'auto-document-converter-confirmed-batch009-5',
  'auto-document-converter-confirmed-batch009-4',
  'auto-document-converter-confirmed-batch009-3',
  'auto-document-converter-confirmed-batch009-2',
  'auto-document-converter-confirmed-batch009-1',
  'auto-document-converter-confirmed-v15',
  'auto-document-converter-confirmed-current'
]

const sourceText = ref('')
const resultText = ref('')
const resultCompleteCount = ref(0)
const resultIncompleteCount = ref(0)
const resultHasIncompleteRecords = computed(() => resultIncompleteCount.value > 0)
const canAppendResultToConfirmed = computed(() => Boolean(String(resultText.value || '').trim()) && !resultHasIncompleteRecords.value)
const jsonResultText = ref('')
const REQUIRED_BACKEND_IMPORT_MODE = 'db_append_upsert_keep_existing_safety_checked'
const REQUIRED_BACKEND_VERSION = '0.0.18-14-backend-version-guard'
const DEFAULT_ONLINE_API_BASE_URL = 'https://auto-document-converter-api.qq05qqww-5c5.workers.dev'
const CENTRAL_WEBSITE_API_BASE_URL = (
  import.meta.env.VITE_CENTRAL_WEBSITE_API_BASE_URL ||
  'https://auto-api-website-api.qq05qqww-5c5.workers.dev'
).replace(/\/+$/, '')
const apiBaseUrl = ref(DEFAULT_ONLINE_API_BASE_URL)
const apiStatusText = ref('尚未測試 API。')
const frontendLadies = ref([])
const frontendStatusText = ref('尚未讀取前台資料。')
const frontendLadiesLoaded = ref(false)
const databaseIdHintByLadyKey = ref({})
const localUploadedMediaByLadyId = ref({})
const centralWebsiteMediaByLadyKey = ref({})
// 第 018-126 批：媒體顯示以 01 中央網站 listing_media 為權威來源；converter 本機來源只當未查到中央媒體前的 fallback。
// 第 018-125 批：媒體刪除來源統一。中央網站刪除後，不再呼叫不存在的 02 converter 刪除端點，改用本機抑制避免 404 與回彈。
const DELETED_MEDIA_SUPPRESSION_STORAGE_KEY = 'auto-document-converter-deleted-media-suppression-batch018-124'
const deletedMediaSuppressionByLadyKey = ref(loadDeletedMediaSuppressionMap())
const countryFilter = ref('全部')
const mediaUploadLadyId = ref('')
const mediaUploadType = ref('image')
const mediaUploadNote = ref('')
const mediaUploadFiles = ref([])
const isMediaUploadModalOpen = ref(false)
const isMediaDragging = ref(false)
const isPendingMediaDropBlocked = ref(false)
const mediaUploadStatusText = ref('尚未上傳媒體。')
const isMediaUploading = ref(false)
const mediaUploadProgressMap = ref({})
const mediaUploadCurrentFileName = ref('')
const mediaUploadCompletedCount = ref(0)
const mediaUploadFailedCount = ref(0)
const isSingleLadyCentralSyncing = ref(false)
const mediaViewerItem = ref(null)
const mediaViewerItems = ref([])
const mediaViewerIndex = ref(0)
const mediaViewerTouchStartX = ref(null)
const mediaViewerLadyName = ref('')
const mediaViewerLadyCountry = ref('')

const mediaViewerTotal = computed(() => mediaViewerItems.value.length)
const mediaViewerPositionText = computed(() => {
  if (!mediaViewerItem.value || !mediaViewerTotal.value) return ''
  return `${mediaViewerIndex.value + 1} / ${mediaViewerTotal.value}`
})

const mediaUploadTotalCount = computed(() => mediaUploadFiles.value.length)
const mediaUploadOverallPercent = computed(() => {
  const total = mediaUploadTotalCount.value
  if (!total) return 0

  const sum = mediaUploadFiles.value.reduce((acc, file) => {
    const state = getMediaUploadFileState(file)
    return acc + Number(state.percent || 0)
  }, 0)

  return Math.max(0, Math.min(100, Math.round(sum / total)))
})
const mediaUploadProgressVisible = computed(() => isMediaUploading.value || mediaUploadFiles.value.some(file => {
  const state = getMediaUploadFileState(file)
  return state.status !== 'waiting'
}))
const mediaUploadProgressSummary = computed(() => {
  if (!mediaUploadTotalCount.value) return '尚未選擇檔案'
  if (isMediaUploading.value) {
    const fileName = mediaUploadCurrentFileName.value || '準備中'
    return `目前上傳：${fileName}｜已完成 ${mediaUploadCompletedCount.value} / ${mediaUploadTotalCount.value}｜失敗 ${mediaUploadFailedCount.value}`
  }
  return `已完成 ${mediaUploadCompletedCount.value} / ${mediaUploadTotalCount.value}｜失敗 ${mediaUploadFailedCount.value}`
})
const mediaUploadSelectedLady = computed(() => {
  const targetId = String(mediaUploadLadyId.value || '')
  if (!targetId) return null
  return mediaUploadLadyOptions.value.find(lady => String(lady?.id || '') === targetId) || null
})
const mediaUploadSelectedLadyLabel = computed(() => {
  const lady = mediaUploadSelectedLady.value
  if (!lady) return '請先選擇小姐'
  const country = String(lady.country || '').trim()
  const name = String(lady.name || '').trim()
  return `【${[country, name].filter(Boolean).join(' ')}】`
})

const selectedUploadLadyMedia = computed(() => {
  const lady = mediaUploadSelectedLady.value
  return Array.isArray(lady?.media)
    ? lady.media.filter(media => media?.url)
    : []
})
const confirmedText = ref('')
const statusMessage = ref('等待貼上資料。')
const isSavingScopeRules = ref(false)
const isLoadingScopeRules = ref(false)
const roomRuleStatusText = ref('選到完整機房後會自動讀取既有規則；修改後請按「儲存目前機房規則」。')
const roomRuleStatusType = ref('info')
const isDatabaseSubmitting = ref(false)
const centralWebsiteSyncNeedsRetry = ref(false)
const centralWebsiteSyncRetryText = ref('')
const databaseSubmitStatusText = ref('尚未送出本次文件3。')
const databaseSubmitStatusType = ref('info')
const isConsistencyChecking = ref(false)
const isConsistencyCheckModalOpen = ref(false)
const consistencyStatusText = ref('尚未檢查資料一致性。')
const consistencyStatusType = ref('info')
const consistencyReport = ref(null)
const selectedDuplicateOfficialMap = ref({})
const duplicateResolveMergeMedia = ref(true)
const isDuplicateResolveBusy = ref(false)
const duplicateResolveStatusText = ref('')
const duplicateResolveStatusType = ref('info')
const actionToastVisible = ref(false)
const actionToastText = ref('')
const actionToastType = ref('success')
let actionToastTimer = 0

function showActionToast(message, type = 'success') {
  actionToastText.value = String(message || '')
  actionToastType.value = type
  actionToastVisible.value = true
  window.clearTimeout(actionToastTimer)
  actionToastTimer = window.setTimeout(() => {
    actionToastVisible.value = false
  }, 4200)
}

function setRoomRuleFeedback(message, type = 'info', options = {}) {
  roomRuleStatusText.value = String(message || '')
  roomRuleStatusType.value = type
  if (!options.silent) statusMessage.value = roomRuleStatusText.value
  if (options.toast) showActionToast(roomRuleStatusText.value, type)
}

function setDatabaseSubmitFeedback(message, type = 'info', options = {}) {
  databaseSubmitStatusText.value = String(message || '')
  databaseSubmitStatusType.value = type
  if (options.toast) showActionToast(databaseSubmitStatusText.value, type)
}
const supabaseConfigured = isSupabaseConfigured
const SUPABASE_FUNCTIONS_BASE_URL = 'https://cdyuweikhbfgkfrezhxd.supabase.co/functions/v1'
const SUPABASE_PUBLIC_API_KEY = 'sb_publishable_nc-vY2-GIr_jkEvS3YIUEQ_vw8bImsk'
const authReady = ref(false)
const authUser = ref(null)
const authProfile = ref(null)
const loginEmail = ref('')
const loginPassword = ref('')
const loginStatus = ref('請輸入員工 Email 與密碼。')
const loginStatusType = ref('')
const isAuthBusy = ref(false)
const employeeDisplayName = ref('')
const employeeEmail = ref('')
const employeePassword = ref('')
const editingEmployeeId = ref('')
const editingEmployeeDisplayName = ref('')
const editingEmployeeEmail = ref('')
const editingEmployeePassword = ref('')
const employeeProfiles = ref([])
const employeeManageStatus = ref('老闆可在此建立員工帳號。')
const employeeManageStatusType = ref('')
const isEmployeeBusy = ref(false)
const currentStaffName = ref(cleanStaffName(localStorage.getItem(STAFF_PROFILE_STORAGE_KEY) || STAFF_DEFAULT_NAME))
const roomDailyStatusByScope = ref(readRoomDailyStatusStore())
const staffLoginInput = ref(currentStaffName.value)
const authUserEmail = computed(() => authUser.value?.email || '尚未登入')
const isOwner = computed(() => authProfile.value?.role === 'owner')
const currentRoleLabel = computed(() => isOwner.value ? '老闆' : '員工')
const ruleLayerHelpText = computed(() => isOwner.value
  ? '第一層公司全站公版：不分縣市、地區、定點或機房，所有員工轉換時都會先套用。'
  : '第二層個人地區補充：欄位預設空白，只新增目前地區需要的內容；實際轉換固定先套老闆全站公版，再套目前員工補充。')
const ownerBaseRuleData = ref(null)
const employeeSupplementLoaded = ref(false)
const OWNER_BASE_RULE_KIND = 'owner_base_rules_v1'
const EMPLOYEE_SUPPLEMENT_RULE_KIND = 'employee_supplement_rules_v1'
// 第 018-147 批起：老闆全站公版改存 converter_global_rules，不再塞進 employee_rules。
// employee_rules 僅保留員工縣市／地區／定點外送／機房補充規則。

function cleanStaffName(value) {
  const name = String(value || '').trim().replace(/\s+/g, ' ')
  return name || STAFF_DEFAULT_NAME
}

function applyAuthenticatedProfile(user, profile = null) {
  authUser.value = user || null
  authProfile.value = profile || null

  const nextName = cleanStaffName(profile?.display_name || user?.email || STAFF_DEFAULT_NAME)
  currentStaffName.value = nextName
  staffLoginInput.value = nextName
  localStorage.setItem(STAFF_PROFILE_STORAGE_KEY, nextName)
  roomDailyStatusByScope.value = readRoomDailyStatusStore()

  if (profile?.role === 'owner') {
    ruleScopeLevel.value = 'global'
    void loadEmployeeProfiles({ silent: true })
  } else {
    if (formatSettingsTab.value === 'regex') formatSettingsTab.value = 'header'
    employeeProfiles.value = []
  }
}

async function loadAuthProfile(user = authUser.value) {
  if (!supabaseConfigured || !user?.id) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('id,email,display_name,role')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    loginStatus.value = `讀取身份失敗：${error.message}`
    loginStatusType.value = 'error'
    return null
  }

  if (data) return data

  const fallbackProfile = {
    id: user.id,
    email: user.email,
    display_name: user.email?.split('@')?.[0] || '員工',
    role: 'employee'
  }

  const { data: inserted, error: insertError } = await supabase
    .from('profiles')
    .insert(fallbackProfile)
    .select('id,email,display_name,role')
    .single()

  if (insertError) {
    loginStatus.value = `建立身份失敗：${insertError.message}`
    loginStatusType.value = 'error'
    return fallbackProfile
  }

  return inserted
}

async function refreshAuthState() {
  if (!supabaseConfigured) {
    authReady.value = true
    loginStatus.value = '尚未設定 Supabase 連線資料。'
    loginStatusType.value = 'error'
    return
  }

  const { data, error } = await supabase.auth.getSession()
  if (error) {
    loginStatus.value = `登入狀態讀取失敗：${error.message}`
    loginStatusType.value = 'error'
    authReady.value = true
    return
  }

  const user = data?.session?.user || null
  if (!user) {
    applyAuthenticatedProfile(null, null)
    authReady.value = true
    return
  }

  const profile = await loadAuthProfile(user)
  applyAuthenticatedProfile(user, profile)
  await loadOnlineWorkspace({ silent: true })
  authReady.value = true
}

async function loginWithSupabase() {
  if (!supabaseConfigured) {
    loginStatus.value = '尚未設定 Supabase 連線資料。'
    loginStatusType.value = 'error'
    return
  }

  const email = String(loginEmail.value || '').trim()
  const password = String(loginPassword.value || '')

  if (!email || !password) {
    loginStatus.value = '請輸入 Email 與密碼。'
    loginStatusType.value = 'error'
    return
  }

  isAuthBusy.value = true
  loginStatus.value = '登入中，請稍候...'
  loginStatusType.value = ''

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    isAuthBusy.value = false
    loginStatus.value = `登入失敗：${error.message}`
    loginStatusType.value = 'error'
    return
  }

  const user = data?.user || data?.session?.user || null
  const profile = await loadAuthProfile(user)
  applyAuthenticatedProfile(user, profile)

  loginPassword.value = ''
  loginStatus.value = '登入成功。'
  loginStatusType.value = 'ok'
  isAuthBusy.value = false

  await loadOnlineWorkspace({ silent: true })
  closeAllTopPanelsForCleanStart()
}

async function loadEmployeeProfiles(options = {}) {
  if (!supabaseConfigured || !isOwner.value) {
    employeeProfiles.value = []
    return
  }

  const silent = Boolean(options?.silent)
  if (!silent) {
    employeeManageStatus.value = '正在讀取員工清單...'
    employeeManageStatusType.value = ''
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id,email,display_name,role,created_at')
    .order('created_at', { ascending: false })

  if (error) {
    employeeManageStatus.value = `讀取員工清單失敗：${error.message}`
    employeeManageStatusType.value = 'error'
    return
  }

  employeeProfiles.value = Array.isArray(data) ? data : []
  if (!silent) {
    employeeManageStatus.value = `已讀取 ${employeeProfiles.value.length} 個帳號。`
    employeeManageStatusType.value = 'ok'
  }
}

function resetEmployeeEditForm() {
  editingEmployeeId.value = ''
  editingEmployeeDisplayName.value = ''
  editingEmployeeEmail.value = ''
  editingEmployeePassword.value = ''
}

function startEditEmployee(profile) {
  if (!profile?.id || profile.role === 'owner') return
  editingEmployeeId.value = profile.id
  editingEmployeeDisplayName.value = profile.display_name || ''
  editingEmployeeEmail.value = profile.email || ''
  editingEmployeePassword.value = ''
  employeeManageStatus.value = `正在編輯：${profile.display_name || profile.email}`
  employeeManageStatusType.value = ''
}

function cancelEditEmployee() {
  resetEmployeeEditForm()
  employeeManageStatus.value = '已取消編輯。'
  employeeManageStatusType.value = ''
}

async function callCreateEmployeeFunction(payload) {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  const accessToken = sessionData?.session?.access_token || ''

  if (sessionError || !accessToken) {
    throw new Error(`無法取得老闆登入憑證：${sessionError?.message || '請重新登入'}`)
  }

  const response = await fetch(`${SUPABASE_FUNCTIONS_BASE_URL}/create-employee`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLIC_API_KEY,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const rawText = await response.text()
  let data = null
  try {
    data = rawText ? JSON.parse(rawText) : null
  } catch {
    data = { error: rawText || `HTTP ${response.status}` }
  }

  if (!response.ok || data?.error) {
    const detail = data?.error || data?.message || `HTTP ${response.status}`
    const detailMessage = data?.detail?.message || data?.detail?.error_description || data?.profileSaveDetail?.message || ''
    throw new Error(`${detail}${detailMessage ? `：${detailMessage}` : ''}（HTTP ${response.status}）`)
  }

  return data
}

async function createEmployeeAccount() {
  if (!supabaseConfigured || !isOwner.value) {
    employeeManageStatus.value = '只有老闆帳號可以建立員工。'
    employeeManageStatusType.value = 'error'
    return
  }

  const displayName = cleanStaffName(employeeDisplayName.value)
  const email = String(employeeEmail.value || '').trim().toLowerCase()
  const password = String(employeePassword.value || '').trim()

  if (!email || !password) {
    employeeManageStatus.value = '請輸入員工 Email 與登入密碼。'
    employeeManageStatusType.value = 'error'
    return
  }

  if (password.length < 6) {
    employeeManageStatus.value = '員工密碼至少需要 6 碼。'
    employeeManageStatusType.value = 'error'
    return
  }

  isEmployeeBusy.value = true
  employeeManageStatus.value = '正在建立員工帳號...'
  employeeManageStatusType.value = ''

  let data = null
  try {
    data = await callCreateEmployeeFunction({ action: 'create', email, password, displayName })
  } catch (error) {
    isEmployeeBusy.value = false
    employeeManageStatus.value = `建立員工失敗：${error.message || error}`
    employeeManageStatusType.value = 'error'
    return
  }

  isEmployeeBusy.value = false

  employeeManageStatus.value = `已建立員工：${data?.profile?.display_name || displayName || email}`
  employeeManageStatusType.value = 'ok'
  employeeDisplayName.value = ''
  employeeEmail.value = ''
  employeePassword.value = ''
  await loadEmployeeProfiles({ silent: true })
}

async function syncEmployeeProfileForOwner({ userId, email, displayName }) {
  if (!supabaseConfigured || !isOwner.value || !userId) return { ok: false, skipped: true }

  const cleanEmail = String(email || '').trim().toLowerCase()
  const cleanDisplayName = cleanStaffName(displayName) || cleanEmail.split('@')[0] || 'employee'

  if (!cleanEmail) return { ok: false, skipped: true }

  const { data, error } = await supabase
    .from('profiles')
    .update({
      email: cleanEmail,
      display_name: cleanDisplayName,
      role: 'employee'
    })
    .eq('id', userId)
    .select('id,email,display_name,role,created_at')
    .maybeSingle()

  if (error) {
    throw new Error(`員工登入帳號已修改，但列表資料同步失敗：${error.message}`)
  }

  if (!data) {
    return { ok: false, skipped: false, reason: 'profile_not_found' }
  }

  return { ok: true, profile: data }
}

async function updateEmployeeAccount(profile) {
  if (!supabaseConfigured || !isOwner.value) {
    employeeManageStatus.value = '只有老闆帳號可以修改員工。'
    employeeManageStatusType.value = 'error'
    return
  }

  if (!profile?.id || profile.role === 'owner') {
    employeeManageStatus.value = '老闆帳號不在這裡修改，避免誤改登入權限。'
    employeeManageStatusType.value = 'error'
    return
  }

  const displayName = cleanStaffName(editingEmployeeDisplayName.value)
  const email = String(editingEmployeeEmail.value || '').trim().toLowerCase()
  const password = String(editingEmployeePassword.value || '').trim()

  if (!email) {
    employeeManageStatus.value = '請輸入員工 Email。'
    employeeManageStatusType.value = 'error'
    return
  }

  if (password && password.length < 6) {
    employeeManageStatus.value = '新密碼至少需要 6 碼；不改密碼請留空。'
    employeeManageStatusType.value = 'error'
    return
  }

  isEmployeeBusy.value = true
  employeeManageStatus.value = '正在儲存員工修改...'
  employeeManageStatusType.value = ''

  try {
    const normalizedDisplayName = displayName || email.split('@')[0] || 'employee'
    const data = await callCreateEmployeeFunction({
      action: 'update',
      userId: profile.id,
      email,
      displayName: normalizedDisplayName,
      password: password || undefined
    })

    const syncResult = await syncEmployeeProfileForOwner({
      userId: data?.employee?.id || data?.profile?.id || profile.id,
      email,
      displayName: normalizedDisplayName
    })

    employeeManageStatus.value = password
      ? `已修改員工資料與密碼：${syncResult?.profile?.display_name || data?.profile?.display_name || normalizedDisplayName || email}`
      : `已修改員工資料：${syncResult?.profile?.display_name || data?.profile?.display_name || normalizedDisplayName || email}`
    if (syncResult?.reason === 'profile_not_found') {
      employeeManageStatus.value += '；提醒：profiles 尚未找到此員工資料，請先按重新整理員工或確認 Supabase profiles 已補齊。'
    }
    employeeManageStatusType.value = 'ok'
    resetEmployeeEditForm()
    await loadEmployeeProfiles({ silent: true })
  } catch (error) {
    employeeManageStatus.value = `修改員工失敗：${error.message || error}`
    employeeManageStatusType.value = 'error'
  } finally {
    isEmployeeBusy.value = false
  }
}

async function deleteEmployeeAccount(profile) {
  if (!supabaseConfigured || !isOwner.value) {
    employeeManageStatus.value = '只有老闆帳號可以刪除員工。'
    employeeManageStatusType.value = 'error'
    return
  }

  if (!profile?.id || profile.role === 'owner') {
    employeeManageStatus.value = '老闆帳號不允許在這裡刪除，避免誤刪最高權限。'
    employeeManageStatusType.value = 'error'
    return
  }

  const label = profile.display_name || profile.email || '此員工'
  const confirmed = window.confirm(`確定要刪除員工「${label}」嗎？\n\n刪除後此 Email 將無法登入，該員工的 profiles 資料也會一併清除。`)
  if (!confirmed) return

  isEmployeeBusy.value = true
  employeeManageStatus.value = `正在刪除員工：${label}...`
  employeeManageStatusType.value = ''

  try {
    await callCreateEmployeeFunction({
      action: 'delete',
      userId: profile.id,
      email: profile.email
    })

    if (editingEmployeeId.value === profile.id) {
      resetEmployeeEditForm()
    }

    employeeManageStatus.value = `已刪除員工：${label}`
    employeeManageStatusType.value = 'ok'
    await loadEmployeeProfiles({ silent: true })
  } catch (error) {
    employeeManageStatus.value = `刪除員工失敗：${error.message || error}`
    employeeManageStatusType.value = 'error'
  } finally {
    isEmployeeBusy.value = false
  }
}

async function logoutFromSupabase() {
  if (!supabaseConfigured) return
  await supabase.auth.signOut()
  authUser.value = null
  authProfile.value = null
  currentStaffName.value = STAFF_DEFAULT_NAME
  staffLoginInput.value = STAFF_DEFAULT_NAME
  employeeProfiles.value = []
  employeeManageStatus.value = '老闆可在此建立員工帳號。'
  employeeManageStatusType.value = ''
  resetEmployeeEditForm()
  loginStatus.value = '已登出，請重新登入。'
  loginStatusType.value = ''
}

async function reloadCurrentProfile() {
  if (!authUser.value) return
  const profile = await loadAuthProfile(authUser.value)
  applyAuthenticatedProfile(authUser.value, profile)
  await loadOnlineWorkspace({ silent: true })
  statusMessage.value = '已重新讀取目前登入身份與線上個人工作區。'
}

function getStaffStorageSuffix() {
  return encodeURIComponent(cleanStaffName(currentStaffName.value))
}

function getStaffScopedStorageKey(baseKey) {
  return `${baseKey}__staff__${getStaffStorageSuffix()}`
}

async function switchStaffProfile() {
  const nextName = cleanStaffName(staffLoginInput.value)
  currentStaffName.value = nextName
  staffLoginInput.value = nextName
  localStorage.setItem(STAFF_PROFILE_STORAGE_KEY, nextName)
  roomDailyStatusByScope.value = readRoomDailyStatusStore()

  managerSelectedCity.value = ''
  managerSelectedDistrict.value = ''
  managerSelectedType.value = DEFAULT_MANAGER_SCOPE_TYPE
  roomManagerSelectedCity.value = ''
  roomManagerSelectedDistrict.value = ''
  roomManagerSelectedType.value = DEFAULT_MANAGER_SCOPE_TYPE
  ruleScopeCity.value = ''
  ruleScopeDistrict.value = ''
  ruleScopeType.value = DEFAULT_MANAGER_SCOPE_TYPE
  ruleScopeRoom.value = ''
  ruleScopeLevel.value = 'global'

  await loadOnlineWorkspace({ silent: true })
  closeAllTopPanelsForCleanStart()
  statusMessage.value = `已切換到「${nextName}」個人工作區。縣市、地區、機房與規則都會跟其他員工分開保存。`
}

function resetStaffProfile() {
  staffLoginInput.value = STAFF_DEFAULT_NAME
  switchStaffProfile()
}

watch(sourceText, value => {
  const normalized = normalizeSourceTextSlashes(value)
  if (normalized !== value) {
    sourceText.value = normalized
  }
})
const showAdvancedSettings = ref(false)
const showPriceSettings = ref(false)
const showFormatSettings = ref(false)
const showQuickRules = ref(false)
const showApiPanel = ref(false)
const activeTopPanel = ref('')
const activeAdvancedPanel = ref('country-map')
const ruleScopeLevel = ref('global')
const ruleScopeCity = ref('')
const ruleScopeDistrict = ref('')
const ruleScopeType = ref(DEFAULT_MANAGER_SCOPE_TYPE)
const ruleScopeRoom = ref('')
const showScopeManager = ref(true)
const showEmployeeManager = ref(false)
const showScopeCrudPanel = ref(false)
const backupImportInput = ref(null)
const newCityName = ref('')
const newDistrictName = ref('')
const newLocationTypeName = ref('')
const newRoomName = ref('')
const managerSelectedCity = ref('')
const managerSelectedDistrict = ref('')
const managerSelectedType = ref(DEFAULT_MANAGER_SCOPE_TYPE)
const roomManagerSelectedCity = ref('')
const roomManagerSelectedDistrict = ref('')
const roomManagerSelectedType = ref(DEFAULT_MANAGER_SCOPE_TYPE)
const dragCityName = ref('')
const dragDistrictName = ref('')
let isRestoringLastScopeSelection = false

function toggleAdvancedPanel(panel) {
  activeAdvancedPanel.value = activeAdvancedPanel.value === panel ? '' : panel
}

function closeTopSettingModal() {
  activeTopPanel.value = ''
  showPriceSettings.value = false
  showFormatSettings.value = false
  showQuickRules.value = false
  showAdvancedSettings.value = false
  showApiPanel.value = false
  // 第 018-116 批：地區機房管理是登入後固定區塊，不再被一般關閉動作收合。
  showScopeManager.value = true
  showScopeCrudPanel.value = false
}

function toggleTopPanel(panel) {
  const nextPanel = activeTopPanel.value === panel ? '' : panel
  closeTopSettingModal()
  activeTopPanel.value = nextPanel
  showPriceSettings.value = activeTopPanel.value === 'price'
  showFormatSettings.value = activeTopPanel.value === 'format'
  showQuickRules.value = activeTopPanel.value === 'quick'
  showAdvancedSettings.value = activeTopPanel.value === 'advanced'
  showApiPanel.value = activeTopPanel.value === 'api'

  if (nextPanel && ['price', 'format', 'quick', 'advanced'].includes(nextPanel)) {
    if (isOwner.value) {
      ruleScopeLevel.value = 'global'
      void loadCurrentScopeRules({ silent: true, preferOnline: true })
    } else if (ruleScopeLevel.value === 'room') {
      void loadCurrentScopeRules({ silent: true, preferOnline: true })
    }
  }
}

function toggleScopeManager() {
  // 第 018-116 批：此區塊固定顯示；按鈕只負責回到 / 保持顯示，不再切換成隱藏。
  closeTopSettingModal()
  showScopeManager.value = true
}

function toggleEmployeeManager() {
  showEmployeeManager.value = !showEmployeeManager.value
  if (showEmployeeManager.value && isOwner.value) {
    loadEmployeeProfiles()
  }
}
const showAliasList = ref(false)
const showRemoveWordList = ref(false)

const newAliasFrom = ref('')
const newAliasTo = ref('')
const newRemoveWord = ref('')
const newCountryRuleFrom = ref('')
const newCountryRuleTo = ref('馬來')

const priceMode = ref('country')
const globalIncrease = ref(500)
const customIncrease = ref(700)
const amountPriorityMode = ref('higher-price')
const titleMode = ref('country-name')
const formatHint = ref('【國籍 名稱】身高 體重 Cup 年齡　短鐘K/30/1S　長鐘K/50/1S')
const bodyOutputOrder = ref('height-weight-cup-age')
const formatSettingsTab = ref('header')

const headerRuleModeOptions = [
  { value: 'country-name', label: '國籍 → 小姐名稱（同一行）' },
  { value: 'name-country', label: '小姐名稱 → 國籍（同一行）' },
  { value: 'country-line-name-line', label: '國籍一行 → 姐姐名稱下一行' },
  { value: 'name-line-country-line', label: '小姐名稱一行 → 國籍下一行' },
  { value: 'labeled', label: '國籍：○○／姓名：○○' }
]

const bodyFieldOptions = [
  { value: 'height', label: '身高' },
  { value: 'weight', label: '體重' },
  { value: 'age', label: '年齡' },
  { value: 'cup', label: '罩杯' },
  { value: 'braCup', label: '胸圍尺寸＋罩杯（34D）' }
]

const defaultHeaderRecognitionRules = [
  { id: 'header-country-name', name: '國籍在姓名前', mode: 'country-name', example: '馬來 小淫娃', enabled: true },
  { id: 'header-name-country', name: '姓名在國籍前', mode: 'name-country', example: '小淫娃 馬來西亞', enabled: true },
  { id: 'header-country-line-name-line', name: '國籍與姓名分兩行', mode: 'country-line-name-line', example: '越南\n妃己', enabled: true },
  { id: 'header-name-line-country-line', name: '姓名與國籍分兩行', mode: 'name-line-country-line', example: '妃己\n越南', enabled: true },
  { id: 'header-labeled', name: '國籍姓名標籤格式', mode: 'labeled', example: '國籍：越南 姓名：妃己', enabled: true }
]

const defaultBodyRecognitionRules = [
  { id: 'body-height-weight-age-cup', name: '年齡在罩杯前', fields: ['height', 'weight', 'age', 'cup'], example: '150 40 20y 天然D', enabled: true },
  { id: 'body-height-weight-cup-age', name: '罩杯在年齡前', fields: ['height', 'weight', 'cup', 'age'], example: '150 40 天然D 20y', enabled: true },
  { id: 'body-height-weight-bracup-age', name: '胸圍尺寸加罩杯', fields: ['height', 'weight', 'braCup', 'age'], example: '166.46.真奶34D.22y', enabled: true },
  { id: 'body-age-height-weight-cup', name: '年齡在最前', fields: ['age', 'height', 'weight', 'cup'], example: '22y 166 46 D', enabled: true },
  { id: 'body-height-weight-cup', name: '沒有年齡', fields: ['height', 'weight', 'cup'], example: '168 50 E', enabled: true }
]

const headerRecognitionRules = ref(defaultHeaderRecognitionRules.map(rule => ({ ...rule })))
const bodyRecognitionRules = ref(defaultBodyRecognitionRules.map(rule => ({ ...rule, fields: [...rule.fields] })))
const advancedRegexRules = ref([])
const newHeaderRuleName = ref('')
const newHeaderRuleMode = ref('name-country')
const newHeaderRuleExample = ref('')
const newBodyRuleName = ref('')
const newBodyRuleFields = ref(['height', 'weight', 'age', 'cup'])
const newBodyRuleExample = ref('')
const headerRecognitionTestText = ref('小淫娃 馬來西亞')
const bodyRecognitionTestText = ref('150 40 20y 天然D')
const newRegexRuleName = ref('')
const newRegexRuleTarget = ref('body')
const newRegexRuleFlags = ref('iu')
const newRegexRulePattern = ref('')
const newRegexRuleFieldMap = ref('height=1,weight=2,age=3,cup=4')
const newRegexRuleExample = ref('')
const newSpecialRuleTemplate = ref('{身高} {體重} {年齡} {罩杯}')


function createRecognitionRuleId(prefix = 'rule') {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function normalizeHeaderRecognitionRules(value, options = {}) {
  const fallback = options.useDefaults === false ? [] : defaultHeaderRecognitionRules
  const source = Array.isArray(value) ? value : fallback
  const validModes = new Set(headerRuleModeOptions.map(option => option.value))
  return source
    .map((rule, index) => {
      const mode = validModes.has(rule?.mode) ? rule.mode : 'country-name'
      return {
        id: String(rule?.id || createRecognitionRuleId(`header-${index}`)),
        name: String(rule?.name || headerRuleModeOptions.find(option => option.value === mode)?.label || `標題規則 ${index + 1}`).trim(),
        mode,
        example: String(rule?.example || ''),
        enabled: rule?.enabled !== false
      }
    })
    .filter(rule => rule.name && validModes.has(rule.mode))
}

function normalizeBodyRecognitionRules(value, options = {}) {
  const fallback = options.useDefaults === false ? [] : defaultBodyRecognitionRules
  const source = Array.isArray(value) ? value : fallback
  const validFields = new Set(bodyFieldOptions.map(option => option.value))
  return source
    .map((rule, index) => {
      const fields = Array.isArray(rule?.fields)
        ? rule.fields.map(field => String(field || '')).filter(field => validFields.has(field))
        : []
      return {
        id: String(rule?.id || createRecognitionRuleId(`body-${index}`)),
        name: String(rule?.name || `身材規則 ${index + 1}`).trim(),
        fields,
        example: String(rule?.example || ''),
        enabled: rule?.enabled !== false
      }
    })
    .filter(rule => rule.name && rule.fields.length >= 3 && rule.fields.includes('height') && rule.fields.includes('weight') && rule.fields.some(field => field === 'cup' || field === 'braCup'))
}

function normalizeAdvancedRegexRules(value) {
  if (!Array.isArray(value)) return []
  return value
    .map((rule, index) => ({
      id: String(rule?.id || createRecognitionRuleId(`regex-${index}`)),
      name: String(rule?.name || `進階規則 ${index + 1}`).trim(),
      target: rule?.target === 'header' ? 'header' : 'body',
      pattern: String(rule?.pattern || '').trim(),
      flags: normalizeAdvancedRegexFlags(rule?.flags),
      fieldMap: String(rule?.fieldMap || '').trim(),
      template: String(rule?.template || ''),
      example: String(rule?.example || ''),
      enabled: rule?.enabled !== false
    }))
    .filter(rule => rule.name && rule.pattern && rule.fieldMap)
}

function mergeRecognitionRuleLists(baseValue, supplementValue, type = 'header') {
  const normalize = type === 'body' ? normalizeBodyRecognitionRules : normalizeHeaderRecognitionRules
  const base = normalize(baseValue, { useDefaults: type !== 'employee-empty' })
  const extra = normalize(supplementValue, { useDefaults: false })
  const result = []
  const seen = new Set()
  ;[...extra, ...base].forEach(rule => {
    const signature = type === 'body'
      ? `${rule.fields.join('>')}::${rule.name}`
      : `${rule.mode}::${rule.name}`
    if (seen.has(signature)) return
    seen.add(signature)
    result.push(cloneRuleFieldValue(rule))
  })
  return result
}

function headerRuleModeLabel(mode) {
  return headerRuleModeOptions.find(option => option.value === mode)?.label || mode
}

function bodyFieldLabel(field) {
  return bodyFieldOptions.find(option => option.value === field)?.label || field
}

function moveRecognitionRule(listRef, index, direction) {
  const list = Array.isArray(listRef) ? listRef : []
  const target = index + direction
  if (index < 0 || target < 0 || index >= list.length || target >= list.length) return
  const [item] = list.splice(index, 1)
  list.splice(target, 0, item)
}

function removeRecognitionRule(listRef, index) {
  if (!Array.isArray(listRef) || index < 0 || index >= listRef.length) return
  listRef.splice(index, 1)
}

function addHeaderRecognitionRule() {
  const mode = newHeaderRuleMode.value
  const name = String(newHeaderRuleName.value || '').trim() || headerRuleModeLabel(mode)
  const duplicate = headerRecognitionRules.value.some(rule => rule.mode === mode && rule.name === name)
  if (duplicate) {
    showActionToast('已有相同名稱與順序的標題規則。', 'warning')
    return
  }
  headerRecognitionRules.value.push({
    id: createRecognitionRuleId('header'),
    name,
    mode,
    example: String(newHeaderRuleExample.value || '').trim(),
    enabled: true
  })
  newHeaderRuleName.value = ''
  newHeaderRuleExample.value = ''
  showActionToast('已新增小姐標題規則；請按上方「儲存」。', 'success')
}

function addBodyRecognitionRule() {
  const fields = newBodyRuleFields.value.map(field => String(field || '')).filter(Boolean)
  if (fields.length < 3 || !fields.includes('height') || !fields.includes('weight') || !fields.some(field => field === 'cup' || field === 'braCup')) {
    showActionToast('身材規則至少需要身高、體重與罩杯／34D。', 'warning')
    return
  }
  if (new Set(fields).size !== fields.length) {
    showActionToast('同一條身材規則不能重複使用相同欄位。', 'warning')
    return
  }
  const name = String(newBodyRuleName.value || '').trim() || fields.map(bodyFieldLabel).join(' → ')
  const signature = fields.join('>')
  if (bodyRecognitionRules.value.some(rule => rule.fields.join('>') === signature && rule.name === name)) {
    showActionToast('已有相同名稱與欄位順序的身材規則。', 'warning')
    return
  }
  bodyRecognitionRules.value.push({
    id: createRecognitionRuleId('body'),
    name,
    fields,
    example: String(newBodyRuleExample.value || '').trim(),
    enabled: true
  })
  newBodyRuleName.value = ''
  newBodyRuleExample.value = ''
  showActionToast('已新增身材欄位規則；請按上方「儲存」。', 'success')
}

function normalizeAdvancedRegexFlags(value) {
  const flags = [...new Set(String(value || 'iu').toLowerCase().split('').filter(flag => ['i', 'm', 's', 'u'].includes(flag)))]
  if (!flags.includes('u')) flags.push('u')
  return flags.join('')
}

function parseAdvancedRegexFieldMap(value) {
  const map = {}
  String(value || '').split(/[，,;；\n]+/).forEach(item => {
    const [keyRaw, indexRaw] = item.split(/[:=：]/)
    const key = String(keyRaw || '').trim()
    const index = Number(String(indexRaw || '').replace(/[^\d]/g, ''))
    if (key && Number.isInteger(index) && index > 0 && index <= 20) map[key] = index
  })
  return map
}

function isSafeAdvancedRegexPattern(pattern) {
  const value = String(pattern || '')
  if (!value || value.length > 600) return false
  if (/\\[1-9]/.test(value)) return false
  if (/\((?:[^()]|\\.)*[+*](?:[^()]|\\.)*\)[+*{]/.test(value)) return false
  if (/(?:\.\*|\.\+){2,}/.test(value)) return false
  return true
}

const SPECIAL_RULE_PLACEHOLDERS = {
  身高: { key: 'height', pattern: '(\\d{3})' },
  體重: { key: 'weight', pattern: '(\\d{2,3})' },
  年齡: { key: 'age', pattern: '(\\d{2})\\s*(?:歲|y|Y)?' },
  罩杯: { key: 'cup', pattern: '(?:(?:真奶|天然|真|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓|奶|罩杯|胸)\\s*)?(?:\\d{2,3}\\s*)?([A-Ka-k])\\s*(?:奶|杯)?' },
  胸圍罩杯: { key: 'cup', pattern: '(?:(?:真奶|天然|真|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓|奶|罩杯|胸)\\s*)?(?:\\d{2,3}\\s*)?([A-Ka-k])\\s*(?:奶|杯)?' },
  國籍: { key: 'country', pattern: '([\\u4e00-\\u9fa5A-Za-z]{1,10})' },
  小姐名稱: { key: 'name', pattern: '([\\u4e00-\\u9fa5A-Za-z0-9]{1,18})' }
}

function escapeSpecialRuleLiteral(value = '') {
  return String(value || '')
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\s+/g, '\\s*')
}

function compileChineseSpecialRule(templateValue, targetValue) {
  const template = String(templateValue || '').normalize('NFKC').trim()
  if (!template) return { error: '請輸入來源格式範本。' }
  const placeholderRegex = /\{(身高|體重|年齡|罩杯|胸圍罩杯|國籍|小姐名稱)\}/g
  const map = {}
  const parts = []
  let lastIndex = 0
  let groupIndex = 0
  let match
  while ((match = placeholderRegex.exec(template))) {
    parts.push(escapeSpecialRuleLiteral(template.slice(lastIndex, match.index)))
    const definition = SPECIAL_RULE_PLACEHOLDERS[match[1]]
    groupIndex += 1
    if (!map[definition.key]) map[definition.key] = groupIndex
    parts.push(definition.pattern)
    lastIndex = match.index + match[0].length
  }
  parts.push(escapeSpecialRuleLiteral(template.slice(lastIndex)))

  if (!groupIndex) return { error: '範本內至少要加入一個大括號欄位。' }
  const target = targetValue === 'header' ? 'header' : 'body'
  const required = target === 'header' ? ['country', 'name'] : ['height', 'weight', 'cup']
  if (!required.every(key => map[key])) {
    return {
      error: target === 'header'
        ? '小姐標題至少需要「{國籍}」與「{小姐名稱}」。'
        : '身材資料至少需要「{身高}」、「{體重}」與「{罩杯}／{胸圍罩杯}」。'
    }
  }
  const fieldMap = Object.entries(map).map(([key, index]) => `${key}=${index}`).join(',')
  return {
    target,
    template,
    pattern: `^\\s*${parts.join('')}\\s*$`,
    flags: 'iu',
    fieldMap,
    map
  }
}

function getAdvancedRegexRuleError(rule) {
  if (!rule?.pattern) return '規則內容不完整。'
  if (!isSafeAdvancedRegexPattern(rule.pattern)) return '規則內容過長或包含高風險結構。'
  const map = parseAdvancedRegexFieldMap(rule.fieldMap)
  const required = rule.target === 'header' ? ['country', 'name'] : ['height', 'weight', 'cup']
  if (!required.every(key => map[key])) return '必要欄位不足。'
  try {
    new RegExp(rule.pattern, normalizeAdvancedRegexFlags(rule.flags))
  } catch {
    return '規則格式無法使用。'
  }
  return ''
}

function appendSpecialRulePlaceholder(value) {
  const token = `{${value}}`
  const current = String(newSpecialRuleTemplate.value || '')
  newSpecialRuleTemplate.value = current ? `${current.trimEnd()} ${token}` : token
}

const specialRulePlaceholderOptions = computed(() => newRegexRuleTarget.value === 'header'
  ? [
      { value: '國籍', label: '國籍' },
      { value: '小姐名稱', label: '小姐名稱' }
    ]
  : [
      { value: '身高', label: '身高' },
      { value: '體重', label: '體重' },
      { value: '年齡', label: '年齡' },
      { value: '罩杯', label: '罩杯' },
      { value: '胸圍罩杯', label: '34D' }
    ])

const specialRuleTemplatePlaceholder = computed(() => newRegexRuleTarget.value === 'header'
  ? '例如：國籍：{國籍} 姓名：{小姐名稱}'
  : '例如：身高{身高} 體重{體重} 年齡{年齡} 罩杯{罩杯}')

const specialRuleExamplePlaceholder = computed(() => newRegexRuleTarget.value === 'header'
  ? '例如：國籍：越南 姓名：妃己'
  : '例如：身高150 體重40 年齡20y 罩杯天然D')

watch(newRegexRuleTarget, target => {
  newSpecialRuleTemplate.value = target === 'header'
    ? '國籍：{國籍} 姓名：{小姐名稱}'
    : '{身高} {體重} {年齡} {罩杯}'
  newRegexRuleExample.value = ''
})

const specialRulePreview = computed(() => {
  const compiled = compileChineseSpecialRule(newSpecialRuleTemplate.value, newRegexRuleTarget.value)
  if (compiled.error) return { ok: false, message: compiled.error, preview: '' }
  const example = String(newRegexRuleExample.value || '').normalize('NFKC').trim()
  if (!example) return { ok: false, message: '請輸入一筆測試範例。', preview: '' }
  let match = null
  try {
    match = example.match(new RegExp(compiled.pattern, compiled.flags))
  } catch {
    return { ok: false, message: '來源格式範本無法建立，請重新輸入。', preview: '' }
  }
  if (!match) return { ok: false, message: '測試範例與來源格式範本不相符。', preview: '' }
  if (compiled.target === 'header') {
    const country = normalizeCountry(match[compiled.map.country] || '')
    const name = cleanName(match[compiled.map.name] || '')
    if (!country || !isValidName(name)) return { ok: false, message: '國籍或小姐名稱無法確認。', preview: '' }
    return { ok: true, message: `國籍：${country}｜小姐名稱：${name}`, preview: buildPreviewHeaderTitle(name, country) }
  }
  const parsed = validateParsedBodyResult({
    height: match[compiled.map.height] || '',
    weight: match[compiled.map.weight] || '',
    cup: match[compiled.map.cup] || '',
    age: compiled.map.age ? match[compiled.map.age] || '' : ''
  })
  if (!parsed) return { ok: false, message: '身高、體重或罩杯不在合理範圍。', preview: '' }
  return {
    ok: true,
    message: `身高：${parsed.height}｜體重：${parsed.weight}｜罩杯：${parsed.cup}｜年齡：${parsed.age || '未提供'}`,
    preview: formatBodyOutput(parsed)
  }
})

function addAdvancedRegexRule() {
  if (!isOwner.value) {
    showActionToast('只有老闆可以新增特殊格式。', 'warning')
    return
  }
  const compiled = compileChineseSpecialRule(newSpecialRuleTemplate.value, newRegexRuleTarget.value)
  if (compiled.error) {
    showActionToast(compiled.error, 'warning')
    return
  }
  if (!specialRulePreview.value.ok) {
    showActionToast('請先讓測試範例顯示「測試成功」。', 'warning')
    return
  }
  const rule = {
    id: createRecognitionRuleId('special'),
    name: String(newRegexRuleName.value || '').trim() || '老闆特殊格式',
    target: compiled.target,
    pattern: compiled.pattern,
    flags: compiled.flags,
    fieldMap: compiled.fieldMap,
    template: compiled.template,
    example: String(newRegexRuleExample.value || '').trim(),
    enabled: true
  }
  advancedRegexRules.value.push(rule)
  newRegexRuleName.value = ''
  newRegexRuleExample.value = ''
  showActionToast('已新增老闆特殊格式；請按上方「儲存」。', 'success')
}

function getHeaderRulesForCurrentParse() {
  return normalizeHeaderRecognitionRules(headerRecognitionRules.value, { useDefaults: true }).filter(rule => rule.enabled)
}

function getBodyRulesForCurrentParse() {
  return normalizeBodyRecognitionRules(bodyRecognitionRules.value, { useDefaults: true }).filter(rule => rule.enabled)
}

function getAdvancedRegexRulesForCurrentParse(target) {
  return normalizeAdvancedRegexRules(advancedRegexRules.value).filter(rule => rule.enabled && rule.target === target && !getAdvancedRegexRuleError(rule))
}

function parseHeaderWithAdvancedRegex(line) {
  const source = String(line || '').normalize('NFKC').trim()
  if (!source) return null
  for (const rule of getAdvancedRegexRulesForCurrentParse('header')) {
    const match = source.match(new RegExp(rule.pattern, normalizeAdvancedRegexFlags(rule.flags)))
    if (!match) continue
    const map = parseAdvancedRegexFieldMap(rule.fieldMap)
    const country = normalizeCountry(match[map.country] || '')
    const name = cleanName(match[map.name] || '')
    if (country && isValidName(name)) return { country, name, matchedRule: rule.name }
  }
  return null
}

function matchKnownCountryToken(value) {
  const cleaned = normalizeHeaderText(value)
  if (!cleaned) return null
  const compact = cleaned.replace(/\s+/g, '')
  const countries = getCountryKeys().sort((a, b) => b.length - a.length)
  for (const country of countries) {
    if (compact === country) return { raw: country, country: normalizeCountry(country) }
  }
  return null
}

function parseStructuredHeaderSameLine(line, rules = getHeaderRulesForCurrentParse()) {
  const cleaned = normalizeHeaderText(line)
  if (!cleaned) return null
  const compact = cleaned.replace(/\s+/g, '')
  const countries = getCountryKeys().sort((a, b) => b.length - a.length)

  for (const rule of rules) {
    if (!rule.enabled || ['country-line-name-line', 'name-line-country-line'].includes(rule.mode)) continue

    if (rule.mode === 'labeled') {
      const countryMatch = cleaned.match(/(?:國籍|國家)\s*[:：]?\s*([\u4e00-\u9fa5A-Za-z]+)/)
      const nameMatch = cleaned.match(/(?:姓名|名字|名稱|小姐)\s*[:：]?\s*([\u4e00-\u9fa5A-Za-z0-9]{1,18})/)
      if (countryMatch && nameMatch) {
        const country = normalizeCountry(countryMatch[1])
        const name = cleanName(nameMatch[1])
        if (country && isValidName(name)) return { country, name, matchedRule: rule.name }
      }
      continue
    }

    if (isNotHeaderLine(cleaned)) continue

    for (const countryAlias of countries) {
      const fixedCountry = normalizeCountry(countryAlias)
      if (rule.mode === 'country-name' && compact.startsWith(countryAlias)) {
        const name = cleanName(removeHeaderNoise(compact.slice(countryAlias.length)))
        if (isValidName(name)) return { country: fixedCountry, name, matchedRule: rule.name }
      }
      if (rule.mode === 'name-country' && compact.endsWith(countryAlias)) {
        const name = cleanName(removeHeaderNoise(compact.slice(0, -countryAlias.length)))
        if (isValidName(name)) return { country: fixedCountry, name, matchedRule: rule.name }
      }
    }
  }
  return null
}

function parseStructuredHeaderAt(lines, index, rules = getHeaderRulesForCurrentParse()) {
  const sourceLines = Array.isArray(lines) ? lines : String(lines || '').split(/\r?\n/)
  const current = String(sourceLines[index] || '').trim()
  if (!current) return null

  const advanced = parseHeaderWithAdvancedRegex(current)
  if (advanced) return { ...advanced, startIndex: index, consumedLines: 1 }

  const sameLine = parseStructuredHeaderSameLine(current, rules)
  if (sameLine) return { ...sameLine, startIndex: index, consumedLines: 1 }

  const next = String(sourceLines[index + 1] || '').trim()
  if (!next) return null
  for (const rule of rules) {
    if (!rule.enabled) continue
    if (rule.mode === 'country-line-name-line') {
      const countryMatch = matchKnownCountryToken(current)
      const name = cleanName(next)
      if (countryMatch && !isNotHeaderLine(next) && isValidName(name)) {
        return { country: countryMatch.country, name, matchedRule: rule.name, startIndex: index, consumedLines: 2 }
      }
    }
    if (rule.mode === 'name-line-country-line') {
      const countryMatch = matchKnownCountryToken(next)
      const name = cleanName(current)
      if (countryMatch && !isNotHeaderLine(current) && isValidName(name)) {
        return { country: countryMatch.country, name, matchedRule: rule.name, startIndex: index, consumedLines: 2 }
      }
    }
  }
  return null
}

function bodyRuleFieldPattern(field) {
  if (field === 'height') return { key: 'height', pattern: '(\\d{3})' }
  if (field === 'weight') return { key: 'weight', pattern: '(\\d{2})' }
  if (field === 'age') return { key: 'age', pattern: '(\\d{2})\\s*(?:歲|y|Y)?' }
  if (field === 'cup' || field === 'braCup') {
    return {
      key: 'cup',
      pattern: '(?:(?:真奶|天然|真|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓|奶|罩杯|胸)\\s*)?(?:\\d{2,3}\\s*)?([A-Ka-k])\\s*(?:奶|杯)?'
    }
  }
  return null
}

function validateParsedBodyResult(result) {
  const height = Number(result?.height)
  const weight = Number(result?.weight)
  const ageNumber = Number(String(result?.age || '').replace(/[^\d]/g, ''))
  const cup = String(result?.cup || '').toUpperCase()
  if (!Number.isFinite(height) || height < 130 || height > 210) return null
  if (!Number.isFinite(weight) || weight < 30 || weight > 120) return null
  if (!/^[A-K]$/.test(cup)) return null
  if (ageNumber && (ageNumber < 18 || ageNumber > 65)) return null
  return {
    height: String(height),
    weight: String(weight),
    cup,
    age: ageNumber ? `${ageNumber}y` : ''
  }
}

function parseBodyWithAdvancedRegex(line) {
  const source = String(line || '').normalize('NFKC').trim()
  if (!source) return null
  for (const rule of getAdvancedRegexRulesForCurrentParse('body')) {
    const match = source.match(new RegExp(rule.pattern, normalizeAdvancedRegexFlags(rule.flags)))
    if (!match) continue
    const map = parseAdvancedRegexFieldMap(rule.fieldMap)
    const parsed = validateParsedBodyResult({
      height: match[map.height] || '',
      weight: match[map.weight] || '',
      cup: match[map.cup] || '',
      age: map.age ? match[map.age] || '' : ''
    })
    if (parsed) return { ...parsed, matchedRule: rule.name }
  }
  return null
}

function parseBodyWithStructuredRules(line, rules = getBodyRulesForCurrentParse()) {
  const source = normalizeDigits(String(line || '')).normalize('NFKC').trim()
  if (!source) return null
  const separator = '(?:\\s+|\\s*[/.。·・,，:：_\\-]\\s*)'

  for (const rule of rules) {
    if (!rule.enabled) continue
    const fields = rule.fields.map(bodyRuleFieldPattern)
    if (fields.some(field => !field)) continue
    const captureKeys = fields.map(field => field.key)
    const pattern = `^\\s*${fields.map(field => field.pattern).join(separator)}(?:\\s|$)`
    let match = null
    try {
      match = source.match(new RegExp(pattern, 'iu'))
    } catch {
      continue
    }
    if (!match) continue

    const raw = {}
    captureKeys.forEach((key, index) => {
      raw[key] = match[index + 1] || raw[key] || ''
    })
    const parsed = validateParsedBodyResult(raw)
    if (parsed) return { ...parsed, matchedRule: rule.name }
  }
  return null
}

function getBodyOutputKeys() {
  return bodyOutputOrder.value === 'height-weight-age-cup'
    ? ['height', 'weight', 'age', 'cup']
    : ['height', 'weight', 'cup', 'age']
}

function formatBodyOutput(body = {}) {
  return getBodyOutputKeys().map(key => String(body?.[key] || '').trim()).filter(Boolean).join(' ')
}

const outputFormatPreview = computed(() => {
  const title = buildPreviewHeaderTitle('小淫娃', '馬來')
  return `${title}${formatBodyOutput({ height: '150', weight: '40', cup: 'D', age: '20y' })}  3K/30/1S  3.3K/50/1S`
})

const headerRecognitionPreview = computed(() => {
  const lines = String(headerRecognitionTestText.value || '').split(/\r?\n/)
  for (let index = 0; index < lines.length; index += 1) {
    const result = parseStructuredHeaderAt(lines, index)
      || parseHeaderWithAdvancedRegex(lines[index])
      || parseHeaderLine(lines[index])
      || parseStrictNameCountryHeaderLine(lines[index])
    if (result) {
      return {
        ok: true,
        message: `國籍：${result.country}｜小姐名稱：${result.name}${result.matchedRule ? `｜命中：${result.matchedRule}` : ''}`,
        preview: buildPreviewHeaderTitle(result.name, result.country)
      }
    }
  }
  return { ok: false, message: '尚未命中目前規則；請調整來源順序、國籍同義詞或範例。', preview: '' }
})

const bodyRecognitionPreview = computed(() => {
  const result = parseBody(bodyRecognitionTestText.value)
  if (!result) return { ok: false, message: '尚未辨識身高、體重與罩杯。', preview: '' }
  return {
    ok: true,
    message: `身高：${result.height}｜體重：${result.weight}｜罩杯：${result.cup}｜年齡：${result.age || '未提供'}${result.matchedRule ? `｜命中：${result.matchedRule}` : ''}`,
    preview: formatBodyOutput(result)
  }
})

const defaultCountryPriceRules = [
  '台妹=1000',
  '台灣=1000',
  '泰妹=500',
  '泰國=500',
  '馬來=500',
  '馬來西亞=500',
  '港澳=1000',
  '越南=500',
  '日本=1000',
  '韓國=1000',
  '外籍=500'
]

const defaultCountryAliases = [
  '台灣=台妹',
  '台妹=台妹',
  '泰國=泰妹',
  '泰妹=泰妹',
  '馬來西亞=馬來',
  '馬來=馬來',
  '港澳=港澳',
  '越南=越南',
  '日本=日本',
  '韓國=韓國',
  '外籍=外籍'
]

const defaultMinutePriceAddRules = [
  '90=1000'
]

const defaultAmountTransformRules = [
  { from: 2200, to: 2700 },
  { from: 2300, to: 2800 },
  { from: 2400, to: 2900 },
  { from: 2500, to: 3000 },
  { from: 2600, to: 3100 },
  { from: 2700, to: 3200 },
  { from: 3000, to: 3500 },
  { from: 3100, to: 3600 },
  { from: 3200, to: 3700 }
]

// 第 018-115 批：服務加價需明確金額版。
const defaultServiceOrder = [
  '共浴', '無套吹', '輕功', '挑逗', '69', '品鮑', '小親親', '奶炮',
  '舔蛋', '按摩', '舌吻', '冰火', '毒龍', '波推', '胸推', '臀推',
  '桑拿', '調情', '漫遊', '0.01套+100', '0.02套', '絲襪',
  '情趣用品', '自慰秀', '2S+500', '2S+1000', '口爆+500',
  '吞精+500', '吞精+1000', '顏射+500', '入珠+500', '入珠客+500', '自慰秀+500',
  '情趣用品+500', '艷舞', '豔舞', '艷舞+500', '無套內射+1000', '無套內射+1500',
  '無套外射+1000', '後門+1000', '攝影+1000', '攝影不露臉+1000',
  '絲襪+100', '高跟鞋', '2節3S', '3節送1節200分',
  '3節送1節200分3S', '5節送3節200分', '5節送3節400分',
  '3+1', '2+1',
  '2+1模式',
  '攝影露臉+1000',
  '不嫌視野愛愛',
  '豪邁吃屌',
  '深喉嚨',
  '5+3'
]

const defaultAliasRules = [
  '甜蜜共浴=共浴',
  '共浴=共浴',
  '無套吹69品鮑=無套吹 69 品鮑',
  '無套吹共浴親嘴品鮑=無套吹 共浴 小親親 品鮑',
  '親嘴=小親親',
  '69品鮑=69 品鮑',
  '六九=69',
  '69=69',
  '品鮑=品鮑',
  '無套吹=無套吹',
  '輕功挑逗=輕功 挑逗',
  '輕功=輕功',
  '挑逗=挑逗',
  '小親親=小親親',
  '奶砲=奶炮',
  '奶炮=奶炮',
  '舔蛋=舔蛋',
  '按摩=按摩',
  'LG舌吻=舌吻',
  'Lg舌吻=舌吻',
  '舌吻=舌吻',
  '冰火=冰火',
  '胸推滑壓=胸推',
  '胸推=胸推',
  '胸推可舌吻=胸推 舌吻',
  '臀推=臀推',
  '屁推=臀推',
  '0.01套子+100=0.01套+100',
  '免費0.02套=0.02套',
  '0.02套=0.02套',
  '時間內2S+500=2S+500',
  '2s+500=2S+500',
  '2S+500=2S+500',
  '時間內2S+1000=2S+1000',
  '2s+1000=2S+1000',
  '2S+1000=2S+1000',
  '口爆+500=口爆+500',
  '吞精+500=吞精+500',
  '吞精+1000=吞精+1000',
  '顏射+500=顏射+500',
  '射顏+500=顏射+500',
  '入珠+500=入珠+500',
  '入珠客+500=入珠客+500',
  '情趣用品=情趣用品',
  '免費情趣用品=情趣用品',
  '情趣用品+500=情趣用品+500',
  '自慰秀=自慰秀',
  '免費自慰秀=自慰秀',
  '自慰秀+500=自慰秀+500',
  '艷舞+500=艷舞+500',
  '買兩節3S=買2節3s',
  '買兩節3s=買2節3s',
  '買2送1=買2送1',
  '買二送一=買2送1',
  '買兩送一=買2送1',
  '買2送一=買2送1',
  '買二送1=買2送1',
  '買兩送1=買2送1',
  '買3送1=買3送1',
  '買三送一=買3送1',
  '買5送3=買5送3',
  '買五送三=買5送3',
  '買5節送3節=買5節送3節',
  '買五節送三節=買5節送3節',
  '2+1s=買2節送1s',
  '2+1S=買2節送1s',
  '2+1=買2送1',
  '2+3s=買2節送3s',
  '2+3S=買2節送3s',
  '3+1=買3送1',
  '5+3=買5送3',
  '2節3s=買2節3s',
  '2節3S=買2節3s',
  '買2節3s=買2節3s',
  '買2節3S=買2節3s',
  '買兩節3s=買2節3s',
  '買兩節3S=買2節3s',
  '買3節送1節200分=3節送1節200分',
  '買3節送1節200分3s=3節送1節200分3S',
  '買3節送1節200分3S=3節送1節200分3S',
  '買5節送3節200分=5節送3節200分',
  '買5節送3節400分=5節送3節400分',
  '免費絲襪=絲襪',
  '絲襪=絲襪',
  '免費0.02=0.02套',
  '免費0.02套=0.02套'
,
  '殘廢澡=共浴',
  '廢廢澡=共浴',
  '小親=小親親',
  '吞蛋舔睪丸=舔蛋',
  '舒麻舌功=舌吻',
  '指滑=挑逗',
  '過水=共浴',
  '桑拿按摩=桑拿 按摩',
  '抓龍筋=按摩',
  '買2節/3s=買2節3s',
  '買2節/3S=買2節3s',
  '買2節送1s=買2節送1s',
  '買2節送1S=買2節送1s',
  '買2節以上免費送口爆=口爆+500',
  '買2節以上免費 送口爆=口爆+500',
  '買2節送艷舞秀=艷舞',
  '買2節送豔舞秀=艷舞',
  '買兩節送艷舞=艷舞',
  '買兩節 送艷舞=艷舞',
  '買3節送1節=買3節送1節',
  '買三節送一節=買3節送1節',
  '包夜5+3=買5送3',
  '5節送3節包夜=買5節送3節',  '雙飛=雙飛',
  '小女孩淫娃雙飛=雙飛',
  '小女孩/淫娃 雙飛=雙飛',
  '40/60分鐘2+1模式=買2送1',
  '2+1模式=買2送1',
  '40/60分鐘2+1=買2送1',
  '皆可選擇送一節時間或送一次次數=買2送1',
  '包夜買5送3=買5送3',
  '包夜買5送3 8小時不限時段=買5送3',
  '8小時不限時段=買5送3',
  '攝影不露臉+1000=攝影不露臉+1000',
  '攝影不露臉=攝影不露臉+1000',
  '攝影+1000不露臉=攝影不露臉+1000',
  '攝影不露臉+1000=攝影不露臉+1000',
  '不露臉攝影+1000=攝影不露臉+1000',
  '攝影露臉+1000=攝影露臉+1000',
  '攝影+1000=攝影+1000',
  '深喉嚨=深喉嚨',
  '深喉咙=深喉嚨',
  '深喉=深喉嚨',
  '豪邁吃屌=豪邁吃屌',
  '不嫌視野愛愛=不嫌視野愛愛',
  '需=需',
  '溫馨調情=調情',
  '初感001保險套+100=0.01套+100',
  '初感001=0.01套+100',
  '保險套+100=0.01套+100',
  '可2+1 150分 3S=買2送1',
  '可2+1 150分 3s=買2送1',
  '150分3S=買2送1',
  '150分3s=買2送1'
]

const defaultRemoveWords = [
  '真實本人照',
  '年輕漂亮好身材',
  '新人無刺青甜美',
  '戴套愛愛噴出一次',
  '底單最低+500',
  '服務項目',
  '套餐服務',
  '超值升級',
  '超值加購',
  '視乾淨度',
  '客自備',
  '可配合'
,
  '視衛生',
  '角色扮演 性感內衣',
  '客自帶-新',
  '特色服務',
  '可搭配',
  '可以搭配雙飛',
  '雙飛',
  '高跟鞋',
  '()套餐服務()',
  '▫️',
  '()',
  '()超值升級()',
  '✳️',
  '💷請自備零錢/妹不找零',
  '(禁止)酒客/入珠/吸毒/生客',
  '13：00-02：00',
  '酒客/入珠/吸毒/生客',
  '保證本人生活照',
  '年輕漂亮膚白',
  '新人無牙套漂亮',
  '新人高顏值好身材',
  '膚白水嫩漂亮真奶',
  '新人笑容甜美無刺青',
  '保證本人照零誤差',
  '膚白大奶約到賺到',
  '新人無刺青無牙套',
  '年輕漂亮超級高顏值',
  '服務認真超級享受',
  '約到賺到保證舒服',
  '新人膚白大奶無套',
  '年輕嫩妹膚白大奶',
  '無刺青無生過高顏值',
  '新人報到服務好',
  '新人笑容無刺青',
  '年輕漂亮膚白甜美',
  '台南市仙境傳說',
  '首次來台大學生',
  '高顏值嫩妹',
  '皮膚白皙天然美乳粉紅內裝',
  '上班時間13:00-02:00',
  '服務地點:台南市北區',
  '奇美第五停車場旁邊',
  '服務內容:',
  '加購優惠服務:',
  '嚴禁-珠客/酒客',
  '請自備零錢謝謝啦',
  '港澳首選',
  '天然真乳',
  '翹臀女神',
  '老饕最愛',
  '上班時間13:00-01:00',
  '服務超頂',
  '抓龍筋專業按摩',
  '老司機最愛',
  '上班時間13:00-23:00',
  '服務地點:台南市',
  '中西區金華路',
  '超頂帝王級服務',
  '雪白肌膚小隻馬好駕馭',
  '上班時間15:00-02:00',
  '情趣用品/客自帶-新',
  '新妹',
  '13:00-02:00',
  '百分之百本人照',
  '服務好態度好可奶泡',
  '無刺青無牙套H奶',
  '皮膚白漂亮無套+',
  '可中文溝通極品好貨',
  '新人保證本人照',
  '無刺青無牙套',
  '請自備零錢/妹不找零',
  '禁止',
  '膚白水嫩漂亮大E奶',
  '笑容身材苗條',
  '無贅肉無刺青無生過',
  '年輕美眉漂亮可愛',
  'fire',
  'flower',
  '拒:入珠/酒客/暴力/吸毒',
  '麻煩請自備零錢',
  '謝謝',
  '服務特色:',
  'emoji',
  '台南歌舞伎',
  '極品混血淫蕩模特兒',
  'sparkles',
  '18:00-02:00',
  '白皙極品長腿模特身材嫩妹',
  '可中文溝通',
  '白人/黑人',
  '加購服務',
  '溝通語言:英文',
  '套房:善化A區',
  '加值服務',
  '蒼華 桃園.龜山.林口 報班',
  '全館限熟',
  '5/31',
  '營業時間 13.0001.30 有時提早發班表 有客人仍可安排',
  '全館皆本照 需要推薦小姐或詢問細節都可以問',
  '每周帳戶更改請在禮拜天前通知',
  '最低+5 維護市場行情 不收優惠單 拍謝',
  '影片單照皆以更新在大群記事本',
  '仟色好評截圖 退 100',
  'Line好評截圖 退 100',
  '預約單僅接受到隔天 中午起可預約隔天單',
  '林口區文化二路一段',
  '健康膚色.藝術刺青.無生過.無牙套.無修毛',
  '配合客人自備全新絲襪',
  '以上服務如有特別指定請下單時備註',
  '龜山區復興北路',
  '龜山區文興路',
  '大真奶御姊 服務控首選 苗條身材好',
  '健康膚色.無生過.藝術刺青.無牙套.有修毛',
]

const defaultExtraKeep = ['吞精+1000', '入珠客+500', '無套內射+1000', '後門+1000', '高跟鞋', '雙飛', '2+1', '攝影+1000', '攝影不露臉+1000', '攝影露臉+1000', '深喉嚨', '豪邁吃屌', '不嫌視野愛愛']

const defaultCountryFieldRules = [
  '國家:馬來=馬來',
  '國籍:馬來=馬來',
  '國家馬來=馬來',
  '國籍馬來=馬來',
  '馬來新妹=馬來',
  '越南新妹=越南',
  '台灣新妹=台妹',
  '台妹新妹=台妹',
  '港澳新妹=港澳',
  '泰國新妹=泰妹',
  '泰妹新妹=泰妹',
  '泰國妹妹=泰妹',
  '泰國妹=泰妹',
  '泰國=泰妹',
  '泰妹=泰妹',
]

const defaultBodyCupPrefixes = [
  '真',
  '天然',
  '假',
  '大',
  '小',
  '巨',
  '美',
  '漂亮',
  '自然',
  '軟',
  '嫩',
  '挺',
  '飽',
  '彈',
  '圓',
  '罩杯',
]

const defaultNotNameWords = [
  '雙飛',
  '需',
  '國家',
  '國籍',
  '服務',
  '請自備',
  '禁止',
  '酒客',
  '入珠',
  '吸毒',
  '生客',
  '包夜',
  '不限時段',
  '模式',
  '送一節',
  '次數',
  '攝影',
  '露臉',
  '深喉',
  '豪邁',
  '吃屌',
  '不嫌',
  '視野',
  '愛愛',
  '備註',
  '可配合'
]


const countryPriceRulesText = ref(defaultCountryPriceRules.join('\n'))
const minutePriceAddRulesText = ref(defaultMinutePriceAddRules.join('\n'))
const countryAliasText = ref(defaultCountryAliases.join('\n'))
const amountTransformRules = ref(defaultAmountTransformRules.map(rule => ({ ...rule })))
const newAmountFrom = ref('')
const newAmountTo = ref('')
const serviceOrderText = ref(defaultServiceOrder.join('\n'))
const aliasRulesText = ref(defaultAliasRules.join('\n'))
const removeWordsText = ref(defaultRemoveWords.join('\n'))
const extraKeepText = ref(defaultExtraKeep.join('\n'))
const countryFieldRulesText = ref(defaultCountryFieldRules.join('\n'))
const bodyCupPrefixText = ref(defaultBodyCupPrefixes.join('\n'))
const notNameWordsText = ref(defaultNotNameWords.join('\n'))

const aliasRuleItems = computed(() => parseAliasRules(aliasRulesText.value).map(([from, to]) => ({ from, to })))
const removeWordItems = computed(() => parseCleanupWords(removeWordsText.value))
const countryFieldRuleItems = computed(() => parseKeyValueLines(countryFieldRulesText.value).map(([from, to]) => ({ from, to })))

const sampleText = `💢超性感搖搖馬💢

⏩✨冰琪✨越南
㊙️163/45/36F20y
🕑13:00-02:00

短鍾➡️30分/2.5底
長鐘➡️50分/2.8底
✴️底單最低+500✴️

✴️服務項目：甜蜜共浴/無套吹/小親親/69品鮑/輕功挑逗/胸推滑壓/按摩愛撫舒壓/LG舌吻/奶炮/戴套愛愛噴出一次

✴️超值加購
⭕️時間內2S+500
⭕️情趣用品+500
⭕️艷舞+500
⭕️買3送1
⭕️買5送3
⭕️買兩節3S`


function closeAllTopPanelsForCleanStart() {
  // 第 018-107 批：登入後預設固定展開地區機房管理；選擇欄位由最後機房範圍 / 定點預設帶入。
  // 其他設定彈窗仍維持收合；若使用者手動按「關閉」，只會暫時收合目前畫面。
  activeTopPanel.value = ''
  showPriceSettings.value = false
  showFormatSettings.value = false
  showQuickRules.value = false
  showAdvancedSettings.value = false
  showApiPanel.value = false
  showScopeManager.value = true
  showScopeCrudPanel.value = false

  localStorage.removeItem(CLEAN_START_PANEL_STORAGE_KEY)
}

onMounted(async () => {
  window.addEventListener('keydown', handleMediaViewerKeydown)
  await refreshAuthState()
  if (!authUser.value) return
  repairProtectedGlobalRules()
  closeAllTopPanelsForCleanStart()
  loadRules({ silent: true })
  loadConfirmedText({ silent: true })
  normalizeDocument3Text()
  await loadFrontendLadies({ silent: true })
  closeAllTopPanelsForCleanStart()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleMediaViewerKeydown)
})


function isPriceLine(line) {
  const value = normalizeDigits(String(line || '')).trim()
  if (!value) return false

  // 2100/30/1S、2/30/1S、2.2/30/1S、3200/60/2S
  if (/^[0-9]+(?:\.[0-9]+)?\s*\/\s*\d{2,3}\s*\/\s*\d+\s*S?$/i.test(value)) return true

  // 30分/1S 2.2K、60分鐘 回3200、短鐘30分/2.5底
  if (/\d{2,3}\s*(?:分鐘|分)/.test(value) && /([0-9]+(?:\.[0-9]+)?\s*[kK]|[0-9]{3,5}|[0-9]+(?:\.[0-9]+)?\s*底|回\s*[0-9]{3,5})/.test(value)) return true

  return false
}

function isNumericCleanupWord(word) {
  return /^[0-9+\-/.：:\s]+$/.test(String(word || '').trim())
}





function normalizeLadySyncText(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

function normalizeLadySyncCompactText(value) {
  return normalizeLadySyncText(value)
    .replace(/[\s　]+/g, '')
    .replace(/[|｜/\\:_：,，。．、\-–—()（）【】\[\]]/g, '')
}

function makePreviewLadyKey(lady) {
  const country = lady?.country || lady?.nationality || lady?.nation || ''
  return `${normalizeLadySyncCompactText(country)}__${normalizeLadySyncCompactText(lady?.name || '')}`
}

function normalizeLadyIdentityBodyValue(value) {
  const text = normalizeLadySyncCompactText(value)
  return text.replace(/[^0-9a-z一-鿿]+/gi, '')
}

function getLadyIdentityBodyParts(lady) {
  const body = lady?.body || {}
  return {
    age: normalizeLadyIdentityBodyValue(lady?.age ?? body?.age ?? ''),
    height: normalizeLadyIdentityBodyValue(lady?.height ?? body?.height ?? ''),
    weight: normalizeLadyIdentityBodyValue(lady?.weight ?? body?.weight ?? ''),
    cup: normalizeLadyIdentityBodyValue(lady?.cup ?? body?.cup ?? '')
  }
}

function makeLadyStrictIdentityKey(lady) {
  const nameKey = makePreviewLadyKey(lady)
  const bodyParts = getLadyIdentityBodyParts(lady)
  return [
    nameKey,
    bodyParts.age,
    bodyParts.height,
    bodyParts.weight,
    bodyParts.cup
  ].join('__')
}

function countMatchingIdentityBodyParts(sourceLady, targetLady) {
  const source = getLadyIdentityBodyParts(sourceLady)
  const target = getLadyIdentityBodyParts(targetLady)
  let availableCount = 0
  let matchedCount = 0
  ;['height', 'weight', 'cup', 'age'].forEach(key => {
    if (!source[key] || !target[key]) return
    availableCount += 1
    if (source[key] === target[key]) matchedCount += 1
  })
  return { availableCount, matchedCount }
}

function isSameFormalLadyIdentity(sourceLady, targetLady) {
  if (!sourceLady || !targetLady) return false
  if (makePreviewLadyKey(sourceLady) !== makePreviewLadyKey(targetLady)) return false
  const { availableCount, matchedCount } = countMatchingIdentityBodyParts(sourceLady, targetLady)
  if (availableCount >= 3) return matchedCount >= 3
  if (availableCount === 2) return matchedCount >= 2
  return false
}

function findBestExistingLadyMatchForSync(lady) {
  const key = makePreviewLadyKey(lady)
  const matches = frontendLadies.value.filter(item => makePreviewLadyKey(item) === key)
  if (!matches.length) {
    return { match: null, matches, formalMatches: [], suspected: false, matchedBy: '' }
  }

  const strictKey = makeLadyStrictIdentityKey(lady)
  const strictMatches = matches.filter(item => makeLadyStrictIdentityKey(item) === strictKey)
  const formalMatches = strictMatches.length
    ? strictMatches
    : matches.filter(item => isSameFormalLadyIdentity(lady, item))

  if (formalMatches.length === 1) {
    return {
      match: formalMatches[0],
      matches,
      formalMatches,
      suspected: false,
      matchedBy: strictMatches.length ? 'formal-id-full-body' : 'formal-id-body'
    }
  }

  if (formalMatches.length > 1) {
    return {
      match: null,
      matches,
      formalMatches,
      suspected: true,
      matchedBy: 'multiple-formal-id-body'
    }
  }

  if (matches.length === 1) {
    return {
      match: matches[0],
      matches,
      formalMatches: [],
      suspected: false,
      matchedBy: 'name-country-single'
    }
  }

  return {
    match: null,
    matches,
    formalMatches: [],
    suspected: true,
    matchedBy: 'multiple-name-country'
  }
}

function getLadySyncLocation(lady) {
  const locationInfo = lady?.locationInfo || lady?.location_info || {}
  return {
    city: lady?.city || lady?.county || lady?.locationCity || lady?.location_city || locationInfo?.city || '',
    district: lady?.district || lady?.area || lady?.region || lady?.locationDistrict || lady?.location_district || locationInfo?.district || '',
    mode: lady?.mode || lady?.environment || lady?.serviceType || lady?.service_type || locationInfo?.mode || '',
    room: lady?.sourceRoom || lady?.source_room || lady?.room || locationInfo?.room || ''
  }
}

function normalizeLadySyncList(value, candidateKeys = []) {
  const rows = Array.isArray(value) ? value : []
  return rows
    .map(item => {
      if (item && typeof item === 'object') {
        for (const key of candidateKeys) {
          const candidate = normalizeLadySyncText(item?.[key])
          if (candidate) return candidate
        }
      }
      return normalizeLadySyncText(item)
    })
    .filter(Boolean)
    .sort()
}

function buildLadySyncComparable(lady) {
  const body = lady?.body || {}
  const location = getLadySyncLocation(lady)
  return {
    country: normalizeLadySyncCompactText(lady?.country || lady?.nationality || lady?.nation || ''),
    name: normalizeLadySyncCompactText(lady?.name || ''),
    city: normalizeLadySyncCompactText(location.city),
    district: normalizeLadySyncCompactText(location.district),
    mode: normalizeLadySyncCompactText(location.mode),
    height: normalizeLadySyncText(lady?.height ?? body?.height ?? ''),
    weight: normalizeLadySyncText(lady?.weight ?? body?.weight ?? ''),
    cup: normalizeLadySyncCompactText(lady?.cup ?? body?.cup ?? ''),
    age: normalizeLadySyncText(lady?.age ?? body?.age ?? ''),
    pricePlans: normalizeLadySyncList(lady?.pricePlans || lady?.plans || lady?.prices, ['priceText', 'price_text', 'displayText', 'display_text']),
    services: normalizeLadySyncList(lady?.services || lady?.serviceList, ['serviceName', 'service_name', 'name'])
  }
}

function makeStableLadySourceIdentity(lady) {
  const location = getLadySyncLocation(lady)
  const country = normalizeLadySyncCompactText(lady?.country || lady?.nationality || lady?.nation || '') || 'unknown-country'
  const name = normalizeLadySyncCompactText(lady?.name || '') || 'unknown-name'
  const body = lady?.body || {}
  const bodyParts = [
    normalizeLadySyncText(lady?.height ?? body?.height ?? ''),
    normalizeLadySyncText(lady?.weight ?? body?.weight ?? ''),
    normalizeLadySyncCompactText(lady?.cup ?? body?.cup ?? ''),
    normalizeLadySyncText(lady?.age ?? body?.age ?? '')
  ].filter(Boolean)
  const room = normalizeLadySyncCompactText(location.room || ruleScopeRoom.value)
  const fallbackScope = [
    normalizeLadySyncCompactText(location.city),
    normalizeLadySyncCompactText(location.district),
    normalizeLadySyncCompactText(location.mode)
  ].filter(Boolean).join('-') || 'unknown-scope'
  const scope = bodyParts.length >= 3
    ? `body-${bodyParts.join('-')}`
    : room
      ? `room-${room}`
      : `scope-${fallbackScope}`
  return `converter-${country}-${name}-${scope}`.slice(0, 220)
}

function assessLadyDatabaseSync(lady) {
  if (!frontendLadiesLoaded.value) {
    return {
      state: 'checking',
      label: '尚未比對',
      message: '正在讀取資料庫，確認是否已同步。',
      match: null,
      matches: [],
      matchedBy: ''
    }
  }

  const matchResult = findBestExistingLadyMatchForSync(lady)
  const { match, matches, suspected, matchedBy } = matchResult

  if (!matches.length) {
    return {
      state: 'new',
      label: '可新增',
      message: '資料庫尚無同國籍、同姓名小姐，可安全新增。',
      match: null,
      matches,
      matchedBy: ''
    }
  }

  if (suspected || !match) {
    return {
      state: 'suspected',
      label: `疑似重複 ${matches.length} 筆`,
      message: matchedBy === 'multiple-formal-id-body'
        ? '資料庫已有多筆同國籍、同姓名且身材條件相同的資料，已禁止送出，請先到 01 後台整理重複資料。'
        : '資料庫已有多筆同國籍、同姓名資料，系統無法安全判斷唯一主檔，已禁止新增第二筆。',
      match: null,
      matches,
      matchedBy
    }
  }

  const sameContent = JSON.stringify(buildLadySyncComparable(lady)) === JSON.stringify(buildLadySyncComparable(match))

  if (sameContent) {
    return {
      state: 'synced',
      label: '已同步',
      message: '資料庫已有完全相同資料，本次會略過資料庫新增；中央網站只會補同步原正式資料。',
      match,
      matches,
      matchedBy
    }
  }

  return {
    state: 'update',
    label: '可更新',
    message: matchedBy === 'name-country-single'
      ? '資料庫已有同國籍、同姓名唯一資料；本次會更新原資料，不會建立第二筆。'
      : '資料庫已比對到同一位小姐正式主檔；本次會更新原資料，不會建立第二筆。',
    match,
    matches,
    matchedBy
  }
}

function buildDuplicateGuardedSubmissionItem(item, assessment = null) {
  const match = assessment?.match || null
  const matchedId = Number(match?.id || getDatabaseIdHint(item) || 0)
  const sourceIdentity = item?.sourceIdentity || item?.sourceId || makeStableLadySourceIdentity({
    ...item,
    ...(match || {})
  })
  const guarded = {
    ...item,
    sourceId: sourceIdentity,
    sourceIdentity,
    duplicateGuardMode: assessment?.state === 'update' ? 'update-existing' : 'create-or-update',
    duplicateGuardMatchedBy: assessment?.matchedBy || '',
    duplicateGuardNameKey: makePreviewLadyKey(item),
    duplicateGuardIdentityKey: makeLadyStrictIdentityKey(item)
  }

  if (matchedId > 0 && assessment?.state === 'update') {
    guarded.id = matchedId
    guarded.databaseId = matchedId
    guarded.existingDatabaseId = matchedId
    guarded.existingListingId = matchedId
    guarded.targetListingId = matchedId
  }

  return guarded
}

function buildDatabaseSubmissionPlan(payload) {
  const rows = (Array.isArray(payload?.items) ? payload.items : []).map(item => {
    const assessment = assessLadyDatabaseSync(item)
    return {
      item,
      assessment,
      guardedItem: buildDuplicateGuardedSubmissionItem(item, assessment)
    }
  })

  return {
    rows,
    newCount: rows.filter(row => row.assessment.state === 'new').length,
    updateCount: rows.filter(row => row.assessment.state === 'update').length,
    syncedCount: rows.filter(row => row.assessment.state === 'synced').length,
    suspectedCount: rows.filter(row => row.assessment.state === 'suspected').length,
    checkingCount: rows.filter(row => row.assessment.state === 'checking').length,
    itemsToSubmit: rows
      .filter(row => ['new', 'update'].includes(row.assessment.state))
      .map(row => row.guardedItem)
  }
}


function formatSyncLadyName(item) {
  const country = String(item?.country || item?.nationality || item?.nation || '').trim()
  const name = String(item?.name || '').trim()
  if (country && name) return `${country} ${name}`
  return name || country || '未命名'
}

function uniqueDisplayNames(values) {
  const seen = new Set()
  return (Array.isArray(values) ? values : [])
    .map(value => String(value || '').trim())
    .filter(value => {
      if (!value || seen.has(value)) return false
      seen.add(value)
      return true
    })
}

function formatSyncNameList(names) {
  const rows = uniqueDisplayNames(names)
  return rows.length ? rows.join('、') : '無'
}

function getDatabaseIdHintKeys(lady) {
  const keys = []
  const pushKey = value => {
    const key = String(value || '').trim()
    if (key && !keys.includes(key)) keys.push(key)
  }

  pushKey(lady?.sourceIdentity)
  pushKey(lady?.sourceId)
  pushKey(lady?.centralSourceId)
  pushKey(lady?.source_id)
  pushKey(makeStableLadySourceIdentity(lady || {}))
  pushKey(`name:${makePreviewLadyKey(lady || {})}`)

  return keys
}

function rememberDatabaseIdHint(lady, id) {
  const numericId = Number(id || 0)
  if (!Number.isFinite(numericId) || numericId <= 0) return false

  const keys = getDatabaseIdHintKeys(lady)
  if (!keys.length) return false

  const nextMap = { ...databaseIdHintByLadyKey.value }
  keys.forEach(key => {
    nextMap[key] = numericId
  })
  databaseIdHintByLadyKey.value = nextMap
  return true
}

function getDatabaseIdHint(lady) {
  const map = databaseIdHintByLadyKey.value || {}
  for (const key of getDatabaseIdHintKeys(lady)) {
    const id = Number(map[key] || 0)
    if (Number.isFinite(id) && id > 0) return id
  }
  return 0
}

function collectObjectsDeep(value, rows = [], depth = 0) {
  if (depth > 5 || value == null) return rows
  if (Array.isArray(value)) {
    value.forEach(item => collectObjectsDeep(item, rows, depth + 1))
    return rows
  }
  if (typeof value !== 'object') return rows
  rows.push(value)
  Object.values(value).forEach(item => {
    if (item && typeof item === 'object') collectObjectsDeep(item, rows, depth + 1)
  })
  return rows
}

function extractNumericDatabaseId(row) {
  const candidates = [
    row?.ladyId,
    row?.lady_id,
    row?.databaseId,
    row?.database_id,
    row?.dbId,
    row?.db_id,
    row?.listingDatabaseId,
    row?.listing_database_id,
    row?.id
  ]
  for (const value of candidates) {
    const numericId = Number(value || 0)
    if (Number.isFinite(numericId) && numericId > 0) return numericId
  }
  return 0
}

function applyDatabaseIdHintsFromResponse(data, payload = null) {
  const payloadItems = Array.isArray(payload?.items) ? payload.items : []
  const rows = collectObjectsDeep(data)
  let appliedCount = 0

  for (const row of rows) {
    const numericId = extractNumericDatabaseId(row)
    if (!numericId) continue

    const sourceIdentity = row?.sourceIdentity || row?.sourceId || row?.source_id || row?.centralSourceId || ''
    const rowKey = makePreviewLadyKey(row)
    const matchedItem = payloadItems.find(item => {
      const itemSource = item?.sourceIdentity || item?.sourceId || makeStableLadySourceIdentity(item)
      if (sourceIdentity && itemSource && String(sourceIdentity) === String(itemSource)) return true
      return rowKey && makePreviewLadyKey(item) === rowKey
    })

    if (matchedItem) {
      if (rememberDatabaseIdHint(matchedItem, numericId)) appliedCount += 1
    } else if (rowKey) {
      if (rememberDatabaseIdHint(row, numericId)) appliedCount += 1
    }
  }

  return appliedCount
}

function mergeFrontendLadyItems(items = []) {
  const nextById = new Map()
  ;(Array.isArray(frontendLadies.value) ? frontendLadies.value : []).forEach(item => {
    const id = Number(item?.id || 0)
    if (id) nextById.set(id, item)
  })
  ;(Array.isArray(items) ? items : []).forEach(item => {
    const id = Number(item?.id || 0)
    if (id) nextById.set(id, item)
  })
  frontendLadies.value = Array.from(nextById.values())
  if (frontendLadies.value.length) frontendLadiesLoaded.value = true
}

function getPlanItemNamesByState(plan, states = []) {
  const targetStates = new Set(states)
  return (Array.isArray(plan?.rows) ? plan.rows : [])
    .filter(row => targetStates.has(row?.assessment?.state))
    .map(row => formatSyncLadyName(row.item))
}

function getCentralSyncResultRows(centralSync) {
  return Array.isArray(centralSync?.data?.results)
    ? centralSync.data.results
    : Array.isArray(centralSync?.results)
      ? centralSync.results
      : []
}

function getCentralSyncResultNames(centralSync, matcher) {
  return getCentralSyncResultRows(centralSync)
    .filter(row => typeof matcher === 'function' ? matcher(row) : false)
    .map(row => formatSyncLadyName(row))
}

function buildDetailedDatabaseSyncMessage(plan, centralSync = null) {
  // 第 018-136 批：送出前的 02 比對只是預估；真正新增/更新結果以 01 Worker 回傳為準。
  // 01 Worker 的 duplicatePrevented 代表「已防止重複並更新既有主檔」，不是「未建立」。
  // 因此有中央同步結果時，不再把同一位小姐同時列在新增與更新，也不把 duplicatePrevented 列入重複未建立。
  const centralRows = getCentralSyncResultRows(centralSync)
  const hasCentralResult = centralRows.length > 0

  const createdNames = hasCentralResult
    ? uniqueDisplayNames(getCentralSyncResultNames(centralSync, row => row?.status === 'created'))
    : uniqueDisplayNames(getPlanItemNamesByState(plan, ['new']))

  const updatedNames = hasCentralResult
    ? uniqueDisplayNames(getCentralSyncResultNames(centralSync, row => row?.status === 'updated'))
    : uniqueDisplayNames(getPlanItemNamesByState(plan, ['update', 'synced']))

  const suspectedNames = hasCentralResult
    ? uniqueDisplayNames(getCentralSyncResultNames(centralSync, row => row?.status === 'suspected-duplicate'))
    : uniqueDisplayNames(getPlanItemNamesByState(plan, ['suspected']))

  return [
    `同步完成：新增 ${createdNames.length}、更新 ${updatedNames.length}、疑似重複 ${suspectedNames.length}`,
    `新增：${formatSyncNameList(createdNames)}`,
    `更新：${formatSyncNameList(updatedNames)}`,
    `疑似重複需整理：${formatSyncNameList(suspectedNames)}`
  ].join('\n')
}

function countCurrentDocumentDatabaseIds(payload = null) {
  const items = Array.isArray(payload?.items)
    ? payload.items
    : getCurrentDocumentItemsForDetailLookup()

  if (!items.length) return { total: 0, ready: 0, missing: 0 }

  const ready = items.filter(item => {
    const assessment = assessLadyDatabaseSync(item)
    return Boolean(assessment?.match?.id)
  }).length

  return {
    total: items.length,
    ready,
    missing: Math.max(0, items.length - ready)
  }
}

async function loadFrontendLadiesFullFallbackForCurrentDocument(options = {}) {
  const items = await fetchAllPublicLadies({ includeInactive: true, refresh: true })
  frontendLadies.value = items
  frontendLadiesLoaded.value = true
  frontendStatusText.value = `已改用完整清單重新讀取 ${items.length} 筆小姐，補抓本次文件的資料庫 ID。`
  return true
}

async function fetchPublicLadiesByKeyword(keyword, options = {}) {
  const text = String(keyword || '').trim()
  if (!text) return []

  const query = new URLSearchParams({
    keyword: text,
    page: '1',
    pageSize: '60',
    includeInactive: '1',
    cacheBust: String(Date.now())
  })

  const response = await fetch(
    `${apiBaseUrl.value}/api/public/ladies?${query.toString()}`,
    { cache: 'no-store' }
  )
  const data = await response.json().catch(() => ({}))

  if (!response.ok || data.ok === false) {
    throw new Error(data.message || `HTTP ${response.status}`)
  }

  return Array.isArray(data.items) ? data.items : []
}

async function lookupDatabaseIdForPreviewLady(previewLady, options = {}) {
  if (!previewLady) return 0

  const hintedId = getDatabaseIdHint(previewLady)
  if (hintedId) return hintedId

  const key = makePreviewLadyKey(previewLady)
  const existingMatches = frontendLadies.value.filter(item => makePreviewLadyKey(item) === key)
  if (existingMatches.length === 1) {
    const id = Number(existingMatches[0]?.id || 0)
    if (id) {
      rememberDatabaseIdHint(previewLady, id)
      return id
    }
  }

  const keywords = uniqueDisplayNames([previewLady.name, `${previewLady.country || previewLady.nationality || ''} ${previewLady.name || ''}`])
  for (const keyword of keywords) {
    try {
      const items = await fetchPublicLadiesByKeyword(keyword, { refresh: true })
      mergeFrontendLadyItems(items)
      const matches = items.filter(item => makePreviewLadyKey(item) === key)
      if (matches.length === 1) {
        const id = Number(matches[0]?.id || 0)
        if (id) {
          rememberDatabaseIdHint(previewLady, id)
          return id
        }
      }
    } catch (error) {
      console.warn(`用關鍵字「${keyword}」補抓資料庫 ID 失敗：`, error)
    }
  }

  return 0
}

async function refreshFrontendLadiesUntilDocumentIdsReady(payload = null, options = {}) {
  const maxAttempts = Math.max(1, Number(options.maxAttempts || 3))
  const retryDelayMs = Math.max(250, Number(options.retryDelayMs || 700))
  let lastSummary = countCurrentDocumentDatabaseIds(payload)

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    await loadFrontendLadies({ silent: true, refresh: true })
    lastSummary = countCurrentDocumentDatabaseIds(payload)
    if (!lastSummary.missing) return lastSummary

    try {
      await loadFrontendLadiesFullFallbackForCurrentDocument({ silent: true })
      lastSummary = countCurrentDocumentDatabaseIds(payload)
      if (!lastSummary.missing) return lastSummary
    } catch (error) {
      console.warn('完整清單補抓本次文件資料庫 ID 失敗：', error)
    }

    if (attempt < maxAttempts) await new Promise(resolve => window.setTimeout(resolve, retryDelayMs))
  }

  return lastSummary
}

async function resolvePreviewLadyToDatabaseId(previewLadyId) {
  const previewId = String(previewLadyId || '')
  if (!previewId || !isCurrentDocumentPreviewLadyId(previewId)) return Number(previewLadyId || 0) || 0

  const previewLady = currentDocumentPreviewLadies.value.find(lady => String(lady.id) === previewId)
  if (!previewLady) return 0

  let matchedId = await lookupDatabaseIdForPreviewLady(previewLady, { refresh: true })
  if (matchedId) return matchedId

  await refreshFrontendLadiesUntilDocumentIdsReady({ items: [previewLady] }, { maxAttempts: 3, retryDelayMs: 650 })
  matchedId = await lookupDatabaseIdForPreviewLady(previewLady, { refresh: true })
  return matchedId || 0
}


function normalizeMediaRecordForPreview(media, fallback = {}) {
  const url = String(media?.url || media?.publicUrl || media?.public_url || media?.href || '').trim()
  if (!url) return null
  const mediaType = resolveMediaTypeFromRecord(media, fallback, url)

  return {
    id: media?.id || media?.mediaId || media?.media_id || media?.key || url,
    url,
    mediaType,
    caption: String(media?.caption || media?.note || media?.name || fallback.caption || '').trim(),
    note: String(media?.note || media?.caption || media?.name || fallback.caption || '').trim(),
    sortOrder: Number(media?.sortOrder ?? media?.sort_order ?? fallback.sortOrder ?? 999),
    isCover: Boolean(media?.isCover ?? media?.is_cover ?? fallback.isCover ?? false),
    isLocalUploadBound: Boolean(fallback.isLocalUploadBound)
  }
}

function resolveMediaTypeFromRecord(media = {}, fallback = {}, url = '') {
  const explicitType = String(media?.mediaType || media?.media_type || media?.type || fallback.mediaType || '').toLowerCase()
  if (explicitType.startsWith('video')) return 'video'
  if (explicitType.startsWith('image')) return 'image'

  const cleanUrl = String(url || media?.url || media?.publicUrl || media?.public_url || '')
    .split('?')[0]
    .split('#')[0]
    .toLowerCase()
  if (/\.(mp4|webm|mov|m4v|avi|mkv)$/.test(cleanUrl)) return 'video'
  return 'image'
}

function getLocalUploadedMediaKeysForLady(lady, hintedDatabaseId = '') {
  const keys = []
  const rawId = String(lady?.id || hintedDatabaseId || '').trim()
  if (rawId) keys.push(`id:${rawId}`)

  const sourceIdentity = lady?.sourceIdentity || lady?.sourceId || makeStableLadySourceIdentity(lady)
  if (sourceIdentity) keys.push(`source:${sourceIdentity}`)

  const previewKey = makePreviewLadyKey(lady)
  if (previewKey) keys.push(`key:${previewKey}`)

  return Array.from(new Set(keys.filter(Boolean)))
}


function getCentralWebsiteMediaKeysForLady(lady, hintedDatabaseId = 0) {
  return getLocalUploadedMediaKeysForLady(lady, hintedDatabaseId)
}

function getTargetLadyForMediaKey(ladyOrId, previewLady = null) {
  if (ladyOrId && typeof ladyOrId === 'object') return ladyOrId
  return previewLady ||
    frontendLadies.value.find(item => String(item?.id || '') === String(ladyOrId || '')) ||
    currentDocumentPreviewLadies.value.find(item => String(item?.id || '') === String(ladyOrId || '')) ||
    null
}

function getMediaKeysForTarget(ladyOrId, previewLady = null) {
  const targetLady = getTargetLadyForMediaKey(ladyOrId, previewLady)
  if (targetLady) return getCentralWebsiteMediaKeysForLady(targetLady, ladyOrId || targetLady?.id || '')
  const rawId = String(ladyOrId || '').trim()
  return rawId ? [`id:${rawId}`] : []
}

function setCentralWebsiteMediaForLady(ladyOrId, mediaItems = [], previewLady = null) {
  const normalizedItems = mergeMediaRecords([], mediaItems)
  const keys = getMediaKeysForTarget(ladyOrId, previewLady)
  if (!keys.length) return normalizedItems.length

  const next = { ...centralWebsiteMediaByLadyKey.value }
  keys.forEach(key => {
    next[key] = normalizedItems
  })
  centralWebsiteMediaByLadyKey.value = next

  const targetId = String(ladyOrId || previewLady?.id || '').trim()
  if (targetId) {
    frontendLadies.value = frontendLadies.value.map(item => {
      if (String(item?.id || '') !== targetId) return item
      return { ...item, media: normalizedItems, mediaCount: normalizedItems.length }
    })
  }

  return normalizedItems.length
}

function getCentralWebsiteMediaSnapshotForLady(lady, hintedDatabaseId = 0) {
  const keys = getCentralWebsiteMediaKeysForLady(lady, hintedDatabaseId)
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(centralWebsiteMediaByLadyKey.value, key)) {
      return mergeMediaRecords([], centralWebsiteMediaByLadyKey.value[key] || [])
    }
  }
  return null
}

function getLocalUploadedMediaForLady(lady, hintedDatabaseId = 0) {
  const keys = getLocalUploadedMediaKeysForLady(lady, hintedDatabaseId)
  const merged = []
  const seen = new Set()

  keys.forEach(key => {
    const items = Array.isArray(localUploadedMediaByLadyId.value[key])
      ? localUploadedMediaByLadyId.value[key]
      : []
    items.forEach(item => {
      const normalized = normalizeMediaRecordForPreview(item)
      if (!normalized || shouldSuppressDeletedMediaForLady(lady, normalized, hintedDatabaseId) || seen.has(normalized.url)) return
      seen.add(normalized.url)
      merged.push(normalized)
    })
  })

  return merged
}

function mergeMediaRecords(existing = [], incoming = []) {
  const merged = []
  const seen = new Set()

  ;[...(Array.isArray(existing) ? existing : []), ...(Array.isArray(incoming) ? incoming : [])]
    .map(item => normalizeMediaRecordForPreview(item))
    .filter(Boolean)
    .forEach(item => {
      if (seen.has(item.url)) return
      seen.add(item.url)
      merged.push(item)
    })

  return merged
}


// 第 018-122 批：媒體重複判斷。
// 同一位小姐重複上傳同一張圖 / 同一支影片時，先用檔名、caption、URL 檔名擋掉，避免前台輪播越疊越多。
function normalizeMediaDuplicateToken(value) {
  const text = String(value || '')
    .trim()
    .replace(/\+/g, '/')
    .split('?')[0]
    .split('#')[0]
  if (!text) return ''

  const tail = text.includes('/') ? text.split('/').filter(Boolean).pop() : text
  let decoded = tail || text
  try {
    decoded = decodeURIComponent(decoded)
  } catch (_error) {
    decoded = tail || text
  }

  return String(decoded || '')
    .toLowerCase()
    .replace(/\s+/g, '')
}

function getMediaDuplicateTokens(media) {
  const tokens = []
  ;[
    media?.url,
    media?.caption,
    media?.note,
    media?.name,
    media?.fileName,
    media?.filename
  ].forEach(value => {
    const token = normalizeMediaDuplicateToken(value)
    if (token) tokens.push(token)
  })
  return Array.from(new Set(tokens))
}

function loadDeletedMediaSuppressionMap() {
  try {
    const parsed = JSON.parse(localStorage.getItem(DELETED_MEDIA_SUPPRESSION_STORAGE_KEY) || '{}')
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch (_error) {
    return {}
  }
}

function saveDeletedMediaSuppressionMap() {
  try {
    localStorage.setItem(DELETED_MEDIA_SUPPRESSION_STORAGE_KEY, JSON.stringify(deletedMediaSuppressionByLadyKey.value || {}))
  } catch (_error) {
    // localStorage 滿了也不阻斷刪除流程。
  }
}

function getDeletedMediaSuppressionTokensForLady(lady, hintedDatabaseId = 0) {
  const keys = getLocalUploadedMediaKeysForLady(lady, hintedDatabaseId)
  const tokens = []
  keys.forEach(key => {
    const items = Array.isArray(deletedMediaSuppressionByLadyKey.value[key])
      ? deletedMediaSuppressionByLadyKey.value[key]
      : []
    items.forEach(token => {
      const normalized = normalizeMediaDuplicateToken(token)
      if (normalized) tokens.push(normalized)
    })
  })
  return new Set(tokens)
}

function shouldSuppressDeletedMediaForLady(lady, media, hintedDatabaseId = 0) {
  const suppressed = getDeletedMediaSuppressionTokensForLady(lady, hintedDatabaseId)
  if (!suppressed.size) return false
  return getMediaDuplicateTokens(media).some(token => suppressed.has(token))
}

function filterDeletedSuppressedMediaForLady(lady, mediaItems = [], hintedDatabaseId = 0) {
  return (Array.isArray(mediaItems) ? mediaItems : [])
    .map(item => normalizeMediaRecordForPreview(item))
    .filter(Boolean)
    .filter(item => !shouldSuppressDeletedMediaForLady(lady, item, hintedDatabaseId))
}

function rememberDeletedMediaForLady(ladyOrId, mediaToRemove, previewLady = null) {
  const normalized = normalizeMediaRecordForPreview(mediaToRemove)
  if (!normalized) return

  const targetLady = typeof ladyOrId === 'object'
    ? ladyOrId
    : (
        previewLady ||
        frontendLadies.value.find(item => String(item?.id || '') === String(ladyOrId || '')) ||
        currentDocumentPreviewLadies.value.find(item => String(item?.id || '') === String(ladyOrId || '')) ||
        null
      )

  const keys = targetLady
    ? getLocalUploadedMediaKeysForLady(targetLady, ladyOrId || targetLady?.id || '')
    : [`id:${ladyOrId}`]

  const tokens = getMediaDuplicateTokens(normalized)
  if (!tokens.length) return

  const next = { ...deletedMediaSuppressionByLadyKey.value }
  keys.forEach(key => {
    const current = Array.isArray(next[key]) ? next[key] : []
    next[key] = Array.from(new Set([...current, ...tokens])).slice(-200)
  })
  deletedMediaSuppressionByLadyKey.value = next
  saveDeletedMediaSuppressionMap()
}

function clearDeletedMediaSuppressionForLadyMedia(ladyOrId, mediaItems = [], previewLady = null) {
  const normalizedItems = (Array.isArray(mediaItems) ? mediaItems : [])
    .map(item => normalizeMediaRecordForPreview(item))
    .filter(Boolean)
  if (!normalizedItems.length) return

  const targetLady = typeof ladyOrId === 'object'
    ? ladyOrId
    : (
        previewLady ||
        frontendLadies.value.find(item => String(item?.id || '') === String(ladyOrId || '')) ||
        currentDocumentPreviewLadies.value.find(item => String(item?.id || '') === String(ladyOrId || '')) ||
        null
      )
  const keys = targetLady
    ? getLocalUploadedMediaKeysForLady(targetLady, ladyOrId || targetLady?.id || '')
    : [`id:${ladyOrId}`]
  const uploadedTokens = new Set(normalizedItems.flatMap(getMediaDuplicateTokens))
  if (!uploadedTokens.size) return

  const next = { ...deletedMediaSuppressionByLadyKey.value }
  let changed = false
  keys.forEach(key => {
    if (!Array.isArray(next[key])) return
    const filtered = next[key].filter(token => !uploadedTokens.has(normalizeMediaDuplicateToken(token)))
    if (filtered.length !== next[key].length) {
      next[key] = filtered
      changed = true
    }
  })
  if (changed) {
    deletedMediaSuppressionByLadyKey.value = next
    saveDeletedMediaSuppressionMap()
  }
}

function getLadyAllMediaForDuplicateCheck(lady) {
  // 第 018-133 批：媒體重複判斷只能使用「已經存在於資料庫 / 中央網站」的權威媒體。
  // 不能再拿 localUploadedMediaByLadyId 暫存資料判斷，否則上次失敗或舊暫存會造成「尚未上傳卻略過重複」。
  if (!lady) return []
  const centralMedia = getCentralWebsiteMediaSnapshotForLady(lady, lady?.id || '')
  if (centralMedia !== null) return mergeMediaRecords([], centralMedia)
  return mergeMediaRecords([], Array.isArray(lady?.media) ? lady.media : [])
}

function isMediaUploadFileAlreadyBoundToLady(file, lady) {
  // 第 018-133 批：瀏覽器端不再用檔名 / caption 預先略過。
  // 很多手機圖片會同名，若只靠檔名會把新圖片誤判成重複，導致 01 後台沒有圖片。
  // 真正的重複媒體交給 01 Worker 以「已上傳後的 R2 URL」判斷。
  if (!file || !lady) return false
  return false
}

function removeMediaFromLocalPreview(ladyOrId, mediaToRemove, previewLady = null) {
  rememberDeletedMediaForLady(ladyOrId, mediaToRemove, previewLady)
  const removeId = String(mediaToRemove?.id || mediaToRemove?.mediaId || mediaToRemove?.media_id || '')
  const removeUrl = String(mediaToRemove?.url || mediaToRemove?.publicUrl || mediaToRemove?.public_url || '').trim()
  if (!removeId && !removeUrl) return

  const shouldKeep = item => {
    const itemId = String(item?.id || item?.mediaId || item?.media_id || '')
    const itemUrl = String(item?.url || item?.publicUrl || item?.public_url || '').trim()
    if (removeId && itemId && itemId === removeId) return false
    if (removeUrl && itemUrl && itemUrl === removeUrl) return false
    return true
  }

  const targetLady = typeof ladyOrId === 'object'
    ? ladyOrId
    : (
        previewLady ||
        frontendLadies.value.find(item => String(item?.id || '') === String(ladyOrId || '')) ||
        currentDocumentPreviewLadies.value.find(item => String(item?.id || '') === String(ladyOrId || '')) ||
        null
      )

  const keys = targetLady
    ? getLocalUploadedMediaKeysForLady(targetLady, ladyOrId || targetLady?.id || '')
    : [`id:${ladyOrId}`]

  const next = { ...localUploadedMediaByLadyId.value }
  keys.forEach(key => {
    if (!Array.isArray(next[key])) return
    next[key] = next[key].filter(shouldKeep)
  })
  localUploadedMediaByLadyId.value = next

  const targetId = String(ladyOrId || targetLady?.id || '').trim()
  if (targetId) {
    frontendLadies.value = frontendLadies.value.map(item => {
      if (String(item?.id || '') !== targetId) return item
      const media = Array.isArray(item.media) ? item.media.filter(shouldKeep) : []
      return { ...item, media, mediaCount: media.length }
    })
  }
}

function isSameMediaRecordForDelete(item, target) {
  const itemMedia = normalizeMediaRecordForPreview(item)
  const targetMedia = normalizeMediaRecordForPreview(target)
  if (!itemMedia || !targetMedia) return false

  const itemId = String(itemMedia.id || '')
  const targetId = String(targetMedia.id || '')
  if (itemId && targetId && itemId === targetId) return true

  if (itemMedia.url && targetMedia.url && itemMedia.url === targetMedia.url) return true

  const targetTokens = new Set(getMediaDuplicateTokens(targetMedia))
  if (!targetTokens.size) return false
  return getMediaDuplicateTokens(itemMedia).some(token => targetTokens.has(token))
}

function getRemainingMediaAfterDelete(mediaItems = [], mediaToRemove = null) {
  return mergeMediaRecords([], mediaItems)
    .filter(item => !isSameMediaRecordForDelete(item, mediaToRemove))
    .map((item, index) => ({
      ...item,
      sortOrder: index + 1,
      isCover: index === 0
    }))
}

function getBestMediaSnapshotForLady(detail, lady, previewLady) {
  return mergeMediaRecords(
    [],
    [
      ...(Array.isArray(detail?.media) ? detail.media : []),
      ...(Array.isArray(lady?.media) ? lady.media : []),
      ...(Array.isArray(previewLady?.media) ? previewLady.media : [])
    ]
  )
}

async function syncRemainingMediaSnapshotToCentralWebsite(detail, lady, previewLady, remainingMedia) {
  const baseItem = detail || lady || previewLady || {}
  const syncItem = buildCentralWebsiteSyncItem(
    {
      ...baseItem,
      media: remainingMedia,
      mediaCount: remainingMedia.length,
      replaceMedia: true,
      mediaReplaceMode: 'replace'
    },
    previewLady || lady || null
  )

  syncItem.media = remainingMedia
  syncItem.mediaCount = remainingMedia.length
  syncItem.replaceMedia = true
  syncItem.mediaReplaceMode = 'replace'

  return postCentralWebsiteSyncItems([syncItem], {
    maxAttempts: 1,
    timeoutMs: CENTRAL_WEBSITE_SYNC_TIMEOUT_MS
  })
}


// 第 018-124 批：媒體刪除 / 綁定後只更新目前小姐，並以中央刪除結果抑制 converter 舊媒體回彈。
function updateMediaForLocalPreview(ladyOrId, mediaItems = [], previewLady = null, mode = 'merge') {
  const normalizedItems = mergeMediaRecords([], mediaItems)
  if (mode !== 'replace') clearDeletedMediaSuppressionForLadyMedia(ladyOrId, normalizedItems, previewLady)
  const targetLady = typeof ladyOrId === 'object'
    ? ladyOrId
    : (
        previewLady ||
        frontendLadies.value.find(item => String(item?.id || '') === String(ladyOrId || '')) ||
        currentDocumentPreviewLadies.value.find(item => String(item?.id || '') === String(ladyOrId || '')) ||
        null
      )

  const keys = targetLady
    ? getLocalUploadedMediaKeysForLady(targetLady, ladyOrId || targetLady?.id || '')
    : [`id:${ladyOrId}`]

  const next = { ...localUploadedMediaByLadyId.value }
  keys.forEach(key => {
    next[key] = mode === 'replace'
      ? normalizedItems
      : mergeMediaRecords(next[key] || [], normalizedItems)
  })
  localUploadedMediaByLadyId.value = next

  const targetId = String(ladyOrId || targetLady?.id || '').trim()
  if (targetId) {
    frontendLadies.value = frontendLadies.value.map(item => {
      if (String(item?.id || '') !== targetId) return item
      const nextMedia = mode === 'replace'
        ? normalizedItems
        : mergeMediaRecords(item.media || [], normalizedItems)
      return { ...item, media: nextMedia, mediaCount: nextMedia.length }
    })
  }

  return normalizedItems.length
}

function mergeUploadedMediaIntoLocalPreview(ladyOrId, mediaItems = [], previewLady = null) {
  const normalizedItems = (Array.isArray(mediaItems) ? mediaItems : [])
    .map(item => normalizeMediaRecordForPreview(item, { isLocalUploadBound: true }))
    .filter(Boolean)
  if (!normalizedItems.length) return 0
  clearDeletedMediaSuppressionForLadyMedia(ladyOrId, normalizedItems, previewLady)

  const targetLady = typeof ladyOrId === 'object'
    ? ladyOrId
    : (
        previewLady ||
        frontendLadies.value.find(item => String(item?.id || '') === String(ladyOrId || '')) ||
        currentDocumentPreviewLadies.value.find(item => String(item?.id || '') === String(ladyOrId || '')) ||
        null
      )

  const keys = targetLady
    ? getLocalUploadedMediaKeysForLady(targetLady, ladyOrId || targetLady?.id || '')
    : [`id:${ladyOrId}`]

  const next = { ...localUploadedMediaByLadyId.value }
  keys.forEach(key => {
    next[key] = mergeMediaRecords(next[key] || [], normalizedItems)
  })
  localUploadedMediaByLadyId.value = next

  const targetId = String(ladyOrId || targetLady?.id || '').trim()
  if (targetId) {
    frontendLadies.value = frontendLadies.value.map(item => {
      if (String(item?.id || '') !== targetId) return item
      return {
        ...item,
        media: mergeMediaRecords(item.media || [], normalizedItems),
        mediaCount: mergeMediaRecords(item.media || [], normalizedItems).length
      }
    })
  }

  return normalizedItems.length
}

function collectMediaObjectsFromUploadResponse(value, rows = [], depth = 0) {
  if (depth > 5 || value == null) return rows
  if (Array.isArray(value)) {
    value.forEach(item => collectMediaObjectsFromUploadResponse(item, rows, depth + 1))
    return rows
  }
  if (typeof value !== 'object') return rows

  const normalized = normalizeMediaRecordForPreview(value)
  if (normalized) rows.push(normalized)

  Object.values(value).forEach(item => {
    if (item && typeof item === 'object') collectMediaObjectsFromUploadResponse(item, rows, depth + 1)
  })

  return rows
}

function buildFallbackUploadedMediaFromResponse(data, file, index = 0) {
  const rows = collectMediaObjectsFromUploadResponse(data)
  const uniqueRows = mergeMediaRecords([], rows)
  if (uniqueRows.length) return uniqueRows.map((item, itemIndex) => ({
    ...item,
    note: item.note || item.caption || file?.name || '',
    caption: item.caption || item.note || file?.name || '',
    sortOrder: Number(item.sortOrder || index + itemIndex + 1),
    isCover: Boolean(item.isCover || (index === 0 && itemIndex === 0))
  }))

  return []
}

async function bindUploadedMediaDirectlyToCentralWebsite(ladyId, mediaItems = [], options = {}) {
  const id = Number(ladyId || 0)
  const normalizedMedia = mergeMediaRecords([], mediaItems)
  if (!id || !normalizedMedia.length) {
    return { ok: false, skipped: true, message: '沒有可直接綁定中央網站的媒體。' }
  }

  const detail = await fetchPublicLadyDetail(id, { refresh: true })
  if (!detail) throw new Error('直接綁定中央網站媒體失敗：讀不到目前小姐完整資料。')

  const previewLady = options.previewLady || currentDocumentPreviewLadies.value.find(lady => String(lady.id || '') === String(id)) || null
  const syncItem = buildCentralWebsiteSyncItem(detail, previewLady)
  const accessToken = await getCentralWebsiteAccessToken()

  const { response, data } = await fetchJsonWithTimeout(
    `${CENTRAL_WEBSITE_API_BASE_URL}/api/integrations/converter/central-listings/media/bind`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Converter-Apikey': SUPABASE_PUBLIC_API_KEY
      },
      body: JSON.stringify({
        item: syncItem,
        sourceIdentity: syncItem.sourceIdentity || syncItem.sourceId || '',
        media: normalizedMedia
      })
    },
    Number(options.timeoutMs || CENTRAL_WEBSITE_SYNC_TIMEOUT_MS),
    '中央網站媒體直接綁定失敗'
  )

  if (!response.ok || data.ok === false) {
    throw new Error(data.message || data.error || `中央網站媒體直接綁定失敗：HTTP ${response.status}`)
  }

  const serverMedia = mergeMediaRecords([], data?.data?.media || data?.media || [])
  if (serverMedia.length || Array.isArray(data?.data?.media) || Array.isArray(data?.media)) {
    setCentralWebsiteMediaForLady(id, serverMedia, previewLady)
    updateMediaForLocalPreview(id, serverMedia, previewLady, 'replace')
  } else {
    mergeUploadedMediaIntoLocalPreview(id, normalizedMedia, previewLady)
    await fetchCentralWebsiteMediaForLady(previewLady || detail || { id }, { previewLady, allowMissing: true }).catch(() => null)
  }
  return data
}

async function fetchCentralWebsiteMediaForLady(lady, options = {}) {
  if (!lady) return []

  const previewLady = options.previewLady || lady
  const syncItem = buildCentralWebsiteSyncItem(lady, previewLady)
  const accessToken = await getCentralWebsiteAccessToken()
  const { response, data } = await fetchJsonWithTimeout(
    `${CENTRAL_WEBSITE_API_BASE_URL}/api/integrations/converter/central-listings/media/lookup`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Converter-Apikey': SUPABASE_PUBLIC_API_KEY
      },
      body: JSON.stringify({
        item: syncItem,
        sourceIdentity: syncItem.sourceIdentity || syncItem.sourceId || lady?.sourceIdentity || '',
        listingId: syncItem.centralListingId || syncItem.listingId || lady?.centralListingId || lady?.listingId || ''
      })
    },
    Number(options.timeoutMs || CENTRAL_WEBSITE_SYNC_TIMEOUT_MS),
    '讀取中央網站媒體清單失敗'
  )

  if (!response.ok || data.ok === false) {
    if (options.allowMissing && [404, 409].includes(Number(response.status || 0))) {
      return []
    }
    throw new Error(data.message || data.error || `讀取中央網站媒體清單失敗：HTTP ${response.status}`)
  }

  const serverMedia = mergeMediaRecords([], data?.data?.media || data?.media || [])
  setCentralWebsiteMediaForLady(lady, serverMedia, previewLady)
  return serverMedia
}

async function refreshCentralWebsiteMediaForCurrentDocument(options = {}) {
  const ladies = currentDocumentPreviewLadies.value
  if (!Array.isArray(ladies) || !ladies.length) return { total: 0, refreshed: 0, failed: 0 }

  let refreshed = 0
  let failed = 0
  for (const lady of ladies.slice(0, 80)) {
    try {
      await fetchCentralWebsiteMediaForLady(lady, {
        allowMissing: true,
        timeoutMs: options.timeoutMs || 9000
      })
      refreshed += 1
    } catch (error) {
      failed += 1
      if (!options.silent) console.warn('讀取中央網站媒體清單失敗：', error)
    }
  }

  return { total: ladies.length, refreshed, failed }
}


const currentDocumentPreviewLadies = computed(() => {
  const text = String(jsonResultText.value || '').trim()
  if (!text) return []

  try {
    const parsed = JSON.parse(text)
    const items = Array.isArray(parsed?.items) ? parsed.items : []
    return items.map((item, index) => {
      const body = item.body || {}
      const assessment = assessLadyDatabaseSync(item)
      const dbLady = assessment.match
      const hintedDatabaseId = getDatabaseIdHint(item)
      const centralMediaSnapshot = getCentralWebsiteMediaSnapshotForLady(item, hintedDatabaseId)

      return {
        id: dbLady?.id || hintedDatabaseId || `current-document-${index + 1}`,
        isCurrentDocumentPreview: true,
        country: item.country || '',
        name: item.name || '',
        city: item.city || '',
        district: item.district || '',
        mode: item.mode || '',
        room: item.room || '',
        sourceRoom: item.sourceRoom || '',
        sourceIdentity: item.sourceIdentity || makeStableLadySourceIdentity(item),
        location: item.location || '',
        locationInfo: item.locationInfo || {},
        syncState: assessment.state,
        syncStateLabel: assessment.label,
        syncStateMessage: assessment.message,
        height: body.height ?? '',
        weight: body.weight ?? '',
        cup: body.cup || '',
        age: body.age ?? '',
        rawText: item.rawText || '',
        media: centralMediaSnapshot !== null
          ? centralMediaSnapshot
          : mergeMediaRecords(
              filterDeletedSuppressedMediaForLady(item, Array.isArray(dbLady?.media) ? dbLady.media : [], hintedDatabaseId),
              getLocalUploadedMediaForLady(item, hintedDatabaseId)
            ),
        pricePlans: Array.isArray(item.pricePlans)
          ? item.pricePlans.map((plan, planIndex) => ({
              id: `current-document-${index + 1}-price-${planIndex + 1}`,
              priceText: plan.priceText || ''
            }))
          : [],
        services: Array.isArray(item.services)
          ? item.services.map((service, serviceIndex) => ({
              id: `current-document-${index + 1}-service-${serviceIndex + 1}`,
              serviceName: String(service || '').trim()
            })).filter(service => service.serviceName)
          : []
      }
    })
  } catch (_error) {
    return []
  }
})

const previewLadies = computed(() => currentDocumentPreviewLadies.value)

function getMediaUploadLadySessionMedia(lady) {
  if (!lady) return []
  return getLocalUploadedMediaForLady(lady, lady?.id || '')
}

function getMediaUploadLadyAllMedia(lady) {
  if (!lady) return []
  return mergeMediaRecords([], Array.isArray(lady?.media) ? lady.media : [])
}

function countMediaByType(mediaItems = [], mediaType = '') {
  return (Array.isArray(mediaItems) ? mediaItems : []).filter(item => String(item?.mediaType || '') === mediaType).length
}

function getMediaUploadLadyStatusMeta(lady) {
  const sessionMedia = getMediaUploadLadySessionMedia(lady)
  const allMedia = getMediaUploadLadyAllMedia(lady)
  const imageCount = countMediaByType(allMedia, 'image')
  const videoCount = countMediaByType(allMedia, 'video')
  const hasSessionUpload = sessionMedia.length > 0
  const hasAnyMedia = allMedia.length > 0
  let statusRank = 2
  let statusText = '未上傳'

  if (hasSessionUpload) {
    statusRank = 0
    statusText = '本次已上傳'
  } else if (hasAnyMedia) {
    statusRank = 1
    statusText = '已有媒體'
  }

  return {
    statusRank,
    statusText,
    imageCount,
    videoCount,
  }
}

function getDisplayWidth(text = '') {
  return Array.from(String(text || '')).reduce((total, char) => {
    return total + (/[^\u0000-\u00ff]/.test(char) ? 2 : 1)
  }, 0)
}

function padDisplayText(text = '', targetWidth = 20) {
  const source = String(text || '').trim()
  let output = source
  const currentWidth = getDisplayWidth(source)
  const widthToFill = Math.max(0, targetWidth - currentWidth)
  const fullWidthSpaces = Math.floor(widthToFill / 2)
  const halfWidthSpace = widthToFill % 2

  if (fullWidthSpaces > 0) output += '　'.repeat(fullWidthSpaces)
  if (halfWidthSpace > 0) output += ' '
  return output
}

function formatMediaUploadLadyOptionLabel(lady) {
  if (!lady) return '請選擇小姐'
  const meta = getMediaUploadLadyStatusMeta(lady)
  const ladyLabel = `【${String(lady?.country || '').trim()} ${String(lady?.name || '').trim()}】`
  const paddedLabel = padDisplayText(ladyLabel, 20)
  return `[${meta.statusText}] ${paddedLabel} 圖${meta.imageCount}｜影${meta.videoCount}`
}

const mediaUploadLadyOptions = computed(() => {
  return currentDocumentPreviewLadies.value
    .map((lady, index) => ({ lady, index, meta: getMediaUploadLadyStatusMeta(lady) }))
    .sort((a, b) => {
      if (a.meta.statusRank !== b.meta.statusRank) return a.meta.statusRank - b.meta.statusRank
      return a.index - b.index
    })
    .map(item => item.lady)
})

const currentDocumentSyncSummary = computed(() => {
  const ladies = currentDocumentPreviewLadies.value
  return {
    total: ladies.length,
    newCount: ladies.filter(lady => lady.syncState === 'new').length,
    updateCount: ladies.filter(lady => lady.syncState === 'update').length,
    syncedCount: ladies.filter(lady => lady.syncState === 'synced').length,
    suspectedCount: ladies.filter(lady => lady.syncState === 'suspected').length,
    checkingCount: ladies.filter(lady => lady.syncState === 'checking').length
  }
})

const databaseSubmitButtonText = computed(() => {
  if (isDatabaseSubmitting.value) return '送出中...'

  const summary = currentDocumentSyncSummary.value
  if (!summary.total) return '送出本次文件3到資料庫'
  if (summary.checkingCount) return '先讀取資料庫比對'
  if (summary.suspectedCount) return '發現疑似重複，已暫停'
  if (!summary.newCount && !summary.updateCount) return '確認已同步（不重複新增）'
  return `送出：新增 ${summary.newCount}／更新 ${summary.updateCount}`
})

const databaseSyncSummaryText = computed(() => {
  const summary = currentDocumentSyncSummary.value
  if (!summary.total) return '尚未產生本次文件3。'
  if (summary.checkingCount) return `正在比對本次 ${summary.total} 筆小姐...`
  return `本次比對：新增 ${summary.newCount}、更新 ${summary.updateCount}、已同步 ${summary.syncedCount}、疑似重複 ${summary.suspectedCount}。`
})

const consistencyReportRows = computed(() => (Array.isArray(consistencyReport.value?.items) ? consistencyReport.value.items : []))

function shortId(value) {
  const text = String(value || '').trim()
  if (!text) return ''
  return text.length > 8 ? `${text.slice(0, 8)}...` : text
}

function duplicateRowKey(row) {
  return [
    String(row?.sourceId || row?.source_id || ''),
    String(row?.nationality || row?.country || ''),
    String(row?.name || ''),
    String(row?.city || ''),
    String(row?.district || ''),
  ].join('|') || `row-${Math.random().toString(36).slice(2)}`
}

function getDuplicateCandidates(row) {
  return Array.isArray(row?.candidates) ? row.candidates.filter(candidate => candidate?.id) : []
}

function applyDuplicateCandidateDefaults(report = consistencyReport.value) {
  const rows = Array.isArray(report?.items) ? report.items : []
  const next = { ...selectedDuplicateOfficialMap.value }
  for (const row of rows) {
    if (row?.status !== 'duplicate') continue
    const candidates = getDuplicateCandidates(row)
    if (!candidates.length) continue
    const key = duplicateRowKey(row)
    if (next[key] && candidates.some(candidate => candidate.id === next[key])) continue
    const best = [...candidates].sort((a, b) => Number(b.mediaCount || 0) - Number(a.mediaCount || 0))[0]
    next[key] = best?.id || candidates[0].id
  }
  selectedDuplicateOfficialMap.value = next
}

function findPreviewLadyFromConsistencyRow(row) {
  const targetName = String(row?.name || '').trim()
  const targetCountry = String(row?.nationality || row?.country || '').trim()
  if (!targetName) return null
  return currentDocumentPreviewLadies.value.find((lady) => (
    String(lady?.name || '').trim() === targetName &&
    (!targetCountry || String(lady?.country || '').trim() === targetCountry)
  )) || null
}

function openMediaUploadModalFromConsistency(row) {
  const lady = findPreviewLadyFromConsistencyRow(row)
  if (!lady) {
    duplicateResolveStatusType.value = 'warning'
    duplicateResolveStatusText.value = '找不到這位小姐的本次文件卡片，請先確認文件3仍有這筆資料。'
    return
  }
  closeConsistencyCheckModal()
  openMediaUploadModalForLady(lady)
}

function openConsistencyCheckModal() {
  isConsistencyCheckModalOpen.value = true
  if (!consistencyReport.value && currentDocumentPreviewLadies.value.length && !isConsistencyChecking.value) {
    runConsistencyCheck()
  }
}

function closeConsistencyCheckModal() {
  isConsistencyCheckModalOpen.value = false
}

function resetConsistencyCheckStatus() {
  consistencyReport.value = null
  selectedDuplicateOfficialMap.value = {}
  duplicateResolveStatusText.value = ''
  duplicateResolveStatusType.value = 'info'
  consistencyStatusText.value = '尚未檢查資料一致性。'
  consistencyStatusType.value = 'info'
}

watch(currentDocumentPreviewLadies, () => {
  resetConsistencyCheckStatus()
})

watch(databaseSyncSummaryText, message => {
  if (!isDatabaseSubmitting.value && ['info', 'success'].includes(databaseSubmitStatusType.value)) {
    setDatabaseSubmitFeedback(message, 'info')
  }
}, { immediate: true })

const previewStatusText = computed(() => {
  if (currentDocumentPreviewLadies.value.length) {
    return `目前只顯示本次文件最新 ${currentDocumentPreviewLadies.value.length} 筆小姐；網站後台資料庫仍會累加保存。`
  }

  return '目前沒有本次文件預覽資料。貼上文件1並產生文件3後才會顯示。'
})

const frontendCountries = computed(() => {
  const countries = previewLadies.value
    .map(item => item.country)
    .filter(Boolean)

  return ['全部', ...Array.from(new Set(countries))]
})

const filteredFrontendLadies = computed(() => {
  if (countryFilter.value === '全部') return previewLadies.value
  return previewLadies.value.filter(item => item.country === countryFilter.value)
})

watch(mediaUploadLadyOptions, (ladies) => {
  const currentId = String(mediaUploadLadyId.value || '')
  const hasCurrentLady = ladies.some(lady => String(lady.id || '') === currentId)
  if (!hasCurrentLady) {
    mediaUploadLadyId.value = ladies[0]?.id ? String(ladies[0].id) : ''
    if (isMediaUploadModalOpen.value && !ladies.length) {
      closeMediaUploadModal()
    }
  }
}, { immediate: true })

watch(mediaUploadLadyId, () => {
  scrollSelectedMediaUploadLadyIntoView()
})

watch(filteredFrontendLadies, () => {
  scrollSelectedMediaUploadLadyIntoView()
})

function isCurrentDocumentPreviewLadyId(id) {
  return String(id || '').startsWith('current-document-')
}

function getLadyImageMedia(lady) {
  return Array.isArray(lady?.media)
    ? lady.media.filter(item => item.mediaType === 'image')
    : []
}

function getLadyVideoMedia(lady) {
  return Array.isArray(lady?.media)
    ? lady.media.filter(item => item.mediaType === 'video')
    : []
}

function getLadyCoverMedia(lady) {
  const images = getLadyImageMedia(lady)
  if (images.length) return images[0]

  const videos = getLadyVideoMedia(lady)
  if (videos.length) return videos[0]

  return null
}

function getLadyMediaCount(lady) {
  return Array.isArray(lady?.media) ? lady.media.length : 0
}

function getMediaDisplayName(media, lady) {
  return media?.note || media?.name || (lady ? `【${lady.country || ''} ${lady.name || ''}】` : '媒體預覽')
}

function getMediaViewerItemKey(media) {
  return String(media?.id || media?.url || media?.note || media?.name || '')
}

function setMediaViewerIndex(index) {
  const items = mediaViewerItems.value
  if (!items.length) return

  const normalizedIndex = ((Number(index) % items.length) + items.length) % items.length
  mediaViewerIndex.value = normalizedIndex
  mediaViewerItem.value = items[normalizedIndex] || null
}

function openMediaViewer(media, lady) {
  if (!media) return

  const items = Array.isArray(lady?.media)
    ? lady.media.filter(item => item?.url)
    : [media]
  const targetKey = getMediaViewerItemKey(media)
  const targetIndex = Math.max(0, items.findIndex(item => getMediaViewerItemKey(item) === targetKey))

  mediaViewerItems.value = items.length ? items : [media]
  mediaViewerLadyName.value = lady?.name || ''
  mediaViewerLadyCountry.value = lady?.country || ''
  setMediaViewerIndex(targetIndex)
}

function openUploadFileViewer(file) {
  if (!file) return

  const items = mediaUploadFiles.value.map((item, index) => ({
    id: `local-upload-${item.name}-${item.size}-${item.lastModified}-${index}`,
    url: getUploadFilePreviewUrl(item),
    mediaType: isUploadFileVideo(item) ? 'video' : 'image',
    note: item.name,
    isLocalUpload: true
  }))
  const targetIndex = Math.max(0, mediaUploadFiles.value.indexOf(file))

  mediaViewerItems.value = items
  mediaViewerLadyName.value = '待上傳檔案'
  mediaViewerLadyCountry.value = ''
  setMediaViewerIndex(targetIndex)
}

function showPreviousMedia() {
  if (mediaViewerTotal.value <= 1) return
  setMediaViewerIndex(mediaViewerIndex.value - 1)
}

function showNextMedia() {
  if (mediaViewerTotal.value <= 1) return
  setMediaViewerIndex(mediaViewerIndex.value + 1)
}

function handleMediaViewerKeydown(event) {
  if (!mediaViewerItem.value) return

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    showPreviousMedia()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    showNextMedia()
  } else if (event.key === 'Escape') {
    event.preventDefault()
    closeMediaViewer()
  }
}

function handleMediaViewerTouchStart(event) {
  mediaViewerTouchStartX.value = Number(event?.changedTouches?.[0]?.clientX ?? event?.touches?.[0]?.clientX)
}

function handleMediaViewerTouchEnd(event) {
  const startX = mediaViewerTouchStartX.value
  const endX = Number(event?.changedTouches?.[0]?.clientX)
  mediaViewerTouchStartX.value = null

  if (!Number.isFinite(startX) || !Number.isFinite(endX)) return
  const distance = endX - startX
  if (Math.abs(distance) < 45) return
  if (distance > 0) showPreviousMedia()
  else showNextMedia()
}

function closeMediaViewer() {
  mediaViewerItem.value = null
  mediaViewerItems.value = []
  mediaViewerIndex.value = 0
  mediaViewerTouchStartX.value = null
  mediaViewerLadyName.value = ''
  mediaViewerLadyCountry.value = ''
}


function formatAdminUpdatedTime(item) {
  const raw =
    item?.updatedAt ||
    item?.updated_at ||
    item?.importedAt ||
    item?.imported_at ||
    item?.createdAt ||
    item?.created_at

  if (!raw) return '尚無更新時間'

  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return String(raw)

  const pad = value => String(value).padStart(2, '0')
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

async function deleteLadyMedia(media, lady) {
  const mediaIdText = String(media?.id || media?.mediaId || media?.media_id || '').trim()
  const mediaUrl = String(media?.url || media?.publicUrl || media?.public_url || '').trim()
  if (!mediaIdText && !mediaUrl) {
    frontendStatusText.value = '找不到要刪除的媒體編號或網址。'
    return
  }

  const ok = window.confirm(`確定要刪除【${lady?.country || ''} ${lady?.name || ''}】這筆媒體嗎？`)
  if (!ok) return

  saveApiBaseUrl()

  const targetLadyIdText = String(lady?.id || media?.listingId || media?.listing_id || '').trim()
  const targetLadyNumericId = /^\d+$/.test(targetLadyIdText) ? Number(targetLadyIdText) : 0
  const targetLadyRef = targetLadyIdText || lady
  const previewLady = currentDocumentPreviewLadies.value.find(item => String(item?.id || '') === String(lady?.id || '')) || lady || null

  try {
    const accessToken = await getCentralWebsiteAccessToken()
    let detail = null
    if (targetLadyNumericId) {
      detail = await fetchPublicLadyDetail(targetLadyNumericId, { refresh: true }).catch(() => null)
    }
    const mediaSnapshotBeforeDelete = getBestMediaSnapshotForLady(detail, lady, previewLady)
    const remainingMediaSnapshot = getRemainingMediaAfterDelete(mediaSnapshotBeforeDelete, media)
    const syncItem = buildCentralWebsiteSyncItem(detail || lady || {}, previewLady)
    const { response, data } = await fetchJsonWithTimeout(
      `${CENTRAL_WEBSITE_API_BASE_URL}/api/integrations/converter/central-listings/media/delete`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Converter-Apikey': SUPABASE_PUBLIC_API_KEY
        },
        body: JSON.stringify({
          item: syncItem,
          sourceIdentity: syncItem.sourceIdentity || syncItem.sourceId || lady?.sourceIdentity || '',
          mediaId: mediaIdText,
          mediaUrl,
          listingId: syncItem.centralListingId || syncItem.listingId || targetLadyIdText || ''
        })
      },
      15000,
      '中央網站媒體正式刪除失敗'
    )

    if (!response.ok || data.ok === false) {
      throw new Error(data.message || data.error || `HTTP ${response.status}`)
    }

    rememberDeletedMediaForLady(targetLadyRef, media, previewLady)
    const serverMedia = mergeMediaRecords([], data?.data?.media || data?.media || [])
    const nextMedia = (serverMedia.length || Array.isArray(data?.data?.media) || Array.isArray(data?.media))
      ? serverMedia
      : remainingMediaSnapshot

    if (nextMedia.length || mediaSnapshotBeforeDelete.length) {
      await syncRemainingMediaSnapshotToCentralWebsite(detail || lady || {}, lady || {}, previewLady, nextMedia).catch(error => {
        console.warn('sync remaining media snapshot failed', error)
      })
      setCentralWebsiteMediaForLady(targetLadyRef, nextMedia, previewLady)
      updateMediaForLocalPreview(targetLadyRef, nextMedia, previewLady, 'replace')
    } else {
      setCentralWebsiteMediaForLady(targetLadyRef, [], previewLady)
      removeMediaFromLocalPreview(targetLadyRef, media, previewLady)
    }
    if (
      (mediaViewerItem.value?.id && mediaViewerItem.value.id === media?.id) ||
      (mediaViewerItem.value?.url && mediaViewerItem.value.url === mediaUrl)
    ) {
      closeMediaViewer()
    }

    frontendStatusText.value = '媒體已從 01 中央網站正式刪除；02 預覽、01 後台、01 前台會以中央 listing_media 數量為準。'
  } catch (error) {
    const message = String(error?.message || error || '')
    if (/404|not\s*found|找不到/i.test(message)) {
      rememberDeletedMediaForLady(targetLadyRef, media, previewLady)
      removeMediaFromLocalPreview(targetLadyRef, media, previewLady)
      if (
        (mediaViewerItem.value?.id && mediaViewerItem.value.id === media?.id) ||
        (mediaViewerItem.value?.url && mediaViewerItem.value.url === mediaUrl)
      ) {
        closeMediaViewer()
      }
      const fallbackMediaSnapshot = getRemainingMediaAfterDelete(getBestMediaSnapshotForLady(null, lady, previewLady), media)
      await syncRemainingMediaSnapshotToCentralWebsite(lady || {}, lady || {}, previewLady, fallbackMediaSnapshot).catch(syncError => {
        console.warn('sync remaining media snapshot after 404 failed', syncError)
      })
      setCentralWebsiteMediaForLady(targetLadyRef, fallbackMediaSnapshot, previewLady)
      updateMediaForLocalPreview(targetLadyRef, fallbackMediaSnapshot, previewLady, 'replace')
      frontendStatusText.value = '中央網站已找不到這筆媒體，已從目前預覽移除並同步剩餘媒體清單；後台重新整理後應會一致。'
      return
    }

    frontendStatusText.value = `刪除媒體失敗：${message}`
  }
}



let pendingMediaDropBlockTimer = null

function setDataTransferDropEffect(event, dropEffect = 'none') {
  try {
    if (event?.dataTransfer) {
      event.dataTransfer.dropEffect = dropEffect
    }
  } catch (error) {
    // 瀏覽器安全限制下忽略 dropEffect 設定失敗。
  }
}

function handlePendingMediaDropBlock(event) {
  setDataTransferDropEffect(event, 'none')
  isPendingMediaDropBlocked.value = true

  if (pendingMediaDropBlockTimer) {
    clearTimeout(pendingMediaDropBlockTimer)
  }
}

function clearPendingMediaDropBlock() {
  if (pendingMediaDropBlockTimer) {
    clearTimeout(pendingMediaDropBlockTimer)
  }

  pendingMediaDropBlockTimer = setTimeout(() => {
    isPendingMediaDropBlocked.value = false
  }, 120)
}

function handlePendingMediaDropBlockedDrop(event) {
  setDataTransferDropEffect(event, 'none')
  isPendingMediaDropBlocked.value = true
  mediaUploadStatusText.value = '待上傳縮圖區不能拖放檔案，請拖到上方「拖拉圖片 / 影片到這裡」。'

  if (pendingMediaDropBlockTimer) {
    clearTimeout(pendingMediaDropBlockTimer)
  }

  pendingMediaDropBlockTimer = setTimeout(() => {
    isPendingMediaDropBlocked.value = false
  }, 1800)
}

function getUploadFilePreviewUrl(file) {
  if (!file) return ''

  if (!file.__previewUrl) {
    file.__previewUrl = URL.createObjectURL(file)
  }

  return file.__previewUrl
}

function isUploadFileImage(file) {
  return String(file?.type || '').startsWith('image/')
}

function isUploadFileVideo(file) {
  return String(file?.type || '').startsWith('video/')
}

function addMediaUploadFiles(fileList) {
  const incoming = Array.from(fileList || [])
    .filter(file => file && (file.type.startsWith('image/') || file.type.startsWith('video/')))

  const existedKeys = new Set(
    mediaUploadFiles.value.map(file => `${file.name}-${file.size}-${file.lastModified}`)
  )

  const uniqueIncoming = incoming.filter(file => {
    const key = `${file.name}-${file.size}-${file.lastModified}`
    if (existedKeys.has(key)) return false
    existedKeys.add(key)
    return true
  })

  mediaUploadFiles.value = [...mediaUploadFiles.value, ...uniqueIncoming]
  if (uniqueIncoming.length) {
    resetMediaUploadProgress()
  }
}

function handleMediaFileChange(event) {
  addMediaUploadFiles(event?.target?.files || [])
}

function handleMediaDrop(event) {
  isMediaDragging.value = false
  addMediaUploadFiles(event?.dataTransfer?.files || [])
}

function removeMediaUploadFile(index) {
  if (isMediaUploading.value) return
  mediaUploadFiles.value = mediaUploadFiles.value.filter((_, fileIndex) => fileIndex !== index)
  resetMediaUploadProgress()
}

function clearMediaUploadFiles() {
  if (isMediaUploading.value) return

  mediaUploadFiles.value = []
  resetMediaUploadProgress()

  const fileInput = document.querySelector('#lady-media-file-input')
  if (fileInput) fileInput.value = ''
}

function formatUploadFileSize(file) {
  const size = Number(file?.size || 0)
  if (size >= 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)} MB`
  if (size >= 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${size} B`
}

function getUploadFileKey(file) {
  return `${file?.name || 'file'}-${file?.size || 0}-${file?.lastModified || 0}`
}

function makeMediaUploadState(status = 'waiting', percent = 0, label = '等待中') {
  return {
    status,
    percent: Math.max(0, Math.min(100, Math.round(Number(percent || 0)))),
    label
  }
}

function getMediaUploadFileState(file) {
  return mediaUploadProgressMap.value[getUploadFileKey(file)] || makeMediaUploadState()
}

function setMediaUploadFileState(file, nextState = {}) {
  const key = getUploadFileKey(file)
  const currentState = getMediaUploadFileState(file)
  mediaUploadProgressMap.value = {
    ...mediaUploadProgressMap.value,
    [key]: { ...currentState, ...nextState }
  }
}

function resetMediaUploadProgress() {
  mediaUploadProgressMap.value = {}
  mediaUploadCurrentFileName.value = ''
  mediaUploadCompletedCount.value = 0
  mediaUploadFailedCount.value = 0
}

function initializeMediaUploadProgress() {
  const nextMap = {}
  mediaUploadFiles.value.forEach(file => {
    nextMap[getUploadFileKey(file)] = makeMediaUploadState()
  })
  mediaUploadProgressMap.value = nextMap
  mediaUploadCurrentFileName.value = ''
  mediaUploadCompletedCount.value = 0
  mediaUploadFailedCount.value = 0
}

function uploadMediaFileWithProgress(formData, onProgress, options = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const uploadUrl = options.url || `${apiBaseUrl.value}/api/ladies/media/upload`
    const headers = options.headers && typeof options.headers === 'object' ? options.headers : {}

    xhr.upload.onprogress = event => {
      if (!event.lengthComputable) return
      const percent = Math.max(0, Math.min(99, Math.round((event.loaded / event.total) * 100)))
      onProgress(percent)
    }

    xhr.onload = () => {
      const text = xhr.responseText || ''
      let data = {}
      try {
        data = text ? JSON.parse(text) : {}
      } catch {
        data = {}
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error(data.message || data.error || `HTTP ${xhr.status}`))
        return
      }

      onProgress(100)
      resolve(data)
    }

    xhr.onerror = () => reject(new Error('網路連線中斷，媒體上傳失敗。'))
    xhr.onabort = () => reject(new Error('媒體上傳已中止。'))
    xhr.open('POST', uploadUrl)
    Object.entries(headers).forEach(([key, value]) => {
      if (value !== undefined && value !== null && String(value).trim()) {
        xhr.setRequestHeader(key, String(value))
      }
    })
    xhr.send(formData)
  })
}

async function prepareCentralMediaUploadContext(ladyId, previewLady = null) {
  const id = Number(ladyId || 0)
  if (!id) throw new Error('找不到可綁定媒體的正式小姐 ID。')

  const detail = await fetchPublicLadyDetail(id, { refresh: true })
  if (!detail) throw new Error('中央網站媒體上傳失敗：讀不到目前小姐完整資料。')

  const syncItem = buildCentralWebsiteSyncItem(detail, previewLady)
  const accessToken = await getCentralWebsiteAccessToken()
  return {
    ladyId: id,
    previewLady,
    detail,
    syncItem,
    accessToken,
    sourceIdentity: syncItem.sourceIdentity || syncItem.sourceId || detail.sourceIdentity || detail.sourceId || ''
  }
}

function uploadMediaFileToCentralWebsiteWithProgress(file, context, onProgress, index = 0) {
  if (!file) throw new Error('沒有可上傳的媒體檔案。')
  if (!context?.accessToken || !context?.syncItem) throw new Error('中央網站媒體上傳前置資料不完整。')

  const mediaType = file.type.startsWith('video/') ? 'video' : 'image'
  const formData = new FormData()
  formData.append('file', file)
  formData.append('item', JSON.stringify(context.syncItem || {}))
  formData.append('sourceIdentity', context.sourceIdentity || '')
  formData.append('listingId', String(context.syncItem.centralListingId || context.syncItem.listingId || context.ladyId || ''))
  formData.append('mediaType', mediaType)
  formData.append('note', file.name || '')
  formData.append('sortOrder', String(index + 1))

  return uploadMediaFileWithProgress(formData, onProgress, {
    url: `${CENTRAL_WEBSITE_API_BASE_URL}/api/integrations/converter/central-listings/media/upload-bind`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`,
      'X-Converter-Apikey': SUPABASE_PUBLIC_API_KEY
    }
  })
}

function isSelectedUploadLady(lady) {
  return String(lady?.id || '') === String(mediaUploadLadyId.value || '')
}

function openMediaUploadModalForLady(lady) {
  if (!lady) return

  const nextId = String(lady.id || '')
  if (nextId) {
    mediaUploadLadyId.value = nextId
  }

  const label = `【${[lady.country, lady.name].filter(Boolean).join(' ')}】`
  mediaUploadStatusText.value = `已選擇 ${label}，可以直接上傳圖片 / 影片。`
  isMediaUploadModalOpen.value = true
  isMediaDragging.value = false
  isPendingMediaDropBlocked.value = false
}

function closeMediaUploadModal() {
  isMediaUploadModalOpen.value = false
  isMediaDragging.value = false
  isPendingMediaDropBlocked.value = false
}

async function scrollSelectedMediaUploadLadyIntoView() {
  const targetId = String(mediaUploadLadyId.value || '')
  if (!targetId || typeof document === 'undefined') return

  await nextTick()

  const cards = Array.from(document.querySelectorAll('[data-preview-lady-id]'))
  const targetCard = cards.find(card => String(card?.dataset?.previewLadyId || '') === targetId)
  if (!targetCard) return

  targetCard.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  })
}

async function uploadLadyMedia() {
  saveApiBaseUrl()

  if (!mediaUploadLadyId.value) {
    mediaUploadStatusText.value = '請先選擇要綁定的小姐。'
    return
  }

  if (isCurrentDocumentPreviewLadyId(mediaUploadLadyId.value)) {
    mediaUploadStatusText.value = '正在補抓這位小姐的資料庫 ID，請稍候...'
    const resolvedLadyId = await resolvePreviewLadyToDatabaseId(mediaUploadLadyId.value)
    if (resolvedLadyId) {
      mediaUploadLadyId.value = String(resolvedLadyId)
      await nextTick()
      mediaUploadStatusText.value = '已補抓到資料庫 ID，可以繼續上傳媒體。'
    } else {
      mediaUploadStatusText.value = '這位小姐尚未取得資料庫 ID。系統已重新讀取清單並用姓名關鍵字補抓，但仍找不到同名小姐；請確認文件3送出成功、姓名/國籍沒有被改名，或稍後重新整理再試。'
      return
    }
  }

  if (!mediaUploadFiles.value.length) {
    mediaUploadStatusText.value = '請先選擇或拖曳圖片 / 影片檔案。'
    return
  }

  let successCount = 0
  let failCount = 0
  let skippedDuplicateCount = 0
  let currentFile = null
  const uploadedCentralMediaItems = []
  const uploadTargetLadyId = String(mediaUploadLadyId.value || '').trim()
  const uploadTargetPreviewLady = currentDocumentPreviewLadies.value.find(lady => String(lady.id || '') === uploadTargetLadyId) || null
  const uploadDuplicateCheckLady = uploadTargetPreviewLady || frontendLadies.value.find(lady => String(lady?.id || '') === uploadTargetLadyId) || null
  let centralUploadContext = null
  let centralDirectUploadUsed = false

  initializeMediaUploadProgress()
  isMediaUploading.value = true

  try {
    mediaUploadStatusText.value = '正在準備中央網站媒體上傳，不會再走舊的 converter 暫存上傳。'
    centralUploadContext = await prepareCentralMediaUploadContext(uploadTargetLadyId, uploadTargetPreviewLady)

    for (const file of mediaUploadFiles.value) {
      currentFile = file
      mediaUploadCurrentFileName.value = file.name

      if (isMediaUploadFileAlreadyBoundToLady(file, uploadDuplicateCheckLady)) {
        skippedDuplicateCount += 1
        setMediaUploadFileState(file, makeMediaUploadState('skipped', 100, '略過重複'))
        mediaUploadStatusText.value = `略過重複媒體「${file.name}」。成功 ${successCount}、略過重複 ${skippedDuplicateCount}、失敗 ${failCount}。`
        continue
      }

      setMediaUploadFileState(file, makeMediaUploadState('uploading', 0, '上傳中 0%'))

      const uploadResult = await uploadMediaFileToCentralWebsiteWithProgress(file, centralUploadContext, percent => {
        setMediaUploadFileState(file, makeMediaUploadState('uploading', percent, `上傳中 ${percent}%`))
        mediaUploadStatusText.value = `正在上傳並綁定中央網站「${file.name}」：${percent}%。已完成 ${successCount} / ${mediaUploadFiles.value.length} 個檔案。`
      }, successCount)
      centralDirectUploadUsed = true

      const uploadedItems = buildFallbackUploadedMediaFromResponse(uploadResult, file, successCount)
      uploadedCentralMediaItems.push(...uploadedItems)
      if (uploadedItems.length) {
        mergeUploadedMediaIntoLocalPreview(uploadTargetLadyId || mediaUploadLadyId.value, uploadedItems, uploadTargetPreviewLady)
      }

      successCount += 1
      mediaUploadCompletedCount.value = successCount
      setMediaUploadFileState(file, makeMediaUploadState('done', 100, '已完成'))
      mediaUploadStatusText.value = `上傳中：已完成 ${successCount} / ${mediaUploadFiles.value.length} 個檔案。`
    }

    mediaUploadCurrentFileName.value = ''
    mediaUploadStatusText.value = `媒體疊加上傳完成：成功 ${successCount} 個，略過重複 ${skippedDuplicateCount} 個，失敗 ${failCount} 個。`
    isMediaUploading.value = false
    clearMediaUploadFiles()

    if (uploadedCentralMediaItems.length) {
      mergeUploadedMediaIntoLocalPreview(uploadTargetLadyId || mediaUploadLadyId.value, uploadedCentralMediaItems, uploadTargetPreviewLady)
    }

    await loadFrontendLadies({ refresh: true })
    if (uploadedCentralMediaItems.length) {
      mergeUploadedMediaIntoLocalPreview(uploadTargetLadyId || mediaUploadLadyId.value, uploadedCentralMediaItems, uploadTargetPreviewLady)
    }

    if (successCount || skippedDuplicateCount) {
      markCurrentRoomMediaChecked({ uploadSucceeded: true })
    }

    if (!successCount && skippedDuplicateCount) {
      mediaUploadStatusText.value = `媒體上傳已完成：成功 0 個，略過重複 ${skippedDuplicateCount} 個，失敗 0 個。沒有新增重複媒體。`
      return
    }

    try {
      const targetLadyId = String(mediaUploadLadyId.value || uploadTargetLadyId || '').trim()

      if (uploadedCentralMediaItems.length && !centralDirectUploadUsed) {
        await bindUploadedMediaDirectlyToCentralWebsite(targetLadyId, uploadedCentralMediaItems, {
          previewLady: uploadTargetPreviewLady,
          timeoutMs: 15000
        })
      } else if (uploadedCentralMediaItems.length && centralDirectUploadUsed) {
        await fetchCentralWebsiteMediaForLady(uploadTargetPreviewLady || centralUploadContext?.detail || { id: targetLadyId }, {
          previewLady: uploadTargetPreviewLady,
          allowMissing: true,
          refresh: true
        }).catch(() => null)
      }

      if (uploadedCentralMediaItems.length) {
        mergeUploadedMediaIntoLocalPreview(targetLadyId || mediaUploadLadyId.value, uploadedCentralMediaItems, uploadTargetPreviewLady)
      }

      markCurrentRoomMediaChecked({ uploadSucceeded: successCount > 0 || skippedDuplicateCount > 0 })
      mediaUploadStatusText.value = `媒體疊加上傳完成：成功 ${successCount} 個，略過重複 ${skippedDuplicateCount} 個，失敗 ${failCount} 個。已直接上傳 R2 並綁定 01 中央網站 listing_media；沒有再重送整筆小姐資料，避免媒體被覆蓋。`
    } catch (syncError) {
      if (uploadedCentralMediaItems.length) {
        mergeUploadedMediaIntoLocalPreview(uploadTargetLadyId || mediaUploadLadyId.value, uploadedCentralMediaItems, uploadTargetPreviewLady)
      }
      mediaUploadStatusText.value = `媒體已上傳到資料庫，但中央網站直接綁定失敗：${syncError.message || syncError}。圖片已先保留在目前畫面，可稍後重新同步目前小姐。`
    }
  } catch (error) {
    isMediaUploading.value = false
    failCount += failCount ? 0 : 1
    mediaUploadFailedCount.value = failCount
    if (currentFile) {
      setMediaUploadFileState(currentFile, makeMediaUploadState('failed', getMediaUploadFileState(currentFile).percent || 0, '上傳失敗'))
    }
    mediaUploadCurrentFileName.value = ''
    mediaUploadStatusText.value = `媒體上傳中斷：成功 ${successCount} 個，失敗 ${failCount || 1} 個。錯誤：${error.message || error}`
    await loadFrontendLadies({ refresh: true })
  }
}

async function syncSelectedLadyToCentralWebsite() {
  const targetLadyId = String(mediaUploadLadyId.value || '').trim()
  if (!targetLadyId || isCurrentDocumentPreviewLadyId(mediaUploadLadyId.value)) {
    mediaUploadStatusText.value = '請先選擇已送出到資料庫、具有真實 ID 的小姐。'
    return
  }

  if (isSingleLadyCentralSyncing.value) return

  isSingleLadyCentralSyncing.value = true
  mediaUploadStatusText.value = '正在讀取目前小姐的完整資料與媒體，並同步中央網站...'

  try {
    const previewLady = currentDocumentPreviewLadies.value.find(lady => String(lady?.id || '') === targetLadyId) || null
    const data = await syncSingleLadyToCentralWebsite(targetLadyId, {
      previewLady,
      replaceMedia: true,
      maxAttempts: 3,
      onRetry: ({ nextAttempt, maxAttempts }) => {
        mediaUploadStatusText.value = `中央網站同步暫時失敗，正在進行第 ${nextAttempt} / ${maxAttempts} 次重試...`
      }
    })
    mediaUploadStatusText.value = data?.message || '目前小姐的圖片、影片與資料已同步到中央網站。'
    await fetchCentralWebsiteMediaForLady(previewLady || { id: targetLadyId }, { previewLady, allowMissing: true }).catch(() => null)
    await loadFrontendLadies({ refresh: true })
  } catch (error) {
    mediaUploadStatusText.value = `目前小姐同步中央網站失敗：${error.message || error}。圖片仍保留在資料庫，可稍後再次重試。`
  } finally {
    isSingleLadyCentralSyncing.value = false
  }
}


const PUBLIC_LADIES_PAGE_SIZE = 200
const LADIES_INDEX_CACHE_DB_NAME = 'auto-document-converter-public-cache'
const LADIES_INDEX_CACHE_DB_VERSION = 1
const LADIES_INDEX_CACHE_STORE = 'ladies-index'

function openLadiesIndexCacheDb() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      resolve(null)
      return
    }

    const request = indexedDB.open(LADIES_INDEX_CACHE_DB_NAME, LADIES_INDEX_CACHE_DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(LADIES_INDEX_CACHE_STORE)) {
        db.createObjectStore(LADIES_INDEX_CACHE_STORE, { keyPath: 'key' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error || new Error('IndexedDB 開啟失敗'))
  })
}

async function readLadiesIndexBrowserCache(key) {
  const db = await openLadiesIndexCacheDb().catch(() => null)
  if (!db) return null

  return new Promise((resolve) => {
    const transaction = db.transaction(LADIES_INDEX_CACHE_STORE, 'readonly')
    const request = transaction.objectStore(LADIES_INDEX_CACHE_STORE).get(key)
    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => resolve(null)
    transaction.oncomplete = () => db.close()
    transaction.onerror = () => db.close()
  })
}

async function writeLadiesIndexBrowserCache(record) {
  const db = await openLadiesIndexCacheDb().catch(() => null)
  if (!db) return false

  return new Promise((resolve) => {
    const transaction = db.transaction(LADIES_INDEX_CACHE_STORE, 'readwrite')
    transaction.objectStore(LADIES_INDEX_CACHE_STORE).put(record)
    transaction.oncomplete = () => {
      db.close()
      resolve(true)
    }
    transaction.onerror = () => {
      db.close()
      resolve(false)
    }
  })
}

async function fetchPublicLadiesIndexVersion(options = {}) {
  const query = new URLSearchParams()
  if (options.includeInactive) query.set('includeInactive', '1')
  if (options.refresh) query.set('cacheBust', String(Date.now()))

  const response = await fetch(
    `${apiBaseUrl.value}/api/public/ladies/index/version?${query.toString()}`,
    options.refresh ? { cache: 'no-store' } : undefined
  )
  const data = await response.json().catch(() => ({}))
  if (!response.ok || data.ok === false) {
    throw new Error(data.message || `HTTP ${response.status}`)
  }
  return data
}

async function fetchPublicLadiesIndexNetwork(options = {}) {
  const query = new URLSearchParams()
  if (options.includeInactive) query.set('includeInactive', '1')
  if (options.refresh) query.set('cacheBust', String(Date.now()))

  const response = await fetch(
    `${apiBaseUrl.value}/api/public/ladies/index?${query.toString()}`,
    options.refresh ? { cache: 'no-store' } : undefined
  )
  const data = await response.json().catch(() => ({}))

  if (!response.ok || data.ok === false) {
    throw new Error(data.message || `HTTP ${response.status}`)
  }

  return Array.isArray(data.items) ? data.items : []
}

async function fetchPublicLadiesIndex(options = {}) {
  const includeInactive = options.includeInactive === true
  const cacheKey = includeInactive ? 'all' : 'active'
  const versionInfo = await fetchPublicLadiesIndexVersion({
    includeInactive,
    refresh: options.refresh === true,
  })
  const cached = options.refresh === true
    ? null
    : await readLadiesIndexBrowserCache(cacheKey)

  if (
    cached &&
    cached.version === versionInfo.version &&
    Array.isArray(cached.items)
  ) {
    return {
      items: cached.items,
      version: versionInfo.version,
      browserCacheHit: true,
    }
  }

  const items = await fetchPublicLadiesIndexNetwork({
    includeInactive,
    refresh: options.refresh === true,
  })
  await writeLadiesIndexBrowserCache({
    key: cacheKey,
    version: versionInfo.version,
    items,
    savedAt: Date.now(),
  })

  return {
    items,
    version: versionInfo.version,
    browserCacheHit: false,
  }
}

async function fetchPublicLadyDetail(ladyId, options = {}) {
  const id = Number(ladyId || 0)
  if (!id) return null

  const query = new URLSearchParams()
  if (options.refresh) query.set('cacheBust', String(Date.now()))
  const suffix = query.toString() ? `?${query.toString()}` : ''
  const response = await fetch(
    `${apiBaseUrl.value}/api/public/ladies/${id}${suffix}`,
    options.refresh ? { cache: 'no-store' } : undefined
  )
  const data = await response.json().catch(() => ({}))

  if (!response.ok || data.ok === false) {
    throw new Error(data.message || `HTTP ${response.status}`)
  }

  return data.item || null
}

function getCurrentDocumentItemsForDetailLookup() {
  const text = String(jsonResultText.value || '').trim()
  if (!text) return []

  try {
    const parsed = JSON.parse(text)
    return Array.isArray(parsed?.items) ? parsed.items : []
  } catch (_error) {
    return []
  }
}

async function enrichLadiesIndexForCurrentDocument(indexItems, options = {}) {
  const rows = Array.isArray(indexItems) ? indexItems : []
  const currentItems = getCurrentDocumentItemsForDetailLookup()
  if (!rows.length || !currentItems.length) {
    return { items: rows, detailCount: 0 }
  }

  const currentKeys = new Set(currentItems.map(makePreviewLadyKey).filter(Boolean))
  const matchesByKey = new Map()

  for (const item of rows) {
    const key = makePreviewLadyKey(item)
    if (!currentKeys.has(key)) continue
    if (!matchesByKey.has(key)) matchesByKey.set(key, [])
    matchesByKey.get(key).push(item)
  }

  const matchedIds = Array.from(matchesByKey.values())
    .filter(matches => matches.length === 1)
    .map(matches => Number(matches[0]?.id || 0))
    .filter(Boolean)
    .slice(0, 50)

  if (!matchedIds.length) {
    return { items: rows, detailCount: 0 }
  }

  const details = await Promise.all(
    matchedIds.map(async id => {
      try {
        return await fetchPublicLadyDetail(id, options)
      } catch (error) {
        console.warn(`讀取小姐 ${id} 完整資料失敗，保留輕量索引：`, error)
        return null
      }
    })
  )

  const detailById = new Map(
    details.filter(Boolean).map(item => [Number(item.id), item])
  )

  return {
    items: rows.map(item => detailById.get(Number(item.id)) || item),
    detailCount: detailById.size
  }
}

async function fetchAllPublicLadies(options = {}) {
  const allItems = []
  let page = 1
  let hasMore = true
  let safetyPages = 0

  while (hasMore && safetyPages < 100) {
    const query = new URLSearchParams({
      page: String(page),
      pageSize: String(PUBLIC_LADIES_PAGE_SIZE),
    })
    if (options.includeInactive) query.set('includeInactive', '1')
    if (options.refresh) query.set('cacheBust', String(Date.now()))

    const response = await fetch(
      `${apiBaseUrl.value}/api/public/ladies?${query.toString()}`,
      options.refresh ? { cache: 'no-store' } : undefined
    )
    const data = await response.json().catch(() => ({}))

    if (!response.ok || data.ok === false) {
      throw new Error(data.message || `HTTP ${response.status}`)
    }

    const items = Array.isArray(data.items) ? data.items : []
    allItems.push(...items)
    hasMore = data.hasMore === true
    page += 1
    safetyPages += 1
  }

  return allItems
}

async function loadFrontendLadies(options = {}) {
  saveApiBaseUrl()

  try {
    // 第 018-79 批：
    // 先讀取萬筆可承受的輕量索引，再只補讀本次文件中有命中的小姐完整資料。
    // 這樣可立即取得真實資料庫 ID、媒體與完整內容，又不會下載全部小姐媒體。
    const indexResult = await fetchPublicLadiesIndex({
      includeInactive: true,
      refresh: options.refresh === true,
    })
    const indexItems = indexResult.items
    const enriched = await enrichLadiesIndexForCurrentDocument(indexItems, {
      refresh: options.refresh === true,
    })
    frontendLadies.value = enriched.items
    frontendLadiesLoaded.value = true
    const indexSourceText = indexResult.browserCacheHit
      ? '瀏覽器快取（版本未變更，未重新下載萬筆索引）'
      : 'Worker 輕量索引'
    frontendStatusText.value = enriched.detailCount
      ? `已從${indexSourceText}讀取 ${indexItems.length} 筆小姐索引，並補讀本次 ${enriched.detailCount} 筆完整資料。`
      : `已從${indexSourceText}讀取 ${indexItems.length} 筆小姐索引。`
    if (!options.skipCentralMediaRefresh) {
      await refreshCentralWebsiteMediaForCurrentDocument({ silent: true }).catch(error => {
        console.warn('中央網站媒體清單補讀失敗，先保留 converter fallback：', error)
      })
    }
    return true
  } catch (error) {
    frontendLadiesLoaded.value = false
    frontendStatusText.value = `讀取前台資料失敗：${error.message || error}`
    if (!options.silent) {
      showActionToast('無法讀取資料庫清單，為避免重複已停止自動送出。', 'error')
    }
    return false
  }
}

function saveApiBaseUrl() {
  const value = String(apiBaseUrl.value || '').trim().replace(/\/+$/, '')
  apiBaseUrl.value = value || DEFAULT_ONLINE_API_BASE_URL
  localStorage.setItem('auto-document-converter-api-base-url', apiBaseUrl.value)
  apiStatusText.value = `API 位置已儲存：${apiBaseUrl.value}`
}



function useOnlineApiBaseUrl() {
  apiBaseUrl.value = DEFAULT_ONLINE_API_BASE_URL
  localStorage.setItem('auto-document-converter-api-base-url', apiBaseUrl.value)
  apiStatusText.value = `已套用線上 API：${apiBaseUrl.value}`
}



function normalizeSavedApiBaseUrlForOnlineUse() {
  const saved = String(localStorage.getItem('auto-document-converter-api-base-url') || '').trim()
  if (!saved || saved === 'http://localhost:5260' || saved === 'https://localhost:5260') {
    apiBaseUrl.value = DEFAULT_ONLINE_API_BASE_URL
    localStorage.setItem('auto-document-converter-api-base-url', apiBaseUrl.value)
  }
}
localStorage.setItem('auto-document-converter-api-base-url', DEFAULT_ONLINE_API_BASE_URL)
normalizeSavedApiBaseUrlForOnlineUse()

async function testApiConnection() {
  saveApiBaseUrl()

  try {
    const response = await fetch(`${apiBaseUrl.value}/api/health`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    apiStatusText.value = `API 連線正常：${data.message || 'OK'}`
  } catch (error) {
    apiStatusText.value = `API 連線失敗：${error.message || error}`
  }
}


async function testDatabaseConnection() {
  saveApiBaseUrl()

  try {
    const response = await fetch(`${apiBaseUrl.value}/api/db/health`)
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`)
    }

    apiStatusText.value = `資料庫連線正常：${data.message || 'OK'}`
  } catch (error) {
    apiStatusText.value = `資料庫連線失敗：${error.message || error}`
  }
}


async function ensureAppendImportBackendReady() {
  const { response, data } = await fetchJsonWithTimeout(
    `${apiBaseUrl.value}/api/version`,
    {},
    DATABASE_IMPORT_TIMEOUT_MS,
    '後端版本檢查失敗'
  )

  if (!response.ok) {
    throw new Error(`後端版本檢查失敗：HTTP ${response.status}`)
  }

  if (data.importMode !== 'append_upsert_keep_existing' || data.destructiveImportDisabled !== true) {
    throw new Error('目前連到舊版後端 API，不能送出資料庫，避免舊小姐被整批覆蓋。請確認 Render 已部署第 018-14 批。')
  }

  return data
}

// 第 018-110 批：文件3儲存與中央網站同步拆開，避免小批資料被整批同步拖慢。
const DATABASE_IMPORT_TIMEOUT_MS = 90000
const CENTRAL_WEBSITE_SYNC_TIMEOUT_MS = 12000
const CENTRAL_WEBSITE_SINGLE_SYNC_ATTEMPTS = 2

function waitCentralWebsiteSyncRetry(milliseconds) {
  return new Promise(resolve => window.setTimeout(resolve, milliseconds))
}

function formatNetworkError(error, fallback = '連線失敗') {
  const raw = String(error?.message || error || '').trim()
  if (error?.name === 'AbortError') return `${fallback}：API 等待逾時，請稍後按「重新同步中央站」。`
  if (!raw || /failed to fetch/i.test(raw) || /networkerror/i.test(raw)) {
    return `${fallback}：API 無回應或網路連線被中斷，文件3已保留，可稍後重新同步。`
  }
  return `${fallback}：${raw}`
}

async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 12000, fallback = 'API 請求失敗') {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    const data = await response.json().catch(() => ({}))
    return { response, data }
  } catch (error) {
    throw new Error(formatNetworkError(error, fallback))
  } finally {
    window.clearTimeout(timeoutId)
  }
}

function getCurrentDocumentPreviewLady(item) {
  const itemId = String(item?.id || '')
  const itemKey = makePreviewLadyKey(item)

  return currentDocumentPreviewLadies.value.find(lady => (
    itemId && String(lady?.id || '') === itemId
  )) || currentDocumentPreviewLadies.value.find(lady => (
    itemKey && makePreviewLadyKey(lady) === itemKey
  )) || null
}

function buildCentralWebsiteSyncItem(item, previewLady = null) {
  const currentPreview = previewLady || getCurrentDocumentPreviewLady(item)
  const body = item?.body || {}
  const previewBody = currentPreview?.body || {}
  const height = currentPreview?.height ?? previewBody?.height ?? item?.height ?? body?.height ?? null
  const weight = currentPreview?.weight ?? previewBody?.weight ?? item?.weight ?? body?.weight ?? null
  const cup = currentPreview?.cup ?? previewBody?.cup ?? item?.cup ?? body?.cup ?? ''
  const age = currentPreview?.age ?? previewBody?.age ?? item?.age ?? body?.age ?? null
  const nationality = currentPreview?.nationality || currentPreview?.country || item?.nationality || item?.country || ''
  const flattenedItem = {
    ...item,
    nationality,
    country: item?.country || nationality,
    height,
    weight,
    cup,
    age
  }
  const assessment = frontendLadiesLoaded.value ? assessLadyDatabaseSync({ ...flattenedItem, ...(currentPreview || {}) }) : null
  const matchedId = Number(assessment?.match?.id || item?.existingListingId || item?.existingDatabaseId || item?.databaseId || 0)
  const duplicateGuardFields = {
    duplicateGuardMode: assessment?.state === 'update' || assessment?.state === 'synced' ? 'update-existing' : 'create-or-update',
    duplicateGuardMatchedBy: assessment?.matchedBy || item?.duplicateGuardMatchedBy || '',
    duplicateGuardNameKey: makePreviewLadyKey({ ...flattenedItem, ...(currentPreview || {}) }),
    duplicateGuardIdentityKey: makeLadyStrictIdentityKey({ ...flattenedItem, ...(currentPreview || {}) })
  }

  if (!currentPreview) {
    return {
      ...flattenedItem,
      ...duplicateGuardFields,
      ...(matchedId > 0 ? { existingListingId: matchedId, targetListingId: matchedId, databaseId: matchedId } : {})
    }
  }

  const currentLocation = getCurrentListingLocation()
  const previewLocation = getLadySyncLocation(currentPreview)
  const itemLocation = getLadySyncLocation(item)
  const city = currentPreview.city || item.city || previewLocation.city || itemLocation.city || currentLocation.city
  const district = currentPreview.district || item.district || previewLocation.district || itemLocation.district || currentLocation.district
  const mode = currentPreview.mode || item.mode || previewLocation.mode || itemLocation.mode || currentLocation.mode
  const room = currentPreview.room || currentPreview.sourceRoom || item.room || item.sourceRoom || previewLocation.room || itemLocation.room || currentLocation.room || ruleScopeRoom.value || ''
  const sourceIdentity = currentPreview.sourceIdentity || item.sourceIdentity || item.sourceId || makeStableLadySourceIdentity({
    ...item,
    ...currentPreview,
    city,
    district,
    mode,
    room,
    sourceRoom: currentPreview.sourceRoom || item.sourceRoom || room || ruleScopeRoom.value
  })

  return {
    ...flattenedItem,
    ...duplicateGuardFields,
    ...(matchedId > 0 ? { existingListingId: matchedId, targetListingId: matchedId, databaseId: matchedId } : {}),
    sourceId: sourceIdentity,
    sourceIdentity,
    sourceRoom: currentPreview.sourceRoom || item.sourceRoom || room || ruleScopeRoom.value || '',
    city,
    district,
    mode,
    room,
    location: [city, district, mode, room].filter(Boolean).join(' / '),
    locationInfo: {
      ...(item.locationInfo || {}),
      ...(currentPreview.locationInfo || {}),
      city,
      district,
      mode,
      room
    }
  }
}

async function getCentralWebsiteAccessToken() {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  const accessToken = sessionData?.session?.access_token || ''
  if (sessionError || !accessToken) {
    throw new Error(`無法取得員工登入憑證：${sessionError?.message || '請重新登入'}`)
  }
  return accessToken
}

async function postCentralWebsiteSyncItems(items, options = {}) {
  const syncItems = Array.isArray(items) ? items.filter(Boolean) : []
  if (!syncItems.length) throw new Error('沒有可同步到中央網站的小姐資料。')

  const accessToken = await getCentralWebsiteAccessToken()
  const maxAttempts = Math.max(1, Number(options.maxAttempts || 1))
  let lastError = null

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const { response, data } = await fetchJsonWithTimeout(
        `${CENTRAL_WEBSITE_API_BASE_URL}/api/integrations/converter/central-listings/import`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'X-Converter-Apikey': SUPABASE_PUBLIC_API_KEY
          },
          body: JSON.stringify({ items: syncItems })
        },
        Number(options.timeoutMs || CENTRAL_WEBSITE_SYNC_TIMEOUT_MS),
        '中央網站同步失敗'
      )

      if (!response.ok) {
        const error = new Error(data.message || data.error || `中央網站同步失敗：HTTP ${response.status}`)
        error.status = response.status
        throw error
      }

      return data
    } catch (error) {
      lastError = error
      const status = Number(error?.status || 0)
      const retryableStatus = !status || [408, 425, 429, 500, 502, 503, 504].includes(status)
      const shouldRetry = attempt < maxAttempts && retryableStatus

      if (!shouldRetry) throw error

      if (typeof options.onRetry === 'function') {
        options.onRetry({
          attempt,
          nextAttempt: attempt + 1,
          maxAttempts,
          error
        })
      }

      await waitCentralWebsiteSyncRetry(Math.min(2500, 500 * attempt))
    }
  }

  throw lastError || new Error('中央網站同步失敗。')
}


async function runConsistencyCheck() {
  if (isConsistencyChecking.value) return
  const ladies = currentDocumentPreviewLadies.value
  if (!ladies.length) {
    consistencyStatusText.value = '目前沒有本次文件小姐可檢查。'
    consistencyStatusType.value = 'warning'
    return
  }

  isConsistencyChecking.value = true
  consistencyStatusText.value = '正在檢查 01 中央網站資料與媒體狀態...'
  consistencyStatusType.value = 'pending'
  consistencyReport.value = null

  try {
    const accessToken = await getCentralWebsiteAccessToken()
    const items = ladies.map(lady => buildCentralWebsiteSyncItem(lady, lady))
    const { response, data } = await fetchJsonWithTimeout(
      `${CENTRAL_WEBSITE_API_BASE_URL}/api/integrations/converter/central-listings/consistency-check`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Converter-Apikey': SUPABASE_PUBLIC_API_KEY
        },
        body: JSON.stringify({ items })
      },
      CENTRAL_WEBSITE_SYNC_TIMEOUT_MS,
      '中央網站一致性檢查失敗'
    )

    if (!response.ok || data?.ok === false) {
      throw new Error(data?.message || data?.error || `中央網站一致性檢查失敗：HTTP ${response.status}`)
    }

    consistencyReport.value = data.data || data
    applyDuplicateCandidateDefaults(consistencyReport.value)
    duplicateResolveStatusText.value = ''
    duplicateResolveStatusType.value = 'info'
    const summary = consistencyReport.value?.summary || {}
    const duplicateCount = Number(summary.duplicateCount || 0)
    const mediaMissingCount = Number(summary.mediaMissingCount || 0)
    const missingCount = Number(summary.missingCount || 0)
    const warningCount = duplicateCount + mediaMissingCount + missingCount
    if (warningCount > 0) {
      consistencyStatusType.value = duplicateCount > 0 ? 'error' : 'warning'
      consistencyStatusText.value = `檢查完成：發現 ${warningCount} 筆需要處理，請看下方建議。`
    } else {
      consistencyStatusType.value = 'success'
      consistencyStatusText.value = '檢查完成：本次小姐主檔與媒體狀態正常。'
    }
  } catch (error) {
    consistencyStatusType.value = 'error'
    consistencyStatusText.value = error?.message || '中央網站一致性檢查失敗。'
  } finally {
    isConsistencyChecking.value = false
  }
}


async function resolveDuplicateRow(row) {
  if (isDuplicateResolveBusy.value) return
  const candidates = getDuplicateCandidates(row)
  if (candidates.length < 2) {
    duplicateResolveStatusType.value = 'warning'
    duplicateResolveStatusText.value = '這筆沒有足夠的重複候選資料可整理。'
    return
  }

  const key = duplicateRowKey(row)
  const officialListingId = selectedDuplicateOfficialMap.value[key] || candidates[0]?.id || ''
  const duplicateIds = candidates
    .map(candidate => candidate.id)
    .filter(id => id && id !== officialListingId)

  if (!officialListingId || !duplicateIds.length) {
    duplicateResolveStatusType.value = 'warning'
    duplicateResolveStatusText.value = '請先選擇要保留的正式主檔。'
    return
  }

  const officialCandidate = candidates.find(candidate => candidate.id === officialListingId)
  const label = `【${row?.nationality || row?.country || ''} ${row?.name || ''}】`
  const confirmText = [
    `確認整理 ${label} 的重複資料？`,
    '',
    `保留主檔：${officialCandidate?.name || row?.name || ''} / ${shortId(officialListingId)}`,
    `其他 ${duplicateIds.length} 筆會標記待整理並下架，不會刪除資料。`,
    duplicateResolveMergeMedia.value ? '會同時把其他重複筆的圖片 / 影片補到正式主檔。' : '不會搬移媒體。',
  ].join('\n')

  if (!window.confirm(confirmText)) return

  isDuplicateResolveBusy.value = true
  duplicateResolveStatusType.value = 'pending'
  duplicateResolveStatusText.value = '正在整理疑似重複資料...'

  try {
    const accessToken = await getCentralWebsiteAccessToken()
    const { response, data } = await fetchJsonWithTimeout(
      `${CENTRAL_WEBSITE_API_BASE_URL}/api/integrations/converter/central-listings/duplicates/mark-official`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Converter-Apikey': SUPABASE_PUBLIC_API_KEY,
        },
        body: JSON.stringify({
          officialListingId,
          duplicateIds,
          mergeMedia: duplicateResolveMergeMedia.value,
        }),
      },
      CENTRAL_WEBSITE_SYNC_TIMEOUT_MS,
      '整理疑似重複資料失敗'
    )

    if (!response.ok || data?.ok === false) {
      throw new Error(data?.message || data?.error || `整理疑似重複資料失敗：HTTP ${response.status}`)
    }

    const result = data.data || data
    duplicateResolveStatusType.value = 'success'
    duplicateResolveStatusText.value = `整理完成：保留 1 筆正式主檔，標記待整理 ${result.markedDuplicateCount || duplicateIds.length} 筆，補入媒體 ${result.mergedMediaCount || 0} 筆。`
    showActionToast(duplicateResolveStatusText.value, 'success')
    await runConsistencyCheck()
  } catch (error) {
    duplicateResolveStatusType.value = 'error'
    duplicateResolveStatusText.value = error?.message || '整理疑似重複資料失敗。'
  } finally {
    isDuplicateResolveBusy.value = false
  }
}

async function syncSingleLadyToCentralWebsite(ladyId, options = {}) {
  const idText = String(ladyId || '').trim()
  if (!idText) throw new Error('找不到要同步的小姐資料庫 ID。')

  const numericId = /^\d+$/.test(idText) ? Number(idText) : 0
  const item = numericId
    ? await fetchPublicLadyDetail(numericId, { refresh: true })
    : frontendLadies.value.find(lady => String(lady?.id || '') === idText)
  if (!item) throw new Error('讀不到目前小姐的完整資料。')

  const syncItem = buildCentralWebsiteSyncItem(item, options.previewLady || null)
  if (options.replaceMedia) {
    const exactMedia = Array.isArray(options.previewLady?.media)
      ? mergeMediaRecords([], options.previewLady.media)
      : Array.isArray(syncItem.media)
        ? mergeMediaRecords([], syncItem.media)
        : []
    syncItem.media = exactMedia
    syncItem.mediaCount = exactMedia.length
    syncItem.replaceMedia = true
    syncItem.mediaReplaceMode = 'replace'
  }
  return postCentralWebsiteSyncItems([syncItem], {
    ...options,
    maxAttempts: Math.max(1, Number(options.maxAttempts || CENTRAL_WEBSITE_SINGLE_SYNC_ATTEMPTS))
  })
}

async function syncSavedLadiesToCentralWebsite(payload = null) {
  // 第 018-110 批：文件3儲存後只同步本次文件小姐，不再每次重送全站資料。
  const currentItems = Array.isArray(payload?.items)
    ? payload.items
    : getCurrentDocumentItemsForDetailLookup()

  if (currentItems.length) {
    const syncItems = currentItems.map(item => buildCentralWebsiteSyncItem(item))
    return postCentralWebsiteSyncItems(syncItems, {
      maxAttempts: 1,
      timeoutMs: CENTRAL_WEBSITE_SYNC_TIMEOUT_MS
    })
  }

  const items = await fetchAllPublicLadies({
    includeInactive: true,
    refresh: true,
  })
  if (!items.length) throw new Error('資料庫目前沒有可同步到網站的小姐資料。')

  const syncItems = items.map(item => buildCentralWebsiteSyncItem(item))
  return postCentralWebsiteSyncItems(syncItems, {
    maxAttempts: 1,
    timeoutMs: CENTRAL_WEBSITE_SYNC_TIMEOUT_MS
  })
}

function safeSetStorageValue(key, value) {
  if (!key) return
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.warn('localStorage 儲存失敗，但不影響畫面清空：', error)
  }
}


async function submitDocument4ToDatabase(options = {}) {
  if (isDatabaseSubmitting.value) {
    const message = '資料仍在送出中，請稍候。'
    setDatabaseSubmitFeedback(message, 'warning', { toast: true })
    return false
  }

  const shouldClearDocuments = options.clearDocuments !== false
  const shouldReloadFrontendLadies = options.reloadFrontendLadies === true
  saveApiBaseUrl()

  const listingLocation = validateCurrentListingLocation()
  if (!listingLocation) {
    const message = apiStatusText.value || statusMessage.value || '請先選擇縣市、地區與定點／外送。'
    setDatabaseSubmitFeedback(message, 'error', { toast: true })
    return false
  }

  const payload = parseConfirmedTextToJson(confirmedText.value)
  if (!payload.items.length) {
    const message = '文件3目前沒有可送出到資料庫的資料。'
    apiStatusText.value = message
    setDatabaseSubmitFeedback(message, 'error', { toast: true })
    return false
  }

  isDatabaseSubmitting.value = true
  let databaseSaved = false

  try {
    setDatabaseSubmitFeedback('正在讀取資料庫並檢查重複小姐...', 'pending')
    const databaseListReady = await loadFrontendLadies({ silent: true, refresh: true })
    if (!databaseListReady) {
      throw new Error('無法讀取目前資料庫清單；為避免重複新增，已停止本次送出。')
    }

    const plan = buildDatabaseSubmissionPlan(payload)

    if (plan.checkingCount) {
      throw new Error('資料庫比對尚未完成；為避免重複新增，已停止本次送出。')
    }

    if (plan.suspectedCount) {
      const message = `發現 ${plan.suspectedCount} 筆疑似重複小姐：資料庫已有多筆同國籍、同姓名資料。已禁止自動送出，請先到網站後台確認或整理重複資料。`
      apiStatusText.value = message
      setDatabaseSubmitFeedback(message, 'warning', { toast: true })
      return false
    }

    if (!plan.itemsToSubmit.length) {
      databaseSaved = true
      markCurrentRoomDocumentSaved(payload)
      setDatabaseSubmitFeedback(`本次 ${plan.syncedCount} 筆皆已同步，已略過資料庫寫入；正在同步本次文件到中央網站...`, 'pending')
      centralWebsiteSyncNeedsRetry.value = false
      const centralSync = await syncSavedLadiesToCentralWebsite(payload)
      applyDatabaseIdHintsFromResponse(centralSync, payload)
      await refreshFrontendLadiesUntilDocumentIdsReady(payload, { maxAttempts: 2, retryDelayMs: 500 })
      await refreshCentralWebsiteMediaForCurrentDocument({ silent: true }).catch(() => null)
      const message = buildDetailedDatabaseSyncMessage(plan, centralSync)
      apiStatusText.value = message
      setDatabaseSubmitFeedback(message, 'success', { toast: true })
      return true
    }

    setDatabaseSubmitFeedback(
      `比對完成：新增 ${plan.newCount}、更新 ${plan.updateCount}、已同步略過 ${plan.syncedCount}。正在確認後端版本...`,
      'pending'
    )
    const backendVersion = await ensureAppendImportBackendReady()
    apiStatusText.value = `後端版本確認：${backendVersion.version || backendVersion.batch || 'append 累加版'}，正在送出資料庫...`
    setDatabaseSubmitFeedback('後端版本確認完成，正在寫入資料庫...', 'pending')

    const submissionPayload = {
      ...payload,
      total: plan.itemsToSubmit.length,
      items: plan.itemsToSubmit
    }

    const { response, data } = await fetchJsonWithTimeout(
      `${apiBaseUrl.value}/api/ladies/import-db`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionPayload)
      },
      DATABASE_IMPORT_TIMEOUT_MS,
      '資料庫寫入失敗'
    )
    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`)
    }

    if (data.mode !== REQUIRED_BACKEND_IMPORT_MODE) {
      throw new Error('送出成功但回傳不是累加版後端，請確認正式後端是否仍在舊版本。')
    }

    applyDatabaseIdHintsFromResponse(data, submissionPayload)

    if (Number(data.afterCount || 0) < Number(data.beforeCount || 0)) {
      throw new Error(`安全檢查失敗：匯入後 ${data.afterCount} 筆小於匯入前 ${data.beforeCount} 筆，已阻擋。`)
    }

    databaseSaved = true
    markCurrentRoomDocumentSaved(payload)
    apiStatusText.value = `${data.message || '資料庫儲存成功'} 正在自動同步中央網站...`
    setDatabaseSubmitFeedback('資料庫儲存成功，正在同步中央網站...', 'pending')

    if (shouldReloadFrontendLadies) {
      await refreshFrontendLadiesUntilDocumentIdsReady(payload, { maxAttempts: 2, retryDelayMs: 500 })
    }

    centralWebsiteSyncNeedsRetry.value = false
    const centralSync = await syncSavedLadiesToCentralWebsite(payload)
    applyDatabaseIdHintsFromResponse(centralSync, payload)
    await refreshCentralWebsiteMediaForCurrentDocument({ silent: true }).catch(() => null)
    const suspectedDuplicateCount = Number(centralSync?.data?.suspectedDuplicateCount || 0)
    const successMessage = buildDetailedDatabaseSyncMessage(plan, centralSync)
    const idReadySummary = await refreshFrontendLadiesUntilDocumentIdsReady(payload, { maxAttempts: 3, retryDelayMs: 700 })

    if (shouldClearDocuments) {
      clearDocumentsAfterDatabaseSubmit()
      apiStatusText.value = `${data.message || `已送出 ${plan.itemsToSubmit.length} 筆到 Supabase PostgreSQL。`} ${centralSync.message || '中央網站同步完成。'} 已清空文件1 / 文件2 / 文件3 / 文件4，本次預覽已歸零，可以開始建立下一批。`
    } else {
      apiStatusText.value = `${data.message || `已送出 ${plan.itemsToSubmit.length} 筆到 Supabase PostgreSQL。`} ${centralSync.message || '中央網站同步完成。'} 本次文件資料已保留，可直接選擇本次已同步小姐上傳媒體。`
      mediaUploadStatusText.value = idReadySummary.missing
        ? `文件3已送出；已取得 ${idReadySummary.ready} / ${idReadySummary.total} 位小姐資料庫 ID，尚有 ${idReadySummary.missing} 位正在等待資料庫索引更新。可稍後再選該小姐上傳媒體。`
        : '文件3已完成防重比對並送出；本次小姐資料庫 ID 已回填，可以開始上傳媒體。'
    }

    setDatabaseSubmitFeedback(successMessage, suspectedDuplicateCount ? 'warning' : 'success', { toast: true })
    return true
  } catch (error) {
    const detailMessage = databaseSaved
      ? formatNetworkError(error, '中央站同步失敗')
      : formatNetworkError(error, '送出資料庫失敗')
    const message = databaseSaved
      ? `文件3已保存到 converter 資料庫，但中央網站同步未完成：${detailMessage.replace(/^中央站同步失敗：/, '')}`
      : detailMessage

    if (databaseSaved) {
      centralWebsiteSyncNeedsRetry.value = true
      centralWebsiteSyncRetryText.value = message
    }

    apiStatusText.value = databaseSaved
      ? `${message}。不用重存文件3，可按「重新同步中央站」。`
      : message

    setDatabaseSubmitFeedback(message, databaseSaved ? 'warning' : 'error', { toast: true })

    if (databaseSaved && !shouldClearDocuments) {
      mediaUploadStatusText.value = '文件3資料已存在於資料庫；中央網站同步失敗時，可稍後再次按送出，系統不會重複新增。'
      return true
    }

    return false
  } finally {
    isDatabaseSubmitting.value = false
  }
}


async function submitDocument4ToApi() {
  saveApiBaseUrl()

  const payload = parseConfirmedTextToJson(confirmedText.value)
  if (!payload.items.length) {
    apiStatusText.value = '文件3目前沒有可送出的資料。'
    return
  }

  try {
    const response = await fetch(`${apiBaseUrl.value}/api/ladies/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`)
    }

    if (data.mode && data.mode !== 'local_append_upsert_keep_existing') {
      throw new Error('本機 JSON 匯入不是累加版，請確認後端版本。')
    }

    apiStatusText.value = data.message || `已送出 ${data.count ?? payload.items.length} 筆到本機 API。`
  } catch (error) {
    apiStatusText.value = `送出失敗：${error.message || error}`
  }
}

function parsePriceTextToObject(priceText) {
  const match = String(priceText || '').match(/^([0-9]+(?:\.[0-9]+)?)K\/(\d+)\/(NS|\d+S)$/i)
  if (!match) return null

  const sessionLabel = normalizePriceSessionLabel(match[3])

  return {
    priceText,
    price: Math.round(Number(match[1]) * 1000),
    minutes: Number(match[2]),
    sessions: sessionLabel === 'NS' ? null : Number(sessionLabel.replace(/S$/i, '')),
    sessionLabel
  }
}

function getCurrentListingLocation() {
  const city = cleanScopeText(ruleScopeCity.value || managerSelectedCity.value)
  const district = cleanScopeText(ruleScopeDistrict.value || managerSelectedDistrict.value)
  const mode = cleanScopeText(ruleScopeType.value || managerSelectedType.value)
  const room = cleanScopeText(ruleScopeRoom.value)

  return {
    city,
    district,
    mode,
    room,
    locationText: [city, district, mode, room].filter(Boolean).join(' / ')
  }
}


function getBusinessDayKey(value = new Date()) {
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value)
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date
  safeDate.setHours(safeDate.getHours() - ROOM_DAILY_BUSINESS_DAY_START_HOUR)
  const pad = number => String(number).padStart(2, '0')
  return `${safeDate.getFullYear()}-${pad(safeDate.getMonth() + 1)}-${pad(safeDate.getDate())}`
}

function makeRoomDailyScopeKey(scope = {}) {
  const city = cleanScopeText(scope.city)
  const district = cleanScopeText(scope.district)
  const mode = cleanScopeText(scope.mode || scope.type)
  const room = cleanScopeText(scope.room)
  if (!city || !district || !mode || !room) return ''
  return `${city}__${district}__${mode}__${room}`
}

function normalizeRoomDailyStatusRecord(record = {}) {
  if (!record || typeof record !== 'object') return null
  const businessDayKey = cleanScopeText(record.businessDayKey || record.business_day_key)
  if (!businessDayKey) return null
  return {
    businessDayKey,
    documentSavedAt: cleanScopeText(record.documentSavedAt || record.document_saved_at),
    mediaUploadedAt: cleanScopeText(record.mediaUploadedAt || record.media_uploaded_at),
    documentItemCount: Math.max(0, Number(record.documentItemCount || record.document_item_count || 0)),
    mediaReadyCount: Math.max(0, Number(record.mediaReadyCount || record.media_ready_count || 0)),
    mediaTotalCount: Math.max(0, Number(record.mediaTotalCount || record.media_total_count || 0)),
    imageCount: Math.max(0, Number(record.imageCount || record.image_count || 0)),
    videoCount: Math.max(0, Number(record.videoCount || record.video_count || 0)),
    updatedAt: cleanScopeText(record.updatedAt || record.updated_at || record.documentSavedAt || record.mediaUploadedAt)
  }
}

function normalizeRoomDailyStatusStore(store = {}) {
  if (!store || typeof store !== 'object' || Array.isArray(store)) return {}
  return Object.entries(store).reduce((result, [key, value]) => {
    const normalized = normalizeRoomDailyStatusRecord(value)
    if (cleanScopeText(key) && normalized) result[key] = normalized
    return result
  }, {})
}

function readRoomDailyStatusStore() {
  try {
    return normalizeRoomDailyStatusStore(JSON.parse(localStorage.getItem(getStaffScopedStorageKey(ROOM_DAILY_STATUS_STORAGE_KEY)) || '{}'))
  } catch {
    return {}
  }
}

function writeRoomDailyStatusStore(store = roomDailyStatusByScope.value) {
  const normalized = normalizeRoomDailyStatusStore(store)
  roomDailyStatusByScope.value = normalized
  localStorage.setItem(getStaffScopedStorageKey(ROOM_DAILY_STATUS_STORAGE_KEY), JSON.stringify(normalized))
  return normalized
}

function mergeRoomDailyStatusStores(localStore = {}, onlineStore = {}) {
  const local = normalizeRoomDailyStatusStore(localStore)
  const online = normalizeRoomDailyStatusStore(onlineStore)
  const keys = new Set([...Object.keys(local), ...Object.keys(online)])
  const merged = {}

  keys.forEach(key => {
    const localItem = local[key]
    const onlineItem = online[key]
    if (!localItem) {
      merged[key] = onlineItem
      return
    }
    if (!onlineItem) {
      merged[key] = localItem
      return
    }

    const localTime = new Date(localItem.updatedAt || localItem.documentSavedAt || localItem.mediaUploadedAt || 0).getTime() || 0
    const onlineTime = new Date(onlineItem.updatedAt || onlineItem.documentSavedAt || onlineItem.mediaUploadedAt || 0).getTime() || 0
    merged[key] = onlineTime > localTime ? onlineItem : localItem
  })

  return merged
}

function formatRoomDailyStatusTime(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const pad = number => String(number).padStart(2, '0')
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function getCurrentDocumentMediaSummary() {
  const ladies = Array.isArray(currentDocumentPreviewLadies.value) ? currentDocumentPreviewLadies.value : []
  let mediaReadyCount = 0
  let imageCount = 0
  let videoCount = 0

  ladies.forEach(lady => {
    const mediaItems = Array.isArray(lady?.media) ? lady.media.filter(media => media?.url) : []
    if (mediaItems.length) mediaReadyCount += 1
    mediaItems.forEach(media => {
      if (String(media?.mediaType || '').toLowerCase() === 'video') videoCount += 1
      else imageCount += 1
    })
  })

  return {
    mediaReadyCount,
    mediaTotalCount: ladies.length,
    imageCount,
    videoCount
  }
}

function updateCurrentRoomDailyStatus(patch = {}, options = {}) {
  const location = options.location || getCurrentListingLocation()
  const key = makeRoomDailyScopeKey(location)
  if (!key) return null

  const now = new Date().toISOString()
  const businessDayKey = getBusinessDayKey(now)
  const currentStore = normalizeRoomDailyStatusStore(roomDailyStatusByScope.value)
  const previous = currentStore[key]?.businessDayKey === businessDayKey ? currentStore[key] : {}
  const nextRecord = normalizeRoomDailyStatusRecord({
    ...previous,
    ...patch,
    businessDayKey,
    updatedAt: now
  })

  roomDailyStatusByScope.value = {
    ...currentStore,
    [key]: nextRecord
  }
  writeRoomDailyStatusStore(roomDailyStatusByScope.value)

  if (options.syncOnline !== false && isOnlineWorkspaceReady()) {
    void saveLocationOptionsOnline(locationOptions.value, { silent: true })
  }

  return nextRecord
}

function markCurrentRoomDocumentSaved(payload = null) {
  const items = Array.isArray(payload?.items) ? payload.items : []
  if (!items.length) return null
  const mediaSummary = getCurrentDocumentMediaSummary()
  return updateCurrentRoomDailyStatus({
    documentSavedAt: new Date().toISOString(),
    documentItemCount: items.length,
    ...mediaSummary
  })
}

function markCurrentRoomMediaChecked(options = {}) {
  const mediaSummary = getCurrentDocumentMediaSummary()
  const currentLocation = getCurrentListingLocation()
  const key = makeRoomDailyScopeKey(currentLocation)
  const currentDay = getBusinessDayKey()
  const existing = key ? normalizeRoomDailyStatusStore(roomDailyStatusByScope.value)[key] : null
  const documentItemCount = Math.max(Number(existing?.documentItemCount || 0), Number(mediaSummary.mediaTotalCount || 0))
  const allCurrentLadiesHaveMedia = documentItemCount > 0 && mediaSummary.mediaReadyCount >= documentItemCount

  return updateCurrentRoomDailyStatus({
    ...mediaSummary,
    documentItemCount,
    mediaUploadedAt: options.uploadSucceeded && allCurrentLadiesHaveMedia
      ? new Date().toISOString()
      : (existing?.businessDayKey === currentDay ? existing?.mediaUploadedAt || '' : '')
  })
}

function getRoomDailyStatus(room, scope = {}) {
  const location = {
    city: scope.city || managerSelectedCity.value || ruleScopeCity.value,
    district: scope.district || managerSelectedDistrict.value || ruleScopeDistrict.value,
    mode: scope.mode || scope.type || managerSelectedType.value || ruleScopeType.value,
    room
  }
  const key = makeRoomDailyScopeKey(location)
  const record = key ? normalizeRoomDailyStatusStore(roomDailyStatusByScope.value)[key] : null
  const businessDayKey = getBusinessDayKey()
  const emptyStatus = {
    state: 'idle',
    shortLabel: '⚪ 今日尚未更新',
    detail: '今日尚未更新文件3與媒體。',
    complete: false,
    documentSaved: false
  }

  if (!record || record.businessDayKey !== businessDayKey) return emptyStatus

  const documentSaved = Boolean(record.documentSavedAt && getBusinessDayKey(record.documentSavedAt) === businessDayKey)
  const mediaUploaded = Boolean(record.mediaUploadedAt && getBusinessDayKey(record.mediaUploadedAt) === businessDayKey)
  const totalCount = Math.max(Number(record.documentItemCount || 0), Number(record.mediaTotalCount || 0))
  const readyCount = Math.min(totalCount || Number(record.mediaReadyCount || 0), Number(record.mediaReadyCount || 0))
  const complete = documentSaved && mediaUploaded && totalCount > 0 && readyCount >= totalCount
  const timeText = formatRoomDailyStatusTime(record.mediaUploadedAt || record.documentSavedAt)

  if (complete) {
    return {
      state: 'complete',
      shortLabel: `✅ 本日已更新${timeText ? ` ${timeText}` : ''}`,
      detail: `文件3與媒體均已完成｜小姐 ${readyCount}/${totalCount}｜圖 ${record.imageCount || 0}／影 ${record.videoCount || 0}`,
      complete: true,
      documentSaved: true
    }
  }

  if (documentSaved) {
    const mediaProgress = totalCount > 0 ? `${readyCount}/${totalCount}` : '未完成'
    return {
      state: 'partial',
      shortLabel: `🟡 文件3已更新・媒體 ${mediaProgress}`,
      detail: `文件3已於 ${formatRoomDailyStatusTime(record.documentSavedAt) || '今日'} 儲存；媒體完成 ${mediaProgress}，全部小姐有媒體後才會顯示本日已更新。`,
      complete: false,
      documentSaved: true
    }
  }

  return emptyStatus
}

function getRoomOptionDisplayLabel(room) {
  const status = getRoomDailyStatus(room)
  return `${room}｜${status.shortLabel}`
}

const managerRoomDailyUpdatedCount = computed(() => managerRooms.value.filter(room => getRoomDailyStatus(room).complete).length)
const managerRoomDailyUpdatedSummary = computed(() => `今日已更新 ${managerRoomDailyUpdatedCount.value}/${managerRooms.value.length}`)
const currentRoomDailyStatus = computed(() => ruleScopeRoom.value ? getRoomDailyStatus(ruleScopeRoom.value) : getRoomDailyStatus(''))

function validateCurrentListingLocation() {
  const location = getCurrentListingLocation()
  const missingParts = []
  if (!location.city) missingParts.push('縣市')
  if (!location.district) missingParts.push('地區')
  if (!location.mode) missingParts.push('定點 / 外送')
  if (!location.room) missingParts.push('機房')

  if (missingParts.length) {
    const message = `請先在「地區機房管理」選完整範圍：${missingParts.join('、')}，再儲存文件3送出資料庫。`
    statusMessage.value = message
    apiStatusText.value = message
    return null
  }

  return location
}

function parseConfirmedTextToJson(text) {
  const location = getCurrentListingLocation()
  const blocks = String(text || '')
    .replace(/^\n+/, '')
    .split(/\n\s*\n/)
    .map(block => block.trim())
    .filter(Boolean)

  const items = blocks.map((block, index) => {
    const lines = block.split('\n').map(line => line.trim()).filter(Boolean)
    const firstLine = lines[0] || ''
    const serviceLine = lines.slice(1).join(' ').trim()

    const titleMatch = firstLine.match(/^【([^】]+)】\s*(.*)$/)
    const title = titleMatch ? titleMatch[1].trim() : ''
    const rest = titleMatch ? titleMatch[2].trim() : firstLine

    const titleParts = title.split(/\s+/).filter(Boolean)
    const country = titleParts[0] || ''
    const name = titleParts.slice(1).join(' ') || ''

    const bodyMatch = rest.match(/^(\d{3})\s+(\d{2})\s+([A-Za-z])(?:\s+(\d{2})y)?\s*(.*)$/)
    const height = bodyMatch ? Number(bodyMatch[1]) : null
    const weight = bodyMatch ? Number(bodyMatch[2]) : null
    const cup = bodyMatch ? bodyMatch[3].toUpperCase() : ''
    const age = bodyMatch && bodyMatch[4] ? Number(bodyMatch[4]) : null
    const pricesPart = bodyMatch ? bodyMatch[5] : rest

    const pricePlans = pricesPart
      .split(/\s+/)
      .map(parsePriceTextToObject)
      .filter(Boolean)

    const services = serviceLine
      ? serviceLine.split(/\s+/).map(item => item.trim()).filter(Boolean)
      : []

    const sourceRoom = cleanScopeText(ruleScopeRoom.value)
    const sourceIdentity = makeStableLadySourceIdentity({
      country,
      name,
      city: location.city,
      district: location.district,
      mode: location.mode,
      sourceRoom,
      body: {
        height,
        weight,
        cup,
        age
      }
    })

    return {
      sourceIndex: index + 1,
      sourceIdentity,
      sourceRoom,
      country,
      name,
      city: location.city,
      district: location.district,
      mode: location.mode,
      room: location.room,
      location: location.locationText,
      locationInfo: location,
      body: {
        height,
        weight,
        cup,
        age
      },
      pricePlans,
      services,
      rawText: block
    }
  })

  return {
    generatedAt: new Date().toISOString(),
    source: 'document3_confirmed',
    location,
    total: items.length,
    items
  }
}

function updateJsonPreview() {
  jsonResultText.value = JSON.stringify(parseConfirmedTextToJson(confirmedText.value), null, 2)
}

function ensureSourceTextBottomBlankLines(text = '') {
  const baseText = String(text || '').replace(/[\s\n]+$/g, '')
  return `${baseText}\n\n`
}

const isManagerScopeReadyForConvert = computed(() => {
  return Boolean(
    cleanScopeText(managerSelectedCity.value) &&
    cleanScopeText(managerSelectedDistrict.value) &&
    cleanScopeText(managerSelectedType.value) &&
    cleanScopeText(ruleScopeRoom.value)
  )
})

function getMissingManagerScopePartsForConvert() {
  const missing = []
  if (!cleanScopeText(managerSelectedCity.value)) missing.push('縣市')
  if (!cleanScopeText(managerSelectedDistrict.value)) missing.push('地區')
  if (!cleanScopeText(managerSelectedType.value)) missing.push('定點 / 外送')
  if (!cleanScopeText(ruleScopeRoom.value)) missing.push('機房')
  return missing
}

function buildManagerScopeRequiredMessage() {
  const missing = getMissingManagerScopePartsForConvert()
  return missing.length
    ? `請先在上方「地區機房管理」選完整範圍：${missing.join('、')}。選好後才能套用模式產生文件2。`
    : ''
}

async function convertTextWithScopeGuard() {
  // 第 018-116 批：未選完整縣市 / 地區 / 定點外送 / 機房時，不允許產生文件2，避免套錯規則範圍。
  if (!isManagerScopeReadyForConvert.value) {
    const message = buildManagerScopeRequiredMessage()
    statusMessage.value = message
    apiStatusText.value = message
    setRoomRuleFeedback(message, 'error', { toast: true })
    showScopeManager.value = true
    return
  }

  try {
    await withEffectiveRulesForEmployee(async () => convertText())
  } catch (error) {
    const message = `無法套用有效規則：${error.message || error}`
    statusMessage.value = message
    apiStatusText.value = message
    setRoomRuleFeedback(message, 'error', { toast: true })
  }
}

function resetResultValidationState() {
  resultCompleteCount.value = 0
  resultIncompleteCount.value = 0
}

function clearResultText(options = {}) {
  resultText.value = ''
  resetResultValidationState()
  if (!options.silent) statusMessage.value = '已清空文件2。'
}

function convertText() {
  const originalText = sourceText.value.trim()
  if (!originalText) {
    clearResultText({ silent: true })
    statusMessage.value = '請先貼上文件1原始資料。'
    return
  }

  const cleanedText = cleanupSourceText(originalText)
  sourceText.value = ensureSourceTextBottomBlankLines(cleanedText)

  const blocks = splitBlocks(cleanedText)
  const parsed = blocks.map(block => analyzeRecordForPreview(block))
  const visibleRecords = parsed.filter(item => item.preview)
  const completeRecords = visibleRecords.filter(item => item.complete)
  const incompleteRecords = visibleRecords.filter(item => !item.complete)

  resultCompleteCount.value = completeRecords.length
  resultIncompleteCount.value = incompleteRecords.length
  resultText.value = visibleRecords.map(item => item.preview).join('\n\n')

  if (!visibleRecords.length) {
    statusMessage.value = `沒有抓到可預覽資料。請確認文件1至少有可辨識的小姐名或國籍；目前已切出 ${blocks.length} 筆。`
    return
  }

  if (incompleteRecords.length) {
    const detailText = incompleteRecords
      .map(item => {
        const label = item.header?.name || '未辨識小姐'
        return `${label}（缺少：${item.missing.join('、')}）`
      })
      .join('；')

    statusMessage.value = `已辨識 ${visibleRecords.length} 筆：完整 ${completeRecords.length} 筆、不完整 ${incompleteRecords.length} 筆。${detailText} 文件2目前僅供預覽，補齊全部缺少欄位後才能加入文件3。`
    return
  }

  statusMessage.value = `已產生 ${completeRecords.length} 筆固定格式；文件1符號已清理。`
}

function shouldKeepExplicitPaidServiceWhenCleaning(word = '') {
  const normalized = normalizeServiceAliasMatchText(word)
  if (!normalized) return false

  // 第 018-162 批：不想出現文字裡若因「情趣用品/客自帶-新」被拆出「情趣用品」，
  // 遇到文件1明確寫「情趣用品+500」時，不能把服務名稱清掉只剩「+500」。
  const protectedPaidServiceWords = [
    '情趣用品',
    '自慰秀',
    '艷舞',
    '豔舞',
    '口爆',
    '吞精',
    '顏射',
    '入珠',
    '入珠客',
    '清槍',
    '絲襪',
    '後門',
    '攝影',
    '攝影不露臉',
    '攝影露臉',
    '無套內射',
    '無套外射',
    '高跟鞋',
    '2S',
    '2s'
  ].map(item => normalizeServiceAliasMatchText(item))

  return protectedPaidServiceWords.includes(normalized)
}

// 第 018-166 批：店家常把可搭配的雙飛對象寫成「雙飛琳琳 / 雙飛 琳琳 / 雙飛/琳琳」。
// 清理文件1時不能只刪掉「雙飛」而留下孤立姓名；統一保留成「雙飛：琳琳」。
function normalizeDoubleFlyPartnerName(value = '') {
  const name = String(value || '')
    .replace(/^[\s\/:：\-－]+|[\s\/:：\-－]+$/g, '')
    .trim()

  if (!name) return ''
  if (name.length > 12) return ''
  if (!/^[\u4e00-\u9fa5A-Za-z0-9]+$/.test(name)) return ''
  if (/^\d+(?:s|S)?$/.test(name)) return ''
  if (extractStandaloneCountryFromLine(name)) return ''
  if (isNotHeaderLine(name)) return ''

  return name
}

function replaceDoubleFlyPartnerPhrases(text = '', replacer = null) {
  const pattern = /(?:可以搭配|可搭配)?雙飛[ \t]*(?:[\/:：\-－][ \t]*)?([\u4e00-\u9fa5A-Za-z0-9]{1,12})/g

  return String(text || '').replace(pattern, (matched, rawName) => {
    const name = normalizeDoubleFlyPartnerName(rawName)
    if (!name) return matched
    return typeof replacer === 'function' ? replacer(name, matched) : `雙飛：${name}`
  })
}

function protectDoubleFlyPartnerPhrases(text = '') {
  const protectedItems = []
  const protectedText = replaceDoubleFlyPartnerPhrases(text, name => {
    const placeholder = `DOUBLEFLYPAIR${protectedItems.length}TOKEN`
    protectedItems.push({ placeholder, value: `雙飛：${name}` })
    return placeholder
  })

  return { protectedText, protectedItems }
}

function restoreDoubleFlyPartnerPhrases(text = '', protectedItems = []) {
  let restored = String(text || '')
  protectedItems.forEach(item => {
    restored = restored.replace(new RegExp(escapeRegExp(item.placeholder), 'g'), item.value)
  })
  return restored
}

function extractDoubleFlyPartnerServices(text = '') {
  const partners = []
  replaceDoubleFlyPartnerPhrases(text, name => {
    if (!partners.includes(name)) partners.push(name)
    return `雙飛：${name}`
  })
  return partners.map(name => `雙飛：${name}`)
}

function cleanupSourceText(text) {
  let cleaned = normalizeDigits(String(text || ''))

  cleaned = cleaned
    .replace(/[^\u4e00-\u9fa5A-Za-z0-9\s\n\/／\.\+\-\:\：]/g, ' ')
    .replace(/[／]/g, '/')
    .replace(/[：]/g, ':')
    .replace(/[ \t]+/g, ' ')

  // 第 018-166 批：先把「雙飛＋搭配小姐名」換成暫存標記，避免不想出現文字中的
  // 「雙飛 / 可以搭配雙飛 / 可搭配」把關係詞刪掉後，只剩一個孤立小姐名。
  const doubleFlyProtection = protectDoubleFlyPartnerPhrases(cleaned)
  cleaned = doubleFlyProtection.protectedText

  // 第 018-148 批：不想出現文字改成逐行／逗號／斜線解析，禁止把句子中的空格拆成獨立數字。
  // 舊版使用 parseList() 會把「仟色好評截圖 退 100」拆成「100」，
  // 進而把文件1的「吞精+1000／無套外+1000」錯刪成「+0」。
  parseCleanupWords(removeWordsText.value)
    .sort((a, b) => b.length - a.length)
    .forEach(word => {
      if (!word || isUnsafeNumericCleanupToken(word)) return

      const pattern = new RegExp(escapeRegExp(word), 'g')
      if (shouldKeepExplicitPaidServiceWhenCleaning(word)) {
        cleaned = cleaned.replace(pattern, (matchedWord, offset, fullText) => {
          const tail = String(fullText || '').slice(offset + String(matchedWord || '').length, offset + String(matchedWord || '').length + 20)
          const normalizedCleanupWord = normalizeServiceAliasMatchText(word)

          // 第 018-167 批：「入珠客+500」是完整的加價條件，不能因清理字詞「入珠」
          // 被截成「客+500」。只有後方明確帶 +金額 時才保留，拒絕／禁止入珠客仍照常清除。
          if (normalizedCleanupWord === normalizeServiceAliasMatchText('入珠')
            && /^\s*客\s*(?:\+|加)\s*\d{2,5}/.test(tail)) {
            return matchedWord
          }

          return /^\s*(?:\+|加)\s*\d{2,5}/.test(tail) ? matchedWord : ''
        })
        return
      }

      cleaned = cleaned.replace(pattern, '')
    })

  cleaned = restoreDoubleFlyPartnerPhrases(cleaned, doubleFlyProtection.protectedItems)

  const normalizedLines = cleaned
    .split('\n')
    .map(line => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim()

  return normalizeLooseNameBodyCountryLines(normalizedLines)
}

function normalizeLooseNameBodyCountryLines(text) {
  const lines = String(text || '').split('\n')
  let currentCountry = ''

  return lines.map(line => {
    const contextCountry = extractLooseCountryContext(line)
    if (contextCountry) currentCountry = contextCountry

    const looseHeader = parseLooseNameBodyHeaderLine(line)
    if (looseHeader && !extractLooseCountryContext(line)) {
      const country = currentCountry || '馬來'
      return `${country} ${line}`.replace(/[ \t]+/g, ' ').trim()
    }

    return line
  }).join('\n').trim()
}

function extractLooseCountryContext(line) {
  const cleaned = normalizeHeaderText(line)
  if (!cleaned) return ''
  if (isNotHeaderLine(cleaned) && !/(越南|馬來|馬來西亞|泰國|泰妹|台灣|台妹|港澳|日本|韓國|外籍)/.test(cleaned)) return ''

  const compact = cleaned.replace(/\s+/g, '')
  const countries = getCountryKeys().sort((a, b) => b.length - a.length)
  for (const country of countries) {
    if (compact.includes(country)) return normalizeCountry(country)
  }

  return ''
}

function parseLooseNameBodyHeaderLine(line) {
  const cleaned = normalizeHeaderText(line)
  if (!cleaned || parseHeaderLine(cleaned)) return null

  const match = cleaned.match(/^([\u4e00-\u9fa5A-Za-z0-9]{1,18})\s+(\d{3})\s+(\d{2})\s+(?:\d{2}\s+)?(?:(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)\s*)?[A-Za-z]\b/i)
  if (!match) return null

  const name = cleanName(match[1])
  if (!isValidName(name)) return null
  return { name }
}

function splitBlocks(text) {
  const lines = String(text || '').split('\n')
  const startIndexes = []

  // 第 018-164 批：同一份文件可能同時包含：
  // 1.「嫩p 越南」這種姓名＋國籍同一行。
  // 2.「萌喵喵」下一行才寫「越南」的姓名／國籍分行格式。
  // 舊版只要先找到第 1 種，就完全不再掃描純姓名起點，導致第 2 位小姐被併入上一筆。
  lines.forEach((line, index) => {
    const normalizedLine = normalizeThaiCountryHeaderLine(line)
    const structuredHeader = parseStructuredHeaderAt(lines, index)
    // 第 018-169 批：標準規則若因員工／機房自訂規則誤把「妮妮 馬來西亞」
    // 判成非標題，仍以固定國籍清單做第二層結構辨識，避免整份文件切出 0 筆。
    const hasCountryHeader = Boolean(
      structuredHeader || parseHeaderLine(normalizedLine) || parseStrictNameCountryHeaderLine(normalizedLine)
    )
    const previousStructuredHeader = index > 0 ? parseStructuredHeaderAt(lines, index - 1) : null
    const isStructuredHeaderContinuation = Boolean(
      previousStructuredHeader
      && previousStructuredHeader.consumedLines === 2
      && previousStructuredHeader.startIndex === index - 1
    )
    const hasNameOnlyHeader = !hasCountryHeader
      && !isStructuredHeaderContinuation
      && isNameOnlyHeaderLine(line)
      && looksLikeNameOnlyRecordStart(lines, index)

    if (hasCountryHeader || hasNameOnlyHeader) startIndexes.push(index)
  })

  const uniqueStartIndexes = Array.from(new Set(startIndexes)).sort((a, b) => a - b)
  if (uniqueStartIndexes.length) {
    return uniqueStartIndexes
      .map((startIndex, index) => {
        const endIndex = index + 1 < uniqueStartIndexes.length ? uniqueStartIndexes[index + 1] : lines.length
        return lines.slice(startIndex, endIndex).join('\n').trim()
      })
      // 第 018-172 批：文件2本來就允許顯示「缺少身材／價格」的不完整小姐，
      // 因此切筆後只要仍有可辨識的小姐標題就必須保留。
      // 舊版用 hasMinimumRecordFields() 先要求價格完整，會讓使用者把備註加入
      // 「不想出現文字」後，原本僅靠錯誤姓名候選被保留下來的台妹整筆消失。
      .filter(block => Boolean(findHeaderInBlock(block) || parseNameOnlyRecord(block)))
  }

  const fallbackBlock = String(text || '').trim()
  return fallbackBlock && (findHeaderInBlock(fallbackBlock) || parseNameOnlyRecord(fallbackBlock))
    ? [fallbackBlock]
    : []
}

function normalizeThaiCountryHeaderLine(line) {
  let value = String(line || '').trim()
  value = value.replace(/^泰國妹妹\s+/, '泰妹 ')
  value = value.replace(/^泰國妹\s+/, '泰妹 ')
  value = value.replace(/^泰國\s+/, '泰妹 ')
  // 第 018-155 批：店家常用「馬來妹 小姐名」表示國籍＋姓名，不能把「妹」併進小姐名。
  value = value.replace(/^馬來(?:妹妹|妹)\s+/, '馬來 ')
  return value
}




function looksLikeNameOnlyRecordStart(lines, index) {
  // 第 018-164 批：純姓名起點必須在很近的位置接到「國籍（可省略）→ 身材 → 價格」。
  // 避免服務文字剛好位於下一位小姐前方時，被錯當成新的小姐姓名。
  const followingLines = lines
    .slice(index + 1, index + 9)
    .map(line => String(line || '').trim())
    .filter(Boolean)

  let bodyIndex = -1
  for (let offset = 0; offset < Math.min(followingLines.length, 4); offset += 1) {
    const candidate = followingLines[offset]
    if (parseBody(candidate)) {
      bodyIndex = offset
      break
    }

    const allowedBeforeBody = Boolean(extractStandaloneCountryFromLine(candidate))
      || /^(?:\d{2}\s*(?:歲|y|Y))$/.test(normalizeDigits(candidate))
    if (!allowedBeforeBody) return false
  }

  if (bodyIndex < 0) return false

  // 第 018-178 批：純姓名下一個非空白行若立即就是有效身材，
  // 即可確認為新小姐起點，不必再要求價格在 4 行內出現。
  // 來源常在身材與價格之間插入多行服務，舊版因此漏切下一位小姐，
  // 導致下一位的身材被錯套到上一位。
  if (bodyIndex === 0) return true

  // 姓名後先獨立寫國籍，再接身材，也視為明確新筆。
  if (bodyIndex === 1 && extractStandaloneCountryFromLine(followingLines[0])) return true

  const pricePreview = followingLines.slice(bodyIndex + 1, bodyIndex + 8).join('\n')
  return parsePrices(pricePreview, 0).length > 0
}

function isNameOnlyHeaderLine(line) {
  const cleaned = normalizeHeaderText(line)
  if (!cleaned || isNotHeaderLine(cleaned)) return false

  // 有國籍的仍交給 parseHeaderLine，不走無國籍邏輯。
  if (parseHeaderLine(cleaned)) return false

  // 第 018-165 批：獨立一行的國籍只是上一行小姐姓名的補充欄位，不能再被當成下一位小姐姓名。
  // 例：萌喵喵 / 越南 / 160 44 真D 19y，必須維持同一筆「越南 萌喵喵」。
  if (extractStandaloneCountryFromLine(cleaned)) return false

  if (cleaned.length > 18) return false
  if (/^\d+$/.test(cleaned)) return false
  if (/^(分|分鐘|回|歲|奶|杯|國家|國籍|服務|套餐|超值|升級|底單|最低|請自備|禁止|備註)$/.test(cleaned)) return false

  return /^[\u4e00-\u9fa5A-Za-z0-9]+$/.test(cleaned)
}

function buildPreviewHeaderTitle(name = '', country = '') {
  const safeName = String(name || '').trim() || '未辨識小姐'
  const safeCountry = String(country || '').trim()

  if (titleMode.value === 'name-country') {
    return `【${[safeName, safeCountry].filter(Boolean).join(' ')}】`
  }
  if (titleMode.value === 'name-only') return `【${safeName}】`
  return `【${[safeCountry, safeName].filter(Boolean).join(' ')}】`
}

function analyzeRecordForPreview(block) {
  // 第 018-155 批：即使缺少身材或正式價格，也要在文件2顯示已辨識內容與缺少欄位。
  // 不完整資料只能預覽，不能加入文件3，避免錯誤資料同步到文件4與中央網站。
  const header = findHeaderInBlock(block) || parseNameOnlyRecord(block)
  const explicitCountry = extractCountryFromBlock(block)
  const finalCountry = explicitCountry || header?.country || (header ? '馬來' : '')
  const parsedBody = parseBody(block)
  const headerAge = extractAgeFromHeaderLines(block, header, finalCountry)
  const body = parsedBody ? {
    ...parsedBody,
    age: parsedBody.age || headerAge
  } : null
  const prices = parsePrices(block, getAppliedIncrease(finalCountry))
  const services = extractServices(block)
  const missing = []

  if (!header) missing.push('小姐姓名／國籍')
  if (!body) missing.push('身高／體重／罩杯')
  if (!prices.length) missing.push('正式價格方案')

  const complete = Boolean(header && body && prices.length)
  const title = buildPreviewHeaderTitle(header?.name, finalCountry)
  const bodyText = body ? formatBodyOutput(body) : ''
  const firstLine = [title, bodyText, prices.join('  ')].filter(Boolean).join('  ')
  const previewLines = [firstLine]

  if (!complete) previewLines.push(`⚠ 缺少：${missing.join('、')}`)
  if (services.length) previewLines.push(services.join(' '))

  return {
    block,
    header,
    country: finalCountry,
    body,
    prices,
    services,
    missing,
    complete,
    preview: previewLines.filter(Boolean).join('\n')
  }
}

function parseRecord(block) {
  const analyzed = analyzeRecordForPreview(block)
  if (!analyzed.complete) return null

  const title = buildTitle({
    name: analyzed.header.name,
    country: analyzed.country,
    height: analyzed.body.height,
    weight: analyzed.body.weight,
    cup: analyzed.body.cup,
    age: analyzed.body.age
  })

  return `${title}  ${analyzed.prices.join('  ')}\n${analyzed.services.join(' ')}`
}

function extractStandaloneCountryFromLine(line) {
  const compact = normalizeHeaderText(line).replace(/\s+/g, '')
  if (!compact) return ''

  const countries = getCountryKeys().sort((a, b) => b.length - a.length)
  const matchedCountry = countries.find(country => (
    compact === normalizeHeaderText(country).replace(/\s+/g, '')
  ))

  return matchedCountry ? normalizeCountry(matchedCountry) : ''
}

function extractCountryFromBlock(block) {
  const text = String(block || '')

  // 使用者自訂國籍欄位規則優先。
  // 例：國家:馬來=馬來、越南新妹=越南
  const customRules = parseKeyValueLines(countryFieldRulesText.value)
  for (const [from, to] of customRules) {
    if (!from || !to) continue
    if (text.includes(from)) return normalizeCountry(to)
  }

  const match = text.match(/(?:國家|國籍)\s*[:：]?\s*(馬來西亞|馬來|越南|港澳|台灣|台妹|泰國|泰妹|日本|韓國|外籍)/)
  if (match) return normalizeCountry(match[1])

  // 第 018-164 批：支援姓名與國籍分成兩行，例如：
  // 萌喵喵
  // 越南
  // 160 44 真D 19y
  // 只接受整行完全等於國籍，避免從服務內容誤抓國籍。
  const standaloneCountry = text
    .split(/\r?\n/)
    .slice(0, 10)
    .map(extractStandaloneCountryFromLine)
    .find(Boolean)

  return standaloneCountry || ''
}


function parseNameOnlyRecord(block) {
  const lines = String(block || '').split('\n').map(line => line.trim()).filter(Boolean)

  for (const line of lines.slice(0, 10)) {
    if (!isNameOnlyHeaderLine(line)) continue

    return {
      country: extractCountryFromBlock(block) || '馬來',
      name: cleanName(line)
    }
  }

  return null
}

function findHeaderInBlock(block) {
  const lines = String(block || '').split('\n')

  for (let index = 0; index < Math.min(lines.length, 12); index += 1) {
    const structuredHeader = parseStructuredHeaderAt(lines, index)
    if (structuredHeader) return structuredHeader

    const normalizedLine = normalizeThaiCountryHeaderLine(lines[index])
    const header = parseHeaderLine(normalizedLine) || parseStrictNameCountryHeaderLine(normalizedLine)
    if (header) return header
  }

  return null
}

function extractAgeFromHeaderLines(block, header, country = '') {
  if (!header) return ''

  const name = String(header.name || '').trim()
  const fixedCountry = normalizeCountry(country || header.country || '')
  const countryAliases = getCountryKeys().filter(item => normalizeCountry(item) === fixedCountry)
  const lines = normalizeDigits(String(block || ''))
    .split('\n')
    .map(line => normalizeHeaderText(line))
    .filter(Boolean)

  for (const line of lines.slice(0, 12)) {
    const ageMatch = line.match(/(?:^|\s)(\d{2})\s*(?:歲|y|Y)(?=$|\s|[^A-Za-z0-9])/)
    if (!ageMatch) continue

    const includesName = name && line.includes(name)
    const includesCountry = countryAliases.some(alias => alias && line.includes(alias))
    const hasBody = /\d{3}\s*[/ .．]?\s*\d{2}\s*[/ .．]?\s*(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?[A-Za-z]/i.test(line)

    // 第 018-108 批：支援「名字 國籍 年齡」與下一行「國籍 身高 體重 胸部」合併。
    // 只從標題/國籍線補年齡，避免從服務備註或價格行誤抓。
    if (includesName || includesCountry || hasBody) return `${ageMatch[1]}y`
  }

  return ''
}



function getStrictBuiltInCountryAliases() {
  const aliases = new Map()

  defaultCountryAliases.forEach(line => {
    const [from, to] = String(line || '').split('=').map(item => item.trim())
    if (from && to) aliases.set(from, to)
  })

  // 固定保底，不受目前員工補充規則、機房規則或誤填的「不要誤判成小姐名」影響。
  ;[
    ['馬來西亞', '馬來'],
    ['馬來', '馬來'],
    ['越南', '越南'],
    ['泰國', '泰妹'],
    ['泰妹', '泰妹'],
    ['台灣', '台妹'],
    ['台妹', '台妹'],
    ['港澳', '港澳'],
    ['日本', '日本'],
    ['韓國', '韓國'],
    ['外籍', '外籍']
  ].forEach(([from, to]) => {
    if (!aliases.has(from)) aliases.set(from, to)
  })

  return aliases
}

function isStrictHeaderNameCandidate(value) {
  const name = cleanName(value)
  if (!name || name.length > 18 || /^\d+$/.test(name)) return false

  // 這層保底只排除明確不可能是姓名的結構，不讀取使用者自訂 notNameWordsText，
  // 避免自訂規則誤傷正常小姐名。
  if (/\d{3}\s*[/ .．]?\s*\d{2}/.test(name)) return false
  if (/\d{3,5}(?:元)?$/.test(name)) return false
  if (/^(?:分|分鐘|回|歲|奶|杯|國家|國籍|服務|套餐|超值|升級|底單|最低|請自備|禁止|備註)$/.test(name)) return false
  if (/(?:共浴|無套吹|品鮑|按摩|舌吻|口爆|吞精|顏射|自慰|雙飛|攝影|買\d|送\d|\d+s)/i.test(name)) return false

  return /^[\u4e00-\u9fa5A-Za-z0-9]+$/.test(name)
}

function parseStrictNameCountryHeaderLine(line) {
  const cleaned = normalizeHeaderText(line)
  if (!cleaned) return null

  const aliases = getStrictBuiltInCountryAliases()
  const countries = Array.from(aliases.keys()).sort((a, b) => b.length - a.length)
  const tokens = cleaned.split(/\s+/).filter(Boolean)
  const compact = cleaned.replace(/\s+/g, '')

  for (const country of countries) {
    const fixedCountry = aliases.get(country) || country
    const exactIndex = tokens.findIndex(token => token === country)

    if (exactIndex !== -1) {
      const before = tokens.slice(0, exactIndex).join('')
      const after = tokens.slice(exactIndex + 1).join('')
      const candidates = [before, after]
      for (const candidate of candidates) {
        if (isStrictHeaderNameCandidate(candidate)) {
          return { country: normalizeCountry(fixedCountry), name: cleanName(candidate) }
        }
      }
    }

    if (compact.startsWith(country)) {
      const candidate = compact.slice(country.length)
      if (isStrictHeaderNameCandidate(candidate)) {
        return { country: normalizeCountry(fixedCountry), name: cleanName(candidate) }
      }
    }

    if (compact.endsWith(country)) {
      const candidate = compact.slice(0, compact.length - country.length)
      if (isStrictHeaderNameCandidate(candidate)) {
        return { country: normalizeCountry(fixedCountry), name: cleanName(candidate) }
      }
    }
  }

  return null
}

function parseHeaderLine(line) {
  const cleaned = normalizeHeaderText(line)
  if (!cleaned) return null

  const advancedHeader = parseHeaderWithAdvancedRegex(line)
  if (advancedHeader) return advancedHeader

  const structuredHeader = parseStructuredHeaderSameLine(line)
  if (structuredHeader) return structuredHeader

  if (isNotHeaderLine(cleaned)) return null

  const countries = getCountryKeys().sort((a, b) => b.length - a.length)
  const compact = cleaned.replace(/\s+/g, '')
  const tokens = cleaned.split(/\s+/).filter(Boolean)

  for (const country of countries) {
    const fixedCountry = normalizeCountry(country)

    const exactIndex = tokens.findIndex(token => token === country)
    if (exactIndex !== -1) {
      const before = tokens.slice(0, exactIndex).join('')
      const after = tokens.slice(exactIndex + 1).join('')
      const name = pickHeaderName(before, after)
      if (isValidName(name)) return { country: fixedCountry, name: cleanName(name) }
    }

    if (compact.startsWith(country)) {
      const name = removeHeaderNoise(compact.slice(country.length))
      if (isValidName(name)) return { country: fixedCountry, name: cleanName(name) }
    }

    if (compact.endsWith(country)) {
      const name = removeHeaderNoise(compact.slice(0, compact.length - country.length))
      if (isValidName(name)) return { country: fixedCountry, name: cleanName(name) }
    }

    // 支援：小魚兒越南新妹、可樂港澳新妹、香水台灣新妹
    const insideIndex = compact.indexOf(country)
    if (insideIndex > 0) {
      const before = compact.slice(0, insideIndex)
      const after = compact.slice(insideIndex + country.length)
      const name = pickHeaderName(before, after)
      if (isValidName(name)) return { country: fixedCountry, name: cleanName(name) }
    }
  }

  return null
}

function pickHeaderName(beforeCountry, afterCountry) {
  const before = removeHeaderNoise(beforeCountry)
  const after = removeHeaderNoise(afterCountry)

  // 「小魚兒 越南新妹」這種，國籍後面只是新妹/新人等說明，名稱要取國籍前面。
  // 第 018-108 批：支援「雨嫣 馬來 23歲」這種標題，國籍後面只有年齡時，名稱仍取國籍前面。
  if (before && (!after || isCountrySuffixOnly(after) || isBodySuffixOnly(afterCountry) || isAgeSuffixOnly(afterCountry))) return before
  if (after && !isAgeSuffixOnly(afterCountry)) return after
  return before
}

function isCountrySuffixOnly(text) {
  return /^(新妹|新茶|新人|嫩妹|妹妹|妹|漂亮|正妹|可愛|甜美|外送妹)$/.test(String(text || '').trim())
}

function isAgeSuffixOnly(text) {
  const value = normalizeDigits(String(text || ''))
    .replace(/[.．,，。:：;；/\\_-]/g, ' ')
    .replace(/\s+/g, '')
    .trim()

  return /^\d{2}(?:歲|y|Y)?$/.test(value)
}

function isBodySuffixOnly(text) {
  const value = normalizeDigits(String(text || ''))
    .replace(/[^\u4e00-\u9fa5A-Za-z0-9]/g, '')
    .trim()

  if (!value) return false

  return /^(?:\d{2}(?:歲|y|Y)?)?\d{3}\d{2}(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?[A-Za-z].*$/i.test(value)
}

function removeHeaderNoise(text) {
  let value = normalizeDigits(String(text || ''))

  // 標題同一行可能長這樣：
  // 越南妹妹 京香 157/44/D
  // 需要先把身材片段切掉，避免小姐名變成「京香15744D」或「16244E」。
  value = value
    .replace(/\d{2}\s*(?:歲|y|Y)\s*[.．\s]*\d{3}\s*[\/.．]\s*\d{2}\s*[\/.．]?\s*(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?[A-Za-z].*$/g, '')
    .replace(/\d{3}\s*[\/.．]\s*\d{2}\s*[\/.．]?\s*(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?[A-Za-z].*$/g, '')
    .replace(/\d{3}\d{2}(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?[A-Za-z].*$/g, '')
    .replace(/\d+(?:\.\d+)?\s*\/\s*\d{2,3}\s*\/\s*\d+\s*S?.*$/ig, '')
    .replace(/\d{2,3}\s*(?:分鐘|分).*$/g, '')

  value = value
    .replace(/[^\u4e00-\u9fa5A-Za-z0-9]/g, '')
    .trim()

  // 第 018-149 批：像「小妹妹」這種三字小姐名，結尾雖然是「妹妹」，仍是完整姓名。
  // 舊版會把所有「妹妹」尾綴一律移除，導致「小妹妹」只剩「小」。
  if (!/^[\u4e00-\u9fa5]妹妹$/.test(value)) {
    value = value.replace(/(新妹|新茶|新人|嫩妹|妹妹|外送妹)$/g, '')
  }

  return value
}



function normalizeHeaderText(line) {
  return String(line || '').replace(/[^\u4e00-\u9fa5A-Za-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function isNotHeaderLine(line) {
  const value = String(line || '')
  const serviceAliasValue = normalizeServiceAliasMatchText(value)

  // 第 018-172 批：「泰國洗+500元」中的「泰國」是服務名稱的一部分，
  // 不是國籍標題。必須在國籍＋姓名解析前先排除，避免被切成假小姐「洗500元」。
  const thaiWashServiceMatched = /^(?:泰國洗|泰洗|泰式洗)(?:\+|加)?\d{0,5}(?:元)?$/.test(serviceAliasValue)
  if (thaiWashServiceMatched) return true

  // 一般提醒句不可成為無國籍小姐名。這類文字被加入「不想出現文字」後，
  // 也不得影響前一位小姐是否保留在文件2。
  const customerNoticeMatched = /(?:請客人|客人.*(?:自備|零鈔)|盡量自備|自備零鈔)/.test(value)
  if (customerNoticeMatched) return true

  // 第 018-98 批：避免「買2節送1S」這種短服務行被當成無國籍小姐名。
  // 舊版 name-only 切筆會往後看 10 行，如果下一位小姐的身材/價格剛好在範圍內，
  // 服務行就會變成假的切筆點，導致上一位小姐漏掉 2+1s / 3+1 / 5+3。
  const buyGiftServiceMatched = /買\d+節送\d+(?:節|s)?/i.test(serviceAliasValue)
    || /買\d+送\d+(?:節|s)?/i.test(serviceAliasValue)
    || /買\d+節\/\d+s/i.test(serviceAliasValue)
  if (buyGiftServiceMatched) return true

  const baseMatched = /\d{2,3}\s*(?:分鐘|分)|\d{3}\s*\/\s*\d{2}|回\s*\d{3,5}|[0-9]{3,5}$|國家|國籍|服務|套餐|超值|升級|共浴|無套吹|品鮑|按摩|舌吻|絲襪|情趣|口爆|吞精|顏射|自慰|短鍾|短鐘|長鍾|長鐘|底|雙飛|深喉|豪邁|吃屌|不嫌|視野|愛愛|需|請自備|禁止|酒客|入珠|吸毒|生客|包夜|不限時段|模式|送一節|次數|攝影|露臉/.test(value)
  if (baseMatched) return true

  return parseList(notNameWordsText.value).some(word => word && value.includes(word))
}


function isValidName(name) {
  const value = String(name || '').trim()
  if (!value) return false
  if (value.length > 18) return false
  if (/^\d+$/.test(value)) return false
  if (/^(分|分鐘|回|歲|奶|杯|國家|國籍|服務|套餐|超值|升級|底單|最低)$/.test(value)) return false

  // 第 018-172 批：姓名候選若帶有明確金額尾碼或完整服務名稱，必定不是小姐名。
  // 例：「泰國洗+500元」不能因移除國籍「泰國」後變成「洗500元」。
  if (/\d{3,5}(?:元)?$/.test(value)) return false
  if (/(?:泰國洗|泰洗|泰式洗|共浴|口爆|吞精|顏射|按摩|攝影|買\d|送\d)/.test(value)) return false

  return true
}

function parseSeparatedDigitBodyLine(line) {
  const source = normalizeDigits(String(line || '')).normalize('NFKC').trim()
  if (!source) return null

  // 第 018-178 批：支援店家把身高、體重逐字分開。
  // 例：1 6 2 4 8 D ＝ 162 / 48 / D。
  // 僅接受「5 個單一數字＋A～K 罩杯」，避免將價格或電話誤判為身材。
  const compactMatch = source.match(
    /^\s*(\d)\s+(\d)\s+(\d)\s+(\d)\s+(\d)\s+(?:(\d)\s+(\d)\s*(?:歲|y|Y)\s+)?(?:(?:真奶|天然|真|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓|奶|罩杯|胸)\s*)?(?:\d{2,3}\s*)?([A-Ka-k])\s*(?:奶|杯)?(?:\s+(\d)\s+(\d)\s*(?:歲|y|Y))?\s*$/iu
  )
  if (!compactMatch) return null

  const ageBeforeCup = compactMatch[6] && compactMatch[7]
    ? `${compactMatch[6]}${compactMatch[7]}y`
    : ''
  const ageAfterCup = compactMatch[9] && compactMatch[10]
    ? `${compactMatch[9]}${compactMatch[10]}y`
    : ''

  return validateParsedBodyResult({
    height: `${compactMatch[1]}${compactMatch[2]}${compactMatch[3]}`,
    weight: `${compactMatch[4]}${compactMatch[5]}`,
    cup: compactMatch[8],
    age: ageBeforeCup || ageAfterCup
  })
}

function parseBody(text) {
  const rawLines = normalizeDigits(String(text || ''))
    .split('\n')
    .map(line => String(line || '').normalize('NFKC').trim())
    .filter(Boolean)

  for (const line of rawLines) {
    const separatedDigitBody = parseSeparatedDigitBodyLine(line)
    if (separatedDigitBody) return separatedDigitBody

    const advancedBody = parseBodyWithAdvancedRegex(line)
    if (advancedBody) return advancedBody

    const structuredBody = parseBodyWithStructuredRules(line)
    if (structuredBody) return structuredBody
  }

  const lines = rawLines
    .map(line => normalizeBodyText(line).trim())
    .filter(Boolean)

  // 第 009-9-7-6-11：
  // 年齡只能從明確有「歲 / y」的文字取得。
  // 不能從下一行價格 2000/40/1S 誤抓成 20y，也不能從 1100/40/0.5 誤抓成 11y。
  for (const line of lines) {
    // 第 018-174 批：支援身材欄位用點號／斜線連寫，且罩杯前帶內衣胸圍尺寸。
    // 例：166.46.真奶34D.22y、166／46／真奶34Ｄ／22歲。
    // 34 是內衣胸圍尺寸，文件2只取 D；點號只是欄位分隔，不可因此判定缺少身材。
    const delimitedBraSizeBodyMatch = line.match(
      /^\s*(\d{3})\s*[\/.．。·・,，:：_-]\s*(\d{2})\s*[\/.．。·・,，:：_-]\s*(?:(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)\s*)?(?:奶|罩杯|胸)?\s*(?:\d{2,3}\s*)?([A-Ka-k])\s*(?:奶|杯)?(?:\s*[\/.．。·・,，:：_-]\s*|\s+)?(?:(\d{2})\s*(?:歲|y|Y))?(?=\s|$)/
    )
    if (delimitedBraSizeBodyMatch) {
      return {
        height: delimitedBraSizeBodyMatch[1],
        weight: delimitedBraSizeBodyMatch[2],
        cup: delimitedBraSizeBodyMatch[3].toUpperCase(),
        age: delimitedBraSizeBodyMatch[4] ? `${delimitedBraSizeBodyMatch[4]}y` : ''
      }
    }

    const ageFirstMatch = line.match(/(\d{2})\s*(?:歲|y|Y)\s*[.．\s]*\s*(\d{3})\s*[\/.．]\s*(\d{2})\s*[\/.．]?\s*(?:\d{2})?\s*(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?([A-Ka-k])\s*(?:奶|杯)?/)
    if (ageFirstMatch) {
      return {
        height: ageFirstMatch[2],
        weight: ageFirstMatch[3],
        cup: ageFirstMatch[4].toUpperCase(),
        age: `${ageFirstMatch[1]}y`
      }
    }

    const bodyWithExplicitAgeMatch = line.match(/(\d{3})\s*[\/.．]\s*(\d{2})\s*[\/.．]?\s*(?:\d{2})?\s*(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?([A-Ka-k])\s*(?:奶|杯)?\s*[\/\s]*?(\d{2})\s*(?:歲|y|Y)\b/)
    if (bodyWithExplicitAgeMatch) {
      return {
        height: bodyWithExplicitAgeMatch[1],
        weight: bodyWithExplicitAgeMatch[2],
        cup: bodyWithExplicitAgeMatch[3].toUpperCase(),
        age: `${bodyWithExplicitAgeMatch[4]}y`
      }
    }
  }

  for (const line of lines) {
    // 第 018-175 批：支援年齡寫在罩杯前面。
    // 例：150 40 20y 天然D、150／40／20歲／天然D。
    // 舊版會把年齡尾碼 y 誤抓成罩杯 Y；這裡先以明確順序解析，且罩杯只接受 A～K。
    const ageBeforeCupBodyMatch = line.match(
      /^\s*(\d{3})\s*(?:[\/.．。·・,，:：_-]\s*|\s+)(\d{2})\s*(?:[\/.．。·・,，:：_-]\s*|\s+)(\d{2})\s*(?:歲|y|Y)\s*(?:[\/.．。·・,，:：_-]\s*|\s+)(?:(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)\s*)?(?:奶|罩杯|胸)?\s*(?:\d{2,3}\s*)?([A-Ka-k])\s*(?:奶|杯)?(?=\s|$)/
    )
    if (ageBeforeCupBodyMatch) {
      return {
        height: ageBeforeCupBodyMatch[1],
        weight: ageBeforeCupBodyMatch[2],
        cup: ageBeforeCupBodyMatch[4].toUpperCase(),
        age: `${ageBeforeCupBodyMatch[3]}y`
      }
    }

    // 第 018-173 批：支援內衣胸圍數字黏在罩杯前面的寫法。
    // 例：166 46 真奶34D 22y、166 46 34D 22歲。
    // 34 是胸圍尺寸，文件2只取罩杯 D；不可因此整行判定為缺少身材。
    const spacedBraSizeBodyMatch = line.match(
      /^\s*(\d{3})\s+(\d{2})\s+(?:(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)\s*)?(?:奶|罩杯|胸)?\s*(?:\d{2,3}\s*)?([A-Ka-k])\s*(?:奶|杯)?\s*(?:(\d{2})\s*(?:歲|y|Y))?/
    )
    if (spacedBraSizeBodyMatch) {
      return {
        height: spacedBraSizeBodyMatch[1],
        weight: spacedBraSizeBodyMatch[2],
        cup: spacedBraSizeBodyMatch[3].toUpperCase(),
        age: spacedBraSizeBodyMatch[4] ? `${spacedBraSizeBodyMatch[4]}y` : ''
      }
    }

    // 第 018-149 批：支援「158 47 20 E」＝身高 158、體重 47、年齡 20、罩杯 E。
    // 第三個兩位數位於體重與罩杯之間時，視為明確年齡，不再被舊版略過。
    const spacedBodyWithAgeMatch = line.match(/^\s*(\d{3})\s+(\d{2})\s+(\d{2})\s+(?:(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)\s*)?([A-Ka-k])\s*(?:奶|杯)?/)
    if (spacedBodyWithAgeMatch) {
      return {
        height: spacedBodyWithAgeMatch[1],
        weight: spacedBodyWithAgeMatch[2],
        cup: spacedBodyWithAgeMatch[4].toUpperCase(),
        age: `${spacedBodyWithAgeMatch[3]}y`
      }
    }

    // batch018-71：支援「155.44.莫奶D」「155/44/莫奶D」這種點號身材。
    // 這類資料常把 Cup 放在中文描述最後，原本只認「真D」或「D」，會導致整筆小姐解析失敗。
    const descriptiveBodyMatch = line.match(/(\d{3})\s*[\/.．]\s*(\d{2})\s*[\/.．]\s*(?:[\u4e00-\u9fa5]{0,8})?([A-Ka-k])\s*(?:奶|杯)?(?:\s*(\d{2})\s*(?:歲|y|Y))?/)
    if (descriptiveBodyMatch) {
      return {
        height: descriptiveBodyMatch[1],
        weight: descriptiveBodyMatch[2],
        cup: descriptiveBodyMatch[3].toUpperCase(),
        age: descriptiveBodyMatch[4] ? `${descriptiveBodyMatch[4]}y` : ''
      }
    }

    const bodyOnlyMatch = line.match(/(\d{3})\s*[\/.．]\s*(\d{2})\s*[\/.．]?\s*(?:\d{2})?\s*(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?([A-Ka-k])\s*(?:奶|杯)?/)
    if (bodyOnlyMatch) {
      return {
        height: bodyOnlyMatch[1],
        weight: bodyOnlyMatch[2],
        cup: bodyOnlyMatch[3].toUpperCase(),
        age: ''
      }
    }

    const spacedBodyMatch = line.match(/(\d{3})\s+(\d{2})\s+(?:\d{2}\s*)?(?:[\u4e00-\u9fa5]{0,8})?(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?([A-Ka-k])\s*(?:奶|杯)?/)
    if (spacedBodyMatch) {
      const spacedAgeMatch = line.match(/(?:^|\s)(\d{2})\s*(?:歲|y|Y)\b/)
      return {
        height: spacedBodyMatch[1],
        weight: spacedBodyMatch[2],
        cup: spacedBodyMatch[3].toUpperCase(),
        age: spacedAgeMatch ? `${spacedAgeMatch[1]}y` : ''
      }
    }
  }

  return null
}







function normalizeBodyText(text) {
  let value = String(text || '')

  const prefixes = [
    ...parseList(bodyCupPrefixText.value),
    '真',
    '天然',
    '假',
    '大',
    '小',
    '巨',
    '美',
    '漂亮',
    '自然',
    '軟',
    '嫩',
    '挺',
    '飽',
    '彈',
    '圓'
  ]

  prefixes.forEach(word => {
    if (!word) return
    value = value.replace(new RegExp(escapeRegExp(word) + '(?=[A-Za-z])', 'g'), '')
  })

  return value
}



function parseBottomPriceAmount(value) {
  const rawText = String(value || '').trim()
  const rawAmount = Number(rawText)
  if (!rawAmount) return 0

  // 第 018-100 批：底價縮寫補正。
  // 1.5底 / 2.5底：小數 K 寫法，乘 1000。
  // 15底 / 19底 / 22底：兩位數百元寫法，乘 100。
  // 1500底 / 1900底：已是實際金額，原樣保留。
  if (rawAmount >= 1000) return rawAmount
  if (rawText.includes('.')) return rawAmount * 1000
  if (rawAmount >= 10 && rawAmount < 100) return rawAmount * 100
  if (rawAmount > 0 && rawAmount < 10) return rawAmount * 1000

  return rawAmount
}


function normalizePriceSessionLabel(value) {
  const text = String(value || '').trim().toUpperCase().replace(/\s+/g, '')
  if (text === 'NS' || text === 'N/S') return 'NS'

  const numericMatch = text.match(/^(\d+)S?$/i)
  if (numericMatch) return `${Number(numericMatch[1])}S`

  return '1S'
}

function getPriceSessionSortValue(sessionLabel) {
  if (sessionLabel === 'NS') return 999
  const match = String(sessionLabel || '').match(/^(\d+)S$/i)
  return match ? Number(match[1]) : 1
}

function extractPriceSessionLabel(line) {
  const normalized = String(line || '').toUpperCase().replace(/ＮＳ/g, 'NS')
  const nsMatch = normalized.match(/(?:^|[^A-Z0-9])N\s*\/?\s*S(?=$|[^A-Z0-9])/i)
  if (nsMatch) return 'NS'

  const sessionMatch = normalized.match(/(?:^|[^A-Z0-9])(\d+)\s*S(?=$|[^A-Z0-9])/i)
  if (sessionMatch) return `${Number(sessionMatch[1])}S`

  return '1S'
}

function parsePrices(text, increase) {
  const results = []
  const seen = new Set()
  const lines = normalizeDigits(String(text || '')).split('\n')

  const pushPrice = (minutes, sessionCount, amount, options = {}) => {
    const min = Number(minutes)
    const sessionLabel = normalizePriceSessionLabel(sessionCount || '1S')
    const rawAmount = Number(amount || 0)
    if (!min || !sessionLabel || !rawAmount) return

    // 第 009-9-7-6-9：
    // 以前只用 minutes 去重，會造成 60/1S 出現後 60/2S 被跳過。
    // 現在改成「分鐘 + 節數」去重，60/1S 與 60/2S 會同時保留。
    // 第 018-104 批：NS 是獨立節數標籤，不能被預設成 1S。
    const key = `${min}/${sessionLabel}`
    if (seen.has(key)) return
    seen.add(key)

    const finalAmount = options.keepRawAmount
      ? rawAmount
      : resolveFinalAmountWithMinuteRule(rawAmount, increase, min)

    results.push({
      minutes: min,
      sessionSort: getPriceSessionSortValue(sessionLabel),
      sessionLabel,
      text: `${formatAmount(finalAmount)}/${min}/${sessionLabel}`
    })
  }

  lines.forEach(line => {
    const normalized = line
      .replace(/[：]/g, ':')
      .replace(/[／]/g, '/')
      .replace(/　/g, ' ')
      .trim()

    // 第 018-170 批：支援「金額 分鐘 節數」的空格方案格式。
    // 例：1500 20 1S、1900 40 1S、3500 90 2S。
    // 整行必須只包含金額、分鐘與可選節數，並限制金額與分鐘範圍，
    // 避免把身高／體重／年齡或服務數字誤判為正式價格。
    const plainAmountMinuteMatch = normalized.match(
      /^([0-9]{3,5})\s+(\d{2,3})(?:\s+(NS|N\s*\/?\s*S|\d+\s*S))?$/i
    )
    if (plainAmountMinuteMatch) {
      const amount = Number(plainAmountMinuteMatch[1])
      const minutes = Number(plainAmountMinuteMatch[2])
      const sessionCount = plainAmountMinuteMatch[3] || '1S'

      if (amount >= 1000 && minutes >= 10 && minutes <= 180) {
        pushPrice(minutes, sessionCount, amount)
        return
      }
    }

    // 第 018-164 批：支援只有空格、未寫「分／分鐘」的正式價格。
    // 例：30 2500 → 2.5K/30/1S；50 2800 → 2.8K/50/1S。
    // 也支援 30 1S 2500、30 2500 1S；整行必須只有分鐘、金額與可選節數，
    // 避免把身高體重或其他服務數字誤判為價格。
    const plainMinuteAmountMatch = normalized.match(
      /^(\d{2,3})\s+(?:(NS|N\s*\/?\s*S|\d+\s*S)\s+)?([0-9]{3,5})(?:\s+(NS|N\s*\/?\s*S|\d+\s*S))?$/i
    )
    if (plainMinuteAmountMatch) {
      const minutes = Number(plainMinuteAmountMatch[1])
      const sessionCount = plainMinuteAmountMatch[2] || plainMinuteAmountMatch[4] || '1S'
      const amount = Number(plainMinuteAmountMatch[3])

      if (minutes >= 10 && minutes <= 180 && amount >= 1000) {
        // 第 018-165 批：這種「分鐘 金額」只是另一種底價寫法，仍必須套用目前的國籍／固定加價與金額轉換規則。
        // 例：越南 +500，30 2500 → 3K/30/1S；50 2800 → 3.3K/50/1S。
        pushPrice(minutes, sessionCount, amount)
        return
      }
    }

    // 第 018-77 批：
    // 支援店家常見寫法：
    // 快餐20分1S 1.5K底
    // 短鐘40分1S 2.0K底
    // 長鐘60分1S 2.3K底
    //
    // 原本只有「20分/1.5K」或「20分/1.5底」能被辨識，
    // 分鐘後直接接 1S、價格又帶 K底時會整筆解析失敗。
    const labeledKBottomMatch = normalized.match(
      /(?:快餐|短[鐘鍾]|長[鐘鍾])?\s*(\d{2,3})\s*(?:分鐘|分)\s*(?:(NS|\d+\s*S))?\s*([0-9]+(?:\.[0-9]+)?)\s*[kK]\s*底?/i
    )

    if (labeledKBottomMatch) {
      const minutes = Number(labeledKBottomMatch[1])
      const sessionCount = labeledKBottomMatch[2] || '1S'
      const kAmount = Number(labeledKBottomMatch[3])

      if (minutes && sessionCount && kAmount) {
        pushPrice(minutes, sessionCount, kAmount * 1000)
      }
      return
    }

    // 第 018-172 批：支援「底」寫在金額前面的方案。
    // 例：短鐘30分1S 底2.8、長鐘50分1S 底3.1。
    const bottomBeforeAmountMatch = normalized.match(
      /(?:快餐|短[鐘鍾]|長[鐘鍾])?\s*(\d{2,3})\s*(?:分鐘|分)\s*(NS|N\s*\/?\s*S|\d+\s*S)?\s*底(?:價)?\s*([0-9]+(?:\.[0-9]+)?)/i
    )
    if (bottomBeforeAmountMatch) {
      const minutes = Number(bottomBeforeAmountMatch[1])
      const sessionCount = bottomBeforeAmountMatch[2] || '1S'
      const amount = parseBottomPriceAmount(bottomBeforeAmountMatch[3])
      pushPrice(minutes, sessionCount, amount)
      return
    }

    // 第 018-111 批：隱藏自動解析規則強化。
    // 支援「30分鐘 1s 25底」「50分鐘 1S 28底」這種節數夾在分鐘與底價中間的格式。
    // 這是自動判斷模式內建規則，不新增按鈕、不改既有操作流程。
    const sessionBeforeBottomMatch = normalized.match(/(\d{2,3})\s*(?:分鐘|分)\s*(NS|N\s*\/?\s*S|\d+\s*S)?\s*([0-9]+(?:\.[0-9]+)?)\s*底/i)
    if (sessionBeforeBottomMatch) {
      const minutes = Number(sessionBeforeBottomMatch[1])
      const sessionCount = sessionBeforeBottomMatch[2] || '1S'
      const amount = parseBottomPriceAmount(sessionBeforeBottomMatch[3])
      pushPrice(minutes, sessionCount, amount)
      return
    }

    const oldMatch = normalized.match(/(\d{2,3})\s*(?:分鐘|分)\s*(?:\/|\s|:|-)*\s*([0-9]+(?:\.[0-9]+)?)\s*底/i)
    if (oldMatch) {
      const minutes = Number(oldMatch[1])
      const base = Number(oldMatch[2])
      if (!minutes || !base) return

      // 第 018-75-1 批：
      // 同時支援「30分/2.5底」與「短鐘 30分 2.5底」。
      // 「長2S 60分 3.3底」會從同一行抓到 2S；未標節數時維持 1S。
      const sessionCount = extractPriceSessionLabel(normalized)

      // batch018-47：
      // 「20分/1300底」的 1300 是實際金額，不可以再 *1000，
      // 否則會變成 1300.5K/20/1S。
      // 第 018-100 批：補正店家常見兩位數底價。
      // 例：「20分 15底」代表 1500，不是 15000；「40分 19底」代表 1900。
      const amount = parseBottomPriceAmount(oldMatch[2])
      pushPrice(minutes, sessionCount, amount)
      return
    }

    // 支援 2/30/1S、2.2/30/1S、2200/40/1S、3300/60/2S、6.6/90/NS
    const compactAmountMatch = normalized.match(/^([0-9]+(?:\.[0-9]+)?)\s*\/\s*(\d{2,3})\s*\/\s*(NS|\d+\s*S?)/i)
    if (compactAmountMatch) {
      const rawAmountNumber = Number(compactAmountMatch[1])
      const minutes = Number(compactAmountMatch[2])
      const sessionCount = compactAmountMatch[3] || '1S'
      if (!rawAmountNumber || !minutes) return

      const amount = rawAmountNumber < 100 ? rawAmountNumber * 1000 : rawAmountNumber
      pushPrice(minutes, sessionCount, amount)
      return
    }

    const kMatch = normalized.match(/(\d{2,3})\s*(?:分鐘|分)\s*\/\s*(NS|\d+\s*S?)\s*([0-9.]+)\s*[kK]/i)
    if (kMatch) {
      const minutes = Number(kMatch[1])
      const sessionCount = kMatch[2] || '1S'
      const kAmount = Number(kMatch[3])
      if (!minutes || !kAmount) return
      pushPrice(minutes, sessionCount, kAmount * 1000)
      return
    }

    const minuteMatch = normalized.match(/(\d{2,3})\s*(?:分鐘|分)/)
    if (!minuteMatch) return
    const minutes = Number(minuteMatch[1])
    if (!minutes) return

    const sessionCount = extractPriceSessionLabel(normalized)

    const amountCandidates = [...normalized.matchAll(/([0-9]{3,5})/g)]
      .map(match => Number(match[1]))
      .filter(amount => amount >= 1000)
    const amount = amountCandidates.length ? amountCandidates[amountCandidates.length - 1] : 0
    if (!amount) return

    pushPrice(minutes, sessionCount, amount)
  })

  return results
    .sort((a, b) => {
      if (a.minutes !== b.minutes) return a.minutes - b.minutes
      return a.sessionSort - b.sessionSort
    })
    .map(item => item.text)
}





function hasMinimumRecordFields(text) {
  return !!(findHeaderInBlock(text) || parseNameOnlyRecord(text)) && !!parseBody(text) && parsePrices(text, 0).length > 0
}

// 第 018-157 批：同義詞必須以文件1「當下那一行」判斷。
// 同一行若同時符合長、短規則，只保留最長且不重疊的規則，避免：
// 無套+1000 可內射 同時套到「無套內射+1000」與「無套+1000」。
function getLineAliasMatches(sourceLine, aliases = []) {
  const normalizedLine = normalizeServiceAliasMatchText(sourceLine)
  if (!normalizedLine) return []

  const candidates = []
  ;(Array.isArray(aliases) ? aliases : []).forEach(([from, to], ruleIndex) => {
    if (!from || !to) return
    const normalizedFrom = normalizeServiceAliasMatchText(from)
    if (!normalizedFrom) return

    let offset = 0
    while (offset <= normalizedLine.length - normalizedFrom.length) {
      const start = normalizedLine.indexOf(normalizedFrom, offset)
      if (start < 0) break
      candidates.push({
        from,
        to,
        normalizedFrom,
        start,
        end: start + normalizedFrom.length,
        exactLine: normalizedLine === normalizedFrom,
        ruleIndex
      })
      offset = start + Math.max(1, normalizedFrom.length)
    }
  })

  candidates.sort((a, b) => {
    if (a.exactLine !== b.exactLine) return a.exactLine ? -1 : 1
    if (a.normalizedFrom.length !== b.normalizedFrom.length) {
      return b.normalizedFrom.length - a.normalizedFrom.length
    }
    if (a.start !== b.start) return a.start - b.start
    return a.ruleIndex - b.ruleIndex
  })

  const selected = []
  candidates.forEach(candidate => {
    const overlapsSelected = selected.some(item => (
      candidate.start < item.end && candidate.end > item.start
    ))
    if (!overlapsSelected) selected.push(candidate)
  })

  return selected.sort((a, b) => a.start - b.start)
}

function extractServices(block) {
  const found = new Set()
  const order = parseList(serviceOrderText.value)
  const aliases = parseAliasRules(aliasRulesText.value)
    .sort((a, b) => normalizeServiceAliasMatchText(b[0]).length - normalizeServiceAliasMatchText(a[0]).length)
  const extra = parseList(extraKeepText.value)
  const searchableBlock = normalizeServiceAliasMatchText(block)
  const explicitPaidAliasOutputs = new Set()
  const explicitPromotionAliasMatches = []

  // 第 018-157 批：逐行套用同義詞；同一行的重疊規則採最長優先。
  // 不同服務即使寫在同一行，只要文字區段不重疊，仍可各自套用。
  // 第 018-168 批：另外記住「員工明確設定的優惠組合同義詞」及其文字範圍。
  // 後方內建買送規則只能處理尚未被同義詞覆蓋的文字，避免同時輸出買2節3s與買2送1。
  const aliasSourceLines = String(block || '')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)

  aliasSourceLines.forEach((sourceLine, lineIndex) => {
    const matches = getLineAliasMatches(sourceLine, aliases)
    matches.forEach(({ from, to, start, end }) => {
      const outputTokens = []

      to.split(/\s+/).filter(Boolean).forEach(item => {
        const outputToken = buildAliasOutputTokenWithExplicitAmount(from, item, sourceLine)
        if (!outputToken) return
        found.add(outputToken)
        outputTokens.push(outputToken)
        if (hasMonetaryServiceSuffix(outputToken) && aliasSourceCarriesTargetAmount(from, outputToken, sourceLine)) {
          explicitPaidAliasOutputs.add(outputToken)
        }
      })

      if (outputTokens.some(isPromotionServiceToken)) {
        explicitPromotionAliasMatches.push({
          lineIndex,
          start,
          end,
          outputs: outputTokens.filter(isPromotionServiceToken)
        })
      }
    })
  })

  // 第 018-144 批：優惠組合採單向中文化。
  // 文件1已經是中文就保留中文；只有 2+1 / 2+1S / 2+3S / 3+1 / 5+3 縮寫才轉成中文。
  const forcedServiceAliases = [
    ['買2送1', '買2送1'],
    ['買2送一', '買2送1'],
    ['買二送一', '買2送1'],
    ['買兩送一', '買2送1'],
    ['買二送1', '買2送1'],
    ['買兩送1', '買2送1'],
    ['買2節送1s', '買2節送1s'],
    ['買2節送一s', '買2節送1s'],
    ['買二節送一s', '買2節送1s'],
    ['買兩節送一s', '買2節送1s'],
    ['買兩節送1s', '買2節送1s'],
    ['買2節送1節', '買2節送1節'],
    ['買3送1', '買3送1'],
    ['買3節送1節', '買3節送1節'],
    ['買5送3', '買5送3'],
    ['買5節送3節', '買5節送3節'],
    ['買2節3s', '買2節3s'],
    ['買二節3s', '買2節3s'],
    ['買兩節3s', '買2節3s'],
    ['買2節/3s', '買2節3s'],
    ['買二節/三s', '買2節3s'],
    ['買兩節/三s', '買2節3s']
  ]

  forcedServiceAliases.forEach(([from, to]) => {
    const normalizedFrom = normalizeServiceAliasMatchText(from)
    if (normalizedFrom && searchableBlock.includes(normalizedFrom)) {
      found.add(to)
    }
  })

  // 第 018-144 批：中文優惠原文維持中文，不再反向縮成 2+1 / 3+1 / 5+3。
  const compactServiceText = searchableBlock
  const forcedBuyGiftPatterns = [
    { output: '買2送1', patterns: [/買2送1/g] },
    { output: '買2節送1s', patterns: [/買2節送1s/g] },
    { output: '買2節送1節', patterns: [/買2節送1節/g] },
    { output: '買2節3s', patterns: [/買2節3s/g, /買2節\/3s/g] },
    { output: '買3送1', patterns: [/買3送1(?!\d+分)/g] },
    { output: '買3節送1節', patterns: [/買3節送1節(?!\d+分)/g] },
    { output: '買5送3', patterns: [/買5送3(?!\d+分)/g] },
    { output: '買5節送3節', patterns: [/買5節送3節(?!\d+分)/g] }
  ]

  forcedBuyGiftPatterns.forEach(rule => {
    if (rule.patterns.some(pattern => pattern.test(compactServiceText))) {
      found.add(rule.output)
    }
  })

  extra.forEach(item => {
    if (!item) return
    const normalizedItem = normalizeServiceAliasMatchText(item)
    if (block.includes(item) || (normalizedItem && searchableBlock.includes(normalizedItem))) {
      found.add(normalizeServiceOutputToken(item))
    }
  })

  // 第 018-166 批：雙飛後方若有搭配小姐名，文件2統一顯示「雙飛：小姐名」。
  // 有明確對象時移除泛用的「雙飛」，避免同時出現「雙飛 雙飛：琳琳」。
  const doubleFlyPartnerServices = extractDoubleFlyPartnerServices(block)
  if (doubleFlyPartnerServices.length) {
    found.delete('雙飛')
    doubleFlyPartnerServices.forEach(item => found.add(item))
  }

  // 第 018-163 批：入珠同時可能出現在『禁止酒客/入珠/吸毒』限制句，
  // 也可能是店家明確列出的加價服務『入珠+500』。限制句會在文件1清理階段移除；
  // 這裡只在原文確實帶有 +金額 時加入文件2，且不依賴資料庫內既有同義詞規則，
  // 避免舊機房規則尚未包含入珠時，更新程式後仍然漏抓。
  const explicitBeadAmount = findExplicitAmountForServiceName(block, '入珠')
  if (explicitBeadAmount) {
    const explicitBeadService = `入珠+${explicitBeadAmount}`
    found.add(explicitBeadService)
    explicitPaidAliasOutputs.add(explicitBeadService)
  }

  // 第 018-167 批：入珠客屬於完整加價條件。文件1寫「入珠客+500元」時，
  // 文件1保留原意，文件2統一去掉「元」顯示成「入珠客+500」。
  const explicitBeadCustomerAmount = findExplicitAmountForServiceName(block, '入珠客')
  if (explicitBeadCustomerAmount) {
    const explicitBeadCustomerService = `入珠客+${explicitBeadCustomerAmount}`
    found.add(explicitBeadCustomerService)
    explicitPaidAliasOutputs.add(explicitBeadCustomerService)
  }

  // 第 018-167 批：攝影名稱必須依文件1原意輸出。
  // 「攝影+1000」不可自行推定為露臉；只有明寫露臉／不露臉時才加上對應文字。
  const explicitPhotographyAmount = findExplicitAmountForServiceName(block, '攝影')
  const explicitNoFacePhotographyAmount = findExplicitPhotographyAmount(block, 'no-face')
  const explicitFacePhotographyAmount = findExplicitPhotographyAmount(block, 'face')

  if (shouldPreferNoFacePhotography(block)) {
    removePhotographyServiceVariants(found)
    const amount = explicitNoFacePhotographyAmount || explicitPhotographyAmount
    const output = amount ? `攝影不露臉+${amount}` : '攝影不露臉'
    found.add(output)
    if (amount) explicitPaidAliasOutputs.add(output)
  } else if (shouldPreferFacePhotography(block)) {
    removePhotographyServiceVariants(found)
    const amount = explicitFacePhotographyAmount || explicitPhotographyAmount
    const output = amount ? `攝影露臉+${amount}` : '攝影露臉'
    found.add(output)
    if (amount) explicitPaidAliasOutputs.add(output)
  } else if (explicitPhotographyAmount) {
    removePhotographyServiceVariants(found)
    const output = `攝影+${explicitPhotographyAmount}`
    found.add(output)
    explicitPaidAliasOutputs.add(output)
  }

  // 第 018-114 批：買節「送艷舞 / 送豔舞」屬於贈送服務，
  // 沒有明確寫 +500 時，不可被舊同義詞誤轉成「艷舞+500」。
  if (shouldPreferFreeDanceGift(block)) {
    found.delete('艷舞+500')
    found.delete('豔舞+500')
    found.add('艷舞')
  }

  enforceExplicitPaidServices(found, block, explicitPaidAliasOutputs)
  reconcileExplicitServiceAmounts(found, block, aliases)
  normalizeOverlappingServices(found)
  syncPromotionComboServicesWithSource(found, block, explicitPromotionAliasMatches)

  const orderIndex = new Map(order.map((item, index) => [normalizeServiceOutputToken(item), index]))
  return Array.from(found).sort((a, b) => {
    const ai = getServiceOrderIndex(a, orderIndex)
    const bi = getServiceOrderIndex(b, orderIndex)

    if (ai !== bi) return ai - bi
    return String(a).localeCompare(String(b), 'zh-Hant')
  })
}

function getServiceOrderIndex(item, orderIndex) {
  if (orderIndex.has(item)) return orderIndex.get(item)

  // 如果使用者把 2節3S 改顯示成 2+1s，
  // 但服務固定排序仍寫 2節3S，就讓 2+1s 使用 2節3S 的排序位置。
  const aliasOrderMap = new Map([
    ['買2送1', '2+1'],
    ['買2節送1s', '2節3S'],
    ['買2節送1節', '2+1'],
    ['買2節送3s', '2節3S'],
    ['買3送1', '3+1'],
    ['買3節送1節', '3+1'],
    ['買5送3', '5+3'],
    ['買5節送3節', '5+3'],
    ['買2節3s', '2節3S'],
    ['深喉嚨', '深喉'],
    ['口爆', '口爆+500'],
    ['吞精', '吞精+500'],
    ['顏射', '顏射+500'],
    ['自慰秀', '自慰秀+500'],
    ['情趣用品', '情趣用品+500'],
    ['艷舞', '艷舞+500'],
    ['絲襪', '絲襪+100'],
    ['0.01套', '0.01套+100'],
    ['2S', '2S+500'],
    ['攝影', '攝影+1000'],
    ['攝影不露臉', '攝影不露臉+1000'],
    ['攝影露臉', '攝影露臉+1000']
  ])

  const mapped = aliasOrderMap.get(item)
  if (mapped && orderIndex.has(mapped)) return orderIndex.get(mapped)

  // 第 018-163 批：舊機房已儲存的服務排序可能尚未包含『入珠+500』。
  // 此時仍把任意明確金額的入珠服務排在顏射後方，而不是掉到整串服務最末端。
  if (stripMonetaryServiceSuffix(item) === '入珠') {
    if (orderIndex.has('入珠+500')) return orderIndex.get('入珠+500')
    if (orderIndex.has('顏射+500')) return orderIndex.get('顏射+500') + 0.1
    if (orderIndex.has('自慰秀+500')) return orderIndex.get('自慰秀+500') - 0.1
  }

  if (stripMonetaryServiceSuffix(item) === '入珠客') {
    if (orderIndex.has('入珠客+500')) return orderIndex.get('入珠客+500')
    if (orderIndex.has('入珠+500')) return orderIndex.get('入珠+500') + 0.1
  }

  // 第 018-166 批：使用者舊機房排序通常沒有「雙飛：小姐名」，
  // 有設定「雙飛」就沿用其位置；沒有則固定排在其他未設定服務之前。
  if (/^雙飛[:：]/.test(String(item || ''))) {
    if (orderIndex.has('雙飛')) return orderIndex.get('雙飛')
    return Number.MAX_SAFE_INTEGER - 1
  }

  return Number.MAX_SAFE_INTEGER
}

const PROMOTION_SERVICE_SIGNATURES = new Set([
  '2+1', '2+1s', '2+3s', '3+1', '5+3',
  '買2送1', '買2節送1s', '買2節送1節', '買2節送3s', '買2節3s',
  '買3送1', '買3節送1節',
  '買5送3', '買5節送3節'
].map(item => normalizeServiceAliasMatchText(item)))

function isPromotionServiceToken(value) {
  const signature = normalizeServiceAliasMatchText(normalizeServiceOutputToken(value))
  return !!signature && PROMOTION_SERVICE_SIGNATURES.has(signature)
}

function applyBuiltInPromotionRules(found, sourceText) {
  const compact = normalizeServiceAliasMatchText(sourceText)
  if (!compact) return

  // 中文來源：只處理未被使用者同義詞覆蓋的剩餘文字。
  const chineseRules = [
    ['買2節送1s', /買2節送1s/],
    ['買2節送1節', /買2節送1節/],
    ['買2節送3s', /買2節送3s/],
    ['買2節3s', /買2節\/?3s/],
    ['買2送1', /買2送1/],
    ['買3節送1節', /買3節送1節(?!\d+分)/],
    ['買3送1', /買3送1(?!\d+分)/],
    ['買5節送3節', /買5節送3節(?!\d+分)/],
    ['買5送3', /買5送3(?!\d+分)/]
  ]

  chineseRules.forEach(([output, pattern]) => {
    if (pattern.test(compact)) found.add(output)
  })

  // 縮寫來源：2+1S / 2+3S 必須先判斷，避免被較短規則吃掉。
  const shorthandRules = [
    ['買2節送1s', /(^|[^0-9])2\+1s(?![a-z0-9])/i],
    ['買2節送3s', /(^|[^0-9])2\+3s(?![a-z0-9])/i],
    ['買2送1', /(^|[^0-9])2\+1(?![a-z0-9])/i],
    ['買3送1', /(^|[^0-9])3\+1(?![a-z0-9])/i],
    ['買5送3', /(^|[^0-9])5\+3(?![a-z0-9])/i]
  ]

  shorthandRules.forEach(([output, pattern]) => {
    if (pattern.test(compact)) found.add(output)
  })
}

function syncPromotionComboServicesWithSource(found, block, explicitAliasMatches = []) {
  // 第 018-168 批：所有優惠組合先清空，再依「明確同義詞優先、內建規則補漏」重建。
  // 同義詞有設定時，該段文字完全以使用者最後輸入的右側結果為準；
  // 內建買送判斷只掃描未被同義詞覆蓋的文字，不再產生重複或把5S方案降成一般買5送3。
  Array.from(found).forEach(item => {
    if (isPromotionServiceToken(item)) found.delete(item)
  })

  const sourceLines = String(block || '')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)

  const matchesByLine = new Map()
  ;(Array.isArray(explicitAliasMatches) ? explicitAliasMatches : []).forEach(match => {
    if (!match || !Number.isInteger(match.lineIndex)) return
    const list = matchesByLine.get(match.lineIndex) || []
    list.push(match)
    matchesByLine.set(match.lineIndex, list)

    ;(Array.isArray(match.outputs) ? match.outputs : []).forEach(output => {
      const token = normalizeServiceOutputToken(output)
      if (token) found.add(token)
    })
  })

  sourceLines.forEach((sourceLine, lineIndex) => {
    const compact = normalizeServiceAliasMatchText(sourceLine)
    if (!compact) return

    const masked = compact.split('')
    const lineMatches = matchesByLine.get(lineIndex) || []
    lineMatches.forEach(match => {
      const start = Math.max(0, Number(match.start) || 0)
      const end = Math.min(masked.length, Number(match.end) || 0)
      for (let index = start; index < end; index += 1) masked[index] = ' '
    })

    applyBuiltInPromotionRules(found, masked.join(''))
  })
}

// 第 018-151 批：金額比對必須保留換行／空白邊界。
// 舊版把整個區塊所有空白移除，會讓「絲襪+100」下一行的「0.01套子+100」
// 黏成「絲襪+1000.01套子+100」，因此誤抓成 1000。
function normalizeServiceAmountMatchText(text) {
  // 第 018-173 批：先把「5 0 0／1 0 0 0」合併回 500／1000，
  // 再保留原本的換行邊界，避免只抓到第一位數而輸出成 +5。
  return collapseSpacedSingleDigitAmounts(normalizeDigits(String(text || '')))
    .toLowerCase()
    .replace(/[＋]/g, '+')
    .replace(/[／]/g, '/')
    .replace(/兩/g, '2')
    .replace(/二/g, '2')
    .replace(/三/g, '3')
    .replace(/一/g, '1')
    .replace(/壹/g, '1')
    .replace(/貳/g, '2')
    .replace(/參/g, '3')
    .replace(/\r\n?/g, '\n')
    .replace(/[，、,；;｜|]+/g, ' ')
    .replace(/[\t ]+/g, ' ')
    .replace(/\n+/g, ' | ')
    .replace(/\s+/g, ' ')
    .trim()
}

function findExplicitAmountForServiceName(sourceText, serviceName) {
  const source = normalizeServiceAmountMatchText(sourceText)
  const base = normalizeServiceAliasMatchText(stripMonetaryServiceSuffix(serviceName))
  if (!source || !base) return ''

  // 金額後面必須遇到分隔或行尾，不能跨到下一行 0.01 的第一個 0。
  const pattern = new RegExp(`${escapeRegExp(base)}\\s*(?:\\+|加)\\s*(\\d{1,5})(?=$|[\\s|，、,；;／/]|[^\\d.])`)
  const match = source.match(pattern)
  return match ? match[1] : ''
}

function reconcileExplicitServiceAmounts(found, sourceText, aliases = []) {
  const amountByOutputBase = new Map()

  ;(Array.isArray(aliases) ? aliases : []).forEach(([from, to]) => {
    const normalizedFrom = normalizeServiceAliasMatchText(from)
    const searchableSource = normalizeServiceAliasMatchText(sourceText)
    const isMatched = String(sourceText || '').includes(String(from || ''))
      || (normalizedFrom && searchableSource.includes(normalizedFrom))
    if (!isMatched) return

    const amount = getExplicitAliasAmount(from, sourceText)
    if (!amount) return

    String(to || '').split(/\s+/).filter(Boolean).forEach(item => {
      const outputToken = normalizeServiceOutputToken(item)
      const outputBase = stripMonetaryServiceSuffix(outputToken)
      const outputKey = normalizeServiceAliasMatchText(outputBase)
      if (outputKey) amountByOutputBase.set(outputKey, amount)
    })
  })

  Array.from(found).forEach(item => {
    const outputToken = normalizeServiceOutputToken(item)
    const outputBase = stripMonetaryServiceSuffix(outputToken)
    const outputKey = normalizeServiceAliasMatchText(outputBase)
    const directAmount = findExplicitAmountForServiceName(sourceText, outputBase)
    if (outputKey && directAmount) amountByOutputBase.set(outputKey, directAmount)
  })

  if (!amountByOutputBase.size) return

  const corrected = new Set()
  Array.from(found).forEach(item => {
    const outputToken = normalizeServiceOutputToken(item)
    const outputBase = stripMonetaryServiceSuffix(outputToken)
    const outputKey = normalizeServiceAliasMatchText(outputBase)
    const explicitAmount = amountByOutputBase.get(outputKey)

    corrected.add(explicitAmount ? `${outputBase}+${explicitAmount}` : outputToken)
  })

  found.clear()
  corrected.forEach(item => found.add(item))
}

function normalizeOverlappingServices(found) {
  // 第 018-113 批：有「攝影不露臉+1000」時，不能同時保留「攝影露臉+1000」。
  if (found.has('攝影不露臉+1000') && found.has('攝影露臉+1000')) {
    found.delete('攝影露臉+1000')
  }

  // 第 018-119 批：文件1 寫「買2節3s / 買兩節3S」時，輸出以店家原意「買2節3s」為準。
  // 若舊規則同時抓到 2+1s，會在下方去重移除。

  // 長方案出現時，移除被包含的短方案，避免重複。
  // 注意：只做明確長短方案去重，不改使用者指定的輸出名稱。
  const overlapRules = [
    ['3節送1節200分3S', '3節送1節200分'],
    ['5節送3節400分', '5節送3節200分'],
    ['2S+1000', '2S+500']
  ]

  overlapRules.forEach(([longer, shorter]) => {
    if (found.has(longer) && found.has(shorter)) {
      found.delete(shorter)
    }
  })

  // 第 018-103 批：同一筆同時抓到「2+1」與「2+1s」時，保留較完整的 2+1s。
  // 例：買二送一 100分鐘 3S 被不同規則同時抓成 2+1 / 2+1s 時，只輸出 2+1s。
  if (found.has('買2節送1s') && found.has('買2送1')) {
    // 兩者可能分別來自文件1的 2+1S 與 2+1；若文件1兩個都有寫，兩個中文項目都保留。
  }

  // 第 018-119 批：買2節3S / 買2節 3s 輸出保留「買2節3s」，並移除舊規則抓到的 2+1s / 2節3S。
  if (found.has('買2節3s')) {
    found.delete('2節3S')
  }

  // 第 018-99 批：加價版服務優先。
  // 同一筆小姐同時有「自慰秀+500」與「自慰秀」時，只保留加價版；
  // 沒有加價版時，普通版仍正常保留。
  const paidServiceBaseRules = [
    { paid: ['2S+1000', '2S+500'], base: ['2S', '2s'] },
    { paid: ['口爆+500', '口爆+1000'], base: ['口爆'] },
    { paid: ['吞精+500', '吞精+1000'], base: ['吞精'] },
    { paid: ['顏射+500', '射顏+500'], base: ['顏射', '射顏'] },
    { paid: ['入珠+500', '入珠+1000'], base: ['入珠'] },
    { paid: ['入珠客+500', '入珠客+1000'], base: ['入珠客'] },
    { paid: ['自慰秀+500', '自衛秀+500'], base: ['自慰秀', '自衛秀'] },
    { paid: ['情趣用品+500'], base: ['情趣用品'] },
    { paid: ['艷舞+500', '豔舞+500'], base: ['艷舞', '豔舞', '艷舞秀', '豔舞秀'] },
    { paid: ['絲襪+100'], base: ['絲襪'] }
  ]

  paidServiceBaseRules.forEach(({ paid, base }) => {
    const hasPaidVersion = paid.some(item => found.has(item))
    if (!hasPaidVersion) return
    base.forEach(item => found.delete(item))
  })

  // 第 018-102 批：服務同義詞自動去重時，保留完整服務名稱。
  // 例如同一筆同時抓到「深喉嚨」與「深喉」時，輸出只保留完整詞「深喉嚨」。
  const equivalentServiceRules = [
    { canonical: '深喉嚨', aliases: ['深喉', '深喉咙', '深喉服務'] },
    { canonical: '自慰秀', aliases: ['自衛秀'] },
    { canonical: '自慰秀+500', aliases: ['自衛秀+500'] },
    { canonical: '顏射+500', aliases: ['射顏+500'] },
    { canonical: '攝影不露臉', aliases: ['不露臉攝影', '攝影不露臉'] },
    { canonical: '攝影不露臉+1000', aliases: ['不露臉攝影+1000', '攝影+1000不露臉'] },
    { canonical: '攝影露臉+1000', aliases: ['露臉攝影+1000'] },
    { canonical: '艷舞', aliases: ['豔舞', '艷舞秀', '豔舞秀'] },
    { canonical: '艷舞+500', aliases: ['豔舞+500'] }
  ]

  equivalentServiceRules.forEach(({ canonical, aliases }) => {
    const tokens = [canonical, ...aliases].map(item => normalizeServiceAliasMatchText(item)).filter(Boolean)
    const matchedItems = Array.from(found).filter(item => tokens.includes(normalizeServiceAliasMatchText(item)))
    if (!matchedItems.length) return

    matchedItems.forEach(item => found.delete(item))
    found.add(canonical)
  })
}






function enforceExplicitPaidServices(found, sourceText, explicitPaidAliasOutputs = new Set()) {
  Array.from(found).forEach(item => {
    const normalizedItem = normalizeServiceOutputToken(item)
    if (!hasMonetaryServiceSuffix(normalizedItem)) return
    if (explicitPaidAliasOutputs.has(normalizedItem)) return
    if (hasExplicitPaidAmountForService(sourceText, normalizedItem)) return

    found.delete(item)
    found.delete(normalizedItem)
    const baseItem = stripMonetaryServiceSuffix(normalizedItem)
    if (baseItem) found.add(normalizeServiceOutputToken(baseItem))
  })
}

function hasMonetaryServiceSuffix(text) {
  return /(?:\+|加)\d{2,5}\s*$/.test(String(text || '').trim())
}

function getMonetaryServiceAmount(text) {
  const match = String(text || '').trim().match(/(?:\+|加)(\d{2,5})\s*$/)
  return match ? match[1] : ''
}

function stripMonetaryServiceSuffix(text) {
  return String(text || '').trim().replace(/(?:\+|加)\d{2,5}\s*$/, '').trim()
}

function sanitizePaidServiceTokenBySource(sourceText, outputToken) {
  const token = normalizeServiceOutputToken(outputToken)
  if (!hasMonetaryServiceSuffix(token)) return token
  if (hasExplicitPaidAmountForService(sourceText, token)) return token
  return normalizeServiceOutputToken(stripMonetaryServiceSuffix(token))
}

function getExplicitAliasAmount(fromText, sourceText = '') {
  const normalizedFrom = normalizeDigits(String(fromText || ''))
    .normalize('NFKC')
    .replace(/[＋]/g, '+')

  // 第 018-156 批：同義詞來源的金額不一定在整句最後。
  // 例如「無套+1000 可內射=無套內射+1000」，舊版只看結尾會漏掉 +1000，
  // 後續又把輸出降成「無套內射」。現在只要來源規則內明確寫出金額就保留。
  const embeddedAmountMatch = normalizedFrom.match(/(?:\+|加)\s*(\d{2,5})(?=$|[\s，、,；;／/]|[^\d.])/)
  if (embeddedAmountMatch) return embeddedAmountMatch[1]

  const directAmount = getMonetaryServiceAmount(normalizeServiceOutputToken(fromText))
  if (directAmount) return directAmount

  return findExplicitAmountForServiceName(sourceText, stripMonetaryServiceSuffix(fromText))
}

function aliasSourceCarriesTargetAmount(fromText, outputToken, sourceText = '') {
  const amount = getMonetaryServiceAmount(outputToken)
  if (!amount) return false
  return getExplicitAliasAmount(fromText, sourceText) === amount
}

function buildAliasOutputTokenWithExplicitAmount(fromText, toText, sourceText = '') {
  const token = normalizeServiceOutputToken(toText)
  if (!token) return ''
  if (hasMonetaryServiceSuffix(token)) return token

  const amount = getExplicitAliasAmount(fromText, sourceText)
  return amount ? `${token}+${amount}` : token
}

function sanitizeAliasTargetBySource(fromText, toText) {
  const outputItems = String(toText || '').split(/\s+/).filter(Boolean)
  const sourceAmount = getExplicitAliasAmount(fromText)

  return outputItems
    .map(item => {
      const token = normalizeServiceOutputToken(item)
      if (!token) return ''
      if (!hasMonetaryServiceSuffix(token) && sourceAmount && outputItems.length === 1) {
        return `${token}+${sourceAmount}`
      }
      if (hasMonetaryServiceSuffix(token) && aliasSourceCarriesTargetAmount(fromText, token)) {
        return token
      }
      return sanitizePaidServiceTokenBySource(fromText, token)
    })
    .filter(Boolean)
    .join(' ')
}

function hasExplicitPaidAmountForService(sourceText, outputToken) {
  const token = normalizeServiceOutputToken(outputToken)
  if (!hasMonetaryServiceSuffix(token)) return true

  const amount = getMonetaryServiceAmount(token)
  const base = stripMonetaryServiceSuffix(token)
  const source = normalizeServiceAmountMatchText(sourceText)
  const normalizedBase = normalizeServiceAliasMatchText(base)
  if (!source || !amount || !normalizedBase) return false

  // 一般服務以文件1的有邊界明確金額為準，避免跨行黏成較大數字。
  if (findExplicitAmountForServiceName(sourceText, base) === amount) return true

  // 第 018-153 批：攝影文字常寫成「攝影+1000 不露臉」。
  // 金額與「不露臉」之間可能有空格或換行，不能因此把 +1000 判定成不存在。
  if (normalizedBase === normalizeServiceAliasMatchText('攝影不露臉')) {
    const photographyNoFacePatterns = [
      new RegExp(`攝影\\s*(?:\\+|加)?\\s*${amount}\\s*不露臉`),
      new RegExp(`不露臉\\s*攝影\\s*(?:\\+|加)?\\s*${amount}`),
      new RegExp(`攝影\\s*不露臉\\s*(?:\\+|加)?\\s*${amount}`)
    ]
    return photographyNoFacePatterns.some(pattern => pattern.test(source))
  }

  if (normalizedBase === normalizeServiceAliasMatchText('攝影露臉')) {
    const photographyFacePatterns = [
      new RegExp(`攝影\\s*露臉\\s*(?:\\+|加)?\\s*${amount}`),
      new RegExp(`攝影\\s*(?:\\+|加)?\\s*${amount}\\s*露臉`),
      new RegExp(`露臉\\s*攝影\\s*(?:\\+|加)?\\s*${amount}`)
    ]
    return photographyFacePatterns.some(pattern => pattern.test(source))
  }

  const escapedBase = escapeRegExp(normalizedBase)
  const directPattern = new RegExp(`${escapedBase}.{0,3}(?:\\+|加)?${amount}`)
  const reversePattern = new RegExp(`(?:\\+|加)${amount}.{0,3}${escapedBase}`)
  return directPattern.test(source) || reversePattern.test(source)
}

function buildTitle({ name, country, height, weight, cup, age }) {
  const bodyText = formatBodyOutput({ height, weight, cup, age })
  if (titleMode.value === 'name-country') return `【${name} ${country}】${bodyText}`
  if (titleMode.value === 'name-only') return `【${name}】${bodyText}`
  return `【${country} ${name}】${bodyText}`
}

function getAppliedIncrease(country) {
  if (priceMode.value === 'custom') return Number(customIncrease.value) || 0
  if (priceMode.value === 'global') return Number(globalIncrease.value) || 0
  const rules = parsePriceRules()
  const fixedCountry = normalizeCountry(country)
  return rules.get(fixedCountry) ?? Number(globalIncrease.value) ?? 0
}

function parsePriceRules() {
  const map = new Map()
  parseKeyValueLines(countryPriceRulesText.value).forEach(([key, value]) => {
    const country = normalizeCountry(key)
    const amount = Number(String(value).replace(/[^\d]/g, ''))
    if (country && Number.isFinite(amount)) map.set(country, amount)
  })
  return map
}

function getCountryAliasMap() {
  const map = new Map()
  parseKeyValueLines(countryAliasText.value).forEach(([from, to]) => {
    if (from && to) map.set(from, to)
  })
  defaultCountryAliases.forEach(line => {
    const [from, to] = line.split('=')
    if (!map.has(from)) map.set(from, to)
  })
  return map
}

function getCountryKeys() {
  const keys = new Set()

  getCountryAliasMap().forEach((to, from) => {
    keys.add(from)
    keys.add(to)
  })

  parseKeyValueLines(countryFieldRulesText.value).forEach(([from, to]) => {
    if (from) keys.add(from.replace(/[:：]/g, '').trim())
    if (to) keys.add(to.trim())
  })

  return Array.from(keys).filter(Boolean)
}


function normalizeCountry(country) {
  const value = String(country || '').trim()
  return getCountryAliasMap().get(value) || value
}

function cleanName(value) {
  return removeHeaderNoise(value)
}



function normalizeDigits(text) {
  // 第 018-173 批：解析前統一全形／半形。
  // NFKC 會把全形英數、＋、／、括號等常見輸入轉成半形，
  // 讓身材、價格、節數與加值服務共用同一套判斷。
  return String(text ?? '')
    .normalize('NFKC')
    .replace(/[０-９]/g, char => String(char.charCodeAt(0) - 0xFF10))
}

function collapseSpacedSingleDigitAmounts(text) {
  // 店家常把金額貼成「5 0 0」「1 0 0 0」。
  // 只合併 3～5 個『單一數字』組成的群組，不合併 166 46、500 60 等正常欄位。
  return String(text ?? '').replace(
    /(^|[^0-9])([0-9](?:[ \t]+[0-9]){2,4})(?=$|[^0-9])/g,
    (match, prefix, spacedDigits) => `${prefix}${spacedDigits.replace(/[ \t]+/g, '')}`
  )
}

function shouldPreferNoFacePhotography(text) {
  const value = normalizeServiceAliasMatchText(text)
  if (!value) return false

  return /攝影(?:\+?\d+)?不露臉/.test(value)
    || /攝影不露臉(?:\+?\d+)?/.test(value)
    || /不露臉攝影(?:\+?\d+)?/.test(value)
}

function shouldPreferFacePhotography(text) {
  const value = normalizeServiceAliasMatchText(text)
  if (!value) return false

  return /攝影(?:\+?\d+)?露臉/.test(value)
    || /攝影露臉(?:\+?\d+)?/.test(value)
    || /露臉攝影(?:\+?\d+)?/.test(value)
}

function findExplicitPhotographyAmount(text, mode = 'generic') {
  const source = normalizeServiceAmountMatchText(text)
  if (!source) return ''

  const patterns = mode === 'no-face'
    ? [
        /攝影\s*(?:\+|加)?\s*(\d{1,5})\s*不露臉/,
        /攝影\s*不露臉\s*(?:\+|加)\s*(\d{1,5})/,
        /不露臉\s*攝影\s*(?:\+|加)\s*(\d{1,5})/
      ]
    : mode === 'face'
      ? [
          /攝影\s*(?:\+|加)?\s*(\d{1,5})\s*露臉/,
          /攝影\s*露臉\s*(?:\+|加)\s*(\d{1,5})/,
          /露臉\s*攝影\s*(?:\+|加)\s*(\d{1,5})/
        ]
      : []

  for (const pattern of patterns) {
    const match = source.match(pattern)
    if (match?.[1]) return match[1]
  }

  return ''
}

function removePhotographyServiceVariants(found) {
  const photographyBases = new Set([
    '攝影',
    '攝影露臉',
    '攝影不露臉',
    '露臉攝影',
    '不露臉攝影'
  ].map(item => normalizeServiceAliasMatchText(item)))

  Array.from(found).forEach(item => {
    const base = normalizeServiceAliasMatchText(stripMonetaryServiceSuffix(item))
    if (photographyBases.has(base)) found.delete(item)
  })
}


function shouldPreferFreeDanceGift(text) {
  const value = normalizeServiceAliasMatchText(text)
  if (!value) return false

  const hasDanceGift = /買(?:2|3|5)?節?送(?:艷|豔)舞(?:秀)?/.test(value)
    || /送(?:艷|豔)舞(?:秀)?/.test(value)
  if (!hasDanceGift) return false

  // 只有明確寫「艷舞+500 / 豔舞+500」時，才保留加價版。
  const hasExplicitPaidDance = /(?:艷|豔)舞(?:秀)?(?:\+|加)500/.test(value)
    || /(?:\+|加)500(?:艷|豔)舞(?:秀)?/.test(value)

  return !hasExplicitPaidDance
}

function normalizeServiceAliasMatchText(text) {
  return normalizeDigits(String(text || ''))
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[＋]/g, '+')
    .replace(/[／]/g, '/')
    .replace(/兩/g, '2')
    .replace(/二/g, '2')
    .replace(/三/g, '3')
    .replace(/一/g, '1')
    .replace(/壹/g, '1')
    .replace(/貳/g, '2')
    .replace(/參/g, '3')
    .replace(/\s+/g, '')
}

function normalizeServiceOutputToken(text) {
  const value = String(text || '').trim()
  if (!value) return ''

  // 第 018-144 批：優惠組合縮寫在輸出端統一轉成中文。
  if (/^2\+1s$/i.test(value)) return '買2節送1s'
  if (/^2\+3s$/i.test(value)) return '買2節送3s'
  if (/^2\+1$/i.test(value)) return '買2送1'
  if (/^3\+1$/i.test(value)) return '買3送1'
  if (/^5\+3$/i.test(value)) return '買5送3'

  // 第 018-119 批：舊服務寫法 2節3S / 買2節3S 統一顯示為「買2節3s」。
  if (/^(?:買)?2節3s$/i.test(value)) return '買2節3s'

  // 第 018-114 批：豔舞統一顯示成「艷舞」，避免同義詞去重時拆成兩種。
  if (value === '豔舞') return '艷舞'
  if (value === '豔舞+500') return '艷舞+500'

  return value
}


function parseMinutePriceAddRules() {
  const map = new Map()
  parseKeyValueLines(minutePriceAddRulesText.value).forEach(([minutes, add]) => {
    const minuteNumber = Number(String(minutes || '').replace(/[^\d]/g, ''))
    const addNumber = Number(String(add || '').replace(/[^\d.-]/g, ''))
    if (minuteNumber && Number.isFinite(addNumber)) {
      map.set(minuteNumber, addNumber)
    }
  })
  return map
}

function applyMinutePriceAdd(amount, minutes) {
  const rules = parseMinutePriceAddRules()
  const add = rules.get(Number(minutes)) || 0
  return Number(amount || 0) + add
}

function resolveFinalAmountWithMinuteRule(rawAmount, increase, minutes) {
  const raw = Number(rawAmount || 0)
  const normalFinal = resolveFinalAmount(raw, increase)
  const minuteAdd = parseMinutePriceAddRules().get(Number(minutes)) || 0

  if (!minuteAdd) return normalFinal

  // 第 018-156 批：分鐘加價與國籍／固定加價是同一層加價候選，不可重複相加。
  // 例：原價 4000、國籍 +500、90 分鐘 +1000，應輸出 5000，不是 5500。
  const minuteFinal = raw + Number(minuteAdd)
  return Math.max(normalFinal, minuteFinal)
}

function resolveFinalAmount(rawAmount, increase) {
  const raw = Number(rawAmount)
  const addAmount = Number(increase || 0)
  const transformRules = parseAmountTransformRules()

  const countryAmount = raw + addAmount
  const transformAmount = transformRules.has(raw) ? transformRules.get(raw) : null

  // 第 009-9-1 批：
  // 預設採用「自動取較高金額」。
  // 例 1：馬來 2600，國籍+500=3100，但金額轉換 2600→3200，所以輸出 3200。
  // 例 2：台妹 2500，國籍+1000=3500，金額轉換 2500→3000，所以輸出 3500。
  if (amountPriorityMode.value === 'higher-price' || amountPriorityMode.value === 'country-first') {
    return transformAmount ? Math.max(countryAmount, transformAmount) : countryAmount
  }

  if (amountPriorityMode.value === 'transform-first') {
    return transformAmount || countryAmount
  }

  return countryAmount
}

function parseAmountTransformRules() {
  const map = new Map()

  amountTransformRules.value.forEach(rule => {
    const rawAmount = Number(rule.from)
    const outputAmount = Number(rule.to)

    if (rawAmount && outputAmount) {
      map.set(rawAmount, outputAmount)
    }
  })

  return map
}

function normalizeAmountRules(value) {
  if (Array.isArray(value)) {
    return value
      .map(rule => ({
        from: Number(rule.from),
        to: Number(rule.to)
      }))
      .filter(rule => rule.from && rule.to)
  }

  return parseKeyValueLines(value)
    .map(([raw, finalValue]) => ({
      from: Number(String(raw).replace(/[^\d]/g, '')),
      to: Number(String(finalValue).replace(/[^\d]/g, ''))
    }))
    .filter(rule => rule.from && rule.to)
}

function addAmountRule() {
  const from = Number(newAmountFrom.value)
  const to = Number(newAmountTo.value)

  if (!from || !to) {
    statusMessage.value = '請輸入原始金額與轉換後金額。'
    return
  }

  const existingIndex = amountTransformRules.value.findIndex(rule => Number(rule.from) === from)

  if (existingIndex >= 0) {
    amountTransformRules.value[existingIndex] = { from, to }
    statusMessage.value = `已更新金額規則：${from} → ${to}`
  } else {
    amountTransformRules.value.push({ from, to })
    amountTransformRules.value.sort((a, b) => Number(a.from) - Number(b.from))
    statusMessage.value = `已新增金額規則：${from} → ${to}`
  }

  newAmountFrom.value = ''
  newAmountTo.value = ''
}

function removeAmountRule(index) {
  amountTransformRules.value.splice(index, 1)
  statusMessage.value = '已刪除金額規則。'
}

function resetAmountRules() {
  amountTransformRules.value = defaultAmountTransformRules.map(rule => ({ ...rule }))
  newAmountFrom.value = ''
  newAmountTo.value = ''
  statusMessage.value = '金額轉換規則已恢復預設。'
}


function applyDecimal149Plus100(amount) {
  const value = Number(amount || 0)
  if (!value) return value

  // 只處理百位數為 100 / 400 / 900 的 K 小數金額。
  // 3100 -> 3200、3400 -> 3500、3900 -> 4000、4900 -> 5000。
  const remainder = value % 1000
  if ([100, 400, 900].includes(remainder)) return value + 100

  return value
}

function formatAmount(amount) {
  const normalizedAmount = applyDecimal149Plus100(Number(amount || 0))
  if (!normalizedAmount) return ''

  const k = normalizedAmount / 1000
  if (Number.isInteger(k)) return `${k}K`

  return `${Number(k.toFixed(1))}K`
}



function parseList(text) {
  return String(text || '').split(/[\n,，、\s]+/).map(item => item.trim()).filter(Boolean)
}

// 第 018-148 批：清理文字不可用一般 parseList，否則含空格句子會被拆成「100」等數字碎片。
function parseCleanupWords(text) {
  const items = []
  String(text || '')
    .replace(/\r\n?/g, '\n')
    .split(/[\n,，、]+/)
    .map(line => line.trim())
    .filter(Boolean)
    .forEach(line => {
      items.push(line)
      // 斜線常用來列舉「酒客/入珠/吸毒」，可分別清理；但保留每一段內的空格與數字。
      if (/[\/／]/.test(line)) {
        line.split(/[\/／]+/).map(part => part.trim()).filter(Boolean).forEach(part => items.push(part))
      }
    })

  return Array.from(new Set(items))
}

function isUnsafeNumericCleanupToken(value) {
  const token = String(value || '').trim()
  // 純數字或單純 +金額 不可當成清理字詞，避免 1000 被刪成 0。
  return /^[+＋-]?\d+(?:\.\d+)?$/.test(token)
}

function parseKeyValueLines(text) {
  return String(text || '').split('\n').map(line => line.trim()).filter(Boolean).map(line => {
    const separator = line.includes('=') ? '=' : line.includes('：') ? '：' : line.includes(':') ? ':' : null
    if (!separator) return [line, line]
    const [key, value] = line.split(separator)
    return [key.trim(), value.trim()]
  }).filter(([key, value]) => key && value)
}

function parseAliasRules(text) {
  const map = new Map()

  parseKeyValueLines(text).forEach(([from, to]) => {
    const cleanFrom = String(from || '').trim()
    const cleanTo = String(to || '').trim()
    if (!cleanFrom || !cleanTo) return

    // 第 018-152 批：服務同義詞是使用者明確輸入的規則，
    // 解析與套用時只去除行首尾空白，不再自動刪除 +金額、文字或改寫輸出內容。
    // 同一個店家寫法重複時，執行階段仍以最後一條為準；儲存文字本身保持原樣。
    map.set(cleanFrom, cleanTo)
  })

  return Array.from(map.entries())
}

function normalizeAliasRuleSignature(value) {
  return normalizeServiceAliasMatchText(value)
}

function normalizeAliasRuleOutputSignature(value) {
  return String(value || '')
    .split(/\s+/)
    .map(item => normalizeServiceOutputToken(item))
    .filter(Boolean)
    .map(item => normalizeServiceAliasMatchText(item))
    .join(' ')
}

function sanitizeAliasRulesText(text) {
  const map = new Map()
  let duplicateCount = 0
  let conflictCount = 0

  parseKeyValueLines(text).forEach(([from, to]) => {
    const cleanFrom = String(from || '').trim()
    const rawTo = String(to || '').trim().replace(/\s+/g, ' ')
    const cleanTo = sanitizeAliasTargetBySource(cleanFrom, rawTo)
    if (!cleanFrom || !cleanTo) return

    const fromKey = normalizeAliasRuleSignature(cleanFrom)
    const toKey = normalizeAliasRuleOutputSignature(cleanTo)
    if (!fromKey || !toKey) return

    if (map.has(fromKey)) {
      const previous = map.get(fromKey)
      if (previous.toKey === toKey) {
        duplicateCount += 1
        return
      }

      conflictCount += 1
    }

    map.set(fromKey, { from: cleanFrom, to: cleanTo, toKey })
  })

  return {
    text: Array.from(map.values()).map(rule => `${rule.from}=${rule.to}`).join('\n'),
    duplicateCount,
    conflictCount
  }
}

function cleanupAliasRulesBeforeSave() {
  // 第 018-152 批：儲存服務同義詞時完全保留使用者輸入原文。
  // 不自動刪除金額、不去重、不改字、不重排，也不把任何內容替換成系統判斷結果。
  return ''
}

function mergeAliasRulesWithDefaults(text) {
  const saved = String(text || '').trim()
  return [defaultAliasRules.join('\n'), saved].filter(Boolean).join('\n')
}

function escapeRegExp(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}


function cleanScopeText(value) {
  return String(value || '').trim().replace(/\s+/g, ' ')
}

const defaultLocationOptions = {
  cities: [
    '基隆市', '台北市', '新北市', '桃園市', '新竹市', '新竹縣',
    '苗栗縣', '台中市', '彰化縣', '南投縣', '雲林縣',
    '嘉義市', '嘉義縣', '台南市', '高雄市', '屏東縣',
    '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣', '金門縣', '連江縣'
  ],
  districts: {
    基隆市: ['仁愛區', '信義區', '中正區', '中山區', '安樂區', '暖暖區', '七堵區'],
    台北市: ['中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區'],
    新北市: ['板橋區', '三重區', '中和區', '永和區', '新莊區', '新店區', '樹林區', '鶯歌區', '三峽區', '淡水區', '汐止區', '瑞芳區', '土城區', '蘆洲區', '五股區', '泰山區', '林口區', '深坑區', '石碇區', '坪林區', '三芝區', '石門區', '八里區', '平溪區', '雙溪區', '貢寮區', '金山區', '萬里區', '烏來區'],
    桃園市: ['桃園區', '中壢區', '平鎮區', '八德區', '楊梅區', '蘆竹區', '大溪區', '龍潭區', '龜山區', '大園區', '觀音區', '新屋區', '復興區'],
    新竹市: ['東區', '北區', '香山區'],
    新竹縣: ['竹北市', '竹東鎮', '新埔鎮', '關西鎮', '湖口鄉', '新豐鄉', '芎林鄉', '橫山鄉', '北埔鄉', '寶山鄉', '峨眉鄉', '尖石鄉', '五峰鄉'],
    苗栗縣: ['苗栗市', '頭份市', '苑裡鎮', '通霄鎮', '竹南鎮', '後龍鎮', '卓蘭鎮', '大湖鄉', '公館鄉', '銅鑼鄉', '南庄鄉', '頭屋鄉', '三義鄉', '西湖鄉', '造橋鄉', '三灣鄉', '獅潭鄉', '泰安鄉'],
    台中市: ['中區', '東區', '南區', '西區', '北區', '北屯區', '西屯區', '南屯區', '太平區', '大里區', '霧峰區', '烏日區', '豐原區', '后里區', '石岡區', '東勢區', '和平區', '新社區', '潭子區', '大雅區', '神岡區', '大肚區', '沙鹿區', '龍井區', '梧棲區', '清水區', '大甲區', '外埔區', '大安區'],
    彰化縣: ['彰化市', '員林市', '和美鎮', '鹿港鎮', '溪湖鎮', '二林鎮', '田中鎮', '北斗鎮', '花壇鄉', '芬園鄉', '大村鄉', '永靖鄉', '伸港鄉', '線西鄉', '福興鄉', '秀水鄉', '埔心鄉', '埔鹽鄉', '大城鄉', '芳苑鄉', '竹塘鄉', '社頭鄉', '二水鄉', '田尾鄉', '埤頭鄉', '溪州鄉'],
    南投縣: ['南投市', '埔里鎮', '草屯鎮', '竹山鎮', '集集鎮', '名間鄉', '鹿谷鄉', '中寮鄉', '魚池鄉', '國姓鄉', '水里鄉', '信義鄉', '仁愛鄉'],
    雲林縣: ['斗六市', '斗南鎮', '虎尾鎮', '西螺鎮', '土庫鎮', '北港鎮', '古坑鄉', '大埤鄉', '莿桐鄉', '林內鄉', '二崙鄉', '崙背鄉', '麥寮鄉', '東勢鄉', '褒忠鄉', '台西鄉', '元長鄉', '四湖鄉', '口湖鄉', '水林鄉'],
    嘉義市: ['東區', '西區'],
    嘉義縣: ['太保市', '朴子市', '布袋鎮', '大林鎮', '民雄鄉', '溪口鄉', '新港鄉', '六腳鄉', '東石鄉', '義竹鄉', '鹿草鄉', '水上鄉', '中埔鄉', '竹崎鄉', '梅山鄉', '番路鄉', '大埔鄉', '阿里山鄉'],
    台南市: ['中西區', '東區', '南區', '北區', '安平區', '安南區', '永康區', '歸仁區', '新化區', '左鎮區', '玉井區', '楠西區', '南化區', '仁德區', '關廟區', '龍崎區', '官田區', '麻豆區', '佳里區', '西港區', '七股區', '將軍區', '學甲區', '北門區', '新營區', '後壁區', '白河區', '東山區', '六甲區', '下營區', '柳營區', '鹽水區', '善化區', '大內區', '山上區', '新市區', '安定區'],
    高雄市: ['新興區', '前金區', '苓雅區', '鹽埕區', '鼓山區', '旗津區', '前鎮區', '三民區', '楠梓區', '小港區', '左營區', '仁武區', '大社區', '岡山區', '路竹區', '阿蓮區', '田寮區', '燕巢區', '橋頭區', '梓官區', '彌陀區', '永安區', '湖內區', '鳳山區', '大寮區', '林園區', '鳥松區', '大樹區', '旗山區', '美濃區', '六龜區', '內門區', '杉林區', '甲仙區', '桃源區', '那瑪夏區', '茂林區', '茄萣區'],
    屏東縣: ['屏東市', '潮州鎮', '東港鎮', '恆春鎮', '萬丹鄉', '長治鄉', '麟洛鄉', '九如鄉', '里港鄉', '鹽埔鄉', '高樹鄉', '萬巒鄉', '內埔鄉', '竹田鄉', '新埤鄉', '枋寮鄉', '新園鄉', '崁頂鄉', '林邊鄉', '南州鄉', '佳冬鄉', '琉球鄉', '車城鄉', '滿州鄉', '枋山鄉', '三地門鄉', '霧台鄉', '瑪家鄉', '泰武鄉', '來義鄉', '春日鄉', '獅子鄉', '牡丹鄉'],
    宜蘭縣: ['宜蘭市', '羅東鎮', '蘇澳鎮', '頭城鎮', '礁溪鄉', '壯圍鄉', '員山鄉', '冬山鄉', '五結鄉', '三星鄉', '大同鄉', '南澳鄉'],
    花蓮縣: ['花蓮市', '鳳林鎮', '玉里鎮', '新城鄉', '吉安鄉', '壽豐鄉', '光復鄉', '豐濱鄉', '瑞穗鄉', '富里鄉', '秀林鄉', '萬榮鄉', '卓溪鄉'],
    台東縣: ['台東市', '成功鎮', '關山鎮', '卑南鄉', '鹿野鄉', '池上鄉', '東河鄉', '長濱鄉', '太麻里鄉', '大武鄉', '綠島鄉', '海端鄉', '延平鄉', '金峰鄉', '達仁鄉', '蘭嶼鄉'],
    澎湖縣: ['馬公市', '湖西鄉', '白沙鄉', '西嶼鄉', '望安鄉', '七美鄉'],
    金門縣: ['金城鎮', '金湖鎮', '金沙鎮', '金寧鄉', '烈嶼鄉', '烏坵鄉'],
    連江縣: ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉']
  },
  types: ['定點', '外送'],
  rooms: {}
}
function normalizeLocationOptions(options = {}) {
  const hiddenCities = Array.isArray(options.hiddenCities) ? options.hiddenCities.map(cleanScopeText).filter(Boolean) : []
  const hiddenDistricts = options.hiddenDistricts && typeof options.hiddenDistricts === 'object' ? options.hiddenDistricts : {}

  const storedCities = Array.isArray(options.cities) ? options.cities : []
  // 第 018-60 批：公版縣市預設全部顯示。
  // 員工可用刪除把不想管理的縣市加入 hiddenCities；也可新增自己的縣市。
  const orderedCities = storedCities.length
    ? [...storedCities, ...defaultLocationOptions.cities]
    : [...defaultLocationOptions.cities]
  const cities = [...new Set(orderedCities.map(cleanScopeText).filter(Boolean))]
    .filter(city => !hiddenCities.includes(city))

  const storedDistricts = options.districts && typeof options.districts === 'object' ? options.districts : {}
  const districts = {}

  cities.forEach(city => {
    // 第 018-60 批：公版地區預設全部顯示；員工刪除只會隱藏在自己的清單。
    const defaultList = Array.isArray(defaultLocationOptions.districts?.[city]) ? defaultLocationOptions.districts[city] : []
    const storedList = storedDistricts?.[city] || []
    const hiddenList = Array.isArray(hiddenDistricts?.[city]) ? hiddenDistricts[city].map(cleanScopeText).filter(Boolean) : []
    const orderedDistricts = Array.isArray(storedList) && storedList.length ? [...storedList, ...defaultList] : defaultList
    districts[city] = [...new Set(orderedDistricts.map(cleanScopeText).filter(Boolean))]
      .filter(district => !hiddenList.includes(district))
  })

  return {
    cities,
    districts,
    hiddenCities,
    hiddenDistricts,
    types: defaultLocationOptions.types,
    rooms: options.rooms && typeof options.rooms === 'object' ? options.rooms : {}
  }
}
function readLocationOptions() {
  try {
    return normalizeLocationOptions(JSON.parse(localStorage.getItem(getStaffScopedStorageKey(LOCATION_SCOPE_STORAGE_KEY)) || '{}'))
  } catch {
    return normalizeLocationOptions({})
  }
}

function writeLocationOptions(options) {
  localStorage.setItem(getStaffScopedStorageKey(LOCATION_SCOPE_STORAGE_KEY), JSON.stringify(normalizeLocationOptions(options)))
}

const locationOptions = ref(readLocationOptions())

const locationCities = computed(() => locationOptions.value.cities)
const locationTypes = computed(() => locationOptions.value.types)
const scopeDistricts = computed(() => {
  const city = cleanScopeText(ruleScopeCity.value)
  return locationOptions.value.districts?.[city] || []
})
const scopeRooms = computed(() => {
  const key = `${cleanScopeText(ruleScopeCity.value)}__${cleanScopeText(ruleScopeDistrict.value)}__${cleanScopeText(ruleScopeType.value)}`
  return locationOptions.value.rooms?.[key] || []
})
const managerDistricts = computed(() => locationOptions.value.districts?.[managerSelectedCity.value] || [])
const managerRooms = computed(() => {
  const key = `${cleanScopeText(managerSelectedCity.value)}__${cleanScopeText(managerSelectedDistrict.value)}__${cleanScopeText(managerSelectedType.value)}`
  return locationOptions.value.rooms?.[key] || []
})
const roomManagerDistricts = computed(() => locationOptions.value.districts?.[roomManagerSelectedCity.value] || [])
const roomManagerRooms = computed(() => {
  const key = `${cleanScopeText(roomManagerSelectedCity.value)}__${cleanScopeText(roomManagerSelectedDistrict.value)}__${cleanScopeText(roomManagerSelectedType.value)}`
  return locationOptions.value.rooms?.[key] || []
})
const currentManagedRoom = computed(() => {
  const city = cleanScopeText(roomManagerSelectedCity.value)
  const district = cleanScopeText(roomManagerSelectedDistrict.value)
  const type = cleanScopeText(roomManagerSelectedType.value)
  const room = cleanScopeText(ruleScopeRoom.value)

  if (!city || !district || !type || !room) return ''
  if (cleanScopeText(ruleScopeCity.value) !== city) return ''
  if (cleanScopeText(ruleScopeDistrict.value) !== district) return ''
  if (cleanScopeText(ruleScopeType.value) !== type) return ''
  return roomManagerRooms.value.includes(room) ? room : ''
})
const totalDistrictCount = computed(() => Object.values(locationOptions.value.districts || {}).reduce((sum, list) => sum + (Array.isArray(list) ? list.length : 0), 0))
const totalRoomCount = computed(() => Object.values(locationOptions.value.rooms || {}).reduce((sum, list) => sum + (Array.isArray(list) ? list.length : 0), 0))

function getDefaultManagerScopeType() {
  const types = Array.isArray(locationOptions.value?.types) ? locationOptions.value.types : []
  if (types.includes(DEFAULT_MANAGER_SCOPE_TYPE)) return DEFAULT_MANAGER_SCOPE_TYPE
  return cleanScopeText(types[0]) || DEFAULT_MANAGER_SCOPE_TYPE
}

function normalizeLastScopeSelection(value = {}) {
  if (!value || typeof value !== 'object') return null

  const city = cleanScopeText(value.city)
  const district = cleanScopeText(value.district)
  const type = cleanScopeText(value.type || value.mode) || getDefaultManagerScopeType()
  const room = cleanScopeText(value.room)
  const savedAt = cleanScopeText(value.savedAt) || ''

  if (!city && !district && !type && !room) return null

  return { city, district, type, room, savedAt }
}

function readLastScopeSelection() {
  try {
    return normalizeLastScopeSelection(JSON.parse(localStorage.getItem(getStaffScopedStorageKey(LAST_SCOPE_SELECTION_STORAGE_KEY)) || 'null'))
  } catch {
    return null
  }
}

function writeLastScopeSelection(scope, options = {}) {
  const normalized = normalizeLastScopeSelection(scope)
  if (!normalized) return null

  const payload = {
    ...normalized,
    savedAt: options.keepSavedAt && normalized.savedAt ? normalized.savedAt : new Date().toISOString()
  }
  localStorage.setItem(getStaffScopedStorageKey(LAST_SCOPE_SELECTION_STORAGE_KEY), JSON.stringify(payload))
  return payload
}

function getCurrentScopeSelectionSnapshot() {
  return normalizeLastScopeSelection({
    city: ruleScopeCity.value || managerSelectedCity.value,
    district: ruleScopeDistrict.value || managerSelectedDistrict.value,
    type: ruleScopeType.value || managerSelectedType.value || getDefaultManagerScopeType(),
    room: ruleScopeRoom.value
  })
}

function rememberCurrentScopeSelection(options = {}) {
  const snapshot = getCurrentScopeSelectionSnapshot()
  if (!snapshot?.city || !snapshot?.district || !snapshot?.type || !snapshot?.room) return null

  const saved = writeLastScopeSelection(snapshot)
  if (saved && options.syncOnline && isOnlineWorkspaceReady()) {
    void saveLocationOptionsOnline(locationOptions.value, { silent: true })
  }
  return saved
}

function resolveStoredScopeSelection(scope) {
  const normalized = normalizeLastScopeSelection(scope)
  const type = normalized?.type || getDefaultManagerScopeType()
  const city = normalized?.city || ''
  const district = normalized?.district || ''
  const room = normalized?.room || ''

  const validCity = city && locationCities.value.includes(city) ? city : ''
  const validDistrict = validCity && (locationOptions.value.districts?.[validCity] || []).includes(district) ? district : ''
  const validType = locationTypes.value.includes(type) ? type : getDefaultManagerScopeType()
  const roomKey = `${validCity}__${validDistrict}__${validType}`
  const validRoom = validCity && validDistrict && validType && (locationOptions.value.rooms?.[roomKey] || []).includes(room) ? room : ''

  return {
    city: validCity,
    district: validDistrict,
    type: validType,
    room: validRoom
  }
}

function applyScopeSelection(scope) {
  const resolved = resolveStoredScopeSelection(scope)
  isRestoringLastScopeSelection = true
  try {
    managerSelectedCity.value = resolved.city
    managerSelectedDistrict.value = resolved.district
    managerSelectedType.value = resolved.type
    ruleScopeCity.value = resolved.city
    ruleScopeDistrict.value = resolved.district
    ruleScopeType.value = resolved.type
    ruleScopeRoom.value = resolved.room
    syncRuleScopeLevelFromSelection()
  } finally {
    isRestoringLastScopeSelection = false
  }
  return resolved
}

function applyLastScopeSelection(options = {}) {
  const saved = readLastScopeSelection()
  const resolved = applyScopeSelection(saved || { type: getDefaultManagerScopeType() })

  if (!options.silent && saved?.city) {
    const label = [resolved.city, resolved.district, resolved.type, resolved.room].filter(Boolean).join(' / ')
    statusMessage.value = label ? `已帶入最後使用的機房範圍：${label}` : '已套用定點預設；尚未找到上一個機房範圍。'
  }

  return resolved
}

function saveLocationOptions(options = locationOptions.value) {
  locationOptions.value = normalizeLocationOptions(options)
  writeLocationOptions(locationOptions.value)
  void saveLocationOptionsOnline(locationOptions.value, { silent: true })
}

function isOnlineWorkspaceReady() {
  return Boolean(supabaseConfigured && authUser.value?.id)
}

function buildOnlineOptionsPayload(options = locationOptions.value) {
  return {
    kind: ONLINE_OPTIONS_KIND,
    savedAt: new Date().toISOString(),
    options: normalizeLocationOptions(options),
    lastScope: readLastScopeSelection(),
    roomDailyStatus: normalizeRoomDailyStatusStore(roomDailyStatusByScope.value)
  }
}

async function saveLocationOptionsOnline(options = locationOptions.value, opts = {}) {
  if (!isOnlineWorkspaceReady()) return false

  const payload = buildOnlineOptionsPayload(options)
  const { error } = await supabase
    .from('employee_rules')
    .upsert({
      user_id: authUser.value.id,
      city: ONLINE_OPTIONS_SCOPE.city,
      district: ONLINE_OPTIONS_SCOPE.district,
      mode: ONLINE_OPTIONS_SCOPE.mode,
      room: ONLINE_OPTIONS_SCOPE.room,
      rules: payload
    }, { onConflict: 'user_id,city,district,mode,room' })

  if (error) {
    if (!opts.silent) statusMessage.value = `線上儲存管理清單失敗：${error.message}`
    return false
  }

  if (!opts.silent) statusMessage.value = '已把目前縣市 / 地區 / 機房清單儲存到線上。'
  return true
}

async function loadLocationOptionsOnline(opts = {}) {
  if (!isOnlineWorkspaceReady()) {
    locationOptions.value = readLocationOptions()
    return false
  }

  const { data, error } = await supabase
    .from('employee_rules')
    .select('rules')
    .eq('user_id', authUser.value.id)
    .eq('city', ONLINE_OPTIONS_SCOPE.city)
    .eq('district', ONLINE_OPTIONS_SCOPE.district)
    .eq('mode', ONLINE_OPTIONS_SCOPE.mode)
    .eq('room', ONLINE_OPTIONS_SCOPE.room)
    .maybeSingle()

  if (error) {
    locationOptions.value = readLocationOptions()
    if (!opts.silent) statusMessage.value = `讀取線上管理清單失敗：${error.message}`
    return false
  }

  const onlineOptions = data?.rules?.options
  const onlineLastScope = normalizeLastScopeSelection(data?.rules?.lastScope)
  const onlineRoomDailyStatus = normalizeRoomDailyStatusStore(data?.rules?.roomDailyStatus)
  if (onlineLastScope) {
    writeLastScopeSelection(onlineLastScope, { keepSavedAt: true })
  }
  if (Object.keys(onlineRoomDailyStatus).length) {
    roomDailyStatusByScope.value = mergeRoomDailyStatusStores(readRoomDailyStatusStore(), onlineRoomDailyStatus)
    writeRoomDailyStatusStore(roomDailyStatusByScope.value)
  }

  if (onlineOptions && typeof onlineOptions === 'object') {
    locationOptions.value = normalizeLocationOptions(onlineOptions)
    writeLocationOptions(locationOptions.value)
    if (!opts.silent) statusMessage.value = '已讀取線上個人縣市 / 地區 / 機房清單。'
    return true
  }

  locationOptions.value = readLocationOptions()
  if (!opts.silent) statusMessage.value = '線上尚未建立個人管理清單，已使用本機目前清單。'
  return false
}

async function loadOnlineWorkspace(opts = {}) {
  await loadLocationOptionsOnline({ silent: true })
  applyLastScopeSelection({ silent: true })
  repairProtectedGlobalRules()
  await loadCurrentScopeRules({ silent: true, preferOnline: true })
  if (!opts.silent) statusMessage.value = '已同步線上個人工作區。'
}

const BACKUP_STORAGE_KEYS = [
  RULE_STORAGE_KEY,
  CONFIRMED_STORAGE_KEY,
  SOURCE_STORAGE_KEY,
  RESULT_STORAGE_KEY,
  RULE_SCOPE_STORAGE_KEY,
  LOCATION_SCOPE_STORAGE_KEY,
  LAST_SCOPE_SELECTION_STORAGE_KEY,
  'auto-document-converter-api-base-url',
  STAFF_PROFILE_STORAGE_KEY
]

function buildLocalSettingsBackup() {
  const items = {}

  BACKUP_STORAGE_KEYS.forEach(key => {
    const value = localStorage.getItem(key)
    if (value !== null) items[key] = value
  })

  ;[RULE_STORAGE_KEY, RULE_SCOPE_STORAGE_KEY, LOCATION_SCOPE_STORAGE_KEY].forEach(key => {
    const staffKey = getStaffScopedStorageKey(key)
    const value = localStorage.getItem(staffKey)
    if (value !== null) items[staffKey] = value
  })

  return {
    app: 'auto-document-converter',
    version: '0.0.18-62-force-wide-staff-card-right-tabs',
    exportedAt: new Date().toISOString(),
    itemCount: Object.keys(items).length,
    items
  }
}

function downloadTextFile(filename, content, mimeType = 'application/json') {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function exportLocalSettingsBackup() {
  const backup = buildLocalSettingsBackup()
  const dateText = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')
  const filename = `auto-document-converter-rules-backup-${dateText}.json`

  downloadTextFile(filename, JSON.stringify(backup, null, 2))
  statusMessage.value = `已匯出規則備份：${backup.itemCount} 筆設定。`
}

function openBackupImportPicker() {
  const input = backupImportInput.value || document.querySelector('[data-backup-import-input="true"]')

  if (!input) {
    statusMessage.value = '匯入失敗：找不到檔案選擇器，請重新整理後再試。'
    return
  }

  input.value = ''
  input.click()
  statusMessage.value = '請選擇要匯入的規則備份 JSON。'
}

function importLocalSettingsBackup(event) {
  const file = event?.target?.files?.[0]

  if (!file) return

  statusMessage.value = `正在匯入備份檔：${file.name}`
  const reader = new FileReader()

  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || ''))

      if (parsed?.app !== 'auto-document-converter' || !parsed.items || typeof parsed.items !== 'object') {
        statusMessage.value = '匯入失敗：這不是轉換工具的規則備份檔。'
        return
      }

      let importedCount = 0

      Object.entries(parsed.items).forEach(([key, value]) => {
        if (BACKUP_STORAGE_KEYS.includes(key) && typeof value === 'string') {
          localStorage.setItem(key, value)
          importedCount += 1
        }
      })

      locationOptions.value = readLocationOptions()
      repairProtectedGlobalRules()
      loadRules({ silent: true })
      loadConfirmedText?.()

      statusMessage.value = `已匯入規則備份：${importedCount} 筆設定。公版規則已固定保護，請按 Ctrl + F5 重新整理確認。`
    } catch (error) {
      console.error('匯入規則備份失敗', error)
      statusMessage.value = '匯入失敗：JSON 格式錯誤或檔案損壞。'
    } finally {
      if (event?.target) event.target.value = ''
    }
  }

  reader.onerror = () => {
    statusMessage.value = '匯入失敗：讀取檔案時發生錯誤。'
    if (event?.target) event.target.value = ''
  }

  reader.readAsText(file, 'utf-8')
}

function moveListItem(list, fromValue, toValue) {
  const items = Array.isArray(list) ? [...list] : []
  const fromIndex = items.indexOf(fromValue)
  const toIndex = items.indexOf(toValue)

  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return items

  const [moved] = items.splice(fromIndex, 1)
  items.splice(toIndex, 0, moved)
  return items
}

function handleCityDragStart(city) {
  dragCityName.value = city
}

function handleCityDrop(targetCity) {
  const sourceCity = dragCityName.value
  if (!sourceCity || !targetCity || sourceCity === targetCity) {
    clearDragState()
    return
  }

  locationOptions.value.cities = moveListItem(locationOptions.value.cities, sourceCity, targetCity)
  saveLocationOptions()
  clearDragState()
  statusMessage.value = `已調整縣市順序：${sourceCity}`
}

function handleDistrictDragStart(district) {
  dragDistrictName.value = district
}

function handleDistrictDrop(targetDistrict) {
  const city = cleanScopeText(managerSelectedCity.value)
  const sourceDistrict = dragDistrictName.value

  if (!city || !sourceDistrict || !targetDistrict || sourceDistrict === targetDistrict) {
    clearDragState()
    return
  }

  locationOptions.value.districts[city] = moveListItem(locationOptions.value.districts[city], sourceDistrict, targetDistrict)
  saveLocationOptions()
  clearDragState()
  statusMessage.value = `已調整地區順序：${city} / ${sourceDistrict}`
}

function clearDragState() {
  dragCityName.value = ''
  dragDistrictName.value = ''
}

function addUniqueToList(list, value) {
  const item = cleanScopeText(value)
  if (!item) return list
  return [...new Set([...(Array.isArray(list) ? list : []), item])]
}

function syncRuleScopeLevelFromSelection() {
  if (isOwner.value) {
    ruleScopeLevel.value = 'global'
    return
  }

  const city = cleanScopeText(ruleScopeCity.value)
  const district = cleanScopeText(ruleScopeDistrict.value)
  const type = cleanScopeText(ruleScopeType.value)
  const room = cleanScopeText(ruleScopeRoom.value)

  if (city && district && type && room) {
    ruleScopeLevel.value = 'room'
    return
  }

  if (city && district && type) {
    ruleScopeLevel.value = 'type'
    return
  }

  if (city && district) {
    ruleScopeLevel.value = 'district'
    return
  }

  if (city) {
    ruleScopeLevel.value = 'city'
    return
  }

  ruleScopeLevel.value = 'global'
}

function removeFromList(list, value) {
  return (Array.isArray(list) ? list : []).filter(item => item !== value)
}

function addHiddenValue(list, value) {
  const item = cleanScopeText(value)
  if (!item) return Array.isArray(list) ? list : []
  return [...new Set([...(Array.isArray(list) ? list : []), item])]
}

function removeHiddenValue(list, value) {
  const item = cleanScopeText(value)
  return (Array.isArray(list) ? list : []).filter(hidden => hidden !== item)
}

function addLocationCity() {
  const city = cleanScopeText(newCityName.value)
  if (!city) {
    statusMessage.value = '請輸入縣市名稱。'
    return
  }
  locationOptions.value.hiddenCities = removeHiddenValue(locationOptions.value.hiddenCities, city)
  locationOptions.value.cities = addUniqueToList(locationOptions.value.cities, city)
  if (!locationOptions.value.districts[city]) locationOptions.value.districts[city] = []
  managerSelectedCity.value = city
  newCityName.value = ''
  saveLocationOptions()
  statusMessage.value = `已新增縣市：${city}`
}

function removeLocationCity(city) {
  const targetCity = cleanScopeText(city)
  if (!targetCity) return

  locationOptions.value.hiddenCities = addHiddenValue(locationOptions.value.hiddenCities, targetCity)
  locationOptions.value.cities = removeFromList(locationOptions.value.cities, targetCity)
  delete locationOptions.value.districts[targetCity]
  Object.keys(locationOptions.value.rooms || {}).forEach(key => {
    if (key.startsWith(`${targetCity}__`)) delete locationOptions.value.rooms[key]
  })
  if (locationOptions.value.hiddenDistricts) delete locationOptions.value.hiddenDistricts[targetCity]

  if (managerSelectedCity.value === targetCity) {
    managerSelectedCity.value = ''
    managerSelectedDistrict.value = ''
  }
  if (roomManagerSelectedCity.value === targetCity) {
    roomManagerSelectedCity.value = ''
    roomManagerSelectedDistrict.value = ''
    ruleScopeRoom.value = ''
  }
  if (ruleScopeCity.value === targetCity) {
    ruleScopeCity.value = ''
    ruleScopeDistrict.value = ''
    ruleScopeType.value = ''
    ruleScopeRoom.value = ''
  }
  saveLocationOptions()
  statusMessage.value = `已隱藏縣市：${targetCity}`
}

function addLocationDistrict() {
  const city = cleanScopeText(managerSelectedCity.value)
  const district = cleanScopeText(newDistrictName.value)
  if (!city || !district) {
    statusMessage.value = '請先選縣市並輸入地區。'
    return
  }
  if (!locationOptions.value.hiddenDistricts) locationOptions.value.hiddenDistricts = {}
  locationOptions.value.hiddenDistricts[city] = removeHiddenValue(locationOptions.value.hiddenDistricts[city], district)
  locationOptions.value.districts[city] = addUniqueToList(locationOptions.value.districts[city], district)
  managerSelectedDistrict.value = district
  newDistrictName.value = ''
  saveLocationOptions()
  statusMessage.value = `已新增地區：${city} / ${district}`
}

function removeLocationDistrict(district) {
  const city = cleanScopeText(managerSelectedCity.value)
  const targetDistrict = cleanScopeText(district)
  if (!city || !targetDistrict) return

  if (!locationOptions.value.hiddenDistricts) locationOptions.value.hiddenDistricts = {}
  locationOptions.value.hiddenDistricts[city] = addHiddenValue(locationOptions.value.hiddenDistricts[city], targetDistrict)
  locationOptions.value.districts[city] = removeFromList(locationOptions.value.districts[city], targetDistrict)
  Object.keys(locationOptions.value.rooms || {}).forEach(key => {
    if (key.startsWith(`${city}__${targetDistrict}__`)) delete locationOptions.value.rooms[key]
  })
  if (managerSelectedDistrict.value === targetDistrict) managerSelectedDistrict.value = ''
  if (roomManagerSelectedCity.value === city && roomManagerSelectedDistrict.value === targetDistrict) {
    roomManagerSelectedDistrict.value = ''
    ruleScopeRoom.value = ''
  }
  if (ruleScopeCity.value === city && ruleScopeDistrict.value === targetDistrict) {
    ruleScopeDistrict.value = ''
    ruleScopeType.value = ''
    ruleScopeRoom.value = ''
  }
  saveLocationOptions()
  statusMessage.value = `已隱藏地區：${city} / ${targetDistrict}`
}

function addLocationType() {
  const type = cleanScopeText(newLocationTypeName.value)
  if (!type) {
    statusMessage.value = '請輸入定點 / 外送類型。'
    return
  }
  locationOptions.value.types = addUniqueToList(locationOptions.value.types, type)
  managerSelectedType.value = type
  newLocationTypeName.value = ''
  saveLocationOptions()
  statusMessage.value = `已新增類型：${type}`
}

function removeLocationType(type) {
  locationOptions.value.types = removeFromList(locationOptions.value.types, type)
  Object.keys(locationOptions.value.rooms || {}).forEach(key => {
    if (key.endsWith(`__${type}`)) delete locationOptions.value.rooms[key]
  })
  if (managerSelectedType.value === type) managerSelectedType.value = ''
  if (ruleScopeType.value === type) {
    ruleScopeType.value = ''
    ruleScopeRoom.value = ''
  }
  saveLocationOptions()
  statusMessage.value = `已刪除類型：${type}`
}

function selectRoomForManagement(room) {
  const city = cleanScopeText(roomManagerSelectedCity.value)
  const district = cleanScopeText(roomManagerSelectedDistrict.value)
  const type = cleanScopeText(roomManagerSelectedType.value)
  const targetRoom = cleanScopeText(room)

  if (!city || !district || !type || !targetRoom || !roomManagerRooms.value.includes(targetRoom)) {
    statusMessage.value = '請先選擇有效的縣市、地區、定點／外送與機房。'
    return false
  }

  ruleScopeCity.value = city
  ruleScopeDistrict.value = district
  ruleScopeType.value = type
  ruleScopeRoom.value = targetRoom
  syncRuleScopeLevelFromSelection()
  rememberCurrentScopeSelection({ syncOnline: true })
  statusMessage.value = `已選取機房：${city} / ${district} / ${type} / ${targetRoom}`
  return true
}

function addLocationRoom() {
  const city = cleanScopeText(roomManagerSelectedCity.value)
  const district = cleanScopeText(roomManagerSelectedDistrict.value)
  const type = cleanScopeText(roomManagerSelectedType.value)
  const room = cleanScopeText(newRoomName.value)
  if (!city || !district || !type || !room) {
    statusMessage.value = '請先選縣市、地區、定點/外送，並輸入機房/店家。'
    return
  }
  const key = `${city}__${district}__${type}`
  locationOptions.value.rooms[key] = addUniqueToList(locationOptions.value.rooms[key], room)
  newRoomName.value = ''
  saveLocationOptions()
  selectRoomForManagement(room)
  statusMessage.value = `已新增並選取機房/店家：${city} / ${district} / ${type} / ${room}`
}

function removeLocationRoom(room) {
  const city = cleanScopeText(roomManagerSelectedCity.value)
  const district = cleanScopeText(roomManagerSelectedDistrict.value)
  const type = cleanScopeText(roomManagerSelectedType.value)
  const targetRoom = cleanScopeText(room)
  const key = `${city}__${district}__${type}`

  if (!city || !district || !type || !targetRoom || !roomManagerRooms.value.includes(targetRoom)) {
    statusMessage.value = '請先從目前已建立機房清單選擇要刪除的機房。'
    return
  }

  locationOptions.value.rooms[key] = removeFromList(locationOptions.value.rooms[key], targetRoom)
  if (cleanScopeText(ruleScopeCity.value) === city && cleanScopeText(ruleScopeDistrict.value) === district && cleanScopeText(ruleScopeType.value) === type && cleanScopeText(ruleScopeRoom.value) === targetRoom) {
    ruleScopeRoom.value = ''
  }
  saveLocationOptions()
  statusMessage.value = `已刪除機房/店家：${targetRoom}`
}

function replaceInList(list, oldValue, newValue) {
  return (Array.isArray(list) ? list : []).map(item => item === oldValue ? newValue : item)
}

function askRenameValue(label, oldValue) {
  const nextValue = cleanScopeText(window.prompt(`請輸入新的${label}名稱`, oldValue))
  if (!nextValue || nextValue === oldValue) return ''
  return nextValue
}

function renameLocationCity(city) {
  const next = askRenameValue('縣市 / 國籍', city)
  if (!next) return

  locationOptions.value.cities = replaceInList(locationOptions.value.cities, city, next)
  locationOptions.value.districts[next] = locationOptions.value.districts[city] || []
  delete locationOptions.value.districts[city]

  const nextRooms = {}
  Object.entries(locationOptions.value.rooms || {}).forEach(([key, list]) => {
    nextRooms[key.startsWith(`${city}__`) ? key.replace(`${city}__`, `${next}__`) : key] = list
  })
  locationOptions.value.rooms = nextRooms

  if (managerSelectedCity.value === city) managerSelectedCity.value = next
  if (ruleScopeCity.value === city) ruleScopeCity.value = next

  saveLocationOptions()
  statusMessage.value = `已修改縣市 / 國籍：${city} → ${next}`
}

function renameLocationDistrict(district) {
  const city = cleanScopeText(managerSelectedCity.value)
  const next = askRenameValue('地區', district)
  if (!city || !next) return

  locationOptions.value.districts[city] = replaceInList(locationOptions.value.districts[city], district, next)

  const nextRooms = {}
  Object.entries(locationOptions.value.rooms || {}).forEach(([key, list]) => {
    const prefix = `${city}__${district}__`
    nextRooms[key.startsWith(prefix) ? key.replace(prefix, `${city}__${next}__`) : key] = list
  })
  locationOptions.value.rooms = nextRooms

  if (managerSelectedDistrict.value === district) managerSelectedDistrict.value = next
  if (ruleScopeCity.value === city && ruleScopeDistrict.value === district) ruleScopeDistrict.value = next

  saveLocationOptions()
  statusMessage.value = `已修改地區：${district} → ${next}`
}

function renameLocationType(type) {
  const next = askRenameValue('定點 / 外送', type)
  if (!next) return

  locationOptions.value.types = replaceInList(locationOptions.value.types, type, next)

  const nextRooms = {}
  Object.entries(locationOptions.value.rooms || {}).forEach(([key, list]) => {
    nextRooms[key.endsWith(`__${type}`) ? key.replace(`__${type}`, `__${next}`) : key] = list
  })
  locationOptions.value.rooms = nextRooms

  if (managerSelectedType.value === type) managerSelectedType.value = next
  if (ruleScopeType.value === type) ruleScopeType.value = next

  saveLocationOptions()
  statusMessage.value = `已修改定點 / 外送：${type} → ${next}`
}

function renameLocationRoom(room) {
  const city = cleanScopeText(roomManagerSelectedCity.value)
  const district = cleanScopeText(roomManagerSelectedDistrict.value)
  const type = cleanScopeText(roomManagerSelectedType.value)
  const targetRoom = cleanScopeText(room)
  const key = `${city}__${district}__${type}`

  if (!city || !district || !type || !targetRoom || !roomManagerRooms.value.includes(targetRoom)) {
    statusMessage.value = '請先從目前已建立機房清單選擇要修改的機房。'
    return
  }

  const next = askRenameValue('機房', targetRoom)
  if (!next) return

  locationOptions.value.rooms[key] = addUniqueToList(
    removeFromList(locationOptions.value.rooms[key], targetRoom),
    next
  )

  if (cleanScopeText(ruleScopeRoom.value) === targetRoom) ruleScopeRoom.value = next

  saveLocationOptions()
  selectRoomForManagement(next)
  statusMessage.value = `已修改機房：${targetRoom} → ${next}`
}

watch(managerSelectedCity, value => {
  if (isRestoringLastScopeSelection) return
  ruleScopeCity.value = value
  managerSelectedDistrict.value = ''
  ruleScopeDistrict.value = ''
  ruleScopeType.value = managerSelectedType.value || getDefaultManagerScopeType()
  ruleScopeRoom.value = ''
  syncRuleScopeLevelFromSelection()
})

watch(managerSelectedDistrict, value => {
  if (isRestoringLastScopeSelection) return
  ruleScopeDistrict.value = value
  ruleScopeType.value = managerSelectedType.value || getDefaultManagerScopeType()
  ruleScopeRoom.value = ''
  syncRuleScopeLevelFromSelection()
})

watch(managerSelectedType, value => {
  if (isRestoringLastScopeSelection) return
  const nextType = value || getDefaultManagerScopeType()
  if (!value && managerSelectedType.value !== nextType) {
    managerSelectedType.value = nextType
    return
  }
  ruleScopeType.value = nextType
  ruleScopeRoom.value = ''
  syncRuleScopeLevelFromSelection()
})

watch(ruleScopeRoom, async value => {
  syncRuleScopeLevelFromSelection()

  if (
    !isOwner.value &&
    cleanScopeText(value) &&
    ruleScopeLevel.value === 'room' &&
    cleanScopeText(ruleScopeCity.value) &&
    cleanScopeText(ruleScopeDistrict.value) &&
    cleanScopeText(ruleScopeType.value)
  ) {
    await loadCurrentScopeRules({ silent: true, auto: true })
  }
})

watch(roomManagerSelectedCity, () => {
  roomManagerSelectedDistrict.value = ''
  roomManagerSelectedType.value = roomManagerSelectedType.value || getDefaultManagerScopeType()
  ruleScopeRoom.value = ''
})

watch(roomManagerSelectedDistrict, () => {
  ruleScopeRoom.value = ''
})

watch(roomManagerSelectedType, () => {
  ruleScopeRoom.value = ''
})


function normalizeScopeStore(store = {}) {
  return {
    global: store.global || null,
    cities: store.cities && typeof store.cities === 'object' ? store.cities : {},
    districts: store.districts && typeof store.districts === 'object' ? store.districts : {},
    types: store.types && typeof store.types === 'object' ? store.types : {},
    rooms: store.rooms && typeof store.rooms === 'object' ? store.rooms : {}
  }
}

function readScopeRuleStore() {
  try {
    return ensureProtectedGlobalRules(JSON.parse(localStorage.getItem(getStaffScopedStorageKey(RULE_SCOPE_STORAGE_KEY)) || '{}'))
  } catch {
    return ensureProtectedGlobalRules({})
  }
}

function writeScopeRuleStore(store) {
  localStorage.setItem(getStaffScopedStorageKey(RULE_SCOPE_STORAGE_KEY), JSON.stringify(ensureProtectedGlobalRules(store)))
}

function buildDefaultRuleData() {
  return {
    priceMode: 'country',
    globalIncrease: 500,
    customIncrease: 700,
    amountPriorityMode: 'higher-price',
    titleMode: 'country-name',
    bodyOutputOrder: 'height-weight-cup-age',
    formatHint: '【國籍 名稱】身高 體重 Cup 年齡　短鐘K/30/1S　長鐘K/50/1S',
    headerRecognitionRules: normalizeHeaderRecognitionRules(defaultHeaderRecognitionRules),
    bodyRecognitionRules: normalizeBodyRecognitionRules(defaultBodyRecognitionRules),
    advancedRegexRules: [],
    countryPriceRulesText: defaultCountryPriceRules.join('\n'),
    minutePriceAddRulesText: defaultMinutePriceAddRules.join('\n'),
    countryAliasText: defaultCountryAliases.join('\n'),
    amountTransformRules: defaultAmountTransformRules.map(rule => ({ ...rule })),
    serviceOrderText: defaultServiceOrder.join('\n'),
    aliasRulesText: defaultAliasRules.join('\n'),
    removeWordsText: defaultRemoveWords.join('\n'),
    extraKeepText: defaultExtraKeep.join('\n'),
    countryFieldRulesText: defaultCountryFieldRules.join('\n'),
    bodyCupPrefixText: defaultBodyCupPrefixes.join('\n'),
    notNameWordsText: defaultNotNameWords.join('\n')
  }
}

function ensureProtectedGlobalRules(store = {}) {
  const normalized = normalizeScopeStore(store)

  if (!normalized.global || typeof normalized.global !== 'object') {
    const legacyGlobal = getGlobalRuleDataFallback?.()
    normalized.global = legacyGlobal || buildDefaultRuleData()
  }

  return normalized
}

function repairProtectedGlobalRules() {
  const store = readScopeRuleStore()
  writeScopeRuleStore(store)
  localStorage.setItem(getStaffScopedStorageKey(RULE_STORAGE_KEY), JSON.stringify(store.global || buildDefaultRuleData()))
  return store
}

function getScopeBucketAndKey(level = ruleScopeLevel.value) {
  const city = cleanScopeText(ruleScopeCity.value)
  const district = cleanScopeText(ruleScopeDistrict.value)
  const type = cleanScopeText(ruleScopeType.value)
  const room = cleanScopeText(ruleScopeRoom.value)

  if (level === 'global') return { bucket: 'global', key: 'global' }
  if (level === 'city') return { bucket: 'cities', key: city }
  if (level === 'district') return { bucket: 'districts', key: city && district ? `${city}__${district}` : '' }
  if (level === 'type') return { bucket: 'types', key: city && district && type ? `${city}__${district}__${type}` : '' }
  if (level === 'room') return { bucket: 'rooms', key: city && district && type && room ? `${city}__${district}__${type}__${room}` : '' }
  return { bucket: 'global', key: 'global' }
}

function getRuleDataFromScope(store, level, key) {
  const normalized = normalizeScopeStore(store)
  if (level === 'global') return normalized.global
  if (level === 'city') return normalized.cities?.[key]
  if (level === 'district') return normalized.districts?.[key]
  if (level === 'type') return normalized.types?.[key]
  if (level === 'room') return normalized.rooms?.[key]
  return null
}

function setRuleDataToScope(store, level, key, data) {
  const normalized = normalizeScopeStore(store)
  if (level === 'global') {
    normalized.global = data
    return normalized
  }
  if (level === 'city') normalized.cities[key] = data
  if (level === 'district') normalized.districts[key] = data
  if (level === 'type') normalized.types[key] = data
  if (level === 'room') normalized.rooms[key] = data
  return normalized
}

function deleteRuleDataFromScope(store, level, key) {
  const normalized = ensureProtectedGlobalRules(store)
  if (level === 'global') {
    return normalized
  }
  if (level === 'city') delete normalized.cities[key]
  if (level === 'district') delete normalized.districts[key]
  if (level === 'type') delete normalized.types[key]
  if (level === 'room') delete normalized.rooms[key]
  return normalized
}

function validateCurrentRuleScope() {
  if (isOwner.value) {
    ruleScopeLevel.value = 'global'
    return true
  }

  if (ruleScopeLevel.value === 'global') {
    const message = '員工補充規則必須先選完整縣市 / 地區 / 定點外送 / 機房；老闆全站公版不需要選範圍。'
    setRoomRuleFeedback(message, 'warning', { toast: true })
    return false
  }
  if (ruleScopeLevel.value === 'city' && cleanScopeText(ruleScopeCity.value)) return true
  if (ruleScopeLevel.value === 'district' && cleanScopeText(ruleScopeCity.value) && cleanScopeText(ruleScopeDistrict.value)) return true
  if (ruleScopeLevel.value === 'type' && cleanScopeText(ruleScopeCity.value) && cleanScopeText(ruleScopeDistrict.value) && cleanScopeText(ruleScopeType.value)) return true
  if (ruleScopeLevel.value === 'room' && cleanScopeText(ruleScopeCity.value) && cleanScopeText(ruleScopeDistrict.value) && cleanScopeText(ruleScopeType.value) && cleanScopeText(ruleScopeRoom.value)) return true

  const message = '請先把目前範圍的縣市 / 地區 / 定點外送 / 機房填完整。'
  setRoomRuleFeedback(message, 'warning', { toast: true })
  return false
}

function getGlobalRuleDataFallback() {
  const raw = getFirstStorageValue(getStaffScopedStorageKey(RULE_STORAGE_KEY), [RULE_STORAGE_KEY, ...LEGACY_RULE_STORAGE_KEYS])

  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object') return parsed
    } catch {
      // 若舊規則損壞，往下補回固定公版。
    }
  }

  try {
    const directStore = normalizeScopeStore(JSON.parse(localStorage.getItem(getStaffScopedStorageKey(RULE_SCOPE_STORAGE_KEY)) || '{}'))
    if (directStore.global && typeof directStore.global === 'object') return directStore.global
  } catch {
    // 儲存區資料損壞時，固定公版會由 ensureProtectedGlobalRules 補回。
  }

  return null
}

function getEffectiveScopedRuleData() {
  const store = readScopeRuleStore()
  const city = cleanScopeText(ruleScopeCity.value)
  const district = cleanScopeText(ruleScopeDistrict.value)
  const type = cleanScopeText(ruleScopeType.value)
  const room = cleanScopeText(ruleScopeRoom.value)

  const candidates = []
  if (city && district && type && room) candidates.push({ level: 'room', key: `${city}__${district}__${type}__${room}`, label: `機房：${city} / ${district} / ${type} / ${room}` })
  if (city && district && type) candidates.push({ level: 'type', key: `${city}__${district}__${type}`, label: `定點/外送：${city} / ${district} / ${type}` })
  if (city && district) candidates.push({ level: 'district', key: `${city}__${district}`, label: `地區：${city} / ${district}` })
  if (city) candidates.push({ level: 'city', key: city, label: `縣市：${city}` })
  candidates.push({ level: 'global', key: 'global', label: '公版規則' })

  for (const item of candidates) {
    const data = getRuleDataFromScope(store, item.level, item.key)
    if (data) return { data, label: item.label }
  }

  const globalFallback = getGlobalRuleDataFallback()
  if (globalFallback) return { data: globalFallback, label: '公版規則（舊版儲存）' }

  return { data: null, label: '尚未儲存，使用目前畫面設定' }
}

const currentRuleScopeLabel = computed(() => {
  if (isOwner.value) return '老闆全站公版（所有縣市共用）'

  const city = cleanScopeText(ruleScopeCity.value)
  const district = cleanScopeText(ruleScopeDistrict.value)
  const type = cleanScopeText(ruleScopeType.value)
  const room = cleanScopeText(ruleScopeRoom.value)

  if (ruleScopeLevel.value === 'global') return '公版規則'
  if (ruleScopeLevel.value === 'city') return city ? `縣市：${city}` : '縣市規則（未選縣市）'
  if (ruleScopeLevel.value === 'district') return city && district ? `地區：${city} / ${district}` : '地區規則（未選完整）'
  if (ruleScopeLevel.value === 'type') return city && district && type ? `定點/外送：${city} / ${district} / ${type}` : '定點/外送規則（未選完整）'
  if (ruleScopeLevel.value === 'room') return city && district && type && room ? `機房：${city} / ${district} / ${type} / ${room}` : '機房規則（未選完整）'
  return '公版規則'
})

const effectiveRuleSourceLabel = computed(() => {
  if (isOwner.value) return '老闆全站公版規則'
  const supplementLabel = getEffectiveScopedRuleData().label
  return `老闆全站公版＋${supplementLabel}個人補充`
})

function buildEmptyEmployeeSupplementData() {
  return {
    kind: EMPLOYEE_SUPPLEMENT_RULE_KIND,
    priceMode: '',
    globalIncrease: null,
    customIncrease: null,
    amountPriorityMode: '',
    titleMode: '',
    bodyOutputOrder: '',
    formatHint: '',
    headerRecognitionRules: [],
    bodyRecognitionRules: [],
    advancedRegexRules: [],
    countryPriceRulesText: '',
    minutePriceAddRulesText: '',
    countryAliasText: '',
    amountTransformRules: [],
    serviceOrderText: '',
    aliasRulesText: '',
    removeWordsText: '',
    extraKeepText: '',
    countryFieldRulesText: '',
    bodyCupPrefixText: '',
    notNameWordsText: ''
  }
}

function normalizeSupplementRuleData(data = {}) {
  const blank = buildEmptyEmployeeSupplementData()
  return {
    ...blank,
    ...data,
    kind: EMPLOYEE_SUPPLEMENT_RULE_KIND,
    globalIncrease: data.globalIncrease === '' || data.globalIncrease == null ? null : Number(data.globalIncrease),
    customIncrease: data.customIncrease === '' || data.customIncrease == null ? null : Number(data.customIncrease),
    headerRecognitionRules: normalizeHeaderRecognitionRules(data.headerRecognitionRules, { useDefaults: false }),
    bodyRecognitionRules: normalizeBodyRecognitionRules(data.bodyRecognitionRules, { useDefaults: false }),
    advancedRegexRules: [],
    amountTransformRules: normalizeAmountRules(data.amountTransformRules ?? data.amountTransformRulesText ?? [])
  }
}

function appendRuleText(baseValue, supplementValue) {
  const base = String(baseValue || '').trim()
  const extra = String(supplementValue || '').trim()
  if (!extra) return base
  if (!base) return extra
  const merged = [...new Set(`${base}\n${extra}`.split(/\r?\n/).map(item => item.trim()).filter(Boolean))]
  return merged.join('\n')
}


function getRuleLineLeftKey(line, normalizeKey = value => String(value || '').trim()) {
  const text = String(line || '').trim()
  if (!text) return ''

  const separatorIndex = text.includes('=')
    ? text.indexOf('=')
    : text.includes('：')
      ? text.indexOf('：')
      : text.includes(':')
        ? text.indexOf(':')
        : -1
  const left = separatorIndex >= 0 ? text.slice(0, separatorIndex) : text
  return normalizeKey(left)
}

function mergeRuleTextWithSupplementOverride(baseValue, supplementValue, normalizeKey) {
  const baseLines = String(baseValue || '').split(/\r?\n/).map(item => item.trim()).filter(Boolean)
  const supplementLines = String(supplementValue || '').split(/\r?\n/).map(item => item.trim()).filter(Boolean)
  if (!supplementLines.length) return baseLines.join('\n')

  // 第 018-168 批：老闆規則先套，員工補充後套；同一個左側寫法衝突時最後一條生效。
  // 使用 normalized key 比對，讓「買二送一 3S」與全形／空白不同寫法仍能正確覆蓋。
  const combined = [...baseLines, ...supplementLines]
  const lastIndexByKey = new Map()
  combined.forEach((line, index) => {
    const key = getRuleLineLeftKey(line, normalizeKey)
    if (key) lastIndexByKey.set(key, index)
  })

  return combined.filter((line, index) => {
    const key = getRuleLineLeftKey(line, normalizeKey)
    return !key || lastIndexByKey.get(key) === index
  }).join('\n')
}

function mergeOwnerAndEmployeeRules(ownerData = {}, supplementData = {}) {
  const owner = ownerData && typeof ownerData === 'object' ? ownerData : buildDefaultRuleData()
  const extra = normalizeSupplementRuleData(supplementData)
  const choose = (key, fallback) => {
    const value = extra[key]
    return value === '' || value == null ? (owner[key] ?? fallback) : value
  }
  const amountRuleMap = new Map()
  normalizeAmountRules(owner.amountTransformRules ?? owner.amountTransformRulesText ?? [])
    .forEach(rule => amountRuleMap.set(Number(rule.from), rule))
  normalizeAmountRules(extra.amountTransformRules ?? [])
    .forEach(rule => amountRuleMap.set(Number(rule.from), rule))
  const dedupAmount = Array.from(amountRuleMap.values())
    .sort((a, b) => Number(a.from) - Number(b.from))
  return {
    ...owner,
    priceMode: choose('priceMode', 'country'),
    globalIncrease: Number(choose('globalIncrease', 500)),
    customIncrease: Number(choose('customIncrease', 700)),
    amountPriorityMode: choose('amountPriorityMode', 'higher-price'),
    titleMode: choose('titleMode', 'country-name'),
    bodyOutputOrder: owner.bodyOutputOrder || 'height-weight-cup-age',
    formatHint: choose('formatHint', owner.formatHint || ''),
    headerRecognitionRules: mergeRecognitionRuleLists(owner.headerRecognitionRules, extra.headerRecognitionRules, 'header'),
    bodyRecognitionRules: mergeRecognitionRuleLists(owner.bodyRecognitionRules, extra.bodyRecognitionRules, 'body'),
    advancedRegexRules: normalizeAdvancedRegexRules(owner.advancedRegexRules),
    countryPriceRulesText: mergeRuleTextWithSupplementOverride(
      owner.countryPriceRulesText,
      extra.countryPriceRulesText,
      value => normalizeServiceAliasMatchText(value)
    ),
    minutePriceAddRulesText: mergeRuleTextWithSupplementOverride(
      owner.minutePriceAddRulesText,
      extra.minutePriceAddRulesText,
      value => String(value || '').replace(/[^\d]/g, '')
    ),
    countryAliasText: mergeRuleTextWithSupplementOverride(
      owner.countryAliasText,
      extra.countryAliasText,
      value => normalizeServiceAliasMatchText(value)
    ),
    amountTransformRules: dedupAmount,
    serviceOrderText: appendRuleText(owner.serviceOrderText, extra.serviceOrderText),
    aliasRulesText: mergeRuleTextWithSupplementOverride(
      owner.aliasRulesText,
      extra.aliasRulesText,
      value => normalizeServiceAliasMatchText(value)
    ),
    removeWordsText: appendRuleText(owner.removeWordsText, extra.removeWordsText),
    extraKeepText: appendRuleText(owner.extraKeepText, extra.extraKeepText),
    countryFieldRulesText: mergeRuleTextWithSupplementOverride(
      owner.countryFieldRulesText,
      extra.countryFieldRulesText,
      value => normalizeServiceAliasMatchText(value)
    ),
    bodyCupPrefixText: mergeRuleTextWithSupplementOverride(
      owner.bodyCupPrefixText,
      extra.bodyCupPrefixText,
      value => normalizeServiceAliasMatchText(value)
    ),
    notNameWordsText: appendRuleText(owner.notNameWordsText, extra.notNameWordsText)
  }
}

async function getOnlineOwnerGlobalRule() {
  if (!isOnlineWorkspaceReady()) return null

  const { data, error } = await supabase.rpc('get_owner_global_rule')
  if (error) throw error
  if (data && typeof data === 'object') return data

  // 尚未完成第 018-147 批資料庫遷移或尚未建立全站公版時，
  // 老闆可先從目前畫面／舊機房公版帶入，儲存後即改走獨立全站公版資料表。
  if (isOwner.value) {
    return getOnlineRuleForCurrentRoom()
  }

  // 相容第 018-144 前的舊機房公版；老闆完成第 018-147 批儲存後不再使用此路徑。
  const city = cleanScopeText(ruleScopeCity.value)
  const district = cleanScopeText(ruleScopeDistrict.value)
  const mode = cleanScopeText(ruleScopeType.value)
  const room = cleanScopeText(ruleScopeRoom.value)
  if (!city || !district || !mode || !room) return null

  const legacy = await supabase.rpc('get_owner_rule_for_scope', {
    p_city: city,
    p_district: district,
    p_mode: mode,
    p_room: room
  })
  if (legacy.error) throw legacy.error
  return legacy.data && typeof legacy.data === 'object' ? legacy.data : null
}

async function getOnlineOwnerRuleForCurrentRoom() {
  return getOnlineOwnerGlobalRule()
}

async function saveOnlineOwnerGlobalRule(data) {
  if (!isOwner.value || !isOnlineWorkspaceReady()) return null

  const globalRule = { ...data, kind: OWNER_BASE_RULE_KIND }

  const { data: savedRule, error } = await supabase.rpc('save_owner_global_rule', {
    p_rules: globalRule
  })

  if (error) throw error
  if (!savedRule || typeof savedRule !== 'object') {
    throw new Error('老闆全站公版寫入 0 筆；請確認已執行第 018-147 批 SQL。')
  }

  const { data: verifiedRule, error: verifyError } = await supabase.rpc('get_owner_global_rule')
  if (verifyError) throw verifyError
  if (!verifiedRule || typeof verifiedRule !== 'object') {
    throw new Error('老闆全站公版送出後未能重新讀回。')
  }

  const differenceFields = getRuleDataDifferenceFields(verifiedRule, globalRule)
  if (differenceFields.length) {
    throw new Error(`老闆全站公版重新讀回內容不同；差異欄位：${differenceFields.join('、')}。`)
  }

  return verifiedRule
}

function applyEmployeeSupplementData(data, options = {}) {
  const extra = normalizeSupplementRuleData(data)
  priceMode.value = extra.priceMode
  globalIncrease.value = extra.globalIncrease ?? ''
  customIncrease.value = extra.customIncrease ?? ''
  amountPriorityMode.value = extra.amountPriorityMode
  titleMode.value = extra.titleMode
  bodyOutputOrder.value = extra.bodyOutputOrder || ownerBaseRuleData.value?.bodyOutputOrder || 'height-weight-cup-age'
  formatHint.value = extra.formatHint
  headerRecognitionRules.value = normalizeHeaderRecognitionRules(extra.headerRecognitionRules, { useDefaults: false })
  bodyRecognitionRules.value = normalizeBodyRecognitionRules(extra.bodyRecognitionRules, { useDefaults: false })
  advancedRegexRules.value = []
  countryPriceRulesText.value = extra.countryPriceRulesText
  minutePriceAddRulesText.value = extra.minutePriceAddRulesText
  countryAliasText.value = extra.countryAliasText
  amountTransformRules.value = normalizeAmountRules(extra.amountTransformRules)
  serviceOrderText.value = extra.serviceOrderText
  aliasRulesText.value = extra.aliasRulesText
  removeWordsText.value = extra.removeWordsText
  extraKeepText.value = extra.extraKeepText
  countryFieldRulesText.value = extra.countryFieldRulesText
  bodyCupPrefixText.value = extra.bodyCupPrefixText
  notNameWordsText.value = extra.notNameWordsText
  employeeSupplementLoaded.value = true
  if (!options.keepPanelsOpen) closeTopSettingModal()
}

async function withEffectiveRulesForEmployee(callback) {
  if (isOwner.value) return callback()

  const supplement = normalizeSupplementRuleData(collectRuleData())
  let onlineOwnerRule = null

  try {
    onlineOwnerRule = await getOnlineOwnerGlobalRule()
  } catch (error) {
    console.warn('讀取老闆全站公版失敗，嘗試使用本次登入已快取公版：', error)
  }

  const owner = onlineOwnerRule || ownerBaseRuleData.value
  if (!owner || typeof owner !== 'object') {
    throw new Error('讀不到老闆全站公版規則。請老闆先登入任一設定頁按「儲存」，並確認已執行第 018-147 批 SQL。')
  }

  ownerBaseRuleData.value = owner
  const effective = mergeOwnerAndEmployeeRules(owner, supplement)
  applyRuleData(effective, { keepPanelsOpen: true })

  try {
    return await callback()
  } finally {
    applyEmployeeSupplementData(supplement, { keepPanelsOpen: true })
  }
}

function normalizeRuleTextForCompare(value) {
  return String(value ?? '')
    .replace(/\r\n?/g, '\n')
    .trimEnd()
}

function normalizeRuleDataForCompare(data = {}) {
  return {
    priceMode: String(data.priceMode ?? 'country'),
    globalIncrease: Number(data.globalIncrease ?? 500),
    customIncrease: Number(data.customIncrease ?? 700),
    amountPriorityMode: String(data.amountPriorityMode ?? 'higher-price'),
    titleMode: String(data.titleMode ?? 'country-name'),
    bodyOutputOrder: String(data.bodyOutputOrder ?? 'height-weight-cup-age'),
    formatHint: normalizeRuleTextForCompare(data.formatHint),
    headerRecognitionRules: normalizeHeaderRecognitionRules(data.headerRecognitionRules, { useDefaults: true }),
    bodyRecognitionRules: normalizeBodyRecognitionRules(data.bodyRecognitionRules, { useDefaults: true }),
    advancedRegexRules: normalizeAdvancedRegexRules(data.advancedRegexRules),
    countryPriceRulesText: normalizeRuleTextForCompare(data.countryPriceRulesText),
    minutePriceAddRulesText: normalizeRuleTextForCompare(data.minutePriceAddRulesText),
    countryAliasText: normalizeRuleTextForCompare(data.countryAliasText),
    amountTransformRules: normalizeAmountRules(
      data.amountTransformRules ?? data.amountTransformRulesText ?? []
    ),
    serviceOrderText: normalizeRuleTextForCompare(data.serviceOrderText),
    aliasRulesText: normalizeRuleTextForCompare(data.aliasRulesText),
    removeWordsText: normalizeRuleTextForCompare(data.removeWordsText),
    extraKeepText: normalizeRuleTextForCompare(data.extraKeepText),
    countryFieldRulesText: normalizeRuleTextForCompare(data.countryFieldRulesText),
    bodyCupPrefixText: normalizeRuleTextForCompare(data.bodyCupPrefixText),
    notNameWordsText: normalizeRuleTextForCompare(data.notNameWordsText)
  }
}

function stableRuleStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(item => stableRuleStringify(item)).join(',')}]`
  }

  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map(key => `${JSON.stringify(key)}:${stableRuleStringify(value[key])}`)
      .join(',')}}`
  }

  return JSON.stringify(value)
}

function getRuleDataDifferenceFields(savedRule, currentRule) {
  if (!savedRule || !currentRule) return ['規則資料不存在']

  const saved = normalizeRuleDataForCompare(savedRule)
  const current = normalizeRuleDataForCompare(currentRule)

  return Object.keys(current).filter(key => (
    stableRuleStringify(saved[key]) !== stableRuleStringify(current[key])
  ))
}

function areRuleDataEquivalent(savedRule, currentRule) {
  return getRuleDataDifferenceFields(savedRule, currentRule).length === 0
}

async function saveOnlineRuleForCurrentRoom(data) {
  data = isOwner.value ? { ...data, kind: OWNER_BASE_RULE_KIND } : normalizeSupplementRuleData(data)
  const city = cleanScopeText(ruleScopeCity.value)
  const district = cleanScopeText(ruleScopeDistrict.value)
  const type = cleanScopeText(ruleScopeType.value)
  const room = cleanScopeText(ruleScopeRoom.value)

  const baseQuery = supabase
    .from('employee_rules')
    .select('user_id')
    .eq('user_id', authUser.value.id)
    .eq('city', city)
    .eq('district', district)
    .eq('mode', type)
    .eq('room', room)
    .limit(1)

  const { data: existingRows, error: readError } = await baseQuery
  if (readError) throw readError

  let saveError = null
  let savedRows = []

  if (Array.isArray(existingRows) && existingRows.length > 0) {
    const result = await supabase
      .from('employee_rules')
      .update({ rules: data })
      .eq('user_id', authUser.value.id)
      .eq('city', city)
      .eq('district', district)
      .eq('mode', type)
      .eq('room', room)
      .select('rules')

    saveError = result.error
    savedRows = Array.isArray(result.data) ? result.data : []
  } else {
    const result = await supabase
      .from('employee_rules')
      .insert({
        user_id: authUser.value.id,
        city,
        district,
        mode: type,
        room,
        rules: data
      })
      .select('rules')

    saveError = result.error
    savedRows = Array.isArray(result.data) ? result.data : []
  }

  if (saveError) throw saveError

  if (!savedRows.length) {
    throw new Error('Supabase 回傳寫入 0 筆；請確認 employee_rules 的 UPDATE／INSERT 政策與目前登入身分。')
  }

  const verifiedRule = await getOnlineRuleForCurrentRoom()
  if (!verifiedRule || typeof verifiedRule !== 'object') {
    throw new Error('資料送出後未能重新讀回，請確認 employee_rules 權限與資料表設定。')
  }

  const differenceFields = getRuleDataDifferenceFields(verifiedRule, data)
  if (differenceFields.length) {
    throw new Error(
      `線上重新讀回的規則與本次修改不同；差異欄位：${differenceFields.join('、')}。`
    )
  }

  return verifiedRule
}

async function saveCurrentScopeRules(options = {}) {
  if (isSavingScopeRules.value) return false
  if (isOwner.value) ruleScopeLevel.value = 'global'
  if (!validateCurrentRuleScope()) return false

  const itemLabel = cleanScopeText(options.itemLabel || '')
  const { key } = getScopeBucketAndKey()
  if (!key) {
    const message = '請先把目前範圍填完整再儲存。'
    setRoomRuleFeedback(message, 'warning', { toast: true })
    return false
  }

  isSavingScopeRules.value = true
  setRoomRuleFeedback(`正在儲存「${currentRuleScopeLabel.value}」規則...`, 'pending', { silent: true })

  try {
    const data = options.dataOverride && typeof options.dataOverride === 'object'
      ? options.dataOverride
      : collectRuleData()
    const store = setRuleDataToScope(readScopeRuleStore(), ruleScopeLevel.value, key, data)
    writeScopeRuleStore(store)

    if (ruleScopeLevel.value === 'global') {
      localStorage.setItem(getStaffScopedStorageKey(RULE_STORAGE_KEY), JSON.stringify(data))

      if (!isOwner.value) {
        setRoomRuleFeedback('員工不能修改老闆全站公版；請選完整地區與機房後儲存自己的補充規則。', 'warning', { toast: true })
        return false
      }

      if (!isOnlineWorkspaceReady()) {
        setRoomRuleFeedback('老闆全站公版已保留在本機，但目前未連線登入，尚未同步給所有員工。', 'warning', { toast: true })
        return true
      }

      const verifiedRule = await saveOnlineOwnerGlobalRule(data)
      ownerBaseRuleData.value = verifiedRule
      const verifiedStore = setRuleDataToScope(readScopeRuleStore(), 'global', 'global', verifiedRule)
      writeScopeRuleStore(verifiedStore)
      localStorage.setItem(getStaffScopedStorageKey(RULE_STORAGE_KEY), JSON.stringify(verifiedRule))

      const message = itemLabel
        ? `已儲存老闆全站公版「${itemLabel}」；所有縣市與所有員工轉換時都會先套用。`
        : '已儲存老闆全站公版；所有縣市與所有員工轉換時都會先套用。'
      setRoomRuleFeedback(message, 'success', { toast: true })
      return true
    }

    repairProtectedGlobalRules()

    if (ruleScopeLevel.value !== 'room') {
      const message = itemLabel
        ? `已個別儲存「${itemLabel}」到「${currentRuleScopeLabel.value}」；線上同步以完整機房為主。`
        : `已儲存「${currentRuleScopeLabel.value}」本機專屬規則。線上同步以完整機房為主。`
      setRoomRuleFeedback(message, 'success', { toast: true })
      return true
    }

    if (!isOnlineWorkspaceReady()) {
      rememberCurrentScopeSelection()
      const message = itemLabel
        ? `已個別儲存「${itemLabel}」到本機；尚未登入線上帳號，無法同步。`
        : `已儲存「${currentRuleScopeLabel.value}」本機規則；尚未登入線上帳號，無法同步。`
      setRoomRuleFeedback(message, 'warning', { toast: true })
      return true
    }

    const verifiedRule = await saveOnlineRuleForCurrentRoom(data)
    const verifiedStore = setRuleDataToScope(readScopeRuleStore(), 'room', key, verifiedRule)
    writeScopeRuleStore(verifiedStore)
    rememberCurrentScopeSelection({ syncOnline: true })

    const message = itemLabel
      ? `已儲存我的地區補充「${itemLabel}」：${currentRuleScopeLabel.value}；轉換時會接在老闆全站公版後套用。`
      : `已儲存員工地區補充規則：${currentRuleScopeLabel.value}；轉換時會接在老闆全站公版後套用。`
    setRoomRuleFeedback(message, 'success', { toast: true })
    return true
  } catch (error) {
    const message = isOwner.value
      ? `老闆全站公版已保留在本機，但線上儲存失敗：${error.message || error}`
      : (itemLabel
        ? `「${itemLabel}」已保留在本機，但線上個別儲存失敗：${error.message || error}`
        : `本機已保留，但線上儲存機房規則失敗：${error.message || error}`)
    setRoomRuleFeedback(message, 'error', { toast: true })
    return false
  } finally {
    isSavingScopeRules.value = false
  }
}


async function getOnlineRuleForCurrentRoom() {
  if (!isOnlineWorkspaceReady()) return null

  const city = cleanScopeText(ruleScopeCity.value)
  const district = cleanScopeText(ruleScopeDistrict.value)
  const type = cleanScopeText(ruleScopeType.value)
  const room = cleanScopeText(ruleScopeRoom.value)

  if (!city || !district || !type || !room) return null

  const { data, error } = await supabase
    .from('employee_rules')
    .select('rules')
    .eq('user_id', authUser.value.id)
    .eq('city', city)
    .eq('district', district)
    .eq('mode', type)
    .eq('room', room)
    .limit(1)

  if (error) throw error
  return Array.isArray(data) && data.length > 0 ? data[0]?.rules || null : null
}

async function loadCurrentScopeRules(options = {}) {
  if (isLoadingScopeRules.value) return false
  if (isOwner.value) ruleScopeLevel.value = 'global'
  if (!validateCurrentRuleScope()) return false

  const isAutoLoad = options.auto === true
  isLoadingScopeRules.value = true

  if (!isAutoLoad) {
    setRoomRuleFeedback(`正在讀取「${currentRuleScopeLabel.value}」規則...`, 'pending', { silent: true })
  }

  try {
    if (isOwner.value) {
      let ownerRule = null
      if (isOnlineWorkspaceReady()) {
        ownerRule = await getOnlineOwnerGlobalRule()
      }
      ownerRule = ownerRule || getGlobalRuleDataFallback() || buildDefaultRuleData()
      ownerBaseRuleData.value = ownerRule
      applyRuleData(ownerRule, { keepPanelsOpen: true })
      const store = setRuleDataToScope(readScopeRuleStore(), 'global', 'global', ownerRule)
      writeScopeRuleStore(store)
      localStorage.setItem(getStaffScopedStorageKey(RULE_STORAGE_KEY), JSON.stringify(ownerRule))
      setRoomRuleFeedback('已讀取老闆全站公版規則；此規則不分縣市、地區、定點或機房。', 'success', {
        silent: options.silent,
        toast: !options.silent && !isAutoLoad
      })
      return true
    }

    if (ruleScopeLevel.value === 'room' && isOnlineWorkspaceReady()) {
      const onlineRule = await getOnlineRuleForCurrentRoom()
      if (!isOwner.value) {
        const ownerRule = await getOnlineOwnerGlobalRule()
        if (!ownerRule || typeof ownerRule !== 'object') {
          throw new Error('讀不到老闆全站公版。請老闆先儲存一次全站公版，並確認第 018-147 批 SQL 已執行。')
        }
        ownerBaseRuleData.value = ownerRule
        applyEmployeeSupplementData(onlineRule || buildEmptyEmployeeSupplementData(), { keepPanelsOpen: true })
        const { key } = getScopeBucketAndKey()
        const store = setRuleDataToScope(readScopeRuleStore(), 'room', key, onlineRule || buildEmptyEmployeeSupplementData())
        writeScopeRuleStore(store)
        const message = isAutoLoad
          ? `已讀取老闆公版＋目前員工補充：${currentRuleScopeLabel.value}`
          : `已讀取老闆公版＋目前員工補充：${currentRuleScopeLabel.value}`
        setRoomRuleFeedback(message, 'success', { silent: options.silent, toast: !options.silent && !isAutoLoad })
        return true
      }
      if (onlineRule && typeof onlineRule === 'object') {
        ownerBaseRuleData.value = onlineRule
        applyRuleData(onlineRule, { keepPanelsOpen: true })
        const { key } = getScopeBucketAndKey()
        const store = setRuleDataToScope(readScopeRuleStore(), 'room', key, onlineRule)
        writeScopeRuleStore(store)

        const message = isAutoLoad
          ? `已自動讀取線上機房規則：${currentRuleScopeLabel.value}`
          : `已從線上讀取：${currentRuleScopeLabel.value}`

        setRoomRuleFeedback(message, 'success', {
          silent: options.silent,
          toast: !options.silent && !isAutoLoad
        })
        return true
      }
    }

    const resolved = getEffectiveScopedRuleData()
    if (!resolved.data) {
      const message = '目前範圍沒有專屬規則，也沒有公版規則；已保留畫面目前設定。'
      setRoomRuleFeedback(message, 'warning', {
        silent: options.silent,
        toast: !options.silent && !isAutoLoad
      })
      return false
    }

    if (isOwner.value) {
      ownerBaseRuleData.value = resolved.data
      applyRuleData(resolved.data, { keepPanelsOpen: true })
    } else {
      ownerBaseRuleData.value = resolved.data || buildDefaultRuleData()
      applyEmployeeSupplementData(buildEmptyEmployeeSupplementData(), { keepPanelsOpen: true })
    }

    const message = isAutoLoad
      ? `此機房尚無線上專屬規則，已自動套用：${resolved.label}`
      : `已套用：${resolved.label}`

    setRoomRuleFeedback(message, 'success', {
      silent: options.silent,
      toast: !options.silent && !isAutoLoad
    })
    return true
  } catch (error) {
    const message = `線上讀取機房規則失敗：${error.message || error}`
    setRoomRuleFeedback(message, 'error', {
      silent: options.silent,
      toast: !options.silent && !isAutoLoad
    })
    return false
  } finally {
    isLoadingScopeRules.value = false
  }
}


function copyGlobalRulesToCurrentScope() {
  if (ruleScopeLevel.value === 'global') {
    statusMessage.value = '目前已經是公版規則，不需要複製。'
    return
  }
  if (!validateCurrentRuleScope()) return

  const globalData = getGlobalRuleDataFallback() || collectRuleData()
  const { key } = getScopeBucketAndKey()
  const store = setRuleDataToScope(readScopeRuleStore(), ruleScopeLevel.value, key, globalData)
  writeScopeRuleStore(store)
  applyRuleData(globalData)
  statusMessage.value = `已把公版規則複製到「${currentRuleScopeLabel.value}」。`
}

function clearCurrentScopeRules() {
  if (ruleScopeLevel.value === 'global') {
    repairProtectedGlobalRules()
    statusMessage.value = PROTECTED_GLOBAL_RULE_NOTICE
    return
  }
  if (!validateCurrentRuleScope()) return

  const { key } = getScopeBucketAndKey()
  const store = deleteRuleDataFromScope(readScopeRuleStore(), ruleScopeLevel.value, key)
  writeScopeRuleStore(store)
  statusMessage.value = `已清除「${currentRuleScopeLabel.value}」專屬規則，之後會往上沿用。`
}


function collectRuleData() {
  return {
    kind: isOwner.value ? OWNER_BASE_RULE_KIND : EMPLOYEE_SUPPLEMENT_RULE_KIND,
    priceMode: priceMode.value,
    globalIncrease: globalIncrease.value,
    customIncrease: customIncrease.value,
    amountPriorityMode: amountPriorityMode.value,
    titleMode: titleMode.value,
    bodyOutputOrder: bodyOutputOrder.value,
    formatHint: formatHint.value,
    headerRecognitionRules: normalizeHeaderRecognitionRules(headerRecognitionRules.value, { useDefaults: isOwner.value }),
    bodyRecognitionRules: normalizeBodyRecognitionRules(bodyRecognitionRules.value, { useDefaults: isOwner.value }),
    advancedRegexRules: isOwner.value ? normalizeAdvancedRegexRules(advancedRegexRules.value) : [],
    countryPriceRulesText: countryPriceRulesText.value,
    minutePriceAddRulesText: minutePriceAddRulesText.value,
    countryAliasText: countryAliasText.value,
    amountTransformRules: amountTransformRules.value,
    serviceOrderText: serviceOrderText.value,
    aliasRulesText: aliasRulesText.value,
    removeWordsText: removeWordsText.value,
    extraKeepText: extraKeepText.value,
    countryFieldRulesText: countryFieldRulesText.value,
    bodyCupPrefixText: bodyCupPrefixText.value,
    notNameWordsText: notNameWordsText.value
  }
}

function applyRuleData(data, options = {}) {
  // 第 018-142 批：服務同義詞讀取已儲存內容時不再強制補回預設項目，讓老闆刪除後可永久保留。
  priceMode.value = data.priceMode ?? 'country'
  globalIncrease.value = Number(data.globalIncrease ?? 500)
  customIncrease.value = Number(data.customIncrease ?? 700)
  amountPriorityMode.value = data.amountPriorityMode ?? 'higher-price'
  titleMode.value = data.titleMode ?? 'country-name'
  bodyOutputOrder.value = data.bodyOutputOrder || 'height-weight-cup-age'
  formatHint.value = data.formatHint ?? formatHint.value
  headerRecognitionRules.value = normalizeHeaderRecognitionRules(data.headerRecognitionRules, { useDefaults: true })
  bodyRecognitionRules.value = normalizeBodyRecognitionRules(data.bodyRecognitionRules, { useDefaults: true })
  advancedRegexRules.value = normalizeAdvancedRegexRules(data.advancedRegexRules)
  countryPriceRulesText.value = data.countryPriceRulesText ?? countryPriceRulesText.value
  minutePriceAddRulesText.value = data.minutePriceAddRulesText ?? minutePriceAddRulesText.value
  countryAliasText.value = data.countryAliasText ?? countryAliasText.value
  amountTransformRules.value = normalizeAmountRules(data.amountTransformRules ?? data.amountTransformRulesText ?? amountTransformRules.value)
  serviceOrderText.value = data.serviceOrderText ?? serviceOrderText.value
  if (Object.prototype.hasOwnProperty.call(data, 'aliasRulesText')) {
    // 第 018-152 批：重新登入／重新讀取時直接還原資料庫原文，禁止再次自動清理。
    aliasRulesText.value = String(data.aliasRulesText ?? '')
  }
  removeWordsText.value = data.removeWordsText ?? removeWordsText.value
  extraKeepText.value = data.extraKeepText ?? extraKeepText.value
  countryFieldRulesText.value = data.countryFieldRulesText ?? countryFieldRulesText.value
  bodyCupPrefixText.value = data.bodyCupPrefixText ?? bodyCupPrefixText.value
  notNameWordsText.value = data.notNameWordsText ?? notNameWordsText.value
  // 第 018-42 批：從舊規則備份恢復時維持乾淨首頁。
  // 第 018-73 批：機房規則讀取時保留目前面板，避免一讀取就把設定畫面關掉。
  if (!options.keepPanelsOpen) {
    activeTopPanel.value = ''
    showAdvancedSettings.value = false
    showPriceSettings.value = false
    showFormatSettings.value = false
    showQuickRules.value = false
    showApiPanel.value = false
    showScopeManager.value = false
    showScopeCrudPanel.value = false
    showAliasList.value = false
    showRemoveWordList.value = false
  }
}

function addAliasRule() {
  const from = newAliasFrom.value.trim()
  const to = newAliasTo.value.trim()

  if (!from || !to) {
    statusMessage.value = '請輸入服務同義詞的店家寫法與固定顯示。'
    return
  }

  const items = aliasRuleItems.value.filter(rule => rule.from !== from)
  items.push({ from, to })
  aliasRulesText.value = items.map(rule => `${rule.from}=${rule.to}`).join('\n')

  newAliasFrom.value = ''
  newAliasTo.value = ''
  statusMessage.value = `已新增服務同義詞：${from} → ${to}`
}

function removeAliasRule(index) {
  const items = aliasRuleItems.value.slice()
  items.splice(index, 1)
  aliasRulesText.value = items.map(rule => `${rule.from}=${rule.to}`).join('\n')
  statusMessage.value = '已刪除服務同義詞。'
}

function addRemoveWord() {
  const word = newRemoveWord.value.trim()
  if (!word) {
    statusMessage.value = '請輸入要清理的文字。'
    return
  }

  const items = removeWordItems.value.filter(item => item !== word)
  items.push(word)
  removeWordsText.value = items.join('\n')

  newRemoveWord.value = ''
  statusMessage.value = `已新增不想出現文字：${word}`
}

function removeRemoveWord(index) {
  const items = removeWordItems.value.slice()
  items.splice(index, 1)
  removeWordsText.value = items.join('\n')
  statusMessage.value = '已刪除不想出現文字。'
}

function addCountryFieldRule() {
  const from = newCountryRuleFrom.value.trim()
  const to = newCountryRuleTo.value.trim()

  if (!from || !to) {
    statusMessage.value = '請輸入國籍欄位規則。'
    return
  }

  const items = countryFieldRuleItems.value.filter(rule => rule.from !== from)
  items.push({ from, to })
  countryFieldRulesText.value = items.map(rule => `${rule.from}=${rule.to}`).join('\n')

  newCountryRuleFrom.value = ''
  newCountryRuleTo.value = '馬來'
  statusMessage.value = `已新增國籍欄位規則：${from} → ${to}`
}

function removeCountryFieldRule(index) {
  const items = countryFieldRuleItems.value.slice()
  items.splice(index, 1)
  countryFieldRulesText.value = items.map(rule => `${rule.from}=${rule.to}`).join('\n')
  statusMessage.value = '已刪除國籍欄位規則。'
}

function cloneRuleFieldValue(value) {
  if (Array.isArray(value)) return value.map(item => cloneRuleFieldValue(item))
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, cloneRuleFieldValue(item)]))
  }
  return value
}

async function getCurrentSavedLayerForPartialSave() {
  const ownerFallback = getEffectiveScopedRuleData().data || ownerBaseRuleData.value || buildDefaultRuleData()
  const fallback = isOwner.value
    ? { ...ownerFallback, kind: OWNER_BASE_RULE_KIND }
    : buildEmptyEmployeeSupplementData()

  if (ruleScopeLevel.value === 'room' && isOnlineWorkspaceReady()) {
    const onlineRule = await getOnlineRuleForCurrentRoom()
    if (onlineRule && typeof onlineRule === 'object') {
      if (isOwner.value || onlineRule.kind === EMPLOYEE_SUPPLEMENT_RULE_KIND) {
        return onlineRule
      }
    }
    return fallback
  }

  const { key } = getScopeBucketAndKey()
  const saved = getRuleDataFromScope(readScopeRuleStore(), ruleScopeLevel.value, key)
  if (!saved || typeof saved !== 'object') return fallback
  if (!isOwner.value && saved.kind !== EMPLOYEE_SUPPLEMENT_RULE_KIND) return fallback
  return saved
}

async function saveRuleFields(itemLabel, fieldNames = []) {
  if (isSavingScopeRules.value) return false
  if (!validateCurrentRuleScope()) return false

  const fields = [...new Set((Array.isArray(fieldNames) ? fieldNames : [fieldNames]).filter(Boolean))]
  if (!fields.length) return saveCurrentScopeRules({ itemLabel })

  if (fields.includes('aliasRulesText')) {
    cleanupAliasRulesBeforeSave()
  }

  try {
    const current = collectRuleData()
    const saved = await getCurrentSavedLayerForPartialSave()
    const merged = {
      ...saved,
      kind: isOwner.value ? OWNER_BASE_RULE_KIND : EMPLOYEE_SUPPLEMENT_RULE_KIND
    }

    fields.forEach(field => {
      if (Object.prototype.hasOwnProperty.call(current, field)) {
        merged[field] = cloneRuleFieldValue(current[field])
      }
    })

    return saveCurrentScopeRules({
      dataOverride: merged,
      itemLabel
    })
  } catch (error) {
    const message = `「${itemLabel || '目前項目'}」個別儲存失敗：${error.message || error}`
    setRoomRuleFeedback(message, 'error', { toast: true })
    return false
  }
}

function saveRules() {
  const aliasCleanupMessage = cleanupAliasRulesBeforeSave()
  if (aliasCleanupMessage) {
    statusMessage.value = `${aliasCleanupMessage}。`
  }
  return saveCurrentScopeRules()
}

function loadRules(options = {}) {
  return loadCurrentScopeRules(options)
}

function getFirstStorageValue(primaryKey, fallbackKeys = []) {
  const primaryValue = localStorage.getItem(primaryKey)
  if (primaryValue) return primaryValue

  for (const key of fallbackKeys) {
    const value = localStorage.getItem(key)
    if (value) return value
  }

  return ''
}

function resetRules() {
  const defaults = buildDefaultRuleData()
  priceMode.value = defaults.priceMode
  globalIncrease.value = defaults.globalIncrease
  customIncrease.value = defaults.customIncrease
  amountPriorityMode.value = defaults.amountPriorityMode
  titleMode.value = defaults.titleMode
  bodyOutputOrder.value = defaults.bodyOutputOrder
  formatHint.value = defaults.formatHint
  headerRecognitionRules.value = normalizeHeaderRecognitionRules(defaults.headerRecognitionRules)
  bodyRecognitionRules.value = normalizeBodyRecognitionRules(defaults.bodyRecognitionRules)
  advancedRegexRules.value = normalizeAdvancedRegexRules(defaults.advancedRegexRules)
  countryPriceRulesText.value = defaults.countryPriceRulesText
  minutePriceAddRulesText.value = defaults.minutePriceAddRulesText
  countryAliasText.value = defaults.countryAliasText
  amountTransformRules.value = normalizeAmountRules(defaults.amountTransformRules)
  newAmountFrom.value = ''
  newAmountTo.value = ''
  serviceOrderText.value = defaults.serviceOrderText
  aliasRulesText.value = defaults.aliasRulesText
  removeWordsText.value = defaults.removeWordsText
  extraKeepText.value = defaults.extraKeepText
  countryFieldRulesText.value = defaults.countryFieldRulesText
  bodyCupPrefixText.value = defaults.bodyCupPrefixText
  notNameWordsText.value = defaults.notNameWordsText
  showAdvancedSettings.value = false
  showPriceSettings.value = false
  showFormatSettings.value = false
  showQuickRules.value = false
  showAliasList.value = false
  showRemoveWordList.value = false
  newAliasFrom.value = ''
  newAliasTo.value = ''
  newRemoveWord.value = ''
  newCountryRuleFrom.value = ''
  newCountryRuleTo.value = '馬來'
  repairProtectedGlobalRules()
  statusMessage.value = ruleScopeLevel.value === 'global'
    ? '已恢復畫面預設；公版規則固定保護中，不會被刪除。要把預設覆蓋成公版，請再按「儲存規則」。'
    : '已恢復畫面預設；公版規則固定保護中，不會被刪除。'
}

async function exportRules() {
  const backup = JSON.stringify(collectRuleData(), null, 2)

  try {
    await navigator.clipboard.writeText(backup)
    statusMessage.value = '已複製規則備份。之後換電腦或清快取，可用「貼上規則備份」還原。'
  } catch (error) {
    window.prompt('請手動複製這份規則備份：', backup)
  }
}

function importRules() {
  const raw = window.prompt('請貼上之前複製的規則備份 JSON：')
  if (!raw) return

  try {
    const parsed = JSON.parse(raw)
    applyRuleData(parsed)
    saveRules()
    repairProtectedGlobalRules()
    statusMessage.value = '已匯入規則備份並儲存；公版規則固定保護中。'
  } catch (error) {
    statusMessage.value = '匯入失敗：貼上的內容不是正確的規則備份。'
  }
}


function ensureDocument3TopBlankLines(text) {
  const body = String(text || '').replace(/^\n+/, '')
  return body ? `\n\n${body}` : '\n\n'
}

function normalizeDocument3Text() {
  confirmedText.value = ensureDocument3TopBlankLines(confirmedText.value)
}

function appendResultToConfirmed() {
  const text = resultText.value.trim()
  if (!text) {
    statusMessage.value = '文件2目前沒有內容，不能加入文件3。'
    return
  }

  if (resultHasIncompleteRecords.value) {
    statusMessage.value = `文件2仍有 ${resultIncompleteCount.value} 筆不完整資料，請先補齊身材與正式價格方案，再重新產生文件2。`
    return
  }

  const current = String(confirmedText.value || '').replace(/^\n+/, '').trim()
  confirmedText.value = ensureDocument3TopBlankLines(current ? `${current}\n\n${text}` : text)
  saveConfirmedText({ silent: true })
  clearResultText({ silent: true })
  updateJsonPreview()
  statusMessage.value = '已把文件2加入文件3，文件4 JSON 已同步更新。'
}





async function saveConfirmedText(options = {}) {
  normalizeDocument3Text()
  localStorage.setItem(CONFIRMED_STORAGE_KEY, confirmedText.value)
  updateJsonPreview()
  if (!options.silent) {
    statusMessage.value = '文件3已儲存；資料庫寫入與中央站同步會在背景處理。'
    setDatabaseSubmitFeedback('文件3已快速儲存，正在背景寫入資料庫...', 'pending')

    window.setTimeout(() => {
      submitDocument4ToDatabase({ clearDocuments: false, reloadFrontendLadies: true })
        .then(savedToDatabase => {
          statusMessage.value = savedToDatabase
            ? '文件3已儲存；資料庫已保存，中央站同步狀態請看下方提示。'
            : '文件3已儲存，但自動送出資料庫失敗，請查看 API 狀態訊息。'
        })
        .catch(error => {
          const message = formatNetworkError(error, '背景送出失敗')
          statusMessage.value = message
          setDatabaseSubmitFeedback(message, 'error', { toast: true })
          isDatabaseSubmitting.value = false
        })
    }, 0)
  }
}

async function retryCentralWebsiteSync() {
  if (isDatabaseSubmitting.value) return false

  const payload = parseConfirmedTextToJson(confirmedText.value)
  if (!payload.items.length) {
    const message = '文件3目前沒有可重新同步中央站的資料。'
    setDatabaseSubmitFeedback(message, 'warning', { toast: true })
    return false
  }

  isDatabaseSubmitting.value = true
  centralWebsiteSyncNeedsRetry.value = false

  try {
    setDatabaseSubmitFeedback('正在重新同步本次文件到中央網站...', 'pending')
    const centralSync = await syncSavedLadiesToCentralWebsite(payload)
    applyDatabaseIdHintsFromResponse(centralSync, payload)
    const duplicatePreventedCount = Number(centralSync?.data?.duplicatePreventedCount || 0)
    const message = `中央網站重新同步完成${duplicatePreventedCount ? `，並攔截 ${duplicatePreventedCount} 筆可能重複資料` : ''}。`
    apiStatusText.value = message
    setDatabaseSubmitFeedback(message, 'success', { toast: true })
    await loadFrontendLadies({ silent: true, refresh: true })
    return true
  } catch (error) {
    const message = formatNetworkError(error, '中央站重新同步失敗')
    centralWebsiteSyncNeedsRetry.value = true
    centralWebsiteSyncRetryText.value = message
    apiStatusText.value = `${message}。文件3已保留，可稍後再按「重新同步中央站」。`
    setDatabaseSubmitFeedback(message, 'warning', { toast: true })
    return false
  } finally {
    isDatabaseSubmitting.value = false
  }
}



function loadConfirmedText(options = {}) {
  const saved = getFirstStorageValue(CONFIRMED_STORAGE_KEY, LEGACY_CONFIRMED_STORAGE_KEYS)

  if (saved) {
    confirmedText.value = ensureDocument3TopBlankLines(saved)
    localStorage.setItem(CONFIRMED_STORAGE_KEY, confirmedText.value)
  } else {
    confirmedText.value = ensureDocument3TopBlankLines(confirmedText.value)
  }

  normalizeDocument3Text()
  updateJsonPreview()

  if (!options.silent) {
    statusMessage.value = '文件3已讀取，文件4 JSON 已同步更新。'
  }

  return true
}



function clearSourceAndResult() {
  sourceText.value = ''
  clearResultText({ silent: true })
  statusMessage.value = '已清空文件1與文件2，文件3保留。'
}

function clearConfirmedText() {
  confirmedText.value = '\n\n'
  localStorage.setItem(CONFIRMED_STORAGE_KEY, confirmedText.value)
  updateJsonPreview()
  statusMessage.value = '文件3已清空，文件4 JSON 已同步更新。'
}


function clearDocumentsAfterDatabaseSubmit() {
  sourceText.value = ''
  clearResultText({ silent: true })
  confirmedText.value = '\n\n'
  jsonResultText.value = JSON.stringify({
    generatedAt: new Date().toISOString(),
    source: 'document3_confirmed',
    total: 0,
    items: []
  }, null, 2)

  safeSetStorageValue(SOURCE_STORAGE_KEY, sourceText.value)
  safeSetStorageValue(RESULT_STORAGE_KEY, resultText.value)
  safeSetStorageValue(CONFIRMED_STORAGE_KEY, confirmedText.value)

  return true
}






async function copyText(text, label) {
  if (!String(text || '').trim()) {
    statusMessage.value = `${label}目前沒有可複製內容。`
    return
  }
  try {
    await navigator.clipboard.writeText(text)
    statusMessage.value = `已複製${label}。`
  } catch (error) {
    statusMessage.value = '瀏覽器不允許自動複製，請手動全選複製。'
  }
}
</script>

<style scoped>
/* 第 018-81 批：文件預覽卡片顯示全部媒體縮圖；主圖下方其餘媒體自動換行，不增加 API 查詢。 */
* { box-sizing: border-box; }

.page-shell {
  min-height: 100vh;
  padding: 22px;
  background:
    radial-gradient(circle at top left, rgba(59, 130, 246, 0.18), transparent 32%),
    linear-gradient(135deg, #eef2ff 0%, #f8fafc 48%, #ecfeff 100%);
  color: #0f172a;
  font-family: "Microsoft JhengHei", "Noto Sans TC", system-ui, sans-serif;
}

.hero-card, .rule-card, .panel {
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 18px 46px rgba(15, 23, 42, 0.08);
}

.hero-card {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-end;
  padding: 26px;
  margin-bottom: 20px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #2563eb;
  font-weight: 900;
  letter-spacing: 0.08em;
}

h1, h2, p { margin-top: 0; }
h1 { margin-bottom: 10px; font-size: clamp(28px, 4vw, 42px); }
h2 { margin-bottom: 0; font-size: 20px; }

.hero-text, .rule-header p, .hint {
  color: #64748b;
  line-height: 1.7;
}

.hero-actions {
  display: grid;
  grid-template-columns: 190px 150px 150px 180px;
  gap: 12px;
}

label {
  display: grid;
  gap: 8px;
  color: #334155;
  font-weight: 800;
}

select, input, textarea {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 16px;
  padding: 12px 14px;
  background: #fff;
  color: #0f172a;
  font: inherit;
  outline: none;
}

select:focus, input:focus, textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

.rule-card {
  padding: 22px;
  margin-bottom: 20px;
}

.rule-header, .panel-header, .button-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.rule-header { margin-bottom: 16px; }

.rule-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.rule-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}

.top-rules { grid-template-columns: 1.4fr 0.6fr; }

.rule-textarea {
  min-height: 210px;
  resize: vertical;
  line-height: 1.6;
}

.rule-textarea.small { min-height: 130px; }

.work-grid {
  display: grid;
  grid-template-columns: minmax(360px, 1fr) minmax(360px, 1fr) minmax(360px, 1fr);
  gap: 18px;
  align-items: stretch;
}

.panel { padding: 20px; }
.panel-header, .button-row { margin-bottom: 14px; }

.work-textarea {
  min-height: 560px;
  resize: vertical;
  line-height: 1.65;
  white-space: pre-wrap;
}

.primary-btn, .ghost-btn, .danger-btn {
  border: 0;
  border-radius: 999px;
  padding: 12px 18px;
  cursor: pointer;
  font-weight: 900;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.primary-btn {
  background: linear-gradient(135deg, #2563eb, #0891b2);
  color: white;
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.22);
}

.ghost-btn { background: #e2e8f0; color: #0f172a; }
.danger-btn { background: #fee2e2; color: #991b1b; }

.primary-btn:hover, .ghost-btn:hover, .danger-btn:hover { transform: translateY(-1px); }

.hint {
  margin: 10px 0 0;
  font-weight: 700;
}


.amount-rule-card {
  border: 1px solid #cbd5e1;
  border-radius: 18px;
  padding: 16px;
  margin-bottom: 14px;
  background: #f8fafc;
}

.amount-rule-title {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 14px;
}

.amount-rule-title h3 {
  margin: 0 0 6px;
  font-size: 18px;
}

.amount-rule-title p {
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}

.amount-rule-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 12px;
  align-items: end;
  margin-bottom: 14px;
}

.add-rule-btn {
  min-height: 46px;
}

.amount-rule-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.amount-rule-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #dbe4f0;
  border-radius: 999px;
  padding: 8px 10px;
  background: #fff;
  font-weight: 800;
}

.mini-btn {
  padding: 6px 10px;
  font-size: 12px;
}


.primary-soft-btn {
  background: #dbeafe;
  color: #1d4ed8;
  border: 0;
  border-radius: 999px;
  padding: 12px 18px;
  cursor: pointer;
  font-weight: 900;
}

.quick-rule-section,
.advanced-section {
  border: 1px solid #dbe4f0;
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 16px;
  background: #f8fafc;
}

.quick-rule-header,
.advanced-title {
  margin-bottom: 14px;
}

.quick-rule-header h3,
.advanced-title h3,
.manager-title h4 {
  margin: 0 0 6px;
}

.quick-rule-header p,
.advanced-title p,
.manager-title p {
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}

.manager-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.manager-card {
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 14px;
  background: white;
}

.advanced-manager-card {
  margin-bottom: 14px;
}

.manager-inputs {
  display: grid;
  gap: 10px;
  align-items: end;
  margin: 12px 0;
}

.manager-inputs.two-cols {
  grid-template-columns: 1fr 1fr auto;
}

.manager-inputs.one-col {
  grid-template-columns: 1fr auto;
}

.rule-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 300px;
  min-height: 210px;
  overflow: auto;
}

.rule-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #dbe4f0;
  border-radius: 999px;
  padding: 7px 9px;
  background: #f8fafc;
  font-weight: 800;
  font-size: 13px;
}

.rule-chip button {
  width: 22px;
  height: 22px;
  border: 0;
  border-radius: 999px;
  background: #fee2e2;
  color: #991b1b;
  cursor: pointer;
  font-weight: 900;
}


.manager-title-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.mini-toggle-btn {
  border: 0;
  border-radius: 999px;
  padding: 8px 12px;
  background: #e0f2fe;
  color: #0369a1;
  cursor: pointer;
  font-weight: 900;
  white-space: nowrap;
}

.collapsed-hint {
  margin: 4px 0 0;
  color: #64748b;
  font-size: 13px;
  font-weight: 700;
}


.setting-summary-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 12px 0 16px;
}

.summary-pill,
.section-toggle-btn {
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 900;
}

.summary-pill {
  padding: 10px 16px;
  background: #eef6ff;
  color: #1d4ed8;
}

.collapsible-setting-card {
  border: 1px solid #dbe4f0;
  border-radius: 18px;
  background: #f8fafc;
  padding: 12px;
  margin-bottom: 14px;
}

.section-toggle-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  padding: 12px 14px;
  background: #ffffff;
  color: #0f172a;
  border: 1px solid #e2e8f0;
  text-align: left;
}

.section-toggle-btn strong {
  color: #2563eb;
}

.collapsed-content {
  margin-top: 12px;
}


.settings-helper {
  margin: 0 0 12px;
  color: #64748b;
  font-weight: 800;
}


/* 第 018-90 批：管理清單彈窗高度拉長至大視窗版（延續第 018-89 批） */
.top-settings-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2100;
  background: rgba(15, 23, 42, 0.42);
  backdrop-filter: blur(8px);
}

.top-settings-modal-card {
  position: fixed !important;
  left: 50%;
  top: 50%;
  z-index: 2110;
  width: min(1040px, calc(100vw - 36px));
  max-height: min(84vh, 860px);
  margin: 0 !important;
  padding: 22px !important;
  overflow: auto;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(148, 163, 184, 0.34) !important;
  border-radius: 28px !important;
  background: rgba(255, 255, 255, 0.96) !important;
  box-shadow: 0 34px 90px rgba(15, 23, 42, 0.34) !important;
}

.top-settings-modal-head {
  grid-column: 1 / -1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin: 0 0 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.22);
}

.top-settings-modal-head h2,
.top-settings-modal-head h3 {
  margin: 0 0 4px;
  color: #0f172a;
}

.top-settings-modal-head p {
  margin: 0;
  color: #64748b;
  font-weight: 700;
}

.top-settings-modal-head-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
}

.top-settings-modal-close {
  flex: 0 0 auto;
  min-width: 76px;
  border: 1px solid rgba(148, 163, 184, 0.42);
  border-radius: 999px;
  padding: 10px 16px;
  background: #fff;
  color: #334155;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.top-settings-modal-close:hover {
  border-color: rgba(37, 99, 235, 0.55);
  color: #1d4ed8;
}

.top-settings-price-modal,
.top-settings-format-modal {
  max-width: 900px;
}

.top-settings-price-modal {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 16px;
}

.top-settings-format-modal {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.top-settings-quick-modal,
.top-settings-advanced-modal,
.top-settings-api-modal {
  width: min(1180px, calc(100vw - 36px));
}

.top-settings-scope-modal,
.top-settings-scope-modal.scope-manager-card {
  position: static !important;
  inset: auto !important;
  left: auto !important;
  top: auto !important;
  transform: none !important;
  width: 100% !important;
  max-width: none !important;
  max-height: none !important;
  margin: 18px 0 0 !important;
  overflow: visible !important;
  z-index: auto !important;
}

.top-settings-scope-modal .scope-manager-select-grid {
  grid-template-columns:
    minmax(160px, 1fr)
    minmax(160px, 1fr)
    minmax(160px, 1fr)
    minmax(160px, 1fr)
    minmax(132px, 0.34fr);
  align-items: end;
}

.top-settings-scope-modal .manager-crud-toggle {
  width: 100%;
  min-width: 132px;
  min-height: 44px;
  padding-inline: 18px;
  align-self: end;
}

@media (max-width: 980px) {
  .top-settings-scope-modal .scope-manager-select-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .top-settings-scope-modal .scope-manager-select-grid {
    grid-template-columns: 1fr;
  }
}

.top-settings-scope-modal .room-rule-action-row {
  grid-template-columns: 1fr;
}

.top-settings-scope-modal .room-rule-buttons {
  justify-content: flex-start;
}

.top-settings-scope-modal .top-settings-modal-head-actions {
  justify-content: flex-end;
}

.top-settings-scope-modal .scope-rule-header {
  align-items: flex-start;
  display: grid !important;
  grid-template-columns: minmax(260px, 1fr) minmax(420px, 0.9fr) auto;
  gap: 18px;
}

.top-settings-scope-modal .option-modal-mask {
  z-index: 2120;
}

.top-settings-scope-modal .option-modal-card {
  z-index: 2130;
}

.top-settings-api-modal.api-panel {
  display: grid !important;
  grid-template-columns: 1fr;
  align-items: stretch;
}

.top-settings-api-modal .api-clean-header {
  grid-column: 1 / -1;
}

@media (max-width: 760px) {
  .top-settings-scope-modal .scope-manager-select-grid {
    grid-template-columns: 1fr;
  }

  .top-settings-scope-modal,
  .top-settings-scope-modal.scope-manager-card {
    width: calc(100vw - 18px) !important;
    max-width: calc(100vw - 18px) !important;
  }

  .top-settings-modal-card {
    width: calc(100vw - 18px);
    max-height: 88vh;
    padding: 18px !important;
    border-radius: 22px !important;
  }

  .top-settings-price-modal,
  .top-settings-format-modal {
    grid-template-columns: 1fr;
  }

  .top-settings-modal-head {
    flex-direction: column;
    align-items: stretch;
  }

  .top-settings-modal-head-actions {
    justify-content: flex-start;
  }
}

.setting-content-block {
  margin-top: 12px;
}


.top-setting-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 16px;
}

@media (max-width: 900px) {
  .media-upload-box {
    grid-template-columns: 1fr;
  }

  .preview-tools {
    justify-content: stretch;
  }

  .preview-tools .database-submit-feedback,
  .preview-tools .preview-database-btn,
  .preview-tools .central-retry-btn,
  .preview-tools .frontend-load-btn,
  .preview-tools label {
    width: 100%;
    max-width: none;
  }

  .preview-header {
    flex-direction: column;
    align-items: stretch;
  }

  .api-panel {
    grid-template-columns: 1fr;
  }

  .api-actions {
    justify-content: flex-start;
  }

  .top-setting-buttons {
    justify-content: flex-start;
  }
}


.wide-price-rule {
  grid-column: 1 / -1;
}

.wide-price-rule small {
  display: block;
  margin-top: 6px;
  color: #64748b;
  font-weight: 700;
}


.json-textarea {
  font-family: Consolas, Monaco, 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.5;
}

@media (min-width: 1500px) {
  .work-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}


.api-panel {
  margin: 18px 0;
  padding: 22px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.08);
  display: grid;
  grid-template-columns: 1.4fr 1fr auto;
  gap: 16px;
  align-items: end;
}

.api-panel h2 {
  margin: 0 0 6px;
  font-size: 20px;
}

.api-panel p {
  margin: 0;
  color: #64748b;
  font-weight: 700;
}

.api-panel label {
  display: grid;
  gap: 6px;
  font-weight: 800;
}

.api-panel input {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  padding: 12px 14px;
  font-weight: 800;
  outline: none;
}

.api-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.db-btn {
  background: linear-gradient(135deg, #16a34a, #0f766e);
}

.api-panel .hint {
  grid-column: 1 / -1;
  color: #475569;
}


.frontend-preview-panel {
  margin: 18px 0;
  padding: 22px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,252,0.96));
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
}

.preview-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 12px;
}

.preview-header h2 {
  margin: 0 0 6px;
  font-size: 22px;
}

.preview-header p {
  margin: 0;
  color: #64748b;
  font-weight: 700;
}

.preview-header label {
  display: grid;
  gap: 6px;
  min-width: 180px;
  font-weight: 800;
}

.preview-header select {
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  padding: 11px 12px;
  font-weight: 800;
  background: #fff;
}

.lady-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
  margin-top: 16px;
}

.lady-card {
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 20px;
  padding: 16px;
  background: #fff;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.lady-card-title {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 18px;
  color: #0f172a;
  margin-bottom: 10px;
}

.lady-card-title span {
  color: #2563eb;
  font-weight: 900;
}

.lady-sync-status-row {
  display: flex;
  align-items: center;
  margin: 4px 0 8px;
}

.lady-sync-status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 4px 9px;
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 11px;
  font-weight: 900;
  line-height: 1.2;
}

.lady-sync-status-badge.is-synced {
  border-color: #86efac;
  background: #ecfdf5;
  color: #166534;
}

.lady-sync-status-badge.is-update {
  border-color: #fdba74;
  background: #fff7ed;
  color: #9a3412;
}

.lady-sync-status-badge.is-suspected {
  border-color: #fca5a5;
  background: #fef2f2;
  color: #b91c1c;
}

.lady-sync-status-badge.is-checking {
  border-color: #cbd5e1;
  background: #f8fafc;
  color: #475569;
}

.lady-body-line {
  display: flex;
  gap: 8px;
  color: #475569;
  font-weight: 900;
  margin-bottom: 12px;
}

.lady-body-line span {
  border-radius: 999px;
  background: #eef2ff;
  color: #1e3a8a;
  padding: 5px 10px;
}

.lady-price-list,
.lady-service-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 10px;
}

.price-pill {
  background: #dcfce7;
  color: #166534;
  border-radius: 999px;
  padding: 6px 10px;
  font-weight: 900;
}

.service-pill {
  background: #f1f5f9;
  color: #334155;
  border-radius: 999px;
  padding: 6px 10px;
  font-weight: 800;
}

.empty-preview {
  margin-top: 14px;
  padding: 18px;
  border-radius: 18px;
  background: #f8fafc;
  color: #64748b;
  font-weight: 800;
}


.preview-tools {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
}

.database-submit-feedback {
  min-width: 250px;
  max-width: 760px;
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 14px;
  border: 1px solid rgba(59, 130, 246, 0.22);
  background: #eff6ff;
  color: #1e40af;
  font-size: 13px;
  font-weight: 900;
  line-height: 1.45;
  white-space: pre-line;
  text-align: left;
}

.database-submit-feedback.is-pending {
  background: #fff7ed;
  border-color: #fdba74;
  color: #9a3412;
}

.database-submit-feedback.is-success {
  background: #ecfdf5;
  border-color: #86efac;
  color: #166534;
}

.database-submit-feedback.is-warning {
  background: #fffbeb;
  border-color: #fcd34d;
  color: #92400e;
}

.database-submit-feedback.is-error {
  background: #fef2f2;
  border-color: #fca5a5;
  color: #b91c1c;
}

.frontend-load-btn,
.central-retry-btn {
  white-space: nowrap;
}

.central-retry-btn {
  min-height: 42px;
  padding-inline: 18px;
  border-color: rgba(245, 158, 11, 0.45);
  background: #fffbeb;
  color: #92400e;
  font-weight: 900;
}


.media-upload-box {
  margin: 16px 0;
  padding: 16px;
  border: 1px dashed rgba(37, 99, 235, 0.35);
  border-radius: 20px;
  background: rgba(239, 246, 255, 0.72);
  display: grid;
  grid-template-columns: 1.1fr repeat(3, minmax(120px, 1fr));
  gap: 12px;
  align-items: end;
}

.media-upload-box h3 {
  margin: 0 0 6px;
  color: #1e3a8a;
}

.media-upload-box p {
  margin: 0;
  color: #64748b;
  font-weight: 700;
}

.media-upload-box label {
  display: grid;
  gap: 6px;
  font-weight: 800;
}

.media-upload-box input,
.media-upload-box select {
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  padding: 10px 12px;
  font-weight: 800;
  background: #fff;
}

.media-upload-btn {
  white-space: nowrap;
}

.media-upload-status {
  grid-column: 1 / -1;
}

.lady-media-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin: 10px 0 12px;
}

.lady-media-image,
.lady-media-video {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  object-fit: cover;
  background: #e2e8f0;
  border: 1px solid rgba(148, 163, 184, 0.35);
}


.lady-cover-box {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(135deg, #e0f2fe, #f8fafc);
  margin-bottom: 14px;
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.lady-cover-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  background: #e2e8f0;
}

.lady-cover-empty {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #64748b;
  font-weight: 900;
  letter-spacing: 0.04em;
}

.media-count-badge {
  position: absolute;
  right: 10px;
  bottom: 10px;
  border-radius: 999px;
  padding: 6px 10px;
  background: rgba(15, 23, 42, 0.72);
  color: #fff;
  font-size: 12px;
  font-weight: 900;
}

.lady-media-thumbs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  margin: 10px 0 12px;
}

.lady-media-thumb {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  object-fit: cover;
  background: #e2e8f0;
  border: 1px solid rgba(148, 163, 184, 0.32);
}

.card-section-title {
  margin-top: 12px;
  margin-bottom: 6px;
  color: #64748b;
  font-size: 13px;
  font-weight: 900;
}

.service-title {
  margin-top: 14px;
}

.lady-card {
  display: flex;
  flex-direction: column;
}

.lady-price-list {
  min-height: 30px;
}

.lady-service-list {
  align-content: flex-start;
}


.media-drop-zone {
  grid-column: 1 / -1;
  border: 2px dashed rgba(37, 99, 235, 0.38);
  border-radius: 18px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.78);
  display: grid;
  gap: 8px;
  text-align: center;
  transition: 0.18s ease;
}

.media-drop-zone.is-dragging {
  border-color: #2563eb;
  background: rgba(219, 234, 254, 0.92);
  transform: translateY(-1px);
}

.media-drop-zone strong {
  color: #1d4ed8;
  font-size: 17px;
}

.media-drop-zone span {
  color: #64748b;
  font-weight: 800;
}

.media-drop-zone input {
  max-width: 420px;
  margin: 6px auto 0;
}

.media-upload-actions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}

.selected-media-list {
  grid-column: 1 / -1;
  display: grid;
  gap: 8px;
}

.selected-media-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.selected-media-item div {
  min-width: 0;
  display: grid;
  gap: 4px;
}

.selected-media-item strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #0f172a;
}

.selected-media-item span {
  color: #64748b;
  font-size: 13px;
  font-weight: 800;
}

.selected-media-item button {
  border: none;
  border-radius: 999px;
  padding: 7px 10px;
  background: #fee2e2;
  color: #991b1b;
  font-weight: 900;
  cursor: pointer;
}


.compact-media-upload-box {
  grid-template-columns: minmax(260px, 0.8fr) minmax(360px, 1.2fr);
  align-items: stretch;
}

.compact-media-upload-box > div:first-child {
  grid-column: 1 / -1;
}

.compact-media-upload-box > label {
  min-width: 0;
}

.compact-media-upload-box .media-drop-zone {
  grid-column: 1 / 2;
  min-height: 170px;
  padding: 14px;
  align-content: center;
}

.compact-media-upload-box .media-drop-zone input {
  width: 100%;
  max-width: 280px;
}

.compact-media-upload-box .media-upload-actions {
  grid-column: 1 / 2;
  justify-content: stretch;
}

.compact-media-upload-box .media-upload-actions button {
  flex: 1;
}

.media-upload-selected-panel {
  grid-column: 2 / 3;
  grid-row: 2 / span 3;
  min-height: 210px;
  border: 1px solid rgba(148, 163, 184, 0.32);
  border-radius: 18px;
  background: rgba(255,255,255,0.82);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.selected-panel-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.selected-panel-title strong {
  color: #1e3a8a;
  font-weight: 900;
}

.selected-panel-title span {
  color: #64748b;
  font-weight: 900;
}

.selected-media-thumb-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(86px, 1fr));
  gap: 10px;
  max-height: 250px;
  overflow: auto;
  padding-right: 4px;
}

.selected-media-thumb-card {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.35);
  min-height: 116px;
}

.selected-media-thumb-card img,
.selected-media-thumb-card video,
.selected-file-fallback {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
  background: #e2e8f0;
}

.selected-file-fallback {
  display: grid;
  place-items: center;
  color: #64748b;
  font-weight: 900;
}

.thumb-remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 999px;
  background: rgba(239, 68, 68, 0.92);
  color: #fff;
  font-size: 18px;
  line-height: 1;
  font-weight: 900;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.thumb-file-info {
  padding: 7px;
  display: grid;
  gap: 2px;
}

.thumb-file-info strong {
  min-width: 0;
  color: #0f172a;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.thumb-file-info span {
  color: #64748b;
  font-size: 11px;
  font-weight: 800;
}

.selected-media-empty {
  flex: 1;
  display: grid;
  place-items: center;
  text-align: center;
  color: #64748b;
  font-weight: 900;
  border-radius: 14px;
  background: #f8fafc;
  padding: 16px;
}

.compact-media-upload-box .media-upload-status {
  grid-column: 1 / -1;
}

@media (max-width: 980px) {
  .compact-media-upload-box {
    grid-template-columns: 1fr;
  }

  .compact-media-upload-box .media-drop-zone,
  .compact-media-upload-box .media-upload-actions,
  .media-upload-selected-panel {
    grid-column: 1 / -1;
    grid-row: auto;
  }
}

@media (max-width: 1280px) {
  .work-grid, .rule-grid, .top-rules { grid-template-columns: 1fr; }
  .hero-card { display: grid; }
  .hero-actions, .amount-rule-inputs, .manager-grid, .manager-inputs.two-cols, .manager-inputs.one-col { grid-template-columns: 1fr; }
  .rule-header, .panel-header, .button-row {
    align-items: stretch;
    flex-direction: column;
  }
}

/* 第 018-2 批：API 串接收合到頂部、規則按鈕置中 */
.api-toggle-pill {
  min-width: 120px;
}

.rule-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.rule-actions-center {
  justify-content: center;
  align-items: center;
  margin: 16px auto 18px;
  padding: 12px;
  border: 1px solid rgba(203, 213, 225, 0.72);
  border-radius: 18px;
  background: rgba(248, 250, 252, 0.86);
}

.rule-actions-center .ghost-btn,
.rule-actions-center .danger-btn {
  min-height: 42px;
  white-space: nowrap;
}

.api-panel-top {
  margin: 0 0 20px;
  grid-template-columns: 1.1fr 1fr auto;
  animation: softSlideDown 0.18s ease-out;
}

.api-panel-top .api-actions {
  justify-content: flex-end;
}

@keyframes softSlideDown {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .rule-actions-center {
    justify-content: flex-start;
  }

  .api-panel-top {
    grid-template-columns: 1fr;
  }

  .api-panel-top .api-actions {
    justify-content: flex-start;
  }
}


/* 第 018-3 批：規則操作按鈕移入常用規則中間 */
.quick-rules-actions {
  justify-content: center;
  align-items: center;
  margin: 14px auto 18px;
  padding: 12px;
  max-width: 760px;
  border: 1px solid rgba(203, 213, 225, 0.72);
  border-radius: 18px;
  background: rgba(248, 250, 252, 0.9);
}

.quick-rules-actions .ghost-btn,
.quick-rules-actions .danger-btn {
  min-height: 42px;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .quick-rules-actions {
    justify-content: flex-start;
    max-width: none;
  }
}


/* 第 018-4 批：上方設定區整合成單一按鈕列 */
.compact-control-card {
  padding: 16px 20px !important;
  margin-bottom: 18px !important;
}

.top-control-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.compact-main-buttons {
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 0 !important;
  flex-wrap: wrap;
}

.compact-main-buttons .summary-pill {
  min-height: 42px;
  padding: 10px 18px;
  font-size: 14px;
}

.compact-control-card > .hero-actions,
.compact-control-card > .compact-control-content,
.compact-control-content {
  margin-top: 16px !important;
}

.compact-control-card .top-rules,
.compact-control-card .quick-rule-section,
.compact-control-card .advanced-section {
  border-radius: 20px;
}

.compact-control-card .quick-rule-header {
  margin-bottom: 8px;
}

.compact-control-card .quick-rule-header h3,
.compact-control-card .advanced-title h3 {
  font-size: 18px;
}

.compact-control-card .quick-rule-header p,
.compact-control-card .advanced-title p {
  font-size: 13px;
}

.compact-control-card .advanced-title {
  margin-bottom: 14px;
}

@media (max-width: 760px) {
  .compact-control-card {
    padding: 14px 12px !important;
  }

  .compact-main-buttons {
    justify-content: flex-start;
  }

  .compact-main-buttons .summary-pill {
    flex: 1 1 calc(50% - 8px);
  }
}


/* 第 018-5 批：上方控制列固定在上方，單一功能展開 */
.compact-control-card {
  display: block !important;
  min-height: auto !important;
}

.top-control-header {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 6px 0 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
}

.compact-main-buttons {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 12px !important;
  width: 100%;
  margin: 0 auto !important;
}

.compact-main-buttons .summary-pill.active {
  color: #ffffff;
  background: linear-gradient(135deg, #2563eb, #0891b2);
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.22);
}

.compact-control-card > .compact-control-content,
.compact-control-card > .hero-actions,
.compact-control-content {
  width: min(1180px, 100%);
  margin: 18px auto 0 !important;
}

.compact-control-card .top-rules {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 320px);
  gap: 20px;
  align-items: start;
}

.compact-control-card .format-grid,
.compact-control-card .format-row,
.compact-control-card .format-options {
  justify-content: center !important;
}

.compact-control-card .format-card,
.compact-control-card .format-options,
.compact-control-card .format-preview,
.compact-control-card .format-setting-row {
  margin-left: auto !important;
  margin-right: auto !important;
}

.api-panel-top {
  width: min(1180px, 100%);
  margin-left: auto !important;
  margin-right: auto !important;
}

.advanced-section.compact-control-content {
  max-height: 70vh;
  overflow: auto;
}

@media (max-width: 900px) {
  .top-control-header {
    position: static;
  }

  .compact-main-buttons {
    justify-content: flex-start !important;
  }

  .compact-control-card .top-rules {
    grid-template-columns: 1fr;
  }
}


/* 第 018-6 批：媒體上傳改上下排列、縮圖與前台卡片小型化 */
.compact-media-upload-box {
  display: grid !important;
  grid-template-columns: minmax(280px, 760px) !important;
  justify-content: start !important;
  align-items: start !important;
  gap: 10px !important;
  padding: 16px !important;
  max-width: 820px !important;
}

.media-upload-title-row {
  grid-column: 1 / -1 !important;
}

.media-upload-main-stack {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.media-lady-select {
  width: 100%;
}

.media-lady-select select,
.media-lady-select option {
  font-family: "Consolas", "Courier New", "Noto Sans Mono CJK TC", monospace;
}

.media-lady-select-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
  font-size: 12px;
  color: #5f6b7a;
}

.media-lady-select-legend span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 700;
}

.media-lady-select-legend .is-current {
  color: #12805c;
}

.media-lady-select-legend .is-existing {
  color: #315ca8;
}

.media-lady-select-legend .is-empty {
  color: #7b8794;
}

.media-inline-row {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 10px;
}

.compact-media-upload-box .media-drop-zone {
  grid-column: auto !important;
  min-height: 132px !important;
  padding: 14px !important;
  align-content: center;
}

.compact-media-upload-box .media-drop-zone input {
  width: 100%;
  max-width: 280px;
}

.compact-media-upload-box .media-upload-actions {
  grid-column: auto !important;
  justify-content: stretch !important;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.media-upload-selected-panel {
  grid-column: auto !important;
  grid-row: auto !important;
  min-height: auto !important;
  max-height: 310px;
  padding: 10px !important;
  overflow: hidden;
}

.selected-media-thumb-grid {
  grid-template-columns: repeat(auto-fill, minmax(82px, 82px)) !important;
  justify-content: start;
  gap: 8px !important;
  max-height: 230px !important;
}

.selected-media-thumb-card {
  width: 82px !important;
  min-height: auto !important;
  border-radius: 12px !important;
}

.selected-media-thumb-card img,
.selected-media-thumb-card video,
.selected-file-fallback {
  width: 82px !important;
  height: 82px !important;
  aspect-ratio: 1 / 1 !important;
  object-fit: cover;
}

.thumb-file-info {
  padding: 5px !important;
}

.thumb-file-info strong {
  font-size: 11px !important;
}

.thumb-file-info span {
  font-size: 10px !important;
}

.selected-media-empty {
  min-height: 88px;
}

/* 前台資料卡縮小成小卡、圖片正方形 */
.lady-card-grid {
  grid-template-columns: repeat(auto-fill, minmax(176px, 176px)) !important;
  justify-content: start;
  gap: 14px !important;
}

.lady-card {
  width: 176px !important;
  max-width: 176px !important;
  padding: 10px !important;
  border-radius: 18px !important;
}

.lady-cover-box {
  aspect-ratio: 1 / 1 !important;
  margin-bottom: 10px !important;
  border-radius: 16px !important;
}

.lady-card-title {
  font-size: 15px !important;
  margin-bottom: 8px !important;
}

.lady-card-title strong {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lady-body-line {
  gap: 5px !important;
  margin-bottom: 8px !important;
}

.lady-body-line span {
  padding: 4px 8px !important;
}

.lady-media-thumbs {
  grid-template-columns: repeat(4, 32px) !important;
  gap: 5px !important;
  margin: 8px 0 !important;
}

.lady-media-thumb {
  width: 32px !important;
  height: 32px !important;
  border-radius: 8px !important;
}

.card-section-title {
  margin-top: 8px !important;
  margin-bottom: 5px !important;
}

.lady-price-list,
.lady-service-list {
  gap: 5px !important;
  margin-top: 6px !important;
}

.price-pill,
.service-pill {
  padding: 5px 8px !important;
  font-size: 13px !important;
}

@media (max-width: 760px) {
  .compact-media-upload-box {
    max-width: none !important;
  }

  .media-inline-row,
  .compact-media-upload-box .media-upload-actions {
    grid-template-columns: 1fr;
  }

  .lady-card-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important;
  }

  .lady-card {
    width: auto !important;
    max-width: none !important;
  }
}



/* 第 018-127 批：前台預覽卡片點擊開啟置中媒體上傳彈窗 */
.media-modal-card-only-layout {
  grid-template-columns: minmax(0, 1fr) !important;
}

.frontend-preview-side-panel.is-full-width-preview {
  width: 100%;
}

.compact-right-lady-card {
  cursor: pointer;
}

.compact-right-lady-card:focus-visible {
  outline: 3px solid rgba(14, 165, 233, 0.65);
  outline-offset: 4px;
}

.lady-card-upload-hint-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 4;
  border-radius: 999px;
  padding: 4px 7px;
  background: rgba(15, 23, 42, 0.72);
  color: #fff;
  font-size: 10px;
  font-weight: 900;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.18);
  pointer-events: none;
}

.media-upload-modal-mask {
  position: fixed;
  inset: 0;
  z-index: 12000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(12px);
}

.media-upload-modal-dialog {
  width: min(680px, calc(100vw - 32px));
  max-height: calc(100vh - 44px);
  overflow: auto;
  border: 1px solid rgba(148, 163, 184, 0.38);
  border-radius: 26px;
  background: linear-gradient(180deg, rgba(248, 250, 252, 0.98), rgba(239, 246, 255, 0.96));
  box-shadow: 0 32px 90px rgba(15, 23, 42, 0.34);
}

.media-upload-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  padding: 20px 22px 14px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.24);
}

.media-upload-modal-header h3 {
  margin: 4px 0 4px;
  color: #0f172a;
  font-size: 22px;
  font-weight: 950;
}

.media-upload-modal-header p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}

.media-upload-modal-kicker {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 4px 9px;
  background: rgba(37, 99, 235, 0.1);
  color: #1d4ed8;
  font-size: 12px;
  font-weight: 950;
}

.media-upload-modal-close {
  border: 1px solid rgba(148, 163, 184, 0.38);
  border-radius: 999px;
  padding: 9px 14px;
  background: rgba(255, 255, 255, 0.88);
  color: #334155;
  font-weight: 900;
  cursor: pointer;
  white-space: nowrap;
}

.modal-media-upload-box {
  margin: 0;
  border: none !important;
  border-radius: 0 0 26px 26px !important;
  background: transparent !important;
  box-shadow: none !important;
}

/* 第 018-130 批：點小姐開上傳彈窗時，同步顯示該小姐已上傳媒體 */
.media-upload-current-panel {
  margin: 0 22px 16px;
  padding: 14px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.current-media-panel-title {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.current-media-panel-title strong {
  display: block;
  color: #0f172a;
  font-size: 15px;
  font-weight: 950;
}

.current-media-panel-title span {
  display: block;
  margin-top: 3px;
  color: #64748b;
  font-size: 13px;
  font-weight: 700;
}

.current-media-panel-title b {
  flex: 0 0 auto;
  border-radius: 999px;
  padding: 6px 10px;
  background: rgba(37, 99, 235, 0.1);
  color: #1d4ed8;
  font-size: 12px;
  font-weight: 950;
}

.current-media-thumb-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(92px, 92px));
  gap: 10px;
  max-height: 230px;
  overflow: auto;
  padding: 2px 2px 4px;
}

.current-media-thumb-card {
  position: relative;
  width: 92px;
  height: 92px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.28);
  background: rgba(241, 245, 249, 0.9);
}

.current-media-open-btn {
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.current-media-open-btn img,
.current-media-open-btn video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.current-media-delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 3;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 999px;
  background: rgba(239, 68, 68, 0.95);
  color: #fff;
  font-size: 15px;
  font-weight: 950;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(239, 68, 68, 0.26);
}

.current-media-type-badge {
  position: absolute;
  left: 6px;
  bottom: 6px;
  z-index: 2;
  border-radius: 999px;
  padding: 4px 7px;
  background: rgba(15, 23, 42, 0.78);
  color: #fff;
  font-size: 11px;
  font-weight: 900;
}

.current-media-empty {
  min-height: 74px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: rgba(248, 250, 252, 0.85);
  color: #64748b;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
}

@media (max-width: 760px) {
  .media-upload-modal-mask {
    align-items: stretch;
    padding: 12px;
  }

  .media-upload-modal-dialog {
    width: 100%;
    max-height: calc(100vh - 24px);
  }

  .media-upload-modal-header {
    flex-direction: column;
  }

  .media-upload-modal-close {
    width: 100%;
  }
}

/* 第 018-7 批：媒體上傳左側、前台預覽右側、支援燈箱與刪除 */
.frontend-media-preview-layout {
  display: grid;
  grid-template-columns: minmax(320px, 820px) minmax(320px, 1fr);
  gap: 18px;
  align-items: start;
}

.frontend-preview-side-panel {
  min-height: 100%;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.78);
  padding: 14px;
  display: grid;
  gap: 12px;
}

.preview-side-topbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 24px;
}

.frontend-inline-status {
  margin: 0;
}

.compact-media-upload-box {
  max-width: none !important;
  width: 100%;
}

.compact-right-lady-grid {
  grid-template-columns: repeat(auto-fill, minmax(154px, 154px)) !important;
  gap: 12px !important;
}

.compact-right-lady-card {
  width: 154px !important;
  max-width: 154px !important;
  padding: 8px !important;
  border-radius: 16px !important;
}

.compact-right-lady-card .lady-cover-box {
  margin-bottom: 8px !important;
}

.compact-right-title {
  font-size: 14px !important;
  margin-bottom: 6px !important;
}

.compact-right-title strong {
  display: block;
  font-size: 14px;
  line-height: 1.3;
  max-height: 36px;
  overflow: hidden;
}

.compact-right-title span {
  font-size: 12px !important;
}

.compact-right-body-line {
  gap: 4px !important;
  margin-bottom: 6px !important;
}

.compact-right-body-line span {
  padding: 4px 6px !important;
  font-size: 11px !important;
}

.compact-right-thumbs {
  grid-template-columns: repeat(4, 28px) !important;
  gap: 4px !important;
}

.lady-media-thumb-wrap {
  position: relative;
  width: 28px;
  height: 28px;
}

.compact-right-thumbs .lady-media-thumb {
  width: 28px !important;
  height: 28px !important;
  border-radius: 7px !important;
}

.compact-right-price-list,
.compact-right-service-list {
  gap: 4px !important;
}

.compact-right-lady-card .price-pill,
.compact-right-lady-card .service-pill {
  padding: 4px 6px !important;
  font-size: 11px !important;
}

.lady-media-open-btn {
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.lady-cover-trigger {
  width: 100%;
  height: 100%;
  display: block;
}

.lady-media-delete-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 2;
  border: none;
  border-radius: 999px;
  background: rgba(239, 68, 68, 0.94);
  color: #fff;
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
  padding: 6px 8px;
  cursor: pointer;
}

.lady-media-delete-btn.mini {
  top: -4px;
  right: -4px;
  min-width: 16px;
  height: 16px;
  padding: 0;
  display: grid;
  place-items: center;
  font-size: 12px;
}

.media-viewer-mask {
  position: fixed;
  inset: 0;
  z-index: 14000;
  background: rgba(15, 23, 42, 0.78);
  display: grid;
  place-items: center;
  padding: 24px;
}

.media-viewer-dialog {
  width: min(920px, 100%);
  max-height: 88vh;
  overflow: auto;
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 32px 80px rgba(15, 23, 42, 0.35);
  padding: 18px;
  position: relative;
  display: grid;
  gap: 14px;
}

.media-viewer-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.88);
  color: #fff;
  font-size: 22px;
  cursor: pointer;
}

.media-viewer-body {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 320px;
  overflow: hidden;
  border-radius: 18px;
  touch-action: pan-y;
}

.media-viewer-counter {
  position: absolute;
  top: 12px;
  left: 14px;
  z-index: 4;
  min-width: 58px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.82);
  color: #fff;
  font-size: 13px;
  font-weight: 900;
  text-align: center;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2);
  backdrop-filter: blur(8px);
}

.media-viewer-nav {
  position: absolute;
  top: 50%;
  z-index: 4;
  width: 48px;
  height: 64px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.72);
  color: #fff;
  font-size: 44px;
  font-weight: 500;
  line-height: 1;
  display: grid;
  place-items: center;
  cursor: pointer;
  transform: translateY(-50%);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.24);
  backdrop-filter: blur(8px);
  transition: transform 0.18s ease, background 0.18s ease, opacity 0.18s ease;
}

.media-viewer-nav:hover {
  background: rgba(37, 99, 235, 0.9);
  transform: translateY(-50%) scale(1.05);
}

.media-viewer-nav:focus-visible {
  outline: 3px solid rgba(96, 165, 250, 0.55);
  outline-offset: 3px;
}

.media-viewer-prev {
  left: 14px;
}

.media-viewer-next {
  right: 14px;
}

.media-viewer-content {
  max-width: 100%;
  max-height: 64vh;
  border-radius: 18px;
  object-fit: contain;
  background: #0f172a;
}

.media-viewer-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.media-viewer-footer strong {
  display: block;
  color: #0f172a;
}

.media-viewer-footer span {
  color: #64748b;
  font-size: 13px;
  font-weight: 700;
}

.media-viewer-lady-label {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 6px 10px;
  background: rgba(241, 245, 249, 0.92);
  color: #334155 !important;
  font-size: 13px;
  font-weight: 900 !important;
}

.media-viewer-hint {
  display: block;
  margin-top: 4px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 700;
}

.media-viewer-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.side-empty-preview {
  min-height: 240px;
}

@media (max-width: 1180px) {
  .frontend-media-preview-layout {
    grid-template-columns: 1fr;
  }

  .compact-right-lady-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 150px)) !important;
  }
}

@media (max-width: 760px) {
  .media-viewer-nav {
    width: 40px;
    height: 54px;
    border-radius: 14px;
    font-size: 36px;
  }

  .media-viewer-prev {
    left: 8px;
  }

  .media-viewer-next {
    right: 8px;
  }

  .media-viewer-counter {
    top: 8px;
    left: 8px;
  }

  .compact-right-lady-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important;
  }

  .compact-right-lady-card {
    width: auto !important;
    max-width: none !important;
  }

  .media-viewer-mask {
    padding: 10px;
  }
}


/* 第 018-8 批：左側上傳縮小、右側小姐預覽放大、待上傳縮圖可點擊放大 */
.frontend-media-preview-layout {
  grid-template-columns: minmax(300px, 560px) minmax(720px, 1fr) !important;
  gap: 16px !important;
  align-items: start !important;
}

.compact-media-upload-box {
  max-width: 560px !important;
  padding: 14px !important;
}

.media-upload-main-stack {
  gap: 9px !important;
}

.compact-media-upload-box .media-drop-zone {
  min-height: 112px !important;
  padding: 12px !important;
}

.compact-media-upload-box .media-upload-actions {
  gap: 8px !important;
}

.central-lady-sync-btn {
  width: 100%;
  min-height: 42px;
}

.media-upload-selected-panel {
  max-height: 300px !important;
  padding: 10px !important;
}

.selected-media-thumb-grid {
  grid-template-columns: repeat(3, minmax(78px, 1fr)) !important;
  gap: 8px !important;
  max-height: 220px !important;
  overflow: auto !important;
}

.selected-media-thumb-card {
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;
}

.selected-media-open-btn {
  width: 100%;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: zoom-in;
  display: block;
  border-radius: 10px;
  overflow: hidden;
}

.selected-media-open-btn img,
.selected-media-open-btn video,
.selected-media-open-btn .selected-file-fallback,
.selected-media-thumb-card img,
.selected-media-thumb-card video,
.selected-file-fallback {
  width: 100% !important;
  height: 78px !important;
  aspect-ratio: 1 / 1 !important;
  object-fit: cover !important;
  border-radius: 10px !important;
}

.thumb-file-info strong {
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.frontend-preview-side-panel {
  width: 100% !important;
  min-width: 0 !important;
  padding: 14px !important;
}

.compact-right-lady-grid {
  grid-template-columns: repeat(auto-fill, minmax(150px, 150px)) !important;
  justify-content: start !important;
  align-items: start !important;
  gap: 12px !important;
}

.compact-right-lady-card {
  width: 150px !important;
  max-width: 150px !important;
  padding: 8px !important;
}

.compact-right-lady-card .lady-cover-box {
  aspect-ratio: 1 / 1 !important;
  height: auto !important;
  margin-bottom: 7px !important;
}

.compact-right-lady-card .lady-cover-media,
.compact-right-lady-card .lady-cover-trigger img,
.compact-right-lady-card .lady-cover-trigger video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

.compact-right-title strong {
  font-size: 13px !important;
  line-height: 1.25 !important;
}

.compact-right-lady-card .price-pill,
.compact-right-lady-card .service-pill {
  font-size: 10.5px !important;
  padding: 4px 6px !important;
}

.compact-right-service-list {
  max-height: 140px;
  overflow: auto;
}

@media (max-width: 1320px) {
  .frontend-media-preview-layout {
    grid-template-columns: minmax(280px, 520px) minmax(560px, 1fr) !important;
  }

  .compact-right-lady-grid {
    grid-template-columns: repeat(auto-fill, minmax(142px, 142px)) !important;
  }

  .compact-right-lady-card {
    width: 142px !important;
    max-width: 142px !important;
  }
}

@media (max-width: 980px) {
  .frontend-media-preview-layout {
    grid-template-columns: 1fr !important;
  }

  .compact-media-upload-box {
    max-width: none !important;
  }

  .compact-right-lady-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important;
  }

  .compact-right-lady-card {
    width: auto !important;
    max-width: none !important;
  }
}


/* 第 018-9 批：待上傳縮圖正方形、小姐資訊卡高度拉長 */
.selected-media-thumb-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(82px, 82px)) !important;
  justify-content: start !important;
  align-items: start !important;
  gap: 8px !important;
}

.selected-media-thumb-card {
  width: 82px !important;
  min-width: 82px !important;
  max-width: 82px !important;
  min-height: 116px !important;
  border-radius: 12px !important;
  overflow: hidden !important;
}

.selected-media-thumb-card img,
.selected-media-thumb-card video,
.selected-file-fallback {
  width: 82px !important;
  height: 82px !important;
  min-height: 82px !important;
  aspect-ratio: 1 / 1 !important;
  object-fit: cover !important;
  border-radius: 10px !important;
  display: block !important;
}

.thumb-file-info {
  height: 34px !important;
  padding: 4px 5px !important;
  overflow: hidden !important;
}

.thumb-file-info strong {
  display: block !important;
  max-width: 72px !important;
  font-size: 10px !important;
  line-height: 1.15 !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.thumb-file-info span {
  display: block !important;
  font-size: 9px !important;
  line-height: 1.15 !important;
}

/* 小姐資訊卡：不是變寬，是把高度拉長 */
.compact-right-lady-card,
.lady-card {
  min-height: 640px !important;
  height: auto !important;
  align-self: stretch !important;
}

/* 讓右邊卡片內容不要變成小小內部捲軸 */
.compact-right-lady-card .lady-service-list,
.lady-card .lady-service-list {
  max-height: none !important;
  overflow: visible !important;
}

/* 若前一批有把服務區做成內部滾動，這批強制取消 */
.compact-right-lady-card .compact-right-service-list,
.compact-right-service-list {
  max-height: none !important;
  overflow: visible !important;
}

/* 右邊小姐卡的封面維持正方形，不拉寬 */
.compact-right-lady-card .lady-cover-box,
.lady-card .lady-cover-box {
  aspect-ratio: 1 / 1 !important;
  height: auto !important;
}

/* 右側卡片網格維持原寬度邏輯，只把卡片拉長 */
.compact-right-lady-grid,
.lady-card-grid {
  align-items: stretch !important;
}

/* 桌機上拉長更多，接近使用者紅框高度 */
@media (min-width: 920px) {
  .compact-right-lady-card,
  .lady-card {
    min-height: 720px !important;
  }
}

@media (max-width: 760px) {
  .selected-media-thumb-grid {
    grid-template-columns: repeat(auto-fill, minmax(74px, 74px)) !important;
  }

  .selected-media-thumb-card {
    width: 74px !important;
    min-width: 74px !important;
    max-width: 74px !important;
    min-height: 108px !important;
  }

  .selected-media-thumb-card img,
  .selected-media-thumb-card video,
  .selected-file-fallback {
    width: 74px !important;
    height: 74px !important;
    min-height: 74px !important;
  }

  .compact-right-lady-card,
  .lady-card {
    min-height: auto !important;
  }
}


/* 第 018-10 批：文件區在上、前台網站預覽在下 */
.work-grid {
  margin-top: 18px !important;
  margin-bottom: 18px !important;
}

.frontend-preview-panel {
  margin-top: 18px !important;
}


/* 第 018-11 批：進階設定內部分頁展開 */
.advanced-inner-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0 14px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.advanced-inner-tabs .summary-pill {
  min-height: 38px;
  padding: 8px 14px;
  font-size: 13px;
}

.advanced-inner-tabs .summary-pill.active {
  color: #ffffff;
  background: linear-gradient(135deg, #2563eb, #0891b2);
  box-shadow: 0 10px 22px rgba(37, 99, 235, 0.22);
}

.advanced-section.compact-control-content {
  padding-top: 14px;
}

.advanced-section.compact-control-content > .advanced-inner-tabs + * {
  margin-top: 0;
}

@media (max-width: 760px) {
  .advanced-inner-tabs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .advanced-inner-tabs .summary-pill {
    width: 100%;
  }
}


/* 第 018-11-1 批：進階分頁內容清理，不再混出重複區塊 */
.advanced-empty-panel {
  padding: 24px;
  border: 1px dashed rgba(148, 163, 184, 0.45);
  border-radius: 18px;
  background: rgba(248, 250, 252, 0.72);
  color: #64748b;
  font-weight: 700;
}

.advanced-panel-clean {
  display: grid;
  gap: 14px;
}

.advanced-panel-clean > label,
.advanced-panel-clean .rule-card,
.full-width-rule-card,
.readonly-note-box {
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.78);
  padding: 16px;
}

.advanced-panel-clean textarea {
  width: 100%;
  min-height: 220px;
  margin-top: 8px;
  resize: vertical;
}

.rule-inline-row {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) minmax(180px, 1fr) auto;
  gap: 10px;
  align-items: center;
  margin-top: 12px;
}

.rule-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.rule-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 999px;
  padding: 7px 10px;
  background: rgba(248, 250, 252, 0.9);
  font-size: 13px;
  font-weight: 800;
}

.rule-chip button {
  border: 0;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: rgba(239, 68, 68, 0.12);
  color: #991b1b;
  font-weight: 900;
  cursor: pointer;
}

.advanced-two-col-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.readonly-note-box {
  color: #334155;
}

.readonly-note-box p {
  margin: 8px 0 0;
  color: #64748b;
  line-height: 1.6;
}

@media (max-width: 860px) {
  .rule-inline-row,
  .advanced-two-col-grid {
    grid-template-columns: 1fr;
  }
}


/* 第 018-16 批：後台資料管理寬版 + 更新時間 */
.admin-section,
.admin-console,
.admin-management-section {
  max-width: min(1540px, calc(100vw - 40px));
  margin-left: auto;
  margin-right: auto;
}

.admin-dashboard-grid,
.admin-panel-grid,
.admin-workspace-grid {
  display: grid;
  grid-template-columns: minmax(320px, 0.78fr) minmax(820px, 1.85fr);
  gap: 18px;
  align-items: start;
}

.admin-create-panel,
.admin-form-panel {
  max-width: 410px;
}

.admin-list-panel,
.admin-manage-panel,
.data-management-panel {
  min-width: 0;
}

.admin-table,
.management-table,
.data-table {
  width: 100%;
  table-layout: fixed;
}

.admin-table td,
.management-table td,
.data-table td {
  vertical-align: top;
}

.admin-updated-time {
  display: block;
  margin-top: 5px;
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.35;
  white-space: nowrap;
}

.admin-action-row,
.action-group,
.table-actions {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
}

.admin-action-row button,
.action-group button,
.table-actions button {
  white-space: nowrap;
}

.price-chip-list,
.plan-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: flex-start;
}

@media (min-width: 1181px) {
  .admin-table th:nth-child(1),
  .admin-table td:nth-child(1),
  .management-table th:nth-child(1),
  .management-table td:nth-child(1),
  .data-table th:nth-child(1),
  .data-table td:nth-child(1) {
    width: 19%;
  }

  .admin-table th:nth-child(2),
  .admin-table td:nth-child(2),
  .management-table th:nth-child(2),
  .management-table td:nth-child(2),
  .data-table th:nth-child(2),
  .data-table td:nth-child(2) {
    width: 10%;
  }

  .admin-table th:nth-child(3),
  .admin-table td:nth-child(3),
  .management-table th:nth-child(3),
  .management-table td:nth-child(3),
  .data-table th:nth-child(3),
  .data-table td:nth-child(3) {
    width: 13%;
  }

  .admin-table th:nth-child(4),
  .admin-table td:nth-child(4),
  .management-table th:nth-child(4),
  .management-table td:nth-child(4),
  .data-table th:nth-child(4),
  .data-table td:nth-child(4) {
    width: 12%;
  }

  .admin-table th:nth-child(5),
  .admin-table td:nth-child(5),
  .management-table th:nth-child(5),
  .management-table td:nth-child(5),
  .data-table th:nth-child(5),
  .data-table td:nth-child(5) {
    width: 9%;
  }

  .admin-table th:nth-child(6),
  .admin-table td:nth-child(6),
  .management-table th:nth-child(6),
  .management-table td:nth-child(6),
  .data-table th:nth-child(6),
  .data-table td:nth-child(6) {
    width: 23%;
  }

  .admin-table th:nth-child(7),
  .admin-table td:nth-child(7),
  .management-table th:nth-child(7),
  .management-table td:nth-child(7),
  .data-table th:nth-child(7),
  .data-table td:nth-child(7) {
    width: 14%;
  }
}

@media (max-width: 1180px) {
  .admin-dashboard-grid,
  .admin-panel-grid,
  .admin-workspace-grid {
    grid-template-columns: 1fr;
  }

  .admin-create-panel,
  .admin-form-panel {
    max-width: none;
  }
}


.scope-rule-card {
  width: 100%;
  margin: 16px 0 0;
  padding: 18px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 22px;
  background: rgba(248, 250, 252, 0.82);
}

.scope-rule-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 14px;
}

.scope-rule-header h3 {
  margin: 0 0 6px;
  font-size: 18px;
}

.scope-rule-header p {
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}

.scope-status-pill {
  flex: 0 0 auto;
  border-radius: 999px;
  padding: 9px 14px;
  font-size: 13px;
  font-weight: 900;
  color: #1d4ed8;
  background: #dbeafe;
  border: 1px solid rgba(37, 99, 235, 0.16);
}

.scope-selector-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}

.scope-selector-grid label {
  display: grid;
  gap: 6px;
  font-size: 13px;
  font-weight: 800;
  color: #475569;
}

.scope-selector-grid input,
.scope-selector-grid select {
  width: 100%;
  min-height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.45);
  background: #fff;
  padding: 0 14px;
  font: inherit;
}

.scope-selector-grid input:disabled {
  opacity: 0.58;
  background: #f1f5f9;
}

.scope-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.scope-help-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
}

.scope-help-grid span {
  border-radius: 999px;
  padding: 8px 12px;
  background: rgba(219, 234, 254, 0.72);
  color: #1e3a8a;
  font-size: 13px;
  font-weight: 800;
}

@media (max-width: 980px) {
  .scope-selector-grid {
    grid-template-columns: 1fr 1fr;
  }

  .scope-rule-header {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .scope-selector-grid {
    grid-template-columns: 1fr;
  }

  .scope-actions {
    display: grid;
    grid-template-columns: 1fr;
  }
}


.scope-manager-card {
  width: 100%;
  margin: 16px 0 0;
  padding: 18px;
  border: 1px solid rgba(37, 99, 235, 0.18);
  border-radius: 22px;
  background: rgba(239, 246, 255, 0.82);
}

.location-manager-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.manager-box {
  min-height: 180px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 18px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.82);
}

.manager-box h4 {
  margin: 0 0 10px;
}

.manager-box select,
.manager-box input {
  width: 100%;
  min-height: 40px;
  margin-bottom: 8px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.42);
  padding: 0 12px;
  font: inherit;
  background: #fff;
}

.manager-input-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: start;
}

.small-btn {
  min-height: 40px;
  padding: 0 14px;
  white-space: nowrap;
}

.manager-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 160px;
  overflow: auto;
}

.manager-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 999px;
  padding: 7px 10px;
  background: #fff;
  color: #0f172a;
  font-weight: 800;
  cursor: pointer;
}

.manager-chip.active {
  color: #fff;
  border-color: transparent;
  background: linear-gradient(135deg, #2f7ee6, #2c9ab7);
}

.manager-chip span {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: rgba(239, 68, 68, 0.16);
  color: #b91c1c;
}

.manager-chip.active span {
  background: rgba(255, 255, 255, 0.24);
  color: #fff;
}

.manager-toggle-pill {
  min-width: 132px;
}

@media (max-width: 1180px) {
  .location-manager-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .location-manager-grid {
    grid-template-columns: 1fr;
  }

  .manager-input-row {
    grid-template-columns: 1fr;
  }
}


.location-select-line {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)) auto;
  gap: 12px;
  align-items: end;
}

.location-select-line label {
  display: grid;
  gap: 6px;
  font-size: 13px;
  font-weight: 800;
  color: #475569;
}

.location-select-line select {
  min-height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.42);
  background: #fff;
  padding: 0 14px;
  font: inherit;
}

.room-daily-status-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
}

.room-daily-status-heading em {
  overflow: hidden;
  color: #64748b;
  font-size: 11px;
  font-style: normal;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.room-daily-current-status {
  display: block;
  overflow: hidden;
  min-height: 16px;
  color: #64748b;
  font-size: 11px;
  font-weight: 800;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.room-daily-current-status.is-complete {
  color: #047857;
}

.room-daily-current-status.is-partial {
  color: #b45309;
}

.room-daily-current-status.is-idle {
  color: #64748b;
}

.manager-crud-toggle {
  min-height: 44px;
  white-space: nowrap;
}

.selected-scope-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 16px;
  background: rgba(219, 234, 254, 0.68);
  color: #475569;
  font-weight: 800;
}

.selected-scope-preview strong {
  color: #1e3a8a;
}

.location-crud-panel {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 14px;
}

.manager-tool-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 1180px) {
  .location-select-line,
  .location-crud-panel {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .manager-crud-toggle {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .location-select-line,
  .location-crud-panel {
    grid-template-columns: 1fr;
  }
}


.room-rule-action-row {
  display: block;
  margin-top: 12px;
  padding: 12px;
  border-radius: 18px;
  background: rgba(248, 250, 252, 0.88);
  border: 1px solid rgba(148, 163, 184, 0.28);
}

.room-rule-topline {
  display: grid;
  grid-template-columns: minmax(300px, auto) auto minmax(360px, 1fr);
  gap: 14px;
  align-items: start;
}

.room-rule-current {
  display: grid;
  gap: 4px;
  color: #475569;
  font-weight: 800;
}

.room-rule-current strong {
  color: #1e3a8a;
}

.room-rule-current span {
  color: #64748b;
  font-size: 13px;
}

.room-rule-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;
}

.room-rule-feedback {
  margin: 0;
  justify-self: end;
  width: min(660px, 100%);
  min-height: 44px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: #eff6ff;
  color: #1e40af;
  font-size: 15px;
  font-weight: 950;
  line-height: 1.45;
  letter-spacing: 0;
  box-shadow: 0 14px 34px rgba(15, 118, 110, 0.1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.room-rule-feedback::before {
  content: '同步狀態';
  flex: 0 0 auto;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  color: #0f766e;
  font-size: 13px;
  font-weight: 950;
  box-shadow: inset 0 0 0 1px rgba(20, 184, 166, 0.16);
}

.room-rule-feedback > span {
  width: 10px;
  height: 10px;
  flex: 0 0 auto;
  border-radius: 999px;
  background: currentColor;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.14), 0 0 18px currentColor;
}

.room-rule-feedback.is-pending {
  background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%);
  border-color: #fbbf24;
  color: #9a3412;
}

.room-rule-feedback.is-success {
  background: linear-gradient(135deg, #ecfdf5 0%, #dcfce7 45%, #eff6ff 100%);
  border-color: rgba(34, 197, 94, 0.5);
  color: #14532d;
  box-shadow: 0 14px 36px rgba(22, 163, 74, 0.16), inset 0 0 0 1px rgba(255, 255, 255, 0.74);
}

.room-rule-feedback.is-warning {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border-color: #f59e0b;
  color: #92400e;
}

.room-rule-feedback.is-error {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border-color: #f87171;
  color: #b91c1c;
}

@media (max-width: 980px) {
  .top-settings-scope-modal .scope-rule-header,
  .room-rule-topline {
    grid-template-columns: 1fr;
  }

  .room-rule-buttons {
    justify-content: flex-start;
  }

  .room-rule-feedback {
    justify-self: stretch;
    width: 100%;
    white-space: normal;
  }
}

@media (max-width: 640px) {
  .room-rule-buttons {
    display: grid;
    grid-template-columns: 1fr;
  }
}


.action-toast {
  position: fixed;
  top: 22px;
  right: 22px;
  z-index: 5000;
  width: min(430px, calc(100vw - 32px));
  display: grid;
  gap: 4px;
  padding: 15px 18px;
  border-radius: 16px;
  border: 1px solid #86efac;
  background: rgba(236, 253, 245, 0.98);
  color: #166534;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.2);
  backdrop-filter: blur(12px);
}

.action-toast strong {
  font-size: 15px;
}

.action-toast span {
  font-size: 13px;
  font-weight: 800;
  line-height: 1.5;
}

.action-toast.is-warning {
  border-color: #fcd34d;
  background: rgba(255, 251, 235, 0.98);
  color: #92400e;
}

.action-toast.is-error {
  border-color: #fca5a5;
  background: rgba(254, 242, 242, 0.98);
  color: #b91c1c;
}

.action-toast-enter-active,
.action-toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.action-toast-enter-from,
.action-toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

.scope-manager-selection-shell {
  display: grid;
  gap: 12px;
  padding: 16px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.24);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
}

.scope-manager-select-grid {
  align-items: end;
}

.scope-manager-preview-bar {
  margin-top: 0;
  min-height: 46px;
}

.scope-manager-preview-head {
  align-self: center;
  min-height: 40px;
  padding: 8px 14px;
  justify-content: center;
}

.scope-manager-action-shell {
  margin-top: 12px;
  padding: 16px 18px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(148, 163, 184, 0.24);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
}

.api-actions-top-row {
  width: 100%;
}

.api-status-box {
  width: 100%;
  min-height: 72px;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(255, 255, 255, 0.72);
  padding: 16px 18px;
  display: flex;
  align-items: center;
}

.api-status-text {
  margin: 0;
  width: 100%;
}

.api-url-wide-row {
  width: 100%;
  display: grid;
  gap: 8px;
}

.api-url-wide-row span {
  font-weight: 800;
  color: #334155;
}

.api-url-wide-row input {
  width: 100%;
}


.option-modal-mask {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(2, 6, 23, 0.62);
  backdrop-filter: blur(8px);
}

.option-modal-card {
  position: relative;
  width: min(1180px, 96vw);
  max-height: 88vh;
  overflow: auto;
  border-radius: 26px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.98));
  box-shadow: 0 30px 90px rgba(2, 6, 23, 0.45);
  color: #e5e7eb;
}

.option-modal-close {
  position: absolute;
  top: 22px;
  right: 24px;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 30px;
  line-height: 1;
  cursor: pointer;
}

.option-modal-head {
  padding: 26px 28px 22px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
}

.option-modal-head h2 {
  margin: 0 0 8px;
  font-size: 28px;
  color: #fff;
}

.option-modal-head p {
  margin: 0 0 12px;
  color: #cbd5e1;
}

.option-sync-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 999px;
  padding: 7px 12px;
  background: rgba(15, 23, 42, 0.7);
  color: #e2e8f0;
  font-weight: 800;
  font-size: 13px;
}

.option-sync-pill i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 5px rgba(34, 197, 94, 0.15);
}

.location-modal-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  padding: 18px;
}

.option-manager-panel {
  min-height: 250px;
  border-radius: 20px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(30, 41, 59, 0.78);
  padding: 16px;
}

.option-manager-panel h3 {
  margin: 0 0 14px;
  color: #fff;
  font-size: 18px;
}

.option-manager-panel input,
.option-manager-panel select {
  width: 100%;
  min-height: 42px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  background: rgba(15, 23, 42, 0.78);
  color: #fff;
  padding: 0 12px;
  font: inherit;
  margin-bottom: 10px;
}

.option-manager-panel input::placeholder {
  color: #94a3b8;
}

.option-inline-input {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
}

.option-inline-input button,
.option-action-row button {
  min-height: 40px;
  border: 0;
  border-radius: 999px;
  padding: 0 14px;
  background: linear-gradient(135deg, #2f7ee6, #2c9ab7);
  color: #fff;
  font-weight: 900;
  cursor: pointer;
}

.option-inline-input button:disabled,
.option-action-row button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.option-current-text {
  margin: 10px 0;
  color: #bfdbfe;
  font-weight: 800;
  line-height: 1.5;
}

.option-action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.option-action-row .danger-mini {
  background: rgba(244, 63, 94, 0.28);
  color: #fecdd3;
  border: 1px solid rgba(251, 113, 133, 0.32);
}

.location-modal-bottom {
  display: flex;
  justify-content: flex-end;
  padding: 18px 28px 26px;
  border-top: 1px solid rgba(148, 163, 184, 0.18);
}

.location-modal-bottom .restore-btn {
  border: 0;
  border-radius: 999px;
  padding: 14px 28px;
  font-weight: 900;
  color: #fff;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  box-shadow: 0 18px 35px rgba(139, 92, 246, 0.24);
}

@media (max-width: 1180px) {
  .location-modal-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .location-modal-grid {
    grid-template-columns: 1fr;
  }

  .option-inline-input {
    grid-template-columns: 1fr;
  }
}


.modal-inline-label {
  display: grid;
  gap: 6px;
  margin: 10px 0 8px;
  color: #cbd5e1;
  font-weight: 800;
  font-size: 13px;
}

.location-modal-grid-room-first .option-manager-panel:first-child {
  border-color: rgba(59, 130, 246, 0.32);
  background: rgba(30, 41, 59, 0.9);
}


.modal-select-label {
  margin-top: 0;
}


.location-modal-grid-room-first {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 980px) {
  .location-modal-grid-room-first {
    grid-template-columns: 1fr;
  }
}


.modal-button-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 168px;
  overflow: auto;
  padding: 4px 2px 8px;
}

.modal-select-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 999px;
  padding: 0 12px;
  background: rgba(15, 23, 42, 0.72);
  color: #e2e8f0;
  font-weight: 900;
  cursor: pointer;
}

.modal-select-button.active {
  border-color: rgba(56, 189, 248, 0.45);
  background: linear-gradient(135deg, #2f7ee6, #2c9ab7);
  color: #fff;
  box-shadow: 0 10px 22px rgba(56, 189, 248, 0.16);
}

.modal-select-button span {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: rgba(244, 63, 94, 0.24);
  color: #fecdd3;
  font-size: 13px;
  line-height: 1;
}

.district-selected-city-note {
  margin: 0 0 10px;
  color: #cbd5e1;
  font-weight: 800;
}

.district-selected-city-note strong {
  color: #bfdbfe;
}

.district-empty-note {
  min-height: 42px;
  border-radius: 14px;
  padding: 11px 12px;
  margin-bottom: 10px;
  background: rgba(15, 23, 42, 0.5);
  color: #94a3b8;
  font-weight: 800;
}

.city-button-list {
  margin-bottom: 8px;
}

.district-button-list {
  margin-bottom: 12px;
}


.city-button-list,
.district-button-list {
  max-height: 210px;
}

.location-modal-grid-room-first .option-manager-panel {
  min-height: 330px;
}


/* 第 018-90 批：管理清單彈窗上下高度拉長，貼近紅框大視窗範圍 */
.location-manager-modal-card.option-modal-card {
  width: min(1280px, calc(100vw - 96px));
  height: min(78vh, 760px);
  max-height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.location-manager-modal-card .option-modal-head {
  flex: 0 0 auto;
}

.location-manager-modal-card .location-modal-grid {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  align-items: stretch;
}

.location-manager-modal-card .location-modal-bottom {
  flex: 0 0 auto;
}

.location-manager-modal-card .option-manager-panel {
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.location-manager-modal-card .modal-inline-label {
  flex: 0 0 auto;
}

.location-manager-modal-card .city-button-list,
.location-manager-modal-card .district-button-list {
  flex: 1 1 auto;
  min-height: 180px;
  max-height: none;
  align-content: flex-start;
}

@media (max-width: 980px) {
  .location-manager-modal-card.option-modal-card {
    width: calc(100vw - 32px);
    height: min(84vh, 760px);
    max-height: calc(100vh - 36px);
  }
}

@media (max-width: 640px) {
  .location-manager-modal-card.option-modal-card {
    width: calc(100vw - 18px);
    height: calc(100vh - 26px);
    max-height: calc(100vh - 26px);
  }
}


.drag-sort-button {
  cursor: grab;
  user-select: none;
}

.drag-sort-button:active {
  cursor: grabbing;
}

.drag-sort-button.dragging {
  opacity: 0.48;
  transform: scale(0.96);
}

.drag-handle {
  width: auto;
  height: auto;
  background: transparent !important;
  color: inherit !important;
  opacity: 0.65;
  font-weight: 900;
  letter-spacing: -3px;
  pointer-events: none;
}

.modal-select-button .delete-chip {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: rgba(244, 63, 94, 0.24);
  color: #fecdd3;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
}


.online-ready-hint {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 8px 12px;
  margin-top: 8px !important;
  background: rgba(219, 234, 254, 0.72);
  color: #1e3a8a !important;
  font-weight: 900;
  font-size: 13px;
}


.backup-settings-card {
  width: 100%;
  margin-top: 14px;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: rgba(248, 250, 252, 0.76);
}

.backup-settings-card h3 {
  margin: 0 0 6px;
  font-size: 18px;
}

.backup-settings-card p {
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}

.backup-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}


.visually-hidden-file-input {
  position: fixed;
  left: -9999px;
  top: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.backup-key-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.backup-key-list span {
  border-radius: 999px;
  padding: 7px 11px;
  background: rgba(219, 234, 254, 0.82);
  color: #1e3a8a;
  font-size: 13px;
  font-weight: 900;
}


.api-clean-panel {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 16px !important;
  width: min(1180px, calc(100% - 32px)) !important;
  margin: 24px auto !important;
  padding: 24px !important;
  align-items: stretch !important;
}

.api-clean-header {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: 18px;
  align-items: stretch;
}

.api-clean-header h2 {
  margin: 0 0 8px;
}

.api-clean-header p {
  margin: 0 0 8px;
}

.api-clean-panel .api-status-box {
  width: 100%;
  min-height: 92px;
  align-self: stretch;
  margin: 0;
}

.api-clean-url-row {
  width: 100%;
  margin: 0;
}

.api-clean-url-row input {
  min-height: 54px;
  font-size: 16px;
}

.api-clean-action-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.api-action-card {
  border-radius: 22px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: rgba(248, 250, 252, 0.76);
  padding: 18px;
}

.api-action-card h3 {
  margin: 0 0 12px;
  font-size: 18px;
  color: #0f172a;
}

.api-action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.api-clean-backup-card {
  margin-top: 0 !important;
}

.api-clean-backup-card .backup-actions {
  justify-content: flex-start;
}

@media (max-width: 900px) {
  .api-clean-header,
  .api-clean-action-grid {
    grid-template-columns: 1fr;
  }

  .api-clean-panel {
    width: calc(100% - 16px) !important;
    padding: 18px !important;
  }
}


.owner-employee-card {
  margin: 0 auto 18px;
  padding: 18px;
  border-radius: 24px;
  border: 1px solid rgba(37, 99, 235, 0.18);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(239, 246, 255, 0.9));
  box-shadow: 0 18px 44px rgba(31, 74, 128, 0.08);
}

.owner-employee-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 14px;
}

.owner-employee-header h3 {
  margin: 0 0 6px;
  color: #142033;
  font-size: 18px;
}

.owner-employee-header p {
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}

.owner-employee-form {
  display: grid;
  grid-template-columns: minmax(160px, 0.8fr) minmax(220px, 1fr) minmax(180px, 0.8fr) auto;
  gap: 12px;
  align-items: end;
}

.owner-employee-form label {
  display: grid;
  gap: 7px;
  color: #1f2a3d;
  font-weight: 900;
}

.owner-employee-form input {
  min-height: 46px;
  border-radius: 16px;
  border: 1px solid #cbd7e6;
  padding: 0 14px;
  font-size: 15px;
  outline: none;
  background: #fff;
}

.employee-manage-status {
  margin: 12px 0 0;
  color: #64748b;
  font-weight: 900;
}

.employee-manage-status.error {
  color: #be123c;
}

.employee-manage-status.ok {
  color: #15803d;
}

.employee-list-card {
  margin-top: 14px;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: rgba(255, 255, 255, 0.72);
  overflow: hidden;
}

.employee-list-title,
.employee-empty-row,
.employee-row {
  padding: 12px 14px;
}

.employee-list-title {
  font-weight: 950;
  color: #1e3a8a;
  background: rgba(219, 234, 254, 0.72);
}

.employee-empty-row {
  color: #64748b;
  font-weight: 800;
}

.employee-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-top: 1px solid rgba(148, 163, 184, 0.18);
}

.employee-row div {
  display: grid;
  gap: 3px;
}

.employee-row-side {
  display: flex !important;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.employee-row-actions {
  display: flex !important;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.employee-edit-panel {
  width: 100%;
  display: grid !important;
  grid-template-columns: minmax(160px, 1fr) minmax(220px, 1.4fr) minmax(180px, 1fr) auto;
  align-items: end;
  gap: 12px;
}

.employee-edit-panel label {
  display: grid;
  gap: 6px;
  color: #0f172a;
  font-weight: 900;
}

.employee-edit-panel input {
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.45);
  border-radius: 14px;
  padding: 11px 13px;
  font: inherit;
  font-weight: 800;
  outline: none;
  background: rgba(255, 255, 255, 0.92);
}

.small-action-btn {
  min-height: 38px;
  padding: 9px 14px;
  white-space: nowrap;
}

.employee-row strong {
  color: #0f172a;
}

.employee-row span {
  color: #64748b;
  font-weight: 800;
}

.employee-row em {
  font-style: normal;
  font-weight: 950;
  color: #1d4ed8;
  background: #dbeafe;
  border-radius: 999px;
  padding: 6px 10px;
}

.employee-row em.owner {
  color: #9f1239;
  background: #ffe4e6;
}

@media (max-width: 980px) {
  .owner-employee-form {
    grid-template-columns: 1fr;
  }

  .owner-employee-header {
    flex-direction: column;
  }
}


.staff-profile-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin: 14px auto 18px;
  padding: 16px 18px;
  border: 1px solid rgba(129, 158, 202, 0.24);
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(235, 245, 255, 0.9));
  box-shadow: 0 18px 42px rgba(31, 74, 128, 0.08);
}

.staff-profile-copy h3 {
  margin: 0 0 6px;
  color: #142033;
  font-size: 18px;
}

.staff-profile-copy p {
  margin: 0;
  color: #65758a;
  line-height: 1.6;
}

.staff-profile-copy strong {
  color: #1e5da8;
}

.staff-profile-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.staff-profile-actions input {
  width: min(280px, 52vw);
  min-height: 42px;
  border-radius: 16px;
  border: 1px solid #cdd8e7;
  padding: 0 14px;
  font-weight: 700;
  outline: none;
  background: #ffffff;
}

@media (max-width: 760px) {
  .staff-profile-card {
    align-items: stretch;
    flex-direction: column;
  }

  .staff-profile-actions {
    justify-content: flex-start;
  }

  .staff-profile-actions input {
    width: 100%;
  }
}


.login-page-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 28px;
  background: radial-gradient(circle at top left, rgba(60, 129, 246, 0.16), transparent 34%), #f6f9fd;
}

.login-card {
  width: min(520px, 100%);
  border: 1px solid rgba(129, 158, 202, 0.32);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.12);
  padding: 30px;
}

.login-brand {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  background: #eaf3ff;
  color: #1e5da8;
  font-weight: 900;
  margin-bottom: 16px;
}

.login-card h1 {
  margin: 0 0 10px;
  color: #101827;
  font-size: 28px;
}

.login-card p {
  margin: 0 0 18px;
  color: #64748b;
  line-height: 1.7;
}

.login-form {
  display: grid;
  gap: 14px;
}

.login-form label {
  display: grid;
  gap: 8px;
  color: #1f2a3d;
  font-weight: 900;
}

.login-form input {
  min-height: 52px;
  border-radius: 16px;
  border: 1px solid #cbd7e6;
  padding: 0 14px;
  font-size: 16px;
  outline: none;
}

.login-submit {
  min-height: 52px;
  justify-content: center;
}

.login-warning {
  border-radius: 16px;
  background: #fff1f2;
  color: #9f1239;
  padding: 12px 14px;
  font-weight: 800;
  margin: 14px 0;
}

.login-status {
  margin-top: 16px !important;
  font-weight: 800;
}

.login-status.error {
  color: #be123c;
}

.login-status.ok {
  color: #15803d;
}



/* batch018-62：強制放大左側登入資訊卡，功能按鈕貼近右側 */
.top-control-header {
  display: grid !important;
  grid-template-columns: minmax(520px, 620px) minmax(0, 1fr) !important;
  align-items: start !important;
  gap: 28px !important;
  width: 100% !important;
}

.top-staff-profile-card {
  width: 100% !important;
  max-width: 620px !important;
  min-width: 520px !important;
  flex: none !important;
  justify-self: start !important;
}

.top-staff-profile-card .staff-profile-copy p:last-child {
  max-width: 480px !important;
}

.compact-main-buttons {
  width: 100% !important;
  max-width: none !important;
  justify-content: flex-end !important;
  justify-self: end !important;
  margin-left: 0 !important;
  padding-right: 8px !important;
  padding-top: 6px !important;
}

@media (min-width: 1600px) {
  .top-control-header {
    grid-template-columns: minmax(600px, 720px) minmax(0, 1fr) !important;
  }

  .top-staff-profile-card {
    max-width: 720px !important;
    min-width: 600px !important;
  }

  .top-staff-profile-card .staff-profile-copy p:last-child {
    max-width: 560px !important;
  }

  .compact-main-buttons {
    padding-right: 18px !important;
  }
}

@media (max-width: 1180px) {
  .top-control-header {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: flex-start !important;
  }

  .top-staff-profile-card {
    min-width: 0 !important;
    max-width: none !important;
    width: 100% !important;
  }

  .compact-main-buttons {
    justify-content: flex-start !important;
    padding-right: 0 !important;
  }
}

@media (max-width: 980px) {
  .employee-edit-panel {
    grid-template-columns: 1fr;
  }

  .employee-row-side,
  .employee-row-actions {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}

/* batch018-60：公版縣市地區預設顯示，員工刪除只隱藏個人清單 */
.top-control-header {
  justify-content: center !important;
  align-items: flex-start !important;
  gap: 16px !important;
  flex-wrap: wrap !important;
}

.top-staff-profile-card {
  flex: 0 1 360px;
  margin: 0 !important;
  padding: 10px 14px !important;
  min-height: 52px;
  align-self: stretch;
}

.top-staff-profile-card .staff-profile-copy h3 {
  font-size: 15px;
  margin-bottom: 2px;
}

.top-staff-profile-card .staff-profile-copy p {
  font-size: 13px;
  line-height: 1.45;
}

.top-staff-profile-card .staff-profile-copy p:last-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 310px;
}

.compact-staff-actions {
  gap: 6px;
}

.compact-staff-actions .ghost-btn,
.compact-staff-actions .danger-btn {
  min-height: 34px;
  padding: 7px 10px;
  font-size: 12px;
}

.account-manager-toggle-pill.active {
  color: #ffffff;
  background: linear-gradient(135deg, #7c3aed, #0891b2);
  box-shadow: 0 12px 24px rgba(124, 58, 237, 0.22);
}

@media (max-width: 1100px) {
  .top-control-header {
    justify-content: flex-start !important;
  }

  .top-staff-profile-card {
    flex: 1 1 100%;
  }

  .top-staff-profile-card .staff-profile-copy p:last-child {
    max-width: none;
  }
}

@media (max-width: 760px) {
  .top-staff-profile-card {
    width: 100%;
  }

  .top-staff-profile-card .staff-profile-copy p:last-child {
    white-space: normal;
  }
}

/* batch018-61：登入資訊卡加寬，主功能按鈕靠右 */
.top-control-header {
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 18px !important;
  flex-wrap: nowrap !important;
}

.top-staff-profile-card {
  flex: 0 0 430px !important;
  max-width: 430px !important;
}

.top-staff-profile-card .staff-profile-copy p:last-child {
  max-width: 360px !important;
}

.compact-main-buttons {
  flex: 1 1 auto !important;
  width: auto !important;
  justify-content: flex-end !important;
  margin-left: auto !important;
  padding-right: 18px !important;
}

@media (min-width: 1500px) {
  .top-staff-profile-card {
    flex-basis: 460px !important;
    max-width: 460px !important;
  }

  .top-staff-profile-card .staff-profile-copy p:last-child {
    max-width: 390px !important;
  }

  .compact-main-buttons {
    padding-right: 34px !important;
  }
}

@media (max-width: 1100px) {
  .top-control-header {
    flex-wrap: wrap !important;
    justify-content: flex-start !important;
  }

  .top-staff-profile-card {
    flex: 1 1 100% !important;
    max-width: none !important;
  }

  .compact-main-buttons {
    width: 100% !important;
    justify-content: flex-start !important;
    margin-left: 0 !important;
    padding-right: 0 !important;
  }
}


/* 第 018-82 批：媒體燈箱左右箭頭、循環切換、張數指示、鍵盤方向鍵、Esc 關閉與手機滑動。 */


/* 第 018-91 批：管理清單彈窗完整資訊不使用捲動版 */
.location-manager-modal-card.option-modal-card {
  box-sizing: border-box;
  width: min(1120px, calc(100vw - 96px)) !important;
  max-width: min(1120px, calc(100vw - 96px)) !important;
  height: auto !important;
  max-height: none !important;
  display: block !important;
  overflow: visible !important;
  border-radius: 24px;
}

.location-manager-modal-card .option-modal-close {
  top: 16px;
  right: 18px;
}

.location-manager-modal-card .option-modal-head {
  padding: 22px 24px 16px;
}

.location-manager-modal-card .option-modal-head h2 {
  font-size: 24px;
  margin-bottom: 6px;
}

.location-manager-modal-card .option-modal-head p {
  font-size: 14px;
  line-height: 1.45;
  margin-bottom: 10px;
}

.location-manager-modal-card .location-modal-grid,
.location-manager-modal-card .location-modal-grid.location-modal-grid-room-first {
  box-sizing: border-box;
  display: grid !important;
  grid-template-columns: 1fr 1.05fr 1fr !important;
  gap: 12px !important;
  padding: 14px !important;
  overflow: visible !important;
  min-height: 0 !important;
  align-items: stretch;
}

.location-manager-modal-card .option-manager-panel {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0 !important;
  height: auto !important;
  padding: 14px !important;
  display: block !important;
  border-radius: 18px;
}

.location-manager-modal-card .option-manager-panel h3 {
  font-size: 16px;
  margin-bottom: 10px;
}

.location-manager-modal-card .modal-inline-label {
  margin: 6px 0 6px;
  font-size: 12px;
}

.location-manager-modal-card .option-manager-panel input,
.location-manager-modal-card .option-manager-panel select {
  min-height: 38px;
  margin-bottom: 8px;
  border-radius: 11px;
  font-size: 14px;
}

.location-manager-modal-card .option-inline-input {
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px;
}

.location-manager-modal-card .option-inline-input button,
.location-manager-modal-card .option-action-row button {
  min-height: 36px;
  padding: 0 12px;
  font-size: 13px;
}

.location-manager-modal-card .option-current-text,
.location-manager-modal-card .district-selected-city-note,
.location-manager-modal-card .district-empty-note {
  margin: 6px 0 8px;
  font-size: 13px;
  line-height: 1.35;
}

.location-manager-modal-card .modal-button-list,
.location-manager-modal-card .city-button-list,
.location-manager-modal-card .district-button-list {
  max-height: none !important;
  min-height: 0 !important;
  overflow: visible !important;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 6px;
  padding: 2px 0 6px;
}

.location-manager-modal-card .modal-select-button {
  min-height: 30px;
  padding: 0 10px;
  font-size: 12px;
  gap: 6px;
}

.location-manager-modal-card .drag-handle,
.location-manager-modal-card .modal-select-button span {
  width: 16px;
  height: 16px;
  font-size: 11px;
}

.location-manager-modal-card .location-modal-bottom {
  padding: 12px 24px 20px;
}

.location-manager-modal-card .location-modal-bottom .restore-btn {
  padding: 12px 22px;
  font-size: 14px;
}

@media (max-width: 1180px) {
  .location-manager-modal-card.option-modal-card {
    width: calc(100vw - 48px) !important;
    max-width: calc(100vw - 48px) !important;
  }
}

@media (max-width: 920px) {
  .location-manager-modal-card .location-modal-grid,
  .location-manager-modal-card .location-modal-grid.location-modal-grid-room-first {
    grid-template-columns: 1fr !important;
  }
}

@media (max-height: 760px) and (min-width: 921px) {
  .location-manager-modal-card.option-modal-card {
    transform: scale(0.92);
    transform-origin: center center;
  }
}

@media (max-height: 680px) and (min-width: 921px) {
  .location-manager-modal-card.option-modal-card {
    transform: scale(0.84);
  }
}

/* 第 018-92 批：修正前幾批 CSS 放在 style 結束標籤後面未生效，並讓管理清單在視窗內完整顯示不產生捲動條 */
.top-settings-scope-modal .option-modal-mask,
.option-modal-mask:has(.location-manager-modal-card) {
  padding: 18px !important;
  overflow: hidden !important;
  place-items: center !important;
}

.location-manager-modal-card.option-modal-card {
  box-sizing: border-box !important;
  width: min(1180px, calc(100vw - 44px)) !important;
  max-width: min(1180px, calc(100vw - 44px)) !important;
  height: auto !important;
  max-height: calc(100vh - 44px) !important;
  overflow: hidden !important;
  display: grid !important;
  grid-template-rows: auto minmax(0, 1fr) auto !important;
  border-radius: 22px !important;
}

.location-manager-modal-card .option-modal-close {
  top: 14px !important;
  right: 16px !important;
}

.location-manager-modal-card .option-modal-head {
  padding: 18px 22px 12px !important;
}

.location-manager-modal-card .option-modal-head h2 {
  font-size: 22px !important;
  line-height: 1.2 !important;
  margin: 0 0 5px !important;
}

.location-manager-modal-card .option-modal-head p {
  font-size: 13px !important;
  line-height: 1.35 !important;
  margin: 0 0 8px !important;
}

.location-manager-modal-card .option-sync-pill {
  padding: 5px 10px !important;
  font-size: 12px !important;
}

.location-manager-modal-card .location-modal-grid,
.location-manager-modal-card .location-modal-grid.location-modal-grid-room-first {
  box-sizing: border-box !important;
  display: grid !important;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr) minmax(0, 0.95fr) !important;
  gap: 10px !important;
  padding: 10px 12px !important;
  min-height: 0 !important;
  max-height: none !important;
  overflow: hidden !important;
  align-items: stretch !important;
}

.location-manager-modal-card .option-manager-panel {
  box-sizing: border-box !important;
  min-width: 0 !important;
  min-height: 0 !important;
  height: auto !important;
  padding: 11px !important;
  border-radius: 16px !important;
  overflow: hidden !important;
  display: block !important;
}

.location-manager-modal-card .option-manager-panel h3 {
  font-size: 15px !important;
  margin: 0 0 8px !important;
}

.location-manager-modal-card .modal-inline-label {
  margin: 4px 0 5px !important;
  font-size: 11px !important;
  line-height: 1.25 !important;
}

.location-manager-modal-card .option-manager-panel input,
.location-manager-modal-card .option-manager-panel select {
  min-height: 32px !important;
  height: 32px !important;
  margin-bottom: 6px !important;
  border-radius: 10px !important;
  font-size: 13px !important;
  padding: 0 10px !important;
}

.location-manager-modal-card .option-inline-input {
  grid-template-columns: minmax(0, 1fr) auto !important;
  gap: 6px !important;
}

.location-manager-modal-card .option-inline-input button,
.location-manager-modal-card .option-action-row button {
  min-height: 32px !important;
  padding: 0 10px !important;
  font-size: 12px !important;
}

.location-manager-modal-card .option-action-row {
  gap: 6px !important;
  flex-wrap: wrap !important;
}

.location-manager-modal-card .option-current-text,
.location-manager-modal-card .district-selected-city-note,
.location-manager-modal-card .district-empty-note {
  margin: 5px 0 6px !important;
  font-size: 12px !important;
  line-height: 1.3 !important;
  min-height: 0 !important;
}

.location-manager-modal-card .modal-button-list,
.location-manager-modal-card .city-button-list,
.location-manager-modal-card .district-button-list {
  box-sizing: border-box !important;
  max-height: none !important;
  min-height: 0 !important;
  overflow: visible !important;
  display: flex !important;
  flex-wrap: wrap !important;
  align-content: flex-start !important;
  gap: 5px !important;
  padding: 1px 0 5px !important;
  margin-bottom: 5px !important;
}

.location-manager-modal-card .modal-select-button {
  min-height: 26px !important;
  padding: 0 8px !important;
  font-size: 11px !important;
  gap: 5px !important;
  white-space: nowrap !important;
}

.location-manager-modal-card .drag-handle,
.location-manager-modal-card .modal-select-button span {
  width: 14px !important;
  height: 14px !important;
  font-size: 10px !important;
}

.location-manager-modal-card .location-modal-bottom {
  padding: 8px 22px 14px !important;
  font-size: 12px !important;
  line-height: 1.3 !important;
}

.location-manager-modal-card .location-modal-bottom .restore-btn {
  padding: 9px 18px !important;
  font-size: 13px !important;
}

@media (max-width: 1180px) {
  .location-manager-modal-card.option-modal-card {
    width: calc(100vw - 28px) !important;
    max-width: calc(100vw - 28px) !important;
    max-height: calc(100vh - 28px) !important;
  }

  .location-manager-modal-card .location-modal-grid,
  .location-manager-modal-card .location-modal-grid.location-modal-grid-room-first {
    gap: 8px !important;
    padding: 8px !important;
  }

  .location-manager-modal-card .option-manager-panel {
    padding: 9px !important;
  }

  .location-manager-modal-card .modal-select-button {
    min-height: 24px !important;
    padding: 0 7px !important;
    font-size: 10.5px !important;
  }
}

@media (max-width: 920px) {
  .location-manager-modal-card.option-modal-card {
    max-height: calc(100vh - 20px) !important;
  }

  .location-manager-modal-card .location-modal-grid,
  .location-manager-modal-card .location-modal-grid.location-modal-grid-room-first {
    grid-template-columns: 1fr !important;
  }
}



/* 第 018-93 批：管理清單字體放大，彈窗上下加高置中顯示 */
/* 第 018-94 批：修正 018-93 誤把 grid 置中的管理清單套用 translate，造成畫面往左上偏移裁切 */
.location-manager-modal-card.option-modal-card {
  width: min(1180px, calc(100vw - 44px)) !important;
  height: min(86vh, 820px) !important;
  min-height: min(760px, calc(100vh - 44px)) !important;
  max-height: calc(100vh - 28px) !important;
  transform: none !important;
  overflow: hidden !important;
}

.location-manager-modal-card .option-modal-head {
  padding: 22px 26px 15px !important;
}

.location-manager-modal-card .option-modal-head h2 {
  font-size: 28px !important;
  line-height: 1.18 !important;
  letter-spacing: 0.02em !important;
}

.location-manager-modal-card .option-modal-head p {
  font-size: 15px !important;
  line-height: 1.55 !important;
}

.location-manager-modal-card .option-sync-pill {
  padding: 7px 12px !important;
  font-size: 13px !important;
}

.location-manager-modal-card .location-modal-grid,
.location-manager-modal-card .location-modal-grid.location-modal-grid-room-first {
  height: 100% !important;
  padding: 14px 16px !important;
  gap: 12px !important;
  align-items: stretch !important;
}

.location-manager-modal-card .option-manager-panel {
  padding: 15px !important;
  border-radius: 18px !important;
}

.location-manager-modal-card .option-manager-panel h3 {
  font-size: 18px !important;
  line-height: 1.25 !important;
  margin-bottom: 11px !important;
}

.location-manager-modal-card .modal-inline-label {
  font-size: 13px !important;
  line-height: 1.35 !important;
  margin: 6px 0 7px !important;
}

.location-manager-modal-card .option-manager-panel input,
.location-manager-modal-card .option-manager-panel select {
  min-height: 38px !important;
  height: 38px !important;
  font-size: 15px !important;
  padding: 0 12px !important;
  border-radius: 12px !important;
}

.location-manager-modal-card .option-inline-input button,
.location-manager-modal-card .option-action-row button {
  min-height: 38px !important;
  padding: 0 13px !important;
  font-size: 13px !important;
}

.location-manager-modal-card .option-current-text,
.location-manager-modal-card .district-selected-city-note,
.location-manager-modal-card .district-empty-note {
  font-size: 14px !important;
  line-height: 1.45 !important;
  margin: 8px 0 !important;
}

.location-manager-modal-card .modal-button-list,
.location-manager-modal-card .city-button-list,
.location-manager-modal-card .district-button-list {
  gap: 7px !important;
  margin-bottom: 8px !important;
}

.location-manager-modal-card .modal-select-button {
  min-height: 30px !important;
  padding: 0 10px !important;
  font-size: 12.5px !important;
  border-radius: 999px !important;
}

.location-manager-modal-card .drag-handle,
.location-manager-modal-card .modal-select-button span {
  width: 16px !important;
  height: 16px !important;
  font-size: 11px !important;
}

.location-manager-modal-card .location-modal-bottom {
  padding: 12px 26px 18px !important;
  font-size: 14px !important;
  line-height: 1.45 !important;
}

.location-manager-modal-card .location-modal-bottom .restore-btn {
  padding: 11px 22px !important;
  font-size: 14px !important;
}

.location-manager-modal-card .option-modal-close {
  top: 16px !important;
  right: 18px !important;
  font-size: 30px !important;
  line-height: 1 !important;
}

@media (max-height: 900px) and (min-width: 921px) {
  .location-manager-modal-card.option-modal-card {
    height: calc(100vh - 34px) !important;
    min-height: calc(100vh - 34px) !important;
    transform: none !important;
  }
}

@media (max-height: 720px) and (min-width: 921px) {
  .location-manager-modal-card.option-modal-card {
    height: calc(100vh - 22px) !important;
    min-height: calc(100vh - 22px) !important;
  }

  .location-manager-modal-card .option-modal-head h2 {
    font-size: 24px !important;
  }

  .location-manager-modal-card .option-modal-head p {
    font-size: 13.5px !important;
  }

  .location-manager-modal-card .option-manager-panel h3 {
    font-size: 16px !important;
  }

  .location-manager-modal-card .option-manager-panel input,
  .location-manager-modal-card .option-manager-panel select {
    min-height: 34px !important;
    height: 34px !important;
  }
}


/* 第 018-94 批：管理清單彈窗置中修正版。option-modal-card 由遮罩 grid 置中，不能再套用 translate。 */
.option-modal-mask .location-manager-modal-card.option-modal-card {
  position: relative !important;
  left: auto !important;
  top: auto !important;
  margin: 0 auto !important;
  transform: none !important;
  justify-self: center !important;
  align-self: center !important;
  max-width: min(1180px, calc(100vw - 44px)) !important;
  width: min(1180px, calc(100vw - 44px)) !important;
  height: min(86vh, 820px) !important;
  min-height: min(760px, calc(100vh - 44px)) !important;
}

@media (max-height: 760px) {
  .option-modal-mask .location-manager-modal-card.option-modal-card {
    height: calc(100vh - 28px) !important;
    min-height: calc(100vh - 28px) !important;
  }
}

@media (max-width: 920px) {
  .option-modal-mask .location-manager-modal-card.option-modal-card {
    width: calc(100vw - 24px) !important;
    max-width: calc(100vw - 24px) !important;
    min-height: 0 !important;
    height: auto !important;
    max-height: calc(100vh - 24px) !important;
    overflow: auto !important;
  }
}



/* 第 018-95 批：修正管理清單彈窗加高後 footer 被 grid 擠出，並讓整個彈窗真正往上往下拉長 */
.option-modal-mask:has(.location-manager-modal-card),
.location-manager-overlay,
.top-settings-scope-modal .option-modal-mask:has(.location-manager-modal-card) {
  position: fixed !important;
  inset: 0 !important;
  z-index: 9999 !important;
  display: grid !important;
  place-items: center !important;
  padding: 8px 18px !important;
  overflow: hidden !important;
}

.option-modal-mask .location-manager-modal-card.option-modal-card,
.location-manager-overlay .location-manager-modal-card.option-modal-card,
.top-settings-scope-modal .option-modal-mask .location-manager-modal-card.option-modal-card {
  position: relative !important;
  inset: auto !important;
  left: auto !important;
  top: auto !important;
  transform: none !important;
  margin: 0 auto !important;
  width: min(1180px, calc(100vw - 54px)) !important;
  max-width: min(1180px, calc(100vw - 54px)) !important;
  z-index: 10000 !important;
  height: 80vh !important;
  min-height: min(720px, calc(100vh - 48px)) !important;
  max-height: calc(100vh - 48px) !important;
  overflow: hidden !important;
  display: grid !important;
  grid-template-rows: auto minmax(0, 1fr) auto !important;
  border-radius: 26px !important;
}

.location-manager-modal-card .option-modal-head {
  padding: 26px 30px 18px !important;
  min-height: auto !important;
}

.location-manager-modal-card .option-modal-head h2 {
  font-size: 30px !important;
  line-height: 1.18 !important;
}

.location-manager-modal-card .option-modal-head p {
  font-size: 16px !important;
  line-height: 1.5 !important;
}

.location-manager-modal-card .option-sync-pill {
  font-size: 14px !important;
  padding: 7px 13px !important;
}

.location-manager-modal-card .location-modal-grid,
.location-manager-modal-card .location-modal-grid.location-modal-grid-room-first {
  height: auto !important;
  min-height: 0 !important;
  max-height: none !important;
  overflow: visible !important;
  box-sizing: border-box !important;
  display: grid !important;
  grid-template-columns: minmax(0, 0.96fr) minmax(0, 1.04fr) minmax(0, 0.96fr) !important;
  gap: 14px !important;
  padding: 18px 18px 12px !important;
  align-items: stretch !important;
}

.location-manager-modal-card .option-manager-panel {
  min-height: 0 !important;
  height: 100% !important;
  max-height: none !important;
  overflow: visible !important;
  padding: 16px !important;
}

.location-manager-modal-card .option-manager-panel h3 {
  font-size: 19px !important;
}

.location-manager-modal-card .modal-inline-label,
.location-manager-modal-card .district-selected-city-note,
.location-manager-modal-card .district-empty-note,
.location-manager-modal-card .option-current-text {
  font-size: 14px !important;
}

.location-manager-modal-card .option-manager-panel input,
.location-manager-modal-card .option-manager-panel select {
  min-height: 40px !important;
  height: 40px !important;
  font-size: 15px !important;
}

.location-manager-modal-card .option-inline-input button,
.location-manager-modal-card .option-action-row button {
  min-height: 40px !important;
  font-size: 14px !important;
}

.location-manager-modal-card .modal-button-list,
.location-manager-modal-card .city-button-list,
.location-manager-modal-card .district-button-list {
  max-height: none !important;
  overflow: visible !important;
  gap: 7px !important;
}

.location-manager-modal-card .modal-select-button {
  min-height: 32px !important;
  font-size: 13px !important;
  padding: 0 10px !important;
}

.location-manager-modal-card .location-modal-bottom {
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
  padding: 12px 30px 18px !important;
  min-height: 60px !important;
  box-sizing: border-box !important;
}

.location-manager-modal-card .location-modal-bottom .restore-btn {
  display: inline-flex !important;
  min-height: 46px !important;
  padding: 0 26px !important;
  font-size: 15px !important;
  align-items: center !important;
}

.location-manager-modal-card .option-modal-close {
  top: 18px !important;
  right: 20px !important;
  z-index: 4 !important;
}

@media (max-height: 820px) and (min-width: 921px) {
  .option-modal-mask .location-manager-modal-card.option-modal-card,
  .location-manager-overlay .location-manager-modal-card.option-modal-card,
  .top-settings-scope-modal .option-modal-mask .location-manager-modal-card.option-modal-card {
    height: 80vh !important;
    min-height: 0 !important;
    max-height: calc(100vh - 48px) !important;
  }

  .location-manager-modal-card .option-modal-head {
    padding: 22px 26px 14px !important;
  }

  .location-manager-modal-card .option-modal-head h2 {
    font-size: 27px !important;
  }

  .location-manager-modal-card .option-modal-head p {
    font-size: 14.5px !important;
  }

  .location-manager-modal-card .location-modal-grid,
  .location-manager-modal-card .location-modal-grid.location-modal-grid-room-first {
    padding: 12px 14px 8px !important;
    gap: 10px !important;
  }

  .location-manager-modal-card .option-manager-panel {
    padding: 12px !important;
  }

  .location-manager-modal-card .option-manager-panel h3 {
    font-size: 17px !important;
    margin-bottom: 8px !important;
  }

  .location-manager-modal-card .option-manager-panel input,
  .location-manager-modal-card .option-manager-panel select {
    min-height: 34px !important;
    height: 34px !important;
    font-size: 14px !important;
    margin-bottom: 6px !important;
  }

  .location-manager-modal-card .option-inline-input button,
  .location-manager-modal-card .option-action-row button {
    min-height: 34px !important;
    font-size: 12.5px !important;
  }

  .location-manager-modal-card .modal-select-button {
    min-height: 27px !important;
    font-size: 11.5px !important;
  }

  .location-manager-modal-card .location-modal-bottom {
    min-height: 58px !important;
    padding: 10px 24px 16px !important;
  }
}

@media (max-width: 920px) {
  .option-modal-mask .location-manager-modal-card.option-modal-card,
  .location-manager-overlay .location-manager-modal-card.option-modal-card,
  .top-settings-scope-modal .option-modal-mask .location-manager-modal-card.option-modal-card {
    width: calc(100vw - 24px) !important;
    max-width: calc(100vw - 24px) !important;
    height: calc(100vh - 24px) !important;
    max-height: calc(100vh - 24px) !important;
    min-height: 0 !important;
    overflow: auto !important;
  }

  .location-manager-modal-card .location-modal-grid,
  .location-manager-modal-card .location-modal-grid.location-modal-grid-room-first {
    grid-template-columns: 1fr !important;
  }
}



/* 第 018-105 批：媒體上傳進度條與目前選擇小姐亮起 */
.media-upload-progress-box {
  border: 1px solid rgba(59, 130, 246, 0.22);
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(239, 246, 255, 0.96), rgba(236, 253, 245, 0.92));
  padding: 10px;
  display: grid;
  gap: 7px;
}

.media-upload-progress-box.is-uploading {
  border-color: rgba(14, 165, 233, 0.48);
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.12);
}

.media-upload-progress-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  color: #0f172a;
  font-size: 13px;
  font-weight: 900;
}

.media-upload-progress-head strong {
  color: #0f766e;
}

.media-upload-progress-track,
.thumb-upload-bar {
  width: 100%;
  height: 9px;
  border-radius: 999px;
  background: rgba(203, 213, 225, 0.72);
  overflow: hidden;
}

.media-upload-progress-track i,
.thumb-upload-bar i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #2563eb, #0891b2, #10b981);
  transition: width 0.18s ease;
}

.media-upload-progress-box p {
  margin: 0;
  color: #475569;
  font-size: 12px;
  font-weight: 900;
  line-height: 1.45;
}

.thumb-upload-state {
  padding: 0 6px 7px;
  display: grid;
  gap: 4px;
}

.thumb-upload-state span {
  color: #475569;
  font-size: 10px;
  font-weight: 900;
}

.thumb-upload-state.is-done span {
  color: #047857;
}

.thumb-upload-state.is-failed span {
  color: #b91c1c;
}

.thumb-upload-state.is-failed .thumb-upload-bar i {
  background: linear-gradient(90deg, #ef4444, #f97316);
}

.compact-right-lady-card {
  position: relative;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.compact-right-lady-card.is-selected-upload-lady {
  border-color: rgba(20, 184, 166, 0.95) !important;
  background: linear-gradient(180deg, rgba(240, 253, 250, 0.98), #ffffff) !important;
  box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.22), 0 18px 38px rgba(15, 118, 110, 0.18) !important;
  transform: translateY(-3px) scale(1.015);
  z-index: 2;
}

.selected-upload-lady-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 5;
  border-radius: 999px;
  padding: 5px 9px;
  background: linear-gradient(135deg, #0f766e, #2563eb);
  color: #fff;
  font-size: 11px;
  font-weight: 950;
  box-shadow: 0 10px 20px rgba(15, 118, 110, 0.22);
  pointer-events: none;
}


/* 第 018-109 批：待上傳縮圖區禁止拖放，避免媒體丟錯區域 */
.media-upload-selected-panel {
  position: relative;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.media-upload-selected-panel::after {
  content: '此區僅供預覽，請拖到上方上傳區';
  position: absolute;
  inset: 10px;
  z-index: 10;
  display: grid;
  place-items: center;
  border: 1px dashed rgba(239, 68, 68, 0.72);
  border-radius: 16px;
  background: rgba(255, 247, 247, 0.94);
  color: #b91c1c;
  font-size: 13px;
  font-weight: 950;
  text-align: center;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.985);
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.media-upload-selected-panel.is-drop-blocked {
  border-color: rgba(239, 68, 68, 0.54) !important;
  background: linear-gradient(180deg, rgba(255, 247, 247, 0.98), rgba(248, 250, 252, 0.98)) !important;
  box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.12) !important;
  cursor: not-allowed;
}

.media-upload-selected-panel.is-drop-blocked::after {
  opacity: 1;
  transform: scale(1);
}

.selected-media-empty {
  line-height: 1.55;
}


/* 第 018-116 批：地區機房固定顯示，文件1套用前必須先選完整機房範圍。 */
.scope-fixed-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(50, 120, 210, 0.18);
  background: linear-gradient(135deg, rgba(236, 245, 255, 0.96), rgba(226, 245, 255, 0.92));
  color: #245c96;
  font-weight: 900;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.78), 0 10px 26px rgba(45, 116, 214, 0.12);
  white-space: nowrap;
}

.scope-required-action {
  position: relative;
  opacity: 0.82;
  filter: saturate(0.82);
  box-shadow: 0 10px 24px rgba(255, 96, 96, 0.16), 0 12px 30px rgba(44, 120, 230, 0.15);
}

.scope-required-action::after {
  content: '請先選完整機房';
  position: absolute;
  left: 50%;
  bottom: calc(100% + 7px);
  transform: translateX(-50%);
  padding: 5px 9px;
  border-radius: 999px;
  background: rgba(255, 245, 245, 0.96);
  border: 1px solid rgba(239, 68, 68, 0.28);
  color: #b42318;
  font-size: 11px;
  font-weight: 900;
  white-space: nowrap;
  pointer-events: none;
}


/* 第 018-128 批：前台預覽小姐卡片滿版換行 + 媒體上傳彈窗內容置中 */
.frontend-media-preview-layout.media-modal-card-only-layout {
  display: block !important;
  grid-template-columns: minmax(0, 1fr) !important;
  width: 100% !important;
}

.media-modal-card-only-layout .frontend-preview-side-panel.is-full-width-preview {
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
}

.media-modal-card-only-layout .compact-right-lady-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(150px, 150px)) !important;
  justify-content: start !important;
  align-items: start !important;
  gap: 12px !important;
  width: 100% !important;
}

.media-modal-card-only-layout .compact-right-lady-card {
  width: 150px !important;
  max-width: 150px !important;
}

.media-upload-modal-dialog {
  width: min(760px, calc(100vw - 32px)) !important;
}

.media-upload-modal-dialog .media-upload-modal-header,
.media-upload-modal-dialog .modal-media-upload-box {
  width: min(640px, 100%) !important;
  max-width: 640px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  box-sizing: border-box !important;
}

.media-upload-modal-dialog .modal-media-upload-box {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

@media (max-width: 760px) {
  .media-modal-card-only-layout .compact-right-lady-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important;
  }

  .media-modal-card-only-layout .compact-right-lady-card {
    width: auto !important;
    max-width: none !important;
  }

  .media-upload-modal-dialog .media-upload-modal-header,
  .media-upload-modal-dialog .modal-media-upload-box {
    width: 100% !important;
    max-width: none !important;
  }
}


/* 第 018-129 批：前台預覽卡片方案區對齊 + 圖片放大關閉按鈕加大 */
.compact-right-lady-card {
  display: flex !important;
  flex-direction: column !important;
}

.compact-right-thumbs-slot {
  min-height: 38px;
  margin-bottom: 2px;
}

.compact-right-thumbs-slot .compact-right-thumbs {
  margin: 0 !important;
}

.compact-right-lady-card .card-section-title:first-of-type {
  margin-top: 0 !important;
}

.compact-right-price-list {
  align-items: flex-start !important;
  min-height: 74px;
  align-content: flex-start !important;
}

.compact-right-service-list {
  align-items: flex-start !important;
  align-content: flex-start !important;
}

.media-viewer-close {
  top: 14px !important;
  right: 14px !important;
  min-width: 92px !important;
  height: 46px !important;
  padding: 0 16px !important;
  border: 1px solid rgba(255, 255, 255, 0.72) !important;
  border-radius: 999px !important;
  background: rgba(15, 23, 42, 0.94) !important;
  color: #fff !important;
  font-size: 16px !important;
  font-weight: 900 !important;
  line-height: 1 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 6px !important;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.22) !important;
}

.media-viewer-close:hover {
  background: rgba(37, 99, 235, 0.96) !important;
  transform: translateY(-1px);
}

.media-viewer-close:focus-visible {
  outline: 3px solid rgba(96, 165, 250, 0.55);
  outline-offset: 3px;
}

@media (max-width: 760px) {
  .compact-right-thumbs-slot {
    min-height: 34px;
  }

  .compact-right-price-list {
    min-height: 68px;
  }

  .media-viewer-close {
    min-width: 82px !important;
    height: 42px !important;
    padding: 0 14px !important;
    font-size: 15px !important;
  }
}



/* 第 018-131 批：媒體上傳彈窗內點已上傳縮圖時，放大燈箱必須蓋在上傳彈窗前方 */
.media-viewer-mask {
  z-index: 14000 !important;
}

.media-viewer-dialog {
  position: relative !important;
  z-index: 14001 !important;
}


/* batch018-135-consistency-check-modal-preview-header */
.consistency-check-panel {
  margin: 22px 0 0;
  padding: 18px;
  border: 1px solid rgba(37, 99, 235, 0.16);
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(248, 251, 255, 0.98), rgba(239, 247, 255, 0.92));
  box-shadow: 0 16px 42px rgba(15, 23, 42, 0.08);
}

.consistency-check-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.consistency-check-head h3 {
  margin: 0 0 6px;
  font-size: 1.08rem;
  color: #14315e;
}

.consistency-check-head p {
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}

.consistency-check-btn {
  white-space: nowrap;
}

.consistency-check-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 16px;
  background: rgba(226, 232, 240, 0.72);
  color: #334155;
  font-weight: 700;
}

.consistency-check-summary small {
  color: #64748b;
  font-weight: 700;
}

.consistency-check-summary.is-pending { background: #eff6ff; color: #1d4ed8; }
.consistency-check-summary.is-success { background: #ecfdf5; color: #047857; }
.consistency-check-summary.is-warning { background: #fffbeb; color: #b45309; }
.consistency-check-summary.is-error { background: #fef2f2; color: #b91c1c; }

.consistency-result-table-wrap {
  margin-top: 14px;
  overflow-x: auto;
  border: 1px solid rgba(148, 163, 184, 0.26);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.78);
}

.consistency-result-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}

.consistency-result-table th,
.consistency-result-table td {
  padding: 12px 14px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  text-align: left;
  vertical-align: top;
  color: #334155;
}

.consistency-result-table th {
  color: #14315e;
  font-weight: 800;
  background: rgba(241, 245, 249, 0.82);
}

.consistency-result-table tbody tr:last-child td {
  border-bottom: 0;
}

.consistency-status-pill {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 800;
  background: #e2e8f0;
  color: #334155;
}

.consistency-status-pill.is-ok { background: #dcfce7; color: #047857; }
.consistency-status-pill.is-media-missing { background: #fef3c7; color: #b45309; }
.consistency-status-pill.is-duplicate { background: #fee2e2; color: #b91c1c; }
.consistency-status-pill.is-missing { background: #dbeafe; color: #1d4ed8; }
.consistency-status-pill.is-error { background: #fee2e2; color: #991b1b; }


/* batch018-137-duplicate-organize-tool */
.consistency-suggestion-text {
  margin: 0 0 10px;
  line-height: 1.55;
}

.duplicate-resolve-status {
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 16px;
  font-weight: 900;
  border: 1px solid rgba(148, 163, 184, 0.26);
  background: rgba(248, 250, 252, 0.94);
  color: #334155;
}

.duplicate-resolve-status.is-success { background: #dcfce7; color: #047857; border-color: rgba(34, 197, 94, 0.34); }
.duplicate-resolve-status.is-warning { background: #fef3c7; color: #b45309; border-color: rgba(245, 158, 11, 0.34); }
.duplicate-resolve-status.is-error { background: #fee2e2; color: #b91c1c; border-color: rgba(239, 68, 68, 0.34); }
.duplicate-resolve-status.is-pending { background: #dbeafe; color: #1d4ed8; border-color: rgba(59, 130, 246, 0.34); }

.duplicate-organize-box,
.media-missing-action-box {
  margin-top: 10px;
  padding: 12px;
  border-radius: 16px;
  border: 1px solid rgba(37, 99, 235, 0.18);
  background: rgba(239, 246, 255, 0.72);
}

.duplicate-organize-title {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 10px;
  color: #0f172a;
}

.duplicate-organize-title span,
.media-missing-action-box span {
  color: #64748b;
  font-size: 0.84rem;
  font-weight: 800;
}

.duplicate-candidate-option {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  background: rgba(255, 255, 255, 0.78);
  cursor: pointer;
}

.duplicate-candidate-option.active {
  border-color: rgba(37, 99, 235, 0.46);
  background: rgba(219, 234, 254, 0.82);
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.12);
}

.duplicate-candidate-option input {
  margin-top: 4px;
}

.duplicate-candidate-option span {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.duplicate-candidate-option small {
  color: #64748b;
  font-weight: 800;
  line-height: 1.5;
}

.duplicate-merge-media-toggle {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 10px 0;
  font-size: 0.86rem;
  font-weight: 900;
  color: #334155;
}

.duplicate-resolve-btn {
  width: 100%;
  min-height: 40px;
}

.media-missing-action-box {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

@media (max-width: 720px) {
  .consistency-check-head,
  .consistency-check-summary {
    flex-direction: column;
    align-items: stretch;
  }

  .consistency-check-btn {
    width: 100%;
  }
}


/* batch018-135-consistency-check-modal-preview-header */
.preview-header.preview-header-with-actions {
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.preview-title-block {
  flex: 1 1 420px;
  min-width: 280px;
}

.preview-top-right-tools {
  width: auto;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  max-width: 760px;
}

.preview-sync-summary {
  min-width: 300px;
  max-width: 520px;
}

.preview-consistency-open-btn {
  min-height: 42px;
  white-space: nowrap;
  box-shadow: 0 14px 28px rgba(37, 99, 235, 0.22);
}

.consistency-check-modal-mask {
  position: fixed;
  inset: 0;
  z-index: 13500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(10px);
}

.consistency-check-modal-dialog {
  width: min(1040px, calc(100vw - 48px));
  max-height: calc(100vh - 58px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.42);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.96));
  box-shadow: 0 34px 90px rgba(15, 23, 42, 0.34);
}

.consistency-check-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  padding: 24px 26px 18px;
  border-bottom: 1px solid rgba(203, 213, 225, 0.72);
}

.consistency-check-modal-kicker {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  margin-bottom: 8px;
  padding: 5px 10px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 12px;
  font-weight: 900;
}

.consistency-check-modal-header h3 {
  margin: 0 0 8px;
  font-size: 24px;
  color: #0f172a;
}

.consistency-check-modal-header p {
  margin: 0;
  color: #64748b;
  font-weight: 700;
  line-height: 1.6;
}

.consistency-check-modal-close {
  flex: 0 0 auto;
  border: 1px solid rgba(148, 163, 184, 0.55);
  border-radius: 999px;
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.82);
  color: #0f172a;
  font-weight: 900;
  cursor: pointer;
}

.consistency-check-modal-body {
  overflow: auto;
  padding: 20px 26px 26px;
}

.consistency-check-modal-body .consistency-check-head {
  padding: 16px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 20px;
  background: rgba(248, 250, 252, 0.92);
}

@media (max-width: 980px) {
  .preview-header.preview-header-with-actions {
    flex-direction: column;
  }

  .preview-top-right-tools {
    width: 100%;
    justify-content: flex-start;
  }

  .preview-sync-summary,
  .preview-consistency-open-btn {
    width: 100%;
    max-width: none;
  }

  .consistency-check-modal-mask {
    padding: 14px;
  }

  .consistency-check-modal-dialog {
    width: calc(100vw - 28px);
    max-height: calc(100vh - 28px);
  }

  .consistency-check-modal-header,
  .consistency-check-head,
  .consistency-check-summary {
    flex-direction: column;
    align-items: stretch;
  }
}





/* 第 018-133 批：卡片上方「目前選擇 / 點卡片上傳媒體」避免窄卡文字重疊 */
.compact-right-lady-card.is-selected-upload-lady .lady-card-upload-hint-badge {
  display: none !important;
}

.compact-right-lady-card .selected-upload-lady-badge,
.compact-right-lady-card .lady-card-upload-hint-badge {
  max-width: calc(100% - 16px) !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}



/* batch018-139：老闆第一層公版＋員工第二層補充 */


/* 第 018-141 批：各設定視窗改單一儲存按鈕版 */
.single-save-head-actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.modal-bottom-save-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

/* 第 018-140 批：各設定項目旁新增獨立儲存按鈕 */
.setting-save-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  align-items: end;
  min-width: 0;
}

.setting-save-item > label {
  min-width: 0;
}

.item-save-btn {
  min-width: 72px;
  border: 0;
  border-radius: 999px;
  padding: 10px 15px;
  background: linear-gradient(135deg, #2563eb, #0891b2);
  color: #fff;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.22);
  white-space: nowrap;
}

.item-save-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(37, 99, 235, 0.28);
}

.item-save-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.item-save-btn.compact {
  min-width: 64px;
  padding: 8px 12px;
  font-size: 13px;
}

.item-save-btn.align-end {
  align-self: end;
  margin-bottom: 2px;
}

.manager-title-actions,
.advanced-card-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.manager-title-actions {
  justify-content: flex-end;
}

.advanced-save-item {
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.78);
  padding: 16px;
}

.advanced-panel-clean > .advanced-save-item {
  width: 100%;
}

.advanced-two-col-grid > .advanced-save-item {
  min-width: 0;
}

@media (max-width: 760px) {
  .setting-save-item {
    grid-template-columns: 1fr;
  }

  .item-save-btn,
  .item-save-btn.align-end {
    width: 100%;
    margin-bottom: 0;
  }
}

/* 第 018-150 批：目前範圍已建立機房清單與可選取管理 */
.managed-room-list-shell {
  margin-top: 12px;
  padding: 12px;
  border: 1px solid rgba(96, 165, 250, 0.24);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.34);
}

.managed-room-list-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 9px;
  color: rgba(226, 232, 240, 0.9);
  font-size: 13px;
  font-weight: 800;
}

.managed-room-list-title strong {
  color: #7dd3fc;
}

.managed-room-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 118px;
  overflow-y: auto;
  padding-right: 3px;
}

.managed-room-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 34px;
  padding: 6px 10px;
  border: 1px solid rgba(148, 163, 184, 0.34);
  border-radius: 999px;
  background: rgba(30, 41, 59, 0.82);
  color: #f8fafc;
  cursor: pointer;
}

.managed-room-chip em {
  color: #94a3b8;
  font-size: 11px;
  font-style: normal;
}

.managed-room-chip:hover,
.managed-room-chip.active {
  border-color: rgba(56, 189, 248, 0.82);
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.92), rgba(14, 165, 233, 0.86));
  box-shadow: 0 8px 20px rgba(14, 165, 233, 0.2);
}

.managed-room-chip.active em {
  color: #e0f2fe;
}

.managed-room-empty {
  padding: 9px 10px;
  border: 1px dashed rgba(148, 163, 184, 0.3);
  border-radius: 10px;
  color: #94a3b8;
  font-size: 12px;
}



/* 第 018-176 批：結構化來源欄位規則與老闆專用 Regex */
.recognition-format-modal {
  width: min(1160px, calc(100vw - 32px));
  max-height: min(86vh, 900px);
  overflow: auto;
}

.format-settings-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 4px 0 16px;
  border-bottom: 1px solid rgba(120, 143, 174, 0.2);
}

.format-settings-tabs button {
  border: 1px solid rgba(75, 126, 180, 0.24);
  border-radius: 999px;
  background: #f3f7fb;
  color: #31435a;
  padding: 10px 16px;
  font-weight: 800;
  cursor: pointer;
}

.format-settings-tabs button.active {
  color: #fff;
  border-color: transparent;
  background: linear-gradient(135deg, #2f80ed, #25a7b8);
  box-shadow: 0 10px 24px rgba(45, 129, 190, 0.2);
}

.recognition-settings-panel {
  display: grid;
  gap: 16px;
  padding-top: 16px;
}

.recognition-panel-intro {
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(47, 128, 237, 0.09), rgba(37, 167, 184, 0.08));
  border: 1px solid rgba(47, 128, 237, 0.14);
  color: #30445c;
}

.recognition-panel-intro strong {
  color: #1f334b;
}

.recognition-panel-intro span {
  font-size: 13px;
  line-height: 1.55;
}

.owner-only-intro {
  background: linear-gradient(135deg, rgba(136, 74, 210, 0.1), rgba(235, 72, 145, 0.08));
  border-color: rgba(136, 74, 210, 0.18);
}

.recognition-builder-grid,
.regex-builder-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  align-items: end;
}

.body-builder-grid {
  grid-template-columns: repeat(5, minmax(120px, 1fr));
}

.recognition-builder-grid label,
.regex-builder-grid label,
.recognition-test-card label {
  display: grid;
  gap: 7px;
  color: #42556d;
  font-size: 13px;
  font-weight: 800;
}

.recognition-builder-grid input,
.recognition-builder-grid select,
.regex-builder-grid input,
.regex-builder-grid select,
.regex-builder-grid textarea,
.recognition-rule-main input,
.recognition-rule-main select,
.recognition-rule-main textarea,
.recognition-test-card textarea {
  width: 100%;
  border: 1px solid rgba(92, 116, 146, 0.26);
  border-radius: 12px;
  background: #fff;
  color: #24364d;
  padding: 10px 12px;
  font: inherit;
  box-sizing: border-box;
}

.recognition-builder-wide,
.regex-pattern-field,
.regex-map-field,
.regex-example-field {
  grid-column: span 2;
}

.recognition-add-btn {
  min-height: 42px;
}

.recognition-rule-list {
  display: grid;
  gap: 10px;
}

.recognition-rule-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 12px;
  align-items: start;
  padding: 12px;
  border: 1px solid rgba(89, 116, 149, 0.2);
  border-radius: 15px;
  background: rgba(249, 251, 254, 0.94);
}

.recognition-enable-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 800;
  color: #466078;
  padding-top: 10px;
}

.recognition-rule-main {
  display: grid;
  grid-template-columns: minmax(150px, 0.8fr) minmax(210px, 1fr) minmax(180px, 1fr);
  gap: 9px;
}

.body-rule-main,
.regex-rule-main {
  grid-template-columns: 1fr;
}

.body-rule-field-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
}

.body-rule-field-row select {
  width: auto;
  min-width: 120px;
}

.recognition-rule-name {
  font-weight: 800 !important;
}

.recognition-rule-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
}

.recognition-rule-actions button {
  border: 1px solid rgba(87, 112, 143, 0.2);
  border-radius: 9px;
  background: #fff;
  color: #405870;
  padding: 8px 10px;
  cursor: pointer;
}

.recognition-rule-actions button:disabled {
  opacity: 0.42;
  cursor: not-allowed;
}

.recognition-rule-actions .danger-text-btn {
  color: #b44256;
}

.recognition-empty-hint {
  margin: 0;
  color: #748397;
  font-size: 13px;
}

.recognition-test-card {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: 12px;
  padding: 14px;
  border: 1px dashed rgba(47, 128, 237, 0.28);
  border-radius: 16px;
  background: rgba(244, 249, 255, 0.68);
}

.recognition-test-result {
  display: grid;
  align-content: center;
  gap: 7px;
  padding: 13px 15px;
  border-radius: 13px;
  font-size: 13px;
}

.recognition-test-result.success {
  color: #176444;
  background: rgba(43, 181, 116, 0.1);
}

.recognition-test-result.warning {
  color: #8a5c15;
  background: rgba(233, 168, 54, 0.12);
}

.recognition-test-result code,
.output-format-preview-card code {
  white-space: pre-wrap;
  word-break: break-word;
  color: inherit;
  font-family: inherit;
  font-weight: 800;
}

.output-format-preview-card {
  display: grid;
  gap: 8px;
  padding: 16px;
  border-radius: 16px;
  background: #f5f8fc;
  border: 1px solid rgba(83, 108, 139, 0.15);
}

.output-format-preview-card span {
  color: #63758a;
  font-size: 13px;
  font-weight: 800;
}

.regex-rule-error {
  color: #b44256;
  font-weight: 700;
}

.regex-rule-ok {
  color: #207a55;
  font-weight: 700;
}

@media (max-width: 900px) {
  .body-builder-grid,
  .recognition-builder-grid,
  .regex-builder-grid,
  .recognition-test-card {
    grid-template-columns: 1fr;
  }

  .recognition-builder-wide,
  .regex-pattern-field,
  .regex-map-field,
  .regex-example-field {
    grid-column: auto;
  }

  .recognition-rule-card {
    grid-template-columns: 1fr;
  }

  .recognition-rule-main {
    grid-template-columns: 1fr;
  }

  .recognition-rule-actions {
    justify-content: flex-start;
  }
}


/* 第 018-177 批：欄位辨識視窗加寬、固定單欄、移除水平走位，老闆特殊格式改中文操作 */
.top-settings-format-modal.recognition-format-modal {
  display: block !important;
  width: min(1480px, calc(100vw - 28px)) !important;
  max-width: none !important;
  max-height: calc(100vh - 28px) !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  padding: 24px 28px 28px !important;
}

.recognition-format-modal .top-settings-modal-head {
  position: sticky;
  top: -24px;
  z-index: 8;
  margin-inline: -28px;
  padding: 20px 28px 14px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
}

.recognition-format-modal .format-settings-tabs {
  position: sticky;
  top: 77px;
  z-index: 7;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  width: 100%;
  padding: 12px 0 14px;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(10px);
}

.recognition-format-modal .format-settings-tabs button {
  width: 100%;
  min-width: 0;
  white-space: nowrap;
}

.recognition-format-modal .recognition-settings-panel,
.recognition-format-modal .recognition-rule-list,
.recognition-format-modal .recognition-test-card,
.recognition-format-modal .output-format-panel {
  width: 100%;
  min-width: 0;
}

.recognition-format-modal .header-builder-grid {
  grid-template-columns: minmax(220px, 0.9fr) minmax(300px, 1.2fr) minmax(0, 1.8fr) auto;
}

.recognition-format-modal .header-builder-grid .recognition-builder-wide {
  grid-column: auto;
}

.recognition-format-modal .body-builder-grid {
  grid-template-columns: minmax(220px, 1.2fr) repeat(4, minmax(135px, 0.8fr));
}

.recognition-format-modal .body-builder-grid .recognition-builder-wide {
  grid-column: 1 / -2;
}

.recognition-format-modal .body-builder-grid .recognition-add-btn {
  grid-column: -2 / -1;
}

.recognition-format-modal .recognition-rule-card {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.recognition-format-modal .recognition-rule-main {
  grid-template-columns: minmax(180px, 0.75fr) minmax(260px, 1.15fr) minmax(220px, 1fr);
}

.recognition-format-modal .body-rule-main,
.recognition-format-modal .regex-rule-main {
  grid-template-columns: 1fr;
}

.recognition-format-modal .body-rule-field-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(130px, 1fr));
  gap: 8px;
}

.recognition-format-modal .body-rule-field-row span {
  display: none;
}

.recognition-format-modal .body-rule-field-row select {
  width: 100%;
  min-width: 0;
}

.special-format-help-card {
  display: grid;
  gap: 6px;
  padding: 14px 16px;
  border: 1px solid rgba(139, 92, 246, 0.16);
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(236, 72, 153, 0.06));
  color: #4b3c66;
}

.special-format-help-card span {
  font-size: 13px;
  line-height: 1.55;
}

.special-format-builder-grid {
  display: grid;
  grid-template-columns: minmax(220px, 0.8fr) minmax(220px, 0.7fr) minmax(0, 1.5fr);
  gap: 12px;
  align-items: end;
}

.special-format-builder-grid label {
  display: grid;
  gap: 7px;
  color: #42556d;
  font-size: 13px;
  font-weight: 800;
}

.special-format-builder-grid input,
.special-format-builder-grid select,
.special-format-builder-grid textarea {
  width: 100%;
  border: 1px solid rgba(92, 116, 146, 0.26);
  border-radius: 12px;
  background: #fff;
  color: #24364d;
  padding: 10px 12px;
  font: inherit;
  box-sizing: border-box;
}

.special-template-field {
  grid-column: 1 / -1;
}

.special-placeholder-panel {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 14px;
  background: #f6f3ff;
  color: #5b4a76;
  font-size: 13px;
  font-weight: 800;
}

.special-placeholder-panel button {
  border: 1px solid rgba(139, 92, 246, 0.24);
  border-radius: 999px;
  background: #fff;
  color: #6548a0;
  padding: 7px 12px;
  font-weight: 800;
  cursor: pointer;
}

.special-example-field {
  grid-column: 1 / 3;
}

.special-rule-preview {
  min-height: 44px;
}

.special-add-btn {
  grid-column: 1 / -1;
  justify-self: start;
  min-width: 190px;
}

.special-rule-summary {
  display: grid;
  gap: 5px;
  padding: 11px 13px;
  border-radius: 12px;
  background: #f5f7fb;
  color: #42556d;
}

.special-rule-summary span {
  overflow-wrap: anywhere;
  font-size: 13px;
}

@media (max-width: 1180px) {
  .recognition-format-modal .format-settings-tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    top: 96px;
  }

  .recognition-format-modal .header-builder-grid,
  .recognition-format-modal .body-builder-grid,
  .special-format-builder-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .recognition-format-modal .header-builder-grid .recognition-builder-wide,
  .recognition-format-modal .body-builder-grid .recognition-builder-wide,
  .recognition-format-modal .body-builder-grid .recognition-add-btn,
  .special-template-field,
  .special-placeholder-panel,
  .special-add-btn {
    grid-column: 1 / -1;
  }

  .special-example-field {
    grid-column: auto;
  }

  .recognition-format-modal .recognition-rule-card {
    grid-template-columns: 1fr;
  }

  .recognition-format-modal .recognition-rule-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 720px) {
  .top-settings-format-modal.recognition-format-modal {
    width: calc(100vw - 12px) !important;
    max-height: calc(100vh - 12px) !important;
    padding: 16px !important;
  }

  .recognition-format-modal .top-settings-modal-head {
    top: -16px;
    margin-inline: -16px;
    padding: 16px;
  }

  .recognition-format-modal .format-settings-tabs {
    position: static;
    grid-template-columns: 1fr;
  }

  .recognition-format-modal .header-builder-grid,
  .recognition-format-modal .body-builder-grid,
  .special-format-builder-grid,
  .recognition-format-modal .recognition-test-card,
  .recognition-format-modal .body-rule-field-row {
    grid-template-columns: 1fr;
  }

  .special-example-field {
    grid-column: 1 / -1;
  }
}

</style>
