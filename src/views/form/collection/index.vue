<template>
  <div class="collction">
    <div class="collction__box">
      <div class="collction__box__content">
        <div class="collction__box__content__title">
          <span style="color: #00bfff">房屋落点</span>
          <el-icon :size="20" style="float: right">
            <Location @click="dingWeiDaKa()" color="#00BFFF" />
          </el-icon>
        </div>
        <!-- <div class="collction__box__content__text">
          <el-icon :size="20">
              <Location @click="dingWeiDaKa()" color="#00BFFF" />
            </el-icon>
        </div> -->
      </div>
      <div class="collction__box__content">
        <div class="collction__box__content__title">
          <span>建筑名称</span>
        </div>
        <div class="collction__box__content__text">
          <span> {{ form.caiJiXQ.XQMC }}</span>
        </div>
      </div>
      <div class="collction__box__content">
        <div class="collction__box__content__title">
          <span>授权地址</span>
        </div>
        <div class="collction__box__content__text">
          <span> {{ form.caiJiXQ.XQDZ }}</span>
        </div>
      </div>
      <div class="collction__box__content">
        <div class="collction__box__content__title">
          <span>授权房屋类型</span>
        </div>
        <div class="collction__box__content__text">
          <span> {{ form.caiJiXQ.FWLX }}</span>
        </div>
      </div>
      <div class="collction__box__content">
        <div class="collction__box__content__title">
          <span>保护铭牌内容</span>
        </div>
        <div class="collction__box__content__text">
          <span> {{ form.caiJiXQ.MPNR }}</span>
        </div>
      </div>
      <div class="collction__box__content">
        <div class="collction__box__content__title">
          <span>公安绿牌地址</span>
        </div>
        <div class="collction__box__content__text">
          <span> {{ form.caiJiXQ.GALP }}</span>
        </div>
      </div>
      <div class="collction__box__content">
        <div class="collction__box__content__title">
          <span>现场带看情况</span>
        </div>
        <div class="collction__box__content__text">
          <span> {{ form.caiJiXQ.DKQK }}</span>
        </div>
      </div>
    </div>
    <div class="collction__box collction__box__form">
      <el-form
        label-position="top"
        require-asterisk-position="right"
        ref="ruleFormRef"
        :model="form.caiJiXQ"
        style="max-width: 600px"
        label-width="auto"
        :rules="rules"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item v-if="isEdit || form.caiJiXQ.FWLX != form.caiJiXQ.XFWLX" label="当前房屋类型" prop="xfwlx">
          <el-select v-if="isEdit" v-model="form.caiJiXQ.XFWLX" placeholder="选择房屋类型" style="width: 100%">
            <el-option v-for="item in fWLXList" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
          <div class="collction__box__form__text" v-else>
            <span :style="form.caiJiXQ.FWLX != form.caiJiXQ.XFWLX ? 'color:red' : ''">{{ form.caiJiXQ.XFWLX }}</span>
          </div>
        </el-form-item>
        <el-form-item v-if="isEdit || form.caiJiXQ.GALP != form.caiJiXQ.XGALP" label="当前公安绿牌地址" prop="galpdz">
          <el-input v-model="form.caiJiXQ.XGALP" v-if="isEdit" type="textarea" placeholder="请输入新公安绿牌地址" />
          <div class="collction__box__form__text" v-else>
            <span :style="form.caiJiXQ.GALP != form.caiJiXQ.XGALP ? 'color:red' : ''">{{ form.caiJiXQ.XGALP }}</span>
          </div>
        </el-form-item>
        <!--------------------------破坏情况---------------------------------------->
        <el-form-item v-if="isEdit || form.caiJiXQ.PHSY != ''" label="破坏情况类型" prop="phsy">
          <el-select v-if="isEdit" v-model="form.caiJiXQ.PHSY" placeholder="破坏情况类型" multiple style="width: 100%">
            <el-option v-for="item in pHSYList" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
          <div class="collction__box__form__text" v-else>
            <span :style="form.caiJiXQ.PHSY != '' ? 'color:red' : ''">{{ form.caiJiXQ.PHSY }}</span>
          </div>
        </el-form-item>
        <el-form-item v-if="isEdit || form.caiJiXQ.PHSY != ''" label="破坏情况说明" prop="phqksm">
          <el-input v-model="form.caiJiXQ.PHQK" v-if="isEdit" type="textarea" placeholder="请输入现场破坏情况" />
          <div class="collction__box__form__text" v-else>
            <span style="color: red">{{ form.caiJiXQ.PHQK }}</span>
          </div>
        </el-form-item>
        <el-form-item v-if="isEdit || form.caiJiXQ.PHSY != ''" label="现场破坏照片取证" prop="phqkphotos">
          <div class="collction__box__image" v-if="(form.caiJiXQ.PHQKPHOTOS && form.caiJiXQ.PHQKPHOTOS.length) || isEdit">
            <div class="collction__box__image__content" v-for="(item, index) in form.caiJiXQ.PHQKPHOTOS" :key="index">
              <el-image
                style="width: 100px; height: 100px"
                :initial-index="index"
                :preview-src-list="form.caiJiXQ.PHQKPHOTOS.map((item) => item.url)"
                :src="item.url"
                fit="cover"
              />
              <div class="collction__box__image__content--close" @click.stop="deleteImage('PHQKPHOTOS', index)" v-if="isEdit">
                <el-icon><CircleClose /></el-icon>
              </div>
            </div>
            <div class="collction__box__image__upload" v-if="isEdit">
              <el-icon><Plus /></el-icon>
              <input
                type="file"
                class="collction__box__image__upload--input"
                @change="handleImageChange($event, 'PHQKPHOTOS')"
                accept="image/*"
              />
            </div>
          </div>
          <div class="collction__box__form__text" v-else>
            <span>暂无</span>
          </div>
        </el-form-item>
        <!--------------------------------搭建违建---------------------------------->
        <el-form-item v-if="isEdit || form.caiJiXQ.DJWJ == '是'" label="是否搭建违建" prop="djwj">
          <el-select v-if="isEdit" v-model="form.caiJiXQ.DJWJ" placeholder="是否搭建违建" style="width: 100%">
            <el-option v-for="item in parent" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
          <div class="collction__box__form__text" v-else>
            <span :style="form.caiJiXQ.DJWJ == '是' ? 'color:red' : ''">{{ form.caiJiXQ.DJWJ }}</span>
          </div>
        </el-form-item>
        <el-form-item v-if="isEdit || form.caiJiXQ.DJWJ == '是'" label="搭建违建数量" prop="jcdjwj">
          <el-input-number
            v-model="form.caiJiXQ.DJWJSL"
            placeholder="请输入搭建违建的数量"
            v-if="isEdit"
            :min="1"
            :max="999"
            controls-position="right"
          />
          <div class="collction__box__form__text" v-else>
            <span>{{ form.caiJiXQ.DJWJSL }}</span>
          </div>
        </el-form-item>
        <el-form-item v-if="isEdit || form.caiJiXQ.DJWJ == '是'" label="搭建违建说明" prop="djwjsm">
          <el-input v-model="form.caiJiXQ.DJWJSM" v-if="isEdit" type="textarea" placeholder="请输入现场搭建违建情况" />
          <div class="collction__box__form__text" v-else>
            <span style="color: red">{{ form.caiJiXQ.DJWJSM }}</span>
          </div>
        </el-form-item>
        <el-form-item v-if="isEdit || form.caiJiXQ.DJWJ == '是'" label="搭建违建照片取证" prop="djwjPhotos">
          <div class="collction__box__image" v-if="(form.caiJiXQ.DJWJPHOTOS && form.caiJiXQ.DJWJPHOTOS.length) || isEdit">
            <div class="collction__box__image__content" v-for="(item, index) in form.caiJiXQ.DJWJPHOTOS" :key="index">
              <el-image
                style="width: 100px; height: 100px"
                :initial-index="index"
                :preview-src-list="form.caiJiXQ.DJWJPHOTOS.map((item) => item.url)"
                :src="item.url"
                fit="cover"
              />
              <div class="collction__box__image__content--close" @click.stop="deleteImage('DJWJPHOTOS', index)" v-if="isEdit">
                <el-icon><CircleClose /></el-icon>
              </div>
            </div>
            <div class="collction__box__image__upload" v-if="isEdit">
              <el-icon><Plus /></el-icon>
              <input
                type="file"
                class="collction__box__image__upload--input"
                @change="handleImageChange($event, 'DJWJPHOTOS')"
                accept="image/*"
              />
            </div>
          </div>
          <div class="collction__box__form__text" v-else>
            <span>暂无</span>
          </div>
        </el-form-item>
        <!-----------------------------------违规拆除------------------------------->
        <el-form-item v-if="isEdit || form.caiJiXQ.WGCH == '是'" label="是否违规拆除" prop="wgch">
          <el-select v-model="form.caiJiXQ.WGCH" v-if="isEdit" placeholder="是否存在违规拆除情况">
            <el-option v-for="item in parent" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
          <div class="collction__box__form__text" v-else>
            <span :style="form.caiJiXQ.WGCH == '是' ? 'color:red' : ''">{{ form.caiJiXQ.WGCH }} </span>
          </div>
        </el-form-item>
        <el-form-item v-if="isEdit || form.caiJiXQ.WGCH == '是'" label="违规拆除情况" prop="wgchlx">
          <el-select v-model="form.caiJiXQ.WGCHLX" v-if="isEdit" placeholder="违规拆除类型">
            <el-option v-for="item in wgcjqklx" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
          <div class="collction__box__form__text" v-else>
            <span style="color: red">{{ form.caiJiXQ.WGCHLX }} </span>
          </div>
        </el-form-item>
        <el-form-item v-if="isEdit || form.caiJiXQ.WGCH == '是'" label="违建拆除说明" prop="wgchsm">
          <el-input v-model="form.caiJiXQ.WGCHSM" v-if="isEdit" type="textarea" placeholder="请输入现场违建拆除情况" />
          <div class="collction__box__form__text" v-else>
            <span style="color: red">{{ form.caiJiXQ.WGCHSM }}</span>
          </div>
        </el-form-item>
        <el-form-item v-if="isEdit || form.caiJiXQ.WGCH == '是'" label="违规拆除照片取证" prop="wgchphotos">
          <div class="collction__box__image" v-if="(form.caiJiXQ.WGCHPHOTOS && form.caiJiXQ.WGCHPHOTOS.length) || isEdit">
            <div class="collction__box__image__content" v-for="(item, index) in form.caiJiXQ.WGCHPHOTOS" :key="index">
              <el-image
                style="width: 100px; height: 100px"
                :initial-index="index"
                :preview-src-list="form.caiJiXQ.WGCHPHOTOS"
                :src="item"
                fit="cover"
              />
              <div class="collction__box__image__content--close" @click.stop="deleteImage('WGCHPHOTOS', index)" v-if="isEdit">
                <el-icon><CircleClose /></el-icon>
              </div>
            </div>
            <div class="collction__box__image__upload" v-if="isEdit">
              <el-icon><Plus /></el-icon>
              <input
                type="file"
                class="collction__box__image__upload--input"
                @change="handleImageChange($event, 'WGCHPHOTOS')"
                accept="image/*"
              />
            </div>
          </div>
          <div class="collction__box__form__text" v-else>
            <span>'暂无'</span>
          </div>
        </el-form-item>
        <!------------------------------------破坏情况------------------------------>
        <el-form-item v-if="isEdit || form.caiJiXQ.SHQK != ''" label="损坏情况" prop="shqk">
          <el-select v-model="form.caiJiXQ.SHQK" v-if="isEdit" multiple placeholder="损坏情况类型">
            <el-option v-for="item in shqklx" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
          <div class="collction__box__form__text" v-else>
            <span :style="form.caiJiXQ.SHQK != '' ? 'color:red' : ''">{{ form.caiJiXQ.SHQK }} </span>
          </div>
        </el-form-item>
        <el-form-item v-if="isEdit || form.caiJiXQ.SHQK != ''" label="损坏情况说明" prop="shqksm">
          <el-input v-model="form.caiJiXQ.SHSM" v-if="isEdit" type="textarea" placeholder="现场损坏情况说明" />
          <div class="collction__box__form__text" v-else>
            <span style="color: red">{{ form.caiJiXQ.SHSM }}</span>
          </div>
        </el-form-item>
        <el-form-item v-if="isEdit || form.caiJiXQ.SHQK != ''" label="损坏情况照片取证" prop="shqkphotos">
          <div class="collction__box__image" v-if="(form.caiJiXQ.PHQKPHOTOS && form.caiJiXQ.PHQKPHOTOS.length) || isEdit">
            <div class="collction__box__image__content" v-for="(item, index) in form.caiJiXQ.PHQKPHOTOS" :key="index">
              <el-image
                style="width: 100px; height: 100px"
                :initial-index="index"
                :preview-src-list="form.caiJiXQ.PHQKPHOTOS"
                :src="item"
                fit="cover"
              />
              <div class="collction__box__image__content--close" @click.stop="deleteImage('PHQKPHOTOS', index)" v-if="isEdit">
                <el-icon><CircleClose /></el-icon>
              </div>
            </div>
            <div class="collction__box__image__upload" v-if="isEdit">
              <el-icon><Plus /></el-icon>
              <input
                type="file"
                class="collction__box__image__upload--input"
                @change="handleImageChange($event, 'SHQKPHOTOS')"
                accept="image/*"
              />
            </div>
          </div>
          <div class="collction__box__form__text" v-else>
            <span>暂无</span>
          </div>
        </el-form-item>
        <!---------------------------------征收复核--------------------------------->
        <el-form-item v-if="isEdit || form.caiJiXQ.ZSQK != form.caiJiXQ.ZSFH" label="是否纳入征收" prop="wgchsm">
          <el-select v-model="form.caiJiXQ.ZSFH" v-if="isEdit" placeholder="是否纳入征收范围">
            <el-option v-for="item in parent" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
          <div class="collction__box__form__text" v-else>
            <span :style="form.caiJiXQ.ZSQK != form.caiJiXQ.ZSFH ? 'color:red' : ''">{{ form.caiJiXQ.ZSFH }} </span>
          </div>
        </el-form-item>
        <el-form-item v-if="isEdit || form.caiJiXQ.ZSQK != form.caiJiXQ.ZSFH" label="征收复核说明" prop="zsfhsm">
          <el-input v-model="form.caiJiXQ.ZSFHSM" v-if="isEdit" type="textarea" placeholder="现场征收情况说明" />
          <div class="collction__box__form__text" v-else>
            <span style="color: red">{{ form.caiJiXQ.ZSFHSM }}</span>
          </div>
        </el-form-item>
        <!---------------------------------修缮情况--------------------------------->
        <el-form-item v-if="isEdit || form.caiJiXQ.XSQK == '修缮中'" label="修缮情况" prop="xsqk">
          <el-select v-model="form.caiJiXQ.XSQK" v-if="isEdit" multiple placeholder="修缮情况">
            <el-option v-for="item in xsqkType" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
          <div class="collction__box__form__text" v-else>
            <span :style="form.caiJiXQ.XSQK == '修缮中' ? 'color:red' : ''">{{ form.caiJiXQ.XSQK }} </span>
          </div>
        </el-form-item>
        <el-form-item v-if="isEdit || form.caiJiXQ.XSQK == '修缮中'" label="修缮情况说明" prop="xsqksm">
          <el-input v-model="form.caiJiXQ.XSQKSM" v-if="isEdit" type="textarea" placeholder="现场修缮情况说明" />
          <div class="collction__box__form__text" v-else>
            <span style="color: red">{{ form.caiJiXQ.XSQKSM }}</span>
          </div>
        </el-form-item>
        <el-form-item v-if="isEdit || form.caiJiXQ.XSQK == '修缮中'" label="修缮情况照片" prop="xsqkphotos">
          <div class="collction__box__image" v-if="(form.caiJiXQ.XSQKPHOTOS && form.caiJiXQ.XSQKPHOTOS.length) || isEdit">
            <div class="collction__box__image__content" v-for="(item, index) in form.caiJiXQ.XSQKPHOTOS" :key="index">
              <el-image
                style="width: 100px; height: 100px"
                :initial-index="index"
                :preview-src-list="form.caiJiXQ.XSQKPHOTOS"
                :src="item"
                fit="cover"
              />
              <div class="collction__box__image__content--close" @click.stop="deleteImage('XSQKPHOTOS', index)" v-if="isEdit">
                <el-icon><CircleClose /></el-icon>
              </div>
            </div>
            <div class="collction__box__image__upload" v-if="isEdit">
              <el-icon><Plus /></el-icon>
              <input
                type="file"
                class="collction__box__image__upload--input"
                @change="handleImageChange($event, 'XSQKPHOTOS')"
                accept="image/*"
              />
            </div>
          </div>
          <div class="collction__box__form__text" v-else>
            <span>暂无</span>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!---------------------------------建筑历史--------------------------------->
    <div class="collction__box">
      <div class="collction__box__content">
        <div class="collction__box__content__title">
          <span>建筑历史</span>
        </div>
        <div class="collction__box__timeline">
          <el-timeline style="max-width: 400px">
            <el-timeline-item
              v-for="(item, index) in form.lsxcjl"
              :key="item"
              :icon="item.icon"
              :type="item.type"
              :color="item.color"
              :size="item.size"
              :happend="item.happend"
              center
              :timestamp="item.TIME"
              lacement="top"
            >
              {{ item.ZT }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    <!---------------------------------图片模块--------------------------------->
    <div class="collction__box">
      <div class="collction__box__content">
        <div class="collction__nav">
          <div class="collction__navpostion">
            <div class="collction__navbox" ref="navBox">
              <span
                :ref="(el) => (itemRefs[index] = el)"
                v-for="(item, index) in form.phoneTypeList"
                :key="index"
                @click="handleClick(index, $event)"
              >
                {{ item.title }}
              </span>
              <p class="collction__solid" :style="{ left: phoneTypeIndex * 90 + 'px' }">
                <span></span>
              </p>
            </div>
          </div>
        </div>
        <!---按照要求显示提示-->
        <!-- <div class="collction__navtitle">{{ form.phoneTypeList[phoneTypeIndex].tooltip }}</div> -->
        <div class="collction__box__image">
          <div class="collction__box__image__content" v-for="(item, index) in form.phoneTypeList[phoneTypeIndex].imglists" :key="index">
            <el-image
              style="width: 100px; height: 100px"
              :initial-index="index"
              :preview-src-list="form.phoneTypeList[phoneTypeIndex].imglists.map((item) => item.imgUrl)"
              :src="item.imgUrl"
              fit="cover"
            />
          </div>
          <!-- <div class="collction__box__image__upload" v-if="isEdit">
            <el-icon><Plus /></el-icon>
            <input
              type="file"
              class="collction__box__image__upload--input"
              @change="handleFileChange($event, phoneTypeList[phoneTypeIndex])"
              accept="image/*"
            />
          </div> -->
        </div>
      </div>
    </div>
    <div class="collction__edit">
      <template v-if="!isEdit">
        <template v-if="userInfo.groupName == '外业管理员' && bannerData.standardState == '待审核'">
          <div class="collction__edit__abnormal" @click.stop="centerDialogVisibleOpen(false)">
            <el-icon><Edit /></el-icon>
            <span class="collction__edit__btn--text">驳回</span>
          </div>
          <div class="collction__edit__pass" @click.stop="centerDialogVisibleOpen(true)">
            <el-icon><Edit /></el-icon>
            <span class="collction__edit__btn--text">通过</span>
          </div>
        </template>
        <div class="collction__edit__btn" @click.stop="isEditChange(true)">
          <el-icon><Edit /></el-icon>
          <span class="collction__edit__btn--text">编辑</span>
        </div>
      </template>
      <template v-else>
        <div class="collction__edit__abnormal" @click.stop="dialogFormVisibleShow">
          <el-icon><InfoFilled /></el-icon>
          <span>异常上报</span>
        </div>
        <div class="collction__edit__save" @click.stop="isEditChange(true)">
          <el-icon><DocumentChecked /></el-icon>
          <span>暂存</span>
        </div>
        <div class="collction__edit__cancel" @click.stop="isEditChange(false)">
          <el-icon><CircleClose /></el-icon>
          <span>取消</span>
        </div>
      </template>
    </div>
    <div class="dialog" v-if="centerDialogVisible">
      <div class="dialog__content">
        <h3 class="dialog__content--title">{{ apply ? '审核通过' : '审核拒绝' }}</h3>
        <div class="dialog__content__box">
          <el-input v-model="contetForm.name" type="textarea" :placeholder="`请输入${apply ? '审核意见' : '驳回理由'}`" />
        </div>
        <div class="dialog__content__footer">
          <div @click.stop="centerDialogVisible = false">取消</div>
          <div @click.stop="approveConfirm">确定</div>
        </div>
      </div>
    </div>
    <div class="dialog" v-if="dialogFormVisible">
      <div class="dialog__content">
        <h3 class="dialog__content--title">异常信息上报</h3>
        <div class="dialog__content__box">
          <el-input v-model="contetForm.name" type="textarea" placeholder="请输入异常处理意见" />
          <el-select style="margin: 20px 0" v-model="contetForm.region" placeholder="请选择处理类型">
            <el-option label="自行处理" value="自行处理" />
            <el-option label="上报处理" value="上报处理" />
          </el-select>
        </div>
        <div class="dialog__content__footer">
          <div @click.stop="dialogFormVisible = false">取消</div>
          <div>确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, computed, reactive } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useSettingStore } from '@/store/modules/setting'
  import { useUserStore } from '@/store/modules/user'
  import { youliCJXQGet, getLocationInfo, buildOperation, xinXiGX } from '@/api/user'
  import { FormRules } from 'element-plus'
  import { useRoute, useRouter } from 'vue-router'
  import { MoreFilled } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'
  const router = useRouter()
  const SettingStore = useSettingStore()
  // 获取数据
  const { optionSetting, gfIdList, gfid, fWLXList, pHSYList } = storeToRefs(SettingStore)
  // 引入接口
  const route = useRoute()
  // 获取路由参数
  const currentBuildingId = route.params.id
  // 是否编辑
  const isEdit = ref(false)
  // 获取当前公房id
  const currentGfIdList = ref(gfIdList.value)
  // 获取当前公房id
  const currentGfid = ref(gfid.value)
  // 获取当前公房信息
  const centerDialogVisible = ref(false)
  // 滚动盒子主体
  const navBox = ref(null)
  // 子盒子路径
  const itemRefs = ref([])
  // 验证 需要红色标识填写
  const rules = computed((): FormRules => {
    if (isEdit.value) {
      return {
        //galpdz: [{ required: true, message: '请输入公安绿牌地址', trigger: 'blur' }],
      }
    }
    return {}
  })
  const ruleFormRef = ref()
  // 处理点击事件
  function handleClick(index, event) {
    phoneTypeIndex.value = index // 更新当前索引

    // 滚动到中间
    if (itemRefs.value[index]) {
      itemRefs.value[index].scrollIntoView({
        behavior: 'smooth', // 平滑滚动
        block: 'center', // 滚动到父容器的中间
        inline: 'center', // 对于水平滚动的情况下，也滚动到中间
      })
    }
  }
  // 表单数据
  const form = ref(optionSetting.value)
  // 提交反馈数据
  let contetForm = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  })
  // 是否显示弹窗
  const dialogFormVisible = ref(false)
  // 提交异常信息

  // 是否显示异常信息弹窗
  const dialogFormVisibleShow = () => {
    contetForm.name = null
    contetForm.region = null
    dialogFormVisible.value = true
  }

  // true 同意 false 驳回
  const apply = ref(true)
  // 审核内容
  const approvalComment = ref('')
  //提交审批
  const approveConfirm = async () => {
    if (!approvalComment.value && !apply.value) return ElMessage.warning('请填写审核意见！')
    await buildOperation(gfid.value, apply ? '审批同意' : '审批拒绝', approvalComment.value)
    centerDialogVisible.value = false
    initData(null)
  }
  const centerDialogVisibleOpen = (value: boolean) => {
    apply.value = value
    centerDialogVisible.value = true
  }

  // removalType
  //选项列表值
  const parent = ref([
    {
      value: '是',
      text: '是',
    },
    {
      value: '否',
      text: '否',
    },
  ])
  const wgcjqklx = ref([
    {
      value: '部分被违规拆除',
      text: '部分被违规拆除',
    },
    {
      value: '整体被违规拆除',
      text: '整体被违规拆除',
    },
  ])
  const shqklx = ref([
    {
      value: '外墙开裂',
      text: '外墙开裂',
    },
    {
      value: '门窗腐朽变形',
      text: '门窗腐朽变形',
    },
    {
      value: '墙体倾斜',
      text: '墙体倾斜',
    },
    {
      value: '外墙渗水',
      text: '外墙渗水',
    },
    {
      value: '屋面不平整',
      text: '屋面不平整',
    },
    {
      value: '其他',
      text: '其他',
    },
  ])

  const xsqkType = ref([
    {
      value: '近三年未修缮',
      text: '近三年未修缮',
    },
    {
      value: '修缮中',
      text: '修缮中',
    },
    {
      value: '近三年完成过修缮',
      text: '近三年完成过修缮',
    },
  ])
  // 上传文件函数
  const handleFileChange = (event, item) => {
    const file = event.target.files[0] // 获取选中的文件
    if (file) {
      console.log('文件地址', file)
      item.imglists.push({
        imgUrl: URL.createObjectURL(file),
      })
      console.log('预览', URL.createObjectURL(file))
    } else {
    }
  }

  // 上传文件函数
  const handleImageChange = (event, name, urlName?: string) => {
    const file = event.target.files[0] // 获取选中的文件
    let zpBase64
    // 创建一个新的 FileReader 对象
    const reader = new FileReader()
    // 读取 File 对象
    reader.readAsDataURL(file)
    // 加载完成后
    reader.onload = function () {
      // 将读取的数据转换为 base64 编码的字符串
      //const base64String = reader.result.split(',')[1]
      zpBase64 = reader.result // base64
      //this.serviceIcon = reader.result;
      // 解析为 Promise 对象，并返回 base64 编码的字符串
      ////resolve('data:image/jpeg;base64,' + base64String)
    }
    // 加载失败时
    reader.onerror = async function (err) {
      //reject(new Error('Failed to load file'))
      console.log(err)
    }
    //let zpBase64

    //const reader = new FileReader();
    //const formData = new FormData()
    //formData.append('image', file)
    //const aBlob = new Blob([file], { type: file.type }) // 指定转换成blob的类型

    if (file) {
      // 文件流地址
      console.log('文件地址', file)
      console.log('name', name)
      console.log('urlName', urlName)
      console.log('zpBase64', zpBase64)
      // console.log('aBlob', aBlob)
      // console.log('formData', formData)
      // URL.createObjectURL(file) 本地预览壁纸
      if (!Array.isArray(form.value.caiJiXQ[name])) {
        form.value.caiJiXQ[name] = []
      }
      //if (urlName) {
      form.value.caiJiXQ[name].push({
        ['url']: URL.createObjectURL(file),
        ['name']: file.name,
        ['file']: zpBase64,
      })
      //} else {
      //form.value.caiJiXQ[name].push(URL.createObjectURL(file))
      //}
      console.log('预览', URL.createObjectURL(file))
    } else {
    }
  }
  const fileToBase64 = (file) => {
    // 创建一个新的 FileReader 对象
    const reader = new FileReader()
    // 读取 File 对象
    reader.readAsDataURL(file)
    // 加载完成后
    reader.onload = function () {
      // 将读取的数据转换为 base64 编码的字符串
      //const base64String = reader.result.split(',')[1]
      return reader.result
      // 解析为 Promise 对象，并返回 base64 编码的字符串
      ////resolve('data:image/jpeg;base64,' + base64String)
    }
    // 加载失败时
    reader.onerror = function (err) {
      //reject(new Error('Failed to load file'))
      return err
    }
  }

  const deleteImage = (name: string, index: number) => {
    form.value.caiJiXQ[name].splice(index, 1)
  }
  /**
   * @description: 编辑状态切换
   * @param {boolean} val
   * @return {*}
   */
  const isEditChange = (val: boolean) => {
    isEdit.value = val
  }
  const baseUrl = ref('')
  const messageText = ref('保存成功')
  const buttonDisabled = ref(false)
  const msgType = ref('')
  const bannerData = ref<any>({})
  const canEdit = ref(false)
  const screamHeight = ref(0)
  const nvueWidth = ref(0)
  interface Tab {
    title: string
    icon: string
    imglists: any
    tooltip: string
    isShowToolTip: boolean
    name: string //唯一标识
    // 其他属性...
  }
  // 标识下标
  const phoneTypeIndex = ref(0)
  const phoneTypeList = ref<Tab[]>([
    {
      title: '建筑名称标识',
      name: 'jianZhumcbs',
      icon: 'Picture',
      imglists: [
        {
          imgUrl: 'https://ccgis.cn/wuyegl/webapi/youligf.picThumb?imgID=9394829591CC',
          name: 'Deer',
        },
        {
          imgUrl: ' https://ccgis.cn/wuyegl/webapi/youligf.picThumb?imgID=9394829591CC',
          name: 'Horse',
        },
        // 更多图片...
      ],
      tooltip: '指建筑物具体名称，如xx小区、xx学校等<br/>，若无标志，拍摄建筑物大门即可',
      isShowToolTip: true,
      // 其他属性...
    },
    {
      title: '公安绿牌',
      name: 'gongAnLP',
      icon: 'Picture',
      imglists: [
        {
          imgUrl: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          name: 'Mountain Lion',
        },
        // 更多图片...
      ],
      tooltip: '',
      isShowToolTip: false,
      // 其他属性...
    },
    {
      title: '外立面',
      name: 'waiLiM',
      icon: 'Picture',
      imglists: [
        {
          imgUrl: 'https://ccgis.cn/wuyegl/webapi/youligf.picThumb?imgID=9394829591CC',
          name: 'Deer',
        },
        {
          imgUrl: 'https://ccgis.cn/wuyegl/webapi/youligf.picThumb?imgID=9394829591CC',
          name: 'Horse',
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          name: 'Mountain Lion',
        },
        // 更多图片...
      ],
      tooltip: '',
      isShowToolTip: false,

      // 其他属性...
    },
    {
      title: '铭牌',
      name: 'mingPai',
      icon: 'Picture',
      imglists: [
        { imgUrl: 'https://example.com/image1.jpg' },
        // 更多图片...
      ],
      tooltip: '',
      isShowToolTip: false,
      // 其他属性...
    },
    {
      title: '产业状态',
      name: 'chanYeZT',
      icon: 'Picture',
      imglists: [
        { imgUrl: 'https://example.com/image1.jpg' },
        // 更多图片...
      ],
      tooltip: '',
      isShowToolTip: false,
      // 其他属性...
    },
    // 更多标签页数据...
  ])

  //跳转定位页面
  const dingWeiDaKa = () => {
    router.push({
      path: '/function-page/Map/BingMap',
    })
  }

  const userInfo: any = computed((): any => {
    return useUserStore().userInfo
  })
  const imgList = ref([[], [], [], [], []])
  onMounted(() => {
    const gfIdListLength = currentGfIdList.value.length
    const currentGfIdListIndex = currentGfIdList.value.findIndex((value) => value === currentGfid.value) + 1
    SettingStore.setGfid('12362')
    gfid.value = route.params.id as string
    screamHeight.value = window.innerHeight
    nvueWidth.value = window.innerWidth
    initData(null)
  })
  const initData = (qianDaosj) => {
    buttonDisabled.value = false
    baseUrl.value = SettingStore.BASE

    try {
      youliCJXQGet(gfid.value)
        .then((res) => {
          console.log(res.data) // 或者其他正确的属性路径
          if (res.data.result != -11) {
            // 在这里处理res
            bannerData.value = res.data.caiJiXQ.data[0]
            canEdit.value = false

            if (bannerData.value.standardState === '采集中' && userInfo.groupName === '外业组员') {
              canEdit.value = true
            }

            // Assign default values
            bannerData.value.IndustrStatus = bannerData.value.IndustrStatus || bannerData.value.IndustrStatusOld
            bannerData.value.fangWuYT = bannerData.value.fangWuYT || bannerData.value.fangWuYTOld
            bannerData.value.shiYongR = bannerData.value.shiYongR || bannerData.value.shiYongROld
            bannerData.value.sfmpqs = bannerData.value.sfmpqs || '是'

            gfid.value = res.data.caiJiXQ.data[0].id

            // Image list adjustment
            const imgListData = [
              res.data.jianZhumcbs.data,
              res.data.gongAnLP.data,
              res.data.waiLiM.data,
              res.data.mingPai.data,
              res.data.chanYeZT.data,
            ]
            imgList.value = imgListData
            // sortImg()
          }
        })
        .catch((error) => {
          console.error('获取数据时出错:', error)
        })
    } catch (err) {
      msgType.value = 'error'
      messageText.value = err.message
    }
  }
  // const save = async (type) => {
  //   let resMsg = ''
  //   let flag = false
  //   let isnotice = false
  //   let noticemsg = ''
  //   try {
  //     imgList.value.forEach((imgitem, imgindex) => {
  //       if (
  //         phoneTypeList.value[imgindex].title === '建筑名称标识' &&
  //         (bannerData.value.xiaoquName === '' || bannerData.value.xiaoquName === null) &&
  //         !(imgitem === null || imgitem.length === 0)
  //       ) {
  //         flag = true
  //         noticemsg = '数据库中未匹配到建筑名称，请勿上传建筑名称标识图片!'
  //         isnotice = true
  //       }
  //       if (phoneTypeList.value[imgindex].title === '公安绿牌') {
  //         imgitem.forEach((item, index) => {
  //           if (item.diZhi === null || item.diZhi === '') {
  //             flag = true
  //             noticemsg = '请填写绿牌对应的地址!'
  //             isnotice = true
  //           }
  //         })
  //       }
  //     })

  //     if (flag) {
  //       throw new Error(noticemsg)
  //     } else {
  //       if (bannerData.value.IndustrStatus !== '正常' && (bannerData.value.desc === '' || bannerData.value.desc === null)) {
  //         isnotice = true
  //         throw new Error('当前产业状态异常 需要填写外业巡查情况备注!')
  //       } else {
  //         buttonDisabled.value = true
  //         uploadState.value = '信息保存中...'

  //         const { data } = await xinXiGX(bannerData.value)
  //         if (data.result !== 1) {
  //           throw new Error('保存失败' + data.msg)
  //         } else {
  //           resMsg = '信息保存成功'
  //           uploadState.value = '信息保存成功...'
  //         }
  //       }

  //       let imgDatas = []
  //       let hasUploadImg = false

  //       imgList.value.forEach((imgPartList, partIndex) => {
  //         if (imgPartList != null) {
  //           imgPartList.forEach((img, imgIndex) => {
  //             if (img.imgID === null || img.imgID === '') {
  //               totalImgCount.value += 1
  //               hasUploadImg = true
  //             }
  //           })
  //         }
  //       })

  //       if (!hasUploadImg && type === '提交') {
  //         uploadState.value = '提交中...'
  //         const { data } = await buildOperation(gfid.value, '提交', '')
  //         if (data.result !== 1) {
  //           throw new Error('提交失败，' + data.msg)
  //         } else {
  //           resMsg = '提交成功'
  //           uploadState.value = '提交成功...'
  //         }
  //       }

  //       if (!hasUploadImg) {
  //         // 如果没有图片需要上传，则不需要执行图片上传逻辑
  //       } else {
  //         // 执行图片上传逻辑
  //         uploadState.value = '图片上传中...'
  //         imguping.value = true

  //         for (const [partIndex, imgPartList] of imgList.value.entries()) {
  //           if (imgPartList != null) {
  //             for (const [imgIndex, img] of imgPartList.entries()) {
  //               if (img.imgID === null || img.imgID === '') {
  //                 const itemImg = {
  //                   gfID: gfid.value,
  //                   fenLei: phoneTypeList[partIndex].type,
  //                   zaopIdx: img.zhaopIdx,
  //                   fileName: img.fileName,
  //                   diZhi: img.diZhi,
  //                   desc: img.desc,
  //                   base64_con: img.picURL,
  //                   wlmlx: img.wlmlx,
  //                   mplx: img.mplx,
  //                 }
  //                 //暂时写死图片上传的返回
  //                 const resImg = { data: { result: 1, msg: '' } }
  //                 //const resImg = await caijiTuPian(itemImg);
  //                 if (resImg.data.result !== 1) throw new Error('图片上传失败，' + resImg.data.msg)
  //                 successImgCount.value++
  //                 uploadpercentage.value = Math.round((100 * successImgCount.value) / totalImgCount.value)
  //               }
  //             }
  //           }
  //         }
  //         uploadState.value = '图片上传成功...'
  //         if (successImgCount.value === totalImgCount.value && type === '提交') {
  //           uploadState.value = '提交中...'
  //           const resFinalSubmit = await buildOperation(bannerData.value.id, '提交', '')
  //           if (resFinalSubmit.data.result !== 1) throw new Error('提交失败，' + resFinalSubmit.data.msg)
  //           resMsg = '提交成功'
  //           uploadState.value = '提交成功...'
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     ElMessage.error(e.message)
  //   } finally {
  //     if (resMsg !== '') {
  //       ElMessage({
  //         showClose: false,
  //         message: resMsg,
  //         type: 'success',
  //         duration: 2000,
  //       })
  //     }
  //     if (!flag) {
  //       isEdit.value = false
  //       initData(null) // 假设initData()方法已定义
  //     }
  //     buttonDisabled.value = false
  //   }
  // }
</script>

<style lang="scss" scoped>
  .collction__navbox::-webkit-scrollbar {
    display: none; /* 隐藏滚动条 */
  }
  .collction {
    width: 100%;
    margin: 10px 20px 80px 20px;
    :deep(.el-timeline) {
      padding: 0 !important;
    }
    &__nav {
      overflow: hidden;
      position: relative;
      height: 30px;
    }
    &__navbox {
      width: 72%;
      height: 30px;
      display: flex;
      overflow-x: scroll;
      position: relative;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* Internet Explorer 10+ */
      > span {
        min-width: 90px;
        text-align: center;
      }
    }
    &__navpostion {
      position: absolute;
    }
    &__navtitle {
      font-size: 13px;
      padding: 5px 5px 10px 0px;
      color: #909399;
      width: 90%;
    }
    &__solid {
      position: absolute;
      width: 90px;
      height: 4px;
      display: flex;
      transition: 0.5s;
      align-items: flex-start;
      justify-content: center;
      bottom: -10px;
      z-index: 9;
      > span {
        width: 30%;
        height: 100%;
        border-radius: 2px;
        background: rgb(5, 121, 255);
      }
    }
    &__box {
      background: #fff;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 12px;
      &__image {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        &__content {
          width: 100px;
          height: 100px;
          margin-right: 5px;
          margin-bottom: 5px;
          border-radius: 5px;
          overflow: hidden;
          position: relative;
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &--close {
            color: red;
            position: absolute;
            top: 2px;
            font-weight: bold;
            right: 2px;
            font-size: 18px;
          }
        }
        &__upload {
          width: 100px;
          height: 100px;
          border-radius: 5px;
          margin-right: 5px;
          margin-bottom: 5px;
          position: relative;
          color: #fff;
          display: flex;
          font-size: 28px;
          font-weight: bold;
          align-items: center;
          justify-content: center;
          background: #ccc;
          &--input {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
          }
        }
      }
      &__timeline {
        padding: 20px 0;
      }
      &__form {
        :deep(.el-form-item__label) {
          font-size: 15px;
          font-weight: bold;
          color: #2c3e50 !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        :deep(.el-form-item--small) {
          margin: 0 !important;
        }
        :deep(.el-form-item__content) {
          margin: 10px 0;
        }
        :deep(.el-select) {
          width: 100%;
          height: 35px;
        }
        :deep(.select-trigger) {
          height: 100%;
        }
        :deep(.el-input) {
          height: 100%;
          font-size: 13px !important;
        }
        :deep(.el-textarea__inner) {
          font-size: 14px !important;
          min-height: 100px !important;
        }
        :deep(.el-input-number) {
          width: 100%;
          height: 35px;
        }
        :deep(.el-input-number__decrease) {
          width: 30px;
          height: 16px;
        }
        :deep(.el-input-number__increase) {
          width: 30px;
          height: 16px;
        }
        &__text {
          color: rgb(153, 153, 153);
          font-size: 14px;
        }
      }
      &__content {
        &__title {
          font-size: 15px;
          font-weight: bold;
        }
        &__text {
          color: rgb(153, 153, 153);
          font-size: 14px;
          padding: 10px 0;
        }
      }
    }
    &__edit {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      // background: #fff;
      padding: 20px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div {
        width: 100%;
        border-radius: 40px;
        height: 40px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: 600;
        > span {
          padding-left: 5px;
        }
      }
      > div:nth-child(2) {
        margin: 0 10px;
      }
      &__pass {
        background: rgb(9, 204, 84);
      }
      &__btn {
        background: rgb(5, 121, 255);
      }
      &__cancel {
        background: #ecf5ff;
        border: 1px solid rgb(5, 121, 255);
        color: rgb(5, 121, 255) !important;
      }
      &__save {
        background: rgb(5, 121, 255);
      }
      &__abnormal {
        background: rgb(255, 5, 5);
      }
    }
  }
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba($color: #000000, $alpha: 0.3);
    z-index: 999;
    &__content {
      width: 70%;
      padding: 0 20px 0 20px;
      background: #fff;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      :deep(.el-textarea__inner) {
        font-size: 14px !important;
        min-height: 100px !important;
      }
      :deep(.el-select) {
        width: 100%;
        height: 35px;
      }
      :deep(.select-trigger) {
        height: 100%;
      }
      :deep(.el-input) {
        height: 100%;
        font-size: 13px !important;
      }
      &__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        height: 50px;
        > div:last-child {
          border-left: 1px solid #f9f9f9;
          color: rgb(5, 121, 255);
        }
        > div {
          flex: 1;
        }
      }
      &--title {
        margin: 0;
        line-height: 60px;
        text-align: center;
        font-size: 15px;
        padding-bottom: 10px;
      }
    }
  }
</style>
