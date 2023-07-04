<template>
    <div class="scrollable only-y" v-loading="loadingPage">
        <div class="page-header">
			<h1>{{ $t("settings.title") }}</h1>
		</div>
        <el-card v-if="showAlertError || showAlert" style="margin-bottom: 1em">
            <error-gope-siji v-if="showAlertError" />
            <el-alert v-if="showAlert"
                :title="$t('error')"
                :description="alertErrorMessage"
                type="error"
                :closable="false"
                show-icon>
            </el-alert>
        </el-card>
        <el-card v-if="showCard && !showAlert && !showAlertError" v-loading="loadingPage" style="margin-bottom: 1em">
            <el-row :gutter="10" v-if="showCard" style="z-index: 0">       
                <el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="showCard" v-for="(option, index) in options" :key="index">
                    <el-row :gutter="30" class="mb-20">
                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                            <h5>{{ option.options_name }}</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-20" v-if="option.options_type == 'boolean'">
                            <el-switch v-model="options[index].options_value" active-text="Yes" active-value="true" inactive-text="No" inactive-value="false"></el-switch>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-row :gutter="30">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-button type="primary" :loading="loadingBtn" @click="updatePreferences"><i class="mdi mdi-content-save"/> {{ $t('generic.update') }}</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
import api from '@/networkClient'
const axios = require('axios')
import config from '@/config'
import store from '@/store'

export default {
    data() {
        return {
            showAlert: false,
            showAlertError: false,
            showCard: true,
            loadingPage: false,
            loadingBtn: false,
            alertErrorMessage: "You are not allowed to see this page.",
            options: {
                allowMakerChecker: false
            }
        }
    },
    methods: {
        changeFilter(){
            this.loadPreferences()
        },
        async loadPreferences(view) {
            this.loadingPage = true
			await api({
				method: 'get',
				url: config.baseApi +'auth/settings/',
                params: {
					view: view == true ? true : null
				},
			}).then(result => {
				if(result.data.ec == 200){
                    this.options = result.data.data
                    // this.isSubscribe = true
                } else{
                    if(result.data.message == 'not_allowed'){
                        this.showAlert = true
                    }
                }
			}).catch(error => {
				this.showAlertError = true
            })
            this.loadingPage = false
        },
        async updatePreferences(){
            this.loadingBtn = true
			await api({
				method: 'patch',
                url: config.baseApi +'auth/settings/',
                data: {
                    options: this.options
                }
			}).then(result => {
				if(result.data.ec == 200){
                    this.$swal(this.$t('success'), this.$t('success'), "success").then(confirm => {
                        this.loadPreferences()
                    })
                } else{
                    this.$swal(this.$t('error'), this.$t('error_text'), "warning")
                }
			}).catch(error => {
                // this.showAlertError = true
                this.$swal(this.$t('error'), this.$t('error_text'), "error")
            })
            this.loadingBtn = false
        }
    },
    async mounted() {
        // await this.loadWA()
        if(this.$store.getters.isPic){
            this.loadPreferences(true)
        } else{
            this.loadingPage = false
             this.showAlert = true
        }
    }
}
</script>
