<template>
  <div class="collction">
    <!---------------------------------基础信息模块--------------------------------->
    <div class="collction__box">
      <div class="collction__box__content">
        <div class="collction__box__content__title">
          <span>房屋落点</span>
          <el-icon v-if="MPZform.tdtx && MPZform.tdtx != NULL" :size="20" style="float: right">
            <Location @click="dingWeiDaKa()" color="#00BFFF" />
          </el-icon>
        </div>
        <div class="collction__box__content__text">
          <span></span>
        </div>
      </div>
      <div class="collction__box__content">
        <div class="collction__box__content__title">
          <span>小区名称</span>
        </div>
        <div class="collction__box__content__text">
          <span> {{ MPZform.XiaoQuMC }}</span>
        </div>
      </div>
      <div class="collction__box__content">
        <div class="collction__box__content__title">
          <span>授权地址</span>
        </div>
        <div class="collction__box__content__text">
          <span> {{ MPZform.ShouQuanDZ }}</span>
        </div>
      </div>
      <div class="collction__box__content">
        <div class="collction__box__content__title">
          <span>保护铭牌内容</span>
        </div>
        <div class="collction__box__content__text">
          <span> {{ MPZform.MPNR }}</span>
        </div>
      </div>
      <div class="collction__box__content">
        <div class="collction__box__content__title">
          <span>重点提醒</span>
        </div>
        <div class="collction__box__content__text">
          <span style="color: red"> {{ notemsg1 }}</span>
        </div>
      </div>
    </div>
    <!---------------------------------图片模块------------------------------------->
    <div class="collction__box">
      <div class="collction__box__content">
        <div class="collction__nav">
          <div class="collction__navpostion">
            <div class="collction__navbox" ref="navBox">
              <span
                :ref="(el) => (itemRefs[index] = el)"
                v-for="(item, index) in BImgform"
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
          <div class="collction__box__image__content" v-for="(item, index) in BImgform[phoneTypeIndex].imglists" :key="index">
            <el-image
              style="width: 100px; height: 100px"
              :initial-index="index"
              :preview-src-list="BImgform[phoneTypeIndex].imglists.map((item) => item.imgUrl)"
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
    <!--------------------------------幢异常调查模块--------------------------------->
    <div class="collction__box collction__box__form">
      <div class="collction__box__nav">
        <span style="color: #00bfff" class="collction__box__content__title">幢异常调查信息</span>
        <span :style="isShowForm ? 'color:red' : 'color:#00bfff'" @click="isShowForm = !isShowForm">{{
          !isShowForm ? '展示' : '收起'
        }}</span>
      </div>
      <el-form
        label-position="top"
        require-asterisk-position="right"
        ref="ruleFormRef"
        :model="MPZform"
        style="max-width: 600px"
        label-width="auto"
        :rules="rules"
        :disabled="ycmsg1"
        status-icon
        v-if="isShowForm"
      >
        <el-form-item label="公安绿牌地址" prop="galp">
          <div class="collction__box__form__text">
            <span>{{ MPZform.ShouQuanDZ }}</span>
          </div>
        </el-form-item>
        <el-form-item label="授权房屋类型" prop="fwlx">
          <div class="collction__box__form__text">
            <span>{{ MPZform.FWLX }}</span>
          </div>
        </el-form-item>
        <el-form-item label="上月是否纳入征收" prop="zsqk">
          <div class="collction__box__form__text">
            <span>{{ MPZform.ZSQK }}</span>
          </div>
        </el-form-item>
        <!------------------------------------公安绿牌------------------------------>
        <el-form-item label="当前公安绿牌地址" prop="galpdz">
          <el-input :disabled="ycmsg1" v-model="MPZform.gongAnLP" type="textarea" placeholder="请输入新公安绿牌地址" />
        </el-form-item>
        <el-form-item label="现场公安绿牌照片" prop="shqkphotos">
          <div class="collction__box__image">
            <div
              class="collction__box__image__content"
              v-for="(item, index) in Imgform.find((item) => item.name === 'GPL')?.imglists"
              :key="index"
            >
              <el-image
                style="width: 100px; height: 100px"
                :initial-index="index"
                :preview-src-list="Imgform.find((item) => item.name === 'GPL')?.imglists.map((item) => item.url)"
                :src="item.thumbnailUrl"
                fit="cover"
              />
              <div class="collction__box__image__content--close" v-if="!ycmsg1" @click.stop="deleteImage('公安绿牌', index, false)">
                <el-icon><CircleClose /></el-icon>
              </div>
            </div>
            <div class="collction__box__image__upload">
              <el-icon><Plus /></el-icon>
              <input
                type="file"
                :disabled="ycmsg1"
                class="collction__box__image__upload--input"
                @change="handleImageChange($event, '公安绿牌')"
                accept="image/*"
              />
            </div>
          </div>
        </el-form-item>
        <!------------------------------------损坏情况------------------------------>
        <el-form-item label="损坏情况" prop="shqk">
          <el-select v-model="MPZform.SHQK" :disabled="ycmsg1" multiple placeholder="损坏情况类型">
            <el-option v-for="item in shqklx" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
          <!-- <div class="collction__box__form__text" v-else>
            <span :style="MPZform.SHQK.length != 0 ? 'color:red' : ''">{{ MPZform.SHQK }} </span>
          </div> -->
        </el-form-item>
        <el-form-item label="损坏情况说明" prop="shqksm">
          <el-input v-model="MPZform.SHSM" :disabled="ycmsg1" type="textarea" placeholder="现场损坏情况说明" />
          <!-- <div class="collction__box__form__text" v-else>
            <span style="color: red">{{ MPZform.SHSM }}</span>
          </div> -->
        </el-form-item>
        <el-form-item label="损坏情况照片取证" prop="shqkphotos">
          <div class="collction__box__image">
            <!-- <div
            class="collction__box__image"
            v-if="
              (Imgform.find((item) => item.name === 'SHQK')?.imglists && Imgform.find((item) => item.name === 'SHQK')?.imglists.length) ||
              isEdit
            "
          > -->
            <div
              class="collction__box__image__content"
              v-for="(item, index) in Imgform.find((item) => item.name === 'SHQK')?.imglists"
              :key="index"
            >
              <el-image
                style="width: 100px; height: 100px"
                :initial-index="index"
                :preview-src-list="Imgform.find((item) => item.name === 'SHQK')?.imglists.map((item) => item.url)"
                :src="item.thumbnailUrl"
                fit="cover"
              />
              <div class="collction__box__image__content--close" v-if="!ycmsg1" @click.stop="deleteImage('损坏情况', index, false)">
                <el-icon><CircleClose /></el-icon>
              </div>
            </div>
            <div class="collction__box__image__upload">
              <el-icon><Plus /></el-icon>
              <input
                type="file"
                :disabled="ycmsg1"
                class="collction__box__image__upload--input"
                @change="handleImageChange($event, '损坏情况')"
                accept="image/*"
              />
            </div>
          </div>
          <!-- <div class="collction__box__form__text" v-else>
            <span>暂无</span>
          </div> -->
        </el-form-item>
        <el-progress
          v-if="canDelelt"
          :percentage="percentage"
          :stroke-width="15"
          status="success"
          striped
          striped-flow
          :duration="duration"
        />
        <!---------------------------------征收复核--------------------------------->
        <el-form-item label="征收现状" prop="zsfh">
          <el-select v-model="MPZform.ZSFH" :disabled="ycmsg1" placeholder="当前是否纳入征收">
            <el-option v-for="item in parent" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
          <!-- <div class="collction__box__form__text" v-else>
            <span :style="MPZform.ZSQK != MPZform.ZSFH ? 'color:red' : ''">{{ MPZform.ZSFH }} </span>
          </div> -->
        </el-form-item>
        <el-form-item label="征收复核说明" prop="zsfhsm">
          <el-input v-model="MPZform.ZSFHSM" :disabled="ycmsg1" type="textarea" placeholder="现场征收情况说明" />
          <!-- <div class="collction__box__form__text" v-else>
            <span style="color: red">{{ MPZform.ZSFHSM }}</span>
          </div> -->
        </el-form-item>
        <!---------------------------------修缮情况--------------------------------->
        <el-form-item label="修缮情况" prop="xsqk">
          <el-select v-model="MPZform.XSQK" :disabled="ycmsg1" placeholder="修缮情况">
            <el-option v-for="item in xsqkType" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
          <!-- <div class="collction__box__form__text" v-else>
            <span :style="MPZform.XSQK == '修缮中' ? 'color:red' : ''">{{ MPZform.XSQK }} </span>
          </div> -->
        </el-form-item>
        <el-form-item v-if="MPZform.XSQK == '修缮中'" label="是否有施工许可" prop="xsqk">
          <el-select v-model="MPZform.SGXK" :disabled="ycmsg1" placeholder="是否有施工许可">
            <el-option v-for="item in parent" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
          <!-- <div class="collction__box__form__text" v-else>
            <span :style="MPZform.XSQK == '修缮中' ? 'color:red' : ''">{{ MPZform.XSQK }} </span>
          </div> -->
        </el-form-item>
        <el-form-item label="修缮情况说明" prop="xsqksm">
          <el-input v-model="MPZform.XSQKSM" :disabled="ycmsg1" type="textarea" placeholder="现场修缮情况说明" />
          <!-- <div class="collction__box__form__text" v-else>
            <span style="color: red">{{ MPZform.XSQKSM }}</span>
          </div> -->
        </el-form-item>
        <el-form-item label="修缮情况照片" prop="xsqkphotos">
          <div class="collction__box__image">
            <!-- <div
            class="collction__box__image"
            v-if="
              (Imgform.find((item) => item.name === 'XSQK')?.imglists && Imgform.find((item) => item.name === 'XSQK')?.imglists.length) ||
              isEdit
            "
          > -->
            <div
              class="collction__box__image__content"
              v-for="(item, index) in Imgform.find((item) => item.name === 'XSQK')?.imglists"
              :key="index"
            >
              <el-image
                style="width: 100px; height: 100px"
                :initial-index="index"
                :preview-src-list="Imgform.find((item) => item.name === 'XSQK')?.imglists.map((item) => item.url)"
                :src="item.thumbnailUrl"
                fit="cover"
              />
              <div class="collction__box__image__content--close" v-if="!ycmsg1" @click.stop="deleteImage('修缮情况', index, false)">
                <el-icon><CircleClose /></el-icon>
              </div>
            </div>
            <div class="collction__box__image__upload" v-if="!ycmsg1">
              <el-icon><Plus /></el-icon>
              <input
                type="file"
                class="collction__box__image__upload--input"
                @change="handleImageChange($event, '修缮情况')"
                accept="image/*"
              />
            </div>
          </div>
          <!-- <div class="collction__box__form__text" v-else>
            <span>暂无</span>
          </div> -->
        </el-form-item>
      </el-form>
    </div>
    <!-------------------------------户信息模块-------------------------------------->
    <div class="collction__box collction__box__form">
      <div class="collction__box__nav">
        <span style="color: #00bfff" class="collction__box__content__title">户异常调查信息</span>
      </div>
      <div class="collction__box__scroll">
        <el-row :gutter="20">
          <el-col v-for="(item, index) in Huform" :span="6">
            <el-button
              :type="getButtonType(item)"
              :icon="getButtonIcon(item)"
              round
              class="collction__box__nav1"
              @click.stop="itemisShowForm(item)"
              >{{ item.SH !== '' && item.SH !== undefined ? item.SH : item.CB.slice(-6) }}</el-button
            >
          </el-col>
        </el-row>
      </div>
      <div>
        <!-- <div class="collction__box__nav">
          <span style="text-decoration: underline; color: #00bfff" class="collction__box__content__title"
            >第{{ index + 1 }}户-{{ item.SH }}</span
          >
          <span :style="item.isShowForm == 1? 'color:red' : 'color:#00bfff'" @click="itemisShowForm(item)">{{
            item.isShowForm == 0 ? '展示' : '收起'
          }}</span>
        </div> -->

        <el-form
          label-position="top"
          require-asterisk-position="right"
          ref="ruleFormRef1"
          :model="curHuInfo"
          style="max-width: 600px"
          label-width="auto"
          :rules="rules"
          status-icon
          :disabled="ycmsg1"
          v-if="curHuInfo ? curHuInfo.isShowForm : false"
        >
          <!-- <el-form
          label-position="top"
          require-asterisk-position="right"
          ref="ruleFormRef1"
          :model="curHuInfo"
          style="max-width: 600px"
          label-width="auto"
          :rules="rules"
          status-icon
          v-if="curHuInfo ? curHuInfo.isShowForm : false"
        > -->
          <el-form-item label="室号" prop="sh">
            <div class="collction__box__form__text">
              <span>{{ curHuInfo.SH }}</span>
            </div>
          </el-form-item>
          <el-form-item label="户编号" prop="dyhid">
            <div class="collction__box__form__text">
              <span>{{ curHuInfo.Huid }}</span>
            </div>
          </el-form-item>
          <!---------------------------------------房屋用途---------------------------------------------->
          <el-form-item label="房屋用途" prop="fwyt">
            <div class="collction__box__form__text">
              <span>{{ curHuInfo.FWYT }}</span>
            </div>
          </el-form-item>
          <el-form-item label="当前房屋用途" prop="xfwyt">
            <el-select v-model="curHuInfo.DQFWYT" placeholder="选择房屋用途" style="width: 100%">
              <el-option v-for="item in FWYT" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
            <!-- <div class="collction__box__form__text" v-else>
              <span :style="curHuInfo.FWYT != curHuInfo.DQFWYT ? 'color:red' : ''">{{ curHuInfo.DQFWYT }}</span>
            </div> -->
          </el-form-item>
          <el-form-item label="房屋用途现状照片" prop="fwytphotos">
            <!-- <div
              class="collction__box__image"
              v-if="
                (Imgform.find((item) => item.name === 'FWYT')?.imglists && Imgform.find((item) => item.name === 'FWYT')?.imglists.length) ||
                isEdit
              "
            > -->
            <div class="collction__box__image">
              <div
                class="collction__box__image__content"
                v-for="(item, index) in Imgform.find((item) => item.name === 'FWYT')?.imglists?.filter(
                  (item) => item.Huid === curHuInfo.Huid,
                )"
                :key="index"
              >
                <el-image
                  style="width: 100px; height: 100px"
                  :initial-index="index"
                  :preview-src-list="
                    Imgform.find((item) => item.name === 'FWYT')
                      ?.imglists.filter((item) => item.Huid === curHuInfo.Huid)
                      .map((item) => item.url)
                  "
                  :src="item.thumbnailUrl"
                  fit="cover"
                />
                <div
                  class="collction__box__image__content--close"
                  v-if="!ycmsg1"
                  @click.stop="deleteImage('房屋用途', index, true, curHuInfo)"
                >
                  <el-icon><CircleClose /></el-icon>
                </div>
              </div>
              <div class="collction__box__image__upload" v-if="!ycmsg1">
                <el-icon><Plus /></el-icon>
                <input
                  type="file"
                  class="collction__box__image__upload--input"
                  @change="handleImageChange($event, '房屋用途', curHuInfo)"
                  accept="image/*"
                />
              </div>
            </div>
            <!-- <div class="collction__box__form__text" v-else>
              <span>暂无</span>
            </div> -->
          </el-form-item>
          <!--------------------------破坏情况---------------------------------------->
          <el-form-item label="破坏情况类型" prop="phsy">
            <el-select v-model="curHuInfo.PHSY" placeholder="破坏情况类型" multiple style="width: 100%">
              <el-option v-for="item in pHSYList" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
            <!-- <div class="collction__box__form__text" v-else>
              <span :style="curHuInfo.PHSY ? 'color:red' : ''">{{ curHuInfo.PHSY }}</span>
            </div> -->
          </el-form-item>
          <el-form-item label="破坏情况说明" prop="phqksm">
            <el-input v-model="curHuInfo.PHQK" type="textarea" placeholder="请输入现场破坏情况" />
            <!-- <div class="collction__box__form__text" v-else>
              <span style="color: red">{{ curHuInfo.PHQK }}</span>
            </div> -->
          </el-form-item>
          <el-form-item label="现场破坏照片取证" prop="phqkphotos">
            <!-- <div
              class="collction__box__image"
              v-if="
                (Imgform.find((item) => item.name === 'PHSY')?.imglists && Imgform.find((item) => item.name === 'PHSY')?.imglists.length) ||
                isEdit
              "
            > -->
            <div class="collction__box__image">
              <div
                class="collction__box__image__content"
                v-for="(item, index) in Imgform.find((item) => item.name === 'PHSY')?.imglists?.filter(
                  (item) => item.Huid === curHuInfo.Huid,
                )"
                :key="index"
              >
                <el-image
                  style="width: 100px; height: 100px"
                  :initial-index="index"
                  :preview-src-list="
                    Imgform.find((item) => item.name === 'PHSY')
                      ?.imglists.filter((item) => item.Huid === curHuInfo.Huid)
                      .map((item) => item.url)
                  "
                  :src="item.thumbnailUrl"
                  fit="cover"
                />
                <div
                  class="collction__box__image__content--close"
                  v-if="!ycmsg1"
                  @click.stop="deleteImage('破坏使用', index, true, curHuInfo)"
                >
                  <el-icon><CircleClose /></el-icon>
                </div>
              </div>
              <div class="collction__box__image__upload" v-if="!ycmsg1">
                <el-icon><Plus /></el-icon>
                <input
                  type="file"
                  class="collction__box__image__upload--input"
                  @change="handleImageChange($event, '破坏使用', curHuInfo)"
                  accept="image/*"
                />
              </div>
            </div>
            <!-- <div class="collction__box__form__text" v-else>
              <span>暂无</span>
            </div> -->
          </el-form-item>
          <!--------------------------------搭建违建---------------------------------->
          <el-form-item label="是否搭建违建" prop="djwj">
            <el-select v-model="curHuInfo.DJWJ" placeholder="是否搭建违建" style="width: 100%">
              <el-option v-for="item in parent" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
            <!-- <div class="collction__box__form__text" v-else>
              <span :style="curHuInfo.DJWJ == '是' ? 'color:red' : ''">{{ curHuInfo.DJWJ }}</span>
            </div> -->
          </el-form-item>
          <el-form-item label="搭建违建数量" prop="jcdjwj">
            <el-input-number v-model="curHuInfo.DJWJSL" placeholder="请输入搭建违建的数量" :min="1" :max="999" controls-position="right" />
            <!-- <div class="collction__box__form__text" v-else>
              <span>{{ curHuInfo.DJWJSL }}</span>
            </div> -->
          </el-form-item>
          <el-form-item label="搭建违建说明" prop="djwjsm">
            <el-input v-model="curHuInfo.DJWJSM" type="textarea" placeholder="请输入现场搭建违建情况" />
            <!-- <div class="collction__box__form__text" v-else>
              <span style="color: red">{{ curHuInfo.DJWJSM }}</span>
            </div> -->
          </el-form-item>
          <el-form-item label="搭建违建照片取证" prop="djwjPhotos">
            <!-- <div
              class="collction__box__image"
              v-if="
                (Imgform.find((item) => item.name === 'DJWJ')?.imglists && Imgform.find((item) => item.name === 'PHSY')?.imglists.length) ||
                isEdit
              "
            > -->
            <div class="collction__box__image">
              <div
                class="collction__box__image__content"
                v-for="(item, index) in Imgform.find((item) => item.name === 'DJWJ')?.imglists?.filter(
                  (item) => item.Huid === curHuInfo.Huid,
                )"
                :key="index"
              >
                <el-image
                  style="width: 100px; height: 100px"
                  :initial-index="index"
                  :preview-src-list="
                    Imgform.find((item) => item.name === 'DJWJ')
                      ?.imglists.filter((item) => item.Huid === curHuInfo.Huid)
                      .map((item) => item.url)
                  "
                  :src="item.thumbnailUrl"
                  fit="cover"
                />
                <div
                  class="collction__box__image__content--close"
                  v-if="!ycmsg1"
                  @click.stop="deleteImage('搭建违建', index, true, curHuInfo)"
                >
                  <el-icon><CircleClose /></el-icon>
                </div>
              </div>
              <div class="collction__box__image__upload" v-if="!ycmsg1">
                <el-icon><Plus /></el-icon>
                <input
                  type="file"
                  class="collction__box__image__upload--input"
                  @change="handleImageChange($event, '搭建违建', curHuInfo)"
                  accept="image/*"
                />
              </div>
            </div>
            <!-- <div class="collction__box__form__text" v-else>
              <span>暂无</span>
            </div> -->
          </el-form-item>
          <!-----------------------------------违规拆除------------------------------->
          <el-form-item label="是否违规拆除" prop="wgch">
            <el-select v-model="curHuInfo.WGCH" placeholder="是否存在违规拆除情况">
              <el-option v-for="item in parent" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
            <!-- <div class="collction__box__form__text" v-else>
              <span :style="curHuInfo.WGCH == '是' ? 'color:red' : ''">{{ curHuInfo.WGCH }} </span>
            </div> -->
          </el-form-item>
          <el-form-item label="违规拆除情况" prop="wgchlx">
            <el-select v-model="curHuInfo.WGCHLX" placeholder="违规拆除类型">
              <el-option v-for="item in wgcjqklx" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="违建拆除说明" prop="wgchsm">
            <el-input v-model="curHuInfo.WGCHSM" type="textarea" placeholder="请输入现场违建拆除情况" />
          </el-form-item>
          <el-form-item label="违规拆除照片取证" prop="wgchphotos">
            <!-- <div
              class="collction__box__image"
              v-if="
                (Imgform.find((item) => item.name === 'WGCH')?.imglists && Imgform.find((item) => item.name === 'WGCH')?.imglists.length) ||
                isEdit
              "
            > -->
            <div class="collction__box__image">
              <div
                class="collction__box__image__content"
                v-for="(item, index) in Imgform.find((item) => item.name === 'WGCH')?.imglists?.filter(
                  (item) => item.Huid === curHuInfo.Huid,
                )"
                :key="index"
              >
                <el-image
                  style="width: 100px; height: 100px"
                  :initial-index="index"
                  :preview-src-list="
                    Imgform.find((item) => item.name === 'WGCH')
                      ?.imglists.filter((item) => item.Huid === curHuInfo.Huid)
                      .map((item) => item.url)
                  "
                  :src="item.thumbnailUrl"
                  fit="cover"
                />
                <div
                  class="collction__box__image__content--close"
                  v-if="!ycmsg1"
                  @click.stop="deleteImage('违规拆除', index, true, curHuInfo)"
                >
                  <el-icon><CircleClose /></el-icon>
                </div>
              </div>
              <div class="collction__box__image__upload" v-if="!ycmsg1">
                <el-icon><Plus /></el-icon>
                <input
                  type="file"
                  class="collction__box__image__upload--input"
                  @change="handleImageChange($event, '违规拆除', curHuInfo)"
                  accept="image/*"
                />
              </div>
            </div>
          </el-form-item>
          <!-----------------------------------是否转租------------------------------->
          <el-form-item label="是否转租" prop="zzqk">
            <el-select v-model="curHuInfo.ZZQK" placeholder="是否转租" style="width: 100%">
              <el-option v-for="item in parent" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
            <!-- <div class="collction__box__form__text" v-else>
              <span>{{ curHuInfo.ZZQK }}</span>
            </div> -->
          </el-form-item>
          <el-form-item label="转租情况说明" prop="zzsm">
            <el-input v-model="curHuInfo.ZZSM" type="textarea" placeholder="请输入现场转租情况" />
          </el-form-item>
          <el-form-item label="是否空置" prop="kzqk">
            <el-select v-model="curHuInfo.KZQK" placeholder="是否空置" style="width: 100%">
              <el-option v-for="item in parent" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="空置情况说明" prop="kzsm">
            <el-input v-model="curHuInfo.KZSM" type="textarea" placeholder="请输入现场空置情况" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!---------------------------------建筑历史------------------------------------->
    <!-- <div class="collction__box">
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
    </div> -->
    <!---------------------------------下方按钮模块--------------------------------->
    <div class="collction__edit">
      <div class="collction__edit__btn" @click.stop="dkDialogVisibleShow">
        <el-icon
          v-if="
            (MPZform.tdtxNew == null || MPZform.tdtxNew == '' || MPZform.tdtxNew == undefined) &&
            (MPZform.DaKaJG == null || MPZform.DaKaJG == '' || MPZform.DaKaJG == undefined)
          "
          ><Promotion
        /></el-icon>
        <el-icon v-else><SuccessFilled /></el-icon>
        <span class="collction__edit__btn--text">{{ dkName }}</span>
      </div>
      <div
        :class="{ collction__edit__save: true, disabled: isDisabled && ycmsg1, loading: isLoading }"
        v-if="MPZform.DaKaJG == 0 || MPZform.DaKaJG == 1"
        @click.stop="iseditZC(1)"
      >
        <el-icon v-if="!isLoading"><DocumentChecked /></el-icon>
        <el-icon v-else><Loading /></el-icon>
        <span v-if="!isLoading">保存</span>
        <span v-else>{{ loadingText }}</span>
      </div>
      <div
        :class="{ collction__edit__abnormal: true, disabled: isDisabled && ycmsg1, loading: isLoading }"
        v-if="MPZform.DaKaJG == 0 || MPZform.DaKaJG == 1"
        @click.stop="ycDialogVisibleShow"
      >
        <el-icon><InfoFilled /></el-icon>
        <span>上报</span>
      </div>
    </div>
    <!------------------------------ 异常信息上报弹窗------------------------------->
    <div class="dialog" v-if="ycDialogFormVisible">
      <div class="dialog__content">
        <h3 class="dialog__content--title">上报</h3>
        <el-alert :title="errorReason" type="warning" />
        <div class="dialog__content__footer">
          <div @click.stop="ycDialogFormVisible = false">取消</div>
          <div @click.stop="iseditZC(2)">确定</div>
        </div>
      </div>
    </div>
    <!-------------------------------打卡信息弹窗------------------------------------>
    <div class="dialog" v-if="dkDialogFormVisible">
      <div class="dialog__content">
        <h3 class="dialog__content--title">{{ errDKMessage }}</h3>
        <h3 v-if="contetForm.errorStatus != 0" class="dialog__content--title">{{ contetForm.errorReson }}</h3>
        <el-alert :title="contetForm.errorReson" type="warning" effect="dark" />
        <!-- <div class="dialog__content__box">
          <el-alert :title="contetForm1.errorReson" type="warning" effect="dark" />
          <p>无法打卡原因</p>
          <el-input v-if="contetForm1.errorStatus == 1" v-model="contetForm1.BeiZhu" type="textarea" placeholder="请输入无法打卡原因" />
          <el-select
            v-if="contetForm1.errorStatus == 2"
            style="margin: 5px 0"
            v-model="contetForm1.WFDK"
            placeholder="请输入无法打卡原因类型"
          >
            <el-option label="信号屏蔽" value="信号屏蔽" />
            <el-option label="树木高层遮挡" value="树木高层遮挡" />
            <el-option label="无法进入" value="无法进入" />
            <el-option label="其他原因" value="其他原因" />
          </el-select>
        </div> -->
        <div class="dialog__content__footer">
          <div @click.stop="dkDialogFormVisible = false">取消</div>
          <div @click.stop="dkTJ">确定打卡</div>
        </div>
      </div>
    </div>
    <div class="dialog1" v-if="centerDialogVisible">
      <div class="dialog1__content">
        <h3 class="dialog1__content--title">是否确定删除已经保存的照片</h3>
        <div class="dialog1__content__box">
          <el-alert :title="deleteImgmsg" type="warning" effect="dark" />
        </div>
        <div class="dialog1__content__footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="deleteImg"> 删除 </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, computed, reactive, watch, watchEffect } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useSettingStore } from '@/store/modules/setting'
  import { useUserStore } from '@/store/modules/user'
  import {
    youliCJXQGet,
    buildListinfo1,
    getLocationInfo,
    buildOperation,
    xinXiGX,
    saveTrackInfo,
    editFujian,
    editFujianDel,
    editZC,
    editZCYC,
    buildListinfo,
    getQueryMPZInfo,
  } from '@/api/user'
  import { FormRules } from 'element-plus'
  import { useRoute, useRouter } from 'vue-router'
  import { MoreFilled } from '@element-plus/icons-vue'
  import { ElMessage, ElMessageBox, ElButton, ElIcon } from 'element-plus'
  import { Check, Delete, Edit, Message, Search, Star, CirclePlusFilled } from '@element-plus/icons-vue'
  import { h } from 'vue'
  import { useTagsViewStore } from '@/store/modules/tagsView'
  import ImageCompressor from 'image-compressor.js'

  const router = useRouter()
  const TagsViewStore = useTagsViewStore()
  const visitedViews = computed(() => TagsViewStore.visitedViews)
  const SettingStore = useSettingStore()
  const UserStore = useUserStore()
  const percentage = ref<number>(10)
  const duration = computed(() => Math.floor(percentage.value / 10))
  // 获取数据
  const { MPZInfo, dqZCZT, xcrwXQId, search, HuInfo, ycmsg, ImgInfo, notemsg, BImgInfo, gfIdList, gfid, fWLXList, FWYT, pHSYList } =
    storeToRefs(SettingStore)
  // 引入接口
  const route = useRoute()
  // 获取路由参数
  const currentBuildingId = route.params.id
  // 是否编辑
  const isEdit = ref(false)
  // 获取当前公房id
  const currentGfIdList = ref(gfIdList.value)
  // 定义状态变量
  const isLoading = ref(false)
  // 定义loading加载信息
  const loadingText = ref('数据暂存中...')
  const currentGfid = ref(gfid.value)
  const isDisabled = ref(false) // 控制是否禁用
  // 获取当前公房信息
  const centerDialogVisible = ref(false)
  // 滚动盒子主体
  const navBox = ref(null)
  // 子盒子路径
  const itemRefs = ref([])
  const baseUrl = ref('')
  const messageText = ref('保存成功')
  const buttonDisabled = ref(false)
  const msgType = ref('')
  const bannerData = ref<any>({})
  const canEdit = ref(false)
  const screamHeight = ref(0)
  const nvueWidth = ref(0)
  const huIndex = ref(null)
  const curHuInfo = ref({})
  const canDelelt = ref(false)
  const delName = ref('')
  const delIndex = ref(null)
  const delHu = ref(false)
  const delImgId = ref(null)
  interface Tab {
    title: string
    icon: string
    imglists: any
    tooltip: string
    isShowToolTip: boolean
    name: string //唯一标识
    // 其他属性...
  }

  // 是否显示隐藏
  const isShowForm = ref(true)
  // 幢表单数据
  const MPZform = MPZInfo.value[0]
  // 户表单数据
  const Huform = HuInfo.value
  // 自然幢原照片数据
  const BImgform = BImgInfo.value
  // 房屋异常照片数据

  // 异常标记
  const ycmsg1 = ycmsg.value
  // 提醒信息
  const notemsg1 = notemsg.value

  const Imgform = ImgInfo.value
  const errDKMessage = '是否确定打卡,打卡后将无法重新打卡'
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
  //异常原因表单
  const errorReason = computed(() => {
    let YCQK = 0
    let res = '当前建筑异常情况如下:'

    //幢上的损坏情况异常
    if (MPZform.SHQK && MPZform.SHQK.length > 0) {
      res += '房屋' + MPZform.SHQK.join(',') + '、'
      YCQK = 1
    }
    //幢上的征收情况异常
    if (MPZform.ZSFH != MPZform.ZSQK && MPZform.ZSQK && MPZform.ZSQK != '') {
      res += '征收异样、'
      YCQK = 1
    }
    //幢上的修缮情况异常
    if (MPZform.XSQK == '修缮中' && MPZform.SGXK == '否') {
      res += '无施工许可修缮、'
      YCQK = 1
    }
    //户上的房屋用途异常 FWYT
    if (Huform?.some((item) => item.FWYT !== item.DQFWYT)) {
      res += '户上存在房屋用途异常、'
      YCQK = 1
    }
    if (Huform?.some((item) => item.PHSY && item.PHSY.length > 0)) {
      res += '户上存在破坏情况、'
      YCQK = 1
    }
    if (Huform?.some((item) => item.DJWJ == '是')) {
      res += '户上存在搭建违建 、'
      YCQK = 1
    }
    if (Huform?.some((item) => item.WGCH == '是')) {
      res += '户上存在违规拆除、'
      YCQK = 1
    }
    if (Huform?.some((item) => item.ZZQK == '是')) {
      res += '户上存在转租情况、'
      YCQK = 1
    }
    if (Huform?.some((item) => item.KZQK == '是')) {
      res += '户上存在空置情况、'
      YCQK = 1
    }
    if (YCQK === 1) {
      return res
    } else {
      return '当前建筑不存在异常！'
    }
  })

  onMounted(() => {
    // getQueryMPZInfo().then((res) => {
    //   if (res.data.result <= 0) {
    //     router.push('/login?msgType=error&msg='+res.data.msg)
    //   }
    // })
  })

  const dkName = computed(() => {
    return MPZform.tdtxNew !== '' && MPZform.tdtxNew != null ? '已打卡' : '未打卡'
  })
  const deleteImgmsg = '该照片已经保存到服务器,谨慎删除该照片！'

  const ruleFormRef = ref()
  // 处理点击事件
  function handleClick(index, event) {
    phoneTypeIndex.value = index // 更新当前索引
    console.log('打印', phoneTypeIndex.value)
    // 滚动到中间
    if (itemRefs.value[index]) {
      itemRefs.value[index].scrollIntoView({
        behavior: 'smooth', // 平滑滚动
        block: 'center', // 滚动到父容器的中间
        inline: 'center', // 对于水平滚动的情况下，也滚动到中间
      })
    }
  }
  // 提交反馈数据
  let contetForm = reactive({
    MPZid: '0', //建筑编号
    tdtx: 0, //房屋新位置经度
    tdty: 0, //房屋新位置纬度
    errorStatus: 0,
    errorReson: '', //打卡异常信息
  })
  // 是否显示弹窗
  const ycDialogFormVisible = ref(false)
  const dkDialogFormVisible = ref(false)
  const locX = ''
  const locY = ''
  // 提交异常信息

  // 是否显示异常信息弹窗
  const ycDialogVisibleShow = () => {
    ycDialogFormVisible.value = true
  }
  // 暂存、保存、和上传接口
  const iseditZC = async (num) => {
    //按钮禁用
    isDisabled.value = true
    //按钮显示loading
    isLoading.value = true
    //赋值上传建筑总信息
    let tijiaoList = {}
    //这里进行深拷贝 否则会修改原数据 复制户信息
    let tijiaohuList = JSON.parse(JSON.stringify(Huform))
    tijiaohuList.forEach((item) => {
      //对破坏情况字段 进行拼接
      item.PHSY = item.PHSY.filter((item) => item).join(',') //破坏情况
    })
    let YCQK = 0
    if (MPZform.SHQK && MPZform.SHQK.length > 0) {
      YCQK = 1
    }
    if (MPZform.ZSFH != MPZform.ZSQK && MPZform.ZSQK && MPZform.ZSQK != '') {
      YCQK = 1
    }
    if (MPZform.XSQK == '修缮中' && MPZform.SGXK == '否') {
      YCQK = 1
    }
    if (Huform?.some((item) => item.FWYT !== item.DQFWYT)) {
      YCQK = 1
    }
    if (Huform?.some((item) => item.PHSY.length > 0)) {
      YCQK = 1
    }
    if (Huform?.some((item) => item.DJWJ == '是')) {
      YCQK = 1
    }
    if (Huform?.some((item) => item.WGCH == '是')) {
      YCQK = 1
    }
    if (Huform?.some((item) => item.ZZQK == '是')) {
      YCQK = 1
    }
    if (Huform?.some((item) => item.KZQK == '是')) {
      YCQK = 1
    }
    //复制建筑总数据
    tijiaoList = {
      MPZid: MPZform.MPZid, //公房id
      gongAnLP: MPZform.gongAnLP, //新公安绿牌地址
      SHQK: MPZform.SHQK.filter((item) => item).join(','), //损坏情况
      SHSM: MPZform.SHSM, //损坏说明
      ZSFH: MPZform.ZSFH, //征收复核
      ZSFHSM: MPZform.ZSFHSM, //征收复核说明
      XSQK: MPZform.XSQK, //修缮情况
      SGXK: MPZform.SGXK, //施工许可
      XSQKSM: MPZform.XSQKSM, //修缮情况说明
      Hu: tijiaohuList, //户信息
      SFYC: YCQK == 1 ? '是' : '否',
    }
    //提交自查的接口
    await editZC(tijiaoList)
      .then(async (res) => {
        //如果接口通过
        if (res.data.result === 1) {
          //赋值照片上的属性zcid MPZid
          let zcid = res.data.ZCid
          let MPZid = res.data.MPZid
          //赋值 上传的照片信息列表
          let tijiaoImgList = []
          Imgform.forEach((item) => {
            if (item.imglists && item.imglists.length > 0) {
              item.imglists.forEach((item1) => {
                if (item1.url && item1.url.startsWith('data:image/jpeg;base64')) {
                  tijiaoImgList.push({
                    ZCid: zcid,
                    ZCLeiX: item.name == 'SHQK' ? '幢' : item.name == 'XSQK' ? '幢' : '户',
                    MPZid: MPZid,
                    Huid: item1.Huid,
                    YiChLeiX: item1.zhaopLX,
                    WenJianM: item.name,
                    url: item1.url,
                    thumbnailUrl: item1.thumbnailUrl,
                  })
                }
              })
            }
          })

          //如果存在图片才进行上传图片上传
          if (tijiaoImgList.length > 0) {
            console.log('图片数量', tijiaoImgList.length)
            let count = 0
            loadingText.value = '图片保存中...'
            tijiaoImgList.forEach(async (item) => {
              //图片上传的接口 异步接口
              await editFujian(item)
                .then(async (res) => {
                  if (res.data.result == 1) {
                    count++
                    console.log('countsucc', count)
                    //ElMessage.success(res.data.msg)
                  } else {
                    count++
                    console.log('counterror', count)
                    ElMessage({
                      showClose: true,
                      message: res.data.msg,
                      type: 'error',
                      duration: 0,
                    })
                    //ElMessage.error(res.data.msg)
                  }
                  if (count == tijiaoImgList.length) {
                    console.log('什么时候进入这里')
                    //异常处理
                    if (num == 2) {
                      await editZCYC(MPZform.MPZid).then(async (res) => {
                        if (res.data.result != 1) {
                          isDisabled.value = false
                          isLoading.value = false
                          ElMessage({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error',
                            duration: 0,
                          })
                        } else {
                          //ElMessage.success(res.data.msg)
                          loadingText.value = '信息保存完成！'
                          isDisabled.value = false
                          isLoading.value = false
                          console.log('打印search', search.value)
                          console.log('打印search', search.value.jzName)
                          await buildListinfo().then((res) => {
                            if (res.data.result === 1) {
                              SettingStore.setXiaoQuInfo(res.data.TongJi.data)
                              SettingStore.setXiaoQumsg(res.data.notemsg)
                            } else {
                              ElMessage({
                                showClose: true,
                                message: res.data.msg,
                                type: 'error',
                                duration: 0,
                              })
                            }
                          })
                          await buildListinfo1(xcrwXQId.value, dqZCZT.value, search.value.jzName).then((res) => {
                            if (res.data.result === 1) {
                              let jzList = []
                              res.data.MPZInfo.data.forEach((item) => {
                                jzList.push(item)
                              })
                              SettingStore.setJzList(jzList)
                              TagsViewStore.toLastView(route.path)
                              TagsViewStore.delView(route.path)
                            } else {
                              ElMessage({
                                showClose: true,
                                message: res.data.msg,
                                type: 'error',
                                duration: 0,
                              })
                            }
                          })
                        }
                      })
                    } else {
                      //暂存按钮
                      ElMessage.success('信息保存保存')
                      loadingText.value = '信息保存完成！'
                      isDisabled.value = false
                      isLoading.value = false
                      console.log('打印search', search.value)
                      console.log('打印search', search.value.jzName)
                      await buildListinfo().then((res) => {
                        if (res.data.result === 1) {
                          SettingStore.setXiaoQuInfo(res.data.TongJi.data)
                          SettingStore.setXiaoQumsg(res.data.notemsg)
                        } else {
                          ElMessage({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error',
                            duration: 0,
                          })
                        }
                      })
                      await buildListinfo1(xcrwXQId.value, dqZCZT.value, search.value.jzName).then((res) => {
                        if (res.data.result === 1) {
                          let jzList = []
                          res.data.MPZInfo.data.forEach((item) => {
                            jzList.push(item)
                          })
                          SettingStore.setJzList(jzList)
                          TagsViewStore.toLastView(route.path)
                          TagsViewStore.delView(route.path)
                        } else {
                          ElMessage({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error',
                            duration: 0,
                          })
                        }
                      })
                    }
                  } else {
                    //如果图片数量不对
                    console.log('图片数量不对')
                  }
                })
                .catch((error) => {
                  // 处理错误逻辑
                })
            })
          } else {
            //如果不存在照片的情况 直接进行异常提交接口
            //最后在进行异常提交
            if (num == 2) {
              await editZCYC(MPZform.MPZid).then(async (res) => {
                if (res.data.result != 1) {
                  isDisabled.value = false
                  isLoading.value = false
                  ElMessage({
                    showClose: true,
                    message: res.data.msg,
                    type: 'error',
                    duration: 0,
                  })
                } else {
                  ElMessage.success('信息保存保存')
                  loadingText.value = '信息保存完成！'
                  isDisabled.value = false
                  isLoading.value = false
                  await buildListinfo().then((res) => {
                    if (res.data.result === 1) {
                      SettingStore.setXiaoQuInfo(res.data.TongJi.data)
                      SettingStore.setXiaoQumsg(res.data.notemsg)
                    } else {
                      ElMessage({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error',
                        duration: 0,
                      })
                    }
                  })
                  await buildListinfo1(xcrwXQId.value, dqZCZT.value, search.value.jzName).then((res) => {
                    if (res.data.result === 1) {
                      let jzList = []
                      res.data.MPZInfo.data.forEach((item) => {
                        jzList.push(item)
                      })
                      SettingStore.setJzList(jzList)
                      TagsViewStore.toLastView(route.path)
                      TagsViewStore.delView(route.path)
                    } else {
                      ElMessage({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error',
                        duration: 0,
                      })
                    }
                  })
                }
              })
            } else {
              //暂存图片上传完后的操作
              ElMessage.success('信息保存保存')
              loadingText.value = '信息保存完成！'
              isDisabled.value = false
              isLoading.value = false
              console.log('xcrwXQId', xcrwXQId)
              console.log('dqZCZT', dqZCZT)
              await buildListinfo().then((res) => {
                if (res.data.result === 1) {
                  SettingStore.setXiaoQuInfo(res.data.TongJi.data)
                  SettingStore.setXiaoQumsg(res.data.notemsg)
                } else {
                  ElMessage({
                    showClose: true,
                    message: res.data.msg,
                    type: 'error',
                    duration: 0,
                  })
                }
              })
              await buildListinfo1(xcrwXQId.value, dqZCZT.value, search.value.jzName).then((res) => {
                if (res.data.result === 1) {
                  let jzList = []
                  res.data.MPZInfo.data.forEach((item) => {
                    jzList.push(item)
                  })
                  SettingStore.setJzList(jzList)
                  TagsViewStore.toLastView(route.path)
                  TagsViewStore.delView(route.path)
                } else {
                  ElMessage({
                    showClose: true,
                    message: res.data.msg,
                    type: 'error',
                    duration: 0,
                  })
                }
              })
            }
          }
        } else {
          //接口失败时 显示当前接口错误
          ElMessage({
            showClose: true,
            message: res.data.msg,
            type: 'error',
            duration: 0,
          })
          //取消提交按钮的禁用效果
          isDisabled.value = false
          isLoading.value = false
        }
      })
      .catch((error) => {
        //接口失败时 显示当前接口错误
        ElMessage({
          showClose: true,
          message: error,
          type: 'error',
          duration: 0,
        })
        //取消提交按钮的禁用效果
        isDisabled.value = false
        isLoading.value = false
      })
  }
  // 判断距离建筑距离
  const getDistances = (lat1, lng1, lat2, lng2) => {
    let EARTH_RADIUS = 6378.137 // 地球半径
    let radLat1 = (lat1 * Math.PI) / 180.0 //lat1 * Math.PI / 180.0=>弧度计算
    let radLat2 = (lat2 * Math.PI) / 180.0
    let a = radLat1 - radLat2
    let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * EARTH_RADIUS
    s = Math.round(s * 10000) / 10000 // 输出为公里
    return s * 1000
  }
  // 打卡模块逻辑
  const dkDialogVisibleShow = () => {
    // 如果 不存在打卡记录时
    if (
      (MPZform.tdtxNew == null || MPZform.tdtxNew == undefined || MPZform.tdtxNew == '') &&
      (MPZform.DaKaJG == null || MPZform.DaKaJG == '' || MPZform.DaKaJG == undefined)
    ) {
      //调用定位模块
      if ('geolocation' in navigator) {
        //如果存在位置元素
        navigator.geolocation.getCurrentPosition(
          async function (position) {
            var lat = position.coords.latitude.toFixed(6)
            var lon = position.coords.longitude.toFixed(6)
            var accuracy = position.coords.accuracy

            // 生成一条打卡记录
            contetForm = {
              MPZid: MPZform.MPZid,
              tdty: lon,
              tdtx: lat,
              errorReson: '',
              errorStatus: 0,
            }
            //判断是否超出范围 进行提醒
            if (getDistances(lat, lon, MPZform.tdtX, MPZform.tdtY) > 50) {
              ;(contetForm.MPZid = MPZform.MPZid),
                (contetForm.errorReson = '您当前位置已超过打卡范围,请到达现场重新打卡！如果已经到达现场,直接打卡即可')
              contetForm.errorStatus = 1
            }
            dkDialogFormVisible.value = true
          },
          async function (error) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                ;(contetForm.MPZid = MPZform.MPZid), (contetForm.errorStatus = 1)
                contetForm.errorReson = '用户拒绝了地理位置请求'
                break
              case error.POSITION_UNAVAILABLE:
                ;(contetForm.MPZid = MPZform.MPZid), (contetForm.errorStatus = 1)
                contetForm.errorReson = '位置信息不可用'
                break
              case error.TIMEOUT:
                ;(contetForm.MPZid = MPZform.MPZid), (contetForm.errorStatus = 1)
                contetForm.errorReson = '请求超时'
                break
              case error.UNKNOWN_ERROR:
                ;(contetForm.MPZid = MPZform.MPZid), (contetForm.errorStatus = 1)
                contetForm.errorReson = '发生未知错误'
                break
            }
            dkDialogFormVisible.value = true
          },
          {
            enableHighAccuracy: true,
            timeout: 1000,
            maximumAge: 0,
          },
        )
      } else {
        ;(contetForm.MPZid = MPZform.MPZid), (contetForm.errorReson = '浏览器不支持地理位置')
        contetForm.errorStatus = 1
        dkDialogFormVisible.value = true
      }
    } else if (MPZform.DaKaJG == 1 || MPZform.DaKaJG == 0) {
      //重复提交打卡操作
      ElMessage({
        showClose: true,
        message: '您已进行过打卡操作，请勿重复提交',
        type: 'warning',
      })
    }
  }
  const dkTJ = () => {
    saveTrackInfo(contetForm)
      .then((res) => {
        if (res.data.result == 1) {
          ElMessage({
            showClose: true,
            message: '打卡成功:' + res.data.msg,
            type: 'success',
          })
          dkDialogFormVisible.value = false
          MPZform.tdtxNew = contetForm.tdtx
          MPZform.tdtyNew = contetForm.tdty
          MPZform.DaKaJG = contetForm.errorStatus
          MPZform.DaKaBz = contetForm.errorReson
        } else {
          dkDialogFormVisible.value = false
          ElMessage({
            showClose: true,
            message: '打卡失败,失败原因:' + res.data.msg,
            type: 'error',
          })
        }
      })
      .catch((err) => {})
  }
  //修改按钮颜色
  const getButtonType = (item) => {
    const type = item.isShowForm ? 'primary' : item.FWYT !== item.DQFWYT || item.PHSY ? 'danger' : 'success'
    return type
  }
  const getButtonIcon = (item) => {
    const Icon = item.isShowForm ? 'CirclePlusFilled' : 'Edit'
    return Icon
  }
  const text = ref() //可以根据需要更改不同的文字
  /**
   * canvas添加水印
   * @param {canvas对象} canvas
   * @param {水印文字} text
   */
  const addWatermark = (canvas, text) => {
    const ctx = canvas.getContext('2d')
    ctx.rotate((50 * Math.PI) / 180) // 水印旋转角度
    ctx.font = '40px Vedana'
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'Middle'
    let forIndex = (canvas.width / 100) | 0
    for (let i = -10; i < 10; i++) {
      for (let j = -10; j < forIndex; j++) {
        //绘制多个文字
        ctx.fillText(text, 300 * j, 150 * i + 75)
      }
    }
    return canvas
  }

  /**
   * canvas转成img
   * @param {canvas对象} canvas
   */
  const convasToImg = (canvas) => {
    console.log('canvas转成img')
    // 新建Image对象，可以理解为DOM
    var image = new Image()
    // canvas.toDataURL 返回的是一串Base64编码的URL
    // 指定格式 PNG
    image.src = canvas.toDataURL('image/png')
    console.log('Base64编码的URL', image.src)
    return image.src
  }

  // 图片路径转成canvas
  const imgToCanvas = async (url) => {
    console.log('图片路径转成canvas')
    // 创建img元素
    const img = document.createElement('img')
    img.src = url

    img.setAttribute('crossOrigin', 'anonymous') // 防止跨域
    await new Promise((resolve) => (img.onload = resolve))
    // 创建canvas DOM元素，并设置其宽高和图片一样
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    // 坐标(0,0) 表示从此处开始绘制，相当于偏移。
    canvas.getContext('2d').drawImage(img, 0, 0)
    console.log('canvas', canvas)
    return canvas
  }
  /**
   * base64图片加水印
   * @param {base64图片} imgUrl
   */
  const run = async (imgUrl) => {
    // 1.图片路径转成canvas
    const tempCanvas = await imgToCanvas(imgUrl)
    // 2.canvas添加水印
    const markText = UserStore.userInfo.username
    const canvas = addWatermark(tempCanvas, markText)
    // 3.canvas转成img
    const img = convasToImg(canvas)

    return img
  }

  // 上传文件函数
  const handleImageChange = async (event, name, HuInfo?: Object) => {
    console.log('当前户', HuInfo)
    const file = event.target.files[0] // 获取选中的文件
    if (file) {
      //let base64Url = await ySImage(file)
      let base64Url = await fileToBase64(file)
      //压缩+水印+原图
      const comressBse64 = await compressImage(base64Url, 2000, 0.7, true)
      //缩略图+水印
      const comressThumbBse64 = await compressImage(comressBse64, 200, 0.7, false)
      //console.log("压缩相片类型",file1)
      // 文件流地址
      //let base64Url = await fileToBase64(file)
      //添加水印
      //base64Url = await run(comressBse64)
      //console.log('base64Url2', base64Url)
      // URL.createObjectURL(file) 本地预览壁纸

      if (!Array.isArray(Imgform.find((item) => item.title === name)?.imglists)) {
        Imgform.find((item) => item.title === name).imglists = []
      }

      Imgform.find((item) => item.title === name).imglists.push({
        url: comressBse64,
        Huid: HuInfo && HuInfo !== undefined ? HuInfo.Huid : null,
        thumbnailUrl: comressThumbBse64,
        zhaopLX: name,
        name: file.name,
      })
      //}

      //console.log('预览', URL.createObjectURL(file))
    } else {
    }
  }
  //压缩+水印
  const compressImage = async (base64, maxWidth, quality, withWater) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = base64
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        let width = img.width
        let height = img.height
        console.log('打印照片', width, height)
        // 如果图片宽度大于maxWidth，则按比例缩放
        if (width > maxWidth) {
          height *= maxWidth / width
          width = maxWidth
        }
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)
        //ctx = canvas.getContext('2d')
        //ctx.rotate((50 * Math.PI) / 180) // 水印旋转角度
        ctx.font = '100px Vedana'
        ctx.fillStyle = '#000000'
        //ctx.textAlign = 'center'
        //ctx.textBaseline = 'middle'
        //let forIndex = (canvas.width / 100) | 0
        //for (let i = -10; i < 10; i++) {
        //for (let j = -10; j < forIndex; j++) {
        //绘制多个文字
        withWater && ctx.fillText(UserStore?.userInfo?.username, 100, canvas.height - 100)
        //}
        //}
        // 初步设置quality为传入的参数，后续可根据需要调整
        const newDataURL = canvas.toDataURL('image/jpeg', quality)
        resolve(newDataURL)
      }
    })
  }
  //图片压缩
  function ySImage(file) {
    return new Promise((resolve, reject) => {
      new ImageCompressor(file, {
        quality: 0.2, // 设置压缩质量为0.6，以尽量保持图片质量
        success: (result) => {
          // 调用 convertToBase64 函数并处理返回的 Base64 字符串
          fileToBase64(result)
            .then((base64Data) => {
              //const baseStr = base64Data.split(',')[1]
              console.log('result', base64Data)
              resolve(base64Data)
            })
            .catch((error) => {
              console.log('error', error)
              reject(error)
            })
        },
        error: (e) => {
          reject(e)
        },
      })
    })
  }
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      console.log('aaaaaaa进来')
      const reader = new FileReader()

      // 读取文件成功后触发的回调
      reader.onloadend = () => {
        resolve(reader.result)
      }

      // 读取文件失败时触发的回调
      reader.onerror = (error) => {
        reject(error)
      }

      // 读取文件，result 将包含文件的 Base64 表示
      reader.readAsDataURL(file)
    })
  }

  //删除照片 需要修改相关逻辑
  const deleteImage = (name: string, index: number, Hu: boolean, HuInfo?: Object) => {
    console.log('删除照片', name, index, HuInfo)
    //初步筛选 出 是哪个异常照片
    let foundItem = Imgform.find((item) => item.title === name).imglists
    console.log(foundItem)

    if (HuInfo && Hu) {
      console.log('户照片')
      //找到当前展示户的照片进行操作
      //foundHuItem 是 当前异常类型的照片数组
      //找到其中所有图片的Huid与当前HuInfo.Huid相等的数组
      //也就是当前户的某个异常显示的照片数组
      const foundHuItem = foundItem.filter((item) => item.Huid === HuInfo.Huid)
      console.log('foundHuItem', foundHuItem)
      console.log('foundHuItem', foundHuItem)
      //这里的index 是当前页面真实有效的index可以使用
      if (foundHuItem && foundHuItem[index] && foundHuItem[index].hasOwnProperty('imgId')) {
        console.log(foundHuItem[index].imgId)
        console.log('打开弹窗')
        delName.value = name
        delIndex.value = index
        delHu.value = Hu
        delImgId.value = foundHuItem[index].imgId
        centerDialogVisible.value = true
      } else {
        console.log('imgId 不存在 直接删除')
        let delImgthumbnailUrl = foundHuItem[index].thumbnailUrl
        const indexToDelete = foundItem.findIndex((item) => item.thumbnailUrl == delImgthumbnailUrl)
        console.log(indexToDelete)
        if (indexToDelete !== -1) {
          Imgform.find((item) => item.title === name).imglists.splice(indexToDelete, 1)
        }
      }
    } else {
      console.log('幢照片')
      //如果存在imgId 就删除
      //这里表示当前幢上的异常照片 不需要进行判断 只需要判断是否有imgId即可
      if (foundItem && foundItem[index] && foundItem[index].hasOwnProperty('imgId')) {
        console.log(foundItem[index].imgId)
        console.log('打开弹窗')
        delName.value = name
        delIndex.value = index
        delHu.value = Hu
        delImgId.value = foundItem[index].imgId
        centerDialogVisible.value = true
      } else {
        console.log('imgId 不存在 直接删除')
        foundItem.splice(index, 1)
      }
    }
  }
  //删除照片
  const deleteImg = async () => {
    canDelelt.value = true
    //初步筛选 出 是哪个异常照片
    const foundItem = Imgform.find((item) => item.title === delName.value).imglists
    const timer = setInterval(() => {
      percentage.value += 10
      if (percentage.value > 90) {
        clearInterval(timer)
      }
    }, 500) // 每秒增加10%，10次后进度条达到100%

    await editFujianDel(delImgId.value).then((res) => {
      centerDialogVisible.value = false
      if (res.data.result === 1) {
        percentage.value = 100
        const index = foundItem.findIndex((item) => item.imgId === delImgId.value)
        if (index !== -1) {
          foundItem.splice(index, 1)
        }
        canDelelt.value = false
        percentage.value = 10
        delName.value = ''
        delIndex.value = null
        delHu.value = false
        ElMessage.success('照片删除成功')
      } else {
        percentage.value = 100
        canDelelt.value = false
        percentage.value = 10
        delName.value = ''
        delIndex.value = null
        delHu.value = false
        ElMessage.error(res.data.msg)
      }
    })

    // foundItem.imglists.splice(index, 1)
  }

  //控制户信息的展示
  const itemisShowForm = (item) => {
    console.log(item.isShowForm)
    item.isShowForm = !item.isShowForm
    //切换显示状态
    Huform.forEach((i) => {
      if (i !== item) {
        i.isShowForm = false
      }
    })
    //赋值当前数据
    curHuInfo.value = item
    console.log('当前户信息', curHuInfo.value)
  }

  // 标识下标
  const phoneTypeIndex = ref(0)

  //监测 是否数据有问题
  watchEffect(() => {
    //幢 - 损坏情况 - 多选情况
    const validValues = MPZform.SHQK.filter((value) => shqklx.value.some((item) => item.value === value))

    if (validValues.length !== MPZform.SHQK.length) {
      MPZform.SHQK = validValues
    }

    if (MPZform.SHQK === undefined || MPZform.SHQK === '') {
      MPZform.SHQK = null
    }
    //幢 - 修缮情况 - 单选
    if (
      (MPZform.XSQK && !xsqkType.value.some((item) => item.value === MPZform.XSQK)) ||
      MPZform.XSQK === undefined ||
      MPZform.XSQK === ''
    ) {
      MPZform.XSQK = null
    }
    //幢 - 修缮情况施工许可 - 单选
    if ((MPZform.SGXK && !parent.value.some((item) => item.value === MPZform.SGXK)) || MPZform.SGXK === undefined || MPZform.SGXK === '') {
      MPZform.SGXK = null
    }
    //幢 - 征收现状 - 单选
    if ((MPZform.ZSFH && !parent.value.some((item) => item.value === MPZform.ZSFH)) || MPZform.ZSFH === undefined || MPZform.ZSFH === '') {
      MPZform.ZSFH = null
    }

    //户 - 破坏情况 -多选
    //如果当前存在户并打开户的情况
    if (curHuInfo.value != null && Object.keys(curHuInfo.value).length !== 0) {
      //户 - 破坏情况 -多选
      const valid2Values = curHuInfo.value.PHSY.filter((value) => pHSYList.value.some((item) => item.value === value))

      if (valid2Values.length !== curHuInfo.value.PHSY.length) {
        curHuInfo.value.PHSY = valid2Values
      }

      if (curHuInfo.value.PHSY === undefined || curHuInfo.value.PHSY === '') {
        curHuInfo.value.PHSY = null
      }

      //户 - 是否搭建违建 - 单选
      if (
        (curHuInfo.value.DJWJ && !parent.value.some((item) => item.value === curHuInfo.value.DJWJ)) ||
        curHuInfo.value.DJWJ === undefined ||
        curHuInfo.value.DJWJ === ''
      ) {
        curHuInfo.value.DJWJ = null
      }

      //户 - 是否违规拆除 - 单选
      if (
        (curHuInfo.value.WGCH && !parent.value.some((item) => item.value === curHuInfo.value.WGCH)) ||
        curHuInfo.value.WGCH === undefined ||
        curHuInfo.value.WGCH === ''
      ) {
        curHuInfo.value.WGCH = null
      }

      //户 - 违规拆除情况 - 单选
      if (
        (curHuInfo.value.WGCHLX && !wgcjqklx.value.some((item) => item.value === curHuInfo.value.WGCHLX)) ||
        curHuInfo.value.WGCHLX === undefined ||
        curHuInfo.value.WGCHLX === ''
      ) {
        curHuInfo.value.WGCHLX = null
      }

      //户 - 是否转租 - 单选
      if (
        (curHuInfo.value.ZZQK && !parent.value.some((item) => item.value === curHuInfo.value.ZZQK)) ||
        curHuInfo.value.ZZQK === undefined ||
        curHuInfo.value.ZZQK === ''
      ) {
        curHuInfo.value.ZZQK = null
      }

      //户 - 是否空置 - 单选
      if (
        (curHuInfo.value.KZQK && !parent.value.some((item) => item.value === curHuInfo.value.KZQK)) ||
        curHuInfo.value.KZQK === undefined ||
        curHuInfo.value.KZQK === ''
      ) {
        curHuInfo.value.KZQK = null
      }
    }
  })

  //跳转定位页面
  const dingWeiDaKa = () => {
    router.push({
      path: '/function-page/Map/BingMap',
    })
  }

  onMounted(() => {})
</script>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }

  .isShowForm {
    transition: 2s;
  }
  .collction__navbox::-webkit-scrollbar {
    display: none; /* 隐藏滚动条 */
  }
  .collction {
    // height: 100vh;
    // width: 100vw;
    // overflow-y: auto;
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
      &__scroll {
        max-height: 80px; /* 可以根据需要调整高度 */
        overflow-y: auto;

        padding: 10px;
      }
      &__nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 10px;
      }
      &__nav1 {
        margin-bottom: 10px;
        border-radius: 4px;
        min-height: 36px;
      }
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
      bottom: -20px;
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
        background: rgb(9, 204, 84);
        flex: 1;
      }
      &__btn1 {
        background: rgb(5, 121, 255);
        flex: 2;
      }
      &__cancel {
        background: #ecf5ff;
        border: 1px solid rgb(5, 121, 255);
        color: rgb(5, 121, 255) !important;
        flex: 1;
      }
      &__save {
        flex: 1;
        background: rgb(5, 121, 255);
      }
      &__abnormal {
        background: rgb(255, 5, 5);
        flex: 1;
      }
    }
  }
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none; /* 禁用点击事件 */
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
  .dialog1 {
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
      top: 40%;
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
