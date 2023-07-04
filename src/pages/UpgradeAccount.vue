<template>
	<div class="scrollable only-y">
        <div class="page-header">
			<h1>{{ $t("upgradeacc.title") }}</h1>
		</div>
        <el-card>
            <h4>{{ $t("upgradeacc.desc") }}</h4>
            <el-form label-position="left" status-icon :rules="rulesForm" ref="form" label-width="200px" :model="form">
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.name')" prop="name">
                            <el-input required v-model="form.name" placeholder="Your company's name"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.brand')" prop="brand">
                            <el-input required v-model="form.brand" placeholder="Your company's brand"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.phone')" prop="phone">
                            <el-input required v-model="form.phone" placeholder="Your company's phone number"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.pks')" prop="pks_number">
                            <el-input required v-model="form.pks_number" placeholder="Your company's PKS number"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.npwp')" prop="npwp">
                            <el-input required v-model="form.npwp" placeholder="Your company's NPWP"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.siup')" prop="siup">
                            <el-input required v-model="form.siup" placeholder="Your company's SIUP"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.tdp')" prop="tdp">
                            <el-input required v-model="form.tdp" placeholder="Your company's TDP"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.skdp')" prop="skdp">
                            <el-input required v-model="form.skdp" placeholder="Your company's SKDP"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.pic_name')" prop="pic_name">
                            <el-input required v-model="form.pic_name" placeholder="Your company's PIC Business name"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.pic_phone')" prop="pic_phone">
                            <el-input required v-model="form.pic_phone" placeholder="Your company's PIC Business phone number"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.pic_email')" prop="pic_email">
                            <el-input required v-model="form.pic_email" placeholder="Your company's PIC Business email"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.tech_name')" prop="tech_name">
                            <el-input required v-model="form.tech_name" placeholder="Your company's PIC Tech name"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.tech_phone')" prop="tech_phone">
                            <el-input required v-model="form.tech_phone" placeholder="Your company's PIC Tech phone number"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.tech_email')" prop="tech_email">
                            <el-input required v-model="form.tech_email" placeholder="Your company's PIC Tech email"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item :label="$t('companyColumn.address')" prop="address">
                            <el-input type="textarea" :autosize="{minRows: 4}" required v-model="form.address" placeholder="Your company's address"/>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col class="col-p">
				<el-form-item>
					<el-button :loading="btnLoading" type="primary" @click="submitForm('form')">{{ $t('submit') }}</el-button>
					<el-button @click="go('/profile')">{{ $t('cancel') }}</el-button>
				</el-form-item>
			</el-col>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import ColorThief from 'color-thief-browser'
import Affix from '@/components/Affix'
import ProfileEdit from '@/components/Profile/ProfileEdit'
import config from '../config'
import api from '@/networkClient'

export default {
	name: 'Profile',
	data() {
        var checkHasValue = (rule, value, callback) => {
            if (!value) {
                return callback(new Error(this.$t('companyColumnWarning.'+rule.field)));
            } else{
                callback()
            }
        }
        var checkOnlyNumber = (rule, value, callback) => {
            if (!value) {
                return callback(new Error(this.$t('companyColumnWarning.'+rule.field)));
            } else{
                if(isNaN(parseInt(value))){
                    return callback(new Error(this.$t('fieldNumberOnly')));
                } else{
                    callback()
                }
            }
        }
		return {
			colorActive: false,
			color: 'white',			
            affixEnabled: true,
            loadingProfile: false,
            btnLoading: false,
            form: {
                name: '',
                brand: '',
                phone: '', 
                pks_number: '', 
                npwp: '', 
                siup: '', 
                skdp: '', 
                tdp: '', 
                pic_name: '', 
                pic_phone: '', 
                pic_email: '', 
                tech_name: '', 
                tech_email: '', 
                tech_phone: ''
            },
            rulesForm: {
                wabanumber: [
                    { validator: checkHasValue, trigger: 'blur' }
                ],
                name: [
                    { validator: checkHasValue, trigger: 'blur' }
                ],
                brand: [
                    { validator: checkHasValue, trigger: 'blur' }
                ],
                phone: [
                    { validator: checkOnlyNumber, trigger: 'blur' }
                ],
                pks_number: [
                    { validator: checkHasValue, trigger: 'blur' }
                ], 
                npwp: [
                    { validator: checkHasValue, trigger: 'blur' }
                ], 
                siup: [
                    { validator: checkHasValue, trigger: 'blur' }
                ], 
                skdp: [
                    { validator: checkHasValue, trigger: 'blur' }
                ], 
                tdp: [
                    { validator: checkHasValue, trigger: 'blur' }
                ], 
                pic_name: [
                    { validator: checkHasValue, trigger: 'blur' }
                ], 
                pic_phone: [
                    { validator: checkHasValue, trigger: 'blur' }
                ], 
                pic_email: [
                    { validator: checkHasValue, trigger: 'blur' },
                    { type: 'email', trigger: 'blur', message: this.$t('companyColumnWarning.invalid_email' )}
                ], 
                tech_name: [
                    { validator: checkHasValue, trigger: 'blur' }
                ], 
                tech_email: [
                    { validator: checkHasValue, trigger: 'blur' },
                    { type: 'email', trigger: 'blur', message: this.$t('companyColumnWarning.invalid_email' )}
                ], 
                tech_phone: [
                    { validator: checkHasValue, trigger: 'blur' }
                ]
            },
            errors: []
		}
	},
	methods: {
        checkForm(e){

        },
		resizeAffixEnabled() {
			if(window.innerWidth <= 768) {
				this.affixEnabled = false	
			} else {
				this.affixEnabled = true	
			}
        },
		go(url){
			this.$router.push(url);
        },
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.btnLoading = true;
                    await api({
                        url: config.baseApi + "auth/upgrade-account",
                        data: this.form,
                        method: "post"
                    })
                    .then(response => {
                        this.btnLoading = false
                        console.log(response)
                        if (response.data.ec == 200) {
                            this.$swal({
                                title: this.$t('success'),
                                text: '',
                                type: 'success',
                            }).then((ok) => {
                                this.$router.push('/profile')
                            })
                        } else{
                            this.$swal({
                                title: this.$t('error'),
                                text: "Something error",
                                type: 'warning',
                            }).then((ok) => {
                                this.$router.push('/profile')
                            })
                        }
                    })
                    .catch(error => {
                        this.btnLoading = false
                        console.log(error)
                        this.$swal(this.$t('error'), this.$t('error_text'), "warning")
                    })
                } else {
                    return false;
                }
            });
        },
    },
    async beforeMount(){

    },
	mounted() {

		this.resizeAffixEnabled();
        window.addEventListener('resize', this.resizeAffixEnabled);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeAffixEnabled);
	},
	components: {
		Affix,
        ProfileEdit,
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';
.profile-gallery {
	/*.images-list {
		margin: 0 -10px;
		margin-top: -10px;

		img {
			cursor: pointer;
			width: calc(50% - 20px);
			border-radius: 10px;
			max-width: 278px;
			float: left;
			box-sizing: border-box;
			margin: 10px;
			border: 5px solid #fff;
			box-shadow: 0px 7px 20px -7px rgba(0, 0, 0, 0.55);
			transition: all .5s;

			&:hover {
				box-shadow: none;
				transform: translateY(3px);
			}
		}
	}*/

	.images-list {
		overflow: hidden;
		margin: -1%;
		&.box-margins {
			margin: 1%;
		}

		img {
			cursor: pointer;
			width: 18%;
			border-radius: 10px;
			//max-width: 278px;
			float: left;
			box-sizing: border-box;
			margin: 1%;
			border: 5px solid #fff;
			box-shadow: 0px 7px 20px -7px rgba(0, 0, 0, 0.55);
			transition: all .5s;

			&:hover {
				box-shadow: none;
				transform: translateY(3px);
			}
		}
	}
}
.el-form-item.tooltip{
  line-height: 10px;

  .el-form-item__content {
    line-height: 10px !important;
  }
}

.full-button, .el-dropdown {
  width: 100%;
}

.el-tag {
  margin-right: 10px;
}

.page-header {
  margin-bottom: 30px;
}

.el-step {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
}

.float-right {
  float: right;
}

.float-left {
  float: left;
}

.footer {
  padding-top: 10px;
  margin-top: 20px;
  border-top: 1px solid #ebeef5;
}

.uploader {
  line-height: 20px;
  padding-top: 8px;
  height: 40px;
}

.el-select {
  width: 100%;
}

@media (max-width: 768px) {
	.profile-gallery {
		.images-list {
			margin: -1.5%;
			&.box-margins {
				margin: 1.5%;
			}


			img {
				width: 30.3%;
				margin: 1.5%;
			}
		}
	}
}
@media (max-width: 480px) {
	.profile-gallery {
		.images-list {
			margin: -2%;
			&.box-margins {
				margin: 2%;
			}

			img {
				width: 46%;
				margin: 2%;
			}
		}
	}
}
@media (max-width: 360px) {
	.profile-gallery {
		.images-list {
			margin: -2%;
			&.box-margins {
				margin: 2%;
			}

			img {
				width: 96%;
				margin: 2%;
			}
		}
	}
}
</style>