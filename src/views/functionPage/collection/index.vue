<template>
  <div class="app-container">
    <div class="app-container-local right-align-inputs">
      <!-- 表单 -->
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" status-icon label-position="left">
        <el-form-item label="打卡定位">
          <el-col :span="20" class="text-center">
            <el-text
              class="mx-1"
              :style="
                ruleForm.caiJiXQ.qianDaoSJ == null ||
                ruleForm.caiJiXQ.qianDaoSJ == '' ||
                (ruleForm.caiJiXQ.descZuoBiao != null && ruleForm.caiJiXQ.descZuoBiao != '')
                  ? 'text-align: right;color:red'
                  : 'text-align: right;'
              "
            >
              &nbsp;
              {{
                ruleForm.caiJiXQ.qianDaoSJ == null || ruleForm.caiJiXQ.qianDaoSJ == ''
                  ? '请先定位打卡'
                  : ruleForm.caiJiXQ.descZuoBiao == null || ruleForm.caiJiXQ.descZuoBiao == ''
                  ? '已定位打卡'
                  : ruleForm.caiJiXQ.descZuoBiao
              }}
            </el-text>
          </el-col>
          <el-col :span="4" class="text-center">
            <el-icon>
              <Location @click="dingWeiDaKa()" color="#999999" />
            </el-icon>
          </el-col>
        </el-form-item>

        <el-form-item label="建筑名称">
          <el-col :span="24" class="text-balck text-df" style="text-align: right">
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.standartName }}
            </el-text>
          </el-col>
        </el-form-item>

        <el-form-item label="授权地址">
          <el-col :span="24" class="text-balck text-df" style="text-align: right">
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.shouQuanDZ }}
            </el-text>
          </el-col>
        </el-form-item>

        <el-form-item label="物业联系人员">
          <el-col :span="24" class="text-balck text-df" style="text-align: right">
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.wyName }}
            </el-text>
          </el-col>
        </el-form-item>

        <el-form-item label="物业联系方式">
          <el-col :span="24" class="text-balck text-df" style="text-align: right">
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.wyPhone }}
            </el-text>
          </el-col>
        </el-form-item>
        <el-form-item label="房屋类型">
          <el-col :span="24" class="text-balck text-df" style="text-align: right">
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.standardType }}
            </el-text>
          </el-col>
        </el-form-item>
        <el-form-item label="原产业状态">
          <el-col :span="24" class="text-balck text-df" style="text-align: right">
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.IndustrStatusOld }}
            </el-text>
          </el-col>
        </el-form-item>

        <el-form-item
          label="当前产业状态"
          v-if="
            isEdit ||
            (ruleForm.caiJiXQ.IndustrStatus != '' &&
              ruleForm.caiJiXQ.IndustrStatus != null &&
              ruleForm.caiJiXQ.IndustrStatus != ruleForm.caiJiXQ.IndustrStatusOld)
          "
          class="demo-uni-row"
          :style="
            ruleForm.caiJiXQ.IndustrStatus != '' &&
            ruleForm.caiJiXQ.IndustrStatus != null &&
            ruleForm.caiJiXQ.IndustrStatus != ruleForm.caiJiXQ.IndustrStatusOld
              ? 'border-left: 2px solid red;'
              : ''
          "
        >
          <el-col :span="24" v-if="isEdit" class="text-balck text-df" style="text-align: center">
            <el-select v-model="ruleForm.caiJiXQ.IndustrStatus" placeholder="Select" style="width: 240px">
              <el-option v-for="item in IndustrStatusList" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
          <el-col
            v-if="!isEdit"
            :span="24"
            class="text-balck text-df"
            :style="
              ruleForm.caiJiXQ.IndustrStatus != '' &&
              ruleForm.caiJiXQ.IndustrStatus != null &&
              ruleForm.caiJiXQ.IndustrStatus != ruleForm.caiJiXQ.IndustrStatusOld
                ? 'text-align: right;color: red'
                : 'text-align: right'
            "
          >
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.IndustrStatus }}
            </el-text>
          </el-col>
        </el-form-item>

        <el-form-item label="原房屋用途">
          <el-col :span="24" class="text-balck text-df" style="text-align: right">
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.fangWuYTOld }}
            </el-text>
          </el-col>
        </el-form-item>

        <el-form-item
          label="当前房屋用途"
          v-if="
            isEdit ||
            (ruleForm.caiJiXQ.fangWuYT != '' &&
              ruleForm.caiJiXQ.fangWuYT != null &&
              ruleForm.caiJiXQ.fangWuYT != ruleForm.caiJiXQ.fangWuYTOld)
          "
          class="demo-uni-row"
          :style="
            ruleForm.caiJiXQ.fangWuYT != '' &&
            ruleForm.caiJiXQ.fangWuYT != null &&
            ruleForm.caiJiXQ.fangWuYT != ruleForm.caiJiXQ.fangWuYTOld
              ? 'border-left: 2px solid red;'
              : ''
          "
        >
          <el-col :span="24" v-if="isEdit" class="text-balck text-df" style="text-align: center">
            <el-select v-model="ruleForm.caiJiXQ.fangWuYT" placeholder="Select" style="width: 240px">
              <el-option v-for="item in fangWuYTList" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
          <el-col
            v-if="!isEdit"
            :span="24"
            class="text-balck text-df"
            :style="
              ruleForm.caiJiXQ.fangWuYT != '' &&
              ruleForm.caiJiXQ.fangWuYT != null &&
              ruleForm.caiJiXQ.fangWuYT != ruleForm.caiJiXQ.fangWuYTOld
                ? 'text-align: right;color: red'
                : 'text-align: right'
            "
          >
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.fangWuYT }}
            </el-text>
          </el-col>
        </el-form-item>

        <el-form-item
          label="建筑现状"
          class="demo-uni-row"
          :style="ruleForm.caiJiXQ.desc2 != '' && ruleForm.caiJiXQ.desc2 != null ? 'border-left: 2px solid red;' : ''"
        >
          <el-col :span="24" v-if="isEdit" class="text-balck text-df" style="text-align: center">
            <el-select v-model="ruleForm.caiJiXQ.desc2" placeholder="Select" style="width: 240px">
              <el-option v-for="item in desc2List" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
          <el-col v-if="!isEdit" :span="24" class="text-balck text-df" style="text-align: right">
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.desc2 }}
            </el-text>
          </el-col>
        </el-form-item>

        <el-form-item
          label="现场是否有铭牌"
          class="demo-uni-row"
          :style="ruleForm.caiJiXQ.sfmpqs != '' && ruleForm.caiJiXQ.sfmpqs != null ? 'border-left: 2px solid red;' : ''"
        >
          <el-col :span="24" v-if="isEdit" class="text-balck text-df" style="text-align: center">
            <el-select v-model="ruleForm.caiJiXQ.sfmpqs" placeholder="Select" style="width: 240px">
              <el-option v-for="item in sfmpqsList" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
          <el-col v-if="!isEdit" :span="24" class="text-balck text-df" style="text-align: right">
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.sfmpqs }}
            </el-text>
          </el-col>
        </el-form-item>

        <el-form-item label="保护铭牌内容">
          <el-col :span="24" class="text-balck text-df" style="text-align: right">
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.bhmpCont }}
            </el-text>
          </el-col>
        </el-form-item>
        <el-form-item label="使用人">
          <el-col :span="24" class="text-balck text-df" style="text-align: right">
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.shiYongROld }}
            </el-text>
          </el-col>
        </el-form-item>

        <el-form-item
          label="现场带看情况"
          class="demo-uni-row"
          :style="ruleForm.caiJiXQ.dkdesc != '' && ruleForm.caiJiXQ.dkdesc != null ? 'border-left: 2px solid red;' : ''"
        >
          <el-col :span="24" v-if="isEdit" class="text-balck text-df" style="text-align: center">
            <el-input v-model="ruleForm.caiJiXQ.dkdesc" style="width: 240px" autosize type="textarea" placeholder="请输入现场带看情况" />
          </el-col>
          <el-col v-if="!isEdit" :span="24" class="text-balck text-df" style="text-align: right">
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.dkdesc }}
            </el-text>
          </el-col>
        </el-form-item>

        <el-form-item
          label="外业巡查情况备注"
          class="demo-uni-row"
          :style="ruleForm.caiJiXQ.desc != '' && ruleForm.caiJiXQ.desc != null ? 'border-left: 2px solid red;' : ''"
        >
          <el-col :span="24" v-if="isEdit" class="text-balck text-df" style="text-align: center">
            <el-input v-model="ruleForm.caiJiXQ.desc" style="width: 240px" autosize type="textarea" placeholder="请输入现场带看情况" />
          </el-col>
          <el-col v-if="!isEdit" :span="24" class="text-balck text-df" style="text-align: right">
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.desc }}
            </el-text>
          </el-col>
        </el-form-item>

        <el-form-item label="审核意见" v-if="ruleForm.caiJiXQ.descShenHe != null && ruleForm.caiJiXQ.descShenHe != ''">
          <el-col :span="24" class="text-balck text-df" style="text-align: right">
            <el-text class="mx-1">
              {{ ruleForm.caiJiXQ.descShenHe }}
            </el-text>
          </el-col>
        </el-form-item>
        <br /><br /><br />
      </el-form>

      <!-- 图片模块 -->
      <div>
        <el-tabs type="border-card" class="demo-tabs">
          <el-tab-pane v-for="(tab, index) in phoneTypeList" :key="index">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon>
                  <component :is="tab.icon" />
                </el-icon>
                <span>{{ tab.title }}</span> </span
              >&nbsp;
              <!-- 动态判断是否展示tooltip -->
              <el-tooltip
                v-if="tab.isShowToolTip"
                class="box-item"
                effect="dark"
                :content="tab.tooltip"
                :disabled="!tab.isShowToolTip"
                placement="bottom"
                show-arrow="false"
                raw-content="true"
              >
                <el-icon>
                  <InfoFilled />
                </el-icon>
              </el-tooltip>
            </template>
            <el-row class="uploader-item" :gutter="20">
              <el-progress :text-inside="true" :stroke-width="20" :percentage="uploadpercentage" status="exception">
                <span>Content</span>
              </el-progress>
              <Upload
                :maxCount="10"
                :error-info="errorInfo"
                :before-upload="onBeforeUpload"
                v-model:fileList="ruleForm[tab.name]"
                @change="onChange"
                @remove="onRemove"
              />

              <!-- <Upload
                multiple
                :maxCount="5"
                :error-info="errorInfo"
                :before-upload="onBeforeUpload"
                upload-mode="custom"
                :custom-request="onCustomRequest"
                v-model:fileList="ruleForm[tab.name]"
                @change="onChange"
                @remove="onRemove"
              /> -->

              <!-- 
              <Upload multiple :maxCount="3" v-model:fileList="ruleForm[tab.name]" /> -->
              <!-- <imgPreDelUpload :count="6" :imageList="ruleForm[tab.name]"></imgPreDelUpload> -->
              <!-- <el-upload
                ref="uploadRef"
                action="#"
                list-type="picture-card"
                :on-success="handleSuccess"
                :file-list="fileList"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :on-change="handleChange"
                :auto-upload="false"
              >
                <el-icon>
                  <Plus />
                </el-icon>
              </el-upload> -->

              <!-- <view>
                <view class="example-body">
                  <cc-imgPreDelUpload style="visibility: hidden; height: 1px; width: 1px"></cc-imgPreDelUpload>
                  <view v-for="(item, theindex) in phoneTypeList" :key="theindex" :data-id="theindex">
                    <cc-imgPreDelUpload
                      v-if="TabCur == theindex"
                      :isEdit="isEdit"
                      :shouQuanDZ="bannerData.shouQuanDZ"
                      :canEdit="canEdit"
                      :baseUrl="baseUrl"
                      :count="6"
                      :currentType="item.type"
                      :percentage="percentage[theindex]"
                      :lodingImg="lodingImg[theindex]"
                      :imageList="imgList[theindex]"
                    ></cc-imgPreDelUpload>
                  </view>
                </view>
              </view> -->

              <!-- <el-upload
                v-model="ruleForm[tab.name]"
                :action="fileUrl"
                accept="image/jpg,image/jpeg,image/png"
                list-type="picture-card"
                :limit="9"
                :on-success="handleSuccess"
                :before-upload="beforeAvatarUpload"
                :before-remove="() => true"
                :file-list="imageList"
              >
                <template #file="{file }">
                  <div class="image-container">
                    <img :src="file.fileUrl" alt="" class="image" />
                    <el-input>{{ file.imageExplain }}</el-input>
                  </div>
                </template> 
                <div slot="file" slot-scope="{ file }">
                  <img class="el-upload-list__item-thumbnail" :src="ruleForm[tab.name].fileUrl" alt="" />
                  <el-input v-model="ruleForm[tab.name].imageExplain" placeholder="图片说明" clearable> </el-input>
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(ruleForm[tab.name])">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-delete" @click="handleRemove(ruleForm[tab.name], imageList)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              预览的图片弹框
              <el-dialog class="review-dialog" append-to-body :visible.sync="imgDialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog> -->

              <!-- <el-dialog v-model="dialogVisible" top="25vh" width="98%">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%" />
              </el-dialog> -->
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- 审核模块 -->
      <div v-if="userInfo.groupName == '外业管理员' && bannerData.standardState == '待审核'" style="">
        <div style="height: auto; overflow: auto; border-bottom: none; border-top: 6px solid #e3e4e5" class="itemCloum" title="">
          <uni-card style="height: auto; margin: 0" title="">
            <uni-easyinput v-model="approvalComment" type="textarea" placeholder="请录入审核意见:" />
            <view class="" style="text-align: center; padding-top: 5rpx">
              <uni-row class="demo-uni-row" style="">
                <uni-col :span="12" class="text-grey">
                  <button @click="approveRefuse()" class="mini-btn" style="background-color: red; color: white" size="mini">驳回</button>
                </uni-col>
                <uni-col :span="12" class="text-balck text-df" style="text-align: center">
                  <button @click="approveConfirm()" class="mini-btn" style="" size="mini">通过</button>
                </uni-col>
              </uni-row>
            </view>
          </uni-card>
        </div>
      </div>
    </div>
  </div>
  <div class="button-sp-area foot-button" style="position: fixed; bottom: 0px; width: 100%; background: #fafafa">
    <el-row v-if="isEdit">
      <el-col :span="2" />
      <el-col :span="6">
        <el-button class="mini-btn" @click="cancle()">取消</el-button>
      </el-col>
      <el-col :span="8">
        <el-button @click="save('')" class="mini-btn">暂存</el-button>
      </el-col>
      <el-col :span="6">
        <el-button class="mini-btn" @click="save('提交')">保存并提交</el-button>
      </el-col>
      <el-col :span="2" />
    </el-row>
    <el-row v-if="!isEdit">
      <el-col :span="8"></el-col>
      <el-col :span="8">
        <el-button @click="editDetail()" class="mini-btn">编辑</el-button>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, ref, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import type { FormInstance, FormRules, ElUpload, ElIcon, ElDialog, UploadFile } from 'element-plus'
  import { ElMessage, ElMessageBox } from 'element-plus'

  import { Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue'
  // 在这里引入接口
  import { youliCJXQGet, getLocationInfo, buildOperation, xinXiGX } from '@/api/user'
  import { useSettingStore } from '@/store/modules/setting'
  import imgPreDelUpload from './components/imgPreDelUpload.vue'
  import Upload from './components/Upload.vue'
  import { rafTimeout, cancelRaf } from './components/utils'
  import {
    validatorMethod,
    verifyPhone,
    verifyTextColor,
    verifyIdCard,
    verifyWebsite,
    verifyHtml,
    verifyDate,
    verifyEmail,
  } from '@/utils/validate'
  interface Tab {
    title: string
    icon: string
    imglists: any
    tooltip: string
    isShowToolTip: boolean
    name: string //唯一标识
    // 其他属性...
  }

  interface FileType {
    name?: string // 文件名
    url: any // 文件地址
    desc:string //描述
    [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
  }
  const SettingStore = useSettingStore()
  const saveSub = () => {
    // 文件上传成功时的处理逻辑
    console.log('File success:', fileList1)
  }
  let fileUrl = '/api//wuyegl/webapi/youligf.picUpload' //图片文件上传地址
  const imageList = ref([])
  let fileList1 = []
  let imgDialogVisible = false
  let dqzhaopye = 'jianZhumcbs'
  let errorInfo = ref('') // 上传错误提示信息
  const fileList = ref([]) // 存储上传的文件列表
  const uploadRef = ref<InstanceType<typeof ElUpload>>() // 存储上传组件的引用

  const handleSuccess = (res, file, fileList) => {
    // 文件上传成功时的处理逻辑
    // console.log('File success:', response, file, fileList)
    console.log(res)
    console.log(file)
    if (res.result !== 1 && res.result.url) {
      ruleForm[dqzhaopye].push({
        fileUrl: file.url, //图片渲染路径
        imageUrl: res.result.url, //要上传的路径
        imageExplain: '', //要上传的图片说明
      })
    }
  }

  const onBeforeUpload = (file: File) => {
    console.log(file)
    const acceptTypes = ['image/jpg', 'image/jpeg', 'image/png']
    if (file.size > 10000 * 1024) {
      // 文件大于 1000KB 时取消上传
      errorInfo.value = '文件必须小于10M'
      return false
    }
    if (!acceptTypes.includes(file.type)) {
      // 继续上传
      errorInfo.value = '只能上传jpg、jpeg、png、pdf格式的文件'
      return false // 停止上传
    }
    return true
  }

  const onCustomRequest = (file: File) => {
    return new Promise((resolve, reject) => {
      rafTimeout(() => {
        // 模拟接口调用返回name和url
        // if (file.type === 'application/pdf') {
        //   var res = {
        //     name: 'Markdown.pdf',
        //     url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/Markdown.pdf',
        //   }
        // } else {
        //   var res = {
        //     name: '1.jpg',
        //     url: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/1.jpg',
        //   }
        // }
        console.log('111',file)
        console.log(ruleForm)
        var res = {
          name: file.name,
          url: URL.createObjectURL(file),
        }
        if (res) {
          resolve(res)
        } else {
          reject('upload request fail ...')
        }
      }, 200)
    })
  }

  const onChange = (files: FileType[]) => {
    console.log('change:', files)
    console.log(ruleForm)
  }
  const onRemove = (file: FileType) => {
    console.log('remove:', file)
  }

  const handleRemove = (file, fileList) => {
    // 文件移除时的处理逻辑
    console.log('File removed:', file, fileList)
  }
  //预览
  const handlePictureCardPreview = (file) => {
    dialogImageUrl = file.fileUrl
    imgDialogVisible = true
  }

  const handleExceed = (file, fileList) => {
    // 文件预览时的处理逻辑
    console.log('File removed:', file, fileList)
  }
  const handlePreview = (file) => {
    // 文件预览时的处理逻辑
    console.log('File preview:', file)
  }

  const handleChange = (file, fileList) => {
    // 文件状态改变时的处理逻辑
    console.log('File changed:', file, fileList)
    // 在这里更新fileList响应式引用
    fileList.value = [fileList.value, file]
    fileList1.push(file)
  }

  // 手动调用上传组件的submit方法
  const submitUpload = () => {
    if (uploadRef.value) {
      uploadRef.value.submit()
    }
  }

  const tabChange = (tab) => {
    console.log(tab)
  }
  const dialogImageRemark = ref('')
  let dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  const disabled = ref(false)

  const router = useRouter()
  const route = useRoute()
  const currentBuildingId = route.params.id

  const phoneTypeList = ref<Tab[]>([
    {
      title: '建筑名称标识',
      name: 'jianZhumcbs',
      icon: 'Picture',
      imglists: [
        {
          imgUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          name: 'Deer',
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
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
          imgUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          name: 'Deer',
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
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
  const beforeAvatarUpload = (file) => {
    const isJPG = ['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)
    const isLt10M = file.size / 1024 / 1024 < 10
    if (!isJPG) {
      ElMessage.error('上传头像图片只能是 JPG/PNG 格式!')
    }
    if (!isLt10M) {
      ElMessage.error('上传头像图片大小不能超过 10MB!')
    }
    return isJPG && isLt10M
  }

  const ruleFormRef = ref<FormInstance>()
  const ruleForm = SettingStore.optionSetting

  const rules = reactive<FormRules>({
    phone: [
      {
        required: true,
        validator: validatorMethod(verifyPhone, '请输入正确的手机号'),
        trigger: ['blur', 'change'],
      },
    ],
    idCard: [
      {
        required: true,
        validator: validatorMethod(verifyIdCard, '请输入正确的身份证'),
        trigger: ['blur', 'change'],
      },
    ],
    website: [
      {
        required: true,
        validator: validatorMethod(verifyWebsite, '请输入正确的网址'),
        trigger: ['blur', 'change'],
      },
    ],
    html: [
      {
        required: true,
        validator: validatorMethod(verifyHtml, '请输入正确的html标签'),
        trigger: ['blur', 'change'],
      },
    ],
    date: [
      {
        required: true,
        validator: validatorMethod(verifyDate, '请输入正确的日期'),
        trigger: ['blur', 'change'],
      },
    ],
    email: [
      {
        required: true,
        validator: validatorMethod(verifyEmail, '请输入正确的邮箱'),
        trigger: ['blur', 'change'],
      },
    ],
  })

  import { useUserStore } from '@/store/modules/user'

  //选项列表值
  const sfmpqsList = ref([
    {
      value: '是',
      text: '是',
    },
    {
      value: '否',
      text: '否',
    },
  ])

  const desc2List = ref([
    {
      value: '',
      text: '无',
    },
    {
      value: '缺绿牌',
      text: '缺绿牌',
    },
    {
      value: '多绿牌',
      text: '多绿牌',
    },
  ])

  const fangWuYTList = ref([
    {
      value: '非居住办公用房',
      text: '非居住办公用房',
    },
    {
      value: '非居住生产用房',
      text: '非居住生产用房',
    },
    {
      value: '非居住营业用房',
      text: '非居住营业用房',
    },

    {
      value: '非居住办公用房、非居住生产用房',
      text: '非居住办公用房、非居住生产用房',
    },
    {
      value: '非居住生产用房、非居住营业用房',
      text: '非居住生产用房、非居住营业用房',
    },
    {
      value: '非居住营业用房、非居住办公用房',
      text: '非居住营业用房、非居住办公用房',
    },

    {
      value: '居住用房',
      text: '居住用房',
    },
  ])

  const IndustrStatusList = ref([
    {
      value: '正常',
      text: '正常',
    },
    {
      value: '已列入征收',
      text: '已列入征收',
    },
    {
      value: '已灭失',
      text: '已灭失',
    },
  ])
  // Pinia存储
  //当前公房Id
  const currentGfid = ref(SettingStore.gfid)
  //公房Id列表
  const currentGfIdList = ref(SettingStore.gfIdList)

  //其他变量

  // 定义响应式数据
  const uploadState = ref('')
  const imguping = ref(false)
  const totalImgCount = ref(0)
  const successImgCount = ref(0)
  const failedImgCount = ref(0)
  const uploadpercentage = ref(0)
  const buttonDisabled = ref(false)
  const lastpagezoom = ref(14)
  const lastpagecenterX = ref(31.24534249284188)
  const lastpagecenterY = ref(121.47915601730348)
  const currentgfIdListindex = ref(1)
  const gfIdListlength = ref(1)
  const approvalComment = ref('')
  const approvalStatus = ref('')
  const canEdit = ref(false)
  const userInfo = useUserStore().userInfo as any
  const baseUrl = ref('')
  const lodingImg = ref([])
  const TabCur = ref(0)
  const gfid = ref('')
  const scrollLeft = ref(0)
  const percentage = ref([[], [], [], [], []])
  const imgList = ref([[], [], [], [], []])
  const imgListPre = ref('')
  const tooltipVisible = ref(false)
  const currentTooltipText = ref('')
  const tooltipPosition = ref({ left: 0, top: 0 })
  const delIndex = ref(null)
  const choosedIndex = ref(0)
  const screamHeight = ref(0)
  const msgType = ref('')
  const messageText = ref('保存成功')
  const value2 = ref(0)
  const value = ref(['0', '1'])
  const value1 = ref(['1'])
  let isEdit = true
  const nvueWidth = ref(0)
  const qianDaoSJ = ref(null)
  const currentTabIndex = ref(0)
  const bannerData = ref({}) as any
  const addressListsStr = ref('')
  const bannerDataPre = ref('')
  const scroll = ref(0)
  const pagefrom = ref(0)
  const qu = ref('')
  const jieZhen = ref('')
  const xiaoQu = ref('')
  const isback = ref(false)
  //页面传输参数
  const optionSetting = ref(SettingStore.optionSetting)

  onMounted(() => {
    const gfIdListLength = currentGfIdList.value.length
    const currentGfIdListIndex = currentGfIdList.value.findIndex((value) => value === currentGfid.value) + 1

    SettingStore.setGfid('12362')
    console.log('currentGfid', currentGfid)
    console.log('optionSetting', optionSetting)
    console.log('gfid', gfid)

    console.log('param', route.params)
    gfid.value = route.params.id as string
    console.log('ingfid', gfid)
    screamHeight.value = window.innerHeight
    nvueWidth.value = window.innerWidth
    console.log('nvueWidth', nvueWidth.value)
    console.log('screamHeight', screamHeight.value)
    console.log('nvueWidth', nvueWidth.value)
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
            sortImg()
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

  // Function to sort images (assuming it's defined elsewhere or inline)
  //排序
  const sortImg = () => {
    imgList.value.forEach(function (item, index) {
      item.sort(function (a, b) {
        if (a.zhaopIdx < b.zhaopIdx) {
          return -1
        }
        if (a.zhaopIdx > b.zhaopIdx) {
          return 1
        }
        return 0
      })
    })
  }

  //跳转页面
  const back = () => {
    isback.value = true
    if (pagefrom.value == 1) {
      SettingStore.setOptionSetting({ key: 'qu', val: qu.value })

      SettingStore.setOptionSetting({ key: 'jieZhen', val: jieZhen.value })
      SettingStore.setOptionSetting({ key: 'xiaoQu', val: xiaoQu.value })
      SettingStore.setOptionSetting({ key: 'lastpagezoom', val: lastpagezoom.value })
      SettingStore.setOptionSetting({ key: 'lastpagecenterX', val: lastpagecenterX.value })
      SettingStore.setOptionSetting({ key: 'lastpagecenterY', val: lastpagecenterY.value })

      router.push({
        path: '/form/validateForm',
        query: {
          id: '',
        },
      })
    } else {
      SettingStore.setOptionSetting({ key: 'currentTabIndex', val: currentTabIndex })

      router.push({
        path: '/form/validateForm',
        query: {
          id: '',
        },
      })
    }
  }

  //跳转定位页面
  const dingWeiDaKa = () => {
    isback.value = true

    router.push({
      path: '/ReSenCompar3',
      query: {
        id: '',
      },
    })
  }

  //打开编辑页面
  const editDetail = () => {
    if (canEdit.value) {
      //imgListPre.value = JSON.stringify(imgList.value);
      //bannerDataPre.value = JSON.stringify(bannerData.value);
      isEdit = true
      buttonDisabled.value = false
    }
  }
  //关闭编辑页面
  const cancle = () => {
    isEdit = false
    console.log(imgListPre.value)
    console.log(bannerDataPre.value)
    //imgList.value = JSON.parse(imgListPre.value);
    //bannerData.value = JSON.parse(bannerDataPre.value);
  }
  const dialogClose = () => {}

  //提交审批确认
  const approveConfirm = () => {
    buildOperation(gfid.value, '审批同意', approvalComment.value)
      .then((res) => {
        console.log(res.data) // 或者其他正确的属性路径
        // 在这里处理res
        if (res.data.result != 1) {
          msgType.value = 'error'
          messageText.value = res.data.msg
        }
        initData(null)
        //this.back();
      })
      .catch((error) => {
        console.error('获取数据时出错:', error)
        msgType.value = 'error'
        messageText.value = error
        ElMessage.error(messageText.value)
      })
  }
  //提交审批拒绝
  const approveRefuse = () => {
    //console.log(this.approvalComment)
    if (approvalComment.value == null || approvalComment.value == '') {
      //console.log(approvalComment)
      msgType.value = 'error'
      messageText.value = '请填写审核意见！'
      ElMessage.warning(messageText.value)
    } else {
      buildOperation(gfid.value, '审批拒绝', approvalComment.value)
        .then((res) => {
          console.log(res.data) // 或者其他正确的属性路径
          // 在这里处理res
          ////console.log("领取还是放弃还是审核还是撤回", res)
          if (res.data.result != 1) {
            msgType.value = 'error'
            messageText.value = res.data.msg
          }
          initData(null)
          //back();
        })
        .catch((error) => {
          console.error('获取数据时出错:', error)
          msgType.value = 'error'
          messageText.value = error
          ElMessage.error(messageText.value)
        })
      // ElMessageBox.confirm('Are you sure to close this dialog?')
      // .then(() => {

      // })
      // .catch(() => {
      //   // catch error
      // })
    }
  }

  // 方法
  const save = async (type) => {
    let resMsg = ''
    let flag = false
    let isnotice = false
    let noticemsg = ''
    try {
      imgList.value.forEach((imgitem, imgindex) => {
        if (
          phoneTypeList.value[imgindex].title === '建筑名称标识' &&
          (bannerData.value.xiaoquName === '' || bannerData.value.xiaoquName === null) &&
          !(imgitem === null || imgitem.length === 0)
        ) {
          flag = true
          noticemsg = '数据库中未匹配到建筑名称，请勿上传建筑名称标识图片!'
          isnotice = true
        }
        if (phoneTypeList.value[imgindex].title === '公安绿牌') {
          imgitem.forEach((item, index) => {
            if (item.diZhi === null || item.diZhi === '') {
              flag = true
              noticemsg = '请填写绿牌对应的地址!'
              isnotice = true
            }
          })
        }
      })

      if (flag) {
        throw new Error(noticemsg)
      } else {
        if (bannerData.value.IndustrStatus !== '正常' && (bannerData.value.desc === '' || bannerData.value.desc === null)) {
          isnotice = true
          throw new Error('当前产业状态异常 需要填写外业巡查情况备注!')
        } else {
          buttonDisabled.value = true
          uploadState.value = '信息保存中...'

          const { data } = await xinXiGX(bannerData.value)
          if (data.result !== 1) {
            throw new Error('保存失败' + data.msg)
          } else {
            resMsg = '信息保存成功'
            uploadState.value = '信息保存成功...'
          }
        }

        let imgDatas = []
        let hasUploadImg = false

        imgList.value.forEach((imgPartList, partIndex) => {
          if (imgPartList != null) {
            imgPartList.forEach((img, imgIndex) => {
              if (img.imgID === null || img.imgID === '') {
                totalImgCount.value += 1
                hasUploadImg = true
              }
            })
          }
        })

        if (!hasUploadImg && type === '提交') {
          uploadState.value = '提交中...'
          const { data } = await buildOperation(gfid.value, '提交', '')
          if (data.result !== 1) {
            throw new Error('提交失败，' + data.msg)
          } else {
            resMsg = '提交成功'
            uploadState.value = '提交成功...'
          }
        }

        if (!hasUploadImg) {
          // 如果没有图片需要上传，则不需要执行图片上传逻辑
        } else {
          // 执行图片上传逻辑
          uploadState.value = '图片上传中...'
          imguping.value = true

          for (const [partIndex, imgPartList] of imgList.value.entries()) {
            if (imgPartList != null) {
              for (const [imgIndex, img] of imgPartList.entries()) {
                if (img.imgID === null || img.imgID === '') {
                  const itemImg = {
                    gfID: gfid.value,
                    fenLei: phoneTypeList[partIndex].type,
                    zaopIdx: img.zhaopIdx,
                    fileName: img.fileName,
                    diZhi: img.diZhi,
                    desc: img.desc,
                    base64_con: img.picURL,
                    wlmlx: img.wlmlx,
                    mplx: img.mplx,
                  }
                  //暂时写死图片上传的返回
                  const resImg = { data: { result: 1, msg: '' } }
                  //const resImg = await caijiTuPian(itemImg);
                  if (resImg.data.result !== 1) throw new Error('图片上传失败，' + resImg.data.msg)
                  successImgCount.value++
                  uploadpercentage.value = Math.round((100 * successImgCount.value) / totalImgCount.value)
                }
              }
            }
          }
          uploadState.value = '图片上传成功...'
          if (successImgCount.value === totalImgCount.value && type === '提交') {
            uploadState.value = '提交中...'
            const resFinalSubmit = await buildOperation(bannerData.value.id, '提交', '')
            if (resFinalSubmit.data.result !== 1) throw new Error('提交失败，' + resFinalSubmit.data.msg)
            resMsg = '提交成功'
            uploadState.value = '提交成功...'
          }
        }
      }
    } catch (e) {
      ElMessage.error(e.message)
    } finally {
      if (resMsg !== '') {
        ElMessage({
          showClose: false,
          message: resMsg,
          type: 'success',
          duration: 2000,
        })
      }
      if (!flag) {
        isEdit = false
        initData(null) // 假设initData()方法已定义
      }
      buttonDisabled.value = false
    }
  }
</script>

<style lang="scss" scoped>
  .remark-input {
    margin-top: 8px;
    width: 100px; /* 根据需要调整宽度 */
  }
  .app-container {
    color: #606266;
  }
  .foot-button {
    text-align: center;
  }

  ::v-deep(.item-form) {
    .el-form-item__label {
      margin-bottom: 0 !important;
    }
  }

  .right-align-inputs .el-form-item .el-input__inner {
    text-align: right;
    background-color: transparent;
  }

  .right-align-inputs .el-form-item {
    margin-bottom: 9px;
  }

  .app-container-local {
    height: 100%;
    width: 100%;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    background: white;
    padding: 5px;
    box-sizing: border-box;
  }

  .demo-tabs > .el-tabs__content {
    //padding: 32px;
    color: #6b778c;
    font-size: 22px;
    font-weight: 400;
  }
  .demo-tabs .custom-tabs-label .el-icon {
    vertical-align: middle;
  }
  .demo-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
  }
  .uploader-item {
    //margin: 60px 0 60px;
    :deep(.el-upload-list) {
      .is-success {
        overflow: hidden;
        height: auto;
        width: 192px;
        border: 0;
        border-radius: 0;
        margin-right: 10px;

        img,
        .el-upload-list__item-actions {
          height: 108px;
        }
        .el-input {
          .el-input__inner {
            height: 32px;
          }
        }
      }
      .is-ready,
      .is-uploading {
        display: none;
      }
    }
    :deep(.el-upload) {
      width: 192px;
      height: 108px;
      line-height: 108px;
      background: transparent;
      border: 1px solid #dcdfe6;
      border-radius: 0;
      margin-bottom: 20px;
      .el-icon-plus {
        color: #dcdfe6;
        font-size: 24px;
      }
    }
  }
  .container {
    display: flex;
    align-items: center;
  }

  .image {
    margin-right: 20px; /* 图片和文本之间的距离 */
  }
  .el-card {
    border: 0px;
    margin-bottom: 40px;
    .content {
      img {
        display: block;
      }
    }
  }
  .image-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
