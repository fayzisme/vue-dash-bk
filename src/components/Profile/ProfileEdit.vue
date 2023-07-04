<template>
	<div class="page-profile-edit">
		<el-form ref="form" label-width="120px" :label-position="labelPosition">
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Username">
						<el-input v-model="username"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Email">
						<el-input v-model="email" type="email"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="First name">
						<el-input v-model="firstName"/>
					</el-form-item>
				</el-col>				
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Phone">
						<el-input v-model="phone" placeholder="+xx xxx xxx xxxx"/>
					</el-form-item>
				</el-col>
			</el-col>			
			<el-col class="col-p">
				<el-form-item>
					<el-button type="primary" @click="onSubmit">Save</el-button>
					<el-button>Cancel</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</div>
</template>

<script>
import config from '../../config'
import api from '@/networkClient'
import moment from 'moment'
export default {
	name: 'ProfileEdit',
	props: {
		profile: {
			type: Object,
			default: function(){
				return {}
			}
		}
	},
	data() {
		return {
			username: this.profile.username,
			email: this.profile.email,
			firstName: this.profile.name,
			phone: '088',
			website: '',
			hobbies: [],
			skills: ['JavaScript', 'HTML', 'CSS', 'Vue.js'],
			gender: 'Female',
			address: '',
			city: '',
			country: '',
			postalCode: '',
			aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus posuere libero, nec convallis arcu ullamcorper a. Vestibulum diam neque, egestas scelerisque arcu a, fermentum ornare mauris. Ut venenatis vulputate maximus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur scelerisque quis turpis ac tempus. Quisque dolor dolor, fermentum nec magna eget, fringilla auctor lacus. Aenean sagittis est ac ligula pharetra, quis imperdiet ante dignissim. Ut vehicula nec nisl a pretium. Quisque faucibus auctor viverra. Sed ultricies convallis magna. In blandit eros id efficitur vulputate. Duis efficitur sollicitudin dui non vehicula. Nullam ut eros fermentum, dapibus metus non, accumsan neque. Mauris sed pellentesque felis. Suspendisse viverra risus sit amet congue consectetur.',
			labelPosition: 'right'
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!');
		},
		resizeLabelPosition() {
			if(window.innerWidth <= 768) {
				this.labelPosition = 'top'	
			}
		},		
	},
	async mounted() {
		console.log("profile: ", this.profile)
		this.resizeLabelPosition();
		window.addEventListener('resize', this.resizeLabelPosition);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeLabelPosition);
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.page-profile-edit {
	.label-switch-box {
		display: block;
		clear: both;
		width: 100%;
		text-align: right;
		margin-bottom: 20px;
	}
	.col-p {
		padding: 0 10px;
		box-sizing: border-box;
	}
	.select-wide {
		width: 100%;
	}
}
</style>
