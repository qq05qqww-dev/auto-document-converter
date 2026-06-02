<template>
  <main class="page-shell">

    <section class="hero-card compact-control-card">
      <div class="top-control-header">
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
        </div>
      </div>
        <div v-if="showPriceSettings" class="hero-actions setting-content-block">
        <label>
          加價模式
          <select v-model="priceMode">
            <option value="country">依國籍自動加價</option>
            <option value="global">全部固定加價</option>
            <option value="custom">全部自訂加價</option>
          </select>
        </label>

        <label>
          固定加價
          <select v-model.number="globalIncrease">
            <option :value="0">+0</option>
            <option :value="500">+500</option>
            <option :value="600">+600</option>
            <option :value="1000">+1000</option>
          </select>
        </label>

        <label>
          自訂加價
          <input v-model.number="customIncrease" type="number" min="0" step="100" />
        </label>

        <label>
          金額計算優先
          <select v-model="amountPriorityMode">
            <option value="higher-price">自動取較高金額</option>
            <option value="country-first">國籍加價優先</option>
            <option value="transform-first">金額轉換優先</option>
          </select>
        </label>
        <label class="wide-price-rule">
          分鐘方案加價規則，一行一個，格式：分鐘=加價
          <textarea
            v-model="minutePriceAddRulesText"
            class="rule-textarea small"
            placeholder="例如：90=1000"
          ></textarea>
          <small>例：90=1000 代表只有 90 分鐘方案額外 +1000。</small>
          <small>另外會自動補差：3.1K→3.2K、3.4K→3.5K、4.9K→5K。</small>
        </label>

        </div>
      <div v-if="showFormatSettings" class="rule-grid top-rules setting-content-block compact-control-content">
        <label>
          輸出格式說明
          <input v-model="formatHint" />
        </label>

        <label>
          標題格式
          <select v-model="titleMode">
            <option value="country-name">【國籍 名稱】</option>
            <option value="name-country">【名稱 國籍】</option>
            <option value="name-only">【名稱】</option>
          </select>
        </label>
        </div>

      <section v-if="showQuickRules" class="quick-rule-section setting-content-block compact-control-content">
        <div class="quick-rule-header">
          <div>
            <h3>簡單模式｜常用規則</h3>
            <p>平常主要改這裡；新店家特殊格式再展開進階設定。</p>
          </div>
        </div>

        <div class="rule-actions rule-actions-center quick-rules-actions">
          <button class="ghost-btn" type="button" @click="saveRules">儲存規則</button>
          <button class="ghost-btn" type="button" @click="loadRules">讀取規則</button>
          <button class="ghost-btn" type="button" @click="exportRules">複製規則備份</button>
          <button class="ghost-btn" type="button" @click="importRules">貼上規則備份</button>
          <button class="danger-btn" type="button" @click="resetRules">恢復預設</button>
        </div>

        <div class="manager-grid">
          <div class="manager-card">
            <div class="manager-title manager-title-row">
              <div>
                <h4>服務同義詞</h4>
                <p>店家寫法轉成你的固定顯示。</p>
              </div>
              <button class="mini-toggle-btn" type="button" @click="showAliasList = !showAliasList">
                {{ showAliasList ? '收合列表' : `展開列表（${aliasRuleItems.length}）` }}
              </button>
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
              <button class="mini-toggle-btn" type="button" @click="showRemoveWordList = !showRemoveWordList">
                {{ showRemoveWordList ? '收合列表' : `展開列表（${removeWordItems.length}）` }}
              </button>
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

      <section v-if="showAdvancedSettings" class="advanced-section compact-control-content">
        <div class="advanced-title">
          <h3>進階設定</h3>
          <p>一般情況不用改這裡；遇到新店家格式抓不到、身材格式特殊、或詞被誤判成小姐名時再調整。</p>
        </div>

        <div class="manager-card advanced-manager-card">
          <div class="manager-title">
            <h4>國籍欄位規則</h4>
            <p>把店家的國籍寫法轉成固定國籍。</p>
          </div>

          <div class="manager-inputs two-cols">
            <input v-model="newCountryRuleFrom" placeholder="店家寫法，例如 國家:馬來" />
            <select v-model="newCountryRuleTo">
              <option value="馬來">馬來</option>
              <option value="越南">越南</option>
              <option value="台妹">台妹</option>
              <option value="港澳">港澳</option>
              <option value="泰妹">泰妹</option>
              <option value="日本">日本</option>
              <option value="韓國">韓國</option>
              <option value="外籍">外籍</option>
            </select>
            <button class="primary-btn" type="button" @click="addCountryFieldRule">新增</button>
          </div>

          <div class="rule-chip-list">
            <span
              v-for="(rule, index) in countryFieldRuleItems"
              :key="`country-${rule.from}-${rule.to}-${index}`"
              class="rule-chip"
            >
              {{ rule.from }} → {{ rule.to }}
              <button type="button" @click="removeCountryFieldRule(index)">×</button>
            </span>
          </div>
        </div>

        <div class="rule-grid">
          <label>
            國籍加價規則，一行一個，格式：國籍=加價
            <textarea v-model="countryPriceRulesText" class="rule-textarea small"></textarea>
          </label>

          <label>
            國籍同義詞，一行一組，格式：來源=固定國籍
            <textarea v-model="countryAliasText" class="rule-textarea small"></textarea>
          </label>
        </div>

        <div class="rule-grid">
          <label>
            服務固定排序，一行一個或空格分隔
            <textarea v-model="serviceOrderText" class="rule-textarea"></textarea>
          </label>

          <label>
            同義詞規則，一行一組，格式：店家寫法=固定寫法
            <textarea v-model="aliasRulesText" class="rule-textarea"></textarea>
          </label>
        </div>

        <div class="rule-grid">
          <label>
            不想出現的文字，一行一個（套用時會清理文件1）
            <textarea v-model="removeWordsText" class="rule-textarea small"></textarea>
          </label>

          <label>
            額外保留關鍵字，一行一個
            <textarea v-model="extraKeepText" class="rule-textarea small"></textarea>
          </label>
        </div>

        <div class="rule-grid">
          <label>
            國籍欄位規則，一行一組，格式：店家寫法=固定國籍
            <textarea v-model="countryFieldRulesText" class="rule-textarea small"></textarea>
          </label>

          <label>
            身材補字規則，一行一個，例如：真、大、小、巨、自然
            <textarea v-model="bodyCupPrefixText" class="rule-textarea small"></textarea>
          </label>
        </div>

        <div class="rule-grid">
          <label>
            不要誤判成小姐名，一行一個
            <textarea v-model="notNameWordsText" class="rule-textarea small"></textarea>
          </label>

          <label>
            說明區（不用輸入）
            <textarea
              class="rule-textarea small"
              readonly
              value="這裡只是說明文字，不能輸入。要新增格式請使用左邊的「國籍欄位規則」、下方的「不要誤判成小姐名」或「服務同義詞」。"
            ></textarea>
          </label>
        </div>
      </section>
    </section>


    <section v-if="showApiPanel" class="api-panel api-panel-top setting-content-block compact-control-content">
      <div>
        <h2>API 串接測試</h2>
        <p>這裡預設連線到 Render 線上 API，也可以手動切換其他 API 位置。</p>
      </div>

      <label>
        API 位置
        <input v-model="apiBaseUrl" type="text" placeholder="https://auto-document-converter-api.onrender.com" />
      </label>

      <div class="api-actions">
        <button class="ghost-btn" type="button" @click="saveApiBaseUrl">儲存API位置</button>
        <button class="ghost-btn" type="button" @click="useOnlineApiBaseUrl">套用線上API</button>
        <button class="ghost-btn" type="button" @click="testApiConnection">測試API</button>
        <button class="ghost-btn" type="button" @click="testDatabaseConnection">測試資料庫</button>
        <button class="primary-btn" type="button" @click="submitDocument4ToApi">送出到本機JSON</button>
        <button class="primary-btn db-btn" type="button" @click="submitDocument4ToDatabase">送出到資料庫</button>
        <button class="ghost-btn frontend-load-btn" type="button" @click="loadFrontendLadies">讀取前台資料</button>
      </div>

      <p class="hint">{{ apiStatusText }}</p>
    </section>



    <section class="frontend-preview-panel">
      <div class="preview-header">
        <div>
          <h2>前台網站預覽</h2>
          <p>這裡會從 Supabase 資料庫讀取資料，模擬未來前台網站顯示。</p>
        </div>

        <div class="preview-tools">
          <button class="primary-btn frontend-load-btn" type="button" @click="loadFrontendLadies">重新讀取前台資料</button>

          <label>
            國籍篩選
            <select v-model="countryFilter">
              <option v-for="country in frontendCountries" :key="country" :value="country">{{ country }}</option>
            </select>
          </label>
        </div>
      </div>


      <div class="frontend-media-preview-layout">
        <div class="media-upload-box compact-media-upload-box">
          <div class="media-upload-title-row">
            <h3>媒體上傳測試</h3>
            <p>先把圖片 / 影片上傳到 R2，並綁定到 Supabase 的小姐資料。</p>
          </div>

          <div class="media-upload-main-stack">
            <label class="media-lady-select">
              選擇小姐
              <select v-model="mediaUploadLadyId">
                <option value="">請選擇小姐</option>
                <option v-for="lady in frontendLadies" :key="lady.id" :value="lady.id">
                  【{{ lady.country }} {{ lady.name }}】
                </option>
              </select>
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
              <button class="ghost-btn" type="button" @click="clearMediaUploadFiles">清空待上傳</button>
              <button class="primary-btn media-upload-btn" type="button" @click="uploadLadyMedia">
                上傳 {{ mediaUploadFiles.length || '' }} 個圖片/影片
              </button>
            </div>

            <div class="media-upload-selected-panel">
              <div class="selected-panel-title">
                <strong>待上傳縮圖</strong>
                <span>{{ mediaUploadFiles.length }} 個檔案</span>
              </div>

              <div v-if="mediaUploadFiles.length" class="selected-media-thumb-grid">
                <div
                  v-for="(file, index) in mediaUploadFiles"
                  :key="`${file.name}-${file.size}-${file.lastModified}`"
                  class="selected-media-thumb-card"
                >
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

                  <button type="button" class="thumb-remove-btn" @click="removeMediaUploadFile(index)">×</button>

                  <div class="thumb-file-info">
                    <strong>{{ file.name }}</strong>
                    <span>{{ formatUploadFileSize(file) }}</span>
                  </div>
                </div>
              </div>

              <div v-else class="selected-media-empty">
                尚未選擇檔案，拖拉圖片/影片到上方即可加入。
              </div>
            </div>
          </div>

          <p class="hint media-upload-status">{{ mediaUploadStatusText }}</p>
        </div>

        <div class="frontend-preview-side-panel">
          <div class="preview-side-topbar">
            <p class="hint frontend-inline-status">{{ frontendStatusText }}</p>
          </div>

          <div v-if="filteredFrontendLadies.length" class="lady-card-grid compact-right-lady-grid">
            <article v-for="lady in filteredFrontendLadies" :key="lady.id" class="lady-card compact-right-lady-card">
              <div class="lady-cover-box">
                <template v-if="getLadyCoverMedia(lady)">
                  <button
                    type="button"
                    class="lady-media-open-btn lady-cover-trigger"
                    @click="openMediaViewer(getLadyCoverMedia(lady), lady)"
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

              <div class="lady-body-line compact-right-body-line">
                <span>{{ lady.height || '-' }}</span>
                <span>{{ lady.weight || '-' }}</span>
                <span>{{ lady.cup || '-' }}</span>
              </div>

              <div v-if="lady.media && lady.media.length > 1" class="lady-media-thumbs compact-right-thumbs">
                <div v-for="media in lady.media.slice(1, 5)" :key="media.id || media.url" class="lady-media-thumb-wrap">
                  <button
                    type="button"
                    class="lady-media-open-btn"
                    @click="openMediaViewer(media, lady)"
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

      <div v-if="mediaViewerItem" class="media-viewer-mask" @click.self="closeMediaViewer">
        <div class="media-viewer-dialog">
          <button type="button" class="media-viewer-close" @click="closeMediaViewer">×</button>
          <div class="media-viewer-body">
            <img
              v-if="mediaViewerItem.mediaType === 'image'"
              :src="mediaViewerItem.url"
              :alt="getMediaDisplayName(mediaViewerItem, { name: mediaViewerLadyName, country: mediaViewerLadyCountry })"
              class="media-viewer-content"
            />
            <video
              v-else
              :src="mediaViewerItem.url"
              class="media-viewer-content"
              controls
              autoplay
              playsinline
            ></video>
          </div>
          <div class="media-viewer-footer">
            <div>
              <strong>{{ getMediaDisplayName(mediaViewerItem, { name: mediaViewerLadyName, country: mediaViewerLadyCountry }) }}</strong>
              <span v-if="mediaViewerLadyName || mediaViewerLadyCountry">【{{ mediaViewerLadyCountry }} {{ mediaViewerLadyName }}】</span>
            </div>
            <div class="media-viewer-actions">
              <button type="button" class="danger-btn" @click="deleteLadyMedia(mediaViewerItem, { name: mediaViewerLadyName, country: mediaViewerLadyCountry })">刪除這張/這段媒體</button>
              <button type="button" class="ghost-btn" @click="closeMediaViewer">關閉</button>
            </div>
          </div>
        </div>
      </div>
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
        ></textarea>

        <div class="button-row">
          <button class="primary-btn" type="button" @click="convertText">套用模式，產生文件2</button>
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
          <button class="primary-btn" type="button" @click="appendResultToConfirmed">確認可以，加入文件3</button>
          <button class="ghost-btn" type="button" @click="resultText = ''">清空文件2</button>
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
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

// 第 009-7 批開始固定使用這兩個正式儲存位置。
// 之後新版不要再改這兩個 Key，避免每次更新檔案後規則消失。
const RULE_STORAGE_KEY = 'auto-document-converter-rules-current'
const CONFIRMED_STORAGE_KEY = 'auto-document-converter-confirmed-current'

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
const jsonResultText = ref('')
const DEFAULT_ONLINE_API_BASE_URL = (import.meta.env.VITE_CONVERTER_API_BASE_URL || 'https://auto-document-converter-api.onrender.com').replace(/\/+$/, '')
const apiBaseUrl = ref(localStorage.getItem('auto-document-converter-api-base-url') || DEFAULT_ONLINE_API_BASE_URL)
const apiStatusText = ref('尚未測試 API。')
const frontendLadies = ref([])
const frontendStatusText = ref('尚未讀取前台資料。')
const countryFilter = ref('全部')
const mediaUploadLadyId = ref('')
const mediaUploadType = ref('image')
const mediaUploadNote = ref('')
const mediaUploadFiles = ref([])
const isMediaDragging = ref(false)
const mediaUploadStatusText = ref('尚未上傳媒體。')
const mediaViewerItem = ref(null)
const mediaViewerLadyName = ref('')
const mediaViewerLadyCountry = ref('')
const confirmedText = ref('')
const statusMessage = ref('等待貼上資料。')
const showAdvancedSettings = ref(false)
const showPriceSettings = ref(false)
const showFormatSettings = ref(false)
const showQuickRules = ref(false)
const showApiPanel = ref(false)
const activeTopPanel = ref('')

function toggleTopPanel(panel) {
  activeTopPanel.value = activeTopPanel.value === panel ? '' : panel
  showPriceSettings.value = activeTopPanel.value === 'price'
  showFormatSettings.value = activeTopPanel.value === 'format'
  showQuickRules.value = activeTopPanel.value === 'quick'
  showAdvancedSettings.value = activeTopPanel.value === 'advanced'
  showApiPanel.value = activeTopPanel.value === 'api'
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

const defaultServiceOrder = [
  '共浴', '無套吹', '輕功', '挑逗', '69', '品鮑', '小親親', '奶炮',
  '舔蛋', '按摩', '舌吻', '冰火', '毒龍', '波推', '胸推', '臀推',
  '桑拿', '調情', '漫遊', '0.01套+100', '0.02套', '絲襪',
  '情趣用品', '自慰秀', '2S+500', '2S+1000', '口爆+500',
  '吞精+500', '吞精+1000', '顏射+500', '自慰秀+500',
  '情趣用品+500', '艷舞+500', '無套內射+1000', '無套內射+1500',
  '無套外射+1000', '後門+1000', '攝影不露臉+1000',
  '絲襪+100', '高跟鞋', '2節3S', '3節送1節200分',
  '3節送1節200分3S', '5節送3節200分', '5節送3節400分',
  '3+1', '2+1',
  '2+1模式',
  '攝影露臉+1000',
  '不嫌視野愛愛',
  '豪邁吃屌',
  '深喉',
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
  '情趣用品=情趣用品',
  '免費情趣用品=情趣用品',
  '情趣用品+500=情趣用品+500',
  '自慰秀=自慰秀',
  '免費自慰秀=自慰秀',
  '自慰秀+500=自慰秀+500',
  '艷舞+500=艷舞+500',
  '買兩節3S=2節3S',
  '買兩節3s=2節3S',
  '買3送1=3+1',
  '買三送一=3+1',
  '買5送3=5+3',
  '買五送三=5+3',
  '2+1s=2節3S',
  '2+1S=2節3S',
  '2節3s=2節3S',
  '2節3S=2節3S',
  '買2節3s=2節3S',
  '買2節3S=2節3S',
  '買兩節3s=2節3S',
  '買兩節3S=2節3S',
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
  '買2節/3s=2+1s',
  '買2節/3S=2+1s',
  '買2節送1s=2+1s',
  '買2節送1S=2+1s',
  '買2節以上免費送口爆=口爆+500',
  '買2節以上免費 送口爆=口爆+500',
  '買2節送艷舞秀=艷舞+500',
  '買2節送豔舞秀=艷舞+500',
  '買兩節送艷舞=艷舞+500',
  '買兩節 送艷舞=艷舞+500',
  '買3節送1節=3+1',
  '買三節送一節=3+1',
  '包夜5+3=5+3',
  '5節送3節包夜=5+3',  '雙飛=雙飛',
  '小女孩淫娃雙飛=雙飛',
  '小女孩/淫娃 雙飛=雙飛',
  '40/60分鐘2+1模式=2+1',
  '2+1模式=2+1',
  '40/60分鐘2+1=2+1',
  '皆可選擇送一節時間或送一次次數=2+1',
  '包夜買5送3=5+3',
  '包夜買5送3 8小時不限時段=5+3',
  '8小時不限時段=5+3',
  '攝影露臉+1000=攝影露臉+1000',
  '攝影+1000=攝影露臉+1000',
  '深喉=深喉',
  '豪邁吃屌=豪邁吃屌',
  '不嫌視野愛愛=不嫌視野愛愛',
  '需=需',
  '溫馨調情=調情',
  '初感001保險套+100=0.01套+100',
  '初感001=0.01套+100',
  '保險套+100=0.01套+100',
  '可2+1 150分 3S=2+1',
  '可2+1 150分 3s=2+1',
  '150分3S=2+1',
  '150分3s=2+1'
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

const defaultExtraKeep = ['吞精+1000', '無套內射+1000', '後門+1000', '高跟鞋', '雙飛', '2+1', '攝影露臉+1000', '深喉', '豪邁吃屌', '不嫌視野愛愛']

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
const removeWordItems = computed(() => parseList(removeWordsText.value))
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

onMounted(() => {
  loadRules({ silent: true })
  loadConfirmedText({ silent: true })
  normalizeDocument3Text()
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




const frontendCountries = computed(() => {
  const countries = frontendLadies.value
    .map(item => item.country)
    .filter(Boolean)

  return ['全部', ...Array.from(new Set(countries))]
})

const filteredFrontendLadies = computed(() => {
  if (countryFilter.value === '全部') return frontendLadies.value
  return frontendLadies.value.filter(item => item.country === countryFilter.value)
})



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
  return media?.note || (lady ? `【${lady.country || ''} ${lady.name || ''}】` : '媒體預覽')
}

function openMediaViewer(media, lady) {
  if (!media) return
  mediaViewerItem.value = media
  mediaViewerLadyName.value = lady?.name || ''
  mediaViewerLadyCountry.value = lady?.country || ''
}

function closeMediaViewer() {
  mediaViewerItem.value = null
  mediaViewerLadyName.value = ''
  mediaViewerLadyCountry.value = ''
}

async function deleteLadyMedia(media, lady) {
  const mediaId = Number(media?.id || 0)
  if (!mediaId) {
    frontendStatusText.value = '找不到要刪除的媒體編號。'
    return
  }

  const ok = window.confirm(`確定要刪除【${lady?.country || ''} ${lady?.name || ''}】這筆媒體嗎？`)
  if (!ok) return

  saveApiBaseUrl()

  try {
    const response = await fetch(`${apiBaseUrl.value}/api/ladies/media/${mediaId}`, {
      method: 'DELETE'
    })
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`)
    }

    if (Number(mediaViewerItem.value?.id || 0) === mediaId) {
      closeMediaViewer()
    }

    frontendStatusText.value = data.message || '媒體已刪除。'
    await loadFrontendLadies()
  } catch (error) {
    frontendStatusText.value = `刪除媒體失敗：${error.message || error}`
  }
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
}

function handleMediaFileChange(event) {
  addMediaUploadFiles(event?.target?.files || [])
}

function handleMediaDrop(event) {
  isMediaDragging.value = false
  addMediaUploadFiles(event?.dataTransfer?.files || [])
}

function removeMediaUploadFile(index) {
  mediaUploadFiles.value = mediaUploadFiles.value.filter((_, fileIndex) => fileIndex !== index)
}

function clearMediaUploadFiles() {
  mediaUploadFiles.value = []

  const fileInput = document.querySelector('#lady-media-file-input')
  if (fileInput) fileInput.value = ''
}

function formatUploadFileSize(file) {
  const size = Number(file?.size || 0)
  if (size >= 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)} MB`
  if (size >= 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${size} B`
}

async function uploadLadyMedia() {
  saveApiBaseUrl()

  if (!mediaUploadLadyId.value) {
    mediaUploadStatusText.value = '請先選擇要綁定的小姐。'
    return
  }

  if (!mediaUploadFiles.value.length) {
    mediaUploadStatusText.value = '請先選擇或拖曳圖片 / 影片檔案。'
    return
  }

  let successCount = 0
  let failCount = 0

  try {
    for (const file of mediaUploadFiles.value) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('ladyId', String(mediaUploadLadyId.value))
      formData.append('mediaType', file.type.startsWith('video/') ? 'video' : 'image')
      formData.append('note', '')

      const response = await fetch(`${apiBaseUrl.value}/api/ladies/media/upload`, {
        method: 'POST',
        body: formData
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        failCount += 1
        throw new Error(data.message || `HTTP ${response.status}`)
      }

      successCount += 1
      mediaUploadStatusText.value = `上傳中：已完成 ${successCount} / ${mediaUploadFiles.value.length} 個檔案。`
    }

    mediaUploadStatusText.value = `媒體疊加上傳完成：成功 ${successCount} 個，失敗 ${failCount} 個。`
    clearMediaUploadFiles()

    await loadFrontendLadies()
  } catch (error) {
    mediaUploadStatusText.value = `媒體上傳中斷：成功 ${successCount} 個，失敗 ${failCount || 1} 個。錯誤：${error.message || error}`
    await loadFrontendLadies()
  }
}

async function loadFrontendLadies() {
  saveApiBaseUrl()

  try {
    const response = await fetch(`${apiBaseUrl.value}/api/public/ladies`)
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`)
    }

    frontendLadies.value = Array.isArray(data.items) ? data.items : []
    frontendStatusText.value = `已讀取 ${frontendLadies.value.length} 筆前台資料。`
  } catch (error) {
    frontendStatusText.value = `讀取前台資料失敗：${error.message || error}`
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

async function submitDocument4ToDatabase() {
  saveApiBaseUrl()

  const payload = parseConfirmedTextToJson(confirmedText.value)
  if (!payload.items.length) {
    apiStatusText.value = '文件3目前沒有可送出到資料庫的資料。'
    return
  }

  try {
    const response = await fetch(`${apiBaseUrl.value}/api/ladies/import-db`, {
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

    apiStatusText.value = `已送出 ${data.count ?? payload.items.length} 筆到 Supabase PostgreSQL。`
  } catch (error) {
    apiStatusText.value = `送出資料庫失敗：${error.message || error}`
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

    apiStatusText.value = `已送出 ${data.count ?? payload.items.length} 筆到本機 API。`
  } catch (error) {
    apiStatusText.value = `送出失敗：${error.message || error}`
  }
}

function parsePriceTextToObject(priceText) {
  const match = String(priceText || '').match(/^([0-9]+(?:\.[0-9]+)?)K\/(\d+)\/(\d+)S$/i)
  if (!match) return null

  return {
    priceText,
    price: Math.round(Number(match[1]) * 1000),
    minutes: Number(match[2]),
    sessions: Number(match[3])
  }
}

function parseConfirmedTextToJson(text) {
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

    return {
      sourceIndex: index + 1,
      country,
      name,
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
    total: items.length,
    items
  }
}

function updateJsonPreview() {
  jsonResultText.value = JSON.stringify(parseConfirmedTextToJson(confirmedText.value), null, 2)
}

function convertText() {
  const originalText = sourceText.value.trim()
  if (!originalText) {
    resultText.value = ''
    statusMessage.value = '請先貼上文件1原始資料。'
    return
  }

  const cleanedText = cleanupSourceText(originalText)
  sourceText.value = cleanedText

  const blocks = splitBlocks(cleanedText)
  const parsed = blocks.map(block => ({
    block,
    header: findHeaderInBlock(block),
    output: parseRecord(block)
  }))

  const rows = parsed.map(item => item.output).filter(Boolean)
  const skipped = parsed.filter(item => !item.output)

  resultText.value = rows.join('\n\n')

  if (!rows.length) {
    statusMessage.value = `沒有抓到可轉換資料。請確認文件1有小姐名、價格、身材；已將媒體上傳區改為左側小拖拉區、右側縮圖牆，支援多檔疊加上傳。已切出 ${blocks.length} 筆。`
    return
  }

  if (skipped.length) {
    const names = skipped.map(item => item.header?.name).filter(Boolean).join('、')
    statusMessage.value = names
      ? `已產生 ${rows.length} 筆，略過 ${skipped.length} 筆：${names}`
      : `已產生 ${rows.length} 筆，另有 ${skipped.length} 筆格式不足。`
    return
  }

  statusMessage.value = `已產生 ${rows.length} 筆固定格式；文件1符號已清理。`
}

function cleanupSourceText(text) {
  let cleaned = normalizeDigits(String(text || ''))

  cleaned = cleaned
    .replace(/[^\u4e00-\u9fa5A-Za-z0-9\s\n\/／\.\+\-\:\：]/g, ' ')
    .replace(/[／]/g, '/')
    .replace(/[：]/g, ':')
    .replace(/[ \t]+/g, ' ')

  parseList(removeWordsText.value).forEach(word => {
    if (!word) return
    cleaned = cleaned.replace(new RegExp(escapeRegExp(word), 'g'), '')
  })

  return cleaned
    .split('\n')
    .map(line => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim()
}

function splitBlocks(text) {
  const lines = String(text || '').split('\n')
  const startIndexes = []

  lines.forEach((line, index) => {
    const normalizedLine = normalizeThaiCountryHeaderLine(line)
    if (parseHeaderLine(normalizedLine)) startIndexes.push(index)
  })

  if (startIndexes.length) {
    return startIndexes
      .map((startIndex, index) => {
        const endIndex = index + 1 < startIndexes.length ? startIndexes[index + 1] : lines.length
        return lines.slice(startIndex, endIndex).join('\n').trim()
      })
      .filter(Boolean)
  }

  // 如果整份沒有國籍，改用「純小姐名」切筆，並在解析時自動補馬來。
  const nameOnlyIndexes = []
  lines.forEach((line, index) => {
    if (isNameOnlyHeaderLine(line) && looksLikeNameOnlyRecordStart(lines, index)) nameOnlyIndexes.push(index)
  })

  if (nameOnlyIndexes.length) {
    return nameOnlyIndexes
      .map((startIndex, index) => {
        const endIndex = index + 1 < nameOnlyIndexes.length ? nameOnlyIndexes[index + 1] : lines.length
        return lines.slice(startIndex, endIndex).join('\n').trim()
      })
      .filter(block => hasMinimumRecordFields(block) || !!parseNameOnlyRecord(block))
  }

  return hasMinimumRecordFields(text) ? [text.trim()] : []
}

function normalizeThaiCountryHeaderLine(line) {
  let value = String(line || '').trim()
  value = value.replace(/^泰國妹妹\s+/, '泰妹 ')
  value = value.replace(/^泰國妹\s+/, '泰妹 ')
  value = value.replace(/^泰國\s+/, '泰妹 ')
  return value
}




function looksLikeNameOnlyRecordStart(lines, index) {
  const preview = lines.slice(index, index + 10).join('\n')
  return !!parseBody(preview) && parsePrices(preview, 0).length > 0
}

function isNameOnlyHeaderLine(line) {
  const cleaned = normalizeHeaderText(line)
  if (!cleaned || isNotHeaderLine(cleaned)) return false

  // 有國籍的仍交給 parseHeaderLine，不走無國籍邏輯。
  if (parseHeaderLine(cleaned)) return false

  if (cleaned.length > 18) return false
  if (/^\d+$/.test(cleaned)) return false
  if (/^(分|分鐘|回|歲|奶|杯|國家|國籍|服務|套餐|超值|升級|底單|最低|請自備|禁止|備註)$/.test(cleaned)) return false

  return /^[\u4e00-\u9fa5A-Za-z0-9]+$/.test(cleaned)
}

function parseRecord(block) {
  const header = findHeaderInBlock(block) || parseNameOnlyRecord(block)
  const explicitCountry = extractCountryFromBlock(block)
  const finalCountry = explicitCountry || header?.country || '馬來'
  const body = parseBody(block)
  const prices = parsePrices(block, getAppliedIncrease(finalCountry))
  const services = extractServices(block)

  if (!header || !body || !prices.length) return null

  const title = buildTitle({
    name: header.name,
    country: finalCountry,
    height: body.height,
    weight: body.weight,
    cup: body.cup,
    age: body.age
  })

  return `${title}  ${prices.join('  ')}\n${services.join(' ')}`
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
  return match ? normalizeCountry(match[1]) : ''
}


function parseNameOnlyRecord(block) {
  const lines = String(block || '').split('\n').map(line => line.trim()).filter(Boolean)

  for (const line of lines.slice(0, 10)) {
    if (!isNameOnlyHeaderLine(line)) continue

    return {
      country: '馬來',
      name: cleanName(line)
    }
  }

  return null
}

function findHeaderInBlock(block) {
  const lines = String(block || '').split('\n')

  for (const line of lines.slice(0, 12)) {
    const header = parseHeaderLine(normalizeThaiCountryHeaderLine(line))
    if (header) return header
  }

  return null
}



function parseHeaderLine(line) {
  const cleaned = normalizeHeaderText(line)
  if (!cleaned || isNotHeaderLine(cleaned)) return null

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
  if (before && (!after || isCountrySuffixOnly(after))) return before
  if (after) return after
  return before
}

function isCountrySuffixOnly(text) {
  return /^(新妹|新茶|新人|嫩妹|妹妹|妹|漂亮|正妹|可愛|甜美|外送妹)$/.test(String(text || '').trim())
}

function removeHeaderNoise(text) {
  let value = normalizeDigits(String(text || ''))

  // 標題同一行可能長這樣：
  // 越南妹妹 京香 157/44/D
  // 需要先把身材片段切掉，避免小姐名變成「京香15744D」。
  value = value
    .replace(/\d{2}\s*(?:歲|y|Y)\s*[.．\s]*\d{3}\s*[\/.．]\s*\d{2}\s*[\/.．]?\s*(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?[A-Za-z].*$/g, '')
    .replace(/\d{3}\s*[\/.．]\s*\d{2}\s*[\/.．]?\s*(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?[A-Za-z].*$/g, '')
    .replace(/\d+(?:\.\d+)?\s*\/\s*\d{2,3}\s*\/\s*\d+\s*S?.*$/ig, '')
    .replace(/\d{2,3}\s*(?:分鐘|分).*$/g, '')

  value = value
    .replace(/(新妹|新茶|新人|嫩妹|妹妹|外送妹)$/g, '')
    .replace(/[^\u4e00-\u9fa5A-Za-z0-9]/g, '')
    .trim()

  return value
}



function normalizeHeaderText(line) {
  return String(line || '').replace(/[^\u4e00-\u9fa5A-Za-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function isNotHeaderLine(line) {
  const value = String(line || '')

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
  return true
}

function parseBody(text) {
  const lines = normalizeDigits(String(text || ''))
    .split('\n')
    .map(line => normalizeBodyText(line).trim())
    .filter(Boolean)

  // 第 009-9-7-6-11：
  // 年齡只能從明確有「歲 / y」的文字取得。
  // 不能從下一行價格 2000/40/1S 誤抓成 20y，也不能從 1100/40/0.5 誤抓成 11y。
  for (const line of lines) {
    const ageFirstMatch = line.match(/(\d{2})\s*(?:歲|y|Y)\s*[.．\s]*\s*(\d{3})\s*[\/.．]\s*(\d{2})\s*[\/.．]?\s*(?:\d{2})?\s*(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?([A-Za-z])\s*(?:奶|杯)?/)
    if (ageFirstMatch) {
      return {
        height: ageFirstMatch[2],
        weight: ageFirstMatch[3],
        cup: ageFirstMatch[4].toUpperCase(),
        age: `${ageFirstMatch[1]}y`
      }
    }

    const bodyWithExplicitAgeMatch = line.match(/(\d{3})\s*[\/.．]\s*(\d{2})\s*[\/.．]?\s*(?:\d{2})?\s*(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?([A-Za-z])\s*(?:奶|杯)?\s*[\/\s]*?(\d{2})\s*(?:歲|y|Y)\b/)
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
    const bodyOnlyMatch = line.match(/(\d{3})\s*[\/.．]\s*(\d{2})\s*[\/.．]?\s*(?:\d{2})?\s*(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?([A-Za-z])\s*(?:奶|杯)?/)
    if (bodyOnlyMatch) {
      return {
        height: bodyOnlyMatch[1],
        weight: bodyOnlyMatch[2],
        cup: bodyOnlyMatch[3].toUpperCase(),
        age: ''
      }
    }

    const spacedBodyMatch = line.match(/(\d{3})\s+(\d{2})\s+(?:\d{2})?\s*(?:真|天然|假|大|小|巨|美|漂亮|自然|軟|嫩|挺|飽|彈|圓)?([A-Za-z])\s*(?:奶|杯)?/)
    if (spacedBodyMatch) {
      return {
        height: spacedBodyMatch[1],
        weight: spacedBodyMatch[2],
        cup: spacedBodyMatch[3].toUpperCase(),
        age: ''
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


function parsePrices(text, increase) {
  const results = []
  const seen = new Set()
  const lines = normalizeDigits(String(text || '')).split('\n')

  const pushPrice = (minutes, sessionCount, amount) => {
    const min = Number(minutes)
    const sessions = Number(sessionCount || 1)
    const rawAmount = Number(amount || 0)
    if (!min || !sessions || !rawAmount) return

    // 第 009-9-7-6-9：
    // 以前只用 minutes 去重，會造成 60/1S 出現後 60/2S 被跳過。
    // 現在改成「分鐘 + 節數」去重，60/1S 與 60/2S 會同時保留。
    const key = `${min}/${sessions}S`
    if (seen.has(key)) return
    seen.add(key)

    results.push({
      minutes: min,
      sessions,
      text: `${formatAmount(applyMinutePriceAdd(resolveFinalAmount(rawAmount, increase), min))}/${min}/${sessions}S`
    })
  }

  lines.forEach(line => {
    const normalized = line
      .replace(/[：]/g, ':')
      .replace(/[／]/g, '/')
      .replace(/　/g, ' ')
      .trim()

    const oldMatch = normalized.match(/(\d{2,3})\s*分\s*\/\s*([0-9.]+)\s*底/)
    if (oldMatch) {
      const minutes = Number(oldMatch[1])
      const base = Number(oldMatch[2])
      if (!minutes || !base) return
      pushPrice(minutes, 1, base * 1000)
      return
    }

    // 支援 2/30/1S、2.2/30/1S、2200/40/1S、3300/60/2S
    const compactAmountMatch = normalized.match(/^([0-9]+(?:\.[0-9]+)?)\s*\/\s*(\d{2,3})\s*\/\s*(\d+)\s*S?/i)
    if (compactAmountMatch) {
      const rawAmountNumber = Number(compactAmountMatch[1])
      const minutes = Number(compactAmountMatch[2])
      const sessionCount = Number(compactAmountMatch[3] || 1)
      if (!rawAmountNumber || !minutes) return

      const amount = rawAmountNumber < 100 ? rawAmountNumber * 1000 : rawAmountNumber
      pushPrice(minutes, sessionCount, amount)
      return
    }

    const kMatch = normalized.match(/(\d{2,3})\s*(?:分鐘|分)\s*\/\s*(\d+)\s*S?\s*([0-9.]+)\s*[kK]/i)
    if (kMatch) {
      const minutes = Number(kMatch[1])
      const sessionCount = Number(kMatch[2] || 1)
      const kAmount = Number(kMatch[3])
      if (!minutes || !kAmount) return
      pushPrice(minutes, sessionCount, kAmount * 1000)
      return
    }

    const minuteMatch = normalized.match(/(\d{2,3})\s*(?:分鐘|分)/)
    if (!minuteMatch) return
    const minutes = Number(minuteMatch[1])
    if (!minutes) return

    const sessionMatch = normalized.match(/\/\s*(\d+)\s*S/i)
    const sessionCount = sessionMatch ? Number(sessionMatch[1]) : 1

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
      return a.sessions - b.sessions
    })
    .map(item => item.text)
}





function hasMinimumRecordFields(text) {
  return !!(findHeaderInBlock(text) || parseNameOnlyRecord(text)) && !!parseBody(text) && parsePrices(text, 0).length > 0
}

function extractServices(block) {
  const found = new Set()
  const order = parseList(serviceOrderText.value)
  const aliases = parseAliasRules(aliasRulesText.value)
    .sort((a, b) => String(b[0]).length - String(a[0]).length)
  const extra = parseList(extraKeepText.value)

  aliases.forEach(([from, to]) => {
    if (!from || !to) return
    if (block.includes(from)) {
      to.split(/\s+/).filter(Boolean).forEach(item => found.add(item))
    }
  })

  extra.forEach(item => {
    if (item && block.includes(item)) found.add(item)
  })

  normalizeOverlappingServices(found)

  const orderIndex = new Map(order.map((item, index) => [item, index]))
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
    ['2+1s', '2節3S'],
    ['2+1S', '2節3S']
  ])

  const mapped = aliasOrderMap.get(item)
  if (mapped && orderIndex.has(mapped)) return orderIndex.get(mapped)

  return Number.MAX_SAFE_INTEGER
}

function normalizeOverlappingServices(found) {
  // 不再硬性把 2+1s 改回 2節3S。
  // 使用者在「同義詞規則」右邊寫什麼，文件2 就以那個輸出為準。

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
}





function buildTitle({ name, country, height, weight, cup, age }) {
  if (titleMode.value === 'name-country') return `【${name} ${country}】${height} ${weight} ${cup}${age ? ` ${age}` : ''}`
  if (titleMode.value === 'name-only') return `【${name}】${height} ${weight} ${cup}${age ? ` ${age}` : ''}`
  return `【${country} ${name}】${height} ${weight} ${cup}${age ? ` ${age}` : ''}`
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
  return String(text).replace(/０/g, '0').replace(/１/g, '1').replace(/２/g, '2').replace(/３/g, '3').replace(/４/g, '4').replace(/５/g, '5').replace(/６/g, '6').replace(/７/g, '7').replace(/８/g, '8').replace(/９/g, '9')
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
    if (!from || !to) return

    // 同一個店家寫法重複時，以最後一條為準。
    // 例如：
    // 2節3s=2節3S
    // 2節3s=2+1s
    // 最後會使用 2+1s。
    map.set(from, to)
  })

  return Array.from(map.entries())
}

function escapeRegExp(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function collectRuleData() {
  return {
    priceMode: priceMode.value,
    globalIncrease: globalIncrease.value,
    customIncrease: customIncrease.value,
    amountPriorityMode: amountPriorityMode.value,
    titleMode: titleMode.value,
    formatHint: formatHint.value,
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
    notNameWordsText: notNameWordsText.value,
    showAdvancedSettings: showAdvancedSettings.value
  }
}

function applyRuleData(data) {
  priceMode.value = data.priceMode ?? 'country'
  globalIncrease.value = Number(data.globalIncrease ?? 500)
  customIncrease.value = Number(data.customIncrease ?? 700)
  amountPriorityMode.value = data.amountPriorityMode ?? 'higher-price'
  titleMode.value = data.titleMode ?? 'country-name'
  formatHint.value = data.formatHint ?? formatHint.value
  countryPriceRulesText.value = data.countryPriceRulesText ?? countryPriceRulesText.value
  minutePriceAddRulesText.value = data.minutePriceAddRulesText ?? minutePriceAddRulesText.value
  countryAliasText.value = data.countryAliasText ?? countryAliasText.value
  amountTransformRules.value = normalizeAmountRules(data.amountTransformRules ?? data.amountTransformRulesText ?? amountTransformRules.value)
  serviceOrderText.value = data.serviceOrderText ?? serviceOrderText.value
  aliasRulesText.value = data.aliasRulesText ?? aliasRulesText.value
  removeWordsText.value = data.removeWordsText ?? removeWordsText.value
  extraKeepText.value = data.extraKeepText ?? extraKeepText.value
  countryFieldRulesText.value = data.countryFieldRulesText ?? countryFieldRulesText.value
  bodyCupPrefixText.value = data.bodyCupPrefixText ?? bodyCupPrefixText.value
  notNameWordsText.value = data.notNameWordsText ?? notNameWordsText.value
  showAdvancedSettings.value = data.showAdvancedSettings ?? false
  showPriceSettings.value = false
  showFormatSettings.value = false
  showQuickRules.value = false
  showAliasList.value = false
  showRemoveWordList.value = false
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

function saveRules() {
  localStorage.setItem(RULE_STORAGE_KEY, JSON.stringify(collectRuleData()))
  statusMessage.value = '規則已儲存到正式位置；之後更新新版檔案也會自動讀取。'
}

function loadRules(options = {}) {
  const raw = getFirstStorageValue(RULE_STORAGE_KEY, LEGACY_RULE_STORAGE_KEYS)

  if (!raw) {
    if (!options.silent) statusMessage.value = '目前沒有儲存過規則。'
    return false
  }

  try {
    const parsed = JSON.parse(raw)
    applyRuleData(parsed)

    // 搬到固定正式儲存位置，之後新版都能讀同一份。
    localStorage.setItem(RULE_STORAGE_KEY, JSON.stringify(collectRuleData()))

    if (!options.silent) statusMessage.value = '已讀取規則，並同步到正式儲存位置。'
    return true
  } catch (error) {
    if (!options.silent) statusMessage.value = '讀取規則失敗，已保留目前設定。'
    return false
  }
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
  priceMode.value = 'country'
  globalIncrease.value = 500
  customIncrease.value = 700
  amountPriorityMode.value = 'higher-price'
  titleMode.value = 'country-name'
  formatHint.value = '【國籍 名稱】身高 體重 Cup 年齡　短鐘K/30/1S　長鐘K/50/1S'
  countryPriceRulesText.value = defaultCountryPriceRules.join('\n')
  minutePriceAddRulesText.value = defaultMinutePriceAddRules.join('\n')
  countryAliasText.value = defaultCountryAliases.join('\n')
  amountTransformRules.value = defaultAmountTransformRules.map(rule => ({ ...rule }))
  newAmountFrom.value = ''
  newAmountTo.value = ''
  serviceOrderText.value = defaultServiceOrder.join('\n')
  aliasRulesText.value = defaultAliasRules.join('\n')
  removeWordsText.value = defaultRemoveWords.join('\n')
  extraKeepText.value = defaultExtraKeep.join('\n')
  countryFieldRulesText.value = defaultCountryFieldRules.join('\n')
  bodyCupPrefixText.value = defaultBodyCupPrefixes.join('\n')
  notNameWordsText.value = defaultNotNameWords.join('\n')
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
  statusMessage.value = '已恢復預設；要永久覆蓋請再按「儲存規則」。'
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
    statusMessage.value = '已匯入規則備份並儲存。'
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

  const current = String(confirmedText.value || '').replace(/^\n+/, '').trim()
  confirmedText.value = ensureDocument3TopBlankLines(current ? `${current}\n\n${text}` : text)
  saveConfirmedText({ silent: true })
  resultText.value = ''
  updateJsonPreview()
  statusMessage.value = '已把文件2加入文件3，文件4 JSON 已同步更新。'
}





function saveConfirmedText(options = {}) {
  normalizeDocument3Text()
  localStorage.setItem(CONFIRMED_STORAGE_KEY, confirmedText.value)
  updateJsonPreview()
  if (!options.silent) statusMessage.value = '文件3已儲存，文件4 JSON 已同步更新。'
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
  resultText.value = ''
  statusMessage.value = '已清空文件1與文件2，文件3保留。'
}

function clearConfirmedText() {
  confirmedText.value = '\n\n'
  localStorage.setItem(CONFIRMED_STORAGE_KEY, confirmedText.value)
  updateJsonPreview()
  statusMessage.value = '文件3已清空，文件4 JSON 已同步更新。'
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
  max-height: 150px;
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

  .preview-tools .frontend-load-btn,
  .preview-tools label {
    width: 100%;
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
  justify-content: space-between;
  gap: 18px;
  align-items: end;
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
  align-items: end;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.frontend-load-btn {
  white-space: nowrap;
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
  z-index: 60;
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
  display: grid;
  place-items: center;
  min-height: 320px;
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

</style>
