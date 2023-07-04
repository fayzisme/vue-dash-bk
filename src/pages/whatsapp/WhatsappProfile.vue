<template>
	<div class="scrollable only-y" v-loading="loadingPage">
        <div class="page-header">
            <h1>{{ $t("whatsapp.whatsapp") }} Profile</h1>
        </div>
        <el-card v-if="showAlertMessage" align="center" style="margin-bottom: 1em">
            <h2>Start messaging your customers today</h2>
            <span v-html="$t('promote.desc.whatsapp')"></span>
            <br/><br/>
            <span><el-button @click="mailto()">Send us e-mail</el-button></span>
        </el-card>
        <el-card v-loading="loadingPage" style="margin-bottom: 1em">
            <el-row :gutter="30" v-if="!showAlertError && !showAlertMessage" style="padding: 20px 151px 20px 20px;">
                <el-col :xs="24" :sm="24" :md="14" :lg="20" :xl="20">
                    <el-row :gutter="30">
                        <el-col :xs="4" :sm="4" :md="8" :lg="4" :xl="4">
                            <h5>Phone Number</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="16" :lg="20" :xl="20" class="mt-10">
                            <el-select  v-model="selectedPhoneNumber" @change="changeFilter" :default-first-option="true">
                                <el-option
                                    v-for="item in whatsapp_number"
                                    :key="item"
                                    :label="item"
                                    :value="item" />
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" v-if="!showAlertErrorLoadCredential">
                        <el-col :xs="4" :sm="4" :md="8" :lg="4" :xl="4">
                            <h5>Email</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="16" :lg="20" :xl="20" class="mt-10">
                            <el-input v-model="profile.email" type="text"/>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" v-if="!showAlertErrorLoadCredential" v-for="(n,i) in website" :key="i">
                        <el-col :xs="4" :sm="4" :md="8" :lg="4" :xl="4">
                            <h5>Website</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="16" :lg="20" :xl="20" class="mt-10">
                            <el-input v-model="profile.websites[i]" placeholder="Your company's website URL" type="text"/>
                        </el-col>
                    </el-row>
                       <el-row :gutter="30" v-if="!showAlertErrorLoadCredential && !showAlertError && !showAlertMessage && website < 2" class="mb-10 mt-10" align="center">
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-button type="info" @click="addWebsite"> {{ $t('generic.add') }}</el-button>
                            </el-col>
                        </el-row>
                    <el-row :gutter="30" v-if="!showAlertErrorLoadCredential">
                        <el-col :xs="4" :sm="4" :md="8" :lg="4" :xl="4">
                            <h5>Description</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="16" :lg="20" :xl="20" class="mt-10">
                            <el-input v-model="profile.description" placeholder="Describe a little word about your company" type="textarea" :rows="5"/>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" v-if="!showAlertErrorLoadCredential">
                        <el-col :xs="4" :sm="4" :md="8" :lg="4" :xl="4">
                            <h5>Address</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="16" :lg="20" :xl="20" class="mt-10">
                            <el-input v-model="profile.address" placeholder="Your company address" type="textarea" :rows="5"/>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" v-if="!showAlertErrorLoadCredential">
                        <el-col :xs="4" :sm="4" :md="8" :lg="4" :xl="4">
                            <h5>Status</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="16" :lg="20" :xl="20" class="mt-10">
                            <el-input v-model="about" type="text"/>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :xs="24" :sm="24" :md="10" :lg="4" :xl="4" v-if="!showAlertErrorLoadCredential">
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="mt-10">
                        <div class="container-profpic">
                            <img :src="profpic" width="200px" height="200px" style="border-radius: 50%" class="avatar">
                            <div class="overlay">
                                <el-button type="primary" @click="showCropModal = true" class="btn-camera-upload" icon="mdi mdi-camera" circle />
                            </div>
                        </div>
                        <my-upload field="img"
                            @crop-success="cropSuccess"
                            @crop-upload-success="cropUploadSuccess"
                            @crop-upload-fail="cropUploadFail"
                            v-model="showCropModal"
                            langType="en"
                            :width="300"
                            :height="300"
                            :url="url + 'upload/image'"
                            :headers="headerUpload"
                            :params="{ number: selectedPhoneNumber }"
                            img-format="jpg" />
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="30" v-if="!showAlertErrorLoadCredential && !showAlertError && !showAlertMessage" class="mb-10 mt-10" align="center">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-button type="primary" :loading="loadingBtn" @click="updateProfile"><i class="mdi mdi-content-save"/> {{ $t('generic.update') }}</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-alert v-if="showAlertErrorLoadCredential"
                    :title="$t('error')"
                    :description="errorDesc"
                    type="error"
                    :closable="false"
                    show-icon />
            </el-row>
        </el-card>
        <el-card v-if="showAlertError" style="margin-bottom: 1em">
            <error-gope-siji />
        </el-card>
    </div>
</template>
<script>
import api from '@/networkClient'
import config from '@/config'
import myUpload from 'vue-image-crop-upload'
import store from '@/store'
export default {
    name: "WhatsappProfile",
    components: {
        myUpload
    },
    data() {
        return {
            // Loading
            loadingPage: true,
            loadingBtn: false,
            // Show/hide
            showAlertError: false,
            showAlertMessage: false,
            showFormMessage: true,
            showAlertErrorLoadCredential: false,
            errorDesc: this.$t('alert_error_text'),
            // Data
            whatsapp_number: [],
            selectedPhoneNumber: "",
            profile: { websites: [] },
            website: 0,
            profpic: "",
            about: "",
            showCropModal: false,
            img: "",
            url: config.baseApi,
            headerUpload: {
                'api-key': store.getters.accessToken
            },
            isChangeProfPic: false
        }
    },
    methods: {
        changeFilter(){
		    this.loadProfile()
        },
        cropSuccess(imgDataUrl, field){
            // console.log("CROP SUCCESS", imgDataUrl, field)
            // this.profpic = imgDataUrl
        },
        cropUploadSuccess(jsonData, field){
            // console.log("CROP UPLOAD SUCCES", jsonData, field)
            if(jsonData.ec == 200 && typeof jsonData.data.url != 'undefined'){
                this.isChangeProfPic = true
                this.profpic = jsonData.data.url
            } else{
                this.$message.error('Upload failed! Please try again.');    
            }
        },
        cropUploadFail(status, field){
            // console.log("CROP UPLOAD SUCCES", status, field)
            this.$message.error('Upload failed! Please try again.');
        },
        addWebsite(){
            this.website += 1
        },
        async updateProfile(){
            this.loadingBtn = true
            let updateData = {
                description: this.profile,
                about: this.about,
                number: this.selectedPhoneNumber
            }
            if(this.isChangeProfPic == true){
                updateData.photo = this.profpic
            }
            await api({
                method: 'patch',
                url: 'user/profile',
                data: updateData
            }).then(result => {
                if(result.data.ec == 200){
                    this.$swal(this.$t('success'), "", "success").then(confirm => {
                        this.loadProfile()
                    })
                } else {
                    this.$message.error(this.$t('error_text'));
                }
            }).catch(error => {
                this.$message.error(this.$t('error_text'));
                // this.showAlertError = true
            })
            this.loadingBtn = false
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('Avatar picture must be JPG format!');
            }
            else if (!isLt2M) {
                this.$message.error('Avatar picture size can not exceed 2MB!');
            }
            else{
                this.profpic = URL.createObjectURL(file.raw)
            }
                return isJPG && isLt2M;
        },
        async loadWa(view){
            this.loadingPage = true
            await api({
                method: 'post',
                url: 'user/detail/number',
                data: {
                    channels: "whatsapp"
                },
                params: {
					view: view == true ? true : null
				}
            }).then(result => {
                if(result.data.ec == 200){
                    this.whatsapp_number = result.data.data
                    this.selectedPhoneNumber = this.whatsapp_number[0]
                    this.showFormMessage = true
                    this.loadProfile()
                } else if(result.data.ec == 400 && result.data.message == "not_subscribe"){
                    this.showAlertMessage = true
                } else if(result.data.ec == 500){
                    this.showAlertError = true  
                }
                // this.loadingPage = false
            }).catch(error => {
                this.showAlertError = true
                // this.loadingPage = false
            })
        },
        async loadProfile(){
            this.loadingPage = true
            
            await api({
                method: 'get',
                url: 'user/profile',
                params: {
                    number: this.selectedPhoneNumber
                }
            }).then(result => {
                if(result.data.ec == 200){
                    this.showFormMessage = true
                    this.showAlertErrorLoadCredential = false
                    this.profile = result.data.data.description
                    this.website = result.data.data.description.websites.length >= 1 ? result.data.data.description.websites.length : 1
                    this.profpic = result.data.data.photo
                    this.about = result.data.data.profile
                } else {
                    this.showAlertErrorLoadCredential = true
                    if(result.data.ec == 403){
                        this.errorDesc = this.$t('whatsapp.not_allowed')
                    } else{
                        this.errorDesc = this.$t('error_text')
                    }
                }
            }).catch(error => {
                this.showAlertErrorLoadCredential = true
            })
            this.loadingPage = false
        }
    },
    async mounted(){
        await this.loadWa(true)
    }
}
</script>
<style scoped>
    .container-profpic {
        position: relative;
        width: 100%;
        max-width: 400px;
    }

    .overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 200px;
        width: 200px;
        opacity: 0;
        border-radius: 50%;
        transition: .3s ease;
        background-color: gray;
    }

    .container-profpic:hover .overlay {
        opacity: 1;
    }

    .btn-camera-upload {
        color: white;
        font-size: 32px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;
    }

    /* @media (max-width: 1280px) {
        .el-card__body {
            padding: 20px 151px 20px 20px;
        }
    } */

    @media (max-width: 1024px) {
        .el-col-md-8 {
            width: 37%;
        }

        .el-col-md-16 {
            width: 63%;
        }
        /* .el-col-md-4 {
            width: 23%;
        }
        
        .el-col-md-20 {
            width: 77%;
        }
        h5 {
            width: 140px;
        } */
    }
</style>
